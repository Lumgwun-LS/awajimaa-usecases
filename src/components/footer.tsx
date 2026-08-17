import { Facebook, Twitter, Instagram, Linkedin, Github, ArrowRight, ExternalLink, Download } from 'lucide-react';
import { FaTiktok, FaTelegramPlane } from 'react-icons/fa';

const socials = [
  {
    label: 'Facebook',
    href: 'https://web.facebook.com/LUMGWUNSOLUTIONS/',
    icon: Facebook,
    hoverBg: 'hover:bg-blue-600/20',
    hoverText: 'hover:text-blue-400',
    glow: '0_0_8px_rgba(59,130,246,0.8)',
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/awajimaaApp',
    icon: Twitter,
    hoverBg: 'hover:bg-white/10',
    hoverText: 'hover:text-white',
    glow: '0_0_8px_rgba(255,255,255,0.6)',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/lumgwunsolutionsgroup',
    icon: Instagram,
    hoverBg: 'hover:bg-pink-600/20',
    hoverText: 'hover:text-pink-400',
    glow: '0_0_8px_rgba(236,72,153,0.8)',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/lumgwun-solutions-group/',
    icon: Linkedin,
    hoverBg: 'hover:bg-sky-600/20',
    hoverText: 'hover:text-sky-400',
    glow: '0_0_8px_rgba(14,165,233,0.8)',
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@lumgwun.solutions',
    icon: FaTiktok,
    hoverBg: 'hover:bg-[#39FF14]/10',
    hoverText: 'hover:text-primary',
    glow: '0_0_8px_rgba(57,255,20,0.8)',
  },
  {
    label: 'Telegram',
    href: 'https://t.me/AwaApp',
    icon: FaTelegramPlane,
    hoverBg: 'hover:bg-sky-500/20',
    hoverText: 'hover:text-sky-300',
    glow: '0_0_8px_rgba(125,211,252,0.8)',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/lumgwun/',
    icon: Github,
    hoverBg: 'hover:bg-white/10',
    hoverText: 'hover:text-white',
    glow: '0_0_8px_rgba(255,255,255,0.5)',
  },
];

const platforms = [
  { name: 'Awajimaa App', url: 'https://awajimaaappstore.com', color: 'hover:text-primary', download: true },
  { name: 'Awa Biz Suite', url: 'https://awajimaaai.com', color: 'hover:text-primary', download: false },
  { name: 'Awajimaa App Store', url: 'https://awajimaaappstore.com', color: 'hover:text-secondary', download: false },
  { name: 'GenHaL', url: 'https://genhal.awajimaa.com', color: 'hover:text-[#FFB300]', download: false },
  { name: 'Awajimaa Schools', url: 'https://awajimaaschools.com', color: 'hover:text-purple-400', download: false },
];

const partners = [
  'State Governments',
  'Oil & Energy Companies',
  'Insurance Companies',
  'Logistics Operators',
  'Educational Institutions',
  'Investors & VCs',
];

export function Footer() {
  return (
    <footer className="bg-[#080808] relative pt-20 pb-10 border-t-2 border-primary/50 overflow-hidden">

      {/* Glowing top edge */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[radial-gradient(ellipse_at_top,rgba(57,255,20,0.6),transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Branding + socials */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary text-black flex items-center justify-center font-black text-2xl leading-none">
                A
              </div>
              <div>
                <span className="font-bold text-2xl block leading-none text-white">Awajimaa</span>
                <span className="text-xs font-mono text-primary tracking-widest uppercase">Group</span>
              </div>
            </div>

            <p className="text-white/90 font-medium text-sm">Africa's Digital Infrastructure</p>

            <p className="text-sm text-white/50 leading-relaxed">
              A unified Civictech &amp; Fintech super-intelligent platform for Reporting Emergencies, Commerce, and Education — the digital infrastructure powering States &amp; Organizations across Africa and beyond.
            </p>

            {/* Social icons — two rows of 4 + 3 */}
            <div className="flex flex-wrap gap-3 pt-2">
              {socials.map(({ label, href, icon: Icon, hoverBg, hoverText, glow }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className={`w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 transition-all duration-200 ${hoverBg} ${hoverText} group`}
                >
                  <Icon
                    className="w-[18px] h-[18px]"
                    style={{ filter: `drop-shadow(${glow.replace(/_/g, ' ')})` } as React.CSSProperties}
                  />
                </a>
              ))}

              {/* F6S — text badge since no standard icon exists */}
              <a
                href="https://www.f6s.com/lumgwun-solutions-group"
                target="_blank"
                rel="noreferrer"
                aria-label="F6S Profile"
                title="F6S"
                className="h-10 px-3 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-orange-500/20 hover:text-orange-400 hover:border-orange-500/30 transition-all duration-200 font-mono text-xs font-bold"
              >
                F6S
              </a>
            </div>

            {/* Secondary X account */}
            <div className="pt-1">
              <span className="text-xs text-white/30 font-mono">Also on X: </span>
              <a
                href="https://x.com/GWUNORENE/"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-white/50 hover:text-white transition-colors font-mono"
              >
                @GWUNORENE
              </a>
              <span className="text-white/20 mx-1">·</span>
              <a
                href="https://www.linkedin.com/in/gwunorene/"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-white/50 hover:text-sky-400 transition-colors font-mono"
              >
                Founder on LinkedIn
              </a>
            </div>
          </div>

          {/* Column 2: Our Platforms */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm font-mono">Our Platforms</h4>
            <ul className="space-y-4">
              {platforms.map(({ name, url, color, download }) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className={`text-white/60 ${color} transition-colors flex items-center gap-2 text-sm group`}
                  >
                    {download
                      ? <Download className="w-3 h-3 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                      : <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    }
                    {name}
                    {download && (
                      <span className="ml-auto text-[10px] font-mono bg-primary/20 text-primary border border-primary/30 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Download
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm font-mono">Contact Us</h4>
            <ul className="space-y-5">
              <li>
                <div className="text-xs text-white/40 mb-1 font-mono">WhatsApp — Nigeria Office</div>
                <a
                  href="https://wa.me/2347067246050"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline text-sm font-mono"
                >
                  +234 706 724 6050
                </a>
              </li>
              <li>
                <div className="text-xs text-white/40 mb-1 font-mono">Telegram</div>
                <a
                  href="https://t.me/AwaApp"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/70 hover:text-white text-sm transition-colors"
                >
                  t.me/AwaApp
                </a>
              </li>
              <li>
                <div className="text-xs text-white/40 mb-1 font-mono">General Inquiries</div>
                <a href="mailto:info@awajimaagroup.com" className="text-white/70 hover:text-white text-sm transition-colors">
                  info@awajimaagroup.com
                </a>
              </li>
              <li>
                <div className="text-xs text-white/40 mb-1 font-mono">For Investors</div>
                <a href="mailto:investors@awajimaagroup.com" className="text-white/70 hover:text-white text-sm transition-colors">
                  investors@awajimaagroup.com
                </a>
              </li>
              <li>
                <div className="text-xs text-white/40 mb-1 font-mono">For Governments</div>
                <a href="mailto:government@awajimaagroup.com" className="text-white/70 hover:text-white text-sm transition-colors">
                  government@awajimaagroup.com
                </a>
              </li>
              <li>
                <div className="text-xs text-white/40 mb-1 font-mono">Location</div>
                <span className="text-white/70 text-sm">Lagos, Nigeria</span>
              </li>
            </ul>
          </div>

          {/* Column 4: For Partners */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm font-mono">For Partners</h4>
            <ul className="space-y-3">
              {partners.map((partner) => (
                <li key={partner} className="flex items-center justify-between group">
                  <span className="text-sm text-white/60">{partner}</span>
                  <a
                    href="https://wa.me/2347067246050"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-mono uppercase"
                  >
                    Get in Touch <ArrowRight className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>

            {/* GitHub CTA */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <div className="text-xs text-white/40 mb-3 font-mono uppercase tracking-wider">Open Source</div>
              <a
                href="https://github.com/lumgwun/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
              >
                <Github className="w-4 h-4" />
                github.com/lumgwun
                <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Awajimaa Group · Lumgwun Solutions Group. All rights reserved.</p>
          <a
            href="https://usecases.awajimaaapp.io"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors font-mono"
          >
            usecases.awajimaaapp.io
          </a>
          <div className="flex gap-4">
            <a href="https://pp.awajimaa.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Privacy</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">Press Kit</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
