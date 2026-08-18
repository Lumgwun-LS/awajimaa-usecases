import { motion } from 'framer-motion';
import { 
  Network, 
  Shield, 
  MessageCircle, 
  FileAudio, 
  Lock, 
  ActivitySquare, 
  Clapperboard,
  BookOpen
} from 'lucide-react';
import genhalBg from '@assets/generated_images/genhal.jpg';

const features = [
  { icon: Network, title: "Family Trees", desc: "Build multi-generational trees, connect with relatives globally, invite family members." },
  { icon: Shield, title: "Communities & Kingdoms", desc: "Maintain a digital record of history, elders, rulers, compounds, towns, and schools." },
  { icon: MessageCircle, title: "Language Corpus", desc: "Record words, phrases, and stories — feeding an AI training pipeline for African language models." },
  { icon: FileAudio, title: "Heritage Recordings", desc: "Document oral history with audio/video — songs, proverbs, folktales." },
  { icon: Lock, title: "Digital Wills", desc: "Encrypted family wills with scrypt-verified passphrase — AES-256-GCM protected." },
  { icon: ActivitySquare, title: "Family Proof-of-Life", desc: "Automated check-ins; if a family head misses 4 checks, loved ones are notified." },
  { icon: Clapperboard, title: "Creative Studio", desc: "AI-generated African literature, music, and film scripts." }
];

export function GenHal() {
  return (
    <section className="py-32 relative bg-background border-t border-white/5 overflow-hidden">
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <img src={genhalBg} alt="Glowing Family Tree Node Graph" className="w-full h-full object-cover opacity-30 mix-blend-screen" />
        <div className="absolute inset-0 bg-background/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,179,0,0.05),transparent_70%)]"></div>
      </div>

      {/* Floating amber orbs */}
      {[
        { w: 280, h: 280, top: '8%',  left: '3%',   color: '#f59e0b', delay: 0   },
        { w: 200, h: 200, top: '55%', right: '5%',  color: '#fbbf24', delay: 1.5 },
        { w: 160, h: 160, top: '30%', left: '75%',  color: '#fb923c', delay: 3   },
        { w: 180, h: 180, top: '68%', left: '20%',  color: '#f59e0b', delay: 2   },
      ].map((o, i) => (
        <motion.div key={i}
          className="absolute rounded-full pointer-events-none z-0"
          style={{ width: o.w, height: o.h, top: o.top, left: o.left, right: (o as { right?: string }).right,
            background: `radial-gradient(circle, ${o.color}10 0%, transparent 70%)`,
            filter: 'blur(40px)' }}
          animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: o.delay }}
        />
      ))}

      {/* African language characters drifting upward */}
      {['Ọ', 'Ẹ', 'Ṣ', 'Ń', 'Ẁ', 'Ì'].map((char, i) => (
        <motion.div key={i}
          className="absolute pointer-events-none z-0 select-none font-serif font-bold"
          style={{
            left: `${8 + i * 16}%`,
            bottom: `${15 + (i % 3) * 12}%`,
            fontSize: 36 + (i % 3) * 16,
            color: '#FFB300',
            opacity: 0,
          }}
          animate={{ y: [0, -80, 0], opacity: [0, 0.06, 0] }}
          transition={{ duration: 5 + i * 1.2, repeat: Infinity, delay: i * 0.9, ease: 'easeInOut' }}
        >
          {char}
        </motion.div>
      ))}

      {/* Flying amber particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none z-0"
          style={{ left: `${10 + i * 14}%`, bottom: '12%', background: 'rgba(255,179,0,0.3)' }}
          animate={{ y: [0, -120, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.7, ease: 'easeInOut' }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          >
            <div className="text-[#FFB300] font-mono text-sm tracking-wider mb-4 border border-[#FFB300]/30 inline-block px-3 py-1 rounded-full bg-[#FFB300]/10">
              GENEALOGY • HERITAGE • LANGUAGE
            </div>
            
            <motion.h2
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6 font-serif"
            >
              Preserving <br />African Roots.
            </motion.h2>
            
            <p className="text-xl text-white/70 mb-4 font-light leading-relaxed">
              Every African has a family. Building the global African relationship graph creates a network effect no competitor can replicate. GenHaL is the identity layer of the Awajimaa ecosystem.
            </p>
            
            <a href="https://genhal.awajimaa.com" target="_blank" rel="noreferrer" className="text-sm font-mono text-[#FFB300] hover:underline flex items-center gap-2 mb-12">
              genhal.awajimaa.com
            </a>

            <div className="bg-[#FFB300]/5 border border-[#FFB300]/20 rounded-xl p-6 backdrop-blur-sm mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <BookOpen className="w-24 h-24 text-[#FFB300]" />
              </div>
              <h4 className="text-[#FFB300] font-bold mb-2 font-serif text-lg">The Strategic Moat</h4>
              <p className="text-sm text-white/80">
                Revenue: Freemium → $5/month premium (extended trees, heritage storage, community admin tools).
              </p>
              <div className="mt-4 pt-4 border-t border-[#FFB300]/10 flex items-end justify-between">
                <div>
                  <div className="text-xs text-white/50 uppercase tracking-widest font-mono">Diaspora Target</div>
                  <div className="text-xl font-bold">2M Users</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-white/50 uppercase tracking-widest font-mono">ARR Potential</div>
                  <div className="text-2xl font-bold text-[#FFB300]">$120M</div>
                </div>
              </div>
            </div>

          </motion.div>

          <div className="flex flex-col gap-4">
            {features.map((f, i) => (
              <motion.div key={i}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: i * 0.08 }}
                className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-[#FFB300]/10 flex items-center justify-center shrink-0 border border-[#FFB300]/20 group-hover:bg-[#FFB300]/20 transition-colors">
                  <f.icon className="w-5 h-5 text-[#FFB300]" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1 group-hover:text-[#FFB300] transition-colors">{f.title}</h4>
                  <p className="text-sm text-white/60 leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
        
      </div>
    </section>
  );
}
