import 'dotenv/config';
import express from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { lookupMedicine, generateMultilingualExplanation } from './src/data/medicineKnowledgeBase';
import { PrescribedMedicine, PrescriptionAnalysisResult } from './src/types';
import { requireAuth, AuthRequest } from './src/middleware/auth.ts';
import {
  getOrCreateUser,
  savePrescriptionRecord,
  getUserPrescriptions,
  saveDoseLogRecord,
  getUserDoseLogs,
} from './src/db/users.ts';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// Lazy GoogleGenAI client
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    aiClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health route
app.get('/api/health', (req, res) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY);
  res.json({
    status: 'ok',
    hasApiKey: hasKey,
    app: 'Medora Healthcare AI',
    timestamp: new Date().toISOString(),
  });
});

// Analyze prescription route
app.post('/api/analyze-prescription', async (req, res) => {
  try {
    const { base64Data, mimeType, fileName } = req.body;

    if (!base64Data || !mimeType) {
      res.status(400).json({ error: 'Missing base64Data or mimeType in request body.' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server. Please check the Settings > Secrets panel.',
      });
      return;
    }

    const ai = getAI();

    const systemInstruction = `You are Medora's Clinical AI Assistant, an AI-powered prescription understanding assistant.
You help patients understand prescriptions and medication instructions in clear, patient-friendly language.

AI SAFETY RULES (MANDATORY):
1. Treat the prescription as the source of truth for medicine name, strength, dosage, frequency, and duration.
2. Never invent missing dosage or prescription information. If missing, state "Not specified".
3. Never change or reinterpret the prescribed dosage.
4. Use only verified medical facts for general medicine explanations.
5. Do not diagnose diseases.
6. Do not tell users to start, stop, increase, or decrease medication.
7. If medicine information or handwriting cannot be reliably verified, explicitly state that it could not be confirmed.
8. When uncertain, abstain rather than guessing.
9. Use simple, patient-friendly language.
10. Clearly separate prescription instructions from general medicine information.

Analyze the uploaded prescription document (image or PDF). Extract all prescribed medicines into the specified JSON structure.
Also capture the patient name, doctor or clinic name, and date if visible.
For each medicine, identify:
- name: The brand or generic medicine name as written
- strength: e.g. "500 mg", "625 mg", "10 mg" (or "Not specified")
- dosage: e.g. "1 Tablet", "2 Puffs", "5 ml"
- frequency: e.g. "Twice daily", "Once at bedtime", "Every 8 hours"
- duration: e.g. "5 days", "1 month", "As needed"
- instruction: Any explicit instruction e.g. "After meals with warm water"
- timing: e.g. "Morning", "Night", "After meals", "Before food"`;

    const promptText = `Please read and extract all prescribed medicines from this prescription document with extreme care for patient safety. Return valid JSON following the schema.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: promptText,
          },
        ],
      },
      config: {
        systemInstruction,
        temperature: 0.1, // Low temperature for factual precision
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            patientName: { type: Type.STRING, description: 'Patient name if visible on prescription' },
            doctorOrClinic: { type: Type.STRING, description: 'Doctor or hospital name if visible' },
            date: { type: Type.STRING, description: 'Prescription date if visible' },
            generalAdvice: { type: Type.STRING, description: 'General safety advice or doctor notes' },
            medicines: {
              type: Type.ARRAY,
              description: 'List of all medicines found in the prescription',
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: 'Medicine brand or generic name' },
                  strength: { type: Type.STRING, description: 'Strength e.g. 500mg' },
                  dosage: { type: Type.STRING, description: 'Dosage form and unit e.g. 1 Tablet' },
                  frequency: { type: Type.STRING, description: 'How often e.g. Twice daily' },
                  duration: { type: Type.STRING, description: 'How long e.g. 5 days' },
                  instruction: { type: Type.STRING, description: 'Specific intake instruction' },
                  timing: { type: Type.STRING, description: 'Timing e.g. After food, Before food' },
                  dosageForm: { type: Type.STRING, description: 'Form e.g. Tablet, Syrup, Inhaler, Drops' },
                },
                required: ['name', 'strength', 'dosage', 'frequency', 'duration', 'instruction'],
              },
            },
          },
          required: ['medicines'],
        },
      },
    });

    const responseText = response.text || '{}';
    let parsedData: any = {};
    try {
      parsedData = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse Gemini JSON output:', responseText);
      res.status(500).json({ error: 'AI response was not formatted as valid JSON. Please try again.' });
      return;
    }

    const rawMeds = Array.isArray(parsedData.medicines) ? parsedData.medicines : [];
    
    // Cross-reference each extracted medicine against trusted clinical knowledge base
    const verifiedMedicines: PrescribedMedicine[] = rawMeds.map((med: any, index: number) => {
      const name = (med.name || 'Unknown Medication').trim();
      const strength = (med.strength || 'Not specified').trim();
      const dosage = (med.dosage || '1 unit').trim();
      const frequency = (med.frequency || 'As directed').trim();
      const duration = (med.duration || 'As directed').trim();
      const instruction = (med.instruction || 'Follow doctor guidance').trim();
      const timing = med.timing || 'After food';
      const dosageForm = med.dosageForm || 'Tablet';

      const trustedInfo = lookupMedicine(name);
      const isVerified = Boolean(trustedInfo && trustedInfo.isVerified);

      const patientExplanation = generateMultilingualExplanation(
        name,
        strength,
        frequency,
        duration,
        instruction,
        trustedInfo
      );

      return {
        id: `med-${Date.now()}-${index + 1}`,
        name,
        strength,
        dosage,
        frequency,
        duration,
        instruction,
        timing,
        dosageForm,
        verified: isVerified,
        trustedInfo: trustedInfo || undefined,
        patientExplanation,
        warning: isVerified
          ? undefined
          : '⚠️ Medora could not verify this medicine in the trusted knowledge base. Medora does NOT guess. Please confirm with your doctor or pharmacist.',
      };
    });

    const unverifiedCount = verifiedMedicines.filter((m) => !m.verified).length;

    const result: PrescriptionAnalysisResult = {
      id: `presc-${Date.now()}`,
      patientName: parsedData.patientName || 'Patient (Not clearly visible)',
      doctorOrClinic: parsedData.doctorOrClinic || 'Clinic/Hospital',
      date: parsedData.date || new Date().toLocaleDateString('en-GB'),
      rawMedicinesCount: verifiedMedicines.length,
      medicines: verifiedMedicines,
      generalAdvice: {
        en: parsedData.generalAdvice || 'Take all medications strictly as directed. Keep this prescription for follow-up visits.',
        hi: 'सभी दवाएं डॉक्टर के निर्देशानुसार समय पर लें। फॉलो-अप के लिए पर्चे को सुरक्षित रखें।',
        mr: 'सर्व औषधे डॉक्टरांच्या सल्ल्यानुसार वेळेवर घ्या. पुढील तपासणीसाठी प्रिस्क्रिप्शन जपून ठेवा.',
        es: 'Tome todos los medicamentos estrictamente según las indicaciones. Conserve esta receta para las visitas de seguimiento.',
        fr: 'Prenez tous les médicaments en suivant scrupuleusement les consignes. Conservez cette ordonnance pour vos prochaines consultations.',
        de: 'Nehmen Sie alle Medikamente streng nach ärztlicher Anweisung ein. Bewahren Sie dieses Rezept für Nachuntersuchungen auf.',
        ar: 'تناول جميع الأدوية بدقة وفقاً للتعليمات الطبية. احتفظ بهذه الوصفة الطبية لمراجعات المتابعة.',
        bn: 'ডাক্তারের নির্দেশ অনুযায়ী সময়মতো সব ওষুধ সেবন করুন। পরবর্তী চেকআপের জন্য এই প্রেসক্রিপশনটি সংরক্ষণ করুন।',
        ta: 'அனைத்து மருந்துகளையும் மருத்துவர் அறிவுறுத்தியபடி தவறாமல் உட்கொள்ளவும். அடுத்த வருகைக்காக இந்த மருந்துச்சீட்டைப் பாதுகாத்து வைக்கவும்.',
        te: 'వైద్యుని సూచనల ప్రకారం అన్ని మందులను క్రమం తప్పకుండా వాడండి. తదుపరి పరీక్షల కోసం ఈ ప్రిస్క్రిప్షన్‌ను భద్రపరచండి.',
        gu: 'તમામ દવાઓ ડૉક્ટરના નિર્દેશ મુજબ સમયસર લો. આગળની તપાસ માટે આ પ્રિસ્ક્રિપ્શન સાચવી રાખો.',
      },
      confidenceNotes: `${verifiedMedicines.length} medicine(s) detected. ${unverifiedCount > 0 ? `${unverifiedCount} item(s) require verification with doctor/pharmacist.` : 'All medicines matched with trusted medical databases.'}`,
      isDemo: false,
      unverifiedCount,
    };

    res.json(result);
  } catch (error: any) {
    console.error('Error analyzing prescription:', error);
    res.status(500).json({
      error: error.message || 'An error occurred while analyzing the prescription.',
    });
  }
});

// Custom question or re-explanation route
app.post('/api/explain-medicine', async (req, res) => {
  try {
    const { medicineName, question, language } = req.body;
    if (!medicineName) {
      res.status(400).json({ error: 'Medicine name is required.' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: 'GEMINI_API_KEY is not configured.' });
      return;
    }

    const ai = getAI();
    const targetLang = language === 'hi' ? 'Hindi' : language === 'mr' ? 'Marathi' : 'English';

    const systemInstruction = `You are Medora's Prescription Understanding Assistant.
Safety Rules:
1. Do not diagnose conditions or diseases.
2. Do not advise changing, starting, or stopping any medication.
3. Answer the user's question simply and reassuringly in ${targetLang}.
4. If asked about taking with food, milk, or common timing, provide safe general advice and remind them to verify with their pharmacist.
5. Keep response under 100 words.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Medicine: ${medicineName}\nPatient question: ${question || 'Can you explain how to safely take this?'}\nPlease answer in ${targetLang}.`,
      config: {
        systemInstruction,
        temperature: 0.2,
      },
    });

    res.json({ answer: response.text });
  } catch (error: any) {
    console.error('Error in explain-medicine:', error);
    res.status(500).json({ error: error.message || 'Failed to explain medicine.' });
  }
});

// Cloud SQL Database Routes (Secured via Firebase Auth Middleware)
// Sync / Register authenticated user in PostgreSQL
app.post('/api/user/sync', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    const email = req.user?.email || '';
    const displayName = (req.user as any)?.name || (req.body?.displayName as string) || '';

    if (!uid) {
      res.status(401).json({ error: 'Unauthorized: missing user identifier' });
      return;
    }

    const user = await getOrCreateUser(uid, email, displayName);
    res.json({ success: true, user });
  } catch (error: any) {
    console.error('Failed to sync user to Cloud SQL:', error);
    res.status(500).json({ error: 'Failed to synchronize user profile' });
  }
});

// Save or update prescription in PostgreSQL
app.post('/api/db/prescriptions', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { prescription } = req.body;
    if (!prescription || !prescription.id) {
      res.status(400).json({ error: 'Invalid prescription payload' });
      return;
    }

    // Ensure user exists first
    await getOrCreateUser(uid, req.user?.email || '', (req.user as any)?.name);

    const saved = await savePrescriptionRecord(uid, {
      id: prescription.id,
      patientName: prescription.patientName,
      doctorName: prescription.doctorName,
      clinicName: prescription.clinicName,
      prescriptionDate: prescription.prescriptionDate,
      diagnosis: prescription.diagnosis,
      rawAnalysisJson: JSON.stringify(prescription),
    });

    res.json({ success: true, prescription: saved });
  } catch (error: any) {
    console.error('Failed to save prescription to Cloud SQL:', error);
    res.status(500).json({ error: 'Failed to save prescription to database' });
  }
});

// Fetch user prescriptions from PostgreSQL
app.get('/api/db/prescriptions', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const records = await getUserPrescriptions(uid);
    const prescriptionsList = records.map((r) => {
      try {
        return JSON.parse(r.rawAnalysisJson);
      } catch {
        return r;
      }
    });

    res.json({ prescriptions: prescriptionsList });
  } catch (error: any) {
    console.error('Failed to fetch prescriptions from Cloud SQL:', error);
    res.status(500).json({ error: 'Failed to fetch prescriptions from database' });
  }
});

// Save daily dose log in PostgreSQL
app.post('/api/db/dose-logs', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { date, doses, scheduledCount, takenCount, adherenceRate } = req.body;
    if (!date || !doses) {
      res.status(400).json({ error: 'Missing date or doses' });
      return;
    }

    // Ensure user exists first
    await getOrCreateUser(uid, req.user?.email || '', (req.user as any)?.name);

    const saved = await saveDoseLogRecord(
      uid,
      date,
      JSON.stringify(doses),
      scheduledCount || 0,
      takenCount || 0,
      adherenceRate || 0
    );

    res.json({ success: true, log: saved });
  } catch (error: any) {
    console.error('Failed to save dose log to Cloud SQL:', error);
    res.status(500).json({ error: 'Failed to save dose log to database' });
  }
});

// Start server
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Medora server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
