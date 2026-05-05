import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import productsData from '../../data/products.json';
import type { Product } from '../../types';

const allProducts = productsData as Product[];

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = allProducts.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">🔍</p>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Product Not Found</h2>
          <Link to="/products" className="btn-primary mt-4">Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} | MEDI-Q</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={`${product.name} | MEDI-Q`} />
        <meta property="og:description" content={product.description} />
      </Helmet>
      <div className="pt-24 min-h-screen bg-slate-50">
        {/* Breadcrumb */}
        <div className="bg-brand-gradient text-white py-10">
          <div className="container-custom">
            <div className="flex items-center gap-2 text-green-300 text-sm mb-3">
              <Link to="/" className="hover:text-white">Home</Link>
              <span>/</span>
              <Link to="/products" className="hover:text-white">Products</Link>
              <span>/</span>
              <Link to={`/products?category=${product.family}`} className="hover:text-white capitalize">{product.category}</Link>
              <span>/</span>
              <span className="text-white">{product.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="heading-md text-white">{product.name}</h1>
              {product.isNew && <span className="px-3 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full">NEW</span>}
            </div>
          </div>
        </div>

        <div className="container-custom py-12 print-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="bg-white rounded-3xl shadow-card overflow-hidden aspect-square flex items-center justify-center">
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-4 text-slate-300">
                  <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 14v-4H7l5-8v4h4l-5 8z" />
                  </svg>
                  <p className="text-sm text-slate-400">Product image coming soon</p>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 flex-wrap mb-3">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">{product.category}</span>
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-full flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945" />
                    </svg>
                    Origin: {product.origin}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Features */}
              <div className="bg-white rounded-2xl p-6 shadow-card">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Key Features
                </h3>
                <ul className="space-y-2.5">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 no-print">
                {product.specSheetUrl ? (
                  <a href={product.specSheetUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Spec Sheet
                  </a>
                ) : (
                  <Link to="/contact" className="btn-primary">
                    Request Spec Sheet
                  </Link>
                )}
                <button onClick={() => window.print()} className="btn-secondary">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  Print
                </button>
                <Link to="/contact" className="btn-secondary">
                  Enquire Now
                </Link>
              </div>
            </div>
          </div>

          {/* Related products */}
          <div className="mt-16">
            <h2 className="heading-md text-slate-900 mb-6">More in {product.category}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4).map((p) => (
                <Link key={p.id} to={`/products/${p.slug}`} className="product-card p-4 group">
                  <div className="aspect-square bg-green-50 rounded-xl flex items-center justify-center mb-3 overflow-hidden">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <svg className="w-10 h-10 text-green-200" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 14v-4H7l5-8v4h4l-5 8z" />
                      </svg>
                    )}
                  </div>
                  <p className="text-xs font-bold text-slate-800 group-hover:text-green-700 transition-colors line-clamp-2">{p.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
