import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import WorldMap, { IMPORT_COUNTRIES } from '../../components/WorldMap';

export default function GlobalPresenceTeaser() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="section-padding" style={{ background: '#080d1a' }}>
      <div className="container-custom">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 tracking-wider uppercase"
            style={{ background: 'rgba(34,211,238,0.12)', color: '#22d3ee', border: '1px solid rgba(34,211,238,0.25)' }}>
            Global Sourcing Network
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            Sourcing from the World's Best
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            MEDI-Q partners with ISO-certified manufacturers across 4 countries to bring world-class medical products to Bangladesh.
          </p>
        </motion.div>

        {/* Compact map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}>
          <WorldMap compact />
        </motion.div>

        {/* Country chips */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mt-8">
          {IMPORT_COUNTRIES.map(c => (
            <div key={c.id} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: c.color + '15', border: `1px solid ${c.color}40`, color: c.color }}>
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
          <Link to="/global-presence"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: '#22d3ee' }}>
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
