import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import WorldMap, { IMPORT_COUNTRIES } from '../../components/WorldMap';

export default function GlobalPresencePage() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeCountry = IMPORT_COUNTRIES.find(c => c.id === activeId) ?? null;

  return (
    <>
      <Helmet>
        <title>Global Presence | MEDI-Q — Importing from World's Best Manufacturers</title>
        <meta name="description" content="MEDI-Q imports high-quality medical products from certified manufacturers in China, Germany, Japan, and the USA." />
      </Helmet>

      <div className="pt-20 min-h-screen" style={{ background: '#080d1a' }}>

        {/* Header */}
        <div className="py-14 text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 tracking-wider uppercase"
              style={{ background: 'rgba(34,211,238,0.12)', color: '#22d3ee', border: '1px solid rgba(34,211,238,0.25)' }}>
              Sourcing Excellence
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Our Global Reach</h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Partnering with world-class manufacturers across 4 countries to bring certified medical excellence to Bangladesh.
              Click a country on the map to explore.
            </p>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { value: '4', label: 'Source Countries' },
            { value: '5+', label: 'Product Categories' },
            { value: 'ISO 13485', label: 'Certified Partners' },
            { value: '12+', label: 'Years Importing' },
          ].map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl p-5 text-center"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(34,211,238,0.12)' }}>
              <p className="text-2xl font-black text-cyan-400">{s.value}</p>
              <p className="text-slate-400 text-xs mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* World Map */}
        <div className="container-custom mb-10">
          <WorldMap activeId={activeId} onCountryClick={setActiveId} />
        </div>

        {/* Country detail panel */}
        <div className="container-custom pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {IMPORT_COUNTRIES.map((country, i) => {
              const isActive = activeId === country.id;
              return (
                <motion.button
                  key={country.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  onClick={() => setActiveId(isActive ? null : country.id)}
                  className="text-left rounded-2xl p-5 transition-all duration-300 w-full"
                  style={{
                    background: isActive ? country.color + '18' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isActive ? country.color + '60' : 'rgba(255,255,255,0.08)'}`,
                    boxShadow: isActive ? `0 0 24px ${country.color}22` : 'none',
                  }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{country.flag}</span>
                    <div>
                      <p className="font-bold text-white">{country.name}</p>
                      <p className="text-xs" style={{ color: country.color + 'bb' }}>
                        {country.products.length} product categories
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed mb-3">{country.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {country.products.map(p => (
                      <span key={p} className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                        style={{ background: country.color + '18', color: country.color }}>
                        {p}
                      </span>
                    ))}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Expanded detail */}
          <AnimatePresence>
            {activeCountry && (
              <motion.div
                key={activeCountry.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-6">
                <div className="rounded-2xl p-6 flex items-start gap-6"
                  style={{
                    background: activeCountry.color + '10',
                    border: `1px solid ${activeCountry.color}40`,
                  }}>
                  <span className="text-5xl">{activeCountry.flag}</span>
                  <div>
                    <h2 className="text-xl font-black text-white mb-1">{activeCountry.name}</h2>
                    <p className="text-slate-300 text-sm mb-3">{activeCountry.description}</p>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2"
                      style={{ color: activeCountry.color }}>Products Sourced</p>
                    <div className="flex flex-wrap gap-2">
                      {activeCountry.products.map(p => (
                        <span key={p} className="text-sm px-3 py-1 rounded-full font-medium"
                          style={{ background: activeCountry.color + '22', color: activeCountry.color }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
