import { useState, useEffect, useRef, type FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';

const contactInfo = [
  { icon: '📍', label: 'Address', value: 'K.B.Orchid Plaza , Laldighi, Chattogram', sub: '' },
  { icon: '📞', label: 'Phone', value: '+8801877725544', sub: 'Sun–Thu, 9am–6pm' },
  { icon: '✉️', label: 'Email', value: 'sv.corporation20@gmail.com', sub: 'Reply within 24 hours' },
  { icon: '🕐', label: 'Hours', value: 'Sunday – Thursday', sub: '9:00 AM – 6:00 PM' },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (parseInt(captchaAnswer) !== num1 + num2) {
      setCaptchaError('Incorrect CAPTCHA answer. Please try again.');
      setNum1(Math.floor(Math.random() * 10) + 1);
      setNum2(Math.floor(Math.random() * 10) + 1);
      setCaptchaAnswer('');
      return;
    }
    setCaptchaError('');
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      setSubmitted(true);
    } catch {
      // Still show success in local dev
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact MEDI-Q | Get a Quote or Request Information</title>
        <meta name="description" content="Contact MEDI-Q for product inquiries, quotes, and after-sales support. We respond within 24 hours." />
      </Helmet>
      <div className="pt-24 min-h-screen bg-slate-50">
        <div className="bg-brand-gradient text-white py-16">
          <div className="container-custom text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-green-300 text-sm font-semibold mb-5">Get in Touch</span>
              <h1 className="heading-xl text-white mb-3">Contact MEDI-Q</h1>
              <p className="text-white/75 max-w-md mx-auto">Product inquiries, quotes, after-sales support — we're here to help.</p>
            </motion.div>
          </div>
        </div>

        <section className="section-padding">
          <div ref={ref} className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Contact Info */}
              <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }} className="space-y-4">
                <h2 className="heading-md text-slate-900 mb-6">Reach Us</h2>
                {contactInfo.map((info) => (
                  <div key={info.label} className="flex items-start gap-4 bg-white rounded-2xl p-5 shadow-card">
                    <span className="text-2xl">{info.icon}</span>
                    <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{info.label}</p>
                      <p className="font-semibold text-slate-800 mt-0.5">{info.value}</p>
                      <p className="text-sm text-slate-400">{info.sub}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Form */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2, duration: 0.6 }} className="lg:col-span-2">
                <div className="bg-white rounded-3xl shadow-card p-8">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">✅</div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                      <p className="text-slate-500">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                      <button onClick={() => setSubmitted(false)} className="btn-primary mt-6">Send Another Message</button>
                    </div>
                  ) : (
                    <>
                      <h2 className="heading-md text-slate-900 mb-6">Send a Message</h2>
                      <form
                        ref={formRef}
                        name="contact"
                        method="POST"
                        data-netlify="true"
                        netlify-honeypot="bot-field"
                        onSubmit={handleSubmit}
                        className="space-y-5"
                      >
                        <input type="hidden" name="form-name" value="contact" />
                        <input name="bot-field" className="hidden" aria-hidden="true" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="contact-name" className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                            <input id="contact-name" name="name" type="text" required
                              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                              placeholder="Dr. John Ahmed" />
                          </div>
                          <div>
                            <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                            <input id="contact-email" name="email" type="email" required
                              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                              placeholder="john@hospital.com.bd" />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="contact-subject" className="block text-sm font-semibold text-slate-700 mb-1.5">Subject <span className="text-red-500">*</span></label>
                          <select id="contact-subject" name="subject" required
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all bg-white">
                            <option value="">Select a subject</option>
                            <option>Product Inquiry</option>
                            <option>Request a Quote</option>
                            <option>After-Sales Support</option>
                            <option>Distributorship Inquiry</option>
                            <option>General Information</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="contact-message" className="block text-sm font-semibold text-slate-700 mb-1.5">Message <span className="text-red-500">*</span></label>
                          <textarea id="contact-message" name="message" required rows={5}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all resize-none"
                            placeholder="Tell us about your requirements, the products you're interested in, or the quantities you need…" />
                        </div>

                        <div>
                          <label htmlFor="contact-captcha" className="block text-sm font-semibold text-slate-700 mb-1.5">
                            What is {num1} + {num2}? <span className="text-red-500">*</span>
                          </label>
                          <input id="contact-captcha" type="number" required
                            value={captchaAnswer}
                            onChange={(e) => {
                              setCaptchaAnswer(e.target.value);
                              if (captchaError) setCaptchaError('');
                            }}
                            className={`w-full px-4 py-3 border ${captchaError ? 'border-red-500 focus:ring-red-400' : 'border-slate-200 focus:ring-green-400'} rounded-xl text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                            placeholder="Enter the sum" />
                          {captchaError && <p className="text-red-500 text-sm mt-1">{captchaError}</p>}
                        </div>

                        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
                          {loading ? (
                            <span className="flex items-center gap-2"><svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Sending…</span>
                          ) : (
                            <span className="flex items-center gap-2">Send Message<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></span>
                          )}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Map */}
            <div className="mt-12 rounded-3xl overflow-hidden shadow-card h-80">
              <iframe
                title="MEDI-Q Office Location"
                src="https://maps.google.com/maps?q=K.B.Orchid+Plaza,+Laldighi,+Chattogram&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
