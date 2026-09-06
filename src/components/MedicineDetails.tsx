import React, { useState } from 'react';
import {
  X,
  Pill,
  BookOpen,
  ClipboardList,
  AlertOctagon,
  ShieldCheck,
  AlertTriangle,
  Send,
  Loader2,
  Sparkles,
  Info,
  Clock,
  Calendar,
  Utensils,
  CheckCircle2,
} from 'lucide-react';
import { PrescribedMedicine, SupportedLanguage } from '../types';
import { LanguageSelector } from './LanguageSelector';
import { AudioPlayer } from './AudioPlayer';

interface MedicineDetailsProps {
  medicine: PrescribedMedicine;
  initialLanguage: SupportedLanguage;
  onClose: () => void;
}

export const MedicineDetails: React.FC<MedicineDetailsProps> = ({
  medicine,
  initialLanguage,
  onClose,
}) => {
  const [activeLang, setActiveLang] = useState<SupportedLanguage>(initialLanguage);
  const [customQuestion, setCustomQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [customAnswer, setCustomAnswer] = useState<string | null>(null);

  const explanation = medicine.patientExplanation[activeLang] || medicine.patientExplanation.en;
  const trusted = medicine.trustedInfo;

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim() || isAsking) return;

    setIsAsking(true);
    setCustomAnswer(null);

    try {
      const res = await fetch('/api/explain-medicine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          medicineName: medicine.name,
          question: customQuestion.trim(),
          language: activeLang,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to get answer');
      }

      const data = await res.json();
      setCustomAnswer(data.answer || 'No response available.');
    } catch (err) {
      // Fallback safe guidance
      setCustomAnswer(
        activeLang === 'hi'
          ? 'कृपया किसी भी विशिष्ट प्रश्न या भोजन से संबंधित सलाह के लिए अपने डॉक्टर या फार्मासिस्ट से संपर्क करें।'
          : activeLang === 'mr'
          ? 'कृपया आपल्या औषधाबाबत अधिक माहितीसाठी डॉक्टर किंवा फार्मासिस्टशी संपर्क साधा.'
          : 'Please consult your pharmacist or prescribing doctor for individualized advice.'
      );
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div
      id="medora-medicine-details-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="medicine-details-title"
    >
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                medicine.verified
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-amber-500 text-white shadow-sm'
              }`}
            >
              <Pill className="w-6 h-6 -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2
                  id="medicine-details-title"
                  className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight"
                >
                  {medicine.name}
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Strength: <strong className="text-slate-700">{medicine.strength || 'Standard'}</strong> • Form:{' '}
                <strong className="text-slate-700">{medicine.dosageForm || 'Tablet'}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3">
            <LanguageSelector
              currentLanguage={activeLang}
              onLanguageChange={setActiveLang}
              compact
            />
            <button
              id="close-medicine-details-btn"
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 cursor-pointer transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body with clear visual distinction */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* Audio Player bar */}
          <AudioPlayer
            textToSpeak={explanation.summaryAudioText}
            language={activeLang}
            variant="card"
          />

          {/* Unverified Warning if not in trusted DB */}
          {!medicine.verified && (
            <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-300 text-amber-950 space-y-2">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Verification Warning: Do Not Guess</span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                This medicine could not be reliably verified in our trusted medicine knowledge base. Medora strictly adheres to AI Safety Rules: <strong>we never guess or invent drug details</strong>. Please verify this item with your pharmacist or doctor before taking it.
              </p>
            </div>
          )}

          {/* Section 1: "What is this medicine?" (General Medicine Information) */}
          <div
            id="details-section-what-is-it"
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-sky-700 block">
                  General Medicine Information
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  What is this medicine?
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-100">
              {explanation.whatIsIt}
            </p>

            {trusted && (
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="bg-slate-100 px-2.5 py-1 rounded-md">
                  Drug Class: <strong className="text-slate-700">{trusted.drugClass}</strong>
                </span>
                <span className="bg-slate-100 px-2.5 py-1 rounded-md">
                  Source: <strong className="text-slate-700">{trusted.verificationSource}</strong>
                </span>
              </div>
            )}
          </div>

          {/* Section 2: "How did the doctor ask me to take it?" (PRESCRIPTION-SPECIFIC) */}
          <div
            id="details-section-how-to-take"
            className="bg-gradient-to-br from-sky-50 to-blue-50/60 rounded-2xl p-5 border-2 border-sky-300/80 shadow-xs"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-700 text-white flex items-center justify-center">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-sky-800 block">
                    Prescription-Specific Information (Doctor's Order)
                  </span>
                  <h3 className="text-base font-bold text-sky-950">
                    How did the doctor ask me to take it?
                  </h3>
                </div>
              </div>
              <span className="text-[11px] font-bold text-sky-800 bg-sky-200/70 px-2.5 py-1 rounded-full">
                Primary Truth
              </span>
            </div>

            {/* Prescribed details pill grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 text-xs">
              <div className="bg-white/80 p-2.5 rounded-xl border border-sky-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Dose</span>
                <span className="font-bold text-slate-800">{medicine.dosage || '1 unit'}</span>
              </div>
              <div className="bg-white/80 p-2.5 rounded-xl border border-sky-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Frequency</span>
                <span className="font-bold text-slate-800">{medicine.frequency || 'Follow label'}</span>
              </div>
              <div className="bg-white/80 p-2.5 rounded-xl border border-sky-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Duration</span>
                <span className="font-bold text-slate-800">{medicine.duration || 'As directed'}</span>
              </div>
              <div className="bg-white/80 p-2.5 rounded-xl border border-sky-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Timing</span>
                <span className="font-bold text-slate-800">{medicine.timing || 'After food'}</span>
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-sky-200/90 text-sm text-sky-950 font-medium leading-relaxed">
              {explanation.howToTake}
            </div>
          </div>

          {/* Section 3: "Important information" */}
          <div
            id="details-section-important-info"
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs"
          >
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-wider uppercase text-amber-700 block">
                  Safety, Precautions & Food Advice
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  Important information
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed bg-amber-50/40 p-3.5 rounded-xl border border-amber-100/90 mb-3">
              {explanation.importantInfo}
            </p>

            {trusted && (
              <div className="space-y-2 text-xs">
                {trusted.precautions.length > 0 && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-slate-700 block mb-1">Key Precautions:</span>
                    <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                      {trusted.precautions.map((p, idx) => (
                        <li key={idx}>{p}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {trusted.commonSideEffects.length > 0 && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2">
                    <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-700">Possible Mild Side Effects: </span>
                      <span className="text-slate-600">{trusted.commonSideEffects.join(', ')}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Ask Medora a quick question box */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Ask Medora about this medicine
              </h4>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Have a quick question about taking it with milk, food, or what to do if you forget?
            </p>

            <form onSubmit={handleAskQuestion} className="flex gap-2">
              <input
                id="ask-medicine-input"
                type="text"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder={`Ask in ${activeLang === 'hi' ? 'Hindi' : activeLang === 'mr' ? 'Marathi' : 'English'} (e.g. Can I take this with milk?)`}
                className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button
                type="submit"
                disabled={isAsking || !customQuestion.trim()}
                className="px-4 py-2 bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold rounded-xl cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
              >
                {isAsking ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>Ask</span>
              </button>
            </form>

            {customAnswer && (
              <div className="mt-3 p-3 bg-white rounded-xl border border-sky-200 text-xs text-slate-800 space-y-1">
                <span className="font-bold text-sky-800 block">Medora Answer:</span>
                <p className="leading-relaxed">{customAnswer}</p>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            AI Assistant • Verified Information
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
