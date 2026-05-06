import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import teamData from '../../data/team.json';
import milestonesData from '../../data/milestones.json';
import type { TeamMember, Milestone } from '../../types';

const team = teamData as TeamMember[];
const milestones = milestonesData as Milestone[];

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.15 }}
      className="bg-white rounded-2xl shadow-card overflow-hidden">
      <div className="aspect-[4/3] bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-white/50 flex items-center justify-center">
          <svg className="w-10 h-10 text-green-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-slate-900 text-lg">{member.name}</h3>
        <p className="text-green-600 text-sm font-medium mb-3">{member.title}</p>
        <p className="text-slate-500 text-sm leading-relaxed">{expanded ? member.bio : member.shortBio}</p>
        <button onClick={() => setExpanded(!expanded)} className="mt-3 text-sm font-semibold text-green-700 hover:text-green-900 flex items-center gap-1 transition-colors">
          {expanded ? 'Show less' : 'Read more'}
          <svg className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

function MilestoneItem({ milestone, index, total }: { milestone: Milestone; index: number; total: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const isLeft = index % 2 === 0;
  return (
    <div ref={ref} className="relative flex items-center gap-0">
      {/* Left content */}
      <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}
        className={`flex-1 ${isLeft ? 'pr-8 text-right' : 'pr-8 invisible'}`}>
        {isLeft && (
          <div className="bg-white rounded-2xl p-5 shadow-card inline-block text-left">
            <span className="text-green-600 font-bold text-lg">{milestone.year}</span>
            <h4 className="font-bold text-slate-900 mt-1">{milestone.title}</h4>
            <p className="text-slate-500 text-sm mt-1 leading-relaxed">{milestone.description}</p>
          </div>
        )}
      </motion.div>
      {/* Center dot */}
      <div className="flex flex-col items-center flex-shrink-0 w-6">
        <motion.div initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 0.2, type: 'spring' }}
          className="w-4 h-4 rounded-full border-2 border-green-600 bg-white z-10" />
        {index < total - 1 && <div className="w-0.5 flex-1 bg-green-200 mt-1" style={{ minHeight: 40 }} />}
      </div>
      {/* Right content */}
      <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}
        className={`flex-1 ${!isLeft ? 'pl-8' : 'pl-8 invisible'}`}>
        {!isLeft && (
          <div className="bg-white rounded-2xl p-5 shadow-card inline-block">
            <span className="text-green-600 font-bold text-lg">{milestone.year}</span>
            <h4 className="font-bold text-slate-900 mt-1">{milestone.title}</h4>
            <p className="text-slate-500 text-sm mt-1 leading-relaxed">{milestone.description}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function AboutPage() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <>
      <Helmet>
        <title>About MEDI-Q | Bangladesh's Trusted Medical Goods Importer Since 2012</title>
        <meta name="description" content="Learn about MEDI-Q — founded in 2012 by MD Jahedul Alam, we import world-class surgical instruments, nebulizers, and medical devices for Bangladesh's healthcare sector." />
      </Helmet>
      <div className="pt-24 min-h-screen">
        {/* Hero */}
        <div className="bg-brand-gradient text-white py-20">
          <div className="container-custom text-center">
            <motion.div ref={headerRef} initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-green-300 text-sm font-semibold mb-5">About MEDI-Q</span>
              <h1 className="heading-xl text-white mb-5">Trusted Quality.<br /><span className="text-gradient-gold">Since 2012.</span></h1>
              <p className="text-white/75 text-lg max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}>
                "Our mission is to provide superior products that meet the evolving needs of our customers while upholding our reputation for quality, integrity, and trust."
              </p>
            </motion.div>
          </div>
        </div>

        {/* Story */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">Our Story</span>
                <h2 className="heading-md text-slate-900 mb-5">Built on Purpose.<br />Driven by Healthcare.</h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>Established in 2012, <strong className="text-slate-800">MEDI-Q</strong> is a distinguished sister concern of Service &amp; Corporation, founded by <strong className="text-slate-800">MD Jahedul Alam</strong>, son of MD Nurul Amin. As a fully import-oriented enterprise, MEDI-Q offers a diverse portfolio of high-quality products under its own brand, earning strong recognition and trust within the Bangladeshi market.</p>
                  <p>At MEDI-Q, excellence and customer satisfaction are at the core of everything we do, reflected in our tagline: <strong className="text-slate-800">“Live Life Healthier.”</strong> In today’s increasingly competitive and globalized marketplace, we remain committed to delivering products that meet the highest standards of quality, safety, and reliability.</p>
                  <p>Over the years, MEDI-Q has achieved impressive growth, marked by a steady increase in turnover and a strengthening market presence. This progress reflects our unwavering dedication to excellence and continuous improvement. Our mission is to provide superior products that meet the evolving needs of our customers while upholding our reputation for quality, integrity, and trust.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '2012', label: 'Founded' }, { value: '12+', label: 'Years Experience' },
                  { value: '500+', label: 'Healthcare Partners' }, { value: '13', label: 'Nebulizer Models' },
                  { value: '8', label: 'Divisions Served' }, { value: '4', label: 'Import Countries' },
                ].map((s) => (
                  <div key={s.label} className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-5 text-center">
                    <div className="text-3xl font-extrabold text-gradient-green">{s.value}</div>
                    <div className="text-sm text-slate-500 mt-1 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding bg-section-gradient">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: '🎯', title: 'Our Mission', text: 'To provide superior products that meet the evolving needs of our customers while upholding our reputation for quality, integrity, and trust.' },
                { icon: '👁️', title: 'Our Vision', text: 'To become Bangladesh\'s leading medical goods company — transitioning from import excellence toward local manufacturing of surgical and medical devices.' },
                { icon: '💚', title: 'Our Tagline', text: '"Live Life Healthier" — a commitment not just to our customers, but to every patient whose life is touched by the products we supply.', tagline: true },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-2xl p-8 shadow-card text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-slate-900 text-xl mb-3">{item.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm" style={item.tagline ? { fontFamily: "'Playfair Display', serif", fontStyle: 'italic' } : {}}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">Leadership</span>
              <h2 className="section-title">The People Behind MEDI-Q</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {team.map((member, i) => <TeamCard key={member.id} member={member} index={i} />)}
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="section-padding bg-section-gradient">
          <div className="container-custom max-w-3xl">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">Our Journey</span>
              <h2 className="section-title">Milestones</h2>
            </div>
            <div className="flex flex-col gap-6">
              {milestones.map((ms, i) => <MilestoneItem key={ms.id} milestone={ms} index={i} total={milestones.length} />)}
            </div>
          </div>
        </section>

        {/* Mother Company */}
        <section className="section-padding bg-white">
          <div className="container-custom text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">Our Group</span>
            <h2 className="section-title mb-4">Mother Company</h2>
            <p className="text-slate-500 mb-8 max-w-2xl mx-auto leading-relaxed">
              MEDI-Q is backed by Service &amp; Corporation, a well-established name in Bangladesh’s healthcare supply industry since 1969. This strong foundation enables MEDI-Q to maintain high product standards, reliable sourcing, and continuous growth.
            </p>
            <Link to="/our-journey" className="inline-block bg-slate-50 border border-slate-200 rounded-3xl px-12 py-8 shadow-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-24 h-24 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-bold text-slate-800 text-2xl mb-2 group-hover:text-green-700 transition-colors">Service &amp; Corporation</h3>
              <p className="text-slate-500 text-sm mb-4">Established in 1969</p>
              <div className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm">
                Discover Our Journey
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
          </div>
        </section>

        {/* Future Vision */}
        <section className="section-padding bg-brand-gradient relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="container-custom relative z-10 max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-green-300 text-sm font-semibold mb-6">Future Vision</span>
            <h2 className="text-4xl font-bold text-white mb-5">Made in Bangladesh.<br /><span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, #4ade80, #fbbf24)' }}>For Bangladesh.</span></h2>
            <p className="text-white/75 text-lg leading-relaxed">Our long-term vision is to transition from importing excellence toward establishing local manufacturing of surgical instruments and medical devices — creating jobs, reducing costs, and building a more resilient healthcare supply chain for Bangladesh.</p>
          </div>
        </section>
      </div>
    </>
  );
}
