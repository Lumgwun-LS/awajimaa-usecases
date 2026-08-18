import { motion } from 'framer-motion';
import { Store, TrendingUp, Handshake, Landmark } from 'lucide-react';
import marketImg from '@assets/generated_images/market-kano.jpg';

const cards = [
  { Icon: Store,     color: 'text-secondary', title: 'Major Markets',    desc: "Direct access to the continent's largest trading hubs." },
  { Icon: TrendingUp, color: 'text-primary',  title: 'Commodity Trading', desc: 'Real-time pricing and bulk agricultural trades.' },
  { Icon: Handshake, color: 'text-white',     title: 'Business Deals',   desc: 'Milestone-based escrow and contract management.' },
  { Icon: Landmark,  color: 'text-primary',   title: 'Finance Tools',    desc: 'Built-in expense tracking, P&L, and invoicing.' },
];

export function Marketplace() {
  return (
    <section className="py-32 relative bg-background border-t border-white/5 overflow-hidden">

      {/* Floating orange orbs */}
      {[
        { w: 400, h: 400, top: '5%',  left: '-6%',  color: '#f97316', delay: 0 },
        { w: 280, h: 280, top: '60%', left: '68%',  color: '#fb923c', delay: 1.4 },
        { w: 200, h: 200, top: '15%', left: '74%',  color: '#f97316', delay: 2.7 },
        { w: 160, h: 160, top: '75%', left: '18%',  color: '#fdba74', delay: 0.9 },
        { w: 120, h: 120, top: '40%', left: '48%',  color: '#f97316', delay: 3.3 },
      ].map((o, i) => (
        <motion.div key={i}
          className="absolute rounded-full pointer-events-none z-0"
          style={{
            width: o.w, height: o.h, top: o.top, left: o.left,
            background: `radial-gradient(circle, ${o.color}12 0%, transparent 70%)`,
            filter: 'blur(45px)',
          }}
          animate={{ y: [0, -28, 0], x: [0, 14, 0], scale: [1, 1.09, 1] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: o.delay }}
        />
      ))}

      {/* Flying orange particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none z-0"
          style={{
            left: `${8 + i * 11}%`,
            bottom: '8%',
            background: 'rgba(249,115,22,0.28)',
          }}
          animate={{ y: [0, -130, 0], opacity: [0, 0.65, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-primary font-mono text-sm tracking-wider mb-4 border border-primary/30 inline-block px-3 py-1 rounded-full bg-primary/10">AWA HUB MARKETPLACE</div>
            <motion.h2
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Kano to Nairobi <br />in 30 Seconds.
            </motion.h2>
            <p className="text-xl text-muted-foreground mb-8">
              A pan-African digital market that ignores borders. A farmer in Kano secures a bulk deal with a buyer in Nairobi, verified by milestone tracking and protected by integrated payments.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {cards.map(({ Icon, color, title, desc }, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: i * 0.1 }}
                  className="bg-card border border-white/5 p-5 rounded-xl"
                >
                  <Icon className={`w-6 h-6 ${color} mb-3`} />
                  <h4 className="font-bold mb-1">{title}</h4>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image — zoom-in spring */}
          <motion.div 
            initial={{ scale: 0.88, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] lg:h-[700px] w-full group"
          >
            <img src={marketImg} alt="African night market" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
            
            {/* UI overlay simulating a trade */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-sm bg-background/90 backdrop-blur-md border border-primary/30 p-6 rounded-xl shadow-2xl">
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">BUYER</div>
                  <div className="font-bold flex items-center gap-2">Nairobi <span className="w-2 h-2 rounded-full bg-green-500"></span></div>
                </div>
                <div className="text-primary font-mono animate-pulse">← TRADE →</div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground mb-1">SELLER</div>
                  <div className="font-bold flex items-center gap-2 justify-end"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Kano</div>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">AMOUNT</div>
                  <motion.div
                    animate={{ textShadow: ['0 0 0px transparent', '0 0 20px #f97316', '0 0 0px transparent'] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                    className="text-2xl font-bold text-white"
                  >
                    $24,500.00
                  </motion.div>
                </div>
                <motion.div
                  animate={{ textShadow: ['0 0 0px transparent', '0 0 12px #f97316', '0 0 0px transparent'] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 0.6 }}
                  className="bg-primary/20 text-primary border border-primary/50 px-3 py-1 rounded text-xs font-bold"
                >
                  ESCROW LOCKED
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
