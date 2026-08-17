import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#080808] relative pt-20 pb-10 border-t-2 border-primary/50 overflow-hidden">
      
      {/* Subtle background pattern at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[radial-gradient(ellipse_at_top,rgba(57,255,20,0.5),transparent_70%)]"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Branding */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl">A</div>
              <div>
                <span className="font-bold text-2xl block leading-none">Awajimaa</span>
                <span className="text-xs font-mono text-primary tracking-widest uppercase">Group</span>
              </div>
            </div>
            <div className="text-white/90 font-medium">Africa's Digital Infrastructure</div>
            <p className="text-sm text-white/50 leading-relaxed">
              Five interconnected platforms powering emergency response, commerce, education, heritage, and business for 1.4 billion Africans.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-primary/20 hover:text-primary transition-all group">
                <Facebook className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(57,255,20,0.8)]" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-primary/20 hover:text-primary transition-all group">
                <Twitter className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(57,255,20,0.8)]" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-[#FFB300]/20 hover:text-[#FFB300] transition-all group">
                <Instagram className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(255,179,0,0.8)]" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-blue-500/20 hover:text-blue-400 transition-all group">
                <Linkedin className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-red-500/20 hover:text-red-500 transition-all group">
                <Youtube className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
              </a>
            </div>
          </div>

          {/* Column 2: Our Platforms */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm font-mono">Our Platforms</h4>
            <ul className="space-y-4">
              <li>
                <a href="https://awajimaaapp.io" target="_blank" rel="noreferrer" className="text-white/60 hover:text-primary transition-colors flex items-center gap-2 text-sm">
                  Awajimaa App
                </a>
              </li>
              <li>
                <a href="https://awajimaaai.com" target="_blank" rel="noreferrer" className="text-white/60 hover:text-primary transition-colors flex items-center gap-2 text-sm">
                  Awa Biz Suite
                </a>
              </li>
              <li>
                <a href="https://awajimaaappstore.com" target="_blank" rel="noreferrer" className="text-white/60 hover:text-secondary transition-colors flex items-center gap-2 text-sm">
                  Awajimaa App Store
                </a>
              </li>
              <li>
                <a href="https://genhal.awajimaa.com" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#FFB300] transition-colors flex items-center gap-2 text-sm">
                  GenHaL
                </a>
              </li>
              <li>
                <a href="https://awajimaaschools.com" target="_blank" rel="noreferrer" className="text-white/60 hover:text-purple-400 transition-colors flex items-center gap-2 text-sm">
                  Awajimaa Schools
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm font-mono">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <div className="text-xs text-white/40 mb-1">WhatsApp (Nigeria Office)</div>
                <a href="https://wa.me/2347067246050" target="_blank" rel="noreferrer" className="text-primary hover:underline text-sm font-mono">
                  +234 706 724 6050
                </a>
              </li>
              <li>
                <div className="text-xs text-white/40 mb-1">General Inquiries</div>
                <a href="mailto:info@awajimaagroup.com" className="text-white/80 hover:text-white transition-colors text-sm">
                  info@awajimaagroup.com
                </a>
              </li>
              <li>
                <div className="text-xs text-white/40 mb-1">For Investors</div>
                <a href="mailto:investors@awajimaagroup.com" className="text-white/80 hover:text-white transition-colors text-sm">
                  investors@awajimaagroup.com
                </a>
              </li>
              <li>
                <div className="text-xs text-white/40 mb-1">For Governments</div>
                <a href="mailto:government@awajimaagroup.com" className="text-white/80 hover:text-white transition-colors text-sm">
                  government@awajimaagroup.com
                </a>
              </li>
              <li>
                <div className="text-xs text-white/40 mb-1">Location</div>
                <span className="text-white/80 text-sm">Lagos, Nigeria</span>
              </li>
            </ul>
          </div>

          {/* Column 4: For Partners */}
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm font-mono">For Partners</h4>
            <ul className="space-y-3">
              {[
                "State Governments",
                "Oil & Energy Companies",
                "Insurance Companies",
                "Logistics Operators",
                "Educational Institutions",
                "Investors & VCs"
              ].map((partner, i) => (
                <li key={i} className="flex items-center justify-between group">
                  <span className="text-sm text-white/60">{partner}</span>
                  <a href="https://wa.me/2347067246050" target="_blank" rel="noreferrer" className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-mono uppercase">
                    Get in Touch <ArrowRight className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© {new Date().getFullYear()} Awajimaa Group. All rights reserved.</p>
          <a href="https://usecases.awajimaaapp.io" target="_blank" rel="noreferrer" className="hover:text-white transition-colors font-mono">
            usecases.awajimaaapp.io
          </a>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
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
