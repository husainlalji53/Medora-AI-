import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  BellRing,
  BellOff,
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles,
  Clock,
  Volume2,
  Info,
} from 'lucide-react';
import {
  BrowserNotificationStatus,
  getNotificationPermissionStatus,
  requestNotificationPermission,
  sendMedicationNotification,
  playGentleChime,
  formatTime12h,
  isNotificationPromptDismissed,
  setNotificationPromptDismissed,
} from '../utils/medicationLogStorage';
import { DoseLogItem, ReminderConfig } from '../types';

interface NotificationPromptBannerProps {
  reminderConfig: ReminderConfig;
  onUpdateReminderConfig: (updated: ReminderConfig) => void;
  todayDoses: DoseLogItem[];
  onTriggerTestAlert?: () => void;
}

export const NotificationPromptBanner: React.FC<NotificationPromptBannerProps> = ({
  reminderConfig,
  onUpdateReminderConfig,
  todayDoses,
  onTriggerTestAlert,
}) => {
  const [permissionStatus, setPermissionStatus] = useState<BrowserNotificationStatus>('default');
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  // Initial load of permission state and dismissed preference
  useEffect(() => {
    setPermissionStatus(getNotificationPermissionStatus());
    setIsDismissed(isNotificationPromptDismissed());
  }, []);

  // Update permission status on window focus (in case user changed it in browser settings)
  useEffect(() => {
    const handleFocus = () => {
      setPermissionStatus(getNotificationPermissionStatus());
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Calculate next scheduled time today
  const nextScheduledSlot = React.useMemo(() => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const slots: Array<{ name: string; timeStr: string; slotKey: string }> = [
      { name: 'Morning', timeStr: reminderConfig.morningTime, slotKey: 'morning' },
      { name: 'Afternoon', timeStr: reminderConfig.afternoonTime, slotKey: 'afternoon' },
      { name: 'Evening', timeStr: reminderConfig.eveningTime, slotKey: 'evening' },
      { name: 'Night', timeStr: reminderConfig.nightTime, slotKey: 'night' },
    ];

    for (const slot of slots) {
      const [h, m] = slot.timeStr.split(':').map(Number);
      const slotMinutes = h * 60 + m;
      if (slotMinutes > currentMinutes) {
        // Count untaken medicines in this slot today
        const pendingCount = todayDoses.filter(
          (d) => d.slot === slot.slotKey && !d.taken
        ).length;
        return {
          name: slot.name,
          time12h: formatTime12h(slot.timeStr),
          pendingCount,
        };
      }
    }

    // Otherwise next is tomorrow's morning slot
    const morningPending = todayDoses.filter(
      (d) => d.slot === 'morning' && !d.taken
    ).length;
    return {
      name: 'Tomorrow Morning',
      time12h: formatTime12h(reminderConfig.morningTime),
      pendingCount: morningPending,
    };
  }, [reminderConfig, todayDoses]);

  // Request browser permission
  const handleEnableNotifications = async () => {
    setIsRequesting(true);
    try {
      const granted = await requestNotificationPermission();
      const newStatus = getNotificationPermissionStatus();
      setPermissionStatus(newStatus);

      if (granted) {
        onUpdateReminderConfig({
          ...reminderConfig,
          notificationsEnabled: true,
        });
        playGentleChime();
        sendMedicationNotification(
          '🔔 Medication Reminders Enabled!',
          `Medora will alert you at your scheduled times (${formatTime12h(reminderConfig.morningTime)}, ${formatTime12h(reminderConfig.afternoonTime)}, ${formatTime12h(reminderConfig.eveningTime)}, and ${formatTime12h(reminderConfig.nightTime)}).`
        );
        setFeedbackMessage('Browser notifications activated successfully!');
      } else if (newStatus === 'denied') {
        setFeedbackMessage('Notifications blocked. Please permit alerts in browser settings.');
      } else {
        setFeedbackMessage('Notification permission not granted.');
      }
    } catch (e) {
      console.error(e);
      setFeedbackMessage('Unable to request notification permission in this environment.');
    } finally {
      setIsRequesting(false);
      setTimeout(() => setFeedbackMessage(null), 4500);
    }
  };

  // Dismiss prompt
  const handleDismissPrompt = () => {
    setIsDismissed(true);
    setNotificationPromptDismissed(true);
  };

  // Re-enable / un-dismiss prompt
  const handleRestorePrompt = () => {
    setIsDismissed(false);
    setNotificationPromptDismissed(false);
  };

  // Toggle notifications off when already granted
  const handleToggleOff = () => {
    onUpdateReminderConfig({
      ...reminderConfig,
      notificationsEnabled: false,
    });
    setFeedbackMessage('Browser alerts paused.');
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleToggleOn = () => {
    onUpdateReminderConfig({
      ...reminderConfig,
      notificationsEnabled: true,
    });
    playGentleChime();
    sendMedicationNotification(
      '🔔 Medication Reminders Resumed',
      'Medora is actively monitoring your scheduled dose times.'
    );
    setFeedbackMessage('Browser alerts resumed.');
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleTestBrowserAlert = () => {
    playGentleChime();
    if (permissionStatus === 'granted') {
      sendMedicationNotification(
        '💊 Scheduled Dose Alert (Test)',
        `Time to take your scheduled dose: Amoxicillin 500mg (Morning - ${formatTime12h(reminderConfig.morningTime)}).`
      );
      setFeedbackMessage('Test alert sent to your browser!');
    } else {
      if (onTriggerTestAlert) {
        onTriggerTestAlert();
      }
      setFeedbackMessage('Audio chime played! (Grant browser permission for desktop notifications)');
    }
    setTimeout(() => setFeedbackMessage(null), 4000);
  };

  // If dismissed and permission is not granted, show a compact restore pill
  if (isDismissed && permissionStatus !== 'granted') {
    return (
      <div className="flex items-center justify-between px-3.5 py-2 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <BellOff className="w-3.5 h-3.5 text-slate-400" />
          <span>Scheduled browser reminders are currently paused.</span>
        </div>
        <button
          type="button"
          onClick={handleRestorePrompt}
          className="text-xs font-semibold text-sky-700 hover:text-sky-900 underline cursor-pointer"
        >
          Enable Reminders
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {feedbackMessage && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-900 flex items-center justify-between gap-2 shadow-xs"
        >
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-sky-600 shrink-0" />
            <span>{feedbackMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => setFeedbackMessage(null)}
            className="p-1 text-sky-700 hover:text-sky-900 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}

      {/* CASE 1: Permission Granted & Active */}
      {permissionStatus === 'granted' && reminderConfig.notificationsEnabled ? (
        <div className="p-4 bg-gradient-to-r from-emerald-50/90 via-teal-50/70 to-emerald-50/90 border border-emerald-200/90 rounded-2xl text-xs text-slate-700 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <BellRing className="w-4 h-4 animate-bounce" style={{ animationDuration: '2.5s' }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm">
                  Browser Dose Alerts Active
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Scheduled
                </span>
              </div>
              <p className="text-slate-600 mt-0.5">
                Alerts set for <strong>Morning ({formatTime12h(reminderConfig.morningTime)})</strong>,{' '}
                <strong>Afternoon ({formatTime12h(reminderConfig.afternoonTime)})</strong>,{' '}
                <strong>Evening ({formatTime12h(reminderConfig.eveningTime)})</strong>, and{' '}
                <strong>Night ({formatTime12h(reminderConfig.nightTime)})</strong>.
              </p>
              <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                <Clock className="w-3 h-3 text-sky-600" />
                <span>
                  Next dose window: <strong>{nextScheduledSlot.name}</strong> at{' '}
                  <strong>{nextScheduledSlot.time12h}</strong>{' '}
                  {nextScheduledSlot.pendingCount > 0 && `(${nextScheduledSlot.pendingCount} pending)`}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto shrink-0 pt-2 md:pt-0">
            <button
              type="button"
              id="test-browser-alert-btn"
              onClick={handleTestBrowserAlert}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-xs cursor-pointer transition-colors"
            >
              <Bell className="w-3 h-3 text-sky-600" />
              <span>Test Alert</span>
            </button>
            <button
              type="button"
              onClick={handleToggleOff}
              className="px-2.5 py-1.5 rounded-xl text-xs font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-200/50 cursor-pointer transition-colors"
            >
              Pause
            </button>
          </div>
        </div>
      ) : permissionStatus === 'granted' && !reminderConfig.notificationsEnabled ? (
        /* Granted but paused */
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-700 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center shrink-0">
              <BellOff className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-800 block">
                Browser Medication Alerts Paused
              </span>
              <span className="text-slate-500 text-[11px]">
                You granted browser permission, but reminders are currently turned off.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleToggleOn}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 shadow-xs cursor-pointer transition-all"
          >
            Resume Alerts
          </button>
        </div>
      ) : permissionStatus === 'denied' ? (
        /* CASE 2: Permission Denied */
        <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-2xl text-xs text-amber-950 flex items-start justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-amber-900 block text-sm">
                Browser Notifications Blocked
              </span>
              <p className="text-amber-800 leading-relaxed">
                Browser-based dose reminders cannot appear because notifications are blocked in your browser site permissions.
                To enable, click the lock or settings icon in your browser URL bar, allow notifications for this site, and reload.
              </p>
              <div className="pt-1 flex items-center gap-3">
                <span className="text-[11px] font-semibold text-amber-900">
                  Audio chime reminders remain active in-app.
                </span>
                <button
                  type="button"
                  onClick={handleTestBrowserAlert}
                  className="text-[11px] font-bold text-amber-900 underline cursor-pointer hover:text-amber-950"
                >
                  Test Audio Chime
                </button>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleDismissPrompt}
            className="p-1 text-amber-700 hover:text-amber-900 cursor-pointer"
            title="Dismiss notice"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* CASE 3: Optional Enable Prompt (Default State) */
        <div className="relative p-5 sm:p-6 bg-gradient-to-br from-sky-50/90 via-white to-blue-50/60 border border-sky-200/90 rounded-3xl shadow-sm text-slate-800 overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-sky-100/50 rounded-full blur-2xl pointer-events-none -mr-12 -mt-12" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="relative w-11 h-11 rounded-2xl bg-sky-700 text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-700/20">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-sky-500 border-2 border-white" />
                </span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Enable Scheduled Dose Reminders
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
                    Optional
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                  Get gentle browser alerts at your scheduled times ({formatTime12h(reminderConfig.morningTime)}, {formatTime12h(reminderConfig.afternoonTime)}, {formatTime12h(reminderConfig.eveningTime)}, {formatTime12h(reminderConfig.nightTime)}) so you never forget a medication, even when Medora is in another tab.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-sky-600" />
                    <span>
                      Next up: <strong>{nextScheduledSlot.name}</strong> ({nextScheduledSlot.time12h})
                    </span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Volume2 className="w-3 h-3 text-emerald-600" />
                    <span>Accompanied by gentle audio chime</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 self-start md:self-center shrink-0 pt-2 md:pt-0">
              <button
                type="button"
                id="enable-browser-notifications-btn"
                onClick={handleEnableNotifications}
                disabled={isRequesting}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-700 hover:bg-sky-800 shadow-sm shadow-sky-700/25 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
              >
                <BellRing className="w-3.5 h-3.5" />
                <span>{isRequesting ? 'Requesting...' : 'Turn On Alerts'}</span>
              </button>

              <button
                type="button"
                id="dismiss-notification-prompt-btn"
                onClick={handleDismissPrompt}
                className="px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 cursor-pointer transition-colors"
              >
                Not Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
