import React from 'react';
import { ShieldCheck, HeartPulse, Lock, AlertTriangle, FileCheck, CheckCircle2 } from 'lucide-react';
import { AppView } from '../types';

interface AboutViewProps {
  onNavigate: (view: AppView) => void;
  onOpenDemo: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenDemo }) => {
  const safetyRules = [
    {
      title: 'Prescription As Source of Truth',
      desc: 'The doctor’s prescription is always the primary source of truth for drug names, strength, dosage, and duration.',
    },
    {
      title: 'Zero Invention or Guessing',
      desc: 'Medora never invents missing dosages or guesses illegible handwriting. When uncertain, it abstains and alerts the patient.',
    },
    {
      title: 'Dosage Integrity',
      desc: 'Medora never modifies or reinterprets the prescribed dosage or dosing schedule under any circumstance.',
    },
    {
      title: 'Trusted Clinical Formularies',
      desc: 'General medicine information is cross-referenced strictly against verified clinical formularies (WHO, BNF, FDA).',
    },
    {
      title: 'No Disease Diagnosis',
      desc: 'Medora is designed strictly to explain prescriptions—it never diagnoses conditions or suggests new illnesses.',
    },
    {
      title: 'No Treatment Modifications',
      desc: 'Medora never instructs patients to start, stop, increase, or decrease any medications.',
    },
    {
      title: 'Explicit Verification Warnings',
      desc: 'If an item cannot be confirmed in the trusted database, Medora explicitly advises confirming with a doctor or pharmacist.',
    },
    {
      title: 'Simple Patient-Friendly Language',
      desc: 'Medical jargon is transformed into everyday, reassuring words in English, हिन्दी, and मराठी.',
    },
    {
      title: 'Clear Information Separation',
      desc: 'Prescription-specific instructions from the doctor are visually and conceptually separated from general drug facts.',
    },
    {
      title: 'Assistive Voice Guidance',
      desc: 'Accessible text-to-speech ensures that elderly patients and visually impaired caregivers have equal access to understanding.',
    },
  ];

  return (
    <div id="medora-about-view" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Product Positioning Statement */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-semibold mb-3 border border-sky-200">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
          <span>Our Clinical Positioning & Trust</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About Medora
        </h1>
        <p className="text-slate-600 mt-3 text-base leading-relaxed">
          Medora is an <strong>AI-powered prescription understanding assistant</strong>, not an AI doctor. We help bridge the communication gap between healthcare providers and patients.
        </p>
      </div>

      {/* Core Mission Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs mb-10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Why Medora was Built
            </h2>
            <p className="text-xs text-slate-500">
              Prescription non-adherence & misunderstanding affects over 40% of patients worldwide.
            </p>
          </div>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          Prescriptions are often filled with rushed handwriting, medical abbreviations like <em>1-0-1</em> or <em>SOS</em>, and technical drug names. In India and multilingual communities, language barriers add another layer of confusion. Medora helps patients understand what each pill is for, how and when to take it, and key food precautions in their preferred native tongue.
        </p>
      </div>

      {/* AI Safety Rules Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-700" />
            <h2 className="text-xl font-bold text-slate-900">
              Medora AI Safety Rules & Principles
            </h2>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            Strictly Enforced
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {safetyRules.map((rule, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-sky-300 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-sky-50 text-sky-700 text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{rule.title}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-8">
                {rule.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Guarantee */}
      <div className="mt-10 p-6 bg-slate-100/80 rounded-2xl border border-slate-200 flex items-start gap-4">
        <Lock className="w-6 h-6 text-sky-700 shrink-0 mt-1" />
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-slate-900">
            Privacy & Ephemeral Data Processing
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Medora processes prescription documents ephemerally in volatile memory solely to extract medicine instructions. Your prescription images and personal health records are not stored permanently or sold to third parties.
          </p>
        </div>
      </div>
    </div>
  );
};
