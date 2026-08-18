import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Stethoscope, Video, FileHeart, Shield, Wifi,
  Lock, Activity, Building2, ChevronRight,
  AlertCircle, CheckCircle2, UserCheck, Brain,
  Navigation2, Users, Truck, Radio, MapPin, Zap, Target,
  AlertTriangle, ChevronDown,
} from 'lucide-react';

/* ─── Hospital nodes on the network map ─────────────────────────────────── */
const HOSPITALS = [
  { id: 'luth',   label: 'LUTH',          city: 'Lagos',          x: 18,  y: 62, tier: 'tertiary' },
  { id: 'lasuth', label: 'LASUTH',         city: 'Lagos',          x: 25,  y: 70, tier: 'tertiary' },
  { id: 'unn',    label: 'UNN',            city: 'Enugu',          x: 55,  y: 52, tier: 'tertiary' },
  { id: 'ucth',   label: 'UCTH',           city: 'Calabar',        x: 65,  y: 60, tier: 'tertiary' },
  { id: 'abuth',  label: 'ABUTH',          city: 'Zaria',          x: 52,  y: 22, tier: 'tertiary' },
  { id: 'nha',    label: 'NHA Abuja',      city: 'Abuja',          x: 50,  y: 38, tier: 'tertiary' },
  { id: 'oauthc', label: 'OAUTHC',         city: 'Ile-Ife',        x: 35,  y: 60, tier: 'tertiary' },
  { id: 'ph',     label: 'UPTH',           city: 'Port Harcourt',  x: 48,  y: 72, tier: 'tertiary' },
  { id: 'gmc1',   label: 'GMC Kano',       city: 'Kano',           x: 55,  y: 18, tier: 'general' },
  { id: 'gmc2',   label: 'Benin GH',       city: 'Benin',          x: 42,  y: 62, tier: 'general' },
  { id: 'clinic1',label: 'PHC Oshodi',     city: 'Lagos',          x: 20,  y: 75, tier: 'primary' },
  { id: 'clinic2',label: 'PHC Garki',      city: 'Abuja',          x: 44,  y: 42, tier: 'primary' },
];

const LINKS: [string, string][] = [
  ['luth','lasuth'], ['luth','oauthc'], ['luth','nha'], ['nha','abuth'],
  ['nha','unn'], ['unn','ucth'], ['unn','ph'], ['oauthc','gmc2'],
  ['abuth','gmc1'], ['clinic1','luth'], ['clinic2','nha'], ['ph','ucth'],
];

const TIER_STYLE = {
  tertiary: { r: 5,   fill: '#f43f5e', stroke: '#f43f5e', glow: 'rgba(244,63,94,0.5)' },
  general:  { r: 3.5, fill: '#6366f1', stroke: '#6366f1', glow: 'rgba(99,102,241,0.4)' },
  primary:  { r: 2.5, fill: '#34d399', stroke: '#34d399', glow: 'rgba(52,211,153,0.35)' },
};

/* ─── State command dashboard data ─────────────────────────────────────── */
const EMERGENCY_TYPES = [
  { id: 'cholera',   label: 'Cholera Outbreak',   icon: '🦠', color: '#f43f5e', severity: 'CRITICAL', lgasAffected: 4 },
  { id: 'casualty',  label: 'Mass Casualty',       icon: '🚨', color: '#fb923c', severity: 'HIGH',     lgasAffected: 2 },
  { id: 'flood',     label: 'Flood Emergency',     icon: '🌊', color: '#60a5fa', severity: 'HIGH',     lgasAffected: 6 },
  { id: 'fire',      label: 'Wildfire / Explosion',icon: '🔥', color: '#fbbf24', severity: 'MODERATE', lgasAffected: 1 },
  { id: 'epidemic',  label: 'Epidemic Alert',      icon: '⚠️', color: '#a78bfa', severity: 'WATCH',    lgasAffected: 8 },
];

type AssetStatus = { standby: number; deployed: number; total: number };
const INITIAL_ASSETS: Record<string, AssetStatus & { label: string; icon: string; color: string; unit: string }> = {
  ambulances: { label: 'Ambulances',      icon: '🚑', color: '#f43f5e', total: 50, standby: 38, deployed: 12, unit: 'units' },
  drones:     { label: 'Recon Drones',    icon: '🚁', color: '#60a5fa', total: 12, standby: 7,  deployed:  5, unit: 'drones' },
  teams:      { label: 'RRTF Teams',      icon: '👥', color: '#34d399', total:  8, standby: 6,  deployed:  2, unit: 'teams' },
  field:      { label: 'Field Med Units', icon: '🏥', color: '#fbbf24', total:  6, standby: 6,  deployed:  0, unit: 'units' },
};

const DEPLOY_AMOUNTS: Record<string, number> = { ambulances: 6, drones: 2, teams: 1, field: 2 };

type LogEntry = { time: string; msg: string; color: string };
const INITIAL_LOG: LogEntry[] = [
  { time: '14:32:07', msg: '12 Ambulances deployed → Mushin, Oshodi, Ajegunle', color: '#f43f5e' },
  { time: '14:31:44', msg: 'Drone recon unit #3 scanning Apapa corridor',        color: '#60a5fa' },
  { time: '14:30:12', msg: 'RRTF Team Alpha en route → Mushin Primary School',   color: '#34d399' },
];

/* ─── Zone dots for the outbreak map ───────────────────────────────────── */
const OUTBREAK_ZONES = [
  { x: 22, y: 62, r: 8,   label: 'Mushin',    severity: 'CRITICAL' },
  { x: 30, y: 68, r: 5.5, label: 'Oshodi',    severity: 'HIGH' },
  { x: 18, y: 75, r: 6,   label: 'Ajegunle',  severity: 'HIGH' },
  { x: 38, y: 72, r: 4,   label: 'Surulere',  severity: 'MODERATE' },
];

const ASSET_DOTS = [
  { x: 25, y: 65, type: 'ambulance', label: 'AMB-07' },
  { x: 20, y: 70, type: 'ambulance', label: 'AMB-12' },
  { x: 32, y: 63, type: 'drone',     label: 'DR-03' },
  { x: 18, y: 60, type: 'team',      label: 'RRTF-A' },
];

/* ─── Emergency scenario steps ──────────────────────────────────────────── */
const EMERGENCY_STEPS = [
  {
    icon: AlertCircle,
    color: '#f43f5e',
    title: 'SOS Triggered',
    body: 'Patient collapses. Bystander or the patient\'s wearable triggers Awajimaa SOS. Location, timestamp, and face ID captured instantly.',
  },
  {
    icon: Building2,
    color: '#fb923c',
    title: 'Nearest Hospital Notified',
    body: 'Platform checks real-time bed availability across all connected hospitals in the state. Ambulance dispatched to the closest equipped facility.',
  },
  {
    icon: Lock,
    color: '#facc15',
    title: 'Encrypted Records Unlocked',
    body: 'Patient\'s health record — allergies, blood type, conditions, current medications — is retrieved from the Awajimaa Health Vault using their biometric profile. No password needed, even if unconscious.',
  },
  {
    icon: Shield,
    color: '#4ade80',
    title: 'Insurance Auto-Verified',
    body: 'Insurance coverage, policy number, and HMO details surface alongside the health record. The hospital knows immediately whether and how the treatment is covered — before the patient arrives.',
  },
  {
    icon: Video,
    color: '#60a5fa',
    title: 'Remote Doctor Joins',
    body: 'A specialist at a tertiary hospital joins a live video link with the paramedics en route. They review vitals, order tests to be ready at the ER, and guide immediate care in the ambulance.',
  },
  {
    icon: CheckCircle2,
    color: '#a78bfa',
    title: 'Seamless Handover',
    body: 'When the patient arrives, the ER team already has full records, a specialist opinion, and insurance clearance. Zero paperwork. Zero delay. Just care.',
  },
];

/* ─── Platform capabilities ──────────────────────────────────────────────── */
const CAPABILITIES = [
  {
    icon: Building2,
    color: '#f43f5e',
    title: 'State-Wide Hospital Network',
    desc: 'Every hospital in a subscribing state connects to the Awajimaa Health Hub — from tertiary teaching hospitals to primary health centres. One dashboard shows real-time bed capacity, specialist availability, and active emergencies across all facilities.',
  },
  {
    icon: FileHeart,
    color: '#fb923c',
    title: 'Encrypted Digital Records on Referral',
    desc: 'When a patient is referred from Hospital A to Hospital B, their encrypted record travels with them digitally — arriving before the ambulance does. The receiving team sees history, scans, diagnoses, and medication without making a single phone call.',
  },
  {
    icon: Video,
    color: '#60a5fa',
    title: 'Inter-Hospital Video Consultations',
    desc: 'A district hospital with a complex case connects live with a specialist at a teaching hospital 500km away. Shared screens, real-time annotation of scans, and collaborative decision-making — all inside the Awajimaa platform.',
  },
  {
    icon: Activity,
    color: '#34d399',
    title: 'Remote Patient Monitoring',
    desc: 'Patients discharged from hospital continue to be monitored remotely. Doctors track vitals, review wearable data, send medication reminders, and flag deterioration — catching re-admission risks before they become emergencies.',
  },
  {
    icon: Lock,
    color: '#facc15',
    title: 'Emergency Insurance Lookup',
    desc: 'In an emergency, the patient\'s HMO, policy number, and coverage limits are pulled from their Awajimaa profile using biometrics. Even if the patient is unconscious, the hospital has everything it needs to authorise and begin treatment immediately.',
  },
  {
    icon: Brain,
    color: '#a78bfa',
    title: 'AI Triage & Specialist Routing',
    desc: 'AI analyses the patient\'s record and presenting symptoms to recommend the most relevant specialist, flag critical drug interactions, and pre-populate referral letters — reducing the cognitive load on overstretched A&E teams.',
  },
];

/* ─── Animated record-transfer dot ──────────────────────────────────────── */
function RecordPacket({ from, to, delay }: { from: { x: number; y: number }; to: { x: number; y: number }; delay: number }) {
  return (
    <motion.circle
      r={1.2}
      fill="#f43f5e"
      initial={{ cx: from.x, cy: from.y, opacity: 0 }}
      animate={{
        cx: [from.x, to.x],
        cy: [from.y, to.y],
        opacity: [0, 1, 1, 0],
      }}
      transition={{ duration: 2.5, delay, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
    />
  );
}

export function HealthEmergency() {
  const [activeStep, setActiveStep] = useState(0);
  const [autoRun, setAutoRun] = useState(true);

  /* ── Command dashboard state ────────────────────────────────────────── */
  const [activeEmergency, setActiveEmergency] = useState(0);
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [log, setLog] = useState<LogEntry[]>(INITIAL_LOG);
  const [deploying, setDeploying] = useState<string | null>(null);

  const now = () => {
    const d = new Date();
    return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`;
  };

  const handleDeploy = useCallback((key: string) => {
    const a = assets[key];
    if (a.standby <= 0 || deploying) return;
    const qty = Math.min(DEPLOY_AMOUNTS[key] ?? 1, a.standby);
    setDeploying(key);
    setTimeout(() => {
      setAssets(prev => ({
        ...prev,
        [key]: { ...prev[key], standby: prev[key].standby - qty, deployed: prev[key].deployed + qty },
      }));
      const et = EMERGENCY_TYPES[activeEmergency];
      const msgs: Record<string, string> = {
        ambulances: `${qty} Ambulance${qty > 1 ? 's' : ''} dispatched → ${et.label} zone`,
        drones:     `${qty} Drone${qty > 1 ? 's' : ''} airborne — scanning outbreak perimeter`,
        teams:      `${qty} RRTF Team${qty > 1 ? 's' : ''} mobilised → field staging area`,
        field:      `${qty} Field Medical Unit${qty > 1 ? 's' : ''} deployed with PPE kit`,
      };
      const colors: Record<string, string> = { ambulances: '#f43f5e', drones: '#60a5fa', teams: '#34d399', field: '#fbbf24' };
      setLog(prev => [{ time: now(), msg: msgs[key] ?? `${qty} units deployed`, color: colors[key] ?? '#fff' }, ...prev.slice(0, 4)]);
      setDeploying(null);
    }, 900);
  }, [assets, deploying, activeEmergency]);

  useEffect(() => {
    if (!autoRun) return;
    const id = setInterval(() => setActiveStep(s => (s + 1) % EMERGENCY_STEPS.length), 2800);
    return () => clearInterval(id);
  }, [autoRun]);

  const hosMap = Object.fromEntries(HOSPITALS.map(h => [h.id, h]));

  return (
    <section className="py-28 relative bg-[#080508] border-t border-white/5 overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(244,63,94,0.06) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6 relative z-10">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-400 text-xs font-mono tracking-widest mb-5 uppercase">
            <Activity className="w-3.5 h-3.5" /> Tele-Health & Emergency Response
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Every Hospital, Connected.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-orange-400 to-amber-400">
              Every Patient, Protected.
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Awajimaa turns fragmented state health systems into a single intelligent network —
            where encrypted records travel with the patient, specialists consult in real time,
            and emergencies are met with information before the ambulance arrives.
          </p>
        </motion.div>

        {/* ── Main two-column: Network map + Capabilities ────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-24">

          {/* LEFT — Hospital network visualisation */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-2xl border border-rose-500/15 bg-[#0d080b] overflow-hidden shadow-[0_0_60px_rgba(244,63,94,0.06)]">
              {/* Top bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#100a0d]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                  <span className="text-[11px] font-mono text-rose-400 uppercase tracking-widest">Awajimaa Health Hub — Live Network</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                </div>
              </div>

              {/* Stat row */}
              <div className="grid grid-cols-3 divide-x divide-white/5 border-b border-white/5">
                {[
                  { v: '247', l: 'Hospitals Online' },
                  { v: '94%', l: 'Record Uptime' },
                  { v: '18s', l: 'Avg Record Transfer' },
                ].map(({ v, l }) => (
                  <div key={l} className="py-4 text-center">
                    <div className="text-xl font-bold font-mono text-white">{v}</div>
                    <div className="text-[10px] font-mono text-white/35 uppercase tracking-widest mt-0.5">{l}</div>
                  </div>
                ))}
              </div>

              {/* SVG network */}
              <div className="relative bg-[#09060a]" style={{ paddingTop: '80%' }}>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                  {/* Link lines */}
                  {LINKS.map(([aId, bId], i) => {
                    const a = hosMap[aId], b = hosMap[bId];
                    if (!a || !b) return null;
                    return (
                      <line key={i}
                        x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                        stroke="rgba(244,63,94,0.12)" strokeWidth="0.4"
                        strokeDasharray="1 1.5"
                      />
                    );
                  })}

                  {/* Record-transfer animated packets */}
                  {[
                    ['luth', 'nha'], ['nha', 'unn'], ['oauthc', 'luth'], ['abuth', 'nha'],
                  ].map(([aId, bId], i) => {
                    const a = hosMap[aId], b = hosMap[bId];
                    if (!a || !b) return null;
                    return <RecordPacket key={i} from={{ x: a.x, y: a.y }} to={{ x: b.x, y: b.y }} delay={i * 1.5} />;
                  })}

                  {/* Hospital nodes */}
                  {HOSPITALS.map(h => {
                    const s = TIER_STYLE[h.tier as keyof typeof TIER_STYLE];
                    return (
                      <g key={h.id}>
                        {/* Pulse ring */}
                        <motion.circle
                          cx={h.x} cy={h.y} r={s.r}
                          fill="none" stroke={s.stroke} strokeWidth="0.4"
                          initial={{ r: s.r, opacity: 0.8 }}
                          animate={{ r: s.r * 2.2, opacity: 0 }}
                          transition={{ duration: 2.2, repeat: Infinity, delay: Math.random() * 2 }}
                        />
                        {/* Node */}
                        <circle cx={h.x} cy={h.y} r={s.r} fill={s.fill} opacity={0.85} />
                        {/* Label */}
                        <text x={h.x + s.r + 1} y={h.y + 1.2}
                          fill="rgba(255,255,255,0.55)" fontSize="3.2" fontFamily="monospace">
                          {h.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                {/* Legend */}
                <div className="absolute bottom-3 left-3 flex flex-col gap-1.5">
                  {[
                    { color: '#f43f5e', label: 'Tertiary / Teaching' },
                    { color: '#6366f1', label: 'General Hospital' },
                    { color: '#34d399', label: 'Primary Health Centre' },
                  ].map(({ color, label }) => (
                    <div key={label} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                      <span className="text-[9px] font-mono text-white/40">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Referral in progress pill */}
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-rose-500/20 border border-rose-500/30"
                >
                  <FileHeart className="w-3 h-3 text-rose-400" />
                  <span className="text-[9px] font-mono text-rose-400 uppercase">Referral Active</span>
                </motion.div>

                {/* Floating consultation card */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-10 right-3 bg-[#100a0d]/90 border border-rose-500/25 rounded-xl p-3 backdrop-blur-sm max-w-[150px]"
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-[9px] font-mono text-blue-400 uppercase">Video Consult</span>
                  </div>
                  <div className="text-[10px] text-white font-medium">Dr. Adeyemi (LUTH)</div>
                  <div className="text-[9px] text-white/40">→ PHC Garki · Abuja</div>
                  <div className="text-[9px] text-white/40 mt-1">Reviewing: Cardiac Report</div>
                </motion.div>
              </div>

              {/* Bottom ticker — active referrals */}
              <div className="px-4 py-3 border-t border-white/5 space-y-1.5">
                {[
                  { from: 'PHC Oshodi', to: 'LUTH', record: 'Hypertension History', color: '#f43f5e' },
                  { from: 'ABUTH Zaria', to: 'NHA Abuja', record: 'MRI Scan Transfer', color: '#60a5fa' },
                  { from: 'UPTH PH', to: 'OAUTHC', record: 'Surgical Referral Letter', color: '#a78bfa' },
                ].map((r, i) => (
                  <div key={i} className="flex items-center justify-between text-[10px] font-mono">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: r.color }} />
                      <span className="text-white/60">{r.from}</span>
                      <ChevronRight className="w-3 h-3 text-white/20" />
                      <span className="text-white/60">{r.to}</span>
                    </div>
                    <span className="text-white/35">{r.record}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Capability cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-4"
          >
            <p className="text-white/55 text-sm leading-relaxed mb-2">
              Nigeria has 35,000+ healthcare facilities. Most don't talk to each other.
              A patient referred from a primary health centre to a teaching hospital
              often arrives with a handwritten note and a verbal history. Awajimaa ends that.
            </p>
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="group flex gap-4 bg-[#0d080b] border border-white/5 hover:border-rose-500/20 p-4 rounded-xl transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${cap.color}15`, border: `1px solid ${cap.color}25` }}>
                  <cap.icon className="w-4 h-4" style={{ color: cap.color }} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white mb-1">{cap.title}</div>
                  <div className="text-xs text-white/45 leading-relaxed">{cap.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── State Emergency Command Dashboard ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.7 }}
          className="mb-24"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/25 bg-orange-500/8 text-orange-400 text-xs font-mono tracking-widest mb-4 uppercase">
              <Radio className="w-3.5 h-3.5" /> For Subscribing State Governments
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Deploy the State's Response Assets <br className="hidden md:block" />
              From One Dashboard.
            </h3>
            <p className="text-white/45 text-sm max-w-2xl mx-auto leading-relaxed">
              When a disease outbreak, flood, or mass-casualty event hits, the state emergency coordinator
              doesn't make phone calls — they open the Awajimaa State Command Dashboard and dispatch
              ambulances, drones, and rapid-response teams in seconds.
            </p>
          </div>

          {/* Dashboard UI */}
          <div className="rounded-2xl border border-orange-500/15 bg-[#0d0907] overflow-hidden shadow-[0_0_80px_rgba(251,146,60,0.05)]">

            {/* Chrome bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#110b08] border-b border-white/5">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                <span className="text-[11px] font-mono text-orange-400 uppercase tracking-widest">
                  Awajimaa State Command · Lagos State Emergency Operations Centre
                </span>
              </div>
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="flex items-center gap-1.5"
                >
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-[10px] font-mono text-red-400 uppercase">INCIDENT ACTIVE</span>
                </motion.div>
                <div className="text-[10px] font-mono text-white/25">07:42:18 WAT</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/5">

              {/* LEFT — Incident type selector */}
              <div className="p-5 flex flex-col gap-3">
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">Incident Type</div>
                {EMERGENCY_TYPES.map((et, i) => (
                  <button
                    key={et.id}
                    onClick={() => setActiveEmergency(i)}
                    className="flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-150"
                    style={{
                      borderColor: i === activeEmergency ? `${et.color}40` : 'rgba(255,255,255,0.05)',
                      background:  i === activeEmergency ? `${et.color}10` : 'transparent',
                    }}
                  >
                    <span className="text-lg leading-none">{et.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white truncate">{et.label}</div>
                      <div className="text-[10px] font-mono mt-0.5" style={{ color: et.color }}>
                        {et.severity} · {et.lgasAffected} LGA{et.lgasAffected > 1 ? 's' : ''} affected
                      </div>
                    </div>
                    {i === activeEmergency && (
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: et.color }} />
                    )}
                  </button>
                ))}

                {/* Severity strip */}
                <div className="mt-2 p-3 rounded-xl bg-white/3 border border-white/5">
                  <div className="text-[10px] font-mono text-white/30 uppercase mb-2">Severity Level</div>
                  <div className="flex gap-1.5">
                    {['WATCH','MODERATE','HIGH','CRITICAL'].map(s => {
                      const active = EMERGENCY_TYPES[activeEmergency].severity === s;
                      const colors: Record<string,string> = { WATCH:'#a78bfa', MODERATE:'#fbbf24', HIGH:'#fb923c', CRITICAL:'#f43f5e' };
                      return (
                        <div key={s} className="flex-1 h-5 rounded flex items-center justify-center text-[8px] font-bold font-mono transition-all"
                          style={{ background: active ? `${colors[s]}30` : 'rgba(255,255,255,0.04)', color: active ? colors[s] : 'rgba(255,255,255,0.15)', border: `1px solid ${active ? colors[s]+'40' : 'transparent'}` }}>
                          {s}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* CENTER — Outbreak zone map */}
              <div className="p-5 flex flex-col">
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-3">Affected Zones — Real-time Asset Map</div>
                <div className="relative flex-1 rounded-xl bg-[#080507] border border-white/5 overflow-hidden" style={{ minHeight: 260 }}>
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
                    {/* Grid */}
                    {[20,40,60,80].map(v => (
                      <g key={v}>
                        <line x1={v} y1={0} x2={v} y2={100} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                        <line x1={0} y1={v} x2={100} y2={v} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
                      </g>
                    ))}
                    {/* Outbreak zones */}
                    {OUTBREAK_ZONES.map((z, i) => {
                      const et = EMERGENCY_TYPES[activeEmergency];
                      return (
                        <g key={i}>
                          <motion.circle cx={z.x} cy={z.y} r={z.r}
                            fill={`${et.color}12`} stroke={et.color} strokeWidth="0.5"
                            animate={{ r: [z.r, z.r * 1.15, z.r], opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                          />
                          <text x={z.x} y={z.y + z.r + 4} fill="rgba(255,255,255,0.45)" fontSize="3.5" textAnchor="middle" fontFamily="monospace">{z.label}</text>
                          {/* Severity badge */}
                          <text x={z.x} y={z.y + 1.5} fill={et.color} fontSize="2.8" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
                            {z.severity === 'CRITICAL' ? '●' : '◐'}
                          </text>
                        </g>
                      );
                    })}
                    {/* Asset dots */}
                    {ASSET_DOTS.map((a, i) => {
                      const colors: Record<string,string> = { ambulance:'#f43f5e', drone:'#60a5fa', team:'#34d399' };
                      const shapes: Record<string,string> = { ambulance:'🚑', drone:'▲', team:'⬟' };
                      return (
                        <g key={i}>
                          <motion.circle cx={a.x} cy={a.y} r={2.2}
                            fill={colors[a.type] ?? '#fff'}
                            animate={{ cy: [a.y, a.y - 2, a.y] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.7, ease: 'easeInOut' }}
                          />
                          <text x={a.x + 2.8} y={a.y + 1} fill="rgba(255,255,255,0.4)" fontSize="2.8" fontFamily="monospace">{a.label}</text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Legend */}
                  <div className="absolute bottom-2 left-2 flex flex-col gap-1">
                    {[{c:'#f43f5e',l:'Ambulance'},{c:'#60a5fa',l:'Drone'},{c:'#34d399',l:'RRTF Team'}].map(({c,l}) => (
                      <div key={l} className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full" style={{background:c}} />
                        <span className="text-[8px] font-mono text-white/35">{l}</span>
                      </div>
                    ))}
                  </div>

                  {/* Live pulse top-right */}
                  <motion.div animate={{ opacity:[1,0.4,1] }} transition={{ duration:1.5,repeat:Infinity }}
                    className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500/15 border border-orange-500/25">
                    <Target className="w-3 h-3 text-orange-400" />
                    <span className="text-[9px] font-mono text-orange-400">TRACKING LIVE</span>
                  </motion.div>
                </div>
              </div>

              {/* RIGHT — Asset inventory + deploy buttons */}
              <div className="p-5 flex flex-col gap-3">
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">Response Assets</div>

                {Object.entries(assets).map(([key, a]) => {
                  const pct = Math.round((a.deployed / a.total) * 100);
                  const canDeploy = a.standby > 0;
                  return (
                    <div key={key} className="p-3 rounded-xl bg-white/3 border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base leading-none">{a.icon}</span>
                          <span className="text-xs font-semibold text-white">{a.label}</span>
                        </div>
                        <span className="text-[10px] font-mono text-white/30">{a.deployed}/{a.total}</span>
                      </div>

                      {/* Progress bar */}
                      <div className="h-1 bg-white/8 rounded-full overflow-hidden mb-2">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: a.color }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-[9px] font-mono text-white/30">
                          <span style={{ color: a.color }}>{a.standby}</span> standby · {a.deployed} deployed
                        </div>
                        <button
                          onClick={() => handleDeploy(key)}
                          disabled={!canDeploy || deploying === key}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold font-mono transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                          style={{
                            background: canDeploy ? `${a.color}25` : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${canDeploy ? a.color + '50' : 'rgba(255,255,255,0.08)'}`,
                            color: canDeploy ? a.color : 'rgba(255,255,255,0.25)',
                          }}
                        >
                          {deploying === key ? (
                            <motion.span animate={{ opacity:[1,0.3,1] }} transition={{ duration:0.6,repeat:Infinity }}>DEPLOYING…</motion.span>
                          ) : (
                            <><Zap className="w-3 h-3" /> DEPLOY {DEPLOY_AMOUNTS[key]}</>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Total summary */}
                <div className="mt-1 p-3 rounded-xl border border-white/5 bg-white/2">
                  <div className="text-[10px] font-mono text-white/30 mb-2">Total Assets Deployed</div>
                  <div className="text-2xl font-bold text-white font-mono">
                    {Object.values(assets).reduce((s,a) => s + a.deployed, 0)}
                    <span className="text-sm font-normal text-white/30 ml-1">
                      / {Object.values(assets).reduce((s,a) => s + a.total, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Deployment log */}
            <div className="border-t border-white/5 bg-[#0a0806]">
              <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5">
                <Radio className="w-3.5 h-3.5 text-white/25" />
                <span className="text-[10px] font-mono text-white/25 uppercase tracking-widest">Deployment Log — Real-time</span>
              </div>
              <div className="px-4 py-3 space-y-2">
                <AnimatePresence>
                  {log.map((entry, i) => (
                    <motion.div
                      key={`${entry.time}-${i}`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex items-center gap-3"
                    >
                      <span className="text-[10px] font-mono text-white/25 shrink-0">{entry.time}</span>
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: entry.color }} />
                      <span className="text-[11px] font-mono" style={{ color: i === 0 ? entry.color : 'rgba(255,255,255,0.45)' }}>
                        {entry.msg}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Explainer row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              { icon: MapPin,   color: '#fb923c', title: 'LGA-Level Targeting',      body: 'Zoom down to local government area resolution. Know exactly which wards are affected and route assets to the right staging points.' },
              { icon: Navigation2, color: '#60a5fa', title: 'Drone Recon Integration', body: 'Deploy aerial recon units to map the outbreak perimeter, assess flood coverage, or locate casualties in areas ground teams can\'t yet reach.' },
              { icon: Users,    color: '#34d399', title: 'Multi-Agency Coordination', body: 'State health, military, fire service, and NEMA can all operate from the same dashboard with role-based access — no crossed wires.' },
            ].map((item, i) => (
              <motion.div key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex gap-3 p-4 rounded-xl bg-white/2 border border-white/5"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}>
                  <item.icon className="w-4 h-4" style={{ color: item.color }} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white mb-1">{item.title}</div>
                  <div className="text-[11px] text-white/40 leading-relaxed">{item.body}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Emergency Scenario Walkthrough ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/25 bg-orange-500/8 text-orange-400 text-xs font-mono tracking-widest mb-4 uppercase">
              <AlertCircle className="w-3.5 h-3.5" /> Emergency Scenario
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Someone Collapses. Here's What Happens Next.
            </h3>
            <p className="text-white/45 text-sm max-w-xl mx-auto">
              From the moment SOS is triggered to the patient receiving expert care —
              every step runs on the Awajimaa platform.
            </p>
          </div>

          {/* Step selector tabs */}
          <div className="flex gap-2 justify-center flex-wrap mb-6">
            {EMERGENCY_STEPS.map((step, i) => (
              <button
                key={i}
                onClick={() => { setActiveStep(i); setAutoRun(false); }}
                className="w-8 h-8 rounded-full text-xs font-bold border transition-all duration-200 font-mono"
                style={{
                  background: i === activeStep ? `${step.color}25` : 'transparent',
                  borderColor: i === activeStep ? step.color : 'rgba(255,255,255,0.1)',
                  color: i === activeStep ? step.color : 'rgba(255,255,255,0.3)',
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Active step card */}
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28 }}
                className="rounded-2xl border p-8 relative overflow-hidden"
                style={{
                  borderColor: `${EMERGENCY_STEPS[activeStep].color}30`,
                  background: `${EMERGENCY_STEPS[activeStep].color}06`,
                }}
              >
                {/* Step number watermark */}
                <div className="absolute right-6 top-4 text-[80px] font-black leading-none pointer-events-none select-none"
                  style={{ color: `${EMERGENCY_STEPS[activeStep].color}08` }}>
                  {activeStep + 1}
                </div>

                <div className="flex items-start gap-5 relative z-10">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: `${EMERGENCY_STEPS[activeStep].color}18`, border: `1px solid ${EMERGENCY_STEPS[activeStep].color}35` }}>
                    {(() => {
                      const Icon = EMERGENCY_STEPS[activeStep].icon;
                      return <Icon className="w-7 h-7" style={{ color: EMERGENCY_STEPS[activeStep].color }} />;
                    })()}
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest mb-2"
                      style={{ color: EMERGENCY_STEPS[activeStep].color }}>
                      Step {activeStep + 1} of {EMERGENCY_STEPS.length}
                    </div>
                    <h4 className="text-xl font-bold text-white mb-3">{EMERGENCY_STEPS[activeStep].title}</h4>
                    <p className="text-white/65 leading-relaxed">{EMERGENCY_STEPS[activeStep].body}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-6 h-0.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    key={`bar-${activeStep}`}
                    className="h-full rounded-full"
                    style={{ background: EMERGENCY_STEPS[activeStep].color }}
                    initial={{ width: '0%' }}
                    animate={{ width: autoRun ? '100%' : `${((activeStep + 1) / EMERGENCY_STEPS.length) * 100}%` }}
                    transition={{ duration: autoRun ? 2.8 : 0.4, ease: 'linear' }}
                  />
                </div>

                {/* Nav arrows */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => { setActiveStep(s => Math.max(0, s - 1)); setAutoRun(false); }}
                    className="text-xs font-mono text-white/30 hover:text-white/60 transition-colors disabled:opacity-20"
                    disabled={activeStep === 0}
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={() => setAutoRun(a => !a)}
                    className="text-[10px] font-mono px-3 py-1 rounded-full border border-white/10 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {autoRun ? '⏸ Pause' : '▶ Auto'}
                  </button>
                  <button
                    onClick={() => { setActiveStep(s => Math.min(EMERGENCY_STEPS.length - 1, s + 1)); setAutoRun(false); }}
                    className="text-xs font-mono text-white/30 hover:text-white/60 transition-colors disabled:opacity-20"
                    disabled={activeStep === EMERGENCY_STEPS.length - 1}
                  >
                    Next →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Virtual consultation panel mockup ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-white mb-2">Inter-Hospital Virtual Consultation</h3>
            <p className="text-white/45 text-sm max-w-xl mx-auto">
              A district doctor in Kogi and a cardiologist at LUTH review the same patient file, share screens, and decide on a treatment plan — together, in real time.
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-2xl border border-white/8 bg-[#0d080b] overflow-hidden shadow-2xl">
            {/* Window chrome */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-[#100a0d]">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-mono text-white/50">Awajimaa Health · Secure Consultation Room #HC-2847</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] font-mono text-green-400">END-TO-END ENCRYPTED</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-0 divide-x divide-white/5">
              {/* Video feeds */}
              <div className="col-span-2 p-4 grid grid-rows-2 gap-3" style={{ minHeight: 280 }}>
                {/* Main feed */}
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-blue-900/30 to-[#060408] border border-white/5 flex items-end p-3">
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <Video className="w-16 h-16 text-blue-400" />
                  </div>
                  <div className="relative z-10 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-white/70">Dr. Chukwuemeka — Cardiologist · LUTH Lagos</span>
                  </div>
                </div>
                {/* Secondary feed */}
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-[#060408] border border-white/5 flex items-end p-3">
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <Stethoscope className="w-12 h-12 text-purple-400" />
                  </div>
                  <div className="relative z-10 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-white/70">Dr. Musa — District Hospital · Lokoja</span>
                  </div>
                </div>
              </div>

              {/* Patient data sidebar */}
              <div className="p-4 flex flex-col gap-3">
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">Patient File — Shared</div>

                {/* Record summary */}
                <div className="bg-rose-500/8 border border-rose-500/20 rounded-lg p-3 space-y-1.5">
                  <div className="text-[9px] font-mono text-rose-400 uppercase">🔒 Encrypted Record</div>
                  <div className="text-xs text-white font-medium">Mrs. Fatima A., 48F</div>
                  <div className="text-[10px] text-white/40">Blood Group: B+</div>
                  <div className="text-[10px] text-white/40">Known: Hypertension, T2DM</div>
                  <div className="text-[10px] text-white/40">Allergies: Penicillin</div>
                </div>

                {/* Vitals */}
                <div className="space-y-2">
                  {[
                    { label: 'BP', value: '158/94', color: '#f87171', warn: true },
                    { label: 'HR', value: '102 bpm', color: '#fb923c', warn: true },
                    { label: 'SpO₂', value: '97%', color: '#34d399', warn: false },
                  ].map(v => (
                    <div key={v.label} className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-white/35">{v.label}</span>
                      <span className="text-[10px] font-bold" style={{ color: v.color }}>{v.value}</span>
                    </div>
                  ))}
                </div>

                {/* Insurance chip */}
                <div className="bg-amber-500/8 border border-amber-500/20 rounded-lg p-2.5">
                  <div className="text-[9px] font-mono text-amber-400 uppercase mb-1">Insurance</div>
                  <div className="text-[10px] text-white">NHIS · Policy #N2-8841</div>
                  <div className="text-[10px] text-green-400 mt-0.5">✓ Cardiac Cover Active</div>
                </div>

                {/* Shared screen indicator */}
                <div className="flex items-center gap-1.5 mt-auto">
                  <Wifi className="w-3 h-3 text-blue-400" />
                  <span className="text-[9px] font-mono text-white/35">Scan shared · ECG uploading…</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Bottom stat row ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-rose-500/12 bg-rose-500/4 overflow-hidden"
        >
          <div className="px-6 py-5 border-b border-rose-500/10">
            <h4 className="text-base font-bold text-white">The Awajimaa Health Platform — By the Numbers</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-rose-500/8">
            {[
              { stat: '$350K',   label: 'Annual SaaS fee per subscribing state' },
              { stat: '< 18s',   label: 'Encrypted patient record transfer time' },
              { stat: '35,000+', label: 'Healthcare facilities addressable in Nigeria alone' },
              { stat: '$45B',    label: 'African health-tech TAM by 2030' },
            ].map(({ stat, label }, i) => (
              <motion.div key={stat}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="px-6 py-6"
              >
                <div className="text-3xl font-bold text-rose-400 mb-2">{stat}</div>
                <div className="text-xs text-white/45 leading-relaxed">{label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
