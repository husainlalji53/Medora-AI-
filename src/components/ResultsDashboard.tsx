import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Search,
  Upload,
  User,
  Building2,
  Calendar,
  Layers,
  Volume2,
  ArrowLeft,
  CheckCircle2,
  CalendarCheck,
} from 'lucide-react';
import {
  PrescriptionAnalysisResult,
  PrescribedMedicine,
  SupportedLanguage,
  AppView,
} from '../types';
import { MedicineCard } from './MedicineCard';
import { LanguageSelector } from './LanguageSelector';
import { SafetyWarning } from './SafetyWarning';
import { getTranslation } from '../utils/translations';

interface ResultsDashboardProps {
  prescription: PrescriptionAnalysisResult;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  onExplainMedicine: (med: PrescribedMedicine) => void;
  onUploadNew: () => void;
  onOpenDemoPicker: () => void;
  onOpenMedicationLog?: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  prescription,
  currentLanguage,
  onLanguageChange,
  onExplainMedicine,
  onUploadNew,
  onOpenDemoPicker,
  onOpenMedicationLog,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'verified' | 'unverified'>('all');

  const t = getTranslation(currentLanguage);

  const filteredMedicines = prescription.medicines.filter((med) => {
    const matchesSearch =
      med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.instruction.toLowerCase().includes(searchTerm.toLowerCase()) ||
      med.strength.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === 'verified') return med.verified;
    if (filterType === 'unverified') return !med.verified;
    return true;
  });

  const generalAdviceText =
    prescription.generalAdvice?.[currentLanguage] ||
    prescription.generalAdvice?.en ||
    'Take medications at regular intervals with plenty of water.';

  return (
    <div id="medora-results-dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Banner & Demo badge */}
      {prescription.isDemo && (
        <div
          id="demo-mode-badge-banner"
          className="mb-6 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-amber-900 shadow-xs"
        >
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md mr-2">
                {t.resultsDemoBadge}
              </span>
              <span className="text-xs font-medium">
                You are viewing a fictional prescription demonstrating Medora's AI extraction and multilingual features.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenDemoPicker}
            className="text-xs font-semibold text-amber-900 underline hover:text-amber-950 cursor-pointer self-end sm:self-auto"
          >
            {t.resultsSwitchDemo}
          </button>
        </div>
      )}

      {/* Main Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200/90">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.resultsTitle}
            </h1>
            <span
              id="detected-medicines-count"
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800 border border-sky-200 shadow-xs"
            >
              {prescription.medicines.length} Medicines Detected
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            {t.navSubtitle}
          </p>
        </div>

        {/* Global Language Selector & Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />

          {onOpenMedicationLog && (
            <button
              id="dashboard-open-med-log-btn"
              type="button"
              onClick={onOpenMedicationLog}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 shadow-sm shadow-sky-700/20 cursor-pointer transition-all active:scale-98"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>{t.resultsOpenLog}</span>
            </button>
          )}

          <button
            type="button"
            onClick={onUploadNew}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs cursor-pointer transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-sky-600" />
            <span>{t.resultsUploadNew}</span>
          </button>
        </div>
      </div>

      {/* Prescription Meta Bar (Patient / Doctor / Date) */}
      <div className="mt-6 p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Patient</span>
            <span className="font-bold text-slate-900 text-sm">
              {prescription.patientName || 'Patient'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Prescribed By</span>
            <span className="font-semibold text-slate-800 line-clamp-1">
              {prescription.doctorOrClinic || 'Licensed Physician'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Date</span>
            <span className="font-semibold text-slate-800">
              {prescription.date || 'Recent'}
            </span>
          </div>
        </div>
      </div>

      {/* Unverified Medicine Warning Banner if any unverified items */}
      {prescription.unverifiedCount > 0 && (
        <div className="mt-6">
          <SafetyWarning
            variant="unverified"
            unverifiedCount={prescription.unverifiedCount}
          />
        </div>
      )}

      {/* Doctor General Advice Card */}
      {generalAdviceText && (
        <div className="mt-6 p-4 bg-sky-50/70 border border-sky-200/80 rounded-2xl text-xs text-sky-950 flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg bg-sky-600 text-white flex items-center justify-center shrink-0 mt-0.5">
            <FileText className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <h4 className="font-bold text-sky-900 text-xs uppercase tracking-wider">
              {t.resultsGeneralAdviceTitle} ({currentLanguage.toUpperCase()})
            </h4>
            <p className="leading-relaxed text-sky-900">{generalAdviceText}</p>
          </div>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="search-medicines-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.resultsSearchPlaceholder}
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto text-xs">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors ${
              filterType === 'all'
                ? 'bg-sky-700 text-white font-semibold shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t.resultsFilterAll} ({prescription.medicines.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('verified')}
            className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors ${
              filterType === 'verified'
                ? 'bg-sky-700 text-white font-semibold shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t.resultsFilterVerified} ({prescription.medicines.filter((m) => m.verified).length})
          </button>
          {prescription.unverifiedCount > 0 && (
            <button
              type="button"
              onClick={() => setFilterType('unverified')}
              className={`px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors ${
                filterType === 'unverified'
                  ? 'bg-amber-600 text-white font-semibold shadow-xs'
                  : 'bg-white text-amber-800 border border-amber-200 hover:bg-amber-50'
              }`}
            >
              {t.resultsFilterUnverified} ({prescription.unverifiedCount})
            </button>
          )}
        </div>
      </div>

      {/* Grid of Medicine Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMedicines.map((medicine, idx) => (
          <MedicineCard
            key={medicine.id}
            medicine={medicine}
            index={idx}
            language={currentLanguage}
            onExplain={onExplainMedicine}
          />
        ))}
      </div>

      {filteredMedicines.length === 0 && (
        <div className="mt-8 text-center py-12 bg-white rounded-2xl border border-slate-200">
          <p className="text-slate-500 text-sm">No medicines found matching "{searchTerm}".</p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setFilterType('all');
            }}
            className="mt-2 text-xs text-sky-700 font-semibold hover:underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Bottom Safety Commitment */}
      <div className="mt-12">
        <SafetyWarning variant="card" />
      </div>
    </div>
  );
};
