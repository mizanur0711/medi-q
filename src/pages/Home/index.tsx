import { Helmet } from 'react-helmet-async';
import HeroSection from './HeroSection';
import WhyChooseMediQ from './WhyChooseMediQ';
import NewlyLaunched from './NewlyLaunched';
import ProductCategories from './ProductCategories';
import GlobalPresenceTeaser from './GlobalPresenceTeaser';
import FutureVisionTeaser from './FutureVisionTeaser';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>MEDI-Q | Live Life Healthier — Medical Goods Importer Bangladesh</title>
        <meta name="description" content="MEDI-Q is Bangladesh's trusted importer of surgical instruments, nebulizers, and medical devices since 2012. Quality healthcare products for hospitals and clinics nationwide." />
        <meta property="og:title" content="MEDI-Q — Live Life Healthier" />
        <meta property="og:description" content="Bangladesh's leading medical goods importer. Quality surgical instruments, nebulizers, and diagnostic devices." />
        <meta property="og:type" content="website" />
      </Helmet>
      <HeroSection />
      <WhyChooseMediQ />
      <ProductCategories />
      <NewlyLaunched />
      <GlobalPresenceTeaser />
      <FutureVisionTeaser />
    </>
  );
}
