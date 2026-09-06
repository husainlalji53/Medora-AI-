import { db } from './index.ts';
import { users, prescriptions, doseLogs } from './schema.ts';
import { eq, and, desc } from 'drizzle-orm';

export async function getOrCreateUser(uid: string, email: string, displayName?: string) {
  try {
    const result = await db
      .insert(users)
      .values({
        uid,
        email,
        displayName: displayName || null,
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          displayName: displayName || null,
          updatedAt: new Date(),
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Database getOrCreateUser failed:', error);
    throw new Error('Database user operation failed.', { cause: error });
  }
}

export async function savePrescriptionRecord(
  userId: string,
  prescriptionData: {
    id: string;
    patientName?: string;
    doctorName?: string;
    clinicName?: string;
    prescriptionDate?: string;
    diagnosis?: string;
    rawAnalysisJson: string;
  }
) {
  try {
    const result = await db
      .insert(prescriptions)
      .values({
        id: prescriptionData.id,
        userId,
        patientName: prescriptionData.patientName || null,
        doctorName: prescriptionData.doctorName || null,
        clinicName: prescriptionData.clinicName || null,
        prescriptionDate: prescriptionData.prescriptionDate || null,
        diagnosis: prescriptionData.diagnosis || null,
        rawAnalysisJson: prescriptionData.rawAnalysisJson,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: prescriptions.id,
        set: {
          patientName: prescriptionData.patientName || null,
          doctorName: prescriptionData.doctorName || null,
          clinicName: prescriptionData.clinicName || null,
          prescriptionDate: prescriptionData.prescriptionDate || null,
          diagnosis: prescriptionData.diagnosis || null,
          rawAnalysisJson: prescriptionData.rawAnalysisJson,
          updatedAt: new Date(),
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Database savePrescriptionRecord failed:', error);
    throw new Error('Database prescription save failed.', { cause: error });
  }
}

export async function getUserPrescriptions(userId: string) {
  try {
    return await db
      .select()
      .from(prescriptions)
      .where(eq(prescriptions.userId, userId))
      .orderBy(desc(prescriptions.createdAt));
  } catch (error) {
    console.error('Database getUserPrescriptions failed:', error);
    throw new Error('Database prescription retrieval failed.', { cause: error });
  }
}

export async function saveDoseLogRecord(
  userId: string,
  date: string,
  dosesJson: string,
  scheduledCount: number,
  takenCount: number,
  adherenceRate: number
) {
  try {
    const result = await db
      .insert(doseLogs)
      .values({
        userId,
        date,
        dosesJson,
        scheduledCount,
        takenCount,
        adherenceRate,
        updatedAt: new Date(),
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Database saveDoseLogRecord failed:', error);
    throw new Error('Database dose log save failed.', { cause: error });
  }
}

export async function getUserDoseLogs(userId: string) {
  try {
    return await db
      .select()
      .from(doseLogs)
      .where(eq(doseLogs.userId, userId))
      .orderBy(desc(doseLogs.date));
  } catch (error) {
    console.error('Database getUserDoseLogs failed:', error);
    throw new Error('Database dose log retrieval failed.', { cause: error });
  }
}
