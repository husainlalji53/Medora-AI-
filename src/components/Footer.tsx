import React from 'react';
import { Pill, ShieldCheck, Heart, AlertCircle, PhoneCall } from 'lucide-react';
import { AppView } from '../types';

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer id="medora-footer" className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center">
                <Pill className="w-5 h-5 -rotate-45" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Medora
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Understand Your Prescription. In Your Language. Medora is a multilingual AI prescription understanding assistant that helps patients and caregivers decode medication instructions safely in English, Hindi, and Marathi.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-sky-400">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>AI Assistant • Not an AI Doctor • Zero Guessing Policy</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About & Safety Rules
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('medication-log')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Medication Log
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('upload')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Upload Prescription
                </button>
              </li>
            </ul>
          </div>

          {/* Clinical Disclaimer & Emergency */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Emergency & Support
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              In medical emergencies, call your local ambulance helpline immediately.
            </p>
            <div className="p-3 bg-slate-800/90 rounded-xl border border-slate-700 text-xs text-slate-300 flex items-start gap-2">
              <PhoneCall className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Medical Emergency:</span>
                <span>India: 108 / 112 • US: 911 • UK: 999</span>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Disclaimer Banner */}
        <div className="pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-center sm:text-left leading-relaxed">
            <strong>Disclaimer:</strong> Medora provides informational AI explanations. It does not provide medical advice, diagnosis, or treatment. Always consult your qualified physician or licensed pharmacist regarding any prescription medication.
          </p>
          <span className="shrink-0 text-slate-600">
            © {new Date().getFullYear()} Medora AI
          </span>
        </div>
      </div>
    </footer>
  );
};
