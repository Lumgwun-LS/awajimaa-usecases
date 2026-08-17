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

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-[#FFB300] font-mono text-sm tracking-wider mb-4 border border-[#FFB300]/30 inline-block px-3 py-1 rounded-full bg-[#FFB300]/10">
              GENEALOGY • HERITAGE • LANGUAGE
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold mb-6 font-serif">
              Preserving <br />African Roots.
            </h2>
            
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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            {features.map((f, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-[#FFB300]/10 flex items-center justify-center shrink-0 border border-[#FFB300]/20 group-hover:bg-[#FFB300]/20 transition-colors">
                  <f.icon className="w-5 h-5 text-[#FFB300]" />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1 group-hover:text-[#FFB300] transition-colors">{f.title}</h4>
                  <p className="text-sm text-white/60 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

        </div>
        
      </div>
    </section>
  );
}
