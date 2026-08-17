import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight, ExternalLink } from 'lucide-react';
import { FaTiktok, FaTelegramPlane, FaFacebookF, FaGithub } from 'react-icons/fa';
import { FaXTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import iconLogo from '@assets/awa_3_1787004494041.jpg';
import wordmarkLogo from '@assets/awa_2_1787004371901.jpg';

const socials = [
  { icon: FaInstagram, href: 'https://www.instagram.com/lumgwunsolutionsgroup', label: 'Instagram', color: '#e1306c' },
  { icon: FaXTwitter,  href: 'https://x.com/awajimaaApp',                      label: 'X / Twitter', color: '#ffffff' },
  { icon: FaTiktok,    href: 'https://tiktok.com/@lumgwun.solutions',            label: 'TikTok',    color: '#39FF14' },
  { icon: FaLinkedinIn,href: 'https://www.linkedin.com/company/lumgwun-solutions-group/', label: 'LinkedIn', color: '#0077b5' },
  { icon: FaFacebookF, href: 'https://web.facebook.com/LUMGWUNSOLUTIONS/',       label: 'Facebook',  color: '#1877f2' },
  { icon: FaTelegramPlane, href: 'https://t.me/AwaApp',                          label: 'Telegram',  color: '#29b6f6' },
  { icon: FaGithub,    href: 'https://github.com/lumgwun/',                       label: 'GitHub',    color: '#ffffff' },
];

const saasProducts = [
  { name: 'Awa Biz Suite',       desc: 'AI-powered multi-vendor business platform',            url: 'https://awajimaaai.com',         badge: 'SaaS',     color: 'text-primary' },
  { name: 'Awajimaa Schools',    desc: 'Per-student education infrastructure for states',      url: 'https://awajimaaschools.com',    badge: 'EdTech',   color: 'text-purple-400' },
  { name: 'Awajimaa App Store',  desc: 'African developer marketplace & distribution',         url: 'https://awajimaaappstore.com',   badge: 'Platform', color: 'text-secondary' },
  { name: 'GenHaL',              desc: 'Heritage, language & genealogy digital infrastructure',url: 'https://genhal.awajimaa.com',    badge: 'Heritage', color: 'text-[#FFB300]' },
];

const allPlatforms = [
  { name: 'Awajimaa App',       desc: 'Emergency · Commerce · Education super-app',   url: 'https://awajimaaappstore.com', color: 'text-primary' },
  { name: 'Awa Biz Suite',      desc: 'AI business platform for African SMEs',         url: 'https://awajimaaai.com',       color: 'text-primary' },
  { name: 'Awajimaa App Store', desc: 'Build and distribute African apps',             url: 'https://awajimaaappstore.com', color: 'text-secondary' },
  { name: 'GenHaL',             desc: 'Genealogy, heritage & language preservation',   url: 'https://genhal.awajimaa.com',  color: 'text-[#FFB300]' },
  { name: 'Awajimaa Schools',   desc: 'Digital education for states & institutions',   url: 'https://awajimaaschools.com',  color: 'text-purple-400' },
];

const navLinks = [
  { label: 'Vision',     href: '#vision' },
  { label: 'Use Cases',  href: '#use-cases' },
  { label: 'Videos',     href: '#videos' },
  { label: 'Investors',  href: '#investors' },
];

function SocialIcon({ icon: Icon, href, label, color }: typeof socials[0]) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-200 hover:border-white/30 hover:scale-110"
      style={{ boxShadow: hovered ? `0 0 12px ${color}60` : undefined }}
    >
      <Icon className="w-3 h-3 transition-colors duration-200" style={{ color: hovered ? color : 'rgba(255,255,255,0.5)' }} />
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.12 }}
            className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] font-mono bg-black border border-white/10 text-white/70 px-1.5 py-0.5 rounded whitespace-nowrap pointer-events-none z-50"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </a>
  );
}

function Dropdown({ label, items, align = 'left' }: {
  label: string;
  items: { name: string; desc: string; url: string; badge?: string; color: string }[];
  align?: 'left' | 'right';
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors font-medium py-2"
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className={`absolute top-full mt-2 w-72 bg-[#111]/95 backdrop-blur border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 ${align === 'right' ? 'right-0' : 'left-0'}`}
          >
            {items.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors group border-b border-white/5 last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${item.color} group-hover:underline underline-offset-2`}>{item.name}</span>
                    {item.badge && (
                      <span className="text-[10px] font-mono bg-white/10 text-white/50 px-1.5 py-0.5 rounded">{item.badge}</span>
                    )}
                  </div>
                  <p className="text-xs text-white/40 mt-0.5 leading-snug">{item.desc}</p>
                </div>
                <ExternalLink className="w-3 h-3 text-white/20 group-hover:text-white/50 transition-colors shrink-0 mt-1" />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#080808]/96 backdrop-blur border-b border-white/10 shadow-2xl' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* Logo */}
            <a href="#home" onClick={e => { e.preventDefault(); scrollTo('#home'); }} className="flex items-center gap-2.5 shrink-0">
              <img src={iconLogo} alt="Awajimaa" className="w-8 h-8 rounded-full object-cover" />
              <img src={wordmarkLogo} alt="Awajimaa App" className="h-6 w-auto rounded bg-white px-2 py-0.5 object-contain hidden md:block" />
            </a>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-5 flex-1 justify-center">
              {navLinks.map(({ label, href }) => (
                <button key={href} onClick={() => scrollTo(href)}
                  className="text-sm text-white/70 hover:text-white transition-colors font-medium whitespace-nowrap">
                  {label}
                </button>
              ))}
              <Dropdown label="SaaS &amp; Digi-Infrastructure" items={saasProducts} />
              <Dropdown label="Our Platforms" items={allPlatforms} align="right" />
            </div>

            {/* Right: social icons + CTA */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {/* Social icons strip */}
              <div className="flex items-center gap-1.5 pr-3 border-r border-white/10">
                {socials.map(s => <SocialIcon key={s.label} {...s} />)}
              </div>
              <a href="https://wa.me/2347067246050" target="_blank" rel="noreferrer"
                className="text-sm text-white/60 hover:text-white transition-colors font-medium whitespace-nowrap">
                Contact
              </a>
              <a href="https://awajimaaappstore.com" target="_blank" rel="noreferrer"
                className="h-9 px-4 bg-primary text-black text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-1.5 whitespace-nowrap">
                Enter The Awajimaa App <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile hamburger */}
            <button onClick={() => setMobileOpen(o => !o)}
              className="lg:hidden w-9 h-9 flex items-center justify-center text-white/70 hover:text-white transition-colors" aria-label="Toggle menu">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-[#0a0a0a]/98 backdrop-blur border-b border-white/10 shadow-2xl lg:hidden max-h-[80vh] overflow-y-auto"
          >
            <div className="container mx-auto px-6 py-4 space-y-1">
              {navLinks.map(({ label, href }) => (
                <button key={href} onClick={() => scrollTo(href)}
                  className="w-full text-left px-3 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm font-medium">
                  {label}
                </button>
              ))}

              {[
                { key: 'saas', label: 'SaaS & Digi-Infrastructure', items: saasProducts },
                { key: 'platforms', label: 'Our Platforms', items: allPlatforms },
              ].map(({ key, label, items }) => (
                <div key={key}>
                  <button onClick={() => setMobileSection(s => s === key ? null : key)}
                    className="w-full flex items-center justify-between px-3 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-sm font-medium">
                    {label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileSection === key ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {mobileSection === key && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                        {items.map(item => (
                          <a key={item.name} href={item.url} target="_blank" rel="noreferrer"
                            className="flex items-center gap-3 px-6 py-2.5 hover:bg-white/5 rounded-lg transition-colors"
                            onClick={() => setMobileOpen(false)}>
                            <div>
                              <div className={`text-sm font-medium ${item.color}`}>{item.name}</div>
                              <div className="text-xs text-white/40">{item.desc}</div>
                            </div>
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              {/* Mobile social row */}
              <div className="pt-3 border-t border-white/10">
                <p className="text-xs font-mono text-white/30 uppercase tracking-widest px-3 mb-3">Follow Us</p>
                <div className="flex gap-3 px-3 flex-wrap">
                  {socials.map(({ icon: Icon, href, label, color }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                      className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors">
                      <Icon className="w-4 h-4" style={{ color }} />
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-3 pb-2 flex flex-col gap-2 border-t border-white/10">
                <a href="https://wa.me/2347067246050" target="_blank" rel="noreferrer"
                  className="w-full h-11 flex items-center justify-center gap-2 border border-white/20 text-white text-sm font-semibold rounded-lg hover:bg-white/5 transition-colors"
                  onClick={() => setMobileOpen(false)}>Contact Us</a>
                <a href="https://awajimaaappstore.com" target="_blank" rel="noreferrer"
                  className="w-full h-11 flex items-center justify-center gap-2 bg-primary text-black text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                  onClick={() => setMobileOpen(false)}>
                  Enter The Awajimaa App <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
