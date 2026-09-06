import React from 'react';
import {
  Pill,
  Clock,
  Calendar,
  Info,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  Volume2,
} from 'lucide-react';
import { PrescribedMedicine, SupportedLanguage } from '../types';
import { AudioPlayer } from './AudioPlayer';
import { getTranslation } from '../utils/translations';

interface MedicineCardProps {
  medicine: PrescribedMedicine;
  index: number;
  language: SupportedLanguage;
  onExplain: (medicine: PrescribedMedicine) => void;
}

export const MedicineCard: React.FC<MedicineCardProps> = ({
  medicine,
  index,
  language,
  onExplain,
}) => {
  const t = getTranslation(language);
  const explanation = medicine.patientExplanation[language] || medicine.patientExplanation.en;
  const audioText = explanation.summaryAudioText;

  return (
    <div
      id={`med-card-${medicine.id}`}
      className={`bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
        medicine.verified
          ? 'border-slate-200/90 hover:border-sky-300'
          : 'border-amber-300 bg-amber-50/20'
      }`}
    >
      {/* Top Header info */}
      <div className="p-5 sm:p-6 pb-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                medicine.verified
                  ? 'bg-sky-50 text-sky-700 border border-sky-100'
                  : 'bg-amber-100 text-amber-700 border border-amber-200'
              }`}
            >
              <Pill className="w-5 h-5 -rotate-45" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Medicine #{index + 1} • {medicine.dosageForm || 'Oral'}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {medicine.name}
              </h3>
            </div>
          </div>

          {/* Verification Badge */}
          {medicine.verified ? (
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0"
              title="Verified in clinical formulary"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.medVerifiedBadge}</span>
            </span>
          ) : (
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-900 border border-amber-200 shrink-0"
              title="Not found in standard knowledge base"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
              <span>{t.medUnverifiedBadge}</span>
            </span>
          )}
        </div>

        {/* Medicine Attributes Grid: Strength, Frequency, Duration */}
        <div className="grid grid-cols-3 gap-2 py-3 px-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs mb-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Strength
            </span>
            <span className="font-semibold text-slate-800 truncate block mt-0.5">
              {medicine.strength || 'Standard'}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider flex items-center gap-1">
              <Clock className="w-2.5 h-2.5 text-sky-600" /> Frequency
            </span>
            <span className="font-semibold text-slate-800 truncate block mt-0.5">
              {medicine.frequency || 'Follow label'}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider flex items-center gap-1">
              <Calendar className="w-2.5 h-2.5 text-sky-600" /> Duration
            </span>
            <span className="font-semibold text-slate-800 truncate block mt-0.5">
              {medicine.duration || 'As directed'}
            </span>
          </div>
        </div>

        {/* Prescription Instruction */}
        <div className="space-y-1 text-xs">
          <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
            Prescription Instruction:
          </span>
          <p className="text-slate-800 font-medium bg-sky-50/50 p-2.5 rounded-lg border border-sky-100/80 leading-relaxed">
            {medicine.instruction || 'Take as indicated by doctor.'}
          </p>
        </div>

        {/* Unverified Warning notice if applicable */}
        {!medicine.verified && (
          <div className="mt-3 p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              Medora does not guess unverified medicines. Please confirm this exact drug name and dosage with your doctor or pharmacist.
            </p>
          </div>
        )}
      </div>

      {/* Card Footer Actions: Explain button & Listen button */}
      <div className="px-5 py-3.5 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between gap-3">
        {/* Listen Button */}
        <AudioPlayer
          textToSpeak={audioText}
          language={language}
          label={t.medListenVoice}
          variant="button"
          className="flex-1"
        />

        {/* Explain Button */}
        <button
          id={`explain-btn-${medicine.id}`}
          type="button"
          onClick={() => onExplain(medicine)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 shadow-xs cursor-pointer transition-all active:scale-98"
        >
          <span>{t.medExplainBtn}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
