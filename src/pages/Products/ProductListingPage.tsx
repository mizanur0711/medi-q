import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import productsData from '../../data/products.json';
import categoriesData from '../../data/categories.json';
import type { Product, Category } from '../../types';

const allProducts = productsData as Product[];
const categories = categoriesData as Category[];

function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
    >
      <Link to={`/products/${product.slug}`} className="product-card flex flex-col group block h-full">
        <div className="aspect-square bg-gradient-to-br from-green-50 to-emerald-100 relative overflow-hidden">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-20 h-20 text-green-200" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 14v-4H7l5-8v4h4l-5 8z" />
              </svg>
            </div>
          )}
          {product.isNew && (
            <span className="absolute top-3 left-3 px-2 py-0.5 bg-green-600 text-white text-xs font-bold rounded-full">NEW</span>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-5 flex flex-col flex-1">
          <p className="text-xs text-green-600 font-semibold uppercase tracking-wider mb-1">{product.category}</p>
          <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-green-700 transition-colors line-clamp-2 flex-1">{product.name}</h3>
          <p className="text-sm text-slate-500 line-clamp-2 mb-3">{product.description}</p>
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945" />
              </svg>
              {product.origin}
            </span>
            <span className="text-xs font-semibold text-green-700 group-hover:text-green-800 flex items-center gap-1">
              Details
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      return activeCategory ? p.family === activeCategory || p.category.toLowerCase().replace(/[^a-z]/g, '-') === activeCategory : true;
    });
  }, [activeCategory]);

  const activeLabel = categories.find((c) => c.slug === activeCategory)?.name || 'All Products';

  return (
    <>
      <Helmet>
        <title>{activeLabel} | MEDI-Q Products</title>
        <meta name="description" content="Browse MEDI-Q's complete range of medical products — nebulizers, surgical instruments, diagnostic devices, PPE, and hospital furniture." />
      </Helmet>
      <div className="pt-24 min-h-screen bg-slate-50">
        {/* Header */}
        <div className="bg-brand-gradient text-white py-12">
          <div className="container-custom relative">
            <div className="flex items-center gap-2 text-green-300 text-sm mb-3">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span>Products</span>
              {activeCategory && <><span>/</span><span>{activeLabel}</span></>}
            </div>
            <h1 className="heading-lg text-white mb-2">{activeLabel}</h1>
            <p className="text-white/70">{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
          </div>
        </div>

        <div className="container-custom py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-60 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-card p-5 sticky top-24">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">Categories</h3>
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setSearchParams({})}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors ${!activeCategory ? 'bg-green-600 text-white font-semibold' : 'text-slate-600 hover:bg-green-50 hover:text-green-700'}`}
                    >
                      All Products
                      <span className="float-right text-xs opacity-70">{allProducts.length}</span>
                    </button>
                  </li>
                  {categories.map((cat) => {
                    const count = allProducts.filter((p) => p.family === cat.slug).length;
                    return (
                      <li key={cat.id}>
                        <button
                          onClick={() => setSearchParams({ category: cat.slug })}
                          className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors ${activeCategory === cat.slug ? 'bg-green-600 text-white font-semibold' : 'text-slate-600 hover:bg-green-50 hover:text-green-700'}`}
                        >
                          {cat.name}
                          <span className="float-right text-xs opacity-70">{count}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>

            {/* Main */}
            <div className="flex-1">

              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-4xl mb-3">📦</p>
                  <p className="text-slate-600 font-medium">No products found</p>
                  <p className="text-slate-400 text-sm mt-1">Try selecting a different category</p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout" initial={false}>
                  <div key={activeCategory} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
                  </div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
