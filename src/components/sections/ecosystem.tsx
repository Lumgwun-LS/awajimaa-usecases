import { motion } from 'framer-motion';
import ecosystemBg from '@assets/generated_images/ecosystem-bg.jpg';

// Network node positions
const networkNodes = [
  { size: 8, top: '15%', left: '10%' },
  { size: 6, top: '35%', left: '88%' },
  { size: 10, top: '65%', left: '5%' },
  { size: 7, top: '80%', left: '75%' },
  { size: 8, top: '50%', left: '45%' },
  { size: 6, top: '25%', left: '60%' },
  { size: 9, top: '72%', left: '35%' },
  { size: 7, top: '10%', left: '82%' },
];

export function Ecosystem() {
  return (
    <section className="py-32 relative bg-background border-t border-white/10 overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img src={ecosystemBg} alt="Digital Network Ecosystem" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-background/80"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent,rgba(10,10,10,1)_80%)]"></div>
      </div>

      {/* Floating teal orbs */}
      {[
        { w: 320, h: 320, top: '5%', left: '2%', color: '#14b8a6', delay: 0 },
        { w: 230, h: 230, top: '55%', right: '4%', color: '#2dd4bf', delay: 1.5 },
        { w: 180, h: 180, top: '20%', left: '80%', color: '#34d399', delay: 3 },
        { w: 200, h: 200, top: '78%', left: '18%', color: '#10b981', delay: 2 },
        { w: 150, h: 150, top: '42%', left: '50%', color: '#6ee7b7', delay: 4 },
      ].map((o, i) => (
        <motion.div key={i}
          className="absolute rounded-full pointer-events-none z-0"
          style={{
            width: o.w, height: o.h, top: o.top, left: o.left, right: o.right,
            background: `radial-gradient(circle, ${o.color}12 0%, transparent 70%)`,
            filter: 'blur(40px)'
          }}
          animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: o.delay }}
        />
      ))}

      {/* Network node dots */}
      {networkNodes.map((n, i) => (
        <motion.div key={i}
          className="absolute rounded-full pointer-events-none z-0"
          style={{
            width: n.size,
            height: n.size,
            top: n.top,
            left: n.left,
            background: '#14b8a6',
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
        />
      ))}

      {/* Flying particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none z-0"
          style={{ left: `${10 + i * 15}%`, bottom: '10%', background: 'rgba(20,184,166,0.3)' }}
          animate={{ y: [0, -120, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="text-white font-mono text-sm tracking-wider mb-4 border border-white/30 inline-block px-3 py-1 rounded-full bg-white/5">
            THE GRAND VISION
          </div>
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            Five Platforms. One Continent. <br className="hidden md:block"/>
            <span className="text-primary">One Trillion-Dollar Opportunity.</span>
          </motion.h2>
          <p className="text-xl text-muted-foreground">
            Each platform is powerful alone. Together, they are unstoppable.
          </p>
        </motion.div>

        {/* Network Diagram (Pure CSS/Tailwind) */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative max-w-4xl mx-auto h-[400px] md:h-[500px] mb-24 flex items-center justify-center"
        >
          {/* Animated Connecting Lines (SVG) — viewBox 0 0 100 100 maps to percentages */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ filter: 'drop-shadow(0 0 8px rgba(57,255,20,0.5))' }}>
            <motion.path
              d="M50 50 L20 20"
              stroke="rgba(57,255,20,0.4)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M50 50 L80 20"
              stroke="rgba(255,179,0,0.4)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.path
              d="M50 50 L20 80"
              stroke="rgba(168,85,247,0.4)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
            />
            <motion.path
              d="M50 50 L80 80"
              stroke="rgba(56,189,248,0.4)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
            />
            <motion.path
              d="M50 50 L50 10"
              stroke="rgba(239,68,68,0.4)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
            />
          </svg>

          {/* Central Hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-black border-2 border-primary shadow-[0_0_40px_rgba(57,255,20,0.3)] flex flex-col items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border border-primary animate-ping opacity-20"></div>
              <span className="text-2xl md:text-3xl font-bold text-white tracking-tighter">Awajimaa</span>
              <span className="text-primary text-xs font-mono uppercase tracking-widest mt-1">Core Engine</span>
            </div>
          </div>

          {/* Nodes */}
          <div className="absolute top-[20%] left-[20%] -translate-x-1/2 -translate-y-1/2 z-10 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black border border-primary/50 shadow-[0_0_20px_rgba(57,255,20,0.2)] flex items-center justify-center mx-auto mb-2 text-primary font-bold">App</div>
          </div>
          
          <div className="absolute top-[20%] left-[80%] -translate-x-1/2 -translate-y-1/2 z-10 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black border border-[#FFB300]/50 shadow-[0_0_20px_rgba(255,179,0,0.2)] flex items-center justify-center mx-auto mb-2 text-[#FFB300] font-bold">GenHaL</div>
          </div>

          <div className="absolute top-[80%] left-[20%] -translate-x-1/2 -translate-y-1/2 z-10 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black border border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.2)] flex items-center justify-center mx-auto mb-2 text-purple-400 font-bold">Schools</div>
          </div>

          <div className="absolute top-[80%] left-[80%] -translate-x-1/2 -translate-y-1/2 z-10 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black border border-sky-500/50 shadow-[0_0_20px_rgba(56,189,248,0.2)] flex items-center justify-center mx-auto mb-2 text-sky-400 font-bold">Biz</div>
          </div>

          <div className="absolute top-[10%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-10 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)] flex items-center justify-center mx-auto mb-2 text-red-400 font-bold text-sm leading-tight">App<br/>Store</div>
          </div>
        </motion.div>

        {/* Revenue Terminal Table */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-24"
        >
          <div className="bg-[#050505] border border-white/10 rounded-xl p-6 md:p-10 font-mono text-sm md:text-base shadow-2xl overflow-x-auto">
            <div className="flex items-center gap-2 mb-6 text-white/50 border-b border-white/5 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="ml-2">awajimaa-revenue-projection.sh</span>
            </div>
            <pre className="text-white/80 leading-relaxed whitespace-pre-wrap">
<span className="text-primary font-bold">PLATFORM               TARGET USERS    ARR POTENTIAL</span>
<span className="text-white/30">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
Awajimaa App           50M citizens    <motion.span
  className="text-primary"
  animate={{ textShadow: ['0 0 0px transparent', '0 0 20px currentColor', '0 0 0px transparent'] }}
  transition={{ duration: 2.5, repeat: Infinity }}
>$500M</motion.span> <span className="text-white/50">(gov subs + enterprise)</span>
Awa Biz Suite          500K SMEs       <motion.span
  className="text-primary"
  animate={{ textShadow: ['0 0 0px transparent', '0 0 20px currentColor', '0 0 0px transparent'] }}
  transition={{ duration: 2.5, repeat: Infinity, delay: 0.4 }}
>$60M</motion.span>  <span className="text-white/50">(SaaS subscriptions)</span>
Awajimaa Schools       5M students     <motion.span
  className="text-primary"
  animate={{ textShadow: ['0 0 0px transparent', '0 0 20px currentColor', '0 0 0px transparent'] }}
  transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
>$120M</motion.span> <span className="text-white/50">(per-student SaaS)</span>
GenHaL                 2M diaspora     <motion.span
  className="text-primary"
  animate={{ textShadow: ['0 0 0px transparent', '0 0 20px currentColor', '0 0 0px transparent'] }}
  transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }}
>$120M</motion.span> <span className="text-white/50">(freemium premium)</span>
App Store              10K developers  <motion.span
  className="text-primary"
  animate={{ textShadow: ['0 0 0px transparent', '0 0 20px currentColor', '0 0 0px transparent'] }}
  transition={{ duration: 2.5, repeat: Infinity, delay: 1.6 }}
>$50M</motion.span>  <span className="text-white/50">(listing + commissions)</span>
<span className="text-white/30">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
<span className="font-bold text-white">TOTAL YEAR 5 TARGET                    <motion.span
  className="text-secondary text-xl md:text-2xl ml-4"
  animate={{ textShadow: ['0 0 0px transparent', '0 0 25px currentColor', '0 0 0px transparent'] }}
  transition={{ duration: 2.5, repeat: Infinity, delay: 2 }}
>$850M+ → $1B+</motion.span></span>
            </pre>
          </div>
        </motion.div>

        {/* Why Now */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "Africa's Internet Moment",
              body: "Smartphone penetration is crossing 50%. The platform that captures this inflection point wins a decade. The infrastructure must be built now.",
              delay: 0,
              highlight: false,
            },
            {
              title: "No Unified Competitor",
              body: "WhatsApp, Jumia, and MTN are vertical players. Awajimaa is the horizontal OS layer none of them have built, connecting every aspect of daily life.",
              delay: 0.1,
              highlight: false,
            },
            {
              title: "Government-Led Distribution",
              body: "One state mandate equals millions of users overnight. The Awajimaa Group is in active conversations with 6 Nigerian states. The tipping point is here.",
              delay: 0.2,
              highlight: true,
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: card.delay }}
              className={`bg-card/50 backdrop-blur border p-8 rounded-xl relative overflow-hidden ${
                card.highlight
                  ? 'border-primary/30 shadow-[0_0_30px_rgba(57,255,20,0.05)]'
                  : 'border-white/10'
              }`}
            >
              {card.highlight && <div className="absolute top-0 right-0 w-2 h-full bg-primary"></div>}
              <h3 className="text-xl font-bold mb-4 text-white">{card.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
