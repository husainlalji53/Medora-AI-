import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, Image as ImageIcon, Sparkles, AlertCircle, X, CheckCircle2 } from 'lucide-react';
import { DEMO_PRESCRIPTIONS, DemoPrescriptionOption } from '../data/samplePrescriptions';

interface UploadDropzoneProps {
  onFileSelect: (file: File) => void;
  onSelectDemo: (demo: DemoPrescriptionOption) => void;
  isProcessing: boolean;
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  onFileSelect,
  onSelectDemo,
  isProcessing,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

  const validateAndHandleFile = (file: File) => {
    setErrorMessage(null);

    if (!allowedTypes.includes(file.type)) {
      setErrorMessage('Please upload a valid JPG, PNG, or PDF prescription file.');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setErrorMessage('File size must be under 20 MB.');
      return;
    }

    setSelectedFile(file);

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null); // PDF
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndHandleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndHandleFile(e.target.files[0]);
    }
  };

  const handleAnalyzeClick = () => {
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setFilePreview(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div id="medora-upload-section" className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Upload Prescription
        </h1>
        <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-lg mx-auto">
          Upload a clear photo, scan, or PDF of your doctor's prescription. Medora will read and translate it for you.
        </p>
      </div>

      {/* Main Dropzone Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-10 transition-all">
        {!selectedFile ? (
          <div
            id="prescription-dropzone"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-14 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
              isDragOver
                ? 'border-sky-600 bg-sky-50/70 scale-[1.01]'
                : 'border-slate-300 hover:border-sky-400 bg-slate-50/50 hover:bg-sky-50/20'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              id="file-upload-input"
              type="file"
              accept=".jpg,.jpeg,.png,.webp,.pdf"
              className="hidden"
              onChange={handleInputChange}
            />

            <div className="w-16 h-16 rounded-2xl bg-sky-100/80 text-sky-700 flex items-center justify-center mb-4 shadow-xs">
              <UploadCloud className="w-8 h-8" />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-1">
              Drag & drop your prescription here
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-4">
              Supports <strong className="text-slate-700">JPG, PNG, PDF</strong> (up to 20MB)
            </p>

            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest my-1">
              or
            </span>

            <button
              id="choose-file-btn"
              type="button"
              className="mt-3 px-6 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-sm font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Choose File
            </button>
          </div>
        ) : (
          /* Selected File Preview Stage */
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-sky-50/70 rounded-2xl border border-sky-200">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
                  {selectedFile.type === 'application/pdf' ? (
                    <FileText className="w-6 h-6" />
                  ) : (
                    <ImageIcon className="w-6 h-6" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type.toUpperCase()}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClear}
                disabled={isProcessing}
                className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-white cursor-pointer transition-colors"
                title="Remove file"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Preview if available */}
            {filePreview && (
              <div className="max-h-72 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center p-2">
                <img
                  src={filePreview}
                  alt="Prescription preview"
                  className="max-h-64 object-contain rounded-lg shadow-xs"
                />
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                id="analyze-prescription-btn"
                type="button"
                onClick={handleAnalyzeClick}
                disabled={isProcessing}
                className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                <Sparkles className="w-4 h-4 text-sky-200" />
                <span>Analyze Prescription with AI</span>
              </button>

              <button
                type="button"
                onClick={handleClear}
                disabled={isProcessing}
                className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold cursor-pointer"
              >
                Change File
              </button>
            </div>
          </div>
        )}

        {/* Error notification */}
        {errorMessage && (
          <div className="mt-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Security & Privacy hint */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Private & ephemeral: prescriptions are analyzed in memory and never sold.
          </span>
          <span className="hidden sm:inline text-slate-400">
            JPG • PNG • PDF
          </span>
        </div>
      </div>

      {/* Demo Prescription Section */}
      <div className="mt-10 bg-slate-100/80 rounded-2xl border border-slate-200/80 p-5 sm:p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h3 className="text-sm font-bold text-slate-900">
              No Prescription on Hand? Try Sample Prescriptions
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
            Demo Mode
          </span>
        </div>
        <p className="text-xs text-slate-600 mb-4">
          Select one of our realistic sample prescriptions to experience the full AI extraction, multilingual explanation, and voice audio workflow instantly:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DEMO_PRESCRIPTIONS.map((demo) => (
            <button
              key={demo.id}
              id={`sample-demo-btn-${demo.id}`}
              type="button"
              onClick={() => onSelectDemo(demo)}
              disabled={isProcessing}
              className="text-left p-3.5 rounded-xl bg-white border border-slate-200 hover:border-sky-400 hover:shadow-xs transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-sky-900 group-hover:text-sky-700">
                  {demo.title}
                </span>
                <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                  {demo.medicines.length} medicines
                </span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-1">
                {demo.doctorName} • {demo.patientName}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
