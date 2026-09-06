import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Pause, Play, RotateCcw, AlertCircle } from 'lucide-react';
import { SupportedLanguage } from '../types';

interface AudioPlayerProps {
  textToSpeak: string;
  language: SupportedLanguage;
  label?: string;
  variant?: 'button' | 'card' | 'inline';
  className?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  textToSpeak,
  language,
  label = 'Listen',
  variant = 'button',
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [hasSupport, setHasSupport] = useState<boolean>(true);
  const [voiceLoaded, setVoiceLoaded] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setHasSupport(false);
      return;
    }

    const updateVoices = () => {
      setVoiceLoaded(true);
    };

    window.speechSynthesis.onvoiceschanged = updateVoices;
    updateVoices();

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const getLanguageTag = (lang: SupportedLanguage): string => {
    switch (lang) {
      case 'hi':
        return 'hi-IN';
      case 'mr':
        return 'mr-IN';
      case 'es':
        return 'es-ES';
      case 'fr':
        return 'fr-FR';
      case 'de':
        return 'de-DE';
      case 'ar':
        return 'ar-SA';
      case 'bn':
        return 'bn-IN';
      case 'ta':
        return 'ta-IN';
      case 'te':
        return 'te-IN';
      case 'gu':
        return 'gu-IN';
      case 'en':
      default:
        return 'en-US';
    }
  };

  const getLanguageDisplayName = (lang: SupportedLanguage): string => {
    switch (lang) {
      case 'hi':
        return 'Hindi (हिन्दी)';
      case 'mr':
        return 'Marathi (मराठी)';
      case 'es':
        return 'Spanish (Español)';
      case 'fr':
        return 'French (Français)';
      case 'de':
        return 'German (Deutsch)';
      case 'ar':
        return 'Arabic (العربية)';
      case 'bn':
        return 'Bengali (বাংলা)';
      case 'ta':
        return 'Tamil (தமிழ்)';
      case 'te':
        return 'Telugu (తెలుగు)';
      case 'gu':
        return 'Gujarati (ગુજરાતી)';
      case 'en':
      default:
        return 'English';
    }
  };

  const getBestVoice = (langTag: string) => {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // Direct match
    const directMatch = voices.find(
      (v) => v.lang.toLowerCase() === langTag.toLowerCase()
    );
    if (directMatch) return directMatch;

    // Language prefix match (e.g. 'hi' or 'mr' or 'en')
    const langPrefix = langTag.split('-')[0].toLowerCase();
    const prefixMatch = voices.find((v) =>
      v.lang.toLowerCase().startsWith(langPrefix)
    );
    if (prefixMatch) return prefixMatch;

    // Fallback
    return voices.find((v) => v.default) || voices[0];
  };

  const handlePlay = () => {
    if (!hasSupport || !textToSpeak) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();

    const langTag = getLanguageTag(language);
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = langTag;
    utterance.rate = speechRate;
    utterance.pitch = 1.0;

    const matchedVoice = getBestVoice(langTag);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis event:', e);
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    if (window.speechSynthesis && isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  const handleRateChange = (rate: number) => {
    setSpeechRate(rate);
    if (isPlaying) {
      handleStop();
      setTimeout(() => {
        handlePlay();
      }, 100);
    }
  };

  if (!hasSupport) {
    return (
      <div className="inline-flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded-md border border-amber-200">
        <AlertCircle className="w-3.5 h-3.5" />
        <span>Audio unavailable in this browser</span>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <button
        id="medora-listen-btn-inline"
        type="button"
        onClick={isPlaying ? handlePause : handlePlay}
        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-all ${
          isPlaying
            ? 'bg-sky-600 text-white'
            : 'bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200'
        } ${className}`}
        title="Listen to instruction"
      >
        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        <span>{isPlaying ? 'Pause' : label}</span>
      </button>
    );
  }

  if (variant === 'card') {
    return (
      <div
        id="medora-audio-player-card"
        className={`bg-sky-50/80 border border-sky-200/80 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${className}`}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={isPlaying ? handlePause : handlePlay}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-sm ${
              isPlaying
                ? 'bg-sky-700 text-white hover:bg-sky-800 animate-pulse'
                : 'bg-sky-600 text-white hover:bg-sky-700'
            }`}
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          >
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-800">
                {isPlaying ? 'Listening to instructions...' : 'Listen in your language'}
              </span>
              {isPlaying && (
                <span className="flex items-center gap-0.5">
                  <span className="w-1 h-3 bg-sky-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1 h-4 bg-sky-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1 h-2 bg-sky-600 rounded-full animate-bounce" />
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              Clear spoken audio in {getLanguageDisplayName(language)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {isPlaying && (
            <button
              type="button"
              onClick={handleStop}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-md hover:bg-sky-100 cursor-pointer"
              title="Stop playback"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
          <div className="flex items-center bg-white rounded-lg border border-sky-200/80 p-0.5 text-[11px] font-medium text-slate-600">
            <button
              type="button"
              onClick={() => handleRateChange(0.8)}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                speechRate === 0.8 ? 'bg-sky-600 text-white font-semibold' : 'hover:bg-slate-100'
              }`}
              title="Slower speed for clear hearing"
            >
              0.8x
            </button>
            <button
              type="button"
              onClick={() => handleRateChange(1.0)}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                speechRate === 1.0 ? 'bg-sky-600 text-white font-semibold' : 'hover:bg-slate-100'
              }`}
            >
              1.0x
            </button>
            <button
              type="button"
              onClick={() => handleRateChange(1.2)}
              className={`px-2 py-0.5 rounded cursor-pointer ${
                speechRate === 1.2 ? 'bg-sky-600 text-white font-semibold' : 'hover:bg-slate-100'
              }`}
            >
              1.2x
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default button variant
  return (
    <button
      id="medora-listen-btn-default"
      type="button"
      onClick={isPlaying ? handlePause : handlePlay}
      className={`inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all shadow-xs ${
        isPlaying
          ? 'bg-sky-700 text-white hover:bg-sky-800'
          : 'bg-white text-sky-800 hover:bg-sky-50 border border-sky-300/80'
      } ${className}`}
      aria-label={`${label} audio instruction`}
    >
      {isPlaying ? (
        <>
          <Pause className="w-4 h-4 text-sky-200" />
          <span>Pause Voice</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-sky-600" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
