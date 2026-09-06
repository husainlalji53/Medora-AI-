import React, { useState, useRef, useEffect } from 'react';
import { SupportedLanguage } from '../types';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { SUPPORTED_LANGUAGES, LanguageMeta, getTranslation } from '../utils/translations';

export const LANGUAGES = SUPPORTED_LANGUAGES;

interface LanguageSelectorProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  className?: string;
  compact?: boolean;
  variant?: 'dropdown' | 'pills' | 'compact';
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange,
  className = '',
  compact = false,
  variant = 'dropdown',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentMeta = SUPPORTED_LANGUAGES.find((l) => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];
  const t = getTranslation(currentLanguage);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (variant === 'pills') {
    return (
      <div
        id="medora-language-pills"
        className={`flex items-center gap-1.5 overflow-x-auto py-1 px-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 shadow-xs max-w-full ${className}`}
        role="radiogroup"
        aria-label={t.languageSelectLabel}
      >
        <div className="flex items-center gap-1 px-2 text-slate-500 text-xs font-semibold shrink-0">
          <Globe className="w-3.5 h-3.5 text-sky-600" />
          <span className="hidden sm:inline">{t.languageSelectLabel}:</span>
        </div>
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              id={`lang-btn-pill-${lang.code}`}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onLanguageChange(lang.code)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                isSelected
                  ? 'bg-sky-700 text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <span>{lang.flag}</span>
              <span className="font-semibold">{lang.native}</span>
              <span className={`text-[10px] ${isSelected ? 'text-sky-200' : 'text-slate-400'}`}>
                ({lang.label})
              </span>
            </button>
          );
        })}
      </div>
    );
  }

  // Dropdown variant (standard for Navbar and clean headers)
  return (
    <div
      id="medora-language-selector"
      ref={containerRef}
      className={`relative inline-block text-left ${className}`}
    >
      <button
        id="lang-dropdown-trigger"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 text-xs font-semibold transition-all shadow-2xs cursor-pointer active:scale-98 ${
          isOpen ? 'ring-2 ring-sky-500/20 border-sky-400' : ''
        }`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-sky-600 shrink-0" />
        <span className="text-sm shrink-0">{currentMeta.flag}</span>
        <span className="font-semibold tracking-tight">{currentMeta.native}</span>
        {!compact && <span className="text-slate-400 text-[11px] font-normal">({currentMeta.label})</span>}
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-sky-600' : ''}`} />
      </button>

      {isOpen && (
        <div
          id="lang-dropdown-menu"
          className="absolute right-0 mt-1.5 w-60 sm:w-64 max-h-80 overflow-y-auto rounded-2xl bg-white p-1.5 shadow-xl border border-slate-200/90 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
          role="listbox"
        >
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1 flex items-center justify-between">
            <span>Select Language</span>
            <span className="text-[10px] text-sky-600 font-medium">11 Languages</span>
          </div>
          <div className="space-y-0.5">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isSelected = currentLanguage === lang.code;
              return (
                <button
                  key={lang.code}
                  id={`lang-option-${lang.code}`}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-sky-50 text-sky-900 font-semibold'
                      : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base shrink-0">{lang.flag}</span>
                    <div className="truncate">
                      <span className="font-semibold block truncate">{lang.native}</span>
                      <span className="text-[10px] text-slate-400 block truncate">{lang.label}</span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-sky-600 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
