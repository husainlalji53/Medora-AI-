import React from 'react';
import { AlertTriangle, ShieldCheck, Info } from 'lucide-react';

interface SafetyWarningProps {
  variant?: 'banner' | 'card' | 'inline' | 'unverified';
  unverifiedCount?: number;
  medicineName?: string;
  className?: string;
}

export const SafetyWarning: React.FC<SafetyWarningProps> = ({
  variant = 'banner',
  unverifiedCount = 0,
  medicineName,
  className = '',
}) => {
  if (variant === 'unverified') {
    return (
      <div
        id="safety-warning-unverified"
        className={`bg-amber-50 border-l-4 border-amber-500 p-3.5 rounded-r-xl shadow-xs text-amber-900 ${className}`}
        role="alert"
      >
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Doctor / Pharmacist Confirmation Required
            </h4>
            <p className="text-xs text-amber-800 leading-relaxed">
              {medicineName
                ? `Information for "${medicineName}" could not be confirmed in our trusted medicine knowledge base.`
                : 'One or more items could not be confirmed in our trusted medicine knowledge base.'}{' '}
              Medora <strong>does not guess</strong> or extrapolate unverified medications. Please check this exact medicine name and dose with your doctor or pharmacist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div
        id="safety-warning-inline"
        className={`inline-flex items-center gap-2 text-xs text-slate-600 bg-slate-100/90 px-3 py-1.5 rounded-lg border border-slate-200/80 ${className}`}
      >
        <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
        <span>
          AI Prescription Assistant • Not an AI Doctor • Always consult your physician
        </span>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div
        id="safety-warning-card"
        className={`bg-white border border-slate-200 rounded-2xl p-5 shadow-xs ${className}`}
      >
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">
              Medora Clinical Safety Guarantee
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Medora is an <strong>AI-powered prescription understanding assistant</strong>, not an AI doctor. We do not diagnose diseases, recommend starting/stopping treatments, or change your doctor's dosage.
            </p>
            <ul className="text-xs text-slate-500 space-y-1 list-disc pl-4">
              <li>Your doctor's prescription is always the primary source of truth.</li>
              <li>General medical explanations are cross-referenced with trusted drug formularies.</li>
              <li>When information cannot be verified, Medora abstains rather than guessing.</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Banner variant (default)
  return (
    <div
      id="safety-warning-banner"
      className={`bg-sky-50/90 border border-sky-200/90 rounded-xl p-3.5 flex items-center justify-between gap-3 text-sky-950 ${className}`}
    >
      <div className="flex items-center gap-2.5">
        <Info className="w-4 h-4 text-sky-700 shrink-0" />
        <p className="text-xs text-sky-900 leading-relaxed font-medium">
          <strong>Medical Disclaimer:</strong> Medora is an AI assistant that explains your prescription in simple terms. Never adjust or stop medicines without consulting your doctor or pharmacist.
        </p>
      </div>
    </div>
  );
};
