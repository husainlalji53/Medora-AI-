import { TrustedMedicineInfo, MedicineExplanationLanguage } from '../types';

export const TRUSTED_MEDICINES: TrustedMedicineInfo[] = [
  {
    genericName: 'Paracetamol / Acetaminophen',
    brandAliases: ['calpol', 'dolo', 'dolo 650', 'crocin', 'pacimol', 'tylenol', 'panadol', 'paracetamol'],
    drugClass: 'Analgesic and Antipyretic',
    primaryUse: 'Used to relieve mild to moderate pain (headache, body ache) and reduce fever.',
    commonSideEffects: ['Mild nausea', 'Rare skin rash when allergic'],
    precautions: [
      'Do not exceed the maximum daily dose (usually 4,000 mg in adults) to avoid liver injury.',
      'Check other cold/flu medications so you do not take double paracetamol.',
      'Avoid regular or heavy alcohol consumption while taking this medication.'
    ],
    dietaryAdvice: 'Can be taken with or without food. Taking after light food can prevent stomach discomfort.',
    verificationSource: 'WHO Model List of Essential Medicines & National Formulary',
    isVerified: true,
  },
  {
    genericName: 'Amoxicillin + Potassium Clavulanate',
    brandAliases: ['augmentin', 'amoxyclav', 'moxikind-cv', 'clavum', 'amoxicillin', 'moxclav', 'novamox'],
    drugClass: 'Penicillin-group Antibiotic',
    primaryUse: 'Used to treat bacterial infections of the chest, sinuses, ears, skin, and urinary tract.',
    commonSideEffects: ['Diarrhea or loose stools', 'Mild nausea', 'Vomiting', 'Fungal rash (thrush)'],
    precautions: [
      'Complete the entire prescribed duration even if you feel completely recovered earlier.',
      'Inform your doctor immediately if you have had an allergic reaction to penicillin in the past.',
      'Report any severe watery diarrhea that occurs during or after treatment.'
    ],
    dietaryAdvice: 'Take at the start of a meal or with food to minimize stomach upset and enhance absorption.',
    verificationSource: 'British National Formulary (BNF) & FDA Approved Prescribing Information',
    isVerified: true,
  },
  {
    genericName: 'Azithromycin',
    brandAliases: ['azithral', 'zithromax', 'azee', 'azimax', 'zady', 'azithromycin'],
    drugClass: 'Macrolide Antibiotic',
    primaryUse: 'Used to treat specific bacterial infections including respiratory tract infections, tonsillitis, and ear infections.',
    commonSideEffects: ['Stomach cramps', 'Diarrhea', 'Mild headache'],
    precautions: [
      'Take once daily at exactly the same time each day for the full course prescribed.',
      'Do not take antacids containing aluminum or magnesium at the same time; space them by at least 2 hours.',
      'Notify your doctor if you experience irregular heartbeat or severe dizziness.'
    ],
    dietaryAdvice: 'May be taken with or without food. If stomach upset occurs, taking with light food helps.',
    verificationSource: 'WHO Essential Medicines List & FDA Drug Information',
    isVerified: true,
  },
  {
    genericName: 'Pantoprazole',
    brandAliases: ['pan', 'pan 40', 'pantocid', 'pantosec', 'protonix', 'pantoprazole'],
    drugClass: 'Proton Pump Inhibitor (Acid Reducer)',
    primaryUse: 'Used to reduce stomach acid production, treating acid reflux, heartburn, and stomach ulcers, and protecting the stomach from other medicines.',
    commonSideEffects: ['Headache', 'Mild stomach ache', 'Flatulence'],
    precautions: [
      'Swallow the tablet whole with a glass of water; do not crush, break, or chew it.',
      'Usually taken 30 to 60 minutes before breakfast for optimal acid suppression.',
      'Long-term continuous use should be reviewed periodically with your doctor.'
    ],
    dietaryAdvice: 'Best taken on an empty stomach in the morning, 30 to 60 minutes before the first meal.',
    verificationSource: 'National Institute for Health and Care Excellence (NICE) & USP Guidelines',
    isVerified: true,
  },
  {
    genericName: 'Omeprazole',
    brandAliases: ['omez', 'prilosec', 'omizac', 'omecid', 'omeprazole'],
    drugClass: 'Proton Pump Inhibitor (Antacid)',
    primaryUse: 'Reduces excessive acid in the stomach to heal gastritis, acidity, gastroesophageal reflux, and ulcers.',
    commonSideEffects: ['Mild headache', 'Abdominal pain', 'Constipation or loose stools'],
    precautions: [
      'Take 30 minutes before your morning meal.',
      'Swallow capsules whole without opening or chewing unless instructed by a pharmacist.'
    ],
    dietaryAdvice: 'Take with a glass of water on an empty stomach 30 to 60 minutes before morning food.',
    verificationSource: 'FDA Approved Drug Database & WHO Essential Medicines',
    isVerified: true,
  },
  {
    genericName: 'Metformin Hydrochloride',
    brandAliases: ['glycomet', 'glucophage', 'cetapin', 'obimet', 'metformin'],
    drugClass: 'Biguanide Antidiabetic',
    primaryUse: 'Used to control high blood sugar levels in patients with Type 2 Diabetes.',
    commonSideEffects: ['Metallic taste in mouth', 'Stomach bloating', 'Nausea', 'Mild diarrhea'],
    precautions: [
      'Always take with meals to reduce gastrointestinal side effects.',
      'Avoid excessive alcohol intake as it increases the risk of lactic acidosis.',
      'Inform doctor before any surgery, X-ray, or CT scan with contrast dye.'
    ],
    dietaryAdvice: 'Always take with or immediately after meals. Stay well-hydrated throughout the day.',
    verificationSource: 'American Diabetes Association (ADA) Clinical Guidelines',
    isVerified: true,
  },
  {
    genericName: 'Amlodipine Besylate',
    brandAliases: ['amlong', 'norvasc', 'stamlo', 'amlopres', 'amlodipine'],
    drugClass: 'Calcium Channel Blocker (Antihypertensive)',
    primaryUse: 'Used to lower high blood pressure and prevent chest pain (angina).',
    commonSideEffects: ['Swelling in the ankles or lower legs', 'Flushing', 'Fatigue', 'Dizziness'],
    precautions: [
      'Do not abruptly stop taking this medication as your blood pressure could rise rapidly.',
      'Get up slowly when standing from a sitting or lying position to prevent lightheadedness.',
      'Avoid large quantities of grapefruit juice.'
    ],
    dietaryAdvice: 'Can be taken with or without meals at a consistent time every day.',
    verificationSource: 'American Heart Association (AHA) & British National Formulary',
    isVerified: true,
  },
  {
    genericName: 'Telmisartan',
    brandAliases: ['telma', 'micardis', 'telmikind', 'telsartan', 'telmisartan'],
    drugClass: 'Angiotensin Receptor Blocker (ARB)',
    primaryUse: 'Used to manage high blood pressure and protect kidney function in cardiovascular health.',
    commonSideEffects: ['Mild dizziness', 'Back pain', 'Sinus congestion'],
    precautions: [
      'Do not take during pregnancy or if planning pregnancy.',
      'Monitor blood pressure regularly as directed by your physician.',
      'Avoid potassium supplements or salt substitutes without consulting your physician.'
    ],
    dietaryAdvice: 'Take with or without food at the same time each day.',
    verificationSource: 'ESC/ESH Guidelines for the Management of Arterial Hypertension',
    isVerified: true,
  },
  {
    genericName: 'Cetirizine Hydrochloride',
    brandAliases: ['cetzine', 'zyrtec', 'alerdex', 'okacet', 'cetirizine'],
    drugClass: 'Second-Generation Antihistamine',
    primaryUse: 'Used to relieve allergy symptoms such as watery eyes, runny nose, itching, sneezing, and hives.',
    commonSideEffects: ['Mild drowsiness', 'Dry mouth', 'Tiredness'],
    precautions: [
      'Usually taken once daily in the evening because it can cause mild sleepiness.',
      'Avoid driving or operating heavy machinery if you feel drowsy.',
      'Avoid drinking alcohol while taking antihistamines.'
    ],
    dietaryAdvice: 'Can be taken with or without food. Drink plenty of water if mouth feels dry.',
    verificationSource: 'FDA Approved Product Monograph & WHO Essential Medicines',
    isVerified: true,
  },
  {
    genericName: 'Montelukast + Levocetirizine',
    brandAliases: ['montair-lc', 'telekast-l', 'montek-lc', 'levocet-m', 'montelukast'],
    drugClass: 'Leukotriene Receptor Antagonist + Antihistamine',
    primaryUse: 'Used to treat allergic rhinitis, seasonal allergies, persistent sneezing, and bronchial irritation.',
    commonSideEffects: ['Drowsiness', 'Headache', 'Dry mouth', 'Vivid dreams'],
    precautions: [
      'Preferably taken at bedtime as it can cause sleepiness.',
      'Inform your doctor if you notice unexpected mood changes or sleep disturbances.',
      'This is a preventive and maintenance medicine; do not use as a rescue inhaler during acute asthma attack.'
    ],
    dietaryAdvice: 'Best taken in the evening after dinner with water.',
    verificationSource: 'GINA Global Strategy for Asthma Management & National Guidelines',
    isVerified: true,
  },
  {
    genericName: 'Salbutamol / Albuterol',
    brandAliases: ['asthalin', 'ventolin', 'aerolin', 'proair', 'salbutamol'],
    drugClass: 'Short-Acting Beta-2 Agonist (Bronchodilator)',
    primaryUse: 'Quickly opens airways to relieve wheezing, shortness of breath, and cough in asthma or bronchitis.',
    commonSideEffects: ['Fine hand tremors', 'Increased heart rate', 'Mild headache'],
    precautions: [
      'Use strictly as prescribed for acute breathlessness or cough bouts.',
      'Rinse mouth with water after using inhalers.',
      'Seek prompt medical emergency care if breathlessness does not ease within minutes.'
    ],
    dietaryAdvice: 'Can be taken regardless of food.',
    verificationSource: 'WHO Essential Inhaled Medicines & British Thoracic Society',
    isVerified: true,
  },
  {
    genericName: 'Ibuprofen',
    brandAliases: ['brufen', 'advil', 'motrin', 'ibuprofen', 'combiflam'],
    drugClass: 'Nonsteroidal Anti-inflammatory Drug (NSAID)',
    primaryUse: 'Relieves pain, inflammation, swelling, and fever in muscular pain, joint pain, or dental pain.',
    commonSideEffects: ['Stomach burning or acidity', 'Nausea', 'Heartburn'],
    precautions: [
      'Always take with or after food or milk to safeguard stomach lining.',
      'Avoid if you have active stomach ulcers, severe kidney problems, or aspirin allergy.',
      'Do not take longer than the prescribed duration.'
    ],
    dietaryAdvice: 'Always take with a meal or a glass of milk to prevent gastric irritation.',
    verificationSource: 'FDA Drug Database & BNF Guidance',
    isVerified: true,
  },
  {
    genericName: 'Oral Rehydration Salts (ORS)',
    brandAliases: ['electral', 'w.h.o. ors', 'prolyte', 'rehydral', 'ors'],
    drugClass: 'Electrolyte Replenisher',
    primaryUse: 'Restores essential water and electrolytes lost during diarrhea, vomiting, or excessive sweating.',
    commonSideEffects: ['None when mixed in correct water proportion'],
    precautions: [
      'Dissolve one full packet in the exact volume of clean drinking water indicated on the packet (usually 1 liter or 200 ml).',
      'Do not boil the prepared solution or add extra sugar or salt.',
      'Discard any unused prepared solution after 24 hours.'
    ],
    dietaryAdvice: 'Sip slowly throughout the day between bouts of loose stools.',
    verificationSource: 'WHO/UNICEF Standard Reduced Osmolarity ORS Formulation',
    isVerified: true,
  },
  {
    genericName: 'Vitamin D3 (Cholecalciferol)',
    brandAliases: ['d3-must', 'calcirol', 'uprise-d3', 'dv-60k', 'cholecalciferol', 'vitamin d3'],
    drugClass: 'Fat-Soluble Vitamin',
    primaryUse: 'Maintains healthy bone density, calcium absorption, and muscle & immune function.',
    commonSideEffects: ['None at prescribed doses; excessive dosing can cause hypercalcemia'],
    precautions: [
      'Take weekly or monthly as explicitly scheduled by your doctor.',
      'Do not take daily if prescribed a high-strength weekly dose (e.g. 60,000 IU).'
    ],
    dietaryAdvice: 'Take with or right after a meal containing healthy fats (milk, yogurt, or food) for optimal absorption.',
    verificationSource: 'Endocrine Society Clinical Practice Guidelines',
    isVerified: true,
  }
];

export function normalizeMedicineName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function lookupMedicine(rawName: string): TrustedMedicineInfo | null {
  if (!rawName) return null;
  const clean = normalizeMedicineName(rawName);

  for (const med of TRUSTED_MEDICINES) {
    const genericClean = normalizeMedicineName(med.genericName);
    if (clean.includes(genericClean) || genericClean.includes(clean)) {
      return med;
    }
    for (const alias of med.brandAliases) {
      const aliasClean = normalizeMedicineName(alias);
      if (clean.includes(aliasClean) || aliasClean.includes(clean)) {
        return med;
      }
    }
  }

  // Check partial word matches of length >= 4
  const words = clean.split(' ').filter(w => w.length >= 4);
  for (const med of TRUSTED_MEDICINES) {
    for (const alias of med.brandAliases) {
      if (words.some(w => alias.toLowerCase().includes(w) || w.includes(alias.toLowerCase()))) {
        return med;
      }
    }
  }

  return null;
}

export function generateMultilingualExplanation(
  medicineName: string,
  strength: string,
  frequency: string,
  duration: string,
  instruction: string,
  trusted: TrustedMedicineInfo | null
): Record<string, MedicineExplanationLanguage> & { en: MedicineExplanationLanguage } {
  if (trusted && trusted.isVerified) {
    return {
      en: {
        whatIsIt: `${trusted.genericName} is a ${trusted.drugClass}. ${trusted.primaryUse}`,
        howToTake: `Doctor prescribed: ${strength || ''} ${frequency ? `to be taken ${frequency}` : ''} ${duration ? `for ${duration}` : ''}. ${instruction || trusted.dietaryAdvice}`,
        importantInfo: `Precautions: ${trusted.precautions[0]} Dietary advice: ${trusted.dietaryAdvice} Common side effects: ${trusted.commonSideEffects.join(', ')}. Verified via ${trusted.verificationSource}.`,
        summaryAudioText: `Here is the explanation for ${medicineName}. This medicine is ${trusted.genericName}, which is a ${trusted.drugClass}. Your doctor asked you to take it ${frequency || 'as instructed'} ${duration ? `for ${duration}` : ''}. ${instruction || trusted.dietaryAdvice}. Always take with water and remember to consult your pharmacist if you notice any unusual symptoms.`
      },
      hi: {
        whatIsIt: `${medicineName} (${trusted.genericName}) एक ${trusted.drugClass} है। इसका मुख्य उपयोग: ${trusted.primaryUse}`,
        howToTake: `डॉक्टर के निर्देश: ${strength || ''} ${frequency ? `लेने की आवृत्ति: ${frequency}` : ''} ${duration ? `अवधि: ${duration}` : ''}। सेवन निर्देश: ${instruction || trusted.dietaryAdvice}।`,
        importantInfo: `महत्वपूर्ण सावधानियां: ${trusted.precautions[0]}। खान-पान सलाह: ${trusted.dietaryAdvice}। संभावित प्रभाव: ${trusted.commonSideEffects.join(', ')}। यह जानकारी विश्वसनीय मेडिकल गाइडलाइन से सत्यापित है।`,
        summaryAudioText: `${medicineName} के लिए डॉक्टर के निर्देश सुनें। यह दवा ${trusted.genericName} है। डॉक्टर के अनुसार इसे ${frequency || 'निर्देशानुसार'} ${duration ? `${duration} तक` : ''} लेना है। ${instruction || trusted.dietaryAdvice}। किसी भी संशय के लिए अपने डॉक्टर या फार्मासिस्ट से परामर्श अवश्य लें।`
      },
      mr: {
        whatIsIt: `${medicineName} (${trusted.genericName}) हे एक ${trusted.drugClass} आहे. याचा मुख्य उपयोग: ${trusted.primaryUse}`,
        howToTake: `डॉक्टरांनी सांगितल्यानुसार: ${strength || ''} ${frequency ? `घेण्याची वेळ: ${frequency}` : ''} ${duration ? `कालावधी: ${duration}` : ''}. सूचना: ${instruction || trusted.dietaryAdvice}.`,
        importantInfo: `महत्त्वाची काळजी: ${trusted.precautions[0]} खाण्यापिण्याचा सल्ला: ${trusted.dietaryAdvice}. संभाव्य दुष्परिणाम: ${trusted.commonSideEffects.join(', ')}. ही माहिती प्रमाणित वैद्यकीय स्रोतांवर आधारित आहे.`,
        summaryAudioText: `${medicineName} विषयी डॉक्टरांचे मार्गदर्शन ऐका. हे औषध ${trusted.genericName} वर्गातील आहे. डॉक्टरांनी सांगितल्याप्रमाणे ${frequency || 'सूचनेनुसार'} ${duration ? `${duration} कालावधीसाठी` : ''} घ्यावे. ${instruction || trusted.dietaryAdvice}. शंका असल्यास आपल्या डॉक्टरांशी नक्की संपर्क साधा.`
      },
      es: {
        whatIsIt: `${trusted.genericName} es un(a) ${trusted.drugClass}. ${trusted.primaryUse}`,
        howToTake: `Prescripción médica: ${strength || ''} ${frequency ? `tomar ${frequency}` : ''} ${duration ? `durante ${duration}` : ''}. ${instruction || trusted.dietaryAdvice}.`,
        importantInfo: `Precauciones: ${trusted.precautions[0]}. Consejos dietéticos: ${trusted.dietaryAdvice}. Efectos secundarios comunes: ${trusted.commonSideEffects.join(', ')}. Verificado mediante ${trusted.verificationSource}.`,
        summaryAudioText: `Instrucciones para ${medicineName}. Este medicamento es ${trusted.genericName}, clase ${trusted.drugClass}. Su médico le indicó tomarlo ${frequency || 'según las indicaciones'} ${duration ? `por ${duration}` : ''}. ${instruction || trusted.dietaryAdvice}. Tómelo con agua y consulte a su médico o farmacéutico si nota síntomas inusuales.`
      },
      fr: {
        whatIsIt: `${trusted.genericName} appartient à la classe : ${trusted.drugClass}. ${trusted.primaryUse}`,
        howToTake: `Prescription médicale : ${strength || ''} ${frequency ? `à prendre ${frequency}` : ''} ${duration ? `pendant ${duration}` : ''}. ${instruction || trusted.dietaryAdvice}.`,
        importantInfo: `Précautions : ${trusted.precautions[0]}. Conseils alimentaires : ${trusted.dietaryAdvice}. Effets secondaires fréquents : ${trusted.commonSideEffects.join(', ')}. Vérifié selon ${trusted.verificationSource}.`,
        summaryAudioText: `Explication pour ${medicineName}. Ce médicament est ${trusted.genericName} (${trusted.drugClass}). Votre médecin vous a prescrit de le prendre ${frequency || 'selon les consignes'} ${duration ? `pendant ${duration}` : ''}. ${instruction || trusted.dietaryAdvice}. Prenez avec de l'eau et consultez votre pharmacien en cas de doute.`
      },
      de: {
        whatIsIt: `${trusted.genericName} ist ein(e) ${trusted.drugClass}. ${trusted.primaryUse}`,
        howToTake: `Ärztliche Verordnung: ${strength || ''} ${frequency ? `einzunehmen ${frequency}` : ''} ${duration ? `für ${duration}` : ''}. ${instruction || trusted.dietaryAdvice}.`,
        importantInfo: `Vorsichtsmaßnahmen: ${trusted.precautions[0]}. Ernährungshinweis: ${trusted.dietaryAdvice}. Häufige Nebenwirkungen: ${trusted.commonSideEffects.join(', ')}. Verifiziert über ${trusted.verificationSource}.`,
        summaryAudioText: `Anweisung für ${medicineName}. Dieses Medikament ist ${trusted.genericName} (${trusted.drugClass}). Ihr Arzt hat die Einnahme ${frequency || 'wie verordnet'} ${duration ? `für ${duration}` : ''} empfohlen. ${instruction || trusted.dietaryAdvice}. Mit ausreichend Wasser einnehmen.`
      },
      ar: {
        whatIsIt: `${trusted.genericName} ينتمي إلى فئة: ${trusted.drugClass}. الاستخدام الأساسي: ${trusted.primaryUse}`,
        howToTake: `تعليمات الطبيب: ${strength || ''} ${frequency ? `يؤخذ ${frequency}` : ''} ${duration ? `لمدة ${duration}` : ''}. ${instruction || trusted.dietaryAdvice}.`,
        importantInfo: `احتياطات هامة: ${trusted.precautions[0]}. إرشادات الطعام: ${trusted.dietaryAdvice}. الآثار الجانبية الشائعة: ${trusted.commonSideEffects.join('، ')}. موثق وفق ${trusted.verificationSource}.`,
        summaryAudioText: `إرشادات حول دواء ${medicineName}. هذا الدواء هو ${trusted.genericName} من فئة ${trusted.drugClass}. حدد الطبيب تناوله ${frequency || 'حسب التوجيهات'} ${duration ? `لمدة ${duration}` : ''}. ${instruction || trusted.dietaryAdvice}. احرص دائماً على شرب الماء واستشارة الصيدلي.`
      },
      bn: {
        whatIsIt: `${medicineName} (${trusted.genericName}) একটি ${trusted.drugClass}। এর মূল ব্যবহার: ${trusted.primaryUse}`,
        howToTake: `ডাক্তারের নির্দেশ: ${strength || ''} ${frequency ? `সেবনের নিয়ম: ${frequency}` : ''} ${duration ? `মেয়াদ: ${duration}` : ''}। নির্দেশ: ${instruction || trusted.dietaryAdvice}।`,
        importantInfo: `প্রয়োজনীয় সতর্কতা: ${trusted.precautions[0]}। খাদ্যাভ্যাস পরামর্শ: ${trusted.dietaryAdvice}। সম্ভাব্য পার্শ্বপ্রতিক্রিয়া: ${trusted.commonSideEffects.join(', ')}। তথ্যসূত্র: ${trusted.verificationSource}।`,
        summaryAudioText: `${medicineName} এর জন্য ডাক্তারের নির্দেশাবলী। এই ওষুধটি ${trusted.genericName} শ্রেণিভুক্ত। ডাক্তার যেভাবে নির্দেশ দিয়েছেন ${frequency || 'নিয়মমাফিক'} ${duration ? `${duration} সময় ধরে` : ''} সেবন করুন। ${instruction || trusted.dietaryAdvice}। প্রয়োজনে ফার্মাসিস্ট বা ডাক্তারের পরামর্শ নিন।`
      },
      ta: {
        whatIsIt: `${medicineName} (${trusted.genericName}) என்பது ${trusted.drugClass} வகையைச் சார்ந்தது. முதன்மைப் பயன்பாடு: ${trusted.primaryUse}`,
        howToTake: `மருத்துவர் அறிவுரை: ${strength || ''} ${frequency ? `எடுத்துக்கொள்ள வேண்டிய நேரம்: ${frequency}` : ''} ${duration ? `கால அளவு: ${duration}` : ''}. குறிப்பு: ${instruction || trusted.dietaryAdvice}.`,
        importantInfo: `முக்கிய முன்னெச்சரிக்கைகள்: ${trusted.precautions[0]}. உணவு ஆலோசனை: ${trusted.dietaryAdvice}. பொதுவான பக்கவிளைவுகள்: ${trusted.commonSideEffects.join(', ')}. ஆதாரம்: ${trusted.verificationSource}.`,
        summaryAudioText: `${medicineName} மருந்து பற்றிய வழிகாட்டல். இந்த மருந்து ${trusted.genericName} வகையைச் சார்ந்தது. மருத்துவரின் அறிவுரைப்படி ${frequency || 'குறிப்பிட்டபடி'} ${duration ? `${duration} நாட்களுக்கு` : ''} உட்கொள்ளவும். ${instruction || trusted.dietaryAdvice}. ஏதேனும் சந்தேகம் இருந்தால் உங்கள் மருத்துவரிடம் கேளுங்கள்.`
      },
      te: {
        whatIsIt: `${medicineName} (${trusted.genericName}) అనేది ${trusted.drugClass} విభాగానికి చెందినది. ముఖ్య ఉపయోగం: ${trusted.primaryUse}`,
        howToTake: `వైద్యుని సూచన: ${strength || ''} ${frequency ? `తీసుకోవాల్సిన సమయం: ${frequency}` : ''} ${duration ? `వ్యవధి: ${duration}` : ''}. సూచన: ${instruction || trusted.dietaryAdvice}.`,
        importantInfo: `జాగ్రత్తలు: ${trusted.precautions[0]}. ఆహార సలహా: ${trusted.dietaryAdvice}. సాధారణ దుష్ప్రభావాలు: ${trusted.commonSideEffects.join(', ')}. ధృవీకరణ: ${trusted.verificationSource}.`,
        summaryAudioText: `${medicineName} గురించిన సూచనలు. ఈ మందు ${trusted.genericName} తరగతికి చెందినది. డాక్టర్ సూచించిన విధంగా ${frequency || 'చెప్పినట్లుగా'} ${duration ? `${duration} వరకు` : ''} వాడండి. ${instruction || trusted.dietaryAdvice}. సందేహాలుంటే ఫార్మసిస్ట్‌ను సంప్రదించండి.`
      },
      gu: {
        whatIsIt: `${medicineName} (${trusted.genericName}) એ ${trusted.drugClass} વર્ગની દવા છે. મુખ્ય ઉપયોગ: ${trusted.primaryUse}`,
        howToTake: `ડૉક્ટરની સલાહ: ${strength || ''} ${frequency ? `લેવાનો સમય: ${frequency}` : ''} ${duration ? `સમયગાળો: ${duration}` : ''}. સૂચના: ${instruction || trusted.dietaryAdvice}.`,
        importantInfo: `મહત્વની સાવચેતી: ${trusted.precautions[0]}. આહાર સલાહ: ${trusted.dietaryAdvice}. સામાન્ય આડઅસરો: ${trusted.commonSideEffects.join(', ')}. સત્તાવાર સ્ત્રોત: ${trusted.verificationSource}.`,
        summaryAudioText: `${medicineName} દવા વિશે માહિતી. આ દવા ${trusted.genericName} છે. તમારા ડૉક્ટરે તેને ${frequency || 'સૂચવ્યા મુજબ'} ${duration ? `${duration} સુધી` : ''} લેવા જણાવ્યું છે. ${instruction || trusted.dietaryAdvice}. હંમેશા પાણી સાથે લો અને જરૂર જણાયે ડૉક્ટરનો સંપર્ક કરો.`
      }
    };
  }

  // If unverified / not in trusted database - DO NOT GUESS!
  return {
    en: {
      whatIsIt: `Information for "${medicineName}" could not be reliably verified in the trusted medicine knowledge base.`,
      howToTake: `Prescription label reads: ${strength || ''} ${frequency || ''} ${duration || ''}. ${instruction || 'No specific instruction noted.'}`,
      importantInfo: `⚠️ ATTENTION: Because reliable medicine details could not be independently confirmed, Medora will NOT guess or make assumptions. Please confirm this exact medicine name, strength, and purpose with your prescribing doctor or licensed pharmacist before taking.`,
      summaryAudioText: `Attention regarding ${medicineName}. This medicine could not be reliably verified in our trusted medical knowledge base. Medora does not guess medication details. Please verify the exact medicine and instructions directly with your doctor or pharmacist.`
    },
    hi: {
      whatIsIt: `"${medicineName}" की जानकारी प्रमाणित मेडिकल डेटाबेस में विश्वसनीय रूप से सत्यापित नहीं हो सकी।`,
      howToTake: `पर्चे पर लिखा निर्देश: ${strength || ''} ${frequency || ''} ${duration || ''}। ${instruction || 'विशिष्ट निर्देश उपलब्ध नहीं है।'}`,
      importantInfo: `⚠️ आवश्यक चेतावनी: क्योंकि इस दवा की स्वतंत्र रूप से पुष्टि नहीं हो सकी, मेडोरा कोई अनुमान नहीं लगाता है। कृपया इस दवा के नाम, खुराक और उपयोग के बारे में अपने डॉक्टर या फार्मासिस्ट से अवश्य पुष्टि करें।`,
      summaryAudioText: `सावधानी सूचना: ${medicineName} की जानकारी प्रमाणित डेटाबेस में नहीं मिली। कृपया इस दवा को लेने से पहले अपने डॉक्टर या मेडिकल स्टोर वाले फार्मासिस्ट से दोबारा जांच करवा लें।`
    },
    mr: {
      whatIsIt: `"${medicineName}" या औषधाची माहिती प्रमाणित वैद्यकीय ज्ञानकोशात खात्रीशीरपणे सापडली नाही.`,
      howToTake: `प्रिस्क्रिप्शनवरील नोंद: ${strength || ''} ${frequency || ''} ${duration || ''}. ${instruction || 'कोणतीही विशेष सूचना नाही.'}`,
      importantInfo: `⚠️ महत्त्वाची चेतावणी: या औषधाची खात्रीशीर माहिती पडताळून न आल्यामुळे, मेडोरा कोणताही अंदाज लावत नाही. कृपया हे औषध घेण्यापूर्वी आपल्या डॉक्टरांशी किंवा फार्मासिस्टशी संपर्क साधून खात्री करून घ्या.`,
      summaryAudioText: `महत्त्वाची सूचना: ${medicineName} या औषधाची माहिती प्रमाणित स्रोतांमध्ये खात्रीपूर्वक आढळली नाही. कृपया डॉक्टरांशी किंवा फार्मासिस्टशी बोलून खात्री करा.`
    },
    es: {
      whatIsIt: `La información para "${medicineName}" no pudo verificarse de forma fiable en la base de datos médica clínica.`,
      howToTake: `Indicación de la receta: ${strength || ''} ${frequency || ''} ${duration || ''}. ${instruction || 'Sin instrucciones adicionales registradas.'}`,
      importantInfo: `⚠️ ATENCIÓN: Al no contar con confirmación independiente fiable, Medora NO realiza suposiciones. Por favor confirme el nombre exacto, dosis y propósito con su médico tratante o farmacéutico certificado antes de consumirlo.`,
      summaryAudioText: `Atención sobre ${medicineName}. Este medicamento no pudo ser confirmado en nuestra base de datos verificada. Medora no adivina datos farmacológicos. Verifique con su médico o farmacéutico antes de tomarlo.`
    },
    fr: {
      whatIsIt: `Les informations pour "${medicineName}" n'ont pas pu être vérifiées dans la base de données médicale.`,
      howToTake: `Mention de l'ordonnance : ${strength || ''} ${frequency || ''} ${duration || ''}. ${instruction || 'Aucune consigne spécifique notée.'}`,
      importantInfo: `⚠️ ATTENTION : Medora ne devine jamais les indications médicamenteuses. Veuillez vérifier le nom exact, le dosage et la posologie directement auprès de votre médecin prescripteur ou de votre pharmacien.`,
      summaryAudioText: `Avis d'attention pour ${medicineName}. Ce médicament nécessite une vérification auprès de votre pharmacien ou médecin avant toute prise.`
    },
    de: {
      whatIsIt: `Angaben zu "${medicineName}" konnten in der medizinischen Datenbank nicht zweifelsfrei verifiziert werden.`,
      howToTake: `Rezeptangabe: ${strength || ''} ${frequency || ''} ${duration || ''}. ${instruction || 'Keine spezifische Anweisung erfasst.'}`,
      importantInfo: `⚠️ ACHTUNG: Medora stellt keine Vermutungen an. Bitte halten Sie vor der Einnahme Rücksprache mit Ihrem behandelnden Arzt oder Apotheker.`,
      summaryAudioText: `Wichtiger Hinweis zu ${medicineName}. Bitte verifizieren Sie Dosierung und Einnahme direkt bei Ihrem Arzt oder Apotheker.`
    },
    ar: {
      whatIsIt: `تعذر التحقق من معلومات "${medicineName}" بشكل موثوق في قاعدة البيانات السريرية المعتمدة.`,
      howToTake: `التعليمات المسجلة: ${strength || ''} ${frequency || ''} ${duration || ''}. ${instruction || 'لم تُذكر تعليمات خاصة.'}`,
      importantInfo: `⚠️ تنبيه هام: نظراً لعدم تأكيد بيانات الدواء بشكل مستقل، فإن ميدورا لا يقدم تخمينات. يرجى مراجعة الطبيب المعالج أو الصيدلي للتأكد قبل التناول.`,
      summaryAudioText: `تنبيه بشأن ${medicineName}. يرجى تأكيد اسم الدواء وجرعته مع الطبيب أو الصيدلي قبل البدء في تناوله.`
    },
    bn: {
      whatIsIt: `"${medicineName}" ওষুধের তথ্য বিশ্বস্ত মেডিকেল ডাটাবেসে নিশ্চিতভাবে মেলেনি।`,
      howToTake: `প্রেসক্রিপশনের বিবরণ: ${strength || ''} ${frequency || ''} ${duration || ''}। ${instruction || 'নির্দিষ্ট কোনো নিয়ম উল্লেখ নেই।'}`,
      importantInfo: `⚠️ দৃষ্টি আকর্ষণ: সঠিক তথ্য নিশ্চিত না হওয়া পর্যন্ত মেডোরা কোনো অনুমান করে না। সেবনের পূর্বে অনুগ্রহ করে আপনার প্রেসক্রিপশনকারী ডাক্তার বা রেজিস্টার্ড ফার্মাসিস্টের সাথে নিশ্চিত হয়ে নিন।`,
      summaryAudioText: `${medicineName} সম্পর্কে সতর্কতা। সেবনের আগে অবশ্যই ডাক্তার বা ফার্মাসিস্টের সাথে কথা বলে সঠিক নিয়ম জেনে নিন।`
    },
    ta: {
      whatIsIt: `"${medicineName}" மருந்தின் விவரங்கள் மருத்துவ வழிகாட்டல் தளத்தில் உறுதியாகக் கிடைக்கவில்லை.`,
      howToTake: `மருந்துச்சீட்டுக் குறிப்பு: ${strength || ''} ${frequency || ''} ${duration || ''}. ${instruction || 'குறிப்பிட்ட அறிவுரை இல்லை.'}`,
      importantInfo: `⚠️ எச்சரிக்கை: மருந்தின் தகவல்களை மெடோரா யூகிக்காது. உட்கொள்வதற்கு முன் உங்கள் மருத்துவரிடம் அல்லது பார்மசிஸ்ட்டிடம் உறுதி செய்து கொள்ளுங்கள்.`,
      summaryAudioText: `${medicineName} பற்றிய முக்கிய அறிவிப்பு. உட்கொள்வதற்கு முன் மருத்துவரிடம் இதன் சரியான பயன்பாட்டை உறுதி செய்யவும்.`
    },
    te: {
      whatIsIt: `"${medicineName}" సమాచారం వైద్య డేటాబేస్‌లో విశ్వసనీయంగా సరిపోలలేదు.`,
      howToTake: `ప్రిస్క్రిప్షన్ వివరాలు: ${strength || ''} ${frequency || ''} ${duration || ''}. ${instruction || 'ప్రత్యేక సూచన లేదు.'}`,
      importantInfo: `⚠️ హెచ్చరిక: మెడోరా ఎటువంటి తప్పుడు అంచనాలు వేయదు. వాడే ముందు ఖచ్చితంగా మీ డాక్టర్ లేదా ఫార్మసిస్ట్‌తో నిర్ధారించుకోండి.`,
      summaryAudioText: `${medicineName} గురించి ముఖ్య గమనిక. తీసుకునే ముందు మీ డాక్టర్‌తో మాట్లాడి స్పష్టత తీసుకోండి.`
    },
    gu: {
      whatIsIt: `"${medicineName}" ની વિગતો પ્રમાણિત તબીબી ડેટાબેઝમાં ખાતરીપૂર્વક મળી શકી નથી.`,
      howToTake: `પ્રિસ્ક્રિપ્શન મુજબ: ${strength || ''} ${frequency || ''} ${duration || ''}. ${instruction || 'કોઈ ખાસ સૂચના નથી.'}`,
      importantInfo: `⚠️ સાવચેતી: મેડોરા દવા વિશે ખોટો અંદાજ લગાવતું નથી. કૃપા કરીને લેતા પહેલાં તમારા ડૉક્ટર અથવા ફાર્માસિસ્ટ પાસે ખાતરી કરાવો.`,
      summaryAudioText: `${medicineName} માટે અગત્યની સૂચના. આ દવા લેતાં પહેલાં તમારા ડૉક્ટર અથવા ફાર્માસિસ્ટ સાથે ચર્ચા કરો.`
    }
  };
}
