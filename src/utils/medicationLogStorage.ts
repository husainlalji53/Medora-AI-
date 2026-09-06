import {
  PrescriptionAnalysisResult,
  PrescribedMedicine,
  DoseLogItem,
  DoseSlot,
  ReminderConfig,
} from '../types';

export const DEFAULT_REMINDER_CONFIG: ReminderConfig = {
  morningTime: '08:00',
  afternoonTime: '13:00',
  eveningTime: '18:30',
  nightTime: '21:30',
  soundEnabled: true,
  notificationsEnabled: false,
};

const REMINDER_SETTINGS_KEY = 'medora_reminder_settings';
const DOSE_LOG_STORAGE_PREFIX = 'medora_dose_log_';

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatFriendlyDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const todayStr = getTodayDateString();

  const isToday = dateStr === todayStr;
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
  const formatted = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return isToday ? `Today (${weekday}, ${formatted})` : `${weekday}, ${formatted}`;
}

export function formatTime12h(time24: string): string {
  if (!time24) return '';
  const [hoursStr, minsStr] = time24.split(':');
  let hours = parseInt(hoursStr, 10);
  const mins = minsStr || '00';
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${mins} ${ampm}`;
}

export function getSlotLabel(slot: DoseSlot): string {
  switch (slot) {
    case 'morning':
      return 'Morning';
    case 'afternoon':
      return 'Afternoon';
    case 'evening':
      return 'Evening';
    case 'night':
      return 'Night';
    case 'as_needed':
      return 'As Needed (SOS)';
    default:
      return slot;
  }
}

export function getReminderConfig(): ReminderConfig {
  if (typeof window === 'undefined') return DEFAULT_REMINDER_CONFIG;
  try {
    const raw = localStorage.getItem(REMINDER_SETTINGS_KEY);
    if (!raw) return DEFAULT_REMINDER_CONFIG;
    return { ...DEFAULT_REMINDER_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_REMINDER_CONFIG;
  }
}

export function saveReminderConfig(config: ReminderConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(REMINDER_SETTINGS_KEY, JSON.stringify(config));
    window.dispatchEvent(new CustomEvent('medora-reminders-updated', { detail: config }));
  } catch (e) {
    console.error('Failed to save reminder config', e);
  }
}

// Derive slots for a medicine based on dosage frequency and instructions
export function inferSlotsForMedicine(medicine: PrescribedMedicine): DoseSlot[] {
  const text = `${medicine.frequency} ${medicine.instruction} ${medicine.timing || ''}`.toLowerCase();

  // As needed / SOS
  if (
    text.includes('sos') ||
    text.includes('as needed') ||
    text.includes('when required') ||
    text.includes('if required') ||
    text.includes('as required')
  ) {
    return ['as_needed'];
  }

  // Four times
  if (
    text.includes('four times') ||
    text.includes('4 times') ||
    text.includes('qid') ||
    text.includes('qds')
  ) {
    return ['morning', 'afternoon', 'evening', 'night'];
  }

  // Three times
  if (
    text.includes('three times') ||
    text.includes('3 times') ||
    text.includes('thrice') ||
    text.includes('tid') ||
    text.includes('tds')
  ) {
    return ['morning', 'afternoon', 'night'];
  }

  // Twice daily
  if (
    text.includes('twice') ||
    text.includes('2 times') ||
    text.includes('bid') ||
    text.includes('bd') ||
    (text.includes('morning') && text.includes('night'))
  ) {
    return ['morning', 'night'];
  }

  // Bedtime / night only
  if (
    text.includes('bedtime') ||
    text.includes('at night') ||
    text.includes('after dinner') ||
    text.includes('hs')
  ) {
    return ['night'];
  }

  // Afternoon / lunch only
  if (text.includes('lunch') || text.includes('afternoon')) {
    return ['afternoon'];
  }

  // Morning only or default
  return ['morning'];
}

export function getScheduledTimeForSlot(slot: DoseSlot, config: ReminderConfig): string {
  switch (slot) {
    case 'morning':
      return formatTime12h(config.morningTime);
    case 'afternoon':
      return formatTime12h(config.afternoonTime);
    case 'evening':
      return formatTime12h(config.eveningTime);
    case 'night':
      return formatTime12h(config.nightTime);
    case 'as_needed':
      return 'Anytime';
    default:
      return 'Scheduled';
  }
}

// Generate base scheduled items from a prescription
export function generatePrescriptionDoseItems(
  prescription: PrescriptionAnalysisResult,
  dateStr: string,
  config: ReminderConfig
): DoseLogItem[] {
  const items: DoseLogItem[] = [];

  for (const med of prescription.medicines) {
    const slots = inferSlotsForMedicine(med);

    for (const slot of slots) {
      const scheduledTime = getScheduledTimeForSlot(slot, config);
      items.push({
        id: `${med.id}_${slot}_${dateStr}`,
        medicineId: med.id,
        medicineName: med.name,
        strength: med.strength,
        dosage: med.dosage,
        dosageForm: med.dosageForm || 'Tablet',
        slot,
        scheduledTime,
        instruction: med.instruction,
        timing: med.timing,
        taken: false,
      });
    }
  }

  return items;
}

// Load daily dose log, merging persisted records with generated prescription slots
export function loadDailyDoseLog(
  prescription: PrescriptionAnalysisResult | null,
  dateStr: string
): DoseLogItem[] {
  if (typeof window === 'undefined') return [];

  const config = getReminderConfig();
  const storageKey = `${DOSE_LOG_STORAGE_PREFIX}${dateStr}`;
  let savedItems: DoseLogItem[] = [];

  try {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      savedItems = JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to parse saved dose log', e);
  }

  if (!prescription) {
    return savedItems;
  }

  // Generate canonical items for current prescription
  const canonicalItems = generatePrescriptionDoseItems(prescription, dateStr, config);
  const savedMap = new Map<string, DoseLogItem>();
  for (const s of savedItems) {
    savedMap.set(s.id, s);
  }

  // Merge: keep taken status & custom details from storage
  const merged: DoseLogItem[] = canonicalItems.map((c) => {
    const existing = savedMap.get(c.id);
    if (existing) {
      return {
        ...c,
        taken: existing.taken,
        takenAt: existing.takenAt,
        notes: existing.notes,
        scheduledTime: c.scheduledTime, // always use updated config
      };
    }
    return c;
  });

  // Also retain any extra custom/SOS logged doses that were manually added
  for (const s of savedItems) {
    if (s.slot === 'as_needed' && !merged.some((m) => m.id === s.id)) {
      merged.push(s);
    }
  }

  return merged;
}

export function saveDailyDoseLog(dateStr: string, items: DoseLogItem[]): void {
  if (typeof window === 'undefined') return;
  const storageKey = `${DOSE_LOG_STORAGE_PREFIX}${dateStr}`;
  try {
    localStorage.setItem(storageKey, JSON.stringify(items));
    window.dispatchEvent(
      new CustomEvent('medora-dose-log-updated', {
        detail: { dateStr, items },
      })
    );
  } catch (e) {
    console.error('Failed to save dose log', e);
  }
}

// Check or uncheck a dose
export function toggleDoseTaken(
  dateStr: string,
  items: DoseLogItem[],
  itemId: string
): { updatedItems: DoseLogItem[]; justMarkedTaken: boolean } {
  let justMarkedTaken = false;
  const now = new Date();
  const timeFormatted = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const updatedItems = items.map((item) => {
    if (item.id === itemId) {
      const nextTaken = !item.taken;
      justMarkedTaken = nextTaken;
      return {
        ...item,
        taken: nextTaken,
        takenAt: nextTaken ? timeFormatted : undefined,
      };
    }
    return item;
  });

  saveDailyDoseLog(dateStr, updatedItems);

  if (justMarkedTaken) {
    playGentleChime();
  }

  return { updatedItems, justMarkedTaken };
}

// Add an SOS dose entry
export function logAsNeededDose(
  dateStr: string,
  items: DoseLogItem[],
  medicine: PrescribedMedicine,
  notes?: string
): DoseLogItem[] {
  const now = new Date();
  const timeFormatted = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const newDose: DoseLogItem = {
    id: `sos_${medicine.id}_${Date.now()}`,
    medicineId: medicine.id,
    medicineName: medicine.name,
    strength: medicine.strength,
    dosage: medicine.dosage,
    dosageForm: medicine.dosageForm || 'Tablet',
    slot: 'as_needed',
    scheduledTime: 'SOS / As Needed',
    instruction: medicine.instruction,
    timing: medicine.timing,
    taken: true,
    takenAt: timeFormatted,
    notes: notes || 'Taken as needed for symptoms',
  };

  const updated = [...items, newDose];
  saveDailyDoseLog(dateStr, updated);
  playGentleChime();
  return updated;
}

// Pleasant chime synthesizer using Web Audio API
export function playGentleChime(): void {
  try {
    const config = getReminderConfig();
    if (!config.soundEnabled) return;

    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Two-tone bell harmonic
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(659.25, now); // E5
    osc1.frequency.exponentialRampToValueAtTime(1046.5, now + 0.15); // C6
    gain1.gain.setValueAtTime(0.2, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1318.5, now + 0.1); // E6
    gain2.gain.setValueAtTime(0.15, now + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.5);
    osc2.start(now + 0.1);
    osc2.stop(now + 0.6);
  } catch (e) {
    // Audio contexts might be constrained by autoplay policies; fail silently
    console.debug('Audio chime skipped', e);
  }
}

// Victory celebration chime sequence (C5 -> E5 -> G5 -> C6)
export function playVictoryChime(): void {
  try {
    const config = getReminderConfig();
    if (!config.soundEnabled) return;

    const AudioContextClass =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const startTime = now + idx * 0.12;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.18, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.65);
    });
  } catch (e) {
    console.debug('Victory chime skipped', e);
  }
}

// Request and trigger browser notification
export type BrowserNotificationStatus = 'granted' | 'denied' | 'default' | 'unsupported';

export function getNotificationPermissionStatus(): BrowserNotificationStatus {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    return 'unsupported';
  }
  return Notification.permission as BrowserNotificationStatus;
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (typeof window === 'undefined' || !('Notification' in window)) return false;
  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch {
    return false;
  }
}

export function sendMedicationNotification(
  title: string,
  body: string,
  tag?: string
): Notification | null {
  if (typeof window === 'undefined' || !('Notification' in window)) return null;
  if (Notification.permission === 'granted') {
    try {
      const n = new Notification(title, {
        body,
        tag: tag || 'medora-dose-alert',
        icon: '/favicon.ico',
        badge: '/favicon.ico',
      });
      n.onclick = () => {
        try {
          window.focus();
        } catch {
          // ignore
        }
      };
      return n;
    } catch {
      return null;
    }
  }
  return null;
}

const PROMPT_DISMISSED_KEY = 'medora_notification_prompt_dismissed';

export function isNotificationPromptDismissed(): boolean {
  try {
    return localStorage.getItem(PROMPT_DISMISSED_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setNotificationPromptDismissed(dismissed: boolean): void {
  try {
    localStorage.setItem(PROMPT_DISMISSED_KEY, dismissed ? 'true' : 'false');
  } catch {
    // ignore
  }
}

// Check which slot matches the current time (within current minute)
export function getSlotForTime(timeStr: string, config: ReminderConfig): DoseSlot | null {
  if (timeStr === config.morningTime) return 'morning';
  if (timeStr === config.afternoonTime) return 'afternoon';
  if (timeStr === config.eveningTime) return 'evening';
  if (timeStr === config.nightTime) return 'night';
  return null;
}

export interface DayAdherenceRecord {
  date: string; // YYYY-MM-DD
  dayLabel: string; // "Mon", "Today", etc.
  formattedDate: string; // "Sep 6"
  isToday: boolean;
  totalScheduled: number;
  scheduledTaken: number;
  adherencePercentage: number;
  sosCount: number;
}

// Compute 7-day adherence history from persisted records and active prescription
export function getPast7DaysAdherence(
  prescription: PrescriptionAnalysisResult | null
): DayAdherenceRecord[] {
  const records: DayAdherenceRecord[] = [];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const yr = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, '0');
    const dy = String(d.getDate()).padStart(2, '0');
    const dateStr = `${yr}-${mo}-${dy}`;

    const items = loadDailyDoseLog(prescription, dateStr);
    const scheduled = items.filter((item) => item.slot !== 'as_needed');
    const taken = scheduled.filter((item) => item.taken).length;
    const totalScheduled = scheduled.length;
    const adherencePercentage =
      totalScheduled > 0 ? Math.round((taken / totalScheduled) * 100) : 0;
    const sosCount = items.filter((item) => item.slot === 'as_needed').length;

    const dayLabel =
      i === 0
        ? 'Today'
        : i === 1
        ? 'Yest'
        : d.toLocaleDateString('en-US', { weekday: 'short' });

    const formattedDate = d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    records.push({
      date: dateStr,
      dayLabel,
      formattedDate,
      isToday: i === 0,
      totalScheduled,
      scheduledTaken: taken,
      adherencePercentage,
      sosCount,
    });
  }

  return records;
}

// Seed sample past days history so the user can immediately evaluate the 7-day trend
export function seedPastDaysDemoAdherence(
  prescription: PrescriptionAnalysisResult | null
): void {
  if (!prescription) return;
  const today = new Date();
  const sampleRates = [1.0, 0.67, 1.0, 1.0, 0.75, 1.0]; // Rates for days -6 to -1

  for (let i = 6; i >= 1; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const yr = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, '0');
    const dy = String(d.getDate()).padStart(2, '0');
    const dateStr = `${yr}-${mo}-${dy}`;

    const items = loadDailyDoseLog(prescription, dateStr);
    const rate = sampleRates[6 - i] ?? 1.0;

    const scheduled = items.filter((item) => item.slot !== 'as_needed');
    const targetTakenCount = Math.max(1, Math.round(scheduled.length * rate));

    let count = 0;
    const updated = items.map((item) => {
      if (item.slot !== 'as_needed') {
        if (count < targetTakenCount) {
          count++;
          return {
            ...item,
            taken: true,
            takenAt: `${item.scheduledTime || '09:00'} AM`,
          };
        }
        return { ...item, taken: false, takenAt: undefined };
      }
      return item;
    });

    saveDailyDoseLog(dateStr, updated);
  }
}

