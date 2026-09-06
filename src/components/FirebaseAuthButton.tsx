import React, { useState, useEffect } from 'react';
import {
  User as FirebaseUser,
  onAuthStateChanged,
} from 'firebase/auth';
import {
  auth,
  signInWithGoogle,
  signOutPatient,
} from '../lib/firebase';
import {
  LogIn,
  LogOut,
  Cloud,
  CloudCheck,
  User,
  ChevronDown,
  Sparkles,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

interface FirebaseAuthButtonProps {
  onUserChanged?: (user: FirebaseUser | null) => void;
}

export const FirebaseAuthButton: React.FC<FirebaseAuthButtonProps> = ({
  onUserChanged,
}) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (onUserChanged) {
        onUserChanged(currentUser);
      }
    });
    return () => unsubscribe();
  }, [onUserChanged]);

  const handleSignIn = async () => {
    setAuthError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      // Friendly message for popup close or network
      if (err?.code === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in cancelled');
      } else {
        setAuthError('Unable to sign in with Google. Please try again.');
      }
      setTimeout(() => setAuthError(null), 4000);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutPatient();
      setMenuOpen(false);
    } catch (err) {
      console.error('Sign Out Error:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/80 text-xs text-slate-400 animate-pulse">
        <div className="w-3.5 h-3.5 rounded-full bg-slate-300" />
        <span>Sync...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative">
        <button
          type="button"
          id="firebase-signin-btn"
          onClick={handleSignIn}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-2xs transition-all cursor-pointer active:scale-98"
          title="Sign in with Google to sync your prescriptions and medication logs to Firebase Cloud"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.94H1.24v3.15C3.26 21.4 7.34 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.26c-.25-.72-.38-1.49-.38-2.26s.13-1.54.38-2.26V6.59H1.24C.45 8.16 0 9.98 0 12s.45 3.84 1.24 5.41l4.04-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.6 1.24 6.59l4.04 3.15c.95-2.84 3.6-4.99 6.72-4.99z"
            />
          </svg>
          <span>Sign In</span>
        </button>

        {authError && (
          <div className="absolute right-0 top-full mt-1.5 px-3 py-1.5 bg-rose-50 border border-rose-200 rounded-xl text-[11px] text-rose-700 shadow-sm whitespace-nowrap z-50">
            {authError}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        id="firebase-user-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/90 text-xs font-semibold text-slate-800 transition-all cursor-pointer"
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || 'User'}
            className="w-5 h-5 rounded-full object-cover border border-slate-200"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center text-[10px]">
            {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
          </div>
        )}

        <span className="max-w-[100px] truncate hidden sm:inline">
          {user.displayName || user.email?.split('@')[0] || 'Patient'}
        </span>

        <span className="flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-200">
          <Cloud className="w-3 h-3 text-emerald-600" />
          <span className="hidden md:inline">Synced</span>
        </span>

        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {/* User Dropdown */}
      {menuOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 p-3 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 animate-in fade-in zoom-in-95">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'User'}
                className="w-9 h-9 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold">
                {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate">
                {user.displayName || 'Patient'}
              </p>
              <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
            </div>
          </div>

          <div className="py-2 space-y-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-2 p-2 rounded-xl bg-sky-50/70 text-sky-900 border border-sky-100">
              <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
              <div className="text-[11px] leading-tight">
                <span className="font-semibold block">Firebase Cloud Sync Active</span>
                <span className="text-sky-700/80 text-[10px]">
                  Prescriptions & dose logs sync securely to Firestore.
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              id="firebase-signout-btn"
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 cursor-pointer transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
