import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

// Users table (keyed on Firebase Auth uid)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  displayName: text('display_name'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Prescriptions table
export const prescriptions = pgTable('prescriptions', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .references(() => users.uid, { onDelete: 'cascade' })
    .notNull(),
  patientName: text('patient_name'),
  doctorName: text('doctor_name'),
  clinicName: text('clinic_name'),
  prescriptionDate: text('prescription_date'),
  diagnosis: text('diagnosis'),
  rawAnalysisJson: text('raw_analysis_json').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Daily Dose Logs table
export const doseLogs = pgTable('dose_logs', {
  id: serial('id').primaryKey(),
  userId: text('user_id')
    .references(() => users.uid, { onDelete: 'cascade' })
    .notNull(),
  date: text('date').notNull(), // Format: YYYY-MM-DD
  dosesJson: text('doses_json').notNull(),
  scheduledCount: integer('scheduled_count').default(0),
  takenCount: integer('taken_count').default(0),
  adherenceRate: integer('adherence_rate').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Relations for Users
export const usersRelations = relations(users, ({ many }) => ({
  prescriptions: many(prescriptions),
  doseLogs: many(doseLogs),
}));

// Relations for Prescriptions
export const prescriptionsRelations = relations(prescriptions, ({ one }) => ({
  user: one(users, {
    fields: [prescriptions.userId],
    references: [users.uid],
  }),
}));

// Relations for Dose Logs
export const doseLogsRelations = relations(doseLogs, ({ one }) => ({
  user: one(users, {
    fields: [doseLogs.userId],
    references: [users.uid],
  }),
}));
