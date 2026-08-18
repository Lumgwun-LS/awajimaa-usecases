import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Truck, MapPin, Package, Navigation, Radio, LayoutDashboard,
  Wheat, ShoppingBag, Clock, Users, CheckCircle2, Zap,
} from 'lucide-react';

/* ─── Real African logistics operators ─────────────────────────────────── */
const OPERATORS = [
  'GIG Logistics', 'Kobo360', 'ABC Transport', 'Chisco Transport',
  'DHL Express', 'FedEx Africa', 'Kwik Delivery', 'Sendbox', 'Jumia Logistics',
  'Peace Mass Transit', 'Bolt Courier', 'MAX.ng Delivery', 'Trucking Africa',
  'LagosTruck', 'Lori Systems', 'Rida Logistics', 'Cargobase', 'Aramex Africa',
];

/* ─── Simulated live vehicle dots on the command map ──────────────────── */
type Dot = { id: number; x: number; y: number; label: string; active: boolean };
function generateDots(): Dot[] {
  const positions = [
    { x: 28, y: 28 }, { x: 45, y: 20 }, { x: 62, y: 15 }, { x: 55, y: 38 },
    { x: 38, y: 48 }, { x: 70, y: 30 }, { x: 25, y: 55 }, { x: 50, y: 60 },
    { x: 65, y: 52 }, { x: 32, y: 68 }, { x: 48, y: 74 }, { x: 72, y: 62 },
    { x: 18, y: 42 }, { x: 82, y: 45 }, { x: 58, y: 78 }, { x: 42, y: 35 },
    { x: 78, y: 20 }, { x: 22, y: 70 }, { x: 60, y: 42 }, { x: 36, y: 80 },
  ];
  return positions.map((p, i) => ({
    id: i,
    x: p.x,
    y: p.y,
    label: OPERATORS[i % OPERATORS.length].split(' ')[0],
    active: Math.random() > 0.3,
  }));
}

/* ─── Animated live counter ────────────────────────────────────────────── */
function LiveCounter({ end, suffix = '', label }: { end: number; suffix?: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = end / 60;
        const tick = () => {
          start = Math.min(start + step, end);
          setCount(Math.round(start));
          if (start < end) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-2xl md:text-3xl font-bold text-white font-mono">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mt-1">{label}</div>
    </div>
  );
}

const PLATFORM_FEATURES = [
  { icon: LayoutDashboard, label: 'Big-Screen Command Center', desc: 'Every vehicle visible in real-time on one screen — operators, dispatchers, and state regulators see everything at once.' },
  { icon: Radio,           label: 'Live GPS Fleet Tracking',  desc: 'Sub-minute location updates for every truck, bike, and van on the Awajimaa network, across all 54 African countries.' },
  { icon: Package,         label: 'Booking & Dispatch Engine', desc: 'Merchants book a pickup in the Awajimaa App. The nearest available driver is dispatched automatically.' },
  { icon: Wheat,           label: 'Farm-Produce Network',      desc: 'Refrigerated and open-bed routes for agri-cargo, connecting farms directly to markets with full cold-chain visibility.' },
  { icon: Navigation,      label: 'AI Route Optimisation',     desc: 'Traffic, road quality, fuel cost, and danger-zone data feed the routing engine. Drivers get the fastest, safest path.' },
  { icon: Users,           label: 'Driver Management',         desc: 'Onboarding, KYC, shift scheduling, earnings, and performance scores — all in one operator dashboard.' },
];

const CARGO_TYPES = [
  { icon: '🌾', label: 'Farm Produce' },
  { icon: '🏭', label: 'Factory Goods' },
  { icon: '🛒', label: 'E-Commerce' },
  { icon: '🏗️', label: 'Construction' },
  { icon: '💊', label: 'Pharmaceuticals' },
  { icon: '🐟', label: 'Perishables' },
];

export function Logistics() {
  const [dots] = useState<Dot[]>(generateDots);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPulse(p => (p + 1) % 3), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-28 relative bg-[#060a10] border-t border-white/5 overflow-hidden">

      {/* Floating amber/green orbs */}
      {[
        { w: 320, h: 320, top: '5%',  left: '2%',  color: '#f59e0b', delay: 0 },
        { w: 240, h: 240, top: '55%', right: '5%', color: '#22c55e', delay: 1.5 },
        { w: 180, h: 180, top: '25%', left: '75%', color: '#f59e0b', delay: 3 },
        { w: 200, h: 200, top: '70%', left: '15%', color: '#22c55e', delay: 2 },
        { w: 150, h: 150, top: '40%', left: '50%', color: '#f59e0b', delay: 4 },
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

      {/* Drifting truck/arrow shapes (subtle triangles) */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`truck-${i}`}
          className="absolute pointer-events-none"
          style={{
            top: `${20 + i * 18}%`,
            left: 0,
            opacity: 0.06,
            width: 0,
            height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderLeft: '16px solid #f59e0b',
          }}
          animate={{ x: ['-5%', '105vw'] }}
          transition={{ duration: 12 + i * 3, repeat: Infinity, delay: i * 3, ease: 'linear' }}
        />
      ))}

      {/* Background: subtle hex grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(rgba(0,200,120,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,120,.6) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

      {/* Green ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,200,100,0.07) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6 relative z-10">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono tracking-widest mb-5 uppercase">
            <Truck className="w-3.5 h-3.5" /> Multi-Vendor Logistics
          </div>
          <motion.h2
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight"
          >
            Every Truck in Africa,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
              On One Platform.
            </span>
          </motion.h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
            Africa's logistics giants no longer need their own apps or tech teams.
            Awajimaa powers their entire operation — from customer booking to last-mile delivery —
            on the continent's most-used super-app.
          </p>
        </motion.div>

        {/* Operator name marquee */}
        <div className="overflow-hidden mb-16 relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10"
            style={{ background: 'linear-gradient(to right, #060a10, transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10"
            style={{ background: 'linear-gradient(to left, #060a10, transparent)' }} />
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
            className="flex gap-4 w-max"
          >
            {[...OPERATORS, ...OPERATORS].map((name, i) => (
              <span key={i}
                className="shrink-0 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-300/80 text-sm font-medium whitespace-nowrap">
                🚛 {name}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">

          {/* LEFT — Fleet Command Center simulation */}
          <motion.div
            initial={{ x: -60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          >
            <div className="rounded-2xl border border-emerald-500/20 bg-[#080d13] overflow-hidden shadow-[0_0_60px_rgba(0,180,80,0.08)]">
              {/* Command center top bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0b1117]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest">Awajimaa Fleet Command — Live</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
                </div>
              </div>

              {/* Live stat bar */}
              <div className="grid grid-cols-3 divide-x divide-white/5 border-b border-white/5">
                <LiveCounter end={4218}  label="Trucks Online" />
                <LiveCounter end={18640} label="Deliveries Today" />
                <LiveCounter end={64}    label="Operators" />
              </div>

              {/* Map area — abstract Africa dot matrix */}
              <div className="relative bg-[#060a0e] overflow-hidden" style={{ paddingTop: '72%' }}>

                {/* Africa outline — minimal SVG silhouette */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                  <path
                    d="M35,8 L42,6 L55,8 L65,10 L72,16 L78,22 L82,30 L84,40 L82,50 L78,58 L72,65 L68,72 L62,80 L55,88 L50,94 L45,90 L40,82 L35,74 L28,65 L22,55 L18,45 L16,35 L18,26 L22,18 L28,12 Z"
                    fill="none"
                    stroke="rgba(0,200,100,0.15)"
                    strokeWidth="0.8"
                  />
                  {/* Continent fill shimmer */}
                  <path
                    d="M35,8 L42,6 L55,8 L65,10 L72,16 L78,22 L82,30 L84,40 L82,50 L78,58 L72,65 L68,72 L62,80 L55,88 L50,94 L45,90 L40,82 L35,74 L28,65 L22,55 L18,45 L16,35 L18,26 L22,18 L28,12 Z"
                    fill="rgba(0,180,80,0.03)"
                  />

                  {/* Vehicle dots */}
                  {dots.map((dot) => (
                    <g key={dot.id}>
                      {/* Pulse ring for active vehicles */}
                      {dot.active && (
                        <motion.circle
                          cx={dot.x}
                          cy={dot.y}
                          r={2}
                          fill="none"
                          stroke={dot.id % 3 === 0 ? '#34d399' : dot.id % 3 === 1 ? '#60a5fa' : '#fbbf24'}
                          strokeWidth="0.4"
                          initial={{ r: 0.5, opacity: 1 }}
                          animate={{ r: 3.5, opacity: 0 }}
                          transition={{ duration: 2, repeat: Infinity, delay: (dot.id * 0.3) % 2 }}
                        />
                      )}
                      {/* Vehicle dot */}
                      <motion.circle
                        cx={dot.x}
                        cy={dot.y}
                        r={1.2}
                        fill={dot.active
                          ? (dot.id % 3 === 0 ? '#34d399' : dot.id % 3 === 1 ? '#60a5fa' : '#fbbf24')
                          : 'rgba(255,255,255,0.2)'}
                        animate={dot.active ? {
                          cx: [dot.x, dot.x + (Math.random() > 0.5 ? 2 : -2), dot.x],
                          cy: [dot.y, dot.y + (Math.random() > 0.5 ? 2 : -2), dot.y],
                        } : {}}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: dot.id * 0.4 }}
                      />
                    </g>
                  ))}

                  {/* Route lines between some dots */}
                  {[
                    [dots[0], dots[4]], [dots[2], dots[6]], [dots[8], dots[12]], [dots[5], dots[10]],
                  ].map(([a, b], i) => a && b ? (
                    <line key={i}
                      x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                      stroke="rgba(0,200,100,0.12)" strokeWidth="0.4" strokeDasharray="1 1.5"
                    />
                  ) : null)}
                </svg>

                {/* Overlay legends */}
                <div className="absolute bottom-3 left-3 flex flex-col gap-1">
                  {[
                    { color: '#34d399', label: 'GIG / Kobo360' },
                    { color: '#60a5fa', label: 'DHL / FedEx' },
                    { color: '#fbbf24', label: 'Kwik / Sendbox' },
                  ].map(({ color, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                      <span className="text-[9px] font-mono text-white/40">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Live alert chip */}
                <motion.div
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[9px] font-mono text-emerald-400 uppercase">LIVE</span>
                </motion.div>

                {/* Active delivery popup */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-8 left-4 bg-[#0b1117]/90 border border-emerald-500/30 rounded-lg px-3 py-2 backdrop-blur-sm"
                >
                  <div className="text-[9px] font-mono text-emerald-400 mb-0.5">GIG-7821 · EN ROUTE</div>
                  <div className="text-[11px] text-white font-medium">Farm Produce · Lagos → Abuja</div>
                  <div className="text-[9px] text-white/40 mt-0.5">ETA: 4h 22min · ●●●●○ 78%</div>
                </motion.div>
              </div>

              {/* Bottom: Recent bookings ticker */}
              <div className="px-4 py-3 border-t border-white/5 space-y-1.5">
                {[
                  { op: 'Kobo360', cargo: 'Yam & Cassava (8T)', route: 'Enugu → Lagos', status: 'Delivering', color: '#34d399' },
                  { op: 'Kwik Delivery', cargo: 'Electronics (Pallets)', route: 'Ikeja → VI', status: 'Picked Up', color: '#60a5fa' },
                  { op: 'Lori Systems', cargo: 'Maize (12T)', route: 'Kano → Port Harcourt', status: 'In Transit', color: '#fbbf24' },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between text-[10px] font-mono">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: row.color }} />
                      <span className="text-white/70">{row.op}</span>
                      <span className="text-white/30">·</span>
                      <span className="text-white/50">{row.cargo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/30">{row.route}</span>
                      <span className="px-1.5 py-0.5 rounded text-[8px]" style={{ background: `${row.color}22`, color: row.color }}>{row.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Copy + features */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="text-white/50 text-base leading-relaxed mb-4">
                GIG Logistics moves millions of parcels a year but spends fortunes on proprietary software that barely works. Kobo360 connects truck owners to cargo — but still runs on fragmented tech.
              </p>
              <p className="text-white/70 text-base leading-relaxed">
                <span className="text-emerald-400 font-semibold">Awajimaa changes that entirely.</span> Every logistics operator in Africa — from a 3-truck startup to a 2,000-vehicle national carrier — plugs into our unified platform and immediately gets enterprise-grade fleet management, a ready-made customer base of 50 million Awajimaa users, and a real-time command center on any screen. No development costs. No maintenance. Just operations.
              </p>
            </div>

            {/* Feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PLATFORM_FEATURES.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: i * 0.1 }}
                  className="group bg-[#0b1117] border border-white/5 hover:border-emerald-500/30 p-4 rounded-xl transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <f.icon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white mb-1">{f.label}</div>
                      <div className="text-xs text-white/45 leading-relaxed">{f.desc}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Cargo types */}
            <div>
              <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-3">Cargo Types Supported</div>
              <div className="flex flex-wrap gap-2">
                {CARGO_TYPES.map(c => (
                  <span key={c.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70">
                    <span>{c.icon}</span> {c.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Revenue model */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-emerald-500/8 border border-emerald-500/20 p-4 rounded-xl">
                <div className="text-[10px] font-mono text-emerald-400/70 uppercase tracking-widest mb-1">SaaS Revenue</div>
                <motion.div
                  className="text-2xl font-bold text-white"
                  animate={{ textShadow: ['0 0 0px transparent', '0 0 20px #22c55e', '0 0 0px transparent'] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >$150K</motion.div>
                <div className="text-xs text-white/40">per major operator / yr</div>
              </div>
              <div className="bg-white/3 border border-white/8 p-4 rounded-xl">
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">TAM — Africa Logistics</div>
                <motion.div
                  className="text-2xl font-bold text-white"
                  animate={{ textShadow: ['0 0 0px transparent', '0 0 20px #f59e0b', '0 0 0px transparent'] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }}
                >$180B</motion.div>
                <div className="text-xs text-white/40">market by 2030</div>
              </div>
            </div>

            {/* Key outcome */}
            <div className="flex items-start gap-3 p-4 rounded-xl border border-emerald-500/15 bg-emerald-500/5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-sm text-white/70 leading-relaxed">
                Logistics operators stop spending $500K–$2M/yr on custom software. They pay Awajimaa a fraction of that and immediately reach 50M+ users — their tech problem is solved on Day 1.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
