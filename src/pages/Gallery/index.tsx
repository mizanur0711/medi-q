import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

const galleryImages = [
  { id: 'img-1', src: '/images/gallery/Chattrogram Corporate office .jpeg', thumb: '/images/gallery/Chattrogram Corporate office .jpeg', caption: 'Chattrogram Corporate Office' },
  { id: 'img-2', src: '/images/gallery/Chattrogram Corporate office 2.jpeg', thumb: '/images/gallery/Chattrogram Corporate office 2.jpeg', caption: 'Chattrogram Corporate Office' },
  { id: 'img-3', src: '/images/gallery/Chattrogram office collage.jpeg', thumb: '/images/gallery/Chattrogram office collage.jpeg', caption: 'Chattrogram Office Collage' },
  { id: 'img-4', src: '/images/gallery/Welcome at guangzhou.jpeg', thumb: '/images/gallery/Welcome at guangzhou.jpeg', caption: 'Welcome at Guangzhou' },
  { id: 'img-5', src: '/images/gallery/Container loading at guangzhou.jpeg', thumb: '/images/gallery/Container loading at guangzhou.jpeg', caption: 'Container Loading at Guangzhou' },
  { id: 'img-6', src: '/images/gallery/Nebulizer mask bulk loading.webp', thumb: '/images/gallery/Nebulizer mask bulk loading.webp', caption: 'Nebulizer Mask Bulk Loading' },
  { id: 'img-7', src: '/images/gallery/Abroad Visit.webp', thumb: '/images/gallery/Abroad Visit.webp', caption: 'Abroad Visit' },
  { id: 'img-8', src: '/images/gallery/Abroad visit 3.jpeg', thumb: '/images/gallery/Abroad visit 3.jpeg', caption: 'Abroad Visit' },
  { id: 'img-9', src: '/images/gallery/abroad visit 4.webp', thumb: '/images/gallery/abroad visit 4.webp', caption: 'Abroad Visit' },
  { id: 'img-10', src: '/images/gallery/Price giving at Cricket Match.jpeg', thumb: '/images/gallery/Price giving at Cricket Match.jpeg', caption: 'Prize Giving at Cricket Match' },
  { id: 'img-11', src: '/images/gallery/supplier.jpeg', thumb: '/images/gallery/supplier.jpeg', caption: 'Supplier' },
  { id: 'img-12', src: '/images/gallery/visit.jpeg', thumb: '/images/gallery/visit.jpeg', caption: 'Visit' },
].reverse();

export default function GalleryPage() {
  const [index, setIndex] = useState(-1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <>
      <Helmet>
        <title>Gallery | MEDI-Q</title>
        <meta name="description" content="Photos from MEDI-Q events, product showcases, hospital partnerships, and team activities." />
      </Helmet>
      <div className="pt-24 min-h-screen bg-slate-50">
        <div className="bg-brand-gradient text-white py-16">
          <div className="container-custom text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-green-300 text-sm font-semibold mb-5">Our Moments</span>
              <h1 className="heading-xl text-white mb-3">Gallery</h1>
              <p className="text-white/75">Events, partnerships, and milestones captured</p>
            </motion.div>
          </div>
        </div>

        <section className="section-padding">
          <div className="container-custom">
            <div ref={ref} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((img, i) => (
                <motion.button
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setIndex(i)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1 cursor-pointer"
                >
                  <img src={img.thumb} alt={img.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-xs font-medium text-left">{img.caption}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={galleryImages.map((img) => ({ src: img.src, alt: img.caption }))}
        on={{ view: ({ index: i }) => setIndex(i) }}
      />
    </>
  );
}
