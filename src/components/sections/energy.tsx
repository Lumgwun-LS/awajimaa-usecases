import { motion } from 'framer-motion';
import { Droplet, RadioReceiver, ShieldAlert } from 'lucide-react';
import oilImg from '@assets/generated_images/oil-spill-drone.jpg';

export function Energy() {
  return (
    <section className="py-32 relative border-t border-white/5 overflow-hidden">

      {/* Floating amber orbs */}
      {[
        { w: 360, h: 360, top: '5%',  left: '-6%',  color: '#f97316', delay: 0 },
        { w: 250, h: 250, top: '55%', left: '65%',  color: '#fb923c', delay: 1.6 },
        { w: 180, h: 180, top: '20%', left: '72%',  color: '#f59e0b', delay: 2.9 },
        { w: 140, h: 140, top: '78%', left: '30%',  color: '#f97316', delay: 0.8 },
      ].map((o, i) => (
        <motion.div key={i}
          className="absolute rounded-full pointer-events-none z-0"
          style={{
            width: o.w, height: o.h, top: o.top, left: o.left,
            background: `radial-gradient(circle, ${o.color}12 0%, transparent 70%)`,
            filter: 'blur(45px)',
          }}
          animate={{ y: [0, -26, 0], x: [0, 13, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: o.delay }}
        />
      ))}

      {/* Flying amber particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none z-0"
          style={{
            left: `${10 + i * 14}%`,
            bottom: '8%',
            background: 'rgba(249,115,22,0.3)',
          }}
          animate={{ y: [0, -120, 0], opacity: [0, 0.65, 0] }}
          transition={{ duration: 4 + i * 0.55, repeat: Infinity, delay: i * 0.65, ease: 'easeInOut' }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image — zoom-in spring */}
          <motion.div 
            initial={{ scale: 0.88, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="order-2 lg:order-1 relative rounded-2xl overflow-hidden border border-white/10 aspect-square lg:aspect-auto lg:h-[600px]"
          >
            <img src={oilImg} alt="Oil spill drone surveillance" className="w-full h-full object-cover" />
            
            {/* Overlay UI elements */}
            <div className="absolute top-6 right-6 flex flex-col gap-2">
              <motion.div
                animate={{ textShadow: ['0 0 0px transparent', '0 0 12px #ef4444', '0 0 0px transparent'] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-red-500/20 border border-red-500/50 text-red-500 font-mono text-xs px-3 py-1 rounded backdrop-blur animate-pulse flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                ANOMALY DETECTED
              </motion.div>
              <div className="bg-background/80 backdrop-blur border border-white/10 text-white font-mono text-xs px-3 py-1 rounded">
                ALT: 400ft | SPD: 42kts
              </div>
            </div>
          </motion.div>

          {/* Text column — slide from right */}
          <motion.div 
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="order-1 lg:order-2"
          >
            <div className="text-secondary font-mono text-sm tracking-wider mb-4 border border-secondary/30 inline-block px-3 py-1 rounded-full bg-secondary/10">ENERGY SECTOR</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Midnight. 50 Miles Offshore. <br />Spill Detected.</h2>
            <p className="text-xl text-muted-foreground mb-10">
              For oil and gas operators, every minute of delay costs millions. Awajimaa closes the gap between detection and deployment.
            </p>

            <div className="space-y-8">
              {[
                {
                  bg: 'bg-secondary/20', border: 'border-secondary/30', Icon: Droplet, color: 'text-secondary',
                  title: 'Real-time Spill Detection',
                  desc: 'Automated incident reporting feeds directly into the corporate command center.',
                },
                {
                  bg: 'bg-primary/20', border: 'border-primary/30', Icon: RadioReceiver, color: 'text-primary',
                  title: 'Drone Deployment',
                  desc: 'Instantly dispatch automated surveillance drones to verify the threat and assess damage.',
                },
                {
                  bg: 'bg-white/10', border: 'border-white/20', Icon: ShieldAlert, color: 'text-white',
                  title: 'Response Team Dispatch',
                  desc: 'Coordinate containment teams, marine vessels, and government liaisons on one secure channel.',
                },
              ].map(({ bg, border, Icon, color, title, desc }, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: i * 0.12 }}
                  className="flex gap-4"
                >
                  <div className={`mt-1 ${bg} p-3 rounded-lg border ${border} h-min`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{title}</h4>
                    <p className="text-muted-foreground">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
