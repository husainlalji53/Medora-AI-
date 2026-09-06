export type SupportedLanguage =
  | 'en'
  | 'hi'
  | 'mr'
  | 'es'
  | 'fr'
  | 'de'
  | 'ar'
  | 'bn'
  | 'ta'
  | 'te'
  | 'gu';

export interface MedicineExplanationLanguage {
  whatIsIt: string;
  howToTake: string;
  importantInfo: string;
  summaryAudioText: string;
}

export interface TrustedMedicineInfo {
  genericName: string;
  brandAliases: string[];
  drugClass: string;
  primaryUse: string;
  commonSideEffects: string[];
  precautions: string[];
  dietaryAdvice: string;
  verificationSource: string;
  isVerified: boolean;
}

export interface PrescribedMedicine {
  id: string;
  name: string;
  strength: string;
  dosage: string;
  frequency: string;
  duration: string;
  instruction: string;
  timing?: string; // e.g. "After food", "Before meals"
  dosageForm?: string; // "Tablet", "Capsule", "Syrup", "Drops", "Inhaler"
  verified: boolean;
  trustedInfo?: TrustedMedicineInfo;
  patientExplanation: {
    en: MedicineExplanationLanguage;
    [key: string]: MedicineExplanationLanguage;
  };
  warning?: string;
}

export interface PrescriptionAnalysisResult {
  id: string;
  patientName?: string;
  doctorOrClinic?: string;
  date?: string;
  rawMedicinesCount: number;
  medicines: PrescribedMedicine[];
  generalAdvice?: {
    en: string;
    [key: string]: string | undefined;
  };
  confidenceNotes?: string;
  isDemo?: boolean;
  unverifiedCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export type AppView = 'home' | 'upload' | 'processing' | 'results' | 'details' | 'how-it-works' | 'about' | 'medication-log';

export type DoseSlot = 'morning' | 'afternoon' | 'evening' | 'night' | 'as_needed';

export interface DoseLogItem {
  id: string; // unique per medicine, slot, and date
  medicineId: string;
  medicineName: string;
  strength: string;
  dosage: string;
  dosageForm?: string;
  slot: DoseSlot;
  scheduledTime: string; // e.g. "08:00 AM"
  instruction: string;
  timing?: string;
  taken: boolean;
  takenAt?: string; // formatted e.g. "08:14 AM"
  notes?: string;
}

export interface ReminderConfig {
  morningTime: string; // e.g. "08:00"
  afternoonTime: string; // e.g. "13:00"
  eveningTime: string; // e.g. "18:30"
  nightTime: string; // e.g. "21:30"
  soundEnabled: boolean;
  notificationsEnabled: boolean;
}

export interface ProcessingStep {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'completed';
}
