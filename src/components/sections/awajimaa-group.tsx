import { motion } from 'framer-motion';
import {
  Globe, Cpu, Sparkles, BarChart2, Wallet,
  Building2, Crown, ArrowDown, Layers, Zap,
  CheckCircle2, Shield, TrendingUp,
} from 'lucide-react';

/* ─── Subsidiaries ──────────────────────────────────────────────────────── */
const ENTITIES = [
  {
    id: 'tech',
    name: 'Awajimaa Technologies Ltd',
    shortName: 'Awajimaa Tech',
    role: 'Platform Engineering',
    color: '#6366f1',
    icon: Cpu,
    description:
      'The engineering backbone of the Group. Builds, maintains, and scales all Awajimaa digital products — the super-app, the App Store, and the platform APIs that third-party developers integrate against.',
    mandate: [
      'Super-app development & deployment',
      'API platform & third-party integrations',
      'Infrastructure, security & DevOps',
      'Awajimaa App Store operations',
    ],
  },
  {
    id: 'ai',
    name: 'Awajimaa AI Ltd',
    shortName: 'Awajimaa AI',
    role: 'Artificial Intelligence',
    color: '#a78bfa',
    icon: Sparkles,
    description:
      'Houses all machine learning, language, and computer vision capabilities. Develops the AI models that power emergency dispatch, oil spill detection, health diagnostics, and the GenHaL language preservation engine.',
    mandate: [
      'Emergency & dispatch AI models',
      'NLP for 50+ African languages (GenHaL)',
      'Computer vision for oil spill monitoring',
      'AI content generation for Awa Biz Suite',
    ],
  },
  {
    id: 'plc',
    name: 'Awajimaa PLC',
    shortName: 'Awajimaa PLC',
    role: 'Institutional & Public Markets',
    color: '#34d399',
    icon: BarChart2,
    description:
      'The publicly incorporated entity structured for institutional investment, government contracting, and eventual public markets listing. Holds the Group\'s licensed regulated activities and sovereign partnership agreements.',
    mandate: [
      'Government & state subscription contracts',
      'Oil & gas sector licensing',
      'Institutional investor relations',
      'Regulated financial & data services',
    ],
  },
  {
    id: 'monie',
    name: 'Monie Vibes Ltd',
    shortName: 'Monie Vibes',
    role: 'Fintech & Payments',
    color: '#fb923c',
    icon: Wallet,
    description:
      'The fintech arm. Operates the payment infrastructure, digital wallet, savings, and credit products across the Awajimaa ecosystem. Connects every transaction — rent collection, marketplace checkout, award voting fees, and insurance premiums — to a unified financial layer.',
    mandate: [
      'Digital wallet & stored value',
      'Payment processing (Paystack, Stripe, NowPayments)',
      'Savings, credit & micro-insurance',
      'Award voting fee collections',
    ],
  },
];

/* ─── Pillars ───────────────────────────────────────────────────────────── */
const PILLARS = [
  { icon: Globe,      color: '#60a5fa', label: 'Pan-African Reach',       sub: 'Designed for Nigeria first, then every African nation' },
  { icon: Layers,     color: '#a78bfa', label: 'Unified Infrastructure',  sub: 'One platform, one identity, one financial layer' },
  { icon: Shield,     color: '#34d399', label: 'Sovereign-grade Trust',   sub: 'Government contracts, regulatory licensing, audited compliance' },
  { icon: TrendingUp, color: '#f59e0b', label: '$1B Decade Trajectory',   sub: 'Six revenue streams compounding across the Group' },
];

export function AwajimaGroup() {
  return (
    <section className="py-32 relative bg-[#05040a] border-t border-white/5 overflow-hidden">

      {/* Deep background radial */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(245,158,11,0.05) 0%, transparent 60%)' }} />

      {/* Subtle grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      {/* Floating orbs — 4 subsidiary colors */}
      {[
        { w: 320, h: 320, top: '5%',  left: '2%',   color: '#f59e0b', delay: 0   },
        { w: 250, h: 250, top: '50%', right: '3%',  color: '#6366f1', delay: 1.5 },
        { w: 180, h: 180, top: '28%', left: '78%',  color: '#a78bfa', delay: 3   },
        { w: 200, h: 200, top: '70%', left: '18%',  color: '#34d399', delay: 2   },
        { w: 150, h: 150, top: '15%', left: '45%',  color: '#fb923c', delay: 4   },
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

      {/* Slowly rotating large hexagon outline */}
      <motion.div
        className="absolute pointer-events-none z-0"
        style={{
          width: 600,
          height: 600,
          top: '50%',
          left: '50%',
          marginTop: -300,
          marginLeft: -300,
          border: '2px solid rgba(245,158,11,0.03)',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />

      {/* Flying amber/gold particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none z-0"
          style={{ left: `${8 + i * 15}%`, bottom: '10%', background: 'rgba(245,158,11,0.3)' }}
          animate={{ y: [0, -120, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/8 text-amber-400 text-xs font-mono tracking-widest mb-6 uppercase">
            <Crown className="w-3.5 h-3.5" /> The Awajimaa Group
          </div>

          <motion.h2
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="text-4xl md:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight"
          >
            Unified Digital<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400">
              Infrastructure.
            </span>
          </motion.h2>

          <p className="text-white/55 text-xl max-w-3xl mx-auto leading-relaxed mb-4">
            A diversified technology group built to power Africa's digital transformation —
            not with a single product, but with a complete ecosystem of companies,
            each owning a critical layer of the continent's future.
          </p>
          <p className="text-white/30 text-sm max-w-xl mx-auto font-mono italic">
            "The Awajimaa App and ecosystem is a unified digital infrastructure that will power
            the now, and the next levels of Africa."
          </p>
        </motion.div>

        {/* ── Holding structure org chart ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          {/* Holding company node */}
          <div className="flex justify-center mb-0">
            <motion.div
              initial={{ y: 30, scale: 0.9, opacity: 0 }}
              whileInView={{ y: 0, scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="relative"
            >
              <div className="relative px-10 py-6 rounded-2xl border-2 border-amber-500/40 bg-gradient-to-b from-amber-500/12 to-amber-500/4 text-center backdrop-blur-sm"
                style={{ boxShadow: '0 0 60px rgba(245,158,11,0.12), inset 0 1px 0 rgba(245,158,11,0.2)' }}>
                <div className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.1) 0%, transparent 70%)' }} />
                {/* Pulsing ring */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border border-amber-500/20"
                  animate={{ opacity: [0.5, 0, 0.5], scale: [1, 1.04, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <Crown className="w-7 h-7 text-amber-400 mx-auto mb-2" />
                <div className="text-[10px] font-mono text-amber-500/60 uppercase tracking-[3px] mb-1">Holding Company</div>
                <div className="text-2xl font-black text-white">Awajimaa Group</div>
                <div className="text-xs text-amber-400/70 font-mono mt-1">Incorporated · Nigeria</div>
              </div>
            </motion.div>
          </div>

          {/* Connector lines to subsidiaries */}
          <div className="flex justify-center">
            <svg className="w-full max-w-4xl h-16" viewBox="0 0 800 64" preserveAspectRatio="none">
              {/* Vertical stem */}
              <motion.line x1="400" y1="0" x2="400" y2="32"
                stroke="rgba(245,158,11,0.3)" strokeWidth="1.5"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 }} />
              {/* Horizontal bar */}
              <motion.line x1="100" y1="32" x2="700" y2="32"
                stroke="rgba(245,158,11,0.25)" strokeWidth="1.5"
                initial={{ scaleX: 0, originX: '50%' }} whileInView={{ scaleX: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.5 }} />
              {/* Drop lines to each entity */}
              {[100, 300, 500, 700].map((x, i) => (
                <motion.line key={x} x1={x} y1="32" x2={x} y2="64"
                  stroke="rgba(245,158,11,0.2)" strokeWidth="1.5"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }} transition={{ duration: 0.3, delay: 0.7 + i * 0.08 }} />
              ))}
            </svg>
          </div>

          {/* Subsidiary cards — 4 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ENTITIES.map((e, i) => (
              <motion.div key={e.id}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: i * 0.15 }}
                whileTap={{ scale: 0.97 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="rounded-2xl border overflow-hidden"
                style={{
                  borderColor: `${e.color}25`,
                  background: `linear-gradient(160deg, ${e.color}08 0%, transparent 60%)`,
                }}
              >
                {/* Card header */}
                <div className="px-5 pt-5 pb-4 border-b"
                  style={{ borderColor: `${e.color}12` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${e.color}15`, border: `1px solid ${e.color}25` }}>
                      <e.icon className="w-5 h-5" style={{ color: e.color }} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[9px] font-mono uppercase tracking-widest mb-0.5"
                        style={{ color: `${e.color}80` }}>{e.role}</div>
                      <div className="text-sm font-bold text-white leading-snug">{e.shortName}</div>
                    </div>
                  </div>
                  <div className="text-[11px] font-mono text-white/30">{e.name}</div>
                </div>

                {/* Description */}
                <div className="px-5 py-4">
                  <p className="text-[11px] text-white/45 leading-relaxed mb-4">
                    {e.description}
                  </p>

                  {/* Mandate list */}
                  <div className="space-y-1.5">
                    {e.mandate.map(m => (
                      <div key={m} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3 h-3 shrink-0 mt-0.5" style={{ color: e.color }} />
                        <span className="text-[10px] text-white/40 leading-snug">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── "What makes this different" pillars ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Not a startup. A Group.
            </h3>
            <p className="text-white/35 text-sm max-w-xl mx-auto">
              Every major African digital challenge has a dedicated entity within the Group engineering its solution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PILLARS.map((p, i) => (
              <motion.div key={p.label}
                initial={i % 2 === 0 ? { x: -60, opacity: 0 } : { x: 60, opacity: 0 }}
                whileInView={i % 2 === 0 ? { x: 0, opacity: 1 } : { x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25, delay: i * 0.08 }}
                className="rounded-xl border border-white/5 bg-white/2 px-5 py-5 flex gap-4 items-start"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${p.color}15`, border: `1px solid ${p.color}20` }}>
                  <p.icon className="w-4 h-4" style={{ color: p.color }} />
                </div>
                <div>
                  <div className="text-sm font-bold text-white mb-0.5">{p.label}</div>
                  <div className="text-[11px] text-white/35 leading-relaxed">{p.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── How the entities connect ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-amber-500/12 bg-amber-500/3 overflow-hidden"
        >
          <div className="px-8 py-6 border-b border-amber-500/10">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-amber-400" />
              <div>
                <h4 className="text-base font-bold text-white">How the entities power each other</h4>
                <p className="text-xs text-white/30 mt-0.5">The holding structure creates compounding leverage — each subsidiary feeds value into the others.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-amber-500/8">
            {[
              {
                from: 'Awajimaa Tech',
                fromColor: '#6366f1',
                to: 'Awajimaa AI',
                toColor: '#a78bfa',
                arrow: '→',
                desc: 'The platform surface (apps, APIs) provides the real-world data that trains and improves Awajimaa AI\'s models continuously.',
              },
              {
                from: 'Awajimaa AI',
                fromColor: '#a78bfa',
                to: 'Awajimaa Tech',
                toColor: '#6366f1',
                arrow: '→',
                desc: 'AI models are embedded back into every app feature — smarter emergency dispatch, better recommendations, automated compliance alerts.',
              },
              {
                from: 'Awajimaa PLC',
                fromColor: '#34d399',
                to: 'Monie Vibes',
                toColor: '#fb923c',
                arrow: '→',
                desc: 'Government subscription contracts and oil licensing create high-volume, recurring transaction flows that Monie Vibes processes and routes.',
              },
              {
                from: 'Monie Vibes',
                fromColor: '#fb923c',
                to: 'Awajimaa PLC',
                toColor: '#34d399',
                arrow: '→',
                desc: 'Payment infrastructure data provides the financial audit trail that Awajimaa PLC presents to institutional investors and regulators.',
              },
            ].map(({ from, fromColor, to, toColor, arrow, desc }) => (
              <div key={from + to} className="px-6 py-5 flex gap-4 items-start">
                <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded"
                    style={{ color: fromColor, background: `${fromColor}15` }}>{from}</span>
                  <span className="text-white/25 text-xs">{arrow}</span>
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded"
                    style={{ color: toColor, background: `${toColor}15` }}>{to}</span>
                </div>
                <p className="text-[11px] text-white/40 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="px-8 py-4 border-t border-amber-500/8 flex items-center gap-3">
            <Crown className="w-4 h-4 text-amber-400 shrink-0" />
            <p className="text-xs text-white/35 leading-relaxed italic">
              The Awajimaa Group holding structure means returns compound across the entire portfolio —
              a government deal won by Awajimaa PLC generates software revenue for Tech, AI training data for AI Ltd,
              and payment volume for Monie Vibes simultaneously.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
