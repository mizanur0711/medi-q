import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import directorPhoto from '../assets/director-placeholder.png';

const SESSION_KEY = 'mediq_director_greeting_seen';
const AUTO_DISMISS_MS = 12000;
const IS_DEV = import.meta.env.DEV;

export default function DirectorGreeting() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startRef = useRef<number>(0);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    startRef.current = Date.now();
    setProgress(100);
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.max(0, 100 - (elapsed / AUTO_DISMISS_MS) * 100);
      setProgress(pct);
      if (pct === 0) hide(true);
    }, 80);
  };

  const hide = (markSeen = true) => {
    setVisible(false);
    if (timerRef.current) clearInterval(timerRef.current);
    // In dev mode: only mark seen if explicitly dismissed by user, not auto-dismiss
    // In prod: always mark seen
    if (!IS_DEV || markSeen) {
      sessionStorage.setItem(SESSION_KEY, '1');
    }
  };

  // Show on homepage — in DEV always show, in PROD show once per session
  useEffect(() => {
    if (pathname !== '/') return;
    if (!IS_DEV && sessionStorage.getItem(SESSION_KEY)) return;

    const delay = setTimeout(() => {
      setVisible(true);
      startTimer();
    }, 1800);

    return () => clearTimeout(delay);
  }, [pathname]);

  // Dev shortcut: Shift+G re-shows the greeting
  useEffect(() => {
    if (!IS_DEV) return;
    const handler = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === 'G') {
        sessionStorage.removeItem(SESSION_KEY);
        if (timerRef.current) clearInterval(timerRef.current);
        setVisible(false);
        setTimeout(() => {
          setVisible(true);
          startTimer();
        }, 150);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="director-greeting"
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          className="fixed bottom-6 right-5 z-40 rounded-3xl overflow-hidden"
          style={{
            width: 'clamp(340px, 36vw, 520px)',
            background: 'linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%)',
            border: '1px solid rgba(27,94,32,0.18)',
            boxShadow: '0 32px 80px rgba(27,94,32,0.22), 0 8px 32px rgba(0,0,0,0.12)',
          }}>

          {/* Progress bar */}
          <div className="h-1 w-full" style={{ background: 'rgba(27,94,32,0.1)' }}>
            <div
              className="h-full transition-none"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #1B5E20, #4CAF50)',
                transition: 'width 0.08s linear',
              }}
            />
          </div>

          {/* Green header */}
          <div className="px-6 py-3 flex items-center justify-between"
            style={{ background: 'linear-gradient(90deg, #1B5E20 0%, #2E7D32 100%)' }}>
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              <span className="text-white text-sm font-semibold tracking-widest uppercase">
                Director's Message
              </span>
            </div>
            <button
              onClick={() => hide(true)}
              className="text-white/50 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
              aria-label="Close">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body — two-column layout */}
          <div className="p-6">
            <div className="flex gap-5">
              {/* Photo column */}
              <div className="flex-shrink-0 flex flex-col items-center gap-2">
                <div className="relative">
                  <img
                    src={directorPhoto}
                    alt="MD Jahedul Alam — Founder & Managing Director"
                    className="rounded-2xl object-cover object-top ring-4 ring-green-100"
                    style={{ width: 110, height: 130 }}
                  />
                  {/* "Live" badge */}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full text-xs font-bold text-white"
                    style={{ background: 'linear-gradient(90deg, #1B5E20, #4CAF50)' }}>
                    Founder
                  </span>
                </div>
              </div>

              {/* Text column */}
              <div className="flex-1 min-w-0">
                <p className="font-black text-slate-900 text-lg leading-tight mb-0.5">
                  MD Jahedul Alam
                </p>
                <p className="text-green-700 text-sm font-semibold mb-1">
                  CEO
                </p>
                <p className="text-slate-400 text-xs mb-4">MEDI-Q · Est. 2012</p>

                {/* Quote */}
                <div className="relative pl-4" style={{ borderLeft: '3px solid #4CAF50' }}>
                  <p className="text-slate-600 text-sm leading-relaxed italic">
                    "Welcome to MEDI-Q. For over 12 years, our mission has been to make world-class medical products accessible to every healthcare provider in Bangladesh. Quality is not just our promise — it is our identity."
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-5 border-t border-green-100" />

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { value: '12+', label: 'Years' },
                { value: '500+', label: 'Partners' },
                { value: '19+', label: 'Products' },
              ].map(s => (
                <div key={s.label} className="text-center rounded-xl py-2.5"
                  style={{ background: 'rgba(27,94,32,0.06)' }}>
                  <p className="text-lg font-black text-green-700">{s.value}</p>
                  <p className="text-xs text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>

            {/* CTA row */}
            <div className="flex items-center justify-between">
              <Link
                to="/about"
                onClick={() => hide(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all hover:-translate-y-0.5"
                style={{
                  background: 'linear-gradient(135deg, #1B5E20, #2E7D32)',
                  boxShadow: '0 4px 14px rgba(27,94,32,0.3)',
                }}>
                Meet our team
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <button
                onClick={() => hide(true)}
                className="text-sm text-slate-400 hover:text-slate-600 transition-colors px-3 py-2">
                Close
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
