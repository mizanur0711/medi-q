import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const contacts = [
  { id: 'whatsapp', label: 'WhatsApp', href: 'https://wa.me/', color: 'bg-green-500', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> },
  { id: 'messenger', label: 'Messenger', href: 'https://m.me/', color: 'bg-blue-500', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 4.975 0 11.111c0 3.497 1.745 6.616 4.472 8.652V24l4.086-2.242c1.09.301 2.246.464 3.442.464 6.626 0 12-4.974 12-11.111C24 4.975 18.626 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.26L19.752 8l-6.561 6.963z"/></svg> },
  { id: 'wechat', label: 'WeChat', href: '#', color: 'bg-emerald-500', icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.295.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-5.972 2.981-7.853 1.764-1.139 3.907-1.438 5.961-1.063C17.561 4.152 13.451 2.188 8.691 2.188zm-2.47 4.738c.472 0 .855.383.855.855 0 .472-.383.855-.855.855a.856.856 0 0 1-.855-.855c0-.472.383-.855.855-.855zm4.859 0c.472 0 .855.383.855.855 0 .472-.383.855-.855.855a.856.856 0 0 1-.855-.855c0-.472.383-.855.855-.855zm7.681 1.618c-4.395 0-7.952 2.928-7.952 6.539 0 3.611 3.557 6.538 7.952 6.538.882 0 1.729-.132 2.519-.358a.736.736 0 0 1 .617.086l1.637.958a.281.281 0 0 0 .143.046.254.254 0 0 0 .254-.254c0-.062-.025-.118-.04-.18l-.334-1.272a.506.506 0 0 1 .183-.572c1.574-1.134 2.573-2.811 2.573-4.594 0-3.61-3.557-6.537-7.952-6.537zm-3.208 4.205c.406 0 .735.33.735.735a.736.736 0 0 1-.735.735.736.736 0 0 1-.735-.735c0-.406.33-.735.735-.735zm6.416 0c.406 0 .735.33.735.735a.736.736 0 0 1-.735.735.736.736 0 0 1-.735-.735c0-.406.33-.735.735-.735z"/></svg> },
  { id: 'email', label: 'Email', href: 'mailto:info@medi-q.com', color: 'bg-slate-600', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
  { id: 'phone', label: 'Phone', href: 'tel:+880', color: 'bg-green-700', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> },
];

export default function FloatingContactButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 no-print">
      <AnimatePresence>
        {open && contacts.map((c, i) => (
          <motion.a
            key={c.id}
            href={c.href}
            target={c.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            aria-label={c.label}
            initial={{ opacity: 0, scale: 0.4, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.4, y: 20 }}
            transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 22 }}
            className={`${c.color} text-white w-11 h-11 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform relative group`}
          >
            {c.icon}
            <span className="absolute right-14 bg-slate-800 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">{c.label}</span>
          </motion.a>
        ))}
      </AnimatePresence>

      <motion.button
        id="floating-contact-btn"
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.92 }}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-brand-lg text-white relative"
        style={{ background: 'linear-gradient(135deg, #1b5e20, #4caf50)' }}
        aria-label="Contact options"
      >
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}>
          {open ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </motion.span>
        {!open && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-400 rounded-full animate-ping opacity-75" />
        )}
      </motion.button>
    </div>
  );
}
