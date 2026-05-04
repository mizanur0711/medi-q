import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollY } from '../../hooks/useScrollY';
import logo from '../../assets/Medi_Q_Logo-1-removebg-preview.png';

import categoriesData from '../../data/categories.json';

const productCategories = categoriesData;

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products', hasDropdown: true },
  { name: 'About', path: '/about' },
  { name: 'Our Journey', path: '/our-journey' },
  { name: 'Global Presence', path: '/global-presence' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const scrollY = useScrollY();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const isScrolled = scrollY > 40;
  // Only go transparent when on homepage AND user hasn't scrolled yet
  const isTransparent = isHome && !isScrolled;

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const linkClass = (isActive: boolean) => isTransparent
    ? `px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${isActive ? 'text-white bg-white/15' : 'text-white/90 hover:text-white hover:bg-white/10'}`
    : `px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${isActive ? 'text-green-700 bg-green-50' : 'text-slate-700 hover:text-green-700 hover:bg-green-50'}`;

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isTransparent ? 'bg-transparent py-4' : 'bg-white/95 backdrop-blur-md shadow-md py-2'}`}>
        <div className="container-custom flex items-center justify-between gap-6">
          <Link to="/" className="flex-shrink-0 flex flex-col items-center" onClick={() => setMobileOpen(false)}>
            <img
              src={logo}
              alt="MEDI-Q Logo"
              className={`transition-all duration-300 ${isTransparent ? 'h-[77px]' : 'h-[62px]'}`}
            />
            <span
              className={`transition-all duration-300 font-semibold tracking-widest uppercase leading-none ${
                isTransparent
                  ? 'text-white/80 text-[9px] -mt-1'
                  : 'text-green-700/70 text-[8px] -mt-1.5'
              }`}
              style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.18em' }}
            >
              Live Life Healthier
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.name} className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
                  <button
                    className={linkClass(false) + ' flex items-center gap-1'}
                    onClick={() => navigate('/products')}
                  >
                    {link.name}
                    <svg className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AnimatePresence>
                    {productsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 overflow-hidden"
                      >
                        <p className="px-4 pt-1 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">Browse by Category</p>
                        {productCategories.map((cat) => (
                          <Link key={cat.slug} to={`/products?category=${cat.slug}`}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-green-50 hover:text-green-800 transition-colors"
                            onClick={() => setProductsOpen(false)}>
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />{cat.name}
                          </Link>
                        ))}
                        <div className="border-t border-slate-100 mt-1 pt-1 px-3">
                          <Link to="/products" className="flex items-center gap-2 px-1 py-2 text-sm font-semibold text-green-700 hover:text-green-900 transition-colors" onClick={() => setProductsOpen(false)}>
                            View All Products
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink key={link.name} to={link.path} end={link.path === '/'}
                  className={({ isActive }) => linkClass(isActive)}>
                  {link.name}
                </NavLink>
              )
            )}
          </nav>

          <div className="hidden lg:flex">
            <Link to="/contact" className="btn-primary text-sm py-2.5 px-5">Get a Quote</Link>
          </div>

          <button id="mobile-menu-toggle"
            className={`lg:hidden p-2 rounded-lg transition-colors ${isTransparent ? 'text-white hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'}`}
            onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 rounded-full transition-all duration-300 ${isTransparent ? 'bg-white' : 'bg-slate-700'} ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 rounded-full transition-all duration-300 ${isTransparent ? 'bg-white' : 'bg-slate-700'} ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 rounded-full transition-all duration-300 ${isTransparent ? 'bg-white' : 'bg-slate-700'} ${mobileOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
            </div>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-72 bg-white shadow-2xl lg:hidden flex flex-col">
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <img src={logo} alt="MEDI-Q" className="h-12" />
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                  <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto py-4">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <NavLink to={link.path} end={link.path === '/'}
                      className={({ isActive }) => `block px-6 py-3.5 text-sm font-semibold transition-colors ${isActive ? 'text-green-700 bg-green-50 border-r-2 border-green-600' : 'text-slate-700 hover:bg-slate-50'}`}
                      onClick={() => setMobileOpen(false)}>{link.name}</NavLink>
                    {link.hasDropdown && (
                      <div className="bg-slate-50 py-1">
                        {productCategories.map((cat) => (
                          <Link key={cat.slug} to={`/products?category=${cat.slug}`}
                            className="flex items-center gap-2 px-10 py-2.5 text-xs text-slate-600 hover:text-green-700 transition-colors"
                            onClick={() => setMobileOpen(false)}>
                            <span className="w-1 h-1 rounded-full bg-green-400" />{cat.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="p-5 border-t border-slate-100">
                <Link to="/contact" className="btn-primary w-full justify-center text-sm" onClick={() => setMobileOpen(false)}>Get a Quote</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
