import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function FutureVisionTeaser() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section id="future-vision" className="section-padding bg-brand-gradient relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: 'radial-gradient(circle, #4ade80 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 blur-2xl"
        style={{ background: 'radial-gradient(circle, #fbbf24 0%, transparent 70%)' }} />
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-green-300 text-sm font-semibold mb-6">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Our Vision
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Building Bangladesh's
              <br />
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #4ade80, #fbbf24)' }}>
                Medical Manufacturing Future
              </span>
            </h2>
            <p className="text-white/75 text-lg leading-relaxed mb-8">
              As we complete over a decade of trusted importing, MEDI-Q is setting its sights on a bold new horizon —
              transitioning toward <strong className="text-white">local manufacturing</strong> of surgical and medical goods in Bangladesh.
              Our goal: to make world-class medical quality accessible to every corner of the nation, made right here at home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/about" className="btn-ghost">
                Read Our Story
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-white text-green-800 hover:bg-green-50 transition-all duration-300 hover:-translate-y-1">
                Partner With Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
