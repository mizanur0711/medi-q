import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/layout/Layout';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import OurJourneyPage from './pages/OurJourney';
import ProductListingPage from './pages/Products/ProductListingPage';
import ProductDetailPage from './pages/Products/ProductDetailPage';
import ProductFamilyPage from './pages/Products/ProductFamilyPage';
import GlobalPresencePage from './pages/GlobalPresence';
import GalleryPage from './pages/Gallery';
import ContactPage from './pages/Contact';
import NotFoundPage from './pages/NotFound';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/our-journey" element={<OurJourneyPage />} />
            <Route path="/products" element={<ProductListingPage />} />
            <Route path="/products/family/:family" element={<ProductFamilyPage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
            <Route path="/global-presence" element={<GlobalPresencePage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
