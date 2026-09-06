import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  CheckCircle2,
  Circle,
  Clock,
  Bell,
  BellRing,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Sparkles,
  Pill,
  RotateCcw,
  Volume2,
  VolumeX,
  Sliders,
  X,
  Upload,
  Check,
  Info,
  PartyPopper,
} from 'lucide-react';
import {
  PrescriptionAnalysisResult,
  PrescribedMedicine,
  DoseLogItem,
  DoseSlot,
  ReminderConfig,
  SupportedLanguage,
} from '../types';
import {
  getTodayDateString,
  formatFriendlyDate,
  formatTime12h,
  getSlotLabel,
  getReminderConfig,
  saveReminderConfig,
  loadDailyDoseLog,
  toggleDoseTaken,
  logAsNeededDose,
  playGentleChime,
  playVictoryChime,
  requestNotificationPermission,
  sendMedicationNotification,
  getNotificationPermissionStatus,
  getPast7DaysAdherence,
  seedPastDaysDemoAdherence,
} from '../utils/medicationLogStorage';
import { ConfettiCelebration } from './ConfettiCelebration';
import { NotificationPromptBanner } from './NotificationPromptBanner';
import { AdherenceHistoryChart } from './AdherenceHistoryChart';
import {
  auth,
  saveDailyDosesToCloud,
  getCloudDailyDoses,
} from '../lib/firebase';

interface MedicationLogViewProps {
  prescription: PrescriptionAnalysisResult | null;
  onOpenDemoPicker: () => void;
  onUploadNew: () => void;
  onViewPrescription?: () => void;
  currentLanguage: SupportedLanguage;
}

export const MedicationLogView: React.FC<MedicationLogViewProps> = ({
  prescription,
  onOpenDemoPicker,
  onUploadNew,
  onViewPrescription,
  currentLanguage,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateString());
  const [doses, setDoses] = useState<DoseLogItem[]>([]);
  const [activeSlotFilter, setActiveSlotFilter] = useState<'all' | DoseSlot>('all');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [reminderConfig, setReminderConfig] = useState<ReminderConfig>(getReminderConfig());
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);
  const [selectedSosMedId, setSelectedSosMedId] = useState<string>('');
  const [sosNotes, setSosNotes] = useState<string>('');
  const [notificationTestMessage, setNotificationTestMessage] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [activeDueAlert, setActiveDueAlert] = useState<{
    slot: DoseSlot;
    timeStr: string;
    doses: DoseLogItem[];
  } | null>(null);

  // Periodic background check for scheduled dose times (runs every 15 seconds)
  useEffect(() => {
    if (!prescription || !reminderConfig.notificationsEnabled) return;

    const checkScheduledDoseAlerts = () => {
      const todayStr = getTodayDateString();
      const now = new Date();
      const currentHours = String(now.getHours()).padStart(2, '0');
      const currentMins = String(now.getMinutes()).padStart(2, '0');
      const currentTimeStr = `${currentHours}:${currentMins}`;

      const slotTimes: Record<DoseSlot, string> = {
        morning: reminderConfig.morningTime,
        afternoon: reminderConfig.afternoonTime,
        evening: reminderConfig.eveningTime,
        night: reminderConfig.nightTime,
        as_needed: '',
      };

      const scheduledSlots: DoseSlot[] = ['morning', 'afternoon', 'evening', 'night'];
      for (const slot of scheduledSlots) {
        const slotTime = slotTimes[slot];
        if (slotTime && currentTimeStr === slotTime) {
          const alertKey = `medora_alerted_${todayStr}_${slot}_${slotTime}`;
          if (!sessionStorage.getItem(alertKey)) {
            const todayItems = loadDailyDoseLog(prescription, todayStr);
            const untaken = todayItems.filter((d) => d.slot === slot && !d.taken);
            if (untaken.length > 0) {
              sessionStorage.setItem(alertKey, 'true');
              setActiveDueAlert({
                slot,
                timeStr: slotTime,
                doses: untaken,
              });

              const names = untaken.map((u) => `${u.medicineName} (${u.strength})`).join(', ');
              sendMedicationNotification(
                `🔔 Scheduled Dose Reminder: ${getSlotLabel(slot)}`,
                `Time to take: ${names}. Scheduled at ${formatTime12h(slotTime)}.`
              );

              if (reminderConfig.soundEnabled) {
                playGentleChime();
              }
            }
          }
        }
      }
    };

    checkScheduledDoseAlerts();
    const interval = setInterval(checkScheduledDoseAlerts, 15000);
    return () => clearInterval(interval);
  }, [prescription, reminderConfig]);

  // Load doses when prescription or selected date changes
  useEffect(() => {
    let isMounted = true;
    const loaded = loadDailyDoseLog(prescription, selectedDate);
    setDoses(loaded);

    // If user is authenticated in Firebase, attempt to load cloud doses
    if (auth.currentUser) {
      getCloudDailyDoses(auth.currentUser.uid, selectedDate)
        .then((cloudDoses) => {
          if (isMounted && cloudDoses && cloudDoses.length > 0) {
            setDoses(cloudDoses);
            // Also update localStorage cache
            localStorage.setItem(
              `medora_doses_${selectedDate}`,
              JSON.stringify(cloudDoses)
            );
          }
        })
        .catch((err) => console.error('Error fetching cloud doses:', err));
    }

    return () => {
      isMounted = false;
    };
  }, [prescription, selectedDate]);

  // Listen to cross-window or background updates
  useEffect(() => {
    const handleUpdate = (e: any) => {
      if (e.detail?.dateStr === selectedDate) {
        setDoses(e.detail.items);
      }
    };
    window.addEventListener('medora-dose-log-updated', handleUpdate);
    return () => window.removeEventListener('medora-dose-log-updated', handleUpdate);
  }, [selectedDate]);

  // Date stepper handlers
  const handlePrevDay = () => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    const prev = new Date(y, m - 1, d - 1);
    const yr = prev.getFullYear();
    const mo = String(prev.getMonth() + 1).padStart(2, '0');
    const dy = String(prev.getDate()).padStart(2, '0');
    setSelectedDate(`${yr}-${mo}-${dy}`);
  };

  const handleNextDay = () => {
    const [y, m, d] = selectedDate.split('-').map(Number);
    const next = new Date(y, m - 1, d + 1);
    const yr = next.getFullYear();
    const mo = String(next.getMonth() + 1).padStart(2, '0');
    const dy = String(next.getDate()).padStart(2, '0');
    setSelectedDate(`${yr}-${mo}-${dy}`);
  };

  const handleJumpToToday = () => {
    setSelectedDate(getTodayDateString());
  };

  // Toggle dose taken
  const handleToggle = (itemId: string) => {
    const { updatedItems, justMarkedTaken } = toggleDoseTaken(selectedDate, doses, itemId);
    setDoses(updatedItems);

    // Sync to Cloud Firestore if logged in
    if (auth.currentUser) {
      saveDailyDosesToCloud(auth.currentUser.uid, selectedDate, updatedItems).catch((err) =>
        console.error('Failed to sync dose toggle to Firebase:', err)
      );
    }

    // If user marked a dose taken and all scheduled doses for the day are now completed
    if (justMarkedTaken) {
      const scheduled = updatedItems.filter((d) => d.slot !== 'as_needed');
      const allScheduledCompleted =
        scheduled.length > 0 && scheduled.every((d) => d.taken);

      if (allScheduledCompleted) {
        setShowCelebration(true);
        playVictoryChime();
      }
    }
  };

  // SOS Dose logging
  const handleOpenSosModal = () => {
    if (!prescription || prescription.medicines.length === 0) return;
    // Default to first SOS-eligible medicine or first medicine
    const sosMed =
      prescription.medicines.find(
        (m) =>
          m.frequency.toLowerCase().includes('sos') ||
          m.instruction.toLowerCase().includes('as needed')
      ) || prescription.medicines[0];
    setSelectedSosMedId(sosMed.id);
    setSosNotes('');
    setIsSosModalOpen(true);
  };

  const handleConfirmSos = () => {
    if (!prescription) return;
    const med = prescription.medicines.find((m) => m.id === selectedSosMedId);
    if (!med) return;

    const updated = logAsNeededDose(selectedDate, doses, med, sosNotes);
    setDoses(updated);

    // Sync to Cloud Firestore if logged in
    if (auth.currentUser) {
      saveDailyDosesToCloud(auth.currentUser.uid, selectedDate, updated).catch((err) =>
        console.error('Failed to sync SOS dose to Firebase:', err)
      );
    }

    setIsSosModalOpen(false);
  };

  // Reminder settings save
  const handleSaveReminderSettings = (newConfig: ReminderConfig) => {
    setReminderConfig(newConfig);
    saveReminderConfig(newConfig);
    // Reload dose times for current day
    const reloaded = loadDailyDoseLog(prescription, selectedDate);
    setDoses(reloaded);
  };

  const handleTestAlert = async () => {
    playGentleChime();
    const hasPermission = await requestNotificationPermission();
    if (hasPermission) {
      sendMedicationNotification(
        'Medora Reminder Sync Test',
        'Your daily medication alerts are synced with your log.'
      );
      setNotificationTestMessage('Chime played and browser alert triggered!');
    } else {
      setNotificationTestMessage('Chime played! (Browser desktop notifications are blocked or unavailable)');
    }
    setTimeout(() => setNotificationTestMessage(null), 4000);
  };

  // Trigger simulated scheduled dose alert (for preview / testing)
  const handleTriggerSimulatedDoseAlert = () => {
    const untaken = doses.filter((d) => !d.taken);
    const alertDoses = untaken.length > 0 ? [untaken[0]] : doses.slice(0, 1);
    if (alertDoses.length > 0) {
      setActiveDueAlert({
        slot: alertDoses[0].slot,
        timeStr: reminderConfig.morningTime,
        doses: alertDoses,
      });
    }
    if (reminderConfig.soundEnabled) {
      playGentleChime();
    }
    const medName = alertDoses.length > 0 ? `${alertDoses[0].medicineName} (${alertDoses[0].strength})` : 'your medication';
    sendMedicationNotification(
      '💊 Scheduled Dose Alert',
      `Time for ${medName}. Please take as prescribed.`
    );
  };

  const handleMarkDueDoseTaken = (itemId: string) => {
    handleToggle(itemId);
    if (activeDueAlert) {
      const remaining = activeDueAlert.doses.filter((d) => d.id !== itemId);
      if (remaining.length === 0) {
        setActiveDueAlert(null);
      } else {
        setActiveDueAlert({ ...activeDueAlert, doses: remaining });
      }
    }
  };

  const handleMarkAllDueDosesTaken = () => {
    if (!activeDueAlert) return;
    activeDueAlert.doses.forEach((d) => {
      if (!d.taken) {
        handleToggle(d.id);
      }
    });
    setActiveDueAlert(null);
  };

  // Statistics calculation
  const stats = useMemo(() => {
    const scheduled = doses.filter((d) => d.slot !== 'as_needed');
    const scheduledTaken = scheduled.filter((d) => d.taken).length;
    const totalScheduled = scheduled.length;
    const percentage = totalScheduled > 0 ? Math.round((scheduledTaken / totalScheduled) * 100) : 0;
    const sosCount = doses.filter((d) => d.slot === 'as_needed').length;

    return {
      scheduledTaken,
      totalScheduled,
      percentage,
      sosCount,
      allCompleted: totalScheduled > 0 && scheduledTaken === totalScheduled,
    };
  }, [doses]);

  // Filter doses by slot
  const filteredDoses = useMemo(() => {
    if (activeSlotFilter === 'all') return doses;
    return doses.filter((d) => d.slot === activeSlotFilter);
  }, [doses, activeSlotFilter]);

  // Track 7-day adherence history
  const [historyKey, setHistoryKey] = useState(0);

  const past7DaysAdherence = useMemo(() => {
    return getPast7DaysAdherence(prescription);
  }, [prescription, doses, historyKey]);

  const handleSeedDemoHistory = () => {
    seedPastDaysDemoAdherence(prescription);
    setHistoryKey((prev) => prev + 1);
  };

  const isToday = selectedDate === getTodayDateString();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Top Breadcrumb / Return to Results */}
      <div className="flex items-center justify-between gap-4 pb-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Medora</span>
          <span>/</span>
          <span className="font-semibold text-slate-800">Medication Log</span>
        </div>

        {prescription && onViewPrescription && (
          <button
            type="button"
            onClick={onViewPrescription}
            className="text-xs font-semibold text-sky-700 hover:text-sky-900 underline cursor-pointer"
          >
            ← Back to Prescription Details
          </button>
        )}
      </div>

      {/* Main Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Medication Log
            </h1>
            <span
              id="log-sync-indicator"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200"
            >
              <BellRing className="w-3 h-3 text-emerald-600" />
              Synced with Reminders
            </span>
          </div>
          <p className="text-sm text-slate-600 mt-1">
            Check off your taken doses throughout the day to update your adherence and sync reminder alerts.
          </p>
        </div>

        {/* Sync Settings & Quick SOS Button */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            id="open-reminder-settings-btn"
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs cursor-pointer transition-colors"
          >
            <Sliders className="w-3.5 h-3.5 text-sky-600" />
            <span>Reminder Times</span>
          </button>

          {prescription && (
            <button
              id="log-as-needed-dose-btn"
              type="button"
              onClick={handleOpenSosModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 shadow-sm shadow-sky-700/20 cursor-pointer transition-all active:scale-98"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log As-Needed Dose</span>
            </button>
          )}
        </div>
      </div>

      {/* Empty State when no prescription is loaded */}
      {!prescription ? (
        <div className="mt-8 p-8 bg-white rounded-3xl border border-slate-200/90 shadow-sm text-center max-w-xl mx-auto space-y-5">
          <div className="w-14 h-14 bg-sky-50 text-sky-700 rounded-2xl flex items-center justify-center mx-auto">
            <Pill className="w-7 h-7 -rotate-45" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-900">
              No Active Prescription Loaded
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Upload your prescription or load an interactive demo case to automatically populate your daily dose schedule and reminder log.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={onOpenDemoPicker}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-300 cursor-pointer transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Load Demo Regimen</span>
            </button>
            <button
              type="button"
              onClick={onUploadNew}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 shadow-sm shadow-sky-700/20 cursor-pointer transition-all"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Prescription</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Active Due Dose Alert Banner (when scheduled dose time triggers or simulated) */}
          <AnimatePresence>
            {activeDueAlert && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-6 p-4 sm:p-5 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 rounded-3xl text-white shadow-lg shadow-orange-600/20 border border-amber-400 relative overflow-hidden"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-white text-amber-600 flex items-center justify-center shrink-0 shadow-sm">
                      <BellRing className="w-5 h-5 animate-bounce" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-white text-base">
                          Dose Scheduled Now ({formatTime12h(activeDueAlert.timeStr)})
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/25 text-white border border-white/30">
                          {getSlotLabel(activeDueAlert.slot)}
                        </span>
                      </div>
                      <p className="text-xs text-amber-100 mt-1 leading-relaxed">
                        Time to take:{' '}
                        <strong>
                          {activeDueAlert.doses
                            .map((d) => `${d.medicineName} ${d.strength} (${d.instruction || d.dosage})`)
                            .join(' • ')}
                        </strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
                    <button
                      type="button"
                      id="mark-due-doses-taken-btn"
                      onClick={handleMarkAllDueDosesTaken}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-amber-900 bg-white hover:bg-amber-50 shadow-md cursor-pointer transition-all active:scale-95"
                    >
                      <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                      <span>Mark All as Taken</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveDueAlert(null)}
                      className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 cursor-pointer transition-colors"
                      title="Dismiss Alert"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Optional Browser Notification Prompt Banner */}
          <div className="mt-6">
            <NotificationPromptBanner
              reminderConfig={reminderConfig}
              onUpdateReminderConfig={handleSaveReminderSettings}
              todayDoses={doses}
              onTriggerTestAlert={handleTriggerSimulatedDoseAlert}
            />
          </div>

          {/* 7-Day Historical Adherence Bar Chart */}
          <div className="mt-6">
            <AdherenceHistoryChart
              records={past7DaysAdherence}
              selectedDate={selectedDate}
              onSelectDate={(dateStr) => setSelectedDate(dateStr)}
              onSeedDemoHistory={handleSeedDemoHistory}
            />
          </div>

          {/* Date Navigator Bar */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                id="log-prev-day-btn"
                onClick={handlePrevDay}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer border border-slate-200 transition-colors"
                title="Previous Day"
                aria-label="Previous day"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
                <Calendar className="w-4 h-4 text-sky-700" />
                <span className="font-bold text-sm text-slate-900">
                  {formatFriendlyDate(selectedDate)}
                </span>
              </div>

              <button
                type="button"
                id="log-next-day-btn"
                onClick={handleNextDay}
                className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer border border-slate-200 transition-colors"
                title="Next Day"
                aria-label="Next day"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {!isToday && (
              <button
                type="button"
                id="jump-to-today-btn"
                onClick={handleJumpToToday}
                className="text-xs font-semibold text-sky-700 hover:text-sky-900 bg-sky-50 hover:bg-sky-100 px-3 py-1.5 rounded-lg border border-sky-200 cursor-pointer transition-colors"
              >
                Jump to Today
              </button>
            )}

            {/* Next Reminder Sync Status */}
            <div className="text-xs text-slate-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                Schedule synced with {prescription.medicines.length} prescribed medicines
              </span>
            </div>
          </div>

          {/* Adherence Progress Card */}
          <div className="mt-6 p-5 bg-gradient-to-r from-sky-50 via-white to-slate-50 rounded-2xl border border-sky-100 shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-sky-700 block">
                  Daily Dose Adherence
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-black text-slate-900">
                    {stats.scheduledTaken} of {stats.totalScheduled}
                  </span>
                  <span className="text-sm font-semibold text-slate-600">
                    scheduled doses taken ({stats.percentage}%)
                  </span>
                </div>
                {stats.sosCount > 0 && (
                  <span className="text-xs text-slate-500 mt-1 block">
                    + {stats.sosCount} as-needed (SOS) dose logged today
                  </span>
                )}
              </div>

              {/* Progress visual bar */}
              <div className="w-full md:w-64 space-y-1.5">
                <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      stats.percentage === 100 ? 'bg-emerald-500' : 'bg-sky-600'
                    }`}
                    style={{ width: `${stats.percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>0%</span>
                  <span>Target: 100% Adherence</span>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {stats.allCompleted && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  className="mt-4 p-3.5 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <svg
                        className="w-4 h-4 text-white stroke-current"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <motion.path
                          d="M5 13l4 4L19 7"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                        />
                      </svg>
                    </div>
                    <div>
                      <span className="font-bold text-emerald-950 block">
                        All Doses Completed ({stats.totalScheduled} of {stats.totalScheduled})
                      </span>
                      <span className="text-emerald-800">
                        100% daily adherence achieved for {isToday ? 'today' : formatFriendlyDate(selectedDate)}.
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    id="replay-celebration-btn"
                    onClick={() => {
                      setShowCelebration(true);
                      playVictoryChime();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-emerald-800 bg-white hover:bg-emerald-100 border border-emerald-300 shadow-xs cursor-pointer transition-all active:scale-95 shrink-0 self-start sm:self-auto"
                  >
                    <PartyPopper className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Replay Confetti 🎉</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Slot Filter Tabs */}
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs">
            <button
              type="button"
              onClick={() => setActiveSlotFilter('all')}
              className={`px-3.5 py-2 rounded-xl font-medium cursor-pointer transition-colors ${
                activeSlotFilter === 'all'
                  ? 'bg-sky-700 text-white font-semibold shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              All Doses ({doses.length})
            </button>

            {(['morning', 'afternoon', 'evening', 'night'] as DoseSlot[]).map((slot) => {
              const count = doses.filter((d) => d.slot === slot).length;
              if (count === 0) return null;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setActiveSlotFilter(slot)}
                  className={`px-3.5 py-2 rounded-xl font-medium cursor-pointer transition-colors ${
                    activeSlotFilter === slot
                      ? 'bg-sky-700 text-white font-semibold shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {getSlotLabel(slot)} ({count})
                </button>
              );
            })}

            {doses.some((d) => d.slot === 'as_needed') && (
              <button
                type="button"
                onClick={() => setActiveSlotFilter('as_needed')}
                className={`px-3.5 py-2 rounded-xl font-medium cursor-pointer transition-colors ${
                  activeSlotFilter === 'as_needed'
                    ? 'bg-amber-600 text-white font-semibold shadow-xs'
                    : 'bg-white text-amber-800 border border-amber-200 hover:bg-amber-50'
                }`}
              >
                As Needed / SOS ({doses.filter((d) => d.slot === 'as_needed').length})
              </button>
            )}
          </div>

          {/* Doses List */}
          <div className="mt-6 space-y-3.5">
            {filteredDoses.length === 0 ? (
              <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
                No doses scheduled for this slot filter.
              </div>
            ) : (
              filteredDoses.map((item) => {
                return (
                  <div
                    key={item.id}
                    id={`dose-item-${item.id}`}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      item.taken
                        ? 'bg-emerald-50/50 border-emerald-200 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                    }`}
                  >
                    {/* Left: Checkbox & Medicine Details */}
                    <div className="flex items-start gap-3.5 flex-1">
                      <button
                        type="button"
                        id={`toggle-dose-${item.id}`}
                        onClick={() => handleToggle(item.id)}
                        className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 cursor-pointer transition-transform active:scale-90 ${
                          item.taken
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'border-2 border-slate-300 hover:border-sky-500 text-transparent'
                        }`}
                        title={item.taken ? 'Mark as not taken' : 'Check off as taken'}
                        aria-label={item.taken ? 'Mark as not taken' : 'Check off as taken'}
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                      </button>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3
                            className={`font-bold text-sm sm:text-base ${
                              item.taken ? 'text-slate-700 line-through' : 'text-slate-900'
                            }`}
                          >
                            {item.medicineName}
                          </h3>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                            {item.strength}
                          </span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-sky-50 text-sky-800 border border-sky-100">
                            {item.dosage}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.instruction}
                        </p>

                        {item.timing && (
                          <span className="inline-block text-[11px] font-medium text-slate-500">
                            Timing: {item.timing}
                          </span>
                        )}

                        {item.notes && (
                          <div className="text-[11px] text-slate-500 italic bg-white/80 px-2 py-1 rounded border border-slate-200 inline-block mt-1">
                            Note: {item.notes}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Right: Slot badge, Time, and Status action */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {getSlotLabel(item.slot)}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.scheduledTime}</span>
                        </span>
                      </div>

                      {item.taken ? (
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-lg border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Taken at {item.takenAt}</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleToggle(item.id)}
                          className="px-3 py-1 rounded-lg text-xs font-semibold text-sky-700 hover:text-white bg-sky-50 hover:bg-sky-700 border border-sky-200 cursor-pointer transition-colors"
                        >
                          Mark as Taken
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}

      {/* SOS / As-Needed Dose Modal */}
      {isSosModalOpen && prescription && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">
                  Log As-Needed (SOS) Dose
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSosModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Record an unscheduled or symptom-triggered dose (e.g. fever or pain relief) taken right now.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Medicine
                </label>
                <select
                  value={selectedSosMedId}
                  onChange={(e) => setSelectedSosMedId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                >
                  {prescription.medicines.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.strength}) - {m.dosage}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Reason / Symptoms Note (Optional)
                </label>
                <input
                  type="text"
                  value={sosNotes}
                  onChange={(e) => setSosNotes(e.target.value)}
                  placeholder="e.g. Temperature reached 100.4°F, mild headache"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsSosModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSos}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 cursor-pointer shadow-xs"
              >
                Confirm Taken Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reminder Configuration & Sync Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Reminder System Settings
                  </h3>
                  <span className="text-[11px] text-slate-500 block">
                    Configure daily alarm slots synced with your medication log
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {notificationTestMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{notificationTestMessage}</span>
              </div>
            )}

            {/* Time Slots Grid */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Daily Dose Scheduled Times
              </label>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-700 block">Morning Slot</span>
                  <input
                    type="time"
                    value={reminderConfig.morningTime}
                    onChange={(e) =>
                      handleSaveReminderSettings({
                        ...reminderConfig,
                        morningTime: e.target.value,
                      })
                    }
                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400 block">
                    {formatTime12h(reminderConfig.morningTime)}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-700 block">Afternoon Slot</span>
                  <input
                    type="time"
                    value={reminderConfig.afternoonTime}
                    onChange={(e) =>
                      handleSaveReminderSettings({
                        ...reminderConfig,
                        afternoonTime: e.target.value,
                      })
                    }
                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400 block">
                    {formatTime12h(reminderConfig.afternoonTime)}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-700 block">Evening Slot</span>
                  <input
                    type="time"
                    value={reminderConfig.eveningTime}
                    onChange={(e) =>
                      handleSaveReminderSettings({
                        ...reminderConfig,
                        eveningTime: e.target.value,
                      })
                    }
                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400 block">
                    {formatTime12h(reminderConfig.eveningTime)}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-700 block">Night / Bedtime</span>
                  <input
                    type="time"
                    value={reminderConfig.nightTime}
                    onChange={(e) =>
                      handleSaveReminderSettings({
                        ...reminderConfig,
                        nightTime: e.target.value,
                      })
                    }
                    className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800"
                  />
                  <span className="text-[10px] text-slate-400 block">
                    {formatTime12h(reminderConfig.nightTime)}
                  </span>
                </div>
              </div>
            </div>

            {/* Audio & Alert Preferences */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Alert & Notification Preferences
              </label>

              {/* Sound Chime Toggle */}
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <Volume2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <div>
                    <span className="font-bold text-xs text-slate-800 block">
                      Sound Chime
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Play confirmation and reminder bell chime
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={reminderConfig.soundEnabled}
                  onChange={(e) =>
                    handleSaveReminderSettings({
                      ...reminderConfig,
                      soundEnabled: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
              </div>

              {/* Browser Scheduled Notifications Toggle */}
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2.5">
                  <Bell className="w-4 h-4 text-sky-600 shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-800">
                        Browser Dose Alerts
                      </span>
                      {getNotificationPermissionStatus() === 'granted' && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">
                          Allowed
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500 block">
                      Notify me at scheduled dose times via browser notifications
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={reminderConfig.notificationsEnabled}
                  onChange={async (e) => {
                    const checked = e.target.checked;
                    if (checked) {
                      const granted = await requestNotificationPermission();
                      handleSaveReminderSettings({
                        ...reminderConfig,
                        notificationsEnabled: granted,
                      });
                      if (granted) {
                        playGentleChime();
                        sendMedicationNotification(
                          '🔔 Medication Alerts Enabled',
                          'You will receive reminders at your scheduled dose times.'
                        );
                        setNotificationTestMessage('Browser notifications enabled and confirmed.');
                      } else {
                        setNotificationTestMessage('Please permit notifications in browser settings to enable.');
                      }
                      setTimeout(() => setNotificationTestMessage(null), 3500);
                    } else {
                      handleSaveReminderSettings({
                        ...reminderConfig,
                        notificationsEnabled: false,
                      });
                    }
                  }}
                  className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Test alert button */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="test-alert-sound-btn"
                  onClick={handleTestAlert}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5 text-sky-600" />
                  <span>Test Notification</span>
                </button>
                <button
                  type="button"
                  id="simulate-due-dose-btn"
                  onClick={() => {
                    handleTriggerSimulatedDoseAlert();
                    setIsSettingsOpen(false);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 cursor-pointer"
                >
                  <Clock className="w-3.5 h-3.5 text-sky-600" />
                  <span>Simulate Due Alert</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confetti & Checkmark Transition Celebration Modal */}
      <ConfettiCelebration
        show={showCelebration}
        onClose={() => setShowCelebration(false)}
        totalDoses={stats.totalScheduled}
        dateLabel={isToday ? 'Today' : formatFriendlyDate(selectedDate)}
      />
    </div>
  );
};
