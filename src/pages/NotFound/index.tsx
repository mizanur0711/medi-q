import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | MEDI-Q</title>
      </Helmet>
      <div className="min-h-screen bg-brand-gradient flex items-center justify-center px-4">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            {/* Medical cross icon */}
            <div className="relative w-40 h-40 mx-auto mb-8">
              <svg viewBox="0 0 120 120" className="w-full h-full opacity-20" fill="white">
                <rect x="45" y="0" width="30" height="120" rx="8" />
                <rect x="0" y="45" width="120" height="30" rx="8" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-7xl font-black text-white">404</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-white mb-3">Page Not Found</h1>
            <p className="text-white/70 text-lg mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-green-800 font-bold hover:bg-green-50 transition-all hover:-translate-y-1 shadow-lg">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Go Home
              </Link>
              <Link to="/products" className="btn-ghost">Browse Products</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
