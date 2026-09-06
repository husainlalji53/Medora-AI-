import React, { useState } from 'react';
import { Pill, Upload, Sparkles, Menu, X, CalendarCheck, FileText } from 'lucide-react';
import { AppView, SupportedLanguage } from '../types';
import { FirebaseAuthButton } from './FirebaseAuthButton';
import { LanguageSelector } from './LanguageSelector';
import { getTranslation } from '../utils/translations';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onOpenDemo: () => void;
  hasPrescription: boolean;
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenDemo,
  hasPrescription,
  currentLanguage,
  onLanguageChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = getTranslation(currentLanguage);

  const handleNav = (view: AppView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo & Product Identity */}
        <div className="flex items-center gap-3">
          <button
            id="nav-logo"
            type="button"
            onClick={() => handleNav('home')}
            className="flex items-center gap-2.5 group cursor-pointer text-left"
            aria-label="Medora Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-700 to-sky-500 text-white flex items-center justify-center shadow-md shadow-sky-600/20 group-hover:scale-105 transition-transform">
              <Pill className="w-5 h-5 -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 font-sans">
                  Medora
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                {t.navSubtitle}
              </p>
            </div>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-600">
          <button
            id="nav-link-home"
            type="button"
            onClick={() => handleNav('home')}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer ${
              currentView === 'home'
                ? 'text-sky-800 font-semibold bg-sky-50'
                : 'hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            {t.navHome}
          </button>

          <button
            id="nav-link-how-it-works"
            type="button"
            onClick={() => handleNav('how-it-works')}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer ${
              currentView === 'how-it-works'
                ? 'text-sky-800 font-semibold bg-sky-50'
                : 'hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            {t.navHowItWorks}
          </button>

          <button
            id="nav-link-about"
            type="button"
            onClick={() => handleNav('about')}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer ${
              currentView === 'about'
                ? 'text-sky-800 font-semibold bg-sky-50'
                : 'hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            {t.navAbout}
          </button>

          <button
            id="nav-link-med-log"
            type="button"
            onClick={() => handleNav('medication-log')}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
              currentView === 'medication-log'
                ? 'text-sky-800 font-semibold bg-sky-50'
                : 'hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <CalendarCheck className="w-4 h-4 text-sky-600" />
            <span>{t.navMedicationLog}</span>
          </button>

          {hasPrescription && (
            <button
              id="nav-link-results"
              type="button"
              onClick={() => handleNav('results')}
              className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentView === 'results' || currentView === 'details'
                  ? 'text-sky-800 font-semibold bg-sky-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <FileText className="w-4 h-4 text-sky-600" />
              <span>{t.navCurrentPrescription}</span>
            </button>
          )}
        </nav>

        {/* Action CTAs and Language Picker */}
        <div className="hidden md:flex items-center gap-2">
          {/* Language Selector Dropdown */}
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
            variant="dropdown"
          />

          <FirebaseAuthButton />

          <button
            id="nav-btn-demo"
            type="button"
            onClick={onOpenDemo}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-300/70 cursor-pointer transition-all active:scale-98"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.navTryDemo}</span>
          </button>

          <button
            id="nav-btn-upload"
            type="button"
            onClick={() => handleNav('upload')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 shadow-sm shadow-sky-700/25 cursor-pointer transition-all active:scale-98"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{t.navUploadPrescription}</span>
          </button>
        </div>

        {/* Mobile top controls */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
            compact={true}
            variant="dropdown"
          />
          <FirebaseAuthButton />
          <button
            id="nav-mobile-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => handleNav('home')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium ${
                currentView === 'home' ? 'bg-sky-50 text-sky-800 font-semibold' : 'text-slate-700'
              }`}
            >
              {t.navHome}
            </button>
            <button
              type="button"
              onClick={() => handleNav('how-it-works')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium ${
                currentView === 'how-it-works' ? 'bg-sky-50 text-sky-800 font-semibold' : 'text-slate-700'
              }`}
            >
              {t.navHowItWorks}
            </button>
            <button
              type="button"
              onClick={() => handleNav('about')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium ${
                currentView === 'about' ? 'bg-sky-50 text-sky-800 font-semibold' : 'text-slate-700'
              }`}
            >
              {t.navAbout}
            </button>
            <button
              type="button"
              onClick={() => handleNav('medication-log')}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 ${
                currentView === 'medication-log' ? 'bg-sky-50 text-sky-800 font-semibold' : 'text-slate-700'
              }`}
            >
              <CalendarCheck className="w-4 h-4 text-sky-600" />
              <span>{t.navMedicationLog}</span>
            </button>
            {hasPrescription && (
              <button
                type="button"
                onClick={() => handleNav('results')}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium ${
                  currentView === 'results' ? 'bg-sky-50 text-sky-800 font-semibold' : 'text-slate-700'
                }`}
              >
                {t.navCurrentPrescription}
              </button>
            )}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleNav('upload')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-sky-700 hover:bg-sky-800"
            >
              <Upload className="w-4 h-4" />
              <span>{t.navUploadPrescription}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenDemo();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>{t.navTryDemo}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
