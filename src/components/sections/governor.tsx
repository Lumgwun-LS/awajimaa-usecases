import { motion } from 'framer-motion';
import { Activity, AlertTriangle, ShieldCheck, Map } from 'lucide-react';
import govImg from '@assets/generated_images/governor-dashboard.jpg';

const rightCards = [
  {
    icon: ShieldCheck,
    iconColor: 'text-primary',
    borderHover: 'hover:border-primary/50',
    title: 'State Surveillance',
    desc: 'IoT-connected AI street lights and drone feeds stream directly into a centralized surveillance studio.',
  },
  {
    icon: Map,
    iconColor: 'text-secondary',
    borderHover: 'hover:border-secondary/50',
    title: 'Global Emergency Map',
    desc: 'Track every ambulance dispatch, fire response, and incident timeline across all state districts instantly.',
  },
];

export function Governor() {
  return (
    <section className="py-32 relative bg-card overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Floating blue/indigo orbs */}
      {[
        { w: 380, h: 380, top: '5%',  left: '-8%',  color: '#3b82f6', delay: 0 },
        { w: 260, h: 260, top: '60%', left: '70%',  color: '#6366f1', delay: 1.4 },
        { w: 200, h: 200, top: '15%', left: '75%',  color: '#3b82f6', delay: 2.6 },
        { w: 160, h: 160, top: '75%', left: '20%',  color: '#818cf8', delay: 0.7 },
        { w: 120, h: 120, top: '45%', left: '50%',  color: '#6366f1', delay: 3.1 },
      ].map((o, i) => (
        <motion.div key={i}
          className="absolute rounded-full pointer-events-none z-0"
          style={{
            width: o.w, height: o.h, top: o.top, left: o.left,
            background: `radial-gradient(circle, ${o.color}12 0%, transparent 70%)`,
            filter: 'blur(45px)',
          }}
          animate={{ y: [0, -28, 0], x: [0, 14, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: o.delay }}
        />
      ))}

      {/* Flying blue particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none z-0"
          style={{
            left: `${8 + i * 11}%`,
            bottom: '8%',
            background: 'rgba(59,130,246,0.3)',
          }}
          animate={{ y: [0, -130, 0], opacity: [0, 0.65, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          viewport={{ once: true }}
          className="max-w-3xl mb-16"
        >
          <div className="text-primary font-mono text-sm tracking-wider mb-4 border border-primary/30 inline-block px-3 py-1 rounded-full bg-primary/10">STATE GOVERNMENTS</div>
          <motion.h2
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            The Governor's Screen.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-xl text-muted-foreground"
          >
            Watch your entire state on one screen. Subscribe to give every resident access to emergency response, health, and commerce while you monitor the pulse of the state in real time.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Dashboard — slide from left */}
          <motion.div 
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-white/10 group aspect-video"
          >
            <div className="absolute inset-0 bg-black/40 z-10 transition-opacity group-hover:bg-black/20"></div>
            <img src={govImg} alt="Governor Dashboard" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
            
            <div className="absolute bottom-6 left-6 z-20 flex gap-4">
              <div className="bg-background/80 backdrop-blur border border-white/10 p-4 rounded-lg flex items-center gap-3">
                <Activity className="text-primary w-6 h-6" />
                <div>
                  <motion.div
                    animate={{ textShadow: ['0 0 0px transparent', '0 0 20px #3b82f6', '0 0 0px transparent'] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="text-2xl font-bold font-mono"
                  >
                    1,402
                  </motion.div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Active Patrols</div>
                </div>
              </div>
              <div className="bg-background/80 backdrop-blur border border-white/10 p-4 rounded-lg flex items-center gap-3">
                <AlertTriangle className="text-secondary w-6 h-6" />
                <div>
                  <motion.div
                    animate={{ textShadow: ['0 0 0px transparent', '0 0 20px #f59e0b', '0 0 0px transparent'] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
                    className="text-2xl font-bold font-mono"
                  >
                    3
                  </motion.div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Critical Alerts</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right cards — alternate left/right entrances */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {rightCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ x: i % 2 === 0 ? 60 : -60, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: i * 0.12 }}
                className={`bg-background border border-white/5 p-6 rounded-2xl flex-1 ${card.borderHover} transition-colors`}
              >
                <card.icon className={`w-8 h-8 ${card.iconColor} mb-4`} />
                <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                <p className="text-muted-foreground text-sm">{card.desc}</p>
              </motion.div>
            ))}

            <motion.div
              initial={{ x: 60, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.24 }}
              className="bg-background border border-white/5 p-6 rounded-2xl flex-1"
            >
              <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Value Proposition</h3>
              <motion.div
                animate={{ textShadow: ['0 0 0px transparent', '0 0 20px #3b82f6', '0 0 0px transparent'] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }}
                className="text-3xl font-bold text-white mb-1"
              >
                $500K - $2M
              </motion.div>
              <div className="text-sm text-muted-foreground">Annual state subscription revenue</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
