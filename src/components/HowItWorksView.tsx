import React from 'react';
import {
  Upload,
  BookOpenCheck,
  Volume2,
  ShieldCheck,
  Languages,
  CheckCircle2,
  FileSearch,
  Sparkles,
  ArrowRight,
  Pill,
} from 'lucide-react';
import { AppView } from '../types';

interface HowItWorksViewProps {
  onNavigate: (view: AppView) => void;
  onOpenDemo: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({
  onNavigate,
  onOpenDemo,
}) => {
  return (
    <div id="medora-how-it-works-view" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-semibold mb-3 border border-sky-200">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span>Patient-First Workflow</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How Medora Works
        </h1>
        <p className="text-slate-600 mt-3 text-base">
          From handwritten doctor scripts to clear spoken instructions in English, Hindi, and Marathi in three reliable steps.
        </p>
      </div>

      {/* 3 Major Steps Detailed */}
      <div className="space-y-8">
        {/* Step 1: Upload */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start gap-6">
          <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 font-bold text-xl">
            1
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-sky-600" />
              <h2 className="text-xl font-bold text-slate-900">
                1. Upload Your Prescription
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Snap a photo with your phone or upload an existing JPG, PNG, or PDF file. Medora’s multimodal vision algorithms scan the prescription lines, patient names, dates, and doctor signatures.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-500">
              <span className="bg-slate-100 px-2.5 py-1 rounded-md">Camera photo or file</span>
              <span className="bg-slate-100 px-2.5 py-1 rounded-md">Handwritten & printed formats</span>
              <span className="bg-slate-100 px-2.5 py-1 rounded-md">Up to 20 MB size</span>
            </div>
          </div>
        </div>

        {/* Step 2: Understand */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start gap-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-xl">
            2
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <BookOpenCheck className="w-5 h-5 text-blue-600" />
              <h2 className="text-xl font-bold text-slate-900">
                2. Understand & Verify Medicines
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Gemini extracts the medicines into structured data: drug name, strength, dosage, frequency, and instructions. Medora then validates each drug against a trusted medical knowledge base. If an item cannot be confirmed, Medora strictly abstains from guessing and highlights a doctor confirmation warning.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-500">
              <span className="bg-slate-100 px-2.5 py-1 rounded-md">Clinical Formularies Cross-Check</span>
              <span className="bg-slate-100 px-2.5 py-1 rounded-md">Prescription vs General info separation</span>
              <span className="bg-slate-100 px-2.5 py-1 rounded-md">Strict Zero-Guess Safeguard</span>
            </div>
          </div>
        </div>

        {/* Step 3: Listen */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start gap-6">
          <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 font-bold text-xl">
            3
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-teal-600" />
              <h2 className="text-xl font-bold text-slate-900">
                3. Multilingual Voice Readout (Listen)
              </h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Patients or their loved ones can choose between English, हिन्दी (Hindi), or मराठी (Marathi). Tap the <strong>Listen</strong> button to hear comfortable, paced spoken guidance with adjustable audio speeds (0.8x, 1.0x, 1.2x) suited for senior citizens and visual ease.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-500">
              <span className="bg-slate-100 px-2.5 py-1 rounded-md">English • हिन्दी • मराठी</span>
              <span className="bg-slate-100 px-2.5 py-1 rounded-md">Adjustable speech speed</span>
              <span className="bg-slate-100 px-2.5 py-1 rounded-md">Interactive Q&A</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="mt-12 p-8 bg-gradient-to-r from-sky-700 to-sky-800 rounded-3xl text-white text-center shadow-lg shadow-sky-800/20">
        <h3 className="text-2xl font-bold mb-2">Ready to Decode Your Prescription?</h3>
        <p className="text-sky-100 text-sm max-w-xl mx-auto mb-6">
          Upload your prescription now or explore a ready-to-run demo prescription in seconds.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('upload')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-sky-800 font-bold text-sm hover:bg-sky-50 shadow-xs cursor-pointer"
          >
            Upload Prescription
          </button>
          <button
            type="button"
            onClick={onOpenDemo}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-sky-900/60 hover:bg-sky-900 text-white font-semibold text-sm border border-sky-600 cursor-pointer"
          >
            Try Demo Mode
          </button>
        </div>
      </div>
    </div>
  );
};
