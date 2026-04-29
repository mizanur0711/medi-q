import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('medi-q-cookie-consent');
    if (!consent) {
      setTimeout(() => setVisible(true), 1500);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('medi-q-cookie-consent', 'accepted');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="fixed bottom-0 left-0 right-0 z-30 no-print"
        >
          <div className="bg-slate-900/95 backdrop-blur-md border-t border-slate-700 p-4">
            <div className="container-custom flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <span className="text-green-400 mt-0.5 flex-shrink-0">🍪</span>
                <p className="text-sm text-slate-300">
                  We use cookies to enhance your browsing experience and analyze site traffic.
                  By clicking &quot;Accept&quot;, you consent to our use of cookies.{' '}
                  <a href="/contact" className="text-green-400 hover:text-green-300 underline">Learn more</a>.
                </p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <button onClick={() => setVisible(false)}
                  className="px-4 py-2 text-sm text-slate-400 hover:text-white border border-slate-600 hover:border-slate-400 rounded-full transition-colors">
                  Decline
                </button>
                <button onClick={accept}
                  className="btn-primary text-sm py-2 px-5">
                  Accept
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
