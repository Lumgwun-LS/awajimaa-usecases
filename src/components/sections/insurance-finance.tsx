import { motion } from 'framer-motion';
import {
  Shield, Truck, UserCheck, FileCheck, Zap, Bell,
  CheckCircle2, ArrowRight, Package, Clock,
} from 'lucide-react';

/* ─── Real African insurance companies ─────────────────────────────────── */
const INSURERS = [
  'Leadway Assurance', 'AIICO Insurance', 'AXA Mansard', 'FBN Insurance',
  'Custodian Insurance', 'Mutual Benefits', 'Cornerstone Insurance',
  'NEM Insurance', 'Sovereign Trust', 'Guinea Insurance',
  'Sanlam Africa', 'Old Mutual', 'Jubilee Insurance', 'Britam',
  'Resolution Insurance', 'African Alliance', 'Consolidated Hallmark',
];

const COVERAGE_PILLARS = [
  {
    icon: Package,
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.15)',
    border: 'border-amber-500/25',
    tag: 'Cargo Coverage',
    headline: 'Goods in Transit — Fully Covered',
    body: 'Every consignment booked through Awajimaa — farm produce, electronics, manufactured goods — can be insured at the point of booking. The policy is issued in seconds, the premium is deducted automatically, and coverage begins the moment the truck moves.',
    bullets: [
      'Farm produce & perishables',
      'Factory & wholesale goods',
      'Cross-border consignments',
      'E-commerce last-mile parcels',
    ],
  },
  {
    icon: Truck,
    color: '#3b82f6',
    glow: 'rgba(59,130,246,0.15)',
    border: 'border-blue-500/25',
    tag: 'Fleet & Vehicle Insurance',
    headline: 'Every Vehicle, Every Risk',
    body: 'Logistics operators register their entire fleet on Awajimaa. Each vehicle\'s insurance status, expiry, and claims history is visible in the command center. Renewals are automated. Accidents reported via the Awajimaa emergency network are automatically flagged to the insurer within minutes.',
    bullets: [
      'Third-party & comprehensive cover',
      'Auto-renewal & lapse alerts',
      'Accident verified via Awajimaa SOS',
      'Fleet-wide policy dashboards',
    ],
  },
  {
    icon: UserCheck,
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.15)',
    border: 'border-purple-500/25',
    tag: 'Driver Life & Health',
    headline: 'The Driver is Covered Too',
    body: 'Every driver onboarded to the Awajimaa logistics network can be enrolled in life and personal accident cover by their operator. When a driver is involved in an incident — recorded instantly on the Awajimaa emergency system — the insurer has verified, timestamped evidence for the claim.',
    bullets: [
      'Personal accident & disability',
      'Life cover linked to operator',
      'Incident evidence from Awajimaa SOS',
      'Seamless digital claims filing',
    ],
  },
];

const CLAIMS_FLOW = [
  { icon: Bell,        label: 'Incident Reported',    sub: 'Driver taps SOS or cargo scan triggers alert', color: '#f87171' },
  { icon: FileCheck,   label: 'Platform Verifies',    sub: 'GPS, timestamp & photos auto-attached to claim', color: '#fbbf24' },
  { icon: Shield,      label: 'Insurer Notified',     sub: 'Claim lands in insurer dashboard with full evidence', color: '#60a5fa' },
  { icon: Zap,         label: 'Payout Triggered',     sub: 'Automated assessment → payment to operator/driver', color: '#34d399' },
];

const WHY_JOIN = [
  { stat: '50M+',   label: 'Ready customer base — no marketing spend needed' },
  { stat: '₦0',     label: 'App development cost — Awajimaa is the app' },
  { stat: '< 60s',  label: 'Policy issuance from booking to coverage active' },
  { stat: '2%',     label: 'Platform fee on premiums — all else goes to insurer' },
];

export function InsuranceFinance() {
  return (
    <section className="py-28 relative bg-[#09080f] border-t border-white/5 overflow-hidden">

      {/* Floating purple orbs */}
      {[
        { w: 300, h: 300, top: '5%',  left: '3%',  color: '#8b5cf6', delay: 0 },
        { w: 240, h: 240, top: '55%', right: '5%', color: '#6366f1', delay: 1.5 },
        { w: 180, h: 180, top: '28%', left: '72%', color: '#8b5cf6', delay: 3 },
        { w: 160, h: 160, top: '75%', left: '20%', color: '#6366f1', delay: 2 },
      ].map((o, i) => (
        <motion.div key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: o.w, height: o.h, top: o.top, left: o.left, right: (o as { right?: string }).right,
            background: `radial-gradient(circle, ${o.color}12 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: o.delay }}
        />
      ))}

      {/* Flying particles (purple) */}
      {[...Array(6)].map((_, i) => (
        <motion.div key={`p-${i}`}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{ left: `${10 + i * 14}%`, bottom: '10%', background: 'rgba(139,92,246,0.3)' }}
          animate={{ y: [0, -120, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
        />
      ))}

      {/* Rotating shield background element */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          width: 500,
          height: 500,
          marginTop: -250,
          marginLeft: -250,
          opacity: 0.03,
          border: '2px solid #8b5cf6',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-mono tracking-widest mb-5 uppercase">
            <Shield className="w-3.5 h-3.5" /> African Insurance Sector
          </div>
          <motion.h2
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight"
          >
            No More Building Apps.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">
              Just Issue Policies.
            </span>
          </motion.h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Africa's insurers spend millions building portals no one uses. Awajimaa gives them
            50 million verified users, an auto-claim pipeline tied to our emergency network,
            and a distribution engine they couldn't afford to build themselves — for a 2% platform fee.
          </p>
        </motion.div>

        {/* Insurer name marquee */}
        <div className="overflow-hidden mb-16 relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10"
            style={{ background: 'linear-gradient(to right, #09080f, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10"
            style={{ background: 'linear-gradient(to left, #09080f, transparent)' }} />
          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
            className="flex gap-4 w-max"
          >
            {[...INSURERS, ...INSURERS].map((name, i) => (
              <span key={i}
                className="shrink-0 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-300/80 text-sm font-medium whitespace-nowrap">
                🛡️ {name}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Three coverage pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {COVERAGE_PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.tag}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: [0, 0.12, 0.24][i] }}
              className={`relative group rounded-2xl border ${pillar.border} bg-[#0d0b16] p-6 overflow-hidden transition-all duration-300 hover:scale-[1.02]`}
              style={{ boxShadow: `0 0 40px ${pillar.glow}` }}
            >
              {/* Glow blob */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                style={{ background: pillar.glow }} />

              <div className="relative z-10">
                {/* Icon + tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${pillar.color}18`, border: `1px solid ${pillar.color}30` }}>
                    <pillar.icon className="w-6 h-6" style={{ color: pillar.color }} />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider"
                    style={{ color: pillar.color, background: `${pillar.color}15`, border: `1px solid ${pillar.color}25` }}>
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3">{pillar.headline}</h3>
                <p className="text-sm text-white/50 leading-relaxed mb-5">{pillar.body}</p>

                {/* Bullet list */}
                <ul className="space-y-2">
                  {pillar.bullets.map(b => (
                    <li key={b} className="flex items-center gap-2 text-sm text-white/60">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: pillar.color }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider — connector to logistics */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-20"
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/3">
            <Truck className="w-4 h-4 text-emerald-400" />
            <ArrowRight className="w-3 h-3 text-white/30" />
            <Shield className="w-4 h-4 text-amber-400" />
            <span className="text-[11px] font-mono text-white/40 ml-1">Logistics + Insurance, Unified</span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </motion.div>

        {/* Auto-claim flow */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Claims Auto-Verified by the Platform
            </h3>
            <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
              Because every truck, driver, and delivery is already tracked on Awajimaa, incidents produce instant, tamper-proof evidence. No more fake claims. No more delays.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {CLAIMS_FLOW.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ x: i % 2 === 0 ? -60 : 60, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25, delay: i * 0.1 }}
                className="relative"
              >
                {i < CLAIMS_FLOW.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(100%-8px)] w-8 h-px z-10"
                    style={{ background: `linear-gradient(to right, ${step.color}60, ${CLAIMS_FLOW[i+1].color}60)` }} />
                )}
                <div className="bg-[#0d0b16] border border-white/5 rounded-2xl p-5 text-center hover:border-white/10 transition-colors">
                  <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}>
                    <step.icon className="w-6 h-6" style={{ color: step.color }} />
                  </div>
                  <div className="text-[10px] font-mono uppercase tracking-widest mb-1"
                    style={{ color: step.color }}>Step {i + 1}</div>
                  <div className="text-sm font-bold text-white mb-1">{step.label}</div>
                  <div className="text-[11px] text-white/40 leading-relaxed">{step.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why insurers join — stat row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-amber-500/15 bg-amber-500/5 overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-amber-500/10">
            <h4 className="text-lg font-bold text-white">Why Africa's Insurers Join Awajimaa</h4>
            <p className="text-sm text-white/40">The platform eliminates every barrier to digital insurance distribution.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-amber-500/10">
            {WHY_JOIN.map((item, i) => (
              <motion.div
                key={item.stat}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="px-6 py-6"
              >
                <motion.div
                  className="text-3xl font-bold text-amber-400 mb-2"
                  animate={{ textShadow: ['0 0 0px transparent', '0 0 20px #f59e0b', '0 0 0px transparent'] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }}
                >{item.stat}</motion.div>
                <div className="text-xs text-white/50 leading-relaxed">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <p className="text-white/40 text-sm">
            Insurance companies partner with Awajimaa as a distribution layer — not a competitor.<br />
            They keep their licences, their actuarial tables, and their risk models. We give them the customers and the data.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
