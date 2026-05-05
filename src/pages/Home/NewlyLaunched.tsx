import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import productsData from '../../data/products.json';
import type { Product } from '../../types';

const newProducts: Product[] = (productsData as Product[]).filter((p) => p.isNew);

function ProductCard({ product, index }: { product: Product; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <Link to={`/products/${product.slug}`} className="product-card flex-shrink-0 w-64 block group">
        <div className="aspect-square bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center relative overflow-hidden">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <svg className="w-24 h-24 text-green-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 14v-4H7l5-8v4h4l-5 8z" />
            </svg>
          )}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-0.5 bg-green-600 text-white text-xs font-bold rounded-full">NEW</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="p-4">
          <p className="text-xs text-green-600 font-semibold uppercase tracking-wider mb-1">{product.category}</p>
          <h3 className="text-sm font-bold text-slate-900 leading-snug mb-2 group-hover:text-green-700 transition-colors line-clamp-2">{product.name}</h3>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
            </svg>
            Origin: {product.origin}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function NewlyLaunched() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  if (newProducts.length === 0) return null;

  return (
    <section id="newly-launched" className="section-padding bg-white">
      <div className="container-custom">
        <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="flex items-end justify-between mb-10">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-semibold mb-3">Just Arrived</span>
            <h2 className="section-title text-left">Newly Launched</h2>
            <p className="text-slate-500 mt-2 max-w-xl">Our latest additions — cutting-edge medical products now available for procurement.</p>
          </div>
          <Link to="/products?new=true" className="hidden sm:flex btn-secondary text-sm py-2.5 px-5">
            View All New
          </Link>
        </motion.div>
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-5">
            {newProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
        <div className="mt-6 sm:hidden">
          <Link to="/products?new=true" className="btn-secondary text-sm py-2.5 px-5 w-full justify-center">View All New</Link>
        </div>
      </div>
    </section>
  );
}
