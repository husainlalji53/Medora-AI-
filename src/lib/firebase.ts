import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User as FirebaseUser,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDocFromServer,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import {
  PrescriptionAnalysisResult,
  DoseLogItem,
  ReminderConfig,
} from '../types';

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// CRITICAL: The app will break without specifying firestoreDatabaseId
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection on boot
export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is currently offline or unreachable.');
    }
    return false;
  }
}

// Call test connection immediately
testConnection();

// Sign in with Google Popup
export async function signInWithGoogle(): Promise<FirebaseUser | null> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Sync or update user document in Firestore
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      try {
        await setDoc(
          userRef,
          {
            id: user.uid,
            email: user.email || '',
            displayName: user.displayName || 'Patient',
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
      }
    }
    return user;
  } catch (error) {
    console.error('Failed to sign in with Google:', error);
    throw error;
  }
}

// Sign out
export async function signOutPatient(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Failed to sign out:', error);
    throw error;
  }
}

// Sync Prescription to Cloud Firestore
export async function savePrescriptionToCloud(
  userId: string,
  prescription: PrescriptionAnalysisResult
): Promise<void> {
  const path = `users/${userId}/prescriptions/${prescription.id}`;
  try {
    const presDocRef = doc(db, 'users', userId, 'prescriptions', prescription.id);
    await setDoc(
      presDocRef,
      {
        ...prescription,
        userId,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Fetch all Prescriptions for User from Cloud Firestore
export async function getCloudPrescriptions(
  userId: string
): Promise<PrescriptionAnalysisResult[]> {
  const path = `users/${userId}/prescriptions`;
  try {
    const colRef = collection(db, 'users', userId, 'prescriptions');
    const snapshot = await getDocs(colRef);
    const results: PrescriptionAnalysisResult[] = [];
    snapshot.forEach((docSnap) => {
      results.push(docSnap.data() as PrescriptionAnalysisResult);
    });
    return results;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

// Delete Prescription from Cloud
export async function deleteCloudPrescription(
  userId: string,
  prescriptionId: string
): Promise<void> {
  const path = `users/${userId}/prescriptions/${prescriptionId}`;
  try {
    const presDocRef = doc(db, 'users', userId, 'prescriptions', prescriptionId);
    await deleteDoc(presDocRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// Sync Daily Dose Log to Cloud
export async function saveDailyDosesToCloud(
  userId: string,
  date: string,
  doses: DoseLogItem[]
): Promise<void> {
  const path = `users/${userId}/dailyDoseLogs/${date}`;
  try {
    const logDocRef = doc(db, 'users', userId, 'dailyDoseLogs', date);
    await setDoc(
      logDocRef,
      {
        id: date,
        userId,
        date,
        doses,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Fetch Daily Dose Log from Cloud
export async function getCloudDailyDoses(
  userId: string,
  date: string
): Promise<DoseLogItem[] | null> {
  const path = `users/${userId}/dailyDoseLogs/${date}`;
  try {
    const logDocRef = doc(db, 'users', userId, 'dailyDoseLogs', date);
    const snap = await getDoc(logDocRef);
    if (snap.exists()) {
      const data = snap.data();
      return (data.doses as DoseLogItem[]) || [];
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}
