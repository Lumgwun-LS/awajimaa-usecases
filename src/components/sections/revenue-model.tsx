import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Building2, Droplets, ShoppingBag, Shield, Car,
  Heart, TrendingUp, ChevronRight, Users, Layers,
  DollarSign, Zap, Globe, Flag,
} from 'lucide-react';

/* ─── 10-year milestones ────────────────────────────────────────────────── */
const MILESTONES = [
  {
    period: 'Yr 1–2',
    label: 'Pilot',
    cumulative: '$85M',
    bar: 8.5,
    color: '#60a5fa',
    drivers: ['3 states subscribed', '8 oil operators', 'Marketplace beta', 'Awa Hub launched'],
  },
  {
    period: 'Yr 3–4',
    label: 'Growth',
    cumulative: '$280M',
    bar: 28,
    color: '#34d399',
    drivers: ['12 states', 'Health SaaS live', '15 oil operators', 'Insurance commissions'],
  },
  {
    period: 'Yr 5–6',
    label: 'Scale',
    cumulative: '$520M',
    bar: 52,
    color: '#fb923c',
    drivers: ['24 states', 'Mobility at scale', 'Pan-African pilots', 'All 6 streams firing'],
  },
  {
    period: 'Yr 7–8',
    label: 'Expansion',
    cumulative: '$780M',
    bar: 78,
    color: '#a78bfa',
    drivers: ['36 states', '3 African nations', 'Oil sector dominant', 'Network compounding'],
  },
  {
    period: 'Yr 9–10',
    label: '$1 Billion',
    cumulative: '$1B+',
    bar: 100,
    color: '#fbbf24',
    drivers: ['Full 36-state coverage', 'Multi-country', 'Platform moat locked', 'Exit-grade revenue'],
  },
];

const STREAM_CONTRIB = [
  { label: 'Health SaaS',    pct: 32, color: '#fbbf24' },
  { label: 'State SaaS',     pct: 22, color: '#60a5fa' },
  { label: 'Marketplace',    pct: 17, color: '#fb923c' },
  { label: 'Oil Subs',       pct: 13, color: '#34d399' },
  { label: 'Mobility',       pct: 10, color: '#f43f5e' },
  { label: 'Insurance',      pct:  6, color: '#a78bfa' },
];

/* ─── Animated counter ──────────────────────────────────────────────────── */
function BillionCounter() {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = 1000;
    const duration = 2200;
    const step = 16;
    const increment = (end / duration) * step;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setVal(end); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView]);

  return (
    <span ref={ref} className="tabular-nums">
      ${val < 1000 ? val : '1,000'}
    </span>
  );
}

/* ─── Revenue streams ───────────────────────────────────────────────────── */
const STREAMS = [
  {
    id: 'state',
    badge: 'Government SaaS',
    badgeColor: '#60a5fa',
    icon: Building2,
    color: '#60a5fa',
    title: 'State Government Subscriptions',
    tagline: 'Residents use the app for free. The state pays.',
    who: 'State & Local Governments',
    how: 'Annual SaaS licence per subscribing state. Citizens get full platform access at zero personal cost — emergency response, marketplace, health, schools, transport — all funded through the government subscription.',
    rate: '$200K – $500K / state / year',
    rateNote: 'Scales with population. A 10M-resident state at $200K = $0.02/resident/year.',
    potential: '$1.8B+ if 36 Nigerian states + FCT subscribe at mid-range',
    why: [
      'Government mandates drive instant mass adoption — millions of users overnight',
      'State becomes dependent on the infrastructure, creating sticky multi-year contracts',
      'Unlocks all downstream commission revenue from citizen activity',
    ],
    accentBg: 'rgba(96,165,250,0.05)',
    accentBorder: 'rgba(96,165,250,0.15)',
  },
  {
    id: 'oil',
    badge: 'Sector Subscription',
    badgeColor: '#34d399',
    icon: Droplets,
    color: '#34d399',
    title: 'Oil Company Subscriptions',
    tagline: 'Early warning. Compliance trail. Reputation protection.',
    who: 'Oil Majors & Independents (Shell, TotalEnergies, Seplat, SPDC…)',
    how: 'Annual subscription gives operators an early-warning system for spills, a tamper-evident regulatory compliance trail, managed incident dashboards, and a community relations channel — all before a spill makes the news.',
    rate: '$120K – $400K / operator / year',
    rateNote: '40% of the fee funds community reporter token payouts, driving platform engagement.',
    potential: '$480M+ from Nigeria\'s 30+ licensed upstream operators alone',
    why: [
      'One major spill media incident costs operators $10M+ in PR damage — the subscription is cheap insurance',
      'NOSDRA reporting compliance is legally required — the platform makes it effortless',
      'Community reporter payouts create a self-sustaining watchdog network at no extra cost to Awajimaa',
    ],
    accentBg: 'rgba(52,211,153,0.05)',
    accentBorder: 'rgba(52,211,153,0.15)',
  },
  {
    id: 'marketplace',
    badge: 'Transaction Commission',
    badgeColor: '#fb923c',
    icon: ShoppingBag,
    color: '#fb923c',
    title: 'Marketplace Commissions',
    tagline: '1.5% on every deal processed through Awa Hub.',
    who: 'Buyers & Sellers on the Awa Hub B2B/B2C Marketplace',
    how: 'Every verified business transaction — product orders, wholesale deals, bulk procurement — processed through the platform attracts a 1.5%–3% commission. Payment escrow, dispute resolution, and delivery tracking are included.',
    rate: '1.5% – 3% of gross merchandise value',
    rateNote: 'African e-commerce is $75B in 2024, growing to $300B by 2030.',
    potential: '$450M+ at 1% penetration of the $45B formal African B2B trade flow',
    why: [
      'Zero marginal cost per transaction — pure software at scale',
      'Escrow and dispute resolution build trust that informal markets can\'t offer',
      'Cross-border pan-African trade multiplies the addressable base beyond Nigeria',
    ],
    accentBg: 'rgba(251,146,60,0.05)',
    accentBorder: 'rgba(251,146,60,0.15)',
  },
  {
    id: 'insurance',
    badge: 'Commission',
    badgeColor: '#a78bfa',
    icon: Shield,
    color: '#a78bfa',
    title: 'Insurance Package Commissions',
    tagline: '5%–8% of every policy issued through the platform.',
    who: 'Insurers (Leadway, AIICO, AXA Mansard, FBN Insurance…) & Policyholders',
    how: 'Awajimaa acts as a digital distribution channel — insurers pay 5%–8% commission on every cargo, fleet, driver-life, or health policy sold through the app. The insurer keeps their licence and underwriting; Awajimaa brings the distribution at scale.',
    rate: '5% – 8% of premium value per policy',
    rateNote: 'Nigerian insurance penetration is <1% of GDP — the gap is distribution, not product.',
    potential: '$180M+ annually at moderate penetration of the $8B Nigerian insurance market',
    why: [
      'Insurers are desperate for digital distribution — they pay broker commissions to anyone who brings them customers',
      'Logistics & oil sectors create natural insurance demand on the same platform',
      'Claim verification through Awajimaa\'s own GPS and incident data reduces fraud',
    ],
    accentBg: 'rgba(167,139,250,0.05)',
    accentBorder: 'rgba(167,139,250,0.15)',
  },
  {
    id: 'mobility',
    badge: 'Booking Commission',
    badgeColor: '#f43f5e',
    icon: Car,
    color: '#f43f5e',
    title: 'Taxi, Logistics & Booking Commissions',
    tagline: '8%–15% on rides, deliveries, and service bookings.',
    who: 'Drivers, Logistics Operators, Hospitality Providers, Patients',
    how: 'Every taxi ride, package delivery, ambulance dispatch, hotel booking, or skilled-worker appointment booked through the platform generates a commission. Awajimaa handles payments, routing, and tracking — providers just show up.',
    rate: '8% – 15% per completed booking',
    rateNote: 'Ride-hailing in Africa alone is projected at $14B by 2030 (McKinsey).',
    potential: '$280M+ from mobility, delivery, and service booking at 3% market share',
    why: [
      'Government-mandated citizen accounts create an instant pre-registered rider/customer base',
      'Emergency dispatch (ambulance, police, fire) bookings are high-frequency, non-discretionary',
      'Logistics operators already on the platform for freight become natural mobility providers',
    ],
    accentBg: 'rgba(244,63,94,0.05)',
    accentBorder: 'rgba(244,63,94,0.15)',
  },
  {
    id: 'health',
    badge: 'Health SaaS',
    badgeColor: '#fbbf24',
    icon: Heart,
    color: '#fbbf24',
    title: 'Health Platform SaaS',
    tagline: '$350K/state/year to connect every hospital in the state.',
    who: 'State Ministries of Health & Federal Health Bodies',
    how: 'A separate SaaS subscription connects every hospital, clinic, and primary health centre in the state to the Awajimaa Health Hub — encrypted record transfer, inter-hospital video consultations, remote patient monitoring, and emergency insurance lookup.',
    rate: '$350K / state / year',
    rateNote: 'Can be bundled with the government platform subscription at a discount.',
    potential: '$12.6B+ across 36 states × $350K — before expansion to other African nations',
    why: [
      'Health systems are government-funded — the budget exists, the delivery infrastructure doesn\'t',
      'Insurance companies co-fund access in exchange for real-time claims verification data',
      'Each connected state becomes a reference customer for the next',
    ],
    accentBg: 'rgba(251,191,36,0.05)',
    accentBorder: 'rgba(251,191,36,0.15)',
  },
];

/* ─── Revenue mix visual ───────────────────────────────────────────────── */
const MIX = [
  { label: 'State SaaS',    pct: 28, color: '#60a5fa' },
  { label: 'Health SaaS',   pct: 22, color: '#fbbf24' },
  { label: 'Marketplace',   pct: 18, color: '#fb923c' },
  { label: 'Mobility',      pct: 14, color: '#f43f5e' },
  { label: 'Insurance',     pct: 10, color: '#a78bfa' },
  { label: 'Oil Sub',       pct:  8, color: '#34d399' },
];

export function RevenueModel() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="py-28 relative bg-[#05070a] border-t border-white/5 overflow-hidden">

      {/* Subtle gold radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(251,191,36,0.04) 0%, transparent 65%)' }} />

      {/* Floating amber orbs */}
      {[
        { w: 300, h: 300, top: '8%',  left: '3%',   color: '#f59e0b', delay: 0   },
        { w: 220, h: 220, top: '55%', right: '5%',  color: '#fbbf24', delay: 1.5 },
        { w: 160, h: 160, top: '35%', left: '75%',  color: '#fb923c', delay: 3   },
        { w: 200, h: 200, top: '72%', left: '25%',  color: '#f59e0b', delay: 2   },
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

      {/* Flying gold particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none z-0"
          style={{ left: `${10 + i * 14}%`, bottom: '10%', background: 'rgba(251,191,36,0.3)' }}
          animate={{ y: [0, -120, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
        />
      ))}

      {/* Floating currency symbols */}
      {['₦', '$', '€', '₦', '$', '€'].map((sym, i) => (
        <motion.div key={i}
          className="absolute pointer-events-none z-0 font-bold select-none"
          style={{
            left: `${8 + i * 16}%`,
            bottom: `${15 + (i % 3) * 10}%`,
            fontSize: 32 + (i % 3) * 12,
            color: '#fbbf24',
            opacity: 0,
          }}
          animate={{ y: [0, -100, 0], opacity: [0, 0.04, 0] }}
          transition={{ duration: 7 + i * 2, repeat: Infinity, delay: i * 1.5, ease: 'easeInOut' }}
        >
          {sym}
        </motion.div>
      ))}

      <div className="container mx-auto px-6 relative z-10">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/8 text-amber-400 text-xs font-mono tracking-widest mb-5 uppercase">
            <TrendingUp className="w-3.5 h-3.5" /> Revenue Model
          </div>
          <motion.h2
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight"
          >
            Six Revenue Streams.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400">
              All From the Same Platform.
            </span>
          </motion.h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed">
            Every vertical Awajimaa operates in generates a distinct, recurring revenue stream.
            States fund citizen access. Industries pay to connect. Transactions generate commissions.
            The platform earns whether citizens book a taxi, a hospital visit, or a cargo shipment.
          </p>
        </motion.div>

        {/* ── Revenue mix bar ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <div className="flex h-4 rounded-full overflow-hidden gap-px mb-3">
            {MIX.map((m, i) => (
              <motion.div key={m.label}
                initial={{ width: 0 }}
                whileInView={{ width: `${m.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                style={{ background: m.color }}
                className="h-full first:rounded-l-full last:rounded-r-full"
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 justify-center">
            {MIX.map(m => (
              <div key={m.label} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: m.color }} />
                <span className="text-[11px] font-mono text-white/40">{m.label} {m.pct}%</span>
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] font-mono text-white/20 mt-2">Indicative revenue mix at scale · not forecast</p>
        </motion.div>

        {/* ── Stream cards ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-20">
          {STREAMS.map((s, i) => (
            <motion.div key={s.id}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: i * 0.08 }}
              onClick={() => setActive(active === s.id ? null : s.id)}
              className="rounded-2xl border cursor-pointer transition-all duration-200 overflow-hidden"
              style={{
                borderColor: active === s.id ? `${s.color}40` : s.accentBorder,
                background: active === s.id ? s.accentBg : 'rgba(255,255,255,0.01)',
                boxShadow: active === s.id ? `0 0 30px ${s.color}08` : 'none',
              }}
            >
              {/* Card header */}
              <div className="p-5 pb-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${s.color}15`, border: `1px solid ${s.color}25` }}>
                    <s.icon className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold font-mono uppercase shrink-0"
                    style={{ color: s.badgeColor, background: `${s.badgeColor}15`, border: `1px solid ${s.badgeColor}25` }}>
                    {s.badge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1">{s.title}</h3>
                <p className="text-xs text-white/40 italic mb-3">"{s.tagline}"</p>

                {/* Rate highlight */}
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-lg font-bold font-mono" style={{ color: s.color }}>{s.rate}</span>
                </div>

                <div className="text-[10px] font-mono text-white/25">{s.rateNote}</div>
              </div>

              {/* Expandable detail */}
              <AnimatePresence>
                {active === s.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 space-y-4 border-t"
                      style={{ borderColor: `${s.color}15` }}>

                      <div className="pt-4">
                        <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">Who Pays</div>
                        <div className="text-xs text-white/65">{s.who}</div>
                      </div>

                      <div>
                        <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">How It Works</div>
                        <div className="text-xs text-white/55 leading-relaxed">{s.how}</div>
                      </div>

                      <div className="p-3 rounded-xl" style={{ background: `${s.color}10`, border: `1px solid ${s.color}20` }}>
                        <div className="text-[10px] font-mono mb-1" style={{ color: s.color }}>Revenue Potential</div>
                        <div className="text-xs text-white/70 leading-relaxed">{s.potential}</div>
                      </div>

                      <div>
                        <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2">Why It Holds</div>
                        <ul className="space-y-1.5">
                          {s.why.map(w => (
                            <li key={w} className="flex items-start gap-2 text-[11px] text-white/45">
                              <ChevronRight className="w-3 h-3 shrink-0 mt-0.5" style={{ color: s.color }} />
                              {w}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expand hint */}
              {active !== s.id && (
                <div className="px-5 pb-4 flex items-center gap-1.5 text-[10px] font-mono text-white/20">
                  <span>Tap to expand</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* ── The State Subscription model callout ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6 }}
          className="mb-20 rounded-2xl overflow-hidden border border-blue-500/15 bg-[#05080f]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left — concept */}
            <div className="p-8 border-b lg:border-b-0 lg:border-r border-white/5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/25 bg-blue-500/8 text-blue-400 text-xs font-mono tracking-widest mb-5 uppercase">
                <Globe className="w-3.5 h-3.5" /> State Subscription Model
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                The State Pays. <br />The Citizen Gets Everything Free.
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-5">
                When a state government subscribes, every resident in that state gains access to the full
                Awajimaa platform at zero personal cost — emergency services, marketplace, transport booking,
                health referrals, school management, business tools. All of it.
              </p>
              <p className="text-white/50 text-sm leading-relaxed">
                The state sees it as digital infrastructure — the same way they fund roads and water.
                Awajimaa gets a guaranteed revenue anchor before a single citizen opens the app.
                And once residents are on the platform, every transaction they make generates additional
                commission revenue on top of the subscription.
              </p>
            </div>

            {/* Right — flow */}
            <div className="p-8 flex flex-col justify-center">
              <div className="space-y-3">
                {/* State pays */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-500/8 border border-blue-500/15">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">State Government</div>
                    <div className="text-[11px] text-white/40">Pays $200K – $500K / year platform licence</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-white/20 text-xl"
                  >↓</motion.div>
                </div>

                {/* Awajimaa */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-amber-500/8 border border-amber-500/15">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <Layers className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Awajimaa Platform</div>
                    <div className="text-[11px] text-white/40">Provisions full access for all state residents</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    className="text-white/20 text-xl"
                  >↓</motion.div>
                </div>

                {/* Citizens */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-emerald-500/8 border border-emerald-500/15">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Millions of Residents</div>
                    <div className="text-[11px] text-white/40">Use everything free — and every transaction earns Awajimaa a commission on top</div>
                  </div>
                </div>

                <div className="pt-2 text-center text-[10px] font-mono text-white/20">
                  One subscriber unlocks a state. Every resident is a compounding revenue node.
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Combined summary numbers ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-amber-500/12 bg-amber-500/3 overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-amber-500/10">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-amber-400" />
              <h4 className="text-base font-bold text-white">Revenue Potential — Nigeria First, Africa Next</h4>
            </div>
            <p className="text-xs text-white/35 mt-1">Conservative estimates. Nigeria-only. Pre-expansion to other African markets.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 divide-x divide-y xl:divide-y-0 divide-amber-500/8">
            {[
              { stream: 'State SaaS',   val: '$350M+', note: '36 states + FCT at $9M avg' },
              { stream: 'Health SaaS',  val: '$12.6B+', note: '36 states at $350K each' },
              { stream: 'Marketplace',  val: '$450M+',  note: '1% of $45B B2B trade' },
              { stream: 'Mobility',     val: '$280M+',  note: '3% of $9B ride/delivery' },
              { stream: 'Insurance',    val: '$180M+',  note: '5% of $8B Ng premium' },
              { stream: 'Oil Subs',     val: '$480M+',  note: '30 operators at mid-range' },
            ].map(({ stream, val, note }, i) => (
              <motion.div key={stream}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="px-5 py-5"
              >
                <div className="text-[9px] font-mono text-amber-500/60 uppercase tracking-widest mb-1">{stream}</div>
                <div className="text-2xl font-bold text-amber-400 font-mono mb-1">{val}</div>
                <div className="text-[10px] text-white/30 leading-relaxed">{note}</div>
              </motion.div>
            ))}
          </div>
          <div className="px-6 py-4 border-t border-amber-500/8 flex items-center gap-3">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <p className="text-xs text-white/40 leading-relaxed">
              These streams compound — a government-subscribed state unlocks citizen activity (marketplace, mobility, insurance commissions)
              automatically. One $300K government deal seeds millions in downstream transaction revenue.
            </p>
          </div>
        </motion.div>

        {/* ── $1 Billion Decade Projection ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.7 }}
          className="mt-20"
        >
          {/* Hero statement */}
          <div className="relative rounded-3xl overflow-hidden border border-amber-500/20 bg-gradient-to-b from-[#0d0a03] to-[#080600] p-10 md:p-16 text-center mb-12">
            {/* Radial gold glow */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(251,191,36,0.12) 0%, transparent 65%)' }} />

            {/* Floating stream labels */}
            {STREAM_CONTRIB.map((s, i) => {
              const angles = [10, 40, 150, 170, 200, 330];
              const radii  = [220, 260, 240, 200, 255, 230];
              const rad = (angles[i] * Math.PI) / 180;
              const x = 50 + (radii[i] / 7) * Math.cos(rad);
              const y = 50 + (radii[i] / 12) * Math.sin(rad);
              return (
                <motion.div key={s.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                  className="absolute text-[10px] font-mono hidden md:block"
                  style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)', color: s.color, opacity: 0.5 }}
                >
                  {s.label}
                </motion.div>
              );
            })}

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-mono tracking-widest mb-6 uppercase">
                <Flag className="w-3.5 h-3.5" /> 10-Year Projection
              </div>

              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="text-6xl md:text-9xl font-black text-white mb-2 leading-none tracking-tight"
              >
                <BillionCounter />
                <span className="text-amber-400">M</span>
              </motion.div>
              <div className="text-lg md:text-2xl font-light text-white/50 mb-3">
                cumulative platform revenue · Nigeria first · 10 years
              </div>
              <div className="text-sm text-white/30 max-w-xl mx-auto leading-relaxed">
                Six independent revenue streams. Thirty-six states. A continent of 1.4 billion people waiting for
                digital infrastructure that works. The platform is built. The path is clear.
              </div>

              {/* Stream contribution bar */}
              <div className="mt-8 max-w-lg mx-auto">
                <div className="flex h-3 rounded-full overflow-hidden gap-px mb-3">
                  {STREAM_CONTRIB.map((s, i) => (
                    <motion.div key={s.label}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.6 + i * 0.1, ease: 'easeOut' }}
                      style={{ background: s.color }}
                      className="h-full first:rounded-l-full last:rounded-r-full"
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center">
                  {STREAM_CONTRIB.map(s => (
                    <div key={s.label} className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                      <span className="text-[10px] font-mono text-white/35">{s.label} {s.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Milestone timeline */}
          <div className="relative">
            {/* Connecting spine */}
            <div className="absolute left-0 right-0 top-[52px] h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {MILESTONES.map((m, i) => (
                <motion.div key={m.period}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Milestone dot */}
                  <div className="relative mb-4 z-10">
                    <motion.div
                      animate={{ boxShadow: [`0 0 0 0 ${m.color}00`, `0 0 0 8px ${m.color}30`, `0 0 0 0 ${m.color}00`] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                      className="w-7 h-7 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: m.color, background: `${m.color}15` }}
                    >
                      {i === MILESTONES.length - 1
                        ? <Flag className="w-3 h-3" style={{ color: m.color }} />
                        : <div className="w-2 h-2 rounded-full" style={{ background: m.color }} />
                      }
                    </motion.div>
                  </div>

                  {/* Period + label */}
                  <div className="text-[10px] font-mono text-white/30 mb-0.5">{m.period}</div>
                  <div className="text-sm font-bold mb-1" style={{ color: m.color }}>{m.label}</div>
                  <div className="text-xl font-black text-white font-mono mb-3">{m.cumulative}</div>

                  {/* Progress bar */}
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-3">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: m.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${m.bar}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                    />
                  </div>

                  {/* Drivers */}
                  <ul className="space-y-1 text-left w-full">
                    {m.drivers.map(d => (
                      <li key={d} className="flex items-start gap-1.5 text-[10px] text-white/35">
                        <div className="w-1 h-1 rounded-full shrink-0 mt-1.5" style={{ background: m.color }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footnote */}
          <p className="text-center text-[11px] font-mono text-white/20 mt-8">
            Conservative projection · Nigeria operations only · Pan-African expansion adds further upside ·
            Not financial advice · Based on current revenue model and publicly available market data
          </p>
        </motion.div>
      </div>
    </section>
  );
}
