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
  scissors: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
    </svg>
  ),
  activity: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
    </svg>
  ),
  shield: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  bed: (
    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M3 6h18M3 14h18M5 18h14a2 2 0 002-2v-4H3v4a2 2 0 002 2z" />
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
