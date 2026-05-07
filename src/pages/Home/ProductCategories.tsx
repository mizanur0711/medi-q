import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef, type ReactElement } from 'react';
import categoriesData from '../../data/categories.json';
import type { Category } from '../../types';

const categories = categoriesData as Category[];

const iconMap: Record<string, ReactElement> = {
  wind: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  wheelchair: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="8" cy="16" r="5" strokeWidth={1.5} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 19L16 8H13L11 4H8" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8L18 13.5" />
    </svg>
  ),
  bed: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 6h18M3 14h18M5 18h14a2 2 0 002-2v-4H3v4a2 2 0 002 2z" />
    </svg>
  ),
  activity: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  ),
  'test-tube': (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5h0c-1.4 0-2.5-1.1-2.5-2.5V2" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.5 2h7" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.5 16h-5" />
    </svg>
  ),
  shield: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  flame: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 7.1 10c-1.5 2 1.5 4 1.5 4s-1-2 1-3c2-2 3-5 1-9 0 0 5 2 7 9s0 6-3 6z" />
    </svg>
  ),
  thermometer: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 16.5A4.5 4.5 0 1115 16.5a4.5 4.5 0 01-6 0zM12 2v10M12 12a2 2 0 100 4 2 2 0 000-4z" />
    </svg>
  ),
  heart: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  droplet: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3c-4.418 7-8 10.4-8 14a8 8 0 1016 0c0-3.6-3.582-7-8-14z" />
    </svg>
  ),
  hand: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 11.5V6a2 2 0 014 0v5M11 9V4a2 2 0 014 0v7M15 10V5a2 2 0 014 0v9a8 8 0 01-16 0v-2.5a2 2 0 014 0V11.5" />
    </svg>
  ),
};

const gradients = [
  'from-green-500 to-emerald-600',
  'from-blue-500 to-blue-700',
  'from-purple-500 to-purple-700',
  'from-amber-500 to-orange-600',
  'from-teal-500 to-teal-700',
];

function CategoryCard({ cat, index }: { cat: Category; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.45, delay: index * 0.1 }}
    >
      <Link
        to={`/products?category=${cat.slug}`}
        className="group relative block rounded-2xl overflow-hidden aspect-[4/3] shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
      >
        {/* Gradient bg */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-90 group-hover:opacity-100 transition-opacity`} />
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative z-10 p-6 h-full flex flex-col justify-between">
          <div className="text-white/90 group-hover:scale-110 transition-transform duration-300 w-fit">
            {iconMap[cat.icon] ?? iconMap.activity}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{cat.name}</h3>
            <p className="text-white/80 text-sm leading-relaxed line-clamp-2">{cat.description}</p>
            <div className="mt-3 flex items-center gap-1 text-white font-semibold text-sm">
              Explore
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProductCategories() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <section id="categories" className="section-padding" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)' }}>
      <div className="container-custom">
        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">Our Portfolio</span>
          <h2 className="section-title">Product Categories</h2>
          <p className="section-subtitle">From precision surgical instruments to everyday diagnostic devices — browse our complete medical product range</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => <CategoryCard key={cat.id} cat={cat} index={i} />)}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }} className="text-center mt-10">
          <Link to="/products" className="btn-secondary">View All Products</Link>
        </motion.div>
      </div>
    </section>
  );
}
