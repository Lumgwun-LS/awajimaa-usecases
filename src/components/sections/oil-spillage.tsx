import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Droplets, AlertTriangle, Radio, MapPin, CheckCircle2,
  Clock, DollarSign, Users, Building2, Leaf, Shield,
  ChevronRight, Zap, Eye,
} from 'lucide-react';

/* ─── Receivers ────────────────────────────────────────────────────────── */
const RECEIVERS = [
  {
    id: 'nosdra',
    label: 'NOSDRA',
    full: 'National Oil Spill Detection & Response Agency',
    icon: Shield,
    color: '#f43f5e',
    delay: 0.0,
    action: 'Incident logged. JIC activation triggered.',
    ack: '14:07:42',
  },
  {
    id: 'oilco',
    label: 'Oil Company',
    full: 'Shell / TotalEnergies / Seplat / SPDC',
    icon: Building2,
    color: '#fb923c',
    delay: 0.2,
    action: 'Spill report received. Response team alerted.',
    ack: '14:07:44',
  },
  {
    id: 'env',
    label: 'State Ministry',
    full: 'Rivers State Ministry of Environment',
    icon: Leaf,
    color: '#34d399',
    delay: 0.4,
    action: 'Environmental inspection order issued.',
    ack: '14:07:45',
  },
  {
    id: 'community',
    label: 'Host Community',
    full: 'Ogoni Community Development Council',
    icon: Users,
    color: '#60a5fa',
    delay: 0.6,
    action: 'Alert broadcast to 2,340 community members.',
    ack: '14:07:47',
  },
  {
    id: 'agencies',
    label: 'Other Agencies',
    full: 'NIMASA · DPR · FMENV · State Emergency',
    icon: Radio,
    color: '#a78bfa',
    delay: 0.8,
    action: 'Regulatory notification filed. Reference #NIG-2847.',
    ack: '14:07:50',
  },
];

/* ─── Sample reports feed ───────────────────────────────────────────────── */
const REPORTS = [
  { id: 'SPL-0041', loc: 'Bodo Creek, Rivers State',     size: 'Major — est. 2,000 bbl', time: '4 min ago',  status: 'ACTIVE',   reporter: 'Community Observer', paid: false },
  { id: 'SPL-0040', loc: 'Nembe-Creek Trunk, Bayelsa',   size: 'Minor — est. 80 bbl',    time: '23 min ago', status: 'RESPONSE', reporter: 'Fisherman, Verified', paid: false },
  { id: 'SPL-0039', loc: 'Escravos River, Delta State',   size: 'Moderate — est. 500 bbl', time: '1 hr ago', status: 'RESOLVED', reporter: 'Village Monitor', paid: true  },
  { id: 'SPL-0038', loc: 'Kolo Creek, Bayelsa',           size: 'Minor — est. 45 bbl',    time: '3 hr ago',  status: 'RESOLVED', reporter: 'Youth Leader',  paid: true  },
];

const STATUS_STYLE: Record<string, { label: string; color: string; bg: string }> = {
  ACTIVE:   { label: 'ACTIVE',    color: '#f43f5e', bg: 'rgba(244,63,94,0.12)'   },
  RESPONSE: { label: 'RESPONSE',  color: '#fb923c', bg: 'rgba(251,146,60,0.12)'  },
  RESOLVED: { label: 'RESOLVED',  color: '#34d399', bg: 'rgba(52,211,153,0.12)'  },
};

/* ─── Delta map dots ────────────────────────────────────────────────────── */
const SPILL_DOTS = [
  { x: 38, y: 68, r: 4.5, label: 'Bodo Creek', severity: 'major',    active: true  },
  { x: 48, y: 72, r: 3,   label: 'Nembe',      severity: 'moderate', active: true  },
  { x: 28, y: 74, r: 2.5, label: 'Escravos',   severity: 'minor',    active: false },
  { x: 45, y: 78, r: 2,   label: 'Kolo Creek', severity: 'minor',    active: false },
  { x: 55, y: 70, r: 2,   label: 'Warri',      severity: 'moderate', active: false },
];

const SEVERITY_COLOR: Record<string, string> = {
  major: '#f43f5e', moderate: '#fb923c', minor: '#fbbf24',
};

/* ─── How it works steps ────────────────────────────────────────────────── */
const HOW_IT_WORKS = [
  { n: '01', icon: Eye,          color: '#60a5fa', title: 'Community Reports',      body: 'Anyone with the Awajimaa app photographs the spill, adds GPS coordinates, estimates the visible size, and names the nearest water body. Video is supported. No technical knowledge required.' },
  { n: '02', icon: Zap,          color: '#fb923c', title: 'Instant Multi-Broadcast', body: 'The report is simultaneously dispatched to NOSDRA, the responsible oil company, the state Ministry of Environment, the host community leadership, and other relevant agencies — with a tamper-evident timestamp and media bundle.' },
  { n: '03', icon: CheckCircle2, color: '#34d399', title: 'Accountability Trail',    body: 'Every receiver\'s acknowledgment is logged. If NOSDRA doesn\'t respond within 24 hours, an escalation alert fires automatically to the Federal Ministry of Environment and the supervising minister.' },
  { n: '04', icon: DollarSign,   color: '#fbbf24', title: 'Reporter Gets Paid',      body: 'Once the report is verified (by NOSDRA field confirmation or satellite cross-reference), the reporter receives a token payment funded from the subscribing oil company\'s platform fee. Accurate reporting is rewarded.' },
];

export function OilSpillage() {
  const [activeReceiver, setActiveReceiver] = useState<number | null>(null);
  const [showFlow, setShowFlow] = useState(false);
  const [flowStep, setFlowStep] = useState(-1);

  /* Auto-play the broadcast flow on scroll-in */
  useEffect(() => {
    if (!showFlow) return;
    setFlowStep(-1);
    const timers = RECEIVERS.map((r, i) =>
      setTimeout(() => setFlowStep(i), 600 + i * 500)
    );
    return () => timers.forEach(clearTimeout);
  }, [showFlow]);

  return (
    <section className="py-28 relative bg-[#040b07] border-t border-white/5 overflow-hidden">

      {/* Floating emerald orbs */}
      {[
        { w: 300, h: 300, top: '5%',  left: '3%',  color: '#10b981', delay: 0 },
        { w: 220, h: 220, top: '60%', right: '5%', color: '#10b981', delay: 1.5 },
        { w: 180, h: 180, top: '30%', left: '72%', color: '#34d399', delay: 3 },
        { w: 160, h: 160, top: '75%', left: '20%', color: '#10b981', delay: 2 },
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

      {/* Animated oil-drop shapes floating downward */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`drop-${i}`}
          className="absolute pointer-events-none"
          style={{
            width: 12,
            height: 16,
            left: `${20 + i * 30}%`,
            top: '-5%',
            background: '#10b981',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
          }}
          animate={{ y: ['-10%', '110vh'], opacity: [0, 0.08, 0] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, delay: i * 2.5, ease: 'easeIn' }}
        />
      ))}

      {/* Flying particles (emerald) */}
      {[...Array(6)].map((_, i) => (
        <motion.div key={`p-${i}`}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{ left: `${10 + i * 14}%`, bottom: '10%', background: 'rgba(16,185,129,0.3)' }}
          animate={{ y: [0, -120, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
        />
      ))}

      {/* Background radial */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(52,211,153,0.04) 0%, transparent 65%)' }} />

      <div className="container mx-auto px-6 relative z-10">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono tracking-widest mb-5 uppercase">
            <Droplets className="w-3.5 h-3.5" /> Oil Spill Accountability Network
          </div>
          <motion.h2
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight"
          >
            A Community Reports. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">
              Every Authority Knows. Instantly.
            </span>
          </motion.h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed">
            Niger Delta communities have reported oil spills for decades — to silence.
            Awajimaa ends that. One report reaches NOSDRA, the oil company, the state government,
            the host community, and every relevant agency at the same second.
            And the person who reported it gets paid.
          </p>
        </motion.div>

        {/* ── Main grid: broadcast flow + report card ─────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start mb-24">

          {/* LEFT (3/5) — Broadcast visualisation */}
          <motion.div
            className="lg:col-span-3"
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            onViewportEnter={() => setShowFlow(true)}
          >
            <div className="rounded-2xl border border-emerald-500/15 bg-[#050e08] overflow-hidden shadow-[0_0_60px_rgba(52,211,153,0.04)]">

              {/* Chrome */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#060f09] border-b border-white/5">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-red-500"
                  />
                  <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest">
                    Awajimaa Spill Alert — Broadcasting
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/20">14:07:41 WAT</span>
              </div>

              {/* Reporter node → platform → receivers */}
              <div className="p-6">

                {/* Reporter pill */}
                <div className="flex justify-center mb-4">
                  <motion.div
                    animate={{ boxShadow: ['0 0 0 0 rgba(52,211,153,0)', '0 0 0 8px rgba(52,211,153,0.15)', '0 0 0 0 rgba(52,211,153,0)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                      <span className="text-base">👤</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-emerald-400">Community Reporter</div>
                      <div className="text-[10px] text-white/40 font-mono">GPS · Photo · Video · Verified</div>
                    </div>
                    <div className="ml-2 flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/15 border border-red-500/25">
                      <AlertTriangle className="w-3 h-3 text-red-400" />
                      <span className="text-[9px] font-mono text-red-400 uppercase">Spill Reported</span>
                    </div>
                  </motion.div>
                </div>

                {/* Down arrow + platform hub */}
                <div className="flex flex-col items-center mb-4 gap-0">
                  <motion.div
                    animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.8, 1, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-px h-8 bg-gradient-to-b from-emerald-500/60 to-transparent"
                  />
                  <div className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white/10 bg-[#0a160d] w-full max-w-sm">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                      <Radio className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-white">Awajimaa Platform</div>
                      <div className="text-[10px] text-white/35 font-mono">Timestamp · Hash · Media bundle · Geo-fence</div>
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 rounded-full border-2 border-emerald-500/30 border-t-emerald-400"
                    />
                  </div>
                  {/* Fan lines */}
                  <div className="relative w-full max-w-lg h-6 mt-1">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 24">
                      {[0, 1, 2, 3, 4].map(i => {
                        const targets = [40, 120, 200, 280, 360];
                        return (
                          <motion.line key={i}
                            x1={200} y1={0} x2={targets[i]} y2={24}
                            stroke={RECEIVERS[i].color}
                            strokeWidth="1"
                            opacity={flowStep >= i ? 0.6 : 0.1}
                            strokeDasharray="3 2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: flowStep >= i ? 1 : 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        );
                      })}
                    </svg>
                  </div>
                </div>

                {/* Receiver cards */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                  {RECEIVERS.map((r, i) => (
                    <motion.button
                      key={r.id}
                      onClick={() => setActiveReceiver(activeReceiver === i ? null : i)}
                      initial={{ y: 40, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.05 }}
                      animate={{ opacity: flowStep >= i ? 1 : 0.2, y: 0 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: i * 0.1 }}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all duration-150 cursor-pointer"
                      style={{
                        borderColor: activeReceiver === i ? `${r.color}50` : flowStep >= i ? `${r.color}25` : 'rgba(255,255,255,0.05)',
                        background:  activeReceiver === i ? `${r.color}12` : flowStep >= i ? `${r.color}06` : 'transparent',
                      }}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `${r.color}18`, border: `1px solid ${r.color}30` }}>
                        <r.icon className="w-4 h-4" style={{ color: r.color }} />
                      </div>
                      <div className="text-[9px] font-bold text-white leading-tight">{r.label}</div>
                      {flowStep >= i && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-3 h-3 rounded-full flex items-center justify-center"
                          style={{ background: `${r.color}30` }}
                        >
                          <CheckCircle2 className="w-3 h-3" style={{ color: r.color }} />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Receiver detail */}
                <AnimatePresence>
                  {activeReceiver !== null && (
                    <motion.div
                      key={activeReceiver}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.22 }}
                      className="mt-3 overflow-hidden"
                    >
                      <div className="p-4 rounded-xl border"
                        style={{
                          borderColor: `${RECEIVERS[activeReceiver].color}30`,
                          background: `${RECEIVERS[activeReceiver].color}08`,
                        }}
                      >
                        <div className="text-[10px] font-mono mb-2" style={{ color: RECEIVERS[activeReceiver].color }}>
                          NOTIFIED → {RECEIVERS[activeReceiver].full}
                        </div>
                        <div className="text-xs text-white/70">{RECEIVERS[activeReceiver].action}</div>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="w-3 h-3 text-white/25" />
                          <span className="text-[10px] font-mono text-white/30">Acknowledged: {RECEIVERS[activeReceiver].ack}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="text-center text-[10px] text-white/20 font-mono mt-3">
                  ↑ tap a receiver to see their response
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT (2/5) — Report card + Delta map */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-5"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7 }}
          >
            {/* Report card */}
            <div className="rounded-2xl border border-white/8 bg-[#060e08] overflow-hidden">
              <div className="px-4 py-3 border-b border-white/5 bg-[#070f09]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest">Filed Report</span>
                  <span className="text-[10px] font-mono text-red-400 animate-pulse">● LIVE</span>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-base font-bold text-white">SPL-0041</div>
                    <div className="text-xs text-white/40 font-mono">Bodo Creek, Rivers State</div>
                  </div>
                  <div className="px-2 py-1 rounded-full text-[9px] font-bold font-mono bg-red-500/15 border border-red-500/25 text-red-400 uppercase">Major Spill</div>
                </div>

                {/* Mock photo area */}
                <div className="relative rounded-xl bg-gradient-to-br from-[#0a1a0c] to-[#060e07] border border-white/5 h-28 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 opacity-20"
                    style={{ background: 'radial-gradient(circle at 40% 60%, rgba(20,80,20,0.8) 0%, transparent 60%)' }} />
                  <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 border border-white/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[9px] font-mono text-white/60">VIDEO · 0:47</span>
                  </div>
                  <div className="text-center">
                    <Droplets className="w-10 h-10 text-emerald-900/60 mx-auto mb-1" />
                    <span className="text-[10px] font-mono text-white/25">Tap to view evidence</span>
                  </div>
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 rounded bg-black/40 border border-white/10">
                    <MapPin className="w-2.5 h-2.5 text-emerald-400" />
                    <span className="text-[9px] font-mono text-white/60">4.7431°N 7.1082°E</span>
                  </div>
                </div>

                {/* Details */}
                {[
                  { k: 'Est. Volume',    v: '~2,000 barrels' },
                  { k: 'Water Body',     v: 'Bodo Creek (tidal)' },
                  { k: 'Reporter',       v: 'Community Observer · Verified' },
                  { k: 'Reported At',    v: '14:07:41 WAT · Today' },
                  { k: 'Operator',       v: 'SPDC (Shell JV)' },
                ].map(({ k, v }) => (
                  <div key={k} className="flex justify-between text-[11px]">
                    <span className="text-white/30 font-mono">{k}</span>
                    <span className="text-white/70 font-medium text-right max-w-[60%]">{v}</span>
                  </div>
                ))}

                {/* Receivers sent indicator */}
                <div className="flex items-center gap-1.5 pt-1 border-t border-white/5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] font-mono text-emerald-400">5 authorities notified — 4 acknowledged</span>
                </div>
              </div>
            </div>

            {/* Niger Delta mini map */}
            <div className="rounded-2xl border border-white/8 bg-[#060e08] overflow-hidden">
              <div className="px-4 py-2.5 border-b border-white/5 bg-[#070f09]">
                <span className="text-[11px] font-mono text-white/35 uppercase tracking-widest">Niger Delta — Active Incidents</span>
              </div>
              <div className="relative" style={{ paddingTop: '65%' }}>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 65" preserveAspectRatio="xMidYMid meet">
                  {/* Simplified delta coastline suggestion */}
                  <path d="M5 45 Q 20 38 35 42 Q 50 50 65 44 Q 80 38 95 42 L 95 65 L 5 65 Z"
                    fill="rgba(52,211,153,0.04)" stroke="rgba(52,211,153,0.12)" strokeWidth="0.5" />
                  {/* River lines */}
                  {[
                    'M 40 10 Q 38 25 35 42', 'M 50 8 Q 48 25 48 72', 'M 60 12 Q 58 28 65 44',
                  ].map((d, i) => (
                    <path key={i} d={d} fill="none" stroke="rgba(52,211,153,0.12)" strokeWidth="0.5" />
                  ))}

                  {/* Spill dots */}
                  {SPILL_DOTS.map((dot, i) => (
                    <g key={i}>
                      {dot.active && (
                        <motion.circle cx={dot.x} cy={dot.y} r={dot.r * 1.8}
                          fill="none" stroke={SEVERITY_COLOR[dot.severity]} strokeWidth="0.4" opacity={0.4}
                          animate={{ r: [dot.r * 1.8, dot.r * 3, dot.r * 1.8], opacity: [0.4, 0, 0.4] }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                        />
                      )}
                      <circle cx={dot.x} cy={dot.y} r={dot.r}
                        fill={dot.active ? SEVERITY_COLOR[dot.severity] : `${SEVERITY_COLOR[dot.severity]}50`}
                        opacity={dot.active ? 0.9 : 0.45}
                      />
                      <text x={dot.x + dot.r + 1} y={dot.y + 1.2}
                        fill="rgba(255,255,255,0.4)" fontSize="3" fontFamily="monospace">
                        {dot.label}
                      </text>
                    </g>
                  ))}
                </svg>
                {/* Legend */}
                <div className="absolute bottom-2 left-3 flex flex-col gap-1">
                  {[{c:'#f43f5e',l:'Major'},{c:'#fb923c',l:'Moderate'},{c:'#fbbf24',l:'Minor'}].map(({c,l})=>(
                    <div key={l} className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{background:c}} />
                      <span className="text-[8px] font-mono text-white/30">{l}</span>
                    </div>
                  ))}
                </div>
                <div className="absolute top-2 right-2 text-[9px] font-mono text-white/20">
                  2 active · 2 resolved
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Live reports feed ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-white">Recent Spill Reports</h3>
            <div className="flex items-center gap-2 text-[10px] font-mono text-white/30">
              <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400" animate={{ opacity:[1,0.3,1] }} transition={{ duration:1.5,repeat:Infinity }} />
              LIVE FEED
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl border border-white/6">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-white/5 bg-white/2">
                  {['Report ID', 'Location', 'Est. Size', 'Reported', 'Status', 'Reporter', 'Token Paid'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-[10px] font-mono text-white/30 uppercase tracking-widest whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {REPORTS.map((r, i) => {
                  const s = STATUS_STYLE[r.status];
                  return (
                    <motion.tr key={r.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.07 }}
                      className="hover:bg-white/2 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-white font-bold">{r.id}</td>
                      <td className="px-4 py-3 text-white/60 whitespace-nowrap">{r.loc}</td>
                      <td className="px-4 py-3 text-white/55 whitespace-nowrap">{r.size}</td>
                      <td className="px-4 py-3 font-mono text-white/35 whitespace-nowrap">{r.time}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-bold font-mono uppercase whitespace-nowrap"
                          style={{ color: s.color, background: s.bg, border: `1px solid ${s.color}30` }}>
                          {s.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/45 whitespace-nowrap">{r.reporter}</td>
                      <td className="px-4 py-3">
                        {r.paid
                          ? <span className="flex items-center gap-1 text-emerald-400 font-mono"><CheckCircle2 className="w-3 h-3" /> ₦2,500</span>
                          : <span className="text-white/20 font-mono text-[10px]">Pending verification</span>
                        }
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ── How it works ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">How It Works</h3>
            <p className="text-white/40 text-sm max-w-xl mx-auto">From witness to response in under five minutes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div key={step.n}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: i * 0.1 }}
                className="relative p-5 rounded-2xl border border-white/6 bg-[#060e08] hover:border-emerald-500/15 transition-colors"
              >
                <div className="text-[40px] font-black text-white/4 absolute top-3 right-4 leading-none font-mono select-none">{step.n}</div>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${step.color}15`, border: `1px solid ${step.color}25` }}>
                  <step.icon className="w-4.5 h-4.5" style={{ color: step.color }} />
                </div>
                <div className="text-sm font-bold text-white mb-2">{step.title}</div>
                <div className="text-xs text-white/40 leading-relaxed">{step.body}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Business model ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="rounded-2xl border border-emerald-500/12 bg-emerald-500/3 overflow-hidden">
            <div className="px-6 py-5 border-b border-emerald-500/10">
              <h4 className="text-base font-bold text-white mb-1">The Business Model — Everyone Wins</h4>
              <p className="text-white/40 text-xs">
                Oil companies subscribe to gain early-warning access, managed incident trails, and regulatory compliance cover.
                Part of that subscription fee is distributed to verified community reporters as token payments.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-emerald-500/8">
              {/* Oil company */}
              <div className="px-6 py-6">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-bold text-white">Oil Company Subscribes</span>
                </div>
                <ul className="space-y-2">
                  {[
                    'Early-warning on spills before media escalation',
                    'Tamper-evident incident trail for regulators',
                    'Managed response timeline with public audit log',
                    'Reduced liability through documented swift action',
                  ].map(b => (
                    <li key={b} className="flex items-start gap-2 text-[11px] text-white/50">
                      <ChevronRight className="w-3 h-3 text-amber-400/60 shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-white/5 text-sm font-bold text-amber-400 font-mono">
                  $120K – $400K / yr per operator
                </div>
              </div>

              {/* Platform */}
              <div className="px-6 py-6 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <Radio className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-bold text-white">Awajimaa Platform</span>
                </div>
                <div className="flex-1 flex items-center justify-center py-4">
                  {/* Flow diagram */}
                  <div className="flex flex-col items-center gap-1 text-center">
                    <div className="px-4 py-2 rounded-lg bg-amber-500/12 border border-amber-500/20 text-xs text-amber-300 font-mono">Oil Company Fee</div>
                    <div className="text-white/20 text-lg">↓</div>
                    <div className="px-4 py-2 rounded-lg bg-emerald-500/12 border border-emerald-500/20 text-xs text-emerald-300 font-mono">Awajimaa (platform margin)</div>
                    <div className="text-white/20 text-lg">↓</div>
                    <div className="px-4 py-2 rounded-lg bg-blue-500/12 border border-blue-500/20 text-xs text-blue-300 font-mono">Reporter Token Pool</div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 text-xs text-white/30 font-mono leading-relaxed">
                  Platform retains ~60% · 40% flows to verified reporter pool
                </div>
              </div>

              {/* Community reporter */}
              <div className="px-6 py-6">
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-bold text-white">Community Reporter Earns</span>
                </div>
                <ul className="space-y-2">
                  {[
                    'Token payment per verified spill report (₦1,500 – ₦15,000)',
                    'Bonus for video evidence that leads to regulatory action',
                    'Community watchdog badge on Awajimaa profile',
                    'Monthly leaderboard with top reporters named publicly',
                  ].map(b => (
                    <li key={b} className="flex items-start gap-2 text-[11px] text-white/50">
                      <ChevronRight className="w-3 h-3 text-blue-400/60 shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-white/5 text-sm font-bold text-blue-400 font-mono">
                  Verified reports → instant mobile payout
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Bottom stats ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { stat: '11,000+', sub: 'oil spills recorded in the Niger Delta (2011–2021 · NOSDRA data)', color: '#f43f5e' },
            { stat: '4 min',   sub: 'average time from report submission to all receivers notified',   color: '#34d399' },
            { stat: '5 bodies',sub: 'NOSDRA · Oil Co · State MoE · Host Community · Other Agencies',  color: '#60a5fa' },
            { stat: '$2.4B',   sub: 'African environmental compliance & monitoring TAM by 2030',       color: '#fbbf24' },
          ].map(({ stat, sub, color }, i) => (
            <motion.div key={stat}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="p-5 rounded-2xl border border-white/5 bg-[#060e08]"
            >
              <div className="text-3xl font-bold mb-2 font-mono" style={{ color }}>{stat}</div>
              <div className="text-[11px] text-white/35 leading-relaxed">{sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
