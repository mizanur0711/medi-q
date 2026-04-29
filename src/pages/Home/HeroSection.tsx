import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const stats = [
  { value: '12+', label: 'Years of Excellence' },
  { value: '12', label: 'Nebulizer Models' },
  { value: '500+', label: 'Healthcare Partners' },
  { value: '8', label: 'Divisions Covered' },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient"
    >
      {/* Animated mesh background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-float"
          style={{ background: 'radial-gradient(circle, rgba(76,175,80,0.4) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-float-delayed"
          style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.3) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-2xl animate-float"
          style={{ background: 'radial-gradient(circle, rgba(134,239,172,0.2) 0%, transparent 70%)', animationDelay: '4s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Medical cross motif */}
      <div className="absolute top-20 right-16 opacity-10 hidden lg:block">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="white">
          <rect x="45" y="0" width="30" height="120" rx="8" />
          <rect x="0" y="45" width="120" height="30" rx="8" />
        </svg>
      </div>
      <div className="absolute bottom-20 left-16 opacity-5 hidden lg:block">
        <svg width="80" height="80" viewBox="0 0 120 120" fill="white">
          <rect x="45" y="0" width="30" height="120" rx="8" />
          <rect x="0" y="45" width="120" height="30" rx="8" />
        </svg>
      </div>

      <div className="container-custom relative z-10 text-center pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-green-300 text-sm font-medium mb-8 backdrop-blur-sm"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Established 2012 · Bangladesh's Trusted Medical Importer
          </motion.div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 tracking-tight leading-tight">
            Quality Healthcare.
            <br />
            <span className="relative inline-block">
              <span
                className="bg-clip-text text-transparent animate-gradient-shift"
                style={{ backgroundImage: 'linear-gradient(135deg, #4ade80, #fbbf24, #4ade80)', backgroundSize: '200% 200%' }}
              >
                Delivered Nationwide.
              </span>
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-2xl md:text-3xl text-white/80 mb-6 tracking-wide" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
            "Live Life Healthier"
          </p>

          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            MEDI-Q imports world-class surgical instruments, medical devices, and healthcare essentials
            from certified international manufacturers — serving hospitals and clinics across all 8 divisions of Bangladesh.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/products" className="btn-primary text-base px-8 py-4">
              Browse Products
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to="/contact" className="btn-ghost text-base px-8 py-4">
              Contact Us
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-glass rounded-2xl p-4 text-center">
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-green-300 font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="mt-12 flex justify-center"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
