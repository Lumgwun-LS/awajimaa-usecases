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
    <section className="py-32 bg-background relative border-t border-white/5 overflow-hidden">

      {/* Floating green orbs */}
      {[
        { w: 400, h: 400, top: '5%',  left: '-5%',  color: '#22c55e', delay: 0 },
        { w: 280, h: 280, top: '60%', left: '70%',  color: '#10b981', delay: 1.5 },
        { w: 200, h: 200, top: '20%', left: '75%',  color: '#22c55e', delay: 2.8 },
        { w: 150, h: 150, top: '80%', left: '15%',  color: '#34d399', delay: 0.9 },
      ].map((o, i) => (
        <motion.div key={i}
          className="absolute rounded-full pointer-events-none z-0"
          style={{
            width: o.w, height: o.h, top: o.top, left: o.left,
            background: `radial-gradient(circle, ${o.color}12 0%, transparent 70%)`,
            filter: 'blur(45px)',
          }}
          animate={{ y: [0, -25, 0], x: [0, 12, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: o.delay }}
        />
      ))}

      {/* Flying green particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none z-0"
          style={{
            left: `${10 + i * 14}%`,
            bottom: '8%',
            background: 'rgba(34,197,94,0.3)',
          }}
          animate={{ y: [0, -120, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: 4 + i * 0.6, repeat: Infinity, delay: i * 0.7, ease: 'easeInOut' }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              The Operating System <br />
              <span className="text-muted-foreground">For A Continent.</span>
            </motion.h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Awajimaa is a unified <span className="text-white font-medium">Civictech &amp; Fintech</span> super-intelligent platform built on three pillars — <span className="text-primary font-medium">Reporting Emergencies</span>, <span className="text-secondary font-medium">Commerce</span>, and <span className="text-white font-medium">Education</span>. The digital infrastructure designed to power States and Organizations across Africa and beyond.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: i * 0.1 }}
                  className="flex flex-col gap-3"
                >
                  <div className="w-12 h-12 rounded bg-secondary/10 flex items-center justify-center text-secondary border border-secondary/20">
                    <f.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-lg">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative aspect-square border border-white/10 rounded-2xl bg-card overflow-hidden flex items-center justify-center"
          >
            {/* Abstract OS visualization */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(57,255,20,0.1),transparent_70%)]"></div>

            {/* Second slowly counter-rotating dashed ring */}
            <motion.div
              className="absolute pointer-events-none"
              style={{
                width: 260, height: 260,
                borderRadius: '50%',
                border: '1px dashed rgba(34,197,94,0.18)',
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            />
            
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
