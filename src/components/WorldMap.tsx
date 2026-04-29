import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';

const BANGLADESH = { lat: 23.7, lon: 90.4 };
const W = 960;
const H = 480;

export const IMPORT_COUNTRIES = [
  {
    id: 'cn', name: 'China', numericId: 156, lat: 35, lon: 105,
    color: '#22d3ee', flag: '🇨🇳',
    products: ['Nebulizers', 'PPE', 'Hospital Furniture', 'Diagnostic Devices'],
    description: 'Primary sourcing hub for medical devices and equipment',
  },
  {
    id: 'de', name: 'Germany', numericId: 276, lat: 51, lon: 10,
    color: '#a78bfa', flag: '🇩🇪',
    products: ['Surgical Instruments', 'Precision Equipment'],
    description: 'European partner for high-precision surgical instruments',
  },
  {
    id: 'jp', name: 'Japan', numericId: 392, lat: 36, lon: 138,
    color: '#fb923c', flag: '🇯🇵',
    products: ['Diagnostic Equipment', 'Advanced Instruments'],
    description: 'Source of cutting-edge diagnostic technology',
  },
  {
    id: 'us', name: 'United States', numericId: 840, lat: 38, lon: -97,
    color: '#4ade80', flag: '🇺🇸',
    products: ['Medical Technology', 'Healthcare Devices'],
    description: 'Partner for innovative healthcare solutions',
  },
];

type Country = typeof IMPORT_COUNTRIES[0];
type Tooltip = { country: Country; x: number; y: number } | null;

interface WorldMapProps {
  compact?: boolean;
  activeId?: string | null;
  onCountryClick?: (id: string | null) => void;
}

function ArcLine({ path, color, delay }: { path: string; color: string; delay: number }) {
  return (
    <motion.path
      d={path}
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeDasharray="6 4"
      strokeLinecap="round"
      opacity="0.7"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.7 }}
      transition={{ duration: 1.5, delay, ease: 'easeInOut' }}
    />
  );
}

function PulseDot({ x, y, color, isActive, onClick, onHover, onLeave }: {
  x: number; y: number; color: string; isActive: boolean;
  onClick: () => void;
  onHover: (e: React.MouseEvent) => void;
  onLeave: () => void;
}) {
  return (
    <g transform={`translate(${x},${y})`} style={{ cursor: 'pointer' }}
      onClick={onClick} onMouseEnter={onHover} onMouseLeave={onLeave}>
      {/* outer pulse ring — CSS animation */}
      <circle r={20} fill={color} fillOpacity={0}
        stroke={color} strokeWidth={1.5} strokeOpacity={0.5}
        style={{ animation: 'mapPulse 2.4s ease-in-out infinite' }}
      />
      {/* mid ring */}
      <circle r={10} fill={color} fillOpacity={isActive ? 0.4 : 0.2} />
      {/* inner dot */}
      <circle r={5} fill={color} fillOpacity={0.95} />
      <circle r={2.5} fill="white" fillOpacity={0.95} />
    </g>
  );
}

export default function WorldMap({ compact = false, activeId, onCountryClick }: WorldMapProps) {
  const [worldData, setWorldData] = useState<any>(null);
  const [tooltip, setTooltip] = useState<Tooltip>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapH = compact ? 340 : H;

  const projection = geoNaturalEarth1()
    .scale(compact ? 130 : 158)
    .translate([W / 2, mapH / 2]);
  const pathGen = geoPath(projection);

  const project = useCallback(
    (lat: number, lon: number) => {
      const pt = projection([lon, lat]);
      return pt ? { x: pt[0], y: pt[1] } : { x: 0, y: 0 };
    },
    [projection],
  );

  const getArcPath = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const s = project(lat1, lon1);
    const e = project(lat2, lon2);
    const mx = (s.x + e.x) / 2;
    const my = (s.y + e.y) / 2;
    const dist = Math.hypot(e.x - s.x, e.y - s.y);
    return `M ${s.x} ${s.y} Q ${mx} ${my - dist * 0.28} ${e.x} ${e.y}`;
  };

  const bdOrigin = project(BANGLADESH.lat, BANGLADESH.lon);

  useEffect(() => {
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then(r => r.json())
      .then(setWorldData);
  }, []);

  const handleHover = useCallback((e: React.MouseEvent, country: Country) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({ country, x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  if (!worldData) {
    return (
      <div className="w-full rounded-3xl overflow-hidden flex items-center justify-center"
        style={{ height: mapH, background: '#080d1a' }}>
        <div className="flex gap-2 items-center" style={{ color: '#22d3ee99' }}>
          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" opacity="0.75" />
          </svg>
          <span className="text-sm font-medium">Loading map…</span>
        </div>
      </div>
    );
  }

  const geo = feature(worldData, (worldData as any).objects.countries);
  const highlightSet = new Set(IMPORT_COUNTRIES.map(c => c.numericId));

  return (
    <div ref={containerRef} className="relative w-full rounded-3xl overflow-hidden select-none"
      style={{ background: 'linear-gradient(160deg, #080d1a 0%, #0b1120 60%, #06091a 100%)' }}>

      <svg viewBox={`0 0 ${W} ${mapH}`} className="w-full block"
        onMouseLeave={() => setTooltip(null)}>
        <defs>
          {/* Base scan line pattern - cyan */}
          <pattern id="scanBase" x="0" y="0" width={W} height="5" patternUnits="userSpaceOnUse">
            <line x1="0" y1="2" x2={W} y2="2" stroke="#22d3ee" strokeWidth="1.1" strokeOpacity="0.38" />
          </pattern>

          {/* Per-country highlighted scan lines */}
          {IMPORT_COUNTRIES.map(c => (
            <pattern key={c.id} id={`scan-${c.id}`} x="0" y="0" width={W} height="5" patternUnits="userSpaceOnUse">
              <line x1="0" y1="2" x2={W} y2="2" stroke={c.color} strokeWidth="1.5" strokeOpacity="0.7" />
            </pattern>
          ))}

          {/* Clip paths: all land */}
          <clipPath id="clip-all">
            {(geo as any).features.map((f: any) => (
              <path key={f.id} d={pathGen(f) || ''} />
            ))}
          </clipPath>

          {/* Clip path per import country */}
          {IMPORT_COUNTRIES.map(c => (
            <clipPath key={c.id} id={`clip-${c.id}`}>
              {(geo as any).features
                .filter((f: any) => Number(f.id) === c.numericId)
                .map((f: any, idx: number) => (
                  <path key={`${c.id}-${idx}`} d={pathGen(f) || ''} />
                ))}
            </clipPath>
          ))}

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* All land — very dark subtle fill */}
        {(geo as any).features.map((f: any) => (
          <path key={f.id} d={pathGen(f) || ''}
            fill={highlightSet.has(Number(f.id)) ? 'rgba(34,211,238,0.04)' : 'rgba(255,255,255,0.025)'}
            stroke="rgba(34,211,238,0.12)" strokeWidth="0.4"
          />
        ))}

        {/* Base scan lines clipped to all land */}
        <rect x="0" y="0" width={W} height={mapH}
          fill="url(#scanBase)" clipPath="url(#clip-all)" />

        {/* Per-country colored scan lines */}
        {IMPORT_COUNTRIES.map(c => (
          <rect key={c.id} x="0" y="0" width={W} height={mapH}
            fill={`url(#scan-${c.id})`} clipPath={`url(#clip-${c.id})`} opacity="0.85" />
        ))}

        {/* Bangladesh origin dot */}
        <g filter="url(#glow)">
          <circle cx={bdOrigin.x} cy={bdOrigin.y} r={6} fill="#f9fafb" fillOpacity={0.9} />
          <circle cx={bdOrigin.x} cy={bdOrigin.y} r={3} fill="#1B5E20" />
        </g>
        <text x={bdOrigin.x + 9} y={bdOrigin.y + 4}
          fill="white" fillOpacity={0.8} fontSize="9" fontFamily="Inter,sans-serif" fontWeight="600">
          Bangladesh
        </text>

        {/* Animated arcs from Bangladesh to each country */}
        {IMPORT_COUNTRIES.map((c, i) => (
          <ArcLine
            key={c.id}
            path={getArcPath(BANGLADESH.lat, BANGLADESH.lon, c.lat, c.lon)}
            color={c.color}
            delay={i * 0.3 + 0.4}
          />
        ))}

        {/* Pulsing dots on each import country */}
        {IMPORT_COUNTRIES.map((country) => {
          const pos = project(country.lat, country.lon);
          return (
            <PulseDot key={country.id}
              x={pos.x} y={pos.y}
              color={country.color}
              isActive={activeId === country.id}
              onClick={() => onCountryClick?.(activeId === country.id ? null : country.id)}
              onHover={e => handleHover(e, country)}
              onLeave={() => setTooltip(null)}
            />
          );
        })}

        {/* Country flag labels */}
        {IMPORT_COUNTRIES.map(c => {
          const pos = project(c.lat, c.lon);
          return (
            <text key={c.id} x={pos.x} y={pos.y + 20}
              textAnchor="middle" fill="white" fillOpacity={0.75}
              fontSize="9" fontFamily="Inter,sans-serif" fontWeight="600">
              {c.flag} {compact ? '' : c.name}
            </text>
          );
        })}
      </svg>

      {/* Hover tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute pointer-events-none z-20 rounded-xl p-3 shadow-xl border"
            style={{
              left: tooltip.x + 14,
              top: tooltip.y - 60,
              background: 'rgba(8,13,26,0.95)',
              borderColor: tooltip.country.color + '55',
              minWidth: 180,
            }}>
            <p className="font-bold text-white text-sm mb-0.5">
              {tooltip.country.flag} {tooltip.country.name}
            </p>
            <p className="text-xs mb-2" style={{ color: tooltip.country.color + 'cc' }}>
              {tooltip.country.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {tooltip.country.products.map(p => (
                <span key={p} className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: tooltip.country.color + '20', color: tooltip.country.color }}>
                  {p}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
