import { SupportedLanguage } from '../types';

export interface LanguageMeta {
  code: SupportedLanguage;
  label: string;
  native: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageMeta[] = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
  { code: 'mr', label: 'Marathi', native: 'मराठी', flag: '🇮🇳', dir: 'ltr' },
  { code: 'es', label: 'Spanish', native: 'Español', flag: '🇪🇸', dir: 'ltr' },
  { code: 'fr', label: 'French', native: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'de', label: 'German', native: 'Deutsch', flag: '🇩🇪', dir: 'ltr' },
  { code: 'ar', label: 'Arabic', native: 'العربية', flag: '🇸🇦', dir: 'rtl' },
  { code: 'bn', label: 'Bengali', native: 'বাংলা', flag: '🇧🇩', dir: 'ltr' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳', dir: 'ltr' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు', flag: '🇮🇳', dir: 'ltr' },
  { code: 'gu', label: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳', dir: 'ltr' },
];

export interface UiTranslations {
  // Navigation
  navHome: string;
  navHowItWorks: string;
  navAbout: string;
  navMedicationLog: string;
  navCurrentPrescription: string;
  navTryDemo: string;
  navUploadPrescription: string;
  navSubtitle: string;

  // Hero
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroUploadBtn: string;
  heroDemoBtn: string;
  heroFeatureVerified: string;
  heroFeatureNoGuess: string;
  heroFeatureVoice: string;

  // Upload
  uploadTitle: string;
  uploadSubtitle: string;
  uploadDropText: string;
  uploadBrowseText: string;
  uploadFormatsText: string;
  uploadSecurityNote: string;
  uploadSamplePrompt: string;

  // Results Dashboard
  resultsTitle: string;
  resultsVerifiedBadge: string;
  resultsUnverifiedNotice: string;
  resultsSearchPlaceholder: string;
  resultsFilterAll: string;
  resultsFilterVerified: string;
  resultsFilterUnverified: string;
  resultsPrint: string;
  resultsOpenLog: string;
  resultsUploadNew: string;
  resultsGeneralAdviceTitle: string;
  resultsDemoBadge: string;
  resultsSwitchDemo: string;

  // Medicine Details Modal
  medDetailsTitle: string;
  medWhatIsIt: string;
  medHowToTake: string;
  medImportantInfo: string;
  medSideEffects: string;
  medPrecautions: string;
  medDietaryAdvice: string;
  medVerificationSource: string;
  medVerifiedBadge: string;
  medUnverifiedBadge: string;
  medListenVoice: string;
  medAskPrompt: string;
  medAskBtn: string;
  medClose: string;

  // Medication Log
  logTitle: string;
  logSubtitle: string;
  logTodaySchedule: string;
  log7DayChart: string;
  logMarkTaken: string;
  logDoseTaken: string;
  logDosePending: string;
  logOverallAdherence: string;
  logEmptyNotice: string;

  // Common Safety
  safetyBanner: string;
  disclaimerText: string;
  emergencyNotice: string;
  languageSelectLabel: string;
}

export const TRANSLATIONS: Record<SupportedLanguage, UiTranslations> = {
  en: {
    navHome: 'Home',
    navHowItWorks: 'How It Works',
    navAbout: 'About',
    navMedicationLog: 'Medication Log',
    navCurrentPrescription: 'Current Prescription',
    navTryDemo: 'Try Demo',
    navUploadPrescription: 'Upload Prescription',
    navSubtitle: 'Prescription Understanding Assistant',

    heroBadge: 'AI Clinical Understanding & Safety',
    heroTitle: 'Understand your prescription in your own language.',
    heroSubtitle:
      'Upload doctor prescriptions or handwritten slips. Medora identifies medicines, cross-checks verified clinical guidelines, and explains timings, dosages, and precautions clearly.',
    heroUploadBtn: 'Upload Prescription',
    heroDemoBtn: 'Try Interactive Demo',
    heroFeatureVerified: 'Clinical Guideline Verified',
    heroFeatureNoGuess: 'Zero-Hallucination Guardrails',
    heroFeatureVoice: 'Multilingual Audio Playback',

    uploadTitle: 'Upload your Prescription Document',
    uploadSubtitle: 'Take a clear photo or upload an image/PDF of your medical prescription.',
    uploadDropText: 'Drag and drop your prescription image or PDF here',
    uploadBrowseText: 'or click to browse from your device',
    uploadFormatsText: 'Supports JPG, PNG, WEBP, and PDF up to 20MB',
    uploadSecurityNote: 'Your medical document is processed securely with strict medical safety guardrails.',
    uploadSamplePrompt: 'No prescription handy? Explore realistic sample prescriptions:',

    resultsTitle: 'Prescription Summary & Medicine Guidance',
    resultsVerifiedBadge: 'Verified by Clinical Knowledge Base',
    resultsUnverifiedNotice: 'Items requiring verification with doctor/pharmacist',
    resultsSearchPlaceholder: 'Search medicine name, strength, instructions...',
    resultsFilterAll: 'All Medicines',
    resultsFilterVerified: 'Verified Only',
    resultsFilterUnverified: 'Needs Verification',
    resultsPrint: 'Print / Save PDF',
    resultsOpenLog: 'Open Medication Log',
    resultsUploadNew: 'Upload Another',
    resultsGeneralAdviceTitle: 'Doctor & Clinical Safety Advice',
    resultsDemoBadge: 'Sample / Demo Prescription',
    resultsSwitchDemo: 'Switch Demo Case',

    medDetailsTitle: 'Medicine Safety & Clinical Details',
    medWhatIsIt: 'What is this medicine?',
    medHowToTake: 'How to take it safely',
    medImportantInfo: 'Important Information & Precautions',
    medSideEffects: 'Common Side Effects',
    medPrecautions: 'Precautions',
    medDietaryAdvice: 'Food & Timing Advice',
    medVerificationSource: 'Verified Medical Guideline Source',
    medVerifiedBadge: 'Verified Clinical Fact',
    medUnverifiedBadge: 'Requires Doctor Verification',
    medListenVoice: 'Listen in your language',
    medAskPrompt: 'Ask a clarifying question about this medicine...',
    medAskBtn: 'Ask AI',
    medClose: 'Close',

    logTitle: 'Medication Schedule & Adherence Log',
    logSubtitle: 'Track your daily doses, log compliance, and view 7-day adherence trends.',
    logTodaySchedule: "Today's Schedule",
    log7DayChart: '7-Day Adherence Trend',
    logMarkTaken: 'Mark Taken',
    logDoseTaken: 'Taken',
    logDosePending: 'Pending',
    logOverallAdherence: '7-Day Adherence',
    logEmptyNotice: 'No medications loaded yet. Upload a prescription or test with demo data.',

    safetyBanner: 'AI Safety Warning: Always confirm with your physician or licensed pharmacist.',
    disclaimerText: 'Medora helps patients understand prescriptions. It does not provide medical diagnoses or alter prescribed treatments.',
    emergencyNotice: 'For medical emergencies, contact your local emergency services immediately.',
    languageSelectLabel: 'Language',
  },

  hi: {
    navHome: 'होम',
    navHowItWorks: 'यह कैसे काम करता है',
    navAbout: 'हमारे बारे में',
    navMedicationLog: 'दवा लॉग',
    navCurrentPrescription: 'वर्तमान पर्चा',
    navTryDemo: 'डेमो देखें',
    navUploadPrescription: 'पर्चा अपलोड करें',
    navSubtitle: 'प्रिस्क्रिप्शन सहायक',

    heroBadge: 'सुरक्षित एआई क्लिनिकल समझ',
    heroTitle: 'अपने डॉक्टर का पर्चा अपनी भाषा में आसानी से समझें।',
    heroSubtitle:
      'डॉक्टर का पर्चा या हस्तलिखित स्लिप अपलोड करें। मेडोरा दवाओं की पहचान करता है, प्रमाणित गाइडलाइन्स से जांचता है और खुराक, समय व सावधानियां स्पष्ट समझाता है।',
    heroUploadBtn: 'पर्चा अपलोड करें',
    heroDemoBtn: 'डेमो पर्चा देखें',
    heroFeatureVerified: 'प्रमाणित क्लिनिकल गाइडलाइन',
    heroFeatureNoGuess: 'सुरक्षित - कोई गलत अनुमान नहीं',
    heroFeatureVoice: 'अपनी भाषा में बोलकर सुनें',

    uploadTitle: 'अपना डॉक्टर पर्चा अपलोड करें',
    uploadSubtitle: 'पर्चे की स्पष्ट फोटो लें या इमेज/पीडीएफ अपलोड करें।',
    uploadDropText: 'पर्चे की फोटो या पीडीएफ यहाँ ड्रैग करें',
    uploadBrowseText: 'या डिवाइस से फ़ाइल चुनें',
    uploadFormatsText: 'JPG, PNG, WEBP, PDF (अधिकतम 20MB)',
    uploadSecurityNote: 'आपका दस्तावेज़ पूर्णतः सुरक्षित और गोपनीयता के साथ प्रोसेस किया जाता है।',
    uploadSamplePrompt: 'पर्चा पास नहीं है? तैयार डेमो केस आज़माएँ:',

    resultsTitle: 'दवाओं का विवरण और सुरक्षा मार्गदर्शन',
    resultsVerifiedBadge: 'प्रमाणित मेडिकल डेटाबेस से सत्यापित',
    resultsUnverifiedNotice: 'डॉक्टर या फार्मासिस्ट से पुष्टि योग्य दवाएं',
    resultsSearchPlaceholder: 'दवा का नाम, खुराक या निर्देश खोजें...',
    resultsFilterAll: 'सभी दवाएं',
    resultsFilterVerified: 'सत्यापित दवाएं',
    resultsFilterUnverified: 'पुष्टि आवश्यक',
    resultsPrint: 'प्रिंट / पीडीएफ सुरक्षित करें',
    resultsOpenLog: 'दवा लॉग खोलें',
    resultsUploadNew: 'नया पर्चा अपलोड करें',
    resultsGeneralAdviceTitle: 'डॉक्टर व क्लिनिकल सलाह',
    resultsDemoBadge: 'डेमो पर्चा',
    resultsSwitchDemo: 'डेमो बदलें',

    medDetailsTitle: 'दवा की पूरी जानकारी और सावधानियां',
    medWhatIsIt: 'यह दवा क्या है?',
    medHowToTake: 'इसे सुरक्षित तरीके से कैसे लें?',
    medImportantInfo: 'महत्वपूर्ण जानकारी और सावधानियां',
    medSideEffects: 'सामान्य दुष्प्रभाव',
    medPrecautions: 'सावधानियां',
    medDietaryAdvice: 'खान-पान और समय की सलाह',
    medVerificationSource: 'प्रमाणित स्रोत',
    medVerifiedBadge: 'सत्यापित मेडिकल जानकारी',
    medUnverifiedBadge: 'डॉक्टर से पुष्टि आवश्यक',
    medListenVoice: 'अपनी भाषा में सुनें',
    medAskPrompt: 'इस दवा से जुड़ा कोई प्रश्न पूछें...',
    medAskBtn: 'पूछें',
    medClose: 'बंद करें',

    logTitle: 'दवा का समय और सेवन ट्रैकर',
    logSubtitle: 'अपनी रोजाना की दवाएं ट्रैक करें और 7 दिनों की निरंतरता देखें।',
    logTodaySchedule: 'आज का शेड्यूल',
    log7DayChart: '7-दिवसीय सेवन प्रगति (Adherence)',
    logMarkTaken: 'ली गई दवा दर्ज करें',
    logDoseTaken: 'ली गई',
    logDosePending: 'बाकी',
    logOverallAdherence: '7-दिवसीय निरंतरता दर',
    logEmptyNotice: 'कोई दवा लोड नहीं है। पर्चा अपलोड करें या डेमो देखें।',

    safetyBanner: 'एआई सुरक्षा चेतावनी: दवा बदलने से पहले हमेशा अपने डॉक्टर या फार्मासिस्ट से परामर्श लें।',
    disclaimerText: 'मेडोरा मरीजों को पर्चा समझने में मदद करता है। यह डॉक्टरी सलाह या निदान का विकल्प नहीं है।',
    emergencyNotice: 'आपातकालीन स्थिति में तुरंत नजदीकी अस्पताल या एम्बुलेंस से संपर्क करें।',
    languageSelectLabel: 'भाषा',
  },

  mr: {
    navHome: 'होम',
    navHowItWorks: 'कसे चालते',
    navAbout: 'माहिती',
    navMedicationLog: 'औषध नोंदवही',
    navCurrentPrescription: 'सध्याचे प्रिस्क्रिप्शन',
    navTryDemo: 'डेमो पहा',
    navUploadPrescription: 'प्रिस्क्रिप्शन अपलोड करा',
    navSubtitle: 'प्रिस्क्रिप्शन समजून घेणारा सहाय्यक',

    heroBadge: 'सुरक्षित एआय क्लिनिकल सहाय्य',
    heroTitle: 'डॉक्टरांचे प्रिस्क्रिप्शन आपल्या स्वतःच्या भाषेत समजून घ्या.',
    heroSubtitle:
      'प्रिस्क्रिप्शनचा फोटो अपलोड करा. मेडोरा औषधांची अचूक ओळख पटवून अधिकृत माहितीनुसार डोस, वेळ आणि घ्यायची काळजी मराठीत समजावून सांगते.',
    heroUploadBtn: 'प्रिस्क्रिप्शन अपलोड करा',
    heroDemoBtn: 'डेमो प्रिस्क्रिप्शन पहा',
    heroFeatureVerified: 'प्रमाणित वैद्यकीय मार्गदर्शक',
    heroFeatureNoGuess: 'चुकीचा अंदाज नाही - संपूर्ण सुरक्षित',
    heroFeatureVoice: 'मराठीत ऑडिओ ऐका',

    uploadTitle: 'तुमचे प्रिस्क्रिप्शन अपलोड करा',
    uploadSubtitle: 'प्रिस्क्रिप्शनचा स्पष्ट फोटो किंवा पीडीएफ अपलोड करा.',
    uploadDropText: 'प्रिस्क्रिप्शन फोटो किंवा पीडीएफ येथे टाका',
    uploadBrowseText: 'किंवा डिव्हाइसवरून निवडा',
    uploadFormatsText: 'JPG, PNG, WEBP, PDF (जास्तीत जास्त 20MB)',
    uploadSecurityNote: 'तुमचा वैद्यकीय दस्तऐवज सुरक्षितपणे तपासला जातो.',
    uploadSamplePrompt: 'प्रिस्क्रिप्शन हाताशी नाही? नमुना डेमो तपासा:',

    resultsTitle: 'औषधांचे तपशील आणि सुरक्षित वापर मार्गदर्शन',
    resultsVerifiedBadge: 'प्रमाणित डेटाबेसद्वारे पडताळणी पूर्ण',
    resultsUnverifiedNotice: 'डॉक्टरांकडून खात्री करून घेण्याची औषधे',
    resultsSearchPlaceholder: 'औषधाचे नाव, ताकद किंवा सूचना शोधा...',
    resultsFilterAll: 'सर्व औषधे',
    resultsFilterVerified: 'पडताळलेली औषधे',
    resultsFilterUnverified: 'खात्री आवश्यक',
    resultsPrint: 'प्रिंट / पीडीएफ सेव्ह करा',
    resultsOpenLog: 'औषध नोंदवही उघडा',
    resultsUploadNew: 'दुसरे प्रिस्क्रिप्शन',
    resultsGeneralAdviceTitle: 'डॉक्टरांचा व क्लिनिकल सल्ला',
    resultsDemoBadge: 'डेमो प्रिस्क्रिप्शन',
    resultsSwitchDemo: 'डेमो बदला',

    medDetailsTitle: 'औषधाची संपूर्ण माहिती आणि दक्षता',
    medWhatIsIt: 'हे औषध कशासाठी आहे?',
    medHowToTake: 'हे औषध कसे घ्यावे?',
    medImportantInfo: 'महत्त्वाची माहिती आणि काळजी',
    medSideEffects: 'सामान्य दुष्परिणाम',
    medPrecautions: 'दक्षता',
    medDietaryAdvice: 'आहार आणि वेळेविषयी सल्ला',
    medVerificationSource: 'प्रमाणित वैद्यकीय संदर्भ',
    medVerifiedBadge: 'पडताळलेली वैद्यकीय माहिती',
    medUnverifiedBadge: 'डॉक्टरांकडून खात्री आवश्यक',
    medListenVoice: 'मराठीत ऑडिओ ऐका',
    medAskPrompt: 'या औषधाविषयी प्रश्न विचारा...',
    medAskBtn: 'विचारा',
    medClose: 'बंद करा',

    logTitle: 'औषधांचे वेळापत्रक आणि सेवन नोंद',
    logSubtitle: 'दररोज वेळेवर औषधे घ्या आणि ७ दिवसांची प्रगती तपासा.',
    logTodaySchedule: 'आजचे वेळापत्रक',
    log7DayChart: '७ दिवसांचा औषध नियमितता आलेख',
    logMarkTaken: 'घेतल्याची नोंद करा',
    logDoseTaken: 'घेतले',
    logDosePending: 'बाकी',
    logOverallAdherence: '७-दिवसीय नियमितता दर',
    logEmptyNotice: 'कोणतीही औषधे लोड केलेली नाहीत. कृपया प्रिस्क्रिप्शन अपलोड करा.',

    safetyBanner: 'वैद्यकीय चेतावणी: औषध बदलण्यापूर्वी नेहमी डॉक्टरांशी किंवा फार्मासिस्टशी संपर्क साधा.',
    disclaimerText: 'मेडोरा रुग्णांना प्रिस्क्रिप्शन समजण्यास मदत करते. हे वैद्यकीय उपचारांचा पर्याय नाही.',
    emergencyNotice: 'आपत्कालीन वैद्यकीय मदतीसाठी तात्काळ १०८ किंवा स्थानिक आपत्कालीन क्रमांकावर कॉल करा.',
    languageSelectLabel: 'भाषा',
  },

  es: {
    navHome: 'Inicio',
    navHowItWorks: 'Cómo Funciona',
    navAbout: 'Acerca de',
    navMedicationLog: 'Registro de Medicamentos',
    navCurrentPrescription: 'Receta Actual',
    navTryDemo: 'Probar Demo',
    navUploadPrescription: 'Subir Receta',
    navSubtitle: 'Asistente de Comprensión de Recetas Médicas',

    heroBadge: 'Comprensión Clínica Segura con IA',
    heroTitle: 'Comprenda su receta médica en su propio idioma.',
    heroSubtitle:
      'Suba su receta médica o nota manuscrita. Medora identifica los medicamentos, verifica guías clínicas oficiales y explica dosis, horarios y precauciones con total claridad.',
    heroUploadBtn: 'Subir Receta Médica',
    heroDemoBtn: 'Probar Demo Interactiva',
    heroFeatureVerified: 'Verificado con Guías Clínicas',
    heroFeatureNoGuess: 'Sin Suposiciones ni Alucinaciones',
    heroFeatureVoice: 'Reproducción de Voz Multilingüe',

    uploadTitle: 'Suba el Documento de su Receta',
    uploadSubtitle: 'Tome una foto clara o suba un archivo de imagen o PDF de su receta.',
    uploadDropText: 'Arrastre y suelte su imagen o PDF de receta aquí',
    uploadBrowseText: 'o haga clic para explorar en su dispositivo',
    uploadFormatsText: 'Admite JPG, PNG, WEBP y PDF de hasta 20 MB',
    uploadSecurityNote: 'Su documento médico se procesa de forma segura con protocolos clínicos estrictos.',
    uploadSamplePrompt: '¿No tiene una receta a mano? Pruebe recetas de muestra reales:',

    resultsTitle: 'Resumen de Receta y Guía de Medicamentos',
    resultsVerifiedBadge: 'Verificado por Base de Datos Clínica',
    resultsUnverifiedNotice: 'Artículos que requieren confirmación con su médico',
    resultsSearchPlaceholder: 'Buscar medicamento, dosis, instrucciones...',
    resultsFilterAll: 'Todos los Medicamentos',
    resultsFilterVerified: 'Solo Verificados',
    resultsFilterUnverified: 'Requiere Verificación',
    resultsPrint: 'Imprimir / Guardar PDF',
    resultsOpenLog: 'Abrir Registro',
    resultsUploadNew: 'Subir Otra Receta',
    resultsGeneralAdviceTitle: 'Consejos Médicos y de Seguridad',
    resultsDemoBadge: 'Receta de Demostración',
    resultsSwitchDemo: 'Cambiar Caso Demo',

    medDetailsTitle: 'Detalles Clínicos y Seguridad del Medicamento',
    medWhatIsIt: '¿Qué es este medicamento?',
    medHowToTake: 'Cómo tomarlo con seguridad',
    medImportantInfo: 'Información Importante y Precauciones',
    medSideEffects: 'Efectos Secundarios Comunes',
    medPrecautions: 'Precauciones',
    medDietaryAdvice: 'Consejos de Alimentos y Horarios',
    medVerificationSource: 'Fuente de Guía Clínica Verificada',
    medVerifiedBadge: 'Dato Clínico Verificado',
    medUnverifiedBadge: 'Requiere Confirmación Médica',
    medListenVoice: 'Escuchar en su idioma',
    medAskPrompt: 'Haga una pregunta sobre este medicamento...',
    medAskBtn: 'Consultar',
    medClose: 'Cerrar',

    logTitle: 'Horario y Registro de Adherencia a Medicamentos',
    logSubtitle: 'Controle sus tomas diarias, registre su cumplimiento y vea el progreso de 7 días.',
    logTodaySchedule: 'Horario de Hoy',
    log7DayChart: 'Tendencia de Adherencia en 7 Días',
    logMarkTaken: 'Marcar como Tomado',
    logDoseTaken: 'Tomado',
    logDosePending: 'Pendiente',
    logOverallAdherence: 'Adherencia a 7 Días',
    logEmptyNotice: 'No hay medicamentos cargados. Suba una receta médica o pruebe una demostración.',

    safetyBanner: 'Aviso de Seguridad: Consulte siempre a su médico o farmacéutico antes de alterar cualquier medicamento.',
    disclaimerText: 'Medora ayuda a comprender las recetas. No reemplaza el diagnóstico ni la consulta médica.',
    emergencyNotice: 'En caso de emergencia médica, llame inmediatamente al número de emergencias local.',
    languageSelectLabel: 'Idioma',
  },

  fr: {
    navHome: 'Accueil',
    navHowItWorks: 'Fonctionnement',
    navAbout: 'À propos',
    navMedicationLog: 'Journal des Prises',
    navCurrentPrescription: 'Ordonnance Actuelle',
    navTryDemo: 'Essayer la Démo',
    navUploadPrescription: 'Téléverser Ordonnance',
    navSubtitle: 'Assistant de Compréhension des Ordonnances',

    heroBadge: 'Compréhension Clinique Sécurisée par IA',
    heroTitle: 'Comprenez votre ordonnance dans votre propre langue.',
    heroSubtitle:
      "Téléversez votre ordonnance médicale ou note manuscrite. Medora identifie les médicaments, vérifie les directives cliniques et explique clairement les posologies, horaires et précautions.",
    heroUploadBtn: 'Téléverser une Ordonnance',
    heroDemoBtn: 'Essayer la Démo Interactive',
    heroFeatureVerified: 'Directives Cliniques Vérifiées',
    heroFeatureNoGuess: 'Zéro Hallucination & Sécurité Garantie',
    heroFeatureVoice: 'Lecture Vocale Multilingue',

    uploadTitle: 'Téléversez votre Ordonnance Médicale',
    uploadSubtitle: 'Prenez une photo nette ou téléversez une image ou un PDF de votre ordonnance.',
    uploadDropText: 'Glissez-déposez votre image ou PDF d’ordonnance ici',
    uploadBrowseText: 'ou cliquez pour parcourir vos fichiers',
    uploadFormatsText: 'Formats acceptés : JPG, PNG, WEBP, PDF (max 20 Mo)',
    uploadSecurityNote: 'Vos documents sont traités en toute sécurité avec des garde-fous stricts.',
    uploadSamplePrompt: 'Pas d’ordonnance sous la main ? Essayez nos cas de démonstration :',

    resultsTitle: 'Résumé de l’Ordonnance & Guide des Médicaments',
    resultsVerifiedBadge: 'Vérifié par la Base Clinique',
    resultsUnverifiedNotice: 'Médicaments nécessitant une vérification avec votre médecin',
    resultsSearchPlaceholder: 'Rechercher un médicament, dosage, consigne...',
    resultsFilterAll: 'Tous les Médicaments',
    resultsFilterVerified: 'Vérifiés Uniquement',
    resultsFilterUnverified: 'Vérification Requise',
    resultsPrint: 'Imprimer / Enregistrer PDF',
    resultsOpenLog: 'Ouvrir le Journal des Prises',
    resultsUploadNew: 'Nouvelle Ordonnance',
    resultsGeneralAdviceTitle: 'Conseils Médicaux & Sécurité Clinique',
    resultsDemoBadge: 'Ordonnance Démo',
    resultsSwitchDemo: 'Changer d’exemple',

    medDetailsTitle: 'Détails Cliniques et Sécurité du Médicament',
    medWhatIsIt: "De quoi s'agit-il ?",
    medHowToTake: 'Comment le prendre en toute sécurité',
    medImportantInfo: 'Informations Importantes & Précautions',
    medSideEffects: 'Effets Secondaires Courants',
    medPrecautions: 'Précautions',
    medDietaryAdvice: 'Alimentation & Conseils d’Horaires',
    medVerificationSource: 'Source Médicale Vérifiée',
    medVerifiedBadge: 'Fait Clinique Vérifié',
    medUnverifiedBadge: 'Vérification Médicale Requise',
    medListenVoice: 'Écouter dans votre langue',
    medAskPrompt: 'Posez une question sur ce médicament...',
    medAskBtn: 'Demander',
    medClose: 'Fermer',

    logTitle: 'Calendrier & Observance des Prises',
    logSubtitle: 'Suivez vos prises quotidiennes et visualisez votre observance sur 7 jours.',
    logTodaySchedule: "Planning d'aujourd'hui",
    log7DayChart: 'Tendance d’Observance sur 7 Jours',
    logMarkTaken: 'Marquer comme Pris',
    logDoseTaken: 'Pris',
    logDosePending: 'En attente',
    logOverallAdherence: 'Taux d’Observance sur 7 Jours',
    logEmptyNotice: 'Aucun médicament chargé. Téléversez une ordonnance ou utilisez la démo.',

    safetyBanner: 'Avertissement : Consultez toujours votre médecin ou pharmacien avant toute modification.',
    disclaimerText: 'Medora aide à comprendre les ordonnances. Il ne remplace en aucun cas un avis médical.',
    emergencyNotice: 'En cas d’urgence médicale, appelez immédiatement les services de secours (15 ou 112).',
    languageSelectLabel: 'Langue',
  },

  de: {
    navHome: 'Startseite',
    navHowItWorks: 'Funktionsweise',
    navAbout: 'Über uns',
    navMedicationLog: 'Einnahme-Tagebuch',
    navCurrentPrescription: 'Aktuelles Rezept',
    navTryDemo: 'Demo testen',
    navUploadPrescription: 'Rezept hochladen',
    navSubtitle: 'Assistent zum Verstehen von Rezepten',

    heroBadge: 'Klinisch sichere KI-Unterstützung',
    heroTitle: 'Verstehen Sie Ihr Rezept in Ihrer eigenen Sprache.',
    heroSubtitle:
      'Laden Sie Ihr ärztliches Rezept hoch. Medora identifiziert Medikamente, gleicht sie mit klinischen Leitlinien ab und erklärt Dosierung, Einnahmezeiten und Vorsichtsmaßnahmen verständlich.',
    heroUploadBtn: 'Rezept hochladen',
    heroDemoBtn: 'Interaktive Demo testen',
    heroFeatureVerified: 'Geprüft nach klinischen Leitlinien',
    heroFeatureNoGuess: 'Keine Vermutungen & sichere Leitplanken',
    heroFeatureVoice: 'Mehrsprachige Sprachausgabe',

    uploadTitle: 'Laden Sie Ihr Rezeptdokument hoch',
    uploadSubtitle: 'Machen Sie ein Foto oder laden Sie ein Bild/PDF Ihres Rezepts hoch.',
    uploadDropText: 'Rezeptbild oder PDF hierher ziehen',
    uploadBrowseText: 'oder klicken, um vom Gerät auszuwählen',
    uploadFormatsText: 'Unterstützt JPG, PNG, WEBP und PDF bis zu 20 MB',
    uploadSecurityNote: 'Ihre Dokumente werden sicher verarbeitet.',
    uploadSamplePrompt: 'Kein Rezept zur Hand? Erkunden Sie Beispielrezepte:',

    resultsTitle: 'Rezeptübersicht & Medikamentenratgeber',
    resultsVerifiedBadge: 'Verifiziert durch klinische Wissensdatenbank',
    resultsUnverifiedNotice: 'Prüfung durch Arzt oder Apotheker erforderlich',
    resultsSearchPlaceholder: 'Medikament, Dosis oder Anweisung suchen...',
    resultsFilterAll: 'Alle Medikamente',
    resultsFilterVerified: 'Nur Verifizierte',
    resultsFilterUnverified: 'Prüfung nötig',
    resultsPrint: 'Drucken / PDF speichern',
    resultsOpenLog: 'Einnahme-Tagebuch öffnen',
    resultsUploadNew: 'Weiteres Rezept hochladen',
    resultsGeneralAdviceTitle: 'Ärztlicher & klinischer Sicherheitshinweis',
    resultsDemoBadge: 'Musterrezept',
    resultsSwitchDemo: 'Demofall wechseln',

    medDetailsTitle: 'Klinische Details & Medikamentensicherheit',
    medWhatIsIt: 'Was ist dieses Medikament?',
    medHowToTake: 'Sichere Einnahme',
    medImportantInfo: 'Wichtige Informationen & Vorsicht',
    medSideEffects: 'Häufige Nebenwirkungen',
    medPrecautions: 'Vorsichtsmaßnahmen',
    medDietaryAdvice: 'Mahlzeiten & Einnahmezeiten',
    medVerificationSource: 'Verifizierte medizinische Quelle',
    medVerifiedBadge: 'Verifizierte klinische Angabe',
    medUnverifiedBadge: 'Ärztliche Bestätigung erforderlich',
    medListenVoice: 'In Ihrer Sprache anhören',
    medAskPrompt: 'Frage zu diesem Medikament stellen...',
    medAskBtn: 'Fragen',
    medClose: 'Schließen',

    logTitle: 'Einnahmeplan & Therapietreue-Protokoll',
    logSubtitle: 'Verfolgen Sie Ihre Dosen und sehen Sie Ihre 7-Tage-Adhärenz.',
    logTodaySchedule: 'Heutiger Plan',
    log7DayChart: '7-Tage-Einnahmetrend',
    logMarkTaken: 'Als eingenommen markieren',
    logDoseTaken: 'Eingenommen',
    logDosePending: 'Ausstehend',
    logOverallAdherence: '7-Tage-Therapietreue',
    logEmptyNotice: 'Keine Medikamente geladen. Bitte laden Sie ein Rezept hoch oder testen Sie die Demo.',

    safetyBanner: 'Sicherheitshinweis: Halten Sie stets Rücksprache mit Ihrem Arzt oder Apotheker.',
    disclaimerText: 'Medora unterstützt beim Verstehen von Rezepten und ersetzt keine ärztliche Beratung.',
    emergencyNotice: 'Bei medizinischen Notfällen verständigen Sie bitte unverzüglich den Notruf (112).',
    languageSelectLabel: 'Sprache',
  },

  ar: {
    navHome: 'الرئيسية',
    navHowItWorks: 'كيف يعمل',
    navAbout: 'حول التطبيق',
    navMedicationLog: 'سجل الأدوية',
    navCurrentPrescription: 'الوصفة الحالية',
    navTryDemo: 'تجربة نموذج',
    navUploadPrescription: 'رفع الوصفة الطبية',
    navSubtitle: 'مساعد فهم الوصفات الطبية',

    heroBadge: 'فهم سريري آمن بالذكاء الاصطناعي',
    heroTitle: 'افهم وصفتك الطبية بوضوح بلغتك الخاصة.',
    heroSubtitle:
      'ارفع وصفتك الطبية المكتوبة أو المطبوعة. يتعرف ميدورا على الأدوية، ويتحقق منها وفق الإرشادات السريرية المعتمدة، ويوضح الجرعات والمواعيد والاحتياطات بدقة.',
    heroUploadBtn: 'رفع وصفة طبية',
    heroDemoBtn: 'تجربة نموذج تجريبي',
    heroFeatureVerified: 'موثق وفق إرشادات طبية معتمدة',
    heroFeatureNoGuess: 'آمن تماماً - بدون أي تخمين',
    heroFeatureVoice: 'استماع صوتي بلغتك',

    uploadTitle: 'رفع مستند الوصفة الطبية',
    uploadSubtitle: 'التقط صورة واضحة أو ارفع ملف صورة أو PDF للوصفة الطبية.',
    uploadDropText: 'اسحب وأفلت صورة الوصفة أو ملف PDF هنا',
    uploadBrowseText: 'أو انقر للاختيار من جهازك',
    uploadFormatsText: 'يدعم JPG و PNG و WEBP و PDF حتى 20 ميجابايت',
    uploadSecurityNote: 'تتم معالجة مستندك الطبي بأعلى معايير الأمان والخصوصية.',
    uploadSamplePrompt: 'لا تملك وصفة حالياً؟ جرب نماذج وصفات واقعية:',

    resultsTitle: 'ملخص الوصفة وإرشادات الأدوية',
    resultsVerifiedBadge: 'تم التحقق من قاعدة البيانات السريرية',
    resultsUnverifiedNotice: 'أدوية تتطلب تأكيد الطبيب أو الصيدلي',
    resultsSearchPlaceholder: 'ابحث عن اسم الدواء، الجرعة، التعليمات...',
    resultsFilterAll: 'جميع الأدوية',
    resultsFilterVerified: 'الموثقة فقط',
    resultsFilterUnverified: 'تحتاج تأكيد',
    resultsPrint: 'طباعة / حفظ PDF',
    resultsOpenLog: 'فتح سجل الأدوية',
    resultsUploadNew: 'رفع وصفة جديدة',
    resultsGeneralAdviceTitle: 'نصائح الطبيب والسلامة السريرية',
    resultsDemoBadge: 'وصفة تجريبية',
    resultsSwitchDemo: 'تغيير النموذج',

    medDetailsTitle: 'تفاصيل الدواء والسلامة السريرية',
    medWhatIsIt: 'ما هو هذا الدواء؟',
    medHowToTake: 'كيفية تناوله بأمان',
    medImportantInfo: 'معلومات هامة واحتياطات',
    medSideEffects: 'الآثار الجانبية الشائعة',
    medPrecautions: 'الاحتياطات',
    medDietaryAdvice: 'إرشادات الطعام والمواعيد',
    medVerificationSource: 'المصدر الطبي المعتمد',
    medVerifiedBadge: 'معلومة سريرية مؤكدة',
    medUnverifiedBadge: 'تتطلب تأكيد الطبيب',
    medListenVoice: 'استمع بلغتك',
    medAskPrompt: 'اطرح سؤالاً حول هذا الدواء...',
    medAskBtn: 'سؤال',
    medClose: 'إغلاق',

    logTitle: 'جدول وسجل الالتزام بالأدوية',
    logSubtitle: 'تتبع جرعاتك اليومية واطلع على مؤشر التزامك خلال 7 أيام.',
    logTodaySchedule: 'جدول اليوم',
    log7DayChart: 'مؤشر الالتزام خلال 7 أيام',
    logMarkTaken: 'تسجيل التناول',
    logDoseTaken: 'تم التناول',
    logDosePending: 'قيد الانتظار',
    logOverallAdherence: 'معدل الالتزام لـ 7 أيام',
    logEmptyNotice: 'لم يتم تحميل أي أدوية بعد. ارفع وصفة أو جرب نموذجاً.',

    safetyBanner: 'تنبيه طبي: استشر دائماً طبيبك أو الصيدلي قبل تغيير أي دواء.',
    disclaimerText: 'يساعد ميدورا المرضى على فهم الوصفات ولا يعتبر بديلاً عن الاستشارة الطبية.',
    emergencyNotice: 'في الحالات الطبية الطارئة، اتصل فوراً برقم الطوارئ المحلي.',
    languageSelectLabel: 'اللغة',
  },

  bn: {
    navHome: 'হোম',
    navHowItWorks: 'কীভাবে কাজ করে',
    navAbout: 'সম্পর্কে',
    navMedicationLog: 'ওষুধের লগ',
    navCurrentPrescription: 'বর্তমান প্রেসক্রিপশন',
    navTryDemo: 'ডেমো দেখুন',
    navUploadPrescription: 'প্রেসক্রিপশন আপলোড',
    navSubtitle: 'প্রেসক্রিপশন বোঝার সহকারী',

    heroBadge: 'নিরাপদ এআই ক্লিনিকাল সহায়তা',
    heroTitle: 'আপনার ডাক্তারের প্রেসক্রিপশন নিজের ভাষায় সহজে বুঝুন।',
    heroSubtitle:
      'প্রেসক্রিপশন আপলোড করুন। মেডোরা ওষুধের নাম শনাক্ত করে, বিশ্বস্ত ক্লিনিকাল নির্দেশিকা মিলিয়ে দেখে এবং সঠিক ডোজ, সময় ও সতর্কতা বাংলায় বুঝিয়ে দেয়।',
    heroUploadBtn: 'প্রেসক্রিপশন আপলোড করুন',
    heroDemoBtn: 'ইন্টারেক্টিভ ডেমো দেখুন',
    heroFeatureVerified: 'ক্লিনিকাল গাইডলাইন যাচাইকৃত',
    heroFeatureNoGuess: 'ভুল অনুমানহীন সম্পূর্ণ নিরাপদ',
    heroFeatureVoice: 'বাংলায় ভয়েস অডিও শুনুন',

    uploadTitle: 'প্রেসক্রিপশন ডকুমেন্ট আপলোড করুন',
    uploadSubtitle: 'প্রেসক্রিপশনের পরিষ্কার ছবি তুলুন বা ইমেজ/পিডিএফ আপলোড করুন।',
    uploadDropText: 'প্রেসক্রিপশন ছবি বা পিডিএফ এখানে ড্র্যাগ করুন',
    uploadBrowseText: 'বা ডিভাইস থেকে ফাইল বাছাই করুন',
    uploadFormatsText: 'JPG, PNG, WEBP, PDF (সর্বোচ্চ ২০ মেগাবাইট)',
    uploadSecurityNote: 'আপনার মেডিকেল তথ্য নিরাপদে ও সতর্কতার সাথে প্রসেস করা হয়।',
    uploadSamplePrompt: 'হাতের কাছে প্রেসক্রিপশন নেই? নমুনা ডেমো দেখুন:',

    resultsTitle: 'ওষুধের তালিকা ও নিরাপত্তা নির্দেশিকা',
    resultsVerifiedBadge: 'ক্লিনিকাল ডাটাবেস দ্বারা যাচাইকৃত',
    resultsUnverifiedNotice: 'ডাক্তার বা ফার্মাসিস্টের সাথে নিশ্চিত করার ওষুধ',
    resultsSearchPlaceholder: 'ওষুধের নাম, ডোজ বা নিয়ম খুঁজুন...',
    resultsFilterAll: 'সব ওষুধ',
    resultsFilterVerified: 'শুধুমাত্র যাচাইকৃত',
    resultsFilterUnverified: 'যাচাই প্রয়োজন',
    resultsPrint: 'প্রিন্ট / পিডিএফ সেভ করুন',
    resultsOpenLog: 'ওষুধের লগ দেখুন',
    resultsUploadNew: 'অন্য প্রেসক্রিপশন',
    resultsGeneralAdviceTitle: 'ডাক্তারের ও ক্লিনিকাল পরামর্শ',
    resultsDemoBadge: 'ডেমো প্রেসক্রিপশন',
    resultsSwitchDemo: 'ডেমো পরিবর্তন',

    medDetailsTitle: 'ওষুধের সম্পূর্ণ বিবরণ ও সতর্কতা',
    medWhatIsIt: 'এই ওষুধটি কী?',
    medHowToTake: 'নিরাপদে কীভাবে সেবন করবেন',
    medImportantInfo: 'গুরুত্বপূর্ণ তথ্য ও সতর্কতা',
    medSideEffects: 'সাধারণ পার্শ্বপ্রতিক্রিয়া',
    medPrecautions: 'সতর্কতা',
    medDietaryAdvice: 'খাবার ও সময় নির্দেশিকা',
    medVerificationSource: 'যাচাইকৃত মেডিকেল উৎস',
    medVerifiedBadge: 'যাচাইকৃত ক্লিনিকাল তথ্য',
    medUnverifiedBadge: 'ডাক্তারের নিশ্চিতকরণ প্রয়োজন',
    medListenVoice: 'বাংলায় অডিও শুনুন',
    medAskPrompt: 'এই ওষুধ সম্পর্কে কোনো প্রশ্ন করুন...',
    medAskBtn: 'জিজ্ঞাসা করুন',
    medClose: 'বন্ধ করুন',

    logTitle: 'ওষুধের সময়সূচি ও সেবনের অগ্রগতি',
    logSubtitle: 'প্রতিদিনের ওষুধ ট্র্যাক করুন এবং ৭ দিনের অগ্রগতি দেখুন।',
    logTodaySchedule: 'আজকের সময়সূচি',
    log7DayChart: '৭ দিনের ওষুধ গ্রহণের অগ্রগতি',
    logMarkTaken: 'গ্রহণের তথ্য দিন',
    logDoseTaken: 'নেওয়া হয়েছে',
    logDosePending: 'বাকি আছে',
    logOverallAdherence: '৭ দিনের গড় নিয়ম মানার হার',
    logEmptyNotice: 'কোনো ওষুধ এখনও লোড হয়নি। প্রেসক্রিপশন আপলোড করুন বা ডেমো দেখুন।',

    safetyBanner: 'মেডিকেল সতর্কতা: কোনো ওষুধ পরিবর্তনের আগে সর্বদা ডাক্তার বা ফার্মাসিস্টের পরামর্শ নিন।',
    disclaimerText: 'মেডোরা প্রেসক্রিপশন বুঝতে সহায়তা করে, এটি কোনো চিকিৎসা পরামর্শের বিকল্প নয়।',
    emergencyNotice: 'জরুরি পরিস্থিতিতে অবিলম্বে স্থানীয় জরুরি হেল্পলাইনে কল করুন।',
    languageSelectLabel: 'ভাষা',
  },

  ta: {
    navHome: 'முகப்பு',
    navHowItWorks: 'எப்படி செயல்படுகிறது',
    navAbout: 'எங்களைப் பற்றி',
    navMedicationLog: 'மருந்து பதிவு',
    navCurrentPrescription: 'தற்போதைய மருந்துச்சீட்டு',
    navTryDemo: 'மாதிரி பார்க்க',
    navUploadPrescription: 'மருந்துச்சீட்டு பதிவேற்றுக',
    navSubtitle: 'மருந்துச்சீட்டு வழிகாட்டி',

    heroBadge: 'பாதுகாப்பான ஏஐ மருத்துவ வழிகாட்டல்',
    heroTitle: 'மருத்துவரின் மருந்துச்சீட்டை உங்கள் சொந்த மொழியில் எளிதாகப் புரிந்து கொள்ளுங்கள்.',
    heroSubtitle:
      'மருந்துச்சீட்டை பதிவேற்றுங்கள். மெடோரா மருந்துகளை அடையாளம் கண்டு, சரிபார்க்கப்பட்ட மருத்துவ வழிகாட்டுதல்களுடன் ஒப்பிட்டு, சரியான அளவு, நேரம் மற்றும் முன்னெச்சரிக்கைகளைத் தமிழில் விளக்குகிறது.',
    heroUploadBtn: 'மருந்துச்சீட்டு பதிவேற்றுக',
    heroDemoBtn: 'மாதிரி மருந்துச்சீட்டு',
    heroFeatureVerified: 'மருத்துவ வழிகாட்டுதல் உறுதிப்படுத்தப்பட்டது',
    heroFeatureNoGuess: 'தவறான யூகங்கள் அற்ற முழுப் பாதுகாப்பு',
    heroFeatureVoice: 'தமிழில் குரல் வழிகாட்டல்',

    uploadTitle: 'மருந்துச்சீட்டு ஆவணத்தைப் பதிவேற்றவும்',
    uploadSubtitle: 'மருந்துச்சீட்டின் தெளிவான புகைப்படம் அல்லது பிடிஎஃப் பதிவேற்றவும்.',
    uploadDropText: 'மருந்துச்சீட்டு படத்தை அல்லது PDF-ஐ இங்கே இழுத்து விடவும்',
    uploadBrowseText: 'அல்லது உங்கள் சாதனத்திலிருந்து தேர்ந்தெடுக்கவும்',
    uploadFormatsText: 'JPG, PNG, WEBP, PDF (அதிகபட்சம் 20MB)',
    uploadSecurityNote: 'உங்கள் மருத்துவ ஆவணம் பாதுகாப்பாகவும் ரகசியமாகவும் கையாளப்படுகிறது.',
    uploadSamplePrompt: 'மருந்துச்சீட்டு இல்லையா? மாதிரி உதாரணங்களை ஆராயுங்கள்:',

    resultsTitle: 'மருந்து விவரங்கள் & பாதுகாப்பு வழிகாட்டல்',
    resultsVerifiedBadge: 'மருத்துவ தரவுத்தளத்தால் சரிபார்க்கப்பட்டது',
    resultsUnverifiedNotice: 'மருத்துவரிடம் உறுதிப்படுத்த வேண்டிய மருந்துகள்',
    resultsSearchPlaceholder: 'மருந்தின் பெயர், அளவு அல்லது குறிப்புகளைத் தேடுக...',
    resultsFilterAll: 'அனைத்து மருந்துகள்',
    resultsFilterVerified: 'சரிபார்க்கப்பட்டவை மட்டும்',
    resultsFilterUnverified: 'உறுதிப்படுத்தல் தேவை',
    resultsPrint: 'அச்சிடுக / PDF சேமிக்க',
    resultsOpenLog: 'மருந்து பதிவேடு பார்க்க',
    resultsUploadNew: 'புதிய மருந்துச்சீட்டு',
    resultsGeneralAdviceTitle: 'மருத்துவர் & மருத்துவப் பாதுகாப்பு அறிவுரை',
    resultsDemoBadge: 'மாதிரி மருந்துச்சீட்டு',
    resultsSwitchDemo: 'மாதிரியை மாற்றுக',

    medDetailsTitle: 'மருந்து பாதுகாப்பு மற்றும் மருத்துவ விவரங்கள்',
    medWhatIsIt: 'இந்த மருந்து என்ன?',
    medHowToTake: 'பாதுகாப்பாக உட்கொள்வது எப்படி?',
    medImportantInfo: 'முக்கிய தகவல்கள் & முன்னெச்சரிக்கைகள்',
    medSideEffects: 'பொதுவான பக்க விளைவுகள்',
    medPrecautions: 'முன்னெச்சரிக்கைகள்',
    medDietaryAdvice: 'உணவு மற்றும் நேர ஆலோசனைகள்',
    medVerificationSource: 'சரிபார்க்கப்பட்ட மருத்துவ ஆதாரம்',
    medVerifiedBadge: 'சரிபார்க்கப்பட்ட மருத்துவ தகவல்',
    medUnverifiedBadge: 'மருத்துவரிடம் உறுதிப்படுத்த வேண்டும்',
    medListenVoice: 'தமிழில் குரலைக் கேட்கவும்',
    medAskPrompt: 'இந்த மருந்து பற்றி கேள்வி கேளுங்கள்...',
    medAskBtn: 'கேட்க',
    medClose: 'மூடு',

    logTitle: 'மருந்து அட்டவணை மற்றும் உட்கொள்ளல் பதிவு',
    logSubtitle: 'தினசரி மருந்துகளைக் கண்காணித்து 7 நாள் தொடர் முன்னேற்றத்தைக் காண்க.',
    logTodaySchedule: 'இன்றைய அட்டவணை',
    log7DayChart: '7-நாள் மருந்து உட்கொள்ளல் வரைபடம்',
    logMarkTaken: 'எடுத்துக்கொண்டதாகப் பதிவு செய்',
    logDoseTaken: 'உட்கொள்ளப்பட்டது',
    logDosePending: 'மீதமுள்ளது',
    logOverallAdherence: '7-நாள் ஒழுங்கு விகிதம்',
    logEmptyNotice: 'மருந்துகள் எதுவும் ஏற்றப்படவில்லை. மருந்துச்சீட்டைப் பதிவேற்றவும்.',

    safetyBanner: 'மருத்துவ எச்சரிக்கை: மருந்துகளை மாற்றுவதற்கு முன் எப்போதும் உங்கள் மருத்துவரை அணுகவும்.',
    disclaimerText: 'மெடோரா மருந்துச்சீட்டைப் புரிந்துகொள்ள உதவுகிறது. இது மருத்துவ சிகிச்சைக்கு மாற்றல்ல.',
    emergencyNotice: 'மருத்துவ அவசரநிலைகளுக்கு உடனடியாக 108 அல்லது உள்ளூர் அவசர எண்ணை அழைக்கவும்.',
    languageSelectLabel: 'மொழி',
  },

  te: {
    navHome: 'హోమ్',
    navHowItWorks: 'ఎలా పనిచేస్తుంది',
    navAbout: 'మా గురించి',
    navMedicationLog: 'మందుల లాగ్',
    navCurrentPrescription: 'ప్రస్తుత ప్రిస్క్రిప్షన్',
    navTryDemo: 'డెమో చూడండి',
    navUploadPrescription: 'ప్రిస్క్రిప్షన్ అప్‌లోడ్',
    navSubtitle: 'ప్రిస్క్రిప్షన్ అర్థం చేసుకునే సహాయకుడు',

    heroBadge: 'సురక్షిత AI క్లినికల్ సహాయం',
    heroTitle: 'మీ డాక్టర్ ప్రిస్క్రిప్షన్‌ను మీ సొంత భాషలోనే స్పష్టంగా అర్థం చేసుకోండి.',
    heroSubtitle:
      'ప్రిస్క్రిప్షన్‌ను అప్‌లోడ్ చేయండి. మెడోరా మందులను గుర్తించి, అధికారిక క్లినికల్ మార్గదర్శకాలతో సరిపోల్చి మోతాదు, సమయాలు మరియు జాగ్రత్తలను తెలుగులో వివరిస్తుంది.',
    heroUploadBtn: 'ప్రిస్క్రిప్షన్ అప్‌లోడ్ చేయండి',
    heroDemoBtn: 'డెమో ప్రిస్క్రిప్షన్ చూడండి',
    heroFeatureVerified: 'క్లినికల్ మార్గదర్శకాలతో ధృవీకరించబడింది',
    heroFeatureNoGuess: 'తప్పుడు అంచనాలు లేని సంపూర్ణ భద్రత',
    heroFeatureVoice: 'తెలుగులో ఆడియో వినండి',

    uploadTitle: 'ప్రిస్క్రిప్షన్ పత్రాన్ని అప్‌లోడ్ చేయండి',
    uploadSubtitle: 'స్పష్టమైన ఫోటో తీయండి లేదా ఇమేజ్/PDF ని అప్‌లోడ్ చేయండి.',
    uploadDropText: 'ప్రిస్క్రిప్షన్ ఫోటో లేదా PDFని ఇక్కడ వేయండి',
    uploadBrowseText: 'లేదా మీ పరికరం నుండి ఎంచుకోండి',
    uploadFormatsText: 'JPG, PNG, WEBP, PDF (గరిష్టంగా 20MB)',
    uploadSecurityNote: 'మీ వైద్య పత్రం గోప్యతతో సురక్షితంగా పరిశీలించబడుతుంది.',
    uploadSamplePrompt: 'ప్రిస్క్రిప్షన్ అందుబాటులో లేదా? డెమో ఉదాహరణలు చూడండి:',

    resultsTitle: 'మందుల వివరాలు మరియు భద్రతా మార్గదర్శకాలు',
    resultsVerifiedBadge: 'క్లినికల్ డేటాబేస్ ద్వారా ధృవీకరించబడింది',
    resultsUnverifiedNotice: 'వైద్యునితో సరిచూసుకోవాల్సిన మందులు',
    resultsSearchPlaceholder: 'మందు పేరు, మోతాదు లేదా సూచనలు వెతకండి...',
    resultsFilterAll: 'అన్ని మందులు',
    resultsFilterVerified: 'ధృవీకరించినవి మాత్రమే',
    resultsFilterUnverified: 'ధృవీకరణ అవసరం',
    resultsPrint: 'ప్రింట్ / PDF సేవ్ చేయండి',
    resultsOpenLog: 'మందుల లాగ్ తెరవండి',
    resultsUploadNew: 'మరో ప్రిస్క్రిప్షన్',
    resultsGeneralAdviceTitle: 'వైద్యుని & క్లినికల్ సలహాలు',
    resultsDemoBadge: 'డెమో ప్రిస్క్రిప్షన్',
    resultsSwitchDemo: 'డెమో మార్చండి',

    medDetailsTitle: 'మందు పూర్తి వివరాలు & జాగ్రత్తలు',
    medWhatIsIt: 'ఈ మందు దేనికి సంబంధించింది?',
    medHowToTake: 'సురక్షితంగా ఎలా తీసుకోవాలి?',
    medImportantInfo: 'ముఖ్యమైన సమాచారం మరియు జాగ్రత్తలు',
    medSideEffects: 'సాధారణ దుష్ప్రభావాలు',
    medPrecautions: 'జాగ్రత్తలు',
    medDietaryAdvice: 'ఆహారం మరియు సమయ సలహా',
    medVerificationSource: 'ధృవీకరించిన వైద్య మూలం',
    medVerifiedBadge: 'ధృవీకరించిన క్లినికల్ సమాచారం',
    medUnverifiedBadge: 'డాక్టర్‌తో నిర్ధారణ అవసరం',
    medListenVoice: 'తెలుగులో ఆడియో వినండి',
    medAskPrompt: 'ఈ మందు గురించి ఏదైనా ప్రశ్న అడగండి...',
    medAskBtn: 'అడగండి',
    medClose: 'మూసివేయండి',

    logTitle: 'మందుల సమయ పట్టిక మరియు ట్రాకర్',
    logSubtitle: 'రోజూ వేళకు మందులు తీసుకోండి మరియు 7 రోజుల పురోగతిని చూడండి.',
    logTodaySchedule: 'నేటి సమయ పట్టిక',
    log7DayChart: '7 రోజుల మందుల నిబద్ధత రేఖాచిత్రం',
    logMarkTaken: 'తీసుకున్నట్లు నమోదు చేయండి',
    logDoseTaken: 'తీసుకున్నారు',
    logDosePending: 'మిగిలి ఉంది',
    logOverallAdherence: '7-రోజుల సగటు రేటు',
    logEmptyNotice: 'మందులు ఏవీ లోడ్ కాలేదు. ప్రిస్క్రిప్షన్ అప్‌లోడ్ చేయండి.',

    safetyBanner: 'వైద్య హెచ్చరిక: మందులలో మార్పులు చేసే ముందు ఎల్లప్పుడూ వైద్యుడిని లేదా ఫార్మసిస్ట్‌ను సంప్రదించండి.',
    disclaimerText: 'మెడోరా రోగులకు ప్రిస్క్రిప్షన్ అర్థం కావడానికి సహాయపడుతుంది. ఇది వైద్య చికిత్సకు ప్రత్యామ్నాయం కాదు.',
    emergencyNotice: 'వైద్య అత్యవసర పరిస్థితుల్లో వెంటనే 108 లేదా స్థానిక అత్యవసర నంబర్‌కు కాల్ చేయండి.',
    languageSelectLabel: 'భాష',
  },

  gu: {
    navHome: 'હોમ',
    navHowItWorks: 'કેવી રીતે કામ કરે છે',
    navAbout: 'વિશે',
    navMedicationLog: 'દવા લોગ',
    navCurrentPrescription: 'હાલનું પ્રિસ્ક્રિપ્શન',
    navTryDemo: 'ડેમો જુઓ',
    navUploadPrescription: 'પ્રિસ્ક્રિપ્શન અપલોડ કરો',
    navSubtitle: 'પ્રિસ્ક્રિપ્શન સમજાવનાર સહાયક',

    heroBadge: 'સુરક્ષિત AI ક્લિનિકલ સમજ',
    heroTitle: 'તમારા ડૉક્ટરનું પ્રિસ્ક્રિપ્શન તમારી પોતાની ભાષામાં સરળતાથી સમજો.',
    heroSubtitle:
      'ડૉક્ટરનું પ્રિસ્ક્રિપ્શન અપલોડ કરો. મેડોરા દવાઓની ઓળખ કરે છે, વિશ્વસનીય માર્ગદર્શિકા સાથે ચકાસે છે અને ડોઝ, સમય અને સાવચેતીઓ ગુજરાતીમાં સમજાવે છે.',
    heroUploadBtn: 'પ્રિસ્ક્રિપ્શન અપલોડ કરો',
    heroDemoBtn: 'ડેમો પ્રિસ્ક્રિપ્શન જુઓ',
    heroFeatureVerified: 'ક્લિનિકલ ગાઇડલાઇન દ્વારા ચકાસાયેલ',
    heroFeatureNoGuess: 'ખોટા અંદાજ વગર - સંપૂર્ણ સુરક્ષિત',
    heroFeatureVoice: 'ગુજરાતીમાં ઓડિયો સાંભળો',

    uploadTitle: 'પ્રિસ્ક્રિપ્શન ડોક્યુમેન્ટ અપલોડ કરો',
    uploadSubtitle: 'પ્રિસ્ક્રિપ્શનનો સ્પષ્ટ ફોટો લો અથવા ઇમેજ/પીડીએફ અપલોડ કરો.',
    uploadDropText: 'પ્રિસ્ક્રિપ્શનનો ફોટો અથવા પીડીએફ અહીં મૂકો',
    uploadBrowseText: 'અથવા તમારા ડિવાઇસમાંથી પસંદ કરો',
    uploadFormatsText: 'JPG, PNG, WEBP, PDF (મહત્તમ 20MB)',
    uploadSecurityNote: 'તમારું મેડિકલ ડોક્યુમેન્ટ સંપૂર્ણ સુરક્ષા અને ગોપનીયતા સાથે તપાસવામાં આવે છે.',
    uploadSamplePrompt: 'પ્રિસ્ક્રિપ્શન હાથવગું નથી? તૈયાર ડેમો કેસ અજમાવો:',

    resultsTitle: 'દવાઓની વિગતો અને સુરક્ષા માર્ગદર્શન',
    resultsVerifiedBadge: 'ક્લિનિકલ ડેટાબેઝ દ્વારા પ્રમાણિત',
    resultsUnverifiedNotice: 'ડૉક્ટર કે ફાર્માસિસ્ટ પાસે ખાતરી કરાવવાની દવાઓ',
    resultsSearchPlaceholder: 'દવાનું નામ, ડોઝ અથવા સૂચના શોધો...',
    resultsFilterAll: 'બધી દવાઓ',
    resultsFilterVerified: 'માત્ર ચકાસાયેલ',
    resultsFilterUnverified: 'ખાતરી જરૂરી',
    resultsPrint: 'પ્રિન્ટ / પીડીએફ સાચવો',
    resultsOpenLog: 'દવા લોગ ખોલો',
    resultsUploadNew: 'બીજું પ્રિસ્ક્રિપ્શન',
    resultsGeneralAdviceTitle: 'ડૉક્ટર અને ક્લિનિકલ સલાહ',
    resultsDemoBadge: 'ડેમો પ્રિસ્ક્રિપ્શન',
    resultsSwitchDemo: 'ડેમો બદલો',

    medDetailsTitle: 'દવાની સંપૂર્ણ માહિતી અને સાવચેતી',
    medWhatIsIt: 'આ દવા શેના માટે છે?',
    medHowToTake: 'તેને સુરક્ષિત રીતે કેવી રીતે લેવી?',
    medImportantInfo: 'મહત્વપૂર્ણ માહિતી અને સાવચેતીઓ',
    medSideEffects: 'સામાન્ય આડઅસરો',
    medPrecautions: 'સાવચેતીઓ',
    medDietaryAdvice: 'ખોરાક અને સમય સંબંધિત સલાહ',
    medVerificationSource: 'પ્રમાણિત તબીબી સ્ત્રોત',
    medVerifiedBadge: 'ચકાસાયેલ તબીબી માહિતી',
    medUnverifiedBadge: 'ડૉક્ટર પાસે ખાતરી જરૂરી',
    medListenVoice: 'ગુજરાતીમાં ઓડિયો સાંભળો',
    medAskPrompt: 'આ દવા વિશે પ્રશ્ન પૂછો...',
    medAskBtn: 'પૂછો',
    medClose: 'બંધ કરો',

    logTitle: 'દવાનું સમયપત્રક અને ટ્રેકર',
    logSubtitle: 'દરરોજ સમયસર દવા લો અને 7 દિવસની નિયમિતતા તપાસો.',
    logTodaySchedule: 'આજનું સમયપત્રક',
    log7DayChart: '7-દિવસીય દવા નિયમિતતા આલેખ',
    logMarkTaken: 'લીધી હોવાની નોંધ કરો',
    logDoseTaken: 'લીધેલ',
    logDosePending: 'બાકી',
    logOverallAdherence: '7-દિવસીય સરેરાશ દર',
    logEmptyNotice: 'કોઈ દવા લોડ થયેલ નથી. પ્રિસ્ક્રિપ્શન અપલોડ કરો અથવા ડેમો જુઓ.',

    safetyBanner: 'મેડિકલ ચેતવણી: દવામાં કોઈપણ ફેરફાર કરતા પહેલા હંમેશા તમારા ડૉક્ટર અથવા ફાર્માસિસ્ટની સલાહ લો.',
    disclaimerText: 'મેડોરા દર્દીઓને પ્રિસ્ક્રિપ્શન સમજવામાં મદદ કરે છે. તે તબીબી સારવારનો વિકલ્પ નથી.',
    emergencyNotice: 'તબીબી કટોકટીમાં તાત્કાલિક 108 અથવા સ્થાનિક ઇમરજન્સી નંબર પર કૉલ કરો.',
    languageSelectLabel: 'ભાષા',
  },
};

export function getTranslation(lang: SupportedLanguage): UiTranslations {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}
