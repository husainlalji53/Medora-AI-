import React from 'react';
import {
  Upload,
  Sparkles,
  Volume2,
  FileCheck2,
  Languages,
  BookOpenCheck,
  ShieldCheck,
  CheckCircle2,
  Globe,
} from 'lucide-react';
import { AppView, SupportedLanguage } from '../types';
import { LanguageSelector } from './LanguageSelector';
import { getTranslation, SUPPORTED_LANGUAGES } from '../utils/translations';

interface HeroProps {
  onNavigate: (view: AppView) => void;
  onOpenDemo: () => void;
  currentLanguage?: SupportedLanguage;
  onLanguageChange?: (lang: SupportedLanguage) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onNavigate,
  onOpenDemo,
  currentLanguage = 'en',
  onLanguageChange,
}) => {
  const t = getTranslation(currentLanguage);

  return (
    <div id="medora-hero-section" className="relative overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-20">
      {/* Background soft ambient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none opacity-40">
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-sky-200/50 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-blue-100/60 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Hero Content */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/90 text-sky-800 text-xs font-semibold shadow-xs">
            <ShieldCheck className="w-4 h-4 text-sky-600" />
            <span>{t.heroBadge}</span>
          </div>

          {/* Tagline / Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            {t.heroTitle}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            {t.heroSubtitle}
          </p>

          {/* Quick Language Selector in Hero */}
          {onLanguageChange && (
            <div className="pt-1 flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5 text-sky-600" />
                <span>11 Supported Languages:</span>
              </div>
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={onLanguageChange}
                variant="pills"
                className="max-w-full justify-center"
              />
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              id="hero-primary-cta"
              type="button"
              onClick={() => onNavigate('upload')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-base font-semibold text-white bg-sky-700 hover:bg-sky-800 shadow-md shadow-sky-700/25 transition-all transform active:scale-98 cursor-pointer"
            >
              <Upload className="w-5 h-5" />
              <span>{t.heroUploadBtn}</span>
            </button>

            <button
              id="hero-secondary-cta"
              type="button"
              onClick={onOpenDemo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>{t.heroDemoBtn}</span>
            </button>
          </div>

          {/* Mini trust markers */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 font-medium">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" /> {t.heroFeatureVerified}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" /> {t.heroFeatureNoGuess}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" /> {t.heroFeatureVoice}
            </span>
          </div>
        </div>

        {/* How It Works Section: Upload → Understand → Listen */}
        <section id="how-it-works-hero-section" className="mt-16 pt-10 border-t border-slate-200/80">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {t.navHowItWorks}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Three simple steps to decode your doctor's instructions in your language
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto relative">
            {/* Step 1: Upload */}
            <div
              id="step-card-upload"
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow relative flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-lg mb-4 border border-sky-100">
                <Upload className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700">Step 1</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Upload Prescription</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Take a photo or upload a PDF or image of your doctor's prescription. Medora handles handwritten or printed notes.
              </p>
            </div>

            {/* Step 2: Understand */}
            <div
              id="step-card-understand"
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow relative flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-lg mb-4 border border-blue-100">
                <BookOpenCheck className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Step 2</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Clinical Verification</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Medicines, strengths, frequencies, and timings are extracted and verified against clinical databases in plain patient language.
              </p>
            </div>

            {/* Step 3: Listen & Switch Language */}
            <div
              id="step-card-listen"
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow relative flex flex-col items-start"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-lg mb-4 border border-teal-100">
                <Volume2 className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Step 3</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Listen & Learn in 11 Languages</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Switch between English, हिन्दी, मराठी, Español, Français, Deutsch, العربية, বাংলা, தமிழ், తెలుగు, or ગુજરાતી with clear voice audio!
              </p>
            </div>
          </div>
        </section>

        {/* Feature Cards Section */}
        <section id="features-hero-section" className="mt-16 pt-10 border-t border-slate-200/80">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Designed for Patient Safety & Clarity
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Every feature is built around accessibility, accuracy, and clinical safeguards
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-sky-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                AI Prescription Reading
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Identifies complex medical handwriting and abbreviations into structured medicines, strengths, and dosages.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-sky-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Simple Explanations
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Removes clinical jargon. Clearly explains what each medicine does, when to take it, and key food instructions.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-sky-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <Languages className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                11 Regional & Global Languages
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Comprehensive native explanations across English, Hindi, Marathi, Bengali, Tamil, Telugu, Gujarati, Spanish, French, German, and Arabic.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-sky-300 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                <Volume2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Voice Spoken Audio
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                High-clarity text-to-speech with speed controls designed especially for elderly patients and auditory accessibility.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-sky-300 transition-colors sm:col-span-2 lg:col-span-2">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3">
                <BookOpenCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Trusted Information & Zero-Guess Guarantee
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Grounded strictly in validated medical formularies. If a medicine cannot be verified with high certainty, Medora never hallucinates or guesses—it explicitly alerts you to confirm with your pharmacist.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
