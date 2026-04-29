import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import productsData from '../../data/products.json';
import type { Product } from '../../types';

const allProducts = productsData as Product[];

const familyInfo: Record<string, { title: string; description: string; features: string[] }> = {
  nebulizers: {
    title: 'MEDI-Q Nebulizer Family',
    description: "Bangladesh's largest nebulizer range — 12 models engineered for home care, pediatric therapy, outpatient clinics, and ICU environments. Every MEDI-Q nebulizer is sourced from certified manufacturers in Germany, Japan, and China.",
    features: ['CE & ISO 13485 certified manufacturers', 'Particle size MMAD < 5μm for effective lung delivery', 'Ranges from portable battery-powered to ICU-grade continuous duty', 'Full spare parts and service support in Bangladesh', 'Compatible adult and pediatric accessories included'],
  },
  'surgical-instruments': {
    title: 'Surgical Instruments',
    description: 'Premium surgical instruments from certified European manufacturers, designed for general surgery, OB-GYN, ENT, and other specialties.',
    features: ['316L surgical-grade stainless steel', 'Autoclavable at 134°C', 'CE marked and ISO certified', 'Mirror and satin finish options', 'Full range from basic to tungsten carbide premium grade'],
  },
};

export default function ProductFamilyPage() {
  const { family } = useParams<{ family: string }>();
  const familyProducts = allProducts.filter((p) => p.family === family);
  const info = familyInfo[family || ''] || { title: `${family} Products`, description: 'Browse our full range of products in this category.', features: [] };

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <>
      <Helmet>
        <title>{info.title} | MEDI-Q</title>
        <meta name="description" content={info.description} />
      </Helmet>
      <div className="pt-24 min-h-screen bg-slate-50">
        <div className="bg-brand-gradient text-white py-14">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-green-300 text-sm mb-4">
              <Link to="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link to="/products" className="hover:text-white">Products</Link>
              <span>/</span>
              <span className="text-white capitalize">{family?.replace(/-/g, ' ')}</span>
            </div>
            <h1 className="heading-lg text-white mb-4">{info.title}</h1>
            <p className="text-white/75 max-w-2xl leading-relaxed mb-6">{info.description}</p>
            {info.features.length > 0 && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {info.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="container-custom py-12">
          <p className="text-slate-500 text-sm mb-6">{familyProducts.length} models available</p>
          <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {familyProducts.map((product, i) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08 }}>
                <Link to={`/products/${product.slug}`} className="product-card flex flex-col h-full group">
                  <div className="aspect-square bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center relative">
                    <svg className="w-16 h-16 text-green-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 14v-4H7l5-8v4h4l-5 8z" />
                    </svg>
                    {product.isNew && <span className="absolute top-2 left-2 px-2 py-0.5 bg-green-600 text-white text-xs font-bold rounded-full">NEW</span>}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-green-700 transition-colors mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-slate-500 mb-2 flex-1 line-clamp-2">{product.description}</p>
                    <span className="text-xs text-slate-400">Origin: {product.origin}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
