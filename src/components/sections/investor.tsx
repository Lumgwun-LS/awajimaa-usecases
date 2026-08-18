import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Users, Network } from 'lucide-react';
import investorImg from '@assets/generated_images/investor-scale.jpg';

const statCards = [
  {
    icon: Users,
    iconColor: 'text-primary',
    stat: '1.4B',
    label: 'People',
    desc: 'Addressable market across 54 African countries.',
    delay: 0,
  },
  {
    icon: BarChart3,
    iconColor: 'text-secondary',
    stat: '$1B+',
    label: 'TAM',
    desc: 'Subscription, commission, and SaaS revenue streams.',
    delay: 0.1,
  },
  {
    icon: Network,
    iconColor: 'text-white',
    stat: '1.5%',
    label: 'Commission',
    desc: 'Standard fee on all Awa Hub marketplace transactions.',
    delay: 0.2,
  },
];

// Sparkle/star characters for background decoration
const sparkles = [
  { size: 60, top: '8%', left: '5%', delay: 0 },
  { size: 80, top: '70%', left: '90%', delay: 3 },
  { size: 50, top: '55%', left: '4%', delay: 6 },
  { size: 70, top: '20%', left: '88%', delay: 9 },
];

export function InvestorScale() {
  return (
    <section className="py-32 relative bg-background border-t border-white/5 overflow-hidden">
      
      {/* Background Image with heavy overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img src={investorImg} alt="Data visualization" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
      </div>

      {/* Floating gold/white orbs */}
      {[
        { w: 400, h: 400, top: '0%', left: '-5%', color: '#FFD700', delay: 0 },
        { w: 280, h: 280, top: '60%', right: '0%', color: '#FFF8DC', delay: 1.5 },
        { w: 200, h: 200, top: '25%', left: '80%', color: '#FFB300', delay: 3 },
        { w: 250, h: 250, top: '80%', left: '10%', color: '#FFFACD', delay: 2 },
        { w: 170, h: 170, top: '45%', left: '48%', color: '#FFD700', delay: 4 },
      ].map((o, i) => (
        <motion.div key={i}
          className="absolute rounded-full pointer-events-none z-0"
          style={{
            width: o.w, height: o.h, top: o.top, left: o.left, right: o.right,
            background: `radial-gradient(circle, ${o.color}0A 0%, transparent 70%)`,
            filter: 'blur(50px)'
          }}
          animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: o.delay }}
        />
      ))}

      {/* Star/sparkle shapes */}
      {sparkles.map((s, i) => (
        <motion.div key={i}
          className="absolute pointer-events-none z-0 select-none"
          style={{
            fontSize: s.size,
            top: s.top,
            left: s.left,
            color: '#FFD700',
            lineHeight: 1,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            opacity: [0.03, 0.06, 0.03],
          }}
          transition={{ duration: 15 + i * 5, repeat: Infinity, delay: i * 3, ease: 'linear' }}
        >
          ✦
        </motion.div>
      ))}

      {/* Flying particles (gold/white) */}
      {[...Array(8)].map((_, i) => (
        <motion.div key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none z-0"
          style={{ left: `${8 + i * 12}%`, bottom: '8%', background: 'rgba(255,215,0,0.25)' }}
          animate={{ y: [0, -120, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="text-primary font-mono text-sm tracking-wider mb-4 border border-primary/30 inline-block px-3 py-1 rounded-full bg-primary/10">THE SCALE</div>
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            Africa's WeChat Moment.
          </motion.h2>
          <p className="text-xl text-muted-foreground">
            Network effects compound as each sector joins. When a government mandates the platform, millions of citizens follow. When citizens join, commerce, logistics, and healthcare scale exponentially.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {statCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: card.delay }}
              whileHover={{ scale: 1.04, y: -6 }}
              className="bg-card/50 backdrop-blur border border-white/10 p-8 rounded-2xl text-center cursor-default"
            >
              <card.icon className={`w-10 h-10 ${card.iconColor} mx-auto mb-4`} />
              <motion.div
                className="text-5xl font-bold mb-2"
                animate={{ textShadow: ['0 0 0px transparent', '0 0 20px currentColor', '0 0 0px transparent'] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
              >
                {card.stat}
              </motion.div>
              <div className="text-sm font-mono text-muted-foreground uppercase tracking-widest">{card.label}</div>
              <p className="mt-4 text-sm text-muted-foreground">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="bg-primary text-primary-foreground rounded-2xl p-10 md:p-16 text-center max-w-4xl mx-auto"
        >
          <motion.h3
            className="text-3xl md:text-5xl font-bold mb-6"
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.15 }}
          >
            The Platform is Built. <br />The Continent is Waiting.
          </motion.h3>
          <p className="text-xl opacity-90 mb-10 font-light">
            Whether you are a State Governor looking to secure your state, an Oil Executive protecting assets, or an Investor ready to back Africa's unified OS.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.a
              href="https://wa.me/2347067246050"
              target="_blank"
              rel="noreferrer"
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.25 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="h-14 px-8 bg-black text-white font-semibold rounded hover:bg-black/80 transition-colors flex items-center justify-center gap-2 text-lg"
            >
              Contact the Founders <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="mailto:investors@awajimaagroup.com?subject=Pitch%20Deck%20Request&body=Hi%2C%20I%20would%20like%20to%20request%20the%20full%20Awajimaa%20pitch%20deck."
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.35 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="h-14 px-8 border border-black/20 text-black font-semibold rounded hover:bg-black/5 transition-colors text-lg flex items-center justify-center"
            >
              Request Full Pitch Deck
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
