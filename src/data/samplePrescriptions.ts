import { PrescriptionAnalysisResult } from '../types';
import { lookupMedicine, generateMultilingualExplanation } from './medicineKnowledgeBase';

export interface DemoPrescriptionOption {
  id: string;
  title: string;
  category: string;
  doctorName: string;
  clinic: string;
  date: string;
  patientName: string;
  patientAgeGender: string;
  diagnosisNote: string;
  medicines: Array<{
    name: string;
    strength: string;
    dosage: string;
    frequency: string;
    duration: string;
    instruction: string;
    timing: string;
    dosageForm: string;
  }>;
}

export const DEMO_PRESCRIPTIONS: DemoPrescriptionOption[] = [
  {
    id: 'demo-respiratory',
    title: 'Acute Bronchitis & Fever',
    category: 'Respiratory / General Medicine',
    doctorName: 'Dr. Aarav Mehta, MD (Internal Medicine)',
    clinic: 'Apex Wellness Clinic, Pune',
    date: '14 May 2025',
    patientName: 'Sunita Sharma (Sample Patient)',
    patientAgeGender: '42 Y / Female',
    diagnosisNote: 'Acute upper respiratory tract infection with moderate fever and chest congestion',
    medicines: [
      {
        name: 'Augmentin 625 (Amoxicillin + Clavulanic Acid)',
        strength: '625 mg (500mg Amox + 125mg Clav)',
        dosage: '1 Tablet',
        frequency: 'Twice daily (Morning & Night)',
        duration: '5 days',
        instruction: 'Take with or right after food. Complete the full 5-day course.',
        timing: 'After meals',
        dosageForm: 'Tablet'
      },
      {
        name: 'Dolo 650 (Paracetamol)',
        strength: '650 mg',
        dosage: '1 Tablet',
        frequency: 'As needed (SOS) every 6-8 hours for fever/bodyache',
        duration: '3 to 5 days',
        instruction: 'Take with warm water if temperature exceeds 100°F or for body ache. Max 3 tablets in 24 hours.',
        timing: 'After food',
        dosageForm: 'Tablet'
      },
      {
        name: 'Montair LC (Montelukast + Levocetirizine)',
        strength: '10 mg + 5 mg',
        dosage: '1 Tablet',
        frequency: 'Once daily at bedtime',
        duration: '7 days',
        instruction: 'Take at night after dinner. May cause mild sleepiness; avoid night driving.',
        timing: 'Bedtime',
        dosageForm: 'Tablet'
      },
      {
        name: 'Pan 40 (Pantoprazole)',
        strength: '40 mg',
        dosage: '1 Tablet',
        frequency: 'Once daily in the morning',
        duration: '5 days',
        instruction: 'Take 30 minutes before breakfast with a glass of water to prevent antibiotic acidity.',
        timing: 'Empty stomach (Morning)',
        dosageForm: 'Tablet'
      }
    ]
  },
  {
    id: 'demo-cardiometabolic',
    title: 'Type 2 Diabetes & Hypertension Maintenance',
    category: 'Cardiometabolic Care',
    doctorName: 'Dr. Priya Kulkarni, DM (Endocrinology)',
    clinic: 'Metro Care Endocrinology Centre, Mumbai',
    date: '28 June 2025',
    patientName: 'Ramesh Patil (Sample Patient)',
    patientAgeGender: '58 Y / Male',
    diagnosisNote: 'Essential Hypertension & Type-2 Diabetes Mellitus - Routine 3-Month Follow Up',
    medicines: [
      {
        name: 'Glycomet SR (Metformin Hydrochloride)',
        strength: '500 mg (Sustained Release)',
        dosage: '1 Tablet',
        frequency: 'Twice daily with meals',
        duration: '30 days',
        instruction: 'Take immediately with breakfast and dinner. Do not crush or chew sustained-release tablet.',
        timing: 'With meals',
        dosageForm: 'Sustained Release Tablet'
      },
      {
        name: 'Telma 40 (Telmisartan)',
        strength: '40 mg',
        dosage: '1 Tablet',
        frequency: 'Once daily in the morning',
        duration: '30 days',
        instruction: 'Take in the morning at a fixed time every day. Keep blood pressure log.',
        timing: 'Morning',
        dosageForm: 'Tablet'
      },
      {
        name: 'Amlong 5 (Amlodipine)',
        strength: '5 mg',
        dosage: '1 Tablet',
        frequency: 'Once daily in the evening',
        duration: '30 days',
        instruction: 'Take with water at evening 6 PM. Check for any ankle swelling.',
        timing: 'Evening',
        dosageForm: 'Tablet'
      },
      {
        name: 'Special Tonic FX-Herb (Handwritten / Unverified compound)',
        strength: '15 ml',
        dosage: '1 tablespoon',
        frequency: 'Once daily',
        duration: '15 days',
        instruction: 'Mix with warm milk at night.',
        timing: 'Night',
        dosageForm: 'Tonic'
      }
    ]
  }
];

export function buildAnalysisResultFromDemo(demo: DemoPrescriptionOption): PrescriptionAnalysisResult {
  const medicines = demo.medicines.map((m, idx) => {
    const trusted = lookupMedicine(m.name);
    const verified = trusted !== null && trusted.isVerified;
    const explanations = generateMultilingualExplanation(
      m.name,
      m.strength,
      m.frequency,
      m.duration,
      m.instruction,
      trusted
    );

    return {
      id: `med-${demo.id}-${idx + 1}`,
      name: m.name,
      strength: m.strength,
      dosage: m.dosage,
      frequency: m.frequency,
      duration: m.duration,
      instruction: m.instruction,
      timing: m.timing,
      dosageForm: m.dosageForm,
      verified,
      trustedInfo: trusted || undefined,
      patientExplanation: explanations,
      warning: verified
        ? undefined
        : '⚠️ This medicine could not be confirmed in the trusted knowledge base. Do not guess. Please verify with your doctor or pharmacist.'
    };
  });

  const unverifiedCount = medicines.filter(m => !m.verified).length;

  return {
    id: `presc-${demo.id}`,
    patientName: demo.patientName,
    doctorOrClinic: `${demo.doctorName} • ${demo.clinic}`,
    date: demo.date,
    rawMedicinesCount: medicines.length,
    medicines,
    generalAdvice: {
      en: 'Take all prescribed doses at regular intervals. Maintain adequate hydration and do not stop antibiotics early even if fever subsides.',
      hi: 'सभी निर्धारित दवाएं समय पर लें। पर्याप्त पानी पिएं और बुखार कम होने पर भी एंटीबायोटिक का कोर्स बीच में न छोड़ें।',
      mr: 'सर्व औषधे वेळेवर घ्या. पुरेसे पाणी प्या आणि ताप कमी झाला तरी अँटीबायोटिकचा पूर्ण डोस डॉक्टरांच्या सल्ल्यानुसार पूर्ण करा.',
      es: 'Tome todas las dosis prescritas a intervalos regulares. Mantenga una hidratación adecuada y no suspenda los antibióticos antes de tiempo.',
      fr: 'Prenez toutes les doses prescrites à intervalles réguliers. Maintenez une bonne hydratation et n’interrompez pas les antibiotiques avant la fin du traitement.',
      de: 'Nehmen Sie alle verordneten Dosen in regelmäßigen Abständen ein. Trinken Sie ausreichend und setzen Sie Antibiotika nicht vorzeitig ab.',
      ar: 'تناول جميع الجرعات الموصوفة في مواعيدها بانتظام. احرص على شرب كميات كافية من الماء ولا توقف المضادات الحيوية مبكراً.',
      bn: 'নিয়মিত বিরতিতে সমস্ত নির্ধারিত ওষুধ সেবন করুন। পর্যাপ্ত জল পান করুন এবং জ্বর কমে গেলেও অ্যান্টিবায়োটিকের কোর্স সম্পূর্ণ করুন।',
      ta: 'குறிப்பிட்ட கால இடைவெளியில் அனைத்து மருந்துகளையும் தவறாமல் உட்கொள்ளவும். போதுமான அளவு தண்ணீர் குடிக்கவும் மற்றும் ஆண்டிபயாடிக் படிப்பை இடையில் நிறுத்த வேண்டாம்.',
      te: 'క్రమం తప్పకుండా నిర్దేశిత సమయాల్లో మందులు వాడండి. తగినంత నీరు తాగండి మరియు జ్వరం తగ్గినా యాంటీబయాటిక్ కోర్సును మధ్యలో ఆపవద్దు.',
      gu: 'તમામ દવાઓ નિયમિત અંતરે લો. પૂરતું પાણી પીવો અને તાવ ઓછો થાય તો પણ એન્ટિબાયોટિકનો કોર્સ અધવચ્ચે છોડશો નહીં.',
    },
    confidenceNotes: 'Sample prescription analyzed successfully with high OCR clarity and clinical guideline cross-referencing.',
    isDemo: true,
    unverifiedCount
  };
}
