import React from 'react';
import { Sparkles, X, ChevronRight, FileText, CheckCircle2, User, Building2 } from 'lucide-react';
import { DEMO_PRESCRIPTIONS, DemoPrescriptionOption } from '../data/samplePrescriptions';

interface DemoPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDemo: (demo: DemoPrescriptionOption) => void;
}

export const DemoPickerModal: React.FC<DemoPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectDemo,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="medora-demo-picker-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Choose a Sample Prescription
              </h2>
              <p className="text-xs text-slate-500">
                Explore the complete AI analysis, multilingual translations, and audio readout.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Prescription List */}
        <div className="p-5 sm:p-6 space-y-3.5 max-h-[70vh] overflow-y-auto">
          {DEMO_PRESCRIPTIONS.map((demo) => (
            <div
              key={demo.id}
              className="p-4 rounded-2xl border border-slate-200 hover:border-sky-400 hover:bg-sky-50/20 transition-all cursor-pointer group flex flex-col justify-between"
              onClick={() => {
                onSelectDemo(demo);
                onClose();
              }}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md">
                    {demo.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 mt-1">
                    {demo.title}
                  </h3>
                </div>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-lg shrink-0">
                  {demo.medicines.length} Medicines
                </span>
              </div>

              <p className="text-xs text-slate-600 mb-3 line-clamp-1">
                {demo.diagnosisNote}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>{demo.patientName}</span>
                <span className="text-sky-700 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                  Load Case <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Fictional patient data for demonstration
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
