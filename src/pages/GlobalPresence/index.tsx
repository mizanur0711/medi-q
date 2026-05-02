import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import WorldMap, { IMPORT_COUNTRIES } from '../../components/WorldMap';

const STATS = [
  { value: '4', label: 'Source Countries' },
  { value: '5+', label: 'Product Categories' },
  { value: 'ISO 13485', label: 'Certified Partners' },
  { value: '12+', label: 'Years Importing' },
];

export default function GlobalPresencePage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeCountry = IMPORT_COUNTRIES.find(c => c.id === activeId) ?? null;

  return (
    <>
      <Helmet>
        <title>Global Presence | MEDI-Q — Importing from World's Best Manufacturers</title>
        <meta name="description" content="MEDI-Q imports high-quality medical products from certified manufacturers in China, Germany, Japan, and the USA." />
      </Helmet>

      {/* Page wrapper — same white background as homepage teaser */}
      <div className="pt-20 min-h-screen bg-white relative overflow-hidden">

        {/* Same subtle radial green wash as homepage */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(187,247,208,0.35) 0%, transparent 65%)',
          }}
        />

        <div className="relative z-10">

          {/* ── Header ── */}
          <div className="py-14 text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}>
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-4 tracking-wider uppercase"
                style={{
                  background: 'rgba(22,101,52,0.08)',
                  color: '#166534',
                  border: '1px solid rgba(22,101,52,0.18)',
                }}>
                Sourcing Excellence
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                Our Global Reach
              </h1>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Partnering with world-class manufacturers across 4 countries to bring certified
                medical excellence to Bangladesh. Click a country on the map to explore.
              </p>
            </motion.div>
          </div>

          {/* ── Stats row ── */}
          <div className="container-custom grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl p-5 text-center bg-white border border-slate-100"
                style={{ boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <p className="text-2xl font-black text-green-700">{s.value}</p>
                <p className="text-slate-500 text-xs mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* ── World Map — transparent, floats on white ── */}
          <div className="container-custom mb-10">
            <WorldMap activeId={activeId} onCountryClick={setActiveId} />
          </div>

          {/* ── Country cards ── */}
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
                    className="text-left rounded-2xl p-5 transition-all duration-300 w-full bg-white border"
                    style={{
                      borderColor: isActive ? country.color + '60' : '#e2e8f0',
                      boxShadow: isActive
                        ? `0 4px 24px ${country.color}22, 0 1px 4px rgba(0,0,0,0.06)`
                        : '0 1px 6px rgba(0,0,0,0.05)',
                      background: isActive ? country.color + '08' : '#ffffff',
                    }}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{country.flag}</span>
                      <div>
                        <p className="font-bold text-slate-900">{country.name}</p>
                        <p className="text-xs" style={{ color: country.color }}>
                          {country.products.length} product categories
                        </p>
                      </div>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-3">
                      {country.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {country.products.map(p => (
                        <span
                          key={p}
                          className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                          style={{ background: country.color + '12', color: country.color }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* ── Expanded detail panel ── */}
            <AnimatePresence>
              {activeCountry && (
                <motion.div
                  key={activeCountry.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mt-6">
                  <div
                    className="rounded-2xl p-6 flex items-start gap-6 bg-white border"
                    style={{
                      borderColor: activeCountry.color + '40',
                      boxShadow: `0 4px 32px ${activeCountry.color}18`,
                    }}>
                    <span className="text-5xl flex-shrink-0">{activeCountry.flag}</span>
                    <div>
                      <h2 className="text-xl font-black text-slate-900 mb-1">
                        {activeCountry.name}
                      </h2>
                      <p className="text-slate-500 text-sm mb-3">{activeCountry.description}</p>
                      <p
                        className="text-xs font-semibold uppercase tracking-wider mb-2"
                        style={{ color: activeCountry.color }}>
                        Products Sourced
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {activeCountry.products.map(p => (
                          <span
                            key={p}
                            className="text-sm px-3 py-1 rounded-full font-medium"
                            style={{
                              background: activeCountry.color + '15',
                              color: activeCountry.color,
                            }}>
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
      </div>
    </>
  );
}
