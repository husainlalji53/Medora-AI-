import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, CheckCircle2, Award } from 'lucide-react';

interface ConfettiCelebrationProps {
  show: boolean;
  onClose: () => void;
  totalDoses: number;
  dateLabel: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vRot: number;
  shape: 'rect' | 'circle' | 'pill';
  opacity: number;
}

const COLORS = [
  '#10b981', // emerald
  '#0284c7', // sky
  '#f59e0b', // amber
  '#ec4899', // pink
  '#8b5cf6', // purple
  '#06b6d4', // cyan
  '#34d399', // light emerald
];

export const ConfettiCelebration: React.FC<ConfettiCelebrationProps> = ({
  show,
  onClose,
  totalDoses,
  dateLabel,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Confetti Canvas Particle Physics
  useEffect(() => {
    if (!show) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateDimensions();

    // Generate 90 particles starting from center top / width spread
    const particles: Particle[] = [];
    const count = 90;
    const centerX = canvas.width / 2;
    const originY = Math.min(canvas.height * 0.35, 300);

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * (i / count) * 2);
      const speed = 4 + Math.random() * 8;
      const shapes: Array<'rect' | 'circle' | 'pill'> = ['rect', 'circle', 'pill'];
      particles.push({
        x: centerX + (Math.random() - 0.5) * 120,
        y: originY + (Math.random() - 0.5) * 60,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
        vy: Math.sin(angle) * speed - 3 - Math.random() * 4,
        size: 6 + Math.random() * 8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 12,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        opacity: 1,
      });
    }

    let animationFrameId: number;
    let startTime = performance.now();
    const durationMs = 3800;

    const render = (now: number) => {
      const elapsed = now - startTime;
      const progress = elapsed / durationMs;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (progress >= 1) {
        return; // done
      }

      const fadeMultiplier = progress > 0.65 ? 1 - (progress - 0.65) / 0.35 : 1;

      for (const p of particles) {
        // Physics update
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22; // gravity
        p.vx *= 0.985; // air drag
        p.vy *= 0.985;
        p.rotation += p.vRot;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity * fadeMultiplier);
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Pill capsule shape
          const w = p.size * 1.5;
          const h = p.size * 0.7;
          ctx.beginPath();
          ctx.roundRect(-w / 2, -h / 2, w, h, h / 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    window.addEventListener('resize', updateDimensions);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [show]);

  return (
    <>
      {/* Canvas Confetti Layer */}
      {show && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-50 w-full h-full"
        />
      )}

      {/* Animated Success Checkmark Modal / Banner */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs"
            onClick={onClose}
          >
            <motion.div
              initial={{ scale: 0.75, opacity: 0, y: 30 }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                transition: {
                  type: 'spring',
                  damping: 22,
                  stiffness: 300,
                },
              }}
              exit={{ scale: 0.85, opacity: 0, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-emerald-100 text-center relative overflow-hidden"
            >
              {/* Decorative background glow */}
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-emerald-100 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-sky-100 rounded-full blur-2xl pointer-events-none" />

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Dismiss"
                aria-label="Close celebration banner"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Animated Checkmark Circle */}
              <div className="relative mx-auto w-24 h-24 mb-5 flex items-center justify-center">
                {/* Expanding pulse wave */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: [1, 1.4, 1.6], opacity: [0.6, 0.2, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                  className="absolute inset-0 rounded-full bg-emerald-400/30"
                />

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 340,
                    damping: 18,
                    delay: 0.1,
                  }}
                  className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30"
                >
                  <svg
                    className="w-10 h-10 text-white stroke-current"
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
                      transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
                    />
                  </svg>
                </motion.div>

                {/* Floating spark icons */}
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: [0, 1.2, 1], rotate: 0 }}
                  transition={{ delay: 0.35 }}
                  className="absolute -top-1 -right-1 p-1 bg-amber-100 text-amber-600 rounded-full border border-amber-200 shadow-xs"
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
              </div>

              {/* Title & Badge */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Adherence Achieved</span>
                </div>

                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  All Daily Doses Completed!
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Splendid work! You have safely completed all <strong>{totalDoses}</strong> scheduled medication doses for <strong>{dateLabel}</strong>.
                </p>
              </div>

              {/* Adherence Confirmation pill */}
              <div className="mt-5 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-700 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Reminders for remaining slots are marked fulfilled.</span>
              </div>

              {/* Continue Button */}
              <div className="mt-6">
                <button
                  type="button"
                  id="celebration-continue-btn"
                  onClick={onClose}
                  className="w-full py-3 px-6 rounded-xl font-bold text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/25 cursor-pointer transition-all active:scale-98"
                >
                  Awesome, Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
