import React from 'react';
import { Check, Loader2, Circle, Sparkles, FileText, Pill, ShieldCheck, HeartPulse } from 'lucide-react';
import { ProcessingStep } from '../types';

interface ProcessingStatusProps {
  currentStepIndex: number;
  fileName?: string;
}

export const PROCESSING_STEPS: { id: string; label: string; detail: string }[] = [
  {
    id: 'step-upload',
    label: 'Document uploaded',
    detail: 'Prescription image / PDF secured and prepared for OCR analysis.',
  },
  {
    id: 'step-reading',
    label: 'Reading prescription',
    detail: 'Gemini multimodal vision model reading handwritten lines and clinical signatures.',
  },
  {
    id: 'step-identifying',
    label: 'Identifying medicines',
    detail: 'Extracting medicine names, strengths, dosages, frequencies, and durations.',
  },
  {
    id: 'step-finding',
    label: 'Finding trusted information',
    detail: 'Cross-referencing each compound with validated medical databases & safety formularies.',
  },
  {
    id: 'step-preparing',
    label: 'Preparing explanation',
    detail: 'Generating simple patient-friendly instructions in English, Hindi, and Marathi.',
  },
];

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  currentStepIndex,
  fileName,
}) => {
  return (
    <div
      id="medora-processing-interface"
      className="max-w-xl mx-auto px-4 py-12 text-slate-800"
    >
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10">
        {/* Animated Center Pulse Indicator */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-sky-100/70 animate-ping [animation-duration:2.5s]" />
            <div className="absolute inset-1 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center" />
            <HeartPulse className="w-9 h-9 text-sky-700 relative z-10 animate-pulse" />
          </div>

          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Analyzing Prescription
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm">
            Medora's Clinical AI is reading your document and verifying safety information.
          </p>
          {fileName && (
            <span className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 text-[11px] font-mono">
              <FileText className="w-3 h-3 text-sky-600" />
              {fileName}
            </span>
          )}
        </div>

        {/* 5 Progress Checkpoints */}
        <div className="space-y-4 relative">
          {/* Vertical connecting line */}
          <div className="absolute left-4.5 top-3 bottom-5 w-0.5 bg-slate-200" />

          {PROCESSING_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isActive = idx === currentStepIndex;
            const isPending = idx > currentStepIndex;

            return (
              <div
                key={step.id}
                id={`processing-step-${idx}`}
                className={`relative flex items-start gap-4 p-3 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? 'bg-sky-50/90 border border-sky-200/90 shadow-xs'
                    : isCompleted
                    ? 'opacity-95'
                    : 'opacity-40'
                }`}
              >
                {/* Step Icon / Status Marker */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : isActive
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : isActive ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Circle className="w-3.5 h-3.5 fill-current" />
                  )}
                </div>

                {/* Step Text Info */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`text-sm font-bold ${
                        isActive
                          ? 'text-sky-950'
                          : isCompleted
                          ? 'text-slate-800'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.label}
                    </h4>
                    {isActive && (
                      <span className="text-[10px] uppercase font-bold tracking-wider text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full animate-pulse">
                        In Progress
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Done
                      </span>
                    )}
                  </div>
                  <p
                    className={`text-xs mt-0.5 leading-relaxed ${
                      isActive ? 'text-sky-900' : 'text-slate-500'
                    }`}
                  >
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Safety footnote during processing */}
        <div className="mt-8 pt-5 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            Zero-Hallucination Policy: Unverified medicines will never be guessed.
          </p>
        </div>
      </div>
    </div>
  );
};
