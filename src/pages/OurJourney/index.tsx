import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export default function OurJourneyPage() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const timelineEvents = [
    {
      year: "1969",
      title: "The Beginning",
      description: "Founded in Riazuddin Bazar, Chattogram as a small shop focused on surgical products and imported medicines.",
    },
    {
      year: "Growth Phase",
      title: "National Expansion",
      description: "Expanded distribution across Bangladesh, building a strong reputation for dedication, ethical practices, and consistent quality.",
    },
    {
      year: "Present",
      title: "Market Leader",
      description: "Operating from Azam Plaza, serving thousands of customers daily and distributing to over 200 partner shops across the country.",
    }
  ];

  return (
    <>
      <Helmet>
        <title>Our Journey | Service &amp; Corporation - MEDI-Q</title>
        <meta name="description" content="Discover the legacy of Service & Corporation, the mother company of MEDI-Q. Established in 1969, we've built a legacy of trust and quality in Bangladesh's healthcare supply industry." />
      </Helmet>

      <div className="pt-24 min-h-screen bg-slate-50">
        {/* Hero Section */}
        <div className="bg-brand-gradient text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          <div className="container-custom text-center relative z-10">
            <motion.div ref={headerRef} initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
              <span className="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/20 text-green-200 text-sm font-semibold tracking-wide uppercase mb-6 shadow-sm backdrop-blur-sm">Mother Company Legacy</span>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md">Our Journey Since <span className="text-gradient-gold">1969</span></h1>
              <p className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                "Building credibility, legacy, and trust through decades of dedication to healthcare accessibility."
              </p>
            </motion.div>
          </div>
        </div>

        {/* Founder Spotlight */}
        <section className="section-padding bg-white relative">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-slate-50"></div>
          <div className="container-custom relative z-10">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100/50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
                <div className="lg:col-span-2 bg-gradient-to-br from-slate-100 to-slate-200 aspect-square md:aspect-auto flex items-center justify-center p-12 relative overflow-hidden group">
                  {/* Image Placeholder */}
                  <div className="w-full h-full border-2 border-dashed border-slate-400/50 rounded-2xl flex flex-col items-center justify-center text-slate-500 bg-white/50 backdrop-blur-sm transition-all duration-300 group-hover:bg-white/80 group-hover:border-slate-400">
                    <svg className="w-16 h-16 mb-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-semibold tracking-wide">Founder Image Placeholder</span>
                    <span className="text-sm mt-1 opacity-70">Dimensions: 800x1000px</span>
                  </div>
                </div>
                <div className="p-10 lg:p-16 lg:col-span-3 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest mb-6 w-max border border-green-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> The Visionary
                  </div>
                  <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Md. Nurul Amin</h2>
                  <p className="text-lg text-green-600 font-medium mb-6">Founder, Service &amp; Corporation</p>
                  
                  <div className="space-y-5 text-slate-600 leading-relaxed text-lg">
                    <p>
                      In 1969, Md. Nurul Amin laid the foundation of Service &amp; Corporation in Riazuddin Bazar, Chattogram. What started as a small shop focused on surgical products and imported medicines has blossomed into a nationwide legacy.
                    </p>
                    <p>
                      His vision was built on a simple yet profound philosophy: <strong className="text-slate-800 font-semibold bg-green-50 px-1 rounded">"The customer is the boss."</strong> This customer-first approach, combined with a relentless commitment to long-term business sustainability, quality assurance, and ethical operations, established the brand trust and reliability we are known for today.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Growth Metrics */}
        <section className="py-16 bg-green-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-green-800 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-green-950 rounded-full blur-3xl opacity-50"></div>
          <div className="container-custom relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-green-800/50">
              {[
                { label: 'Founded', value: '1969' },
                { label: 'Partner Shops', value: '200+' },
                { label: 'Daily Customers', value: '1,000+' },
                { label: 'Annual Growth', value: '10.8%' },
              ].map((metric, idx) => (
                <div key={idx} className="text-center px-4">
                  <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-green-200 mb-2">{metric.value}</div>
                  <div className="text-green-300 font-medium tracking-wide uppercase text-sm">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Visualization */}
        <section className="section-padding bg-slate-50">
          <div className="container-custom max-w-4xl">
            <div className="text-center mb-16">
               <span className="inline-block px-4 py-1.5 rounded-full bg-slate-200/50 text-slate-600 text-sm font-semibold mb-4 border border-slate-200">Timeline</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Decades of Excellence</h2>
            </div>
            
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-green-300 via-emerald-400 to-green-600 rounded-full transform md:-translate-x-1/2 opacity-30"></div>
              
              <div className="space-y-12 relative z-10">
                {timelineEvents.map((event, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div key={index} className="flex flex-col md:flex-row items-center justify-between group">
                      {/* Left content (visible on desktop for even items) */}
                      <div className={`hidden md:block w-5/12 ${isEven ? 'text-right pr-8' : 'opacity-0'}`}>
                        {isEven && (
                          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <span className="text-3xl font-black text-green-600 opacity-20 block mb-2">{event.year}</span>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{event.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">{event.description}</p>
                          </div>
                        )}
                      </div>

                      {/* Center Node */}
                      <div className="w-8 md:w-2/12 flex justify-center relative">
                        <div className="w-10 h-10 rounded-full bg-white border-4 border-green-500 shadow-md flex items-center justify-center z-10 group-hover:scale-110 transition-transform duration-300 group-hover:border-green-600">
                          <div className="w-3 h-3 rounded-full bg-green-500 group-hover:bg-green-600 transition-colors"></div>
                        </div>
                      </div>

                      {/* Right content (visible on mobile, and desktop for odd items) */}
                      <div className={`w-11/12 md:w-5/12 pl-6 md:pl-8 md:text-left ${!isEven ? 'block' : 'md:opacity-0 hidden md:block'}`}>
                        {(!isEven || window.innerWidth < 768) && (
                           <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                             <span className="text-3xl font-black text-green-600 opacity-20 block mb-2">{event.year}</span>
                             <h3 className="text-xl font-bold text-slate-900 mb-2">{event.title}</h3>
                             <p className="text-slate-600 text-sm leading-relaxed">{event.description}</p>
                           </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision (Mother Company) */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                 <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Our Mission &amp; Vision</h2>
                 <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    Service &amp; Corporation aims to become a leading importer and supplier of surgical products by delivering high-quality, affordable healthcare solutions.
                 </p>
                 <p className="text-lg text-slate-600 leading-relaxed">
                    We focus on innovation, ethical practices, and building long-term partnerships while maintaining global quality standards.
                 </p>
                 <div className="mt-8">
                    <Link to="/products" className="btn-primary">Explore Our Products</Link>
                 </div>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                 <h3 className="text-xl font-bold text-slate-900 mb-6">Core Values</h3>
                 <ul className="space-y-4">
                    {[
                      "Customer-first approach",
                      "Long-term business sustainability",
                      "Quality assurance",
                      "Ethical operations",
                      "Brand trust and reliability"
                    ].map((value, idx) => (
                      <li key={idx} className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 text-green-600">
                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                           </svg>
                        </div>
                        <span className="text-slate-700 font-medium text-lg">{value}</span>
                      </li>
                    ))}
                 </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
