import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import importsMapData from '../data/imports-map.json';

const BANGLADESH = { lat: 23.7, lon: 90.4 };
const W = 960;
const H = 480;

const COUNTRY_META: Record<string, { numericId: number; lat: number; lon: number; color: string; flag: string }> = {
  'CN': { numericId: 156, lat: 35, lon: 105, color: '#0891b2', flag: '🇨🇳' },
  'DE': { numericId: 276, lat: 51, lon: 10, color: '#7c3aed', flag: '🇩🇪' },
  'JP': { numericId: 392, lat: 36, lon: 138, color: '#c2410c', flag: '🇯🇵' },
  'US': { numericId: 840, lat: 38, lon: -97, color: '#166534', flag: '🇺🇸' },
  'KR': { numericId: 410, lat: 36, lon: 128, color: '#ea580c', flag: '🇰🇷' },
};

export const IMPORT_COUNTRIES = importsMapData.map(item => {
  const meta = COUNTRY_META[item.alpha2] || {
    numericId: 0, lat: 0, lon: 0, color: '#64748b', flag: '🏳️'
  };
  return {
    id: item.alpha2.toLowerCase(),
    name: item.country,
    numericId: meta.numericId,
    lat: meta.lat,
    lon: meta.lon,
    color: meta.color,
    flag: meta.flag,
    products: item.products,
    description: item.description,
  };
});

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
      strokeDasharray="5 5"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.6 }}
      transition={{ duration: 1.6, delay, ease: 'easeInOut' }}
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
      {/* outer pulse ring */}
      <circle r={20} fill={color} fillOpacity={0}
        stroke={color} strokeWidth={1.5} strokeOpacity={0.35}
        style={{ animation: 'mapPulse 2.4s ease-in-out infinite' }}
      />
      {/* mid ring */}
      <circle r={10} fill={color} fillOpacity={isActive ? 0.25 : 0.12} />
      {/* inner dot */}
      <circle r={5} fill={color} fillOpacity={0.9} />
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
      <div className="w-full flex items-center justify-center" style={{ height: mapH }}>
        <div className="flex gap-2 items-center text-slate-400">
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

  // Build a colour lookup for highlighted countries
  const countryColorMap = new Map(IMPORT_COUNTRIES.map(c => [c.numericId, c.color]));

  return (
    <div ref={containerRef} className="relative w-full select-none">

      <svg viewBox={`0 0 ${W} ${mapH}`} className="w-full block"
        onMouseLeave={() => setTooltip(null)}>
        <defs>
          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>

          {/* Drop shadow for highlighted countries */}
          <filter id="countryShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Ocean — transparent, section background shows through */}
        {/* (no explicit rect — SVG background is transparent by default) */}

        {/* All non-highlighted land — very soft slate */}
        {(geo as any).features
          .filter((f: any) => !highlightSet.has(Number(f.id)))
          .map((f: any) => (
            <path key={f.id} d={pathGen(f) || ''}
              fill="#e2e8f0"
              stroke="#cbd5e1"
              strokeWidth="0.5"
            />
          ))}

        {/* Highlighted countries — soft brand-colour fill */}
        {(geo as any).features
          .filter((f: any) => highlightSet.has(Number(f.id)))
          .map((f: any) => {
            const col = countryColorMap.get(Number(f.id)) ?? '#22c55e';
            return (
              <path key={f.id} d={pathGen(f) || ''}
                fill={col + '28'}
                stroke={col}
                strokeWidth="1"
                filter="url(#countryShadow)"
              />
            );
          })}

        {/* Animated arcs from Bangladesh to each country */}
        {IMPORT_COUNTRIES.map((c, i) => (
          <ArcLine
            key={c.id}
            path={getArcPath(BANGLADESH.lat, BANGLADESH.lon, c.lat, c.lon)}
            color={c.color}
            delay={i * 0.3 + 0.4}
          />
        ))}

        {/* Bangladesh origin dot */}
        <g filter="url(#glow)">
          <circle cx={bdOrigin.x} cy={bdOrigin.y} r={7} fill="#166534" fillOpacity={0.15} />
          <circle cx={bdOrigin.x} cy={bdOrigin.y} r={4} fill="#166534" fillOpacity={0.9} />
          <circle cx={bdOrigin.x} cy={bdOrigin.y} r={2} fill="white" fillOpacity={0.95} />
        </g>
        <text x={bdOrigin.x + 9} y={bdOrigin.y + 4}
          fill="#166534" fillOpacity={0.85} fontSize="8.5" fontFamily="Inter,sans-serif" fontWeight="700">
          Bangladesh
        </text>

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
              textAnchor="middle"
              fill={c.color}
              fillOpacity={0.9}
              fontSize="9" fontFamily="Inter,sans-serif" fontWeight="700">
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
            className="absolute pointer-events-none z-20 rounded-2xl p-4 border"
            style={{
              left: tooltip.x + 14,
              top: tooltip.y - 70,
              background: 'rgba(255,255,255,0.95)',
              borderColor: tooltip.country.color + '40',
              minWidth: 190,
              backdropFilter: 'blur(12px)',
              boxShadow: `0 8px 32px ${tooltip.country.color}20, 0 2px 8px rgba(0,0,0,0.08)`,
            }}>
            <p className="font-bold text-sm mb-0.5 text-slate-800">
              {tooltip.country.flag} {tooltip.country.name}
            </p>
            <p className="text-xs mb-2.5 text-slate-500">
              {tooltip.country.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {tooltip.country.products.map(p => (
                <span key={p} className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: tooltip.country.color + '15', color: tooltip.country.color }}>
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
