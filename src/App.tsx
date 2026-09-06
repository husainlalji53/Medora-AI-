import React, { useState } from 'react';
import {
  AppView,
  PrescriptionAnalysisResult,
  PrescribedMedicine,
  SupportedLanguage,
} from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { UploadDropzone } from './components/UploadDropzone';
import { ProcessingStatus } from './components/ProcessingStatus';
import { ResultsDashboard } from './components/ResultsDashboard';
import { MedicineDetails } from './components/MedicineDetails';
import { HowItWorksView } from './components/HowItWorksView';
import { AboutView } from './components/AboutView';
import { MedicationLogView } from './components/MedicationLogView';
import { Footer } from './components/Footer';
import { DemoPickerModal } from './components/DemoPickerModal';
import {
  DEMO_PRESCRIPTIONS,
  DemoPrescriptionOption,
  buildAnalysisResultFromDemo,
} from './data/samplePrescriptions';
import { SafetyWarning } from './components/SafetyWarning';
import {
  auth,
  savePrescriptionToCloud,
  getCloudPrescriptions,
} from './lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [prescription, setPrescription] = useState<PrescriptionAnalysisResult | null>(null);
  const [activeMedicineDetails, setActiveMedicineDetails] = useState<PrescribedMedicine | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [processingFileName, setProcessingFileName] = useState<string>('');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  // Listen to Firebase auth state and sync cloud prescriptions
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user && !prescription) {
        try {
          const cloudList = await getCloudPrescriptions(user.uid);
          if (cloudList && cloudList.length > 0) {
            // Pick most recent prescription
            const sorted = [...cloudList].sort(
              (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
            );
            setPrescription(sorted[0]);
          }
        } catch (err) {
          console.error('Failed to load cloud prescriptions:', err);
        }
      }
    });
    return () => unsubscribe();
  }, [prescription]);

  // Handle uploaded file analysis
  const handleFileAnalysis = async (file: File) => {
    setIsProcessing(true);
    setProcessingStep(0); // Document uploaded
    setProcessingFileName(file.name);
    setCurrentView('processing');
    setApiError(null);

    // Progression timer simulation while server processes
    const stepInterval = setInterval(() => {
      setProcessingStep((prev) => {
        if (prev < 4) {
          return prev + 1;
        }
        return prev;
      });
    }, 1400);

    try {
      // Convert file to base64
      const base64Data = await fileToBase64(file);

      const response = await fetch('/api/analyze-prescription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          base64Data,
          mimeType: file.type || 'image/jpeg',
          fileName: file.name,
        }),
      });

      clearInterval(stepInterval);
      setProcessingStep(4); // Preparing explanation

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const result: PrescriptionAnalysisResult = await response.json();

      // Brief delay to let user see final step complete
      setTimeout(() => {
        setPrescription(result);
        if (auth.currentUser) {
          savePrescriptionToCloud(auth.currentUser.uid, result).catch((err) =>
            console.error('Failed to save prescription to Firebase:', err)
          );
        }
        setIsProcessing(false);
        setCurrentView('results');
      }, 700);
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsProcessing(false);
      console.error('Prescription processing failed:', err);
      setApiError(
        err.message || 'Failed to read prescription. Please ensure the document is clear or try Demo Mode.'
      );
      setCurrentView('upload');
    }
  };

  // Helper to convert File to raw base64 string
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Strip data:image/...;base64, prefix
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // Handle Demo Mode selection
  const handleSelectDemo = (demo: DemoPrescriptionOption) => {
    setIsProcessing(true);
    setProcessingStep(0);
    setProcessingFileName(`${demo.title} (Sample Document)`);
    setCurrentView('processing');
    setApiError(null);

    // Simulate animated checkpoints for demo
    const steps = [
      setTimeout(() => setProcessingStep(1), 500),
      setTimeout(() => setProcessingStep(2), 1100),
      setTimeout(() => setProcessingStep(3), 1800),
      setTimeout(() => setProcessingStep(4), 2400),
      setTimeout(() => {
        const result = buildAnalysisResultFromDemo(demo);
        setPrescription(result);
        setIsProcessing(false);
        setCurrentView('results');
      }, 3000),
    ];
  };

  const handleOpenDemoModal = () => {
    setIsDemoModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Universal Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          if (!isProcessing) {
            setCurrentView(view);
          }
        }}
        onOpenDemo={handleOpenDemoModal}
        hasPrescription={prescription !== null}
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Error notification banner if any */}
        {apiError && currentView !== 'processing' && (
          <div className="max-w-4xl mx-auto px-4 pt-6">
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 flex items-center justify-between gap-3 shadow-xs">
              <p>
                <strong>Analysis Note:</strong> {apiError}
              </p>
              <button
                type="button"
                onClick={() => setApiError(null)}
                className="text-rose-600 hover:text-rose-800 font-bold text-sm cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* View 1: Home View */}
        {currentView === 'home' && (
          <Hero
            onNavigate={(view) => setCurrentView(view)}
            onOpenDemo={handleOpenDemoModal}
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
          />
        )}

        {/* View 2: Upload View */}
        {currentView === 'upload' && (
          <UploadDropzone
            onFileSelect={handleFileAnalysis}
            onSelectDemo={handleSelectDemo}
            isProcessing={isProcessing}
          />
        )}

        {/* View 3: Processing Screen */}
        {currentView === 'processing' && (
          <ProcessingStatus
            currentStepIndex={processingStep}
            fileName={processingFileName}
          />
        )}

        {/* View 4: Results Dashboard */}
        {currentView === 'results' && prescription && (
          <ResultsDashboard
            prescription={prescription}
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
            onExplainMedicine={(med) => setActiveMedicineDetails(med)}
            onUploadNew={() => setCurrentView('upload')}
            onOpenDemoPicker={handleOpenDemoModal}
            onOpenMedicationLog={() => setCurrentView('medication-log')}
          />
        )}

        {/* View 5: Medication Log */}
        {currentView === 'medication-log' && (
          <MedicationLogView
            prescription={prescription}
            onOpenDemoPicker={handleOpenDemoModal}
            onUploadNew={() => setCurrentView('upload')}
            onViewPrescription={prescription ? () => setCurrentView('results') : undefined}
            currentLanguage={currentLanguage}
          />
        )}

        {/* View: How It Works */}
        {currentView === 'how-it-works' && (
          <HowItWorksView
            onNavigate={(view) => setCurrentView(view)}
            onOpenDemo={handleOpenDemoModal}
          />
        )}

        {/* View: About & Safety */}
        {currentView === 'about' && (
          <AboutView
            onNavigate={(view) => setCurrentView(view)}
            onOpenDemo={handleOpenDemoModal}
          />
        )}
      </main>

      {/* Medicine Details Deep Dive Modal */}
      {activeMedicineDetails && (
        <MedicineDetails
          medicine={activeMedicineDetails}
          initialLanguage={currentLanguage}
          onClose={() => setActiveMedicineDetails(null)}
        />
      )}

      {/* Demo Selector Modal */}
      <DemoPickerModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSelectDemo={handleSelectDemo}
      />

      {/* Universal Footer */}
      <Footer onNavigate={(view) => setCurrentView(view)} />
    </div>
  );
}
