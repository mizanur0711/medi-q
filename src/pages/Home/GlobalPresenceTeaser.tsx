import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import WorldMap, { IMPORT_COUNTRIES } from '../../components/WorldMap';

export default function GlobalPresenceTeaser() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden bg-white"
    >
      {/* Very subtle green wash — just a hint of brand colour */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(187,247,208,0.35) 0%, transparent 70%)',
        }}
      />

      <div className="container-custom relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 tracking-wider uppercase"
            style={{
              background: 'rgba(22,101,52,0.08)',
              color: '#166534',
              border: '1px solid rgba(22,101,52,0.18)',
            }}>
            Global Sourcing Network
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3">
            Sourcing from the World's Best
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            MEDI-Q partners with ISO-certified manufacturers across {IMPORT_COUNTRIES.length} countries to bring
            world-class medical products to Bangladesh.
          </p>
        </motion.div>

        {/* Map — no card wrapper, floats on the section background */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}>
          <WorldMap compact />
        </motion.div>

        {/* Country chips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mt-6">
          {IMPORT_COUNTRIES.map(c => (
            <div
              key={c.id}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-white border shadow-sm"
              style={{
                borderColor: c.color + '40',
                color: c.color,
                boxShadow: `0 1px 6px ${c.color}18`,
              }}>
              <span>{c.flag}</span>
              <span>{c.name}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-8">
          <Link
            to="/global-presence"
            className="inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:text-green-900 transition-all duration-300 hover:gap-3">
            Explore our global network
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
