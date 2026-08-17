import { motion } from 'framer-motion';
import { Layers, Shield, Zap, Globe } from 'lucide-react';

const features = [
  { icon: Shield, title: "Emergency & Health", desc: "Ambulance dispatch, tele-health, and real-time state emergency analytics." },
  { icon: Zap, title: "Energy & Security", desc: "Oil spill reporting, drone surveillance, and response team coordination." },
  { icon: Globe, title: "Commerce & Logistics", desc: "Cross-border trading, multi-vendor fleet tracking, and marketplace deals." },
  { icon: Layers, title: "Identity & Finance", desc: "BVN/NIN verification, multi-currency wallets, insurance, and group savings." },
];

export function OsVision() {
  return (
    <section className="py-32 bg-background relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              The Operating System <br />
              <span className="text-muted-foreground">For A Continent.</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Awajimaa isn't just an app. It's the digital infrastructure Africa has been waiting for. We combined WeChat's scale, 911's urgency, and Amazon's logistics into a single, unified platform.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
              {features.map((f, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="w-12 h-12 rounded bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20">
                    <f.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-lg">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square border border-white/10 rounded-2xl bg-card overflow-hidden flex items-center justify-center"
          >
            {/* Abstract OS visualization */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.1),transparent_70%)]"></div>
            
            <div className="relative w-full h-full p-8 flex flex-col justify-center items-center">
              <div className="w-48 h-48 rounded-full border border-primary/30 flex items-center justify-center relative">
                <div className="w-32 h-32 rounded-full border border-secondary/30 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                  <div className="w-16 h-16 rounded-full bg-primary/20 blur-xl"></div>
                </div>
                {/* Orbiting nodes */}
                <div className="absolute top-0 -mt-2 w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(57,255,20,0.8)]"></div>
                <div className="absolute bottom-0 -mb-2 w-4 h-4 bg-secondary rounded-full shadow-[0_0_15px_rgba(255,179,0,0.8)]"></div>
              </div>
              <p className="mt-8 text-center font-mono text-xs text-primary uppercase tracking-widest">
                Awajimaa Core Engine Active
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}