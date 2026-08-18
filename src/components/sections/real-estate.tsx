import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2, Home, DollarSign, Users, Video, Shield,
  MapPin, Navigation, Eye, Bell, CheckCircle2, Clock,
  Key, Wifi, ChevronRight, LayoutDashboard, Calendar,
  Camera, AlertCircle, Star, ArrowRight, Wrench,
  ClipboardList, Hammer, TriangleAlert,
} from 'lucide-react';

/* ─── Landlord properties ───────────────────────────────────────────────── */
const PROPERTIES = [
  { id: 'P001', name: 'Lekki Pearl Estate', type: '16-unit Apartment Block', location: 'Lekki Phase 1, Lagos', units: 16, occupied: 14, rent: '₦450,000/mo', arrears: 1, maintenance: 2, color: '#6366f1' },
  { id: 'P002', name: 'Victoria Gardens',   type: '6 Terrace Houses',        location: 'Victoria Island, Lagos',units:  6, occupied:  6, rent: '₦780,000/mo', arrears: 0, maintenance: 0, color: '#34d399' },
  { id: 'P003', name: 'Abuja Highrise',     type: '24-unit Serviced Apt',    location: 'Maitama, Abuja',       units: 24, occupied: 19, rent: '₦320,000/mo', arrears: 3, maintenance: 4, color: '#fb923c' },
];

/* ─── Maintenance requests ──────────────────────────────────────────────── */
const MAINTENANCE = [
  {
    id: 'M001', unit: 'A3', tenant: 'Mr Tunde R.',
    issue: 'AC unit not cooling — compressor fault',
    category: 'HVAC', priority: 'HIGH',
    reported: 'Aug 16', status: 'IN PROGRESS',
    assignee: 'CoolTech Services', eta: 'Today 4 PM',
  },
  {
    id: 'M002', unit: 'B7', tenant: 'Mrs Amaka O.',
    issue: 'Roof leak above master bedroom after rain',
    category: 'Structural', priority: 'URGENT',
    reported: 'Aug 18', status: 'PENDING',
    assignee: '—', eta: 'Awaiting assignment',
  },
  {
    id: 'M003', unit: 'C2', tenant: 'Dr Emeka N.',
    issue: 'Gate remote not responding',
    category: 'Security', priority: 'LOW',
    reported: 'Aug 15', status: 'RESOLVED',
    assignee: 'Estate Security', eta: 'Fixed Aug 16',
  },
  {
    id: 'M004', unit: 'A9', tenant: 'Ms Bisi F.',
    issue: 'Water heater not producing hot water',
    category: 'Plumbing', priority: 'MEDIUM',
    reported: 'Aug 17', status: 'SCHEDULED',
    assignee: 'AquaFix Ltd', eta: 'Aug 19, 10 AM',
  },
];

/* ─── Visitor log ───────────────────────────────────────────────────────── */
const VISITORS = [
  { name: 'Mr Emeka Okafor',   purpose: 'Rent Inspection',  time: '10:32',  status: 'IN',   unit: 'A4'  },
  { name: 'Dr Aisha Bello',    purpose: 'Property Viewing', time: '11:05',  status: 'IN',   unit: 'B2'  },
  { name: 'Delivery — Jumia',  purpose: 'Package Drop',     time: '09:18',  status: 'OUT',  unit: 'Gate' },
  { name: 'Maintenance Crew',  purpose: 'AC Repair',        time: '08:45',  status: 'OUT',  unit: 'C7'  },
];

/* ─── Rent status ───────────────────────────────────────────────────────── */
const RENT_ROWS = [
  { tenant: 'Mrs Fatima A.', unit: 'A1', amount: '₦450,000', due: 'Jul 1',  status: 'PAID',    method: 'Bank Transfer' },
  { tenant: 'Mr James O.',   unit: 'A2', amount: '₦450,000', due: 'Jul 1',  status: 'PAID',    method: 'Card' },
  { tenant: 'Mr Tunde R.',   unit: 'A3', amount: '₦450,000', due: 'Jul 1',  status: 'OVERDUE', method: '—' },
  { tenant: 'Dr Ngozi E.',   unit: 'A4', amount: '₦450,000', due: 'Aug 1',  status: 'DUE',     method: '—' },
];

/* ─── Features ──────────────────────────────────────────────────────────── */
const FEATURES = [
  { icon: LayoutDashboard, color: '#6366f1', title: 'Estate Management Dashboard',   desc: 'See all your properties, units, occupancy rates, and revenue from one screen. Switch between estates instantly. Flag maintenance requests, vacancies, and lease renewals at a glance.' },
  { icon: DollarSign,      color: '#34d399', title: 'Digital Rent Collection',        desc: 'Automated payment reminders sent to tenants 7 days before due date. Instant bank transfer, card, or USSD. Receipts generated automatically. Overdue alerts with escalation to the landlord.' },
  { icon: Wrench,          color: '#f59e0b', title: 'Maintenance Request & Tracking', desc: 'Tenants log faults from the app — with photo evidence. Landlords assign contractors, set ETAs, and track every job from PENDING to RESOLVED. Priority levels: Urgent, High, Medium, Low.' },
  { icon: Users,           color: '#60a5fa', title: 'Visitor Management',              desc: 'Tenants pre-register guests via the app. Security scans QR codes at the gate. Time-stamped entry and exit log. Unexpected visitors flagged to the landlord and tenant instantly.' },
  { icon: Video,           color: '#a78bfa', title: 'Virtual Tenant Meetings',         desc: 'Hold rent review meetings, handle complaints, and conduct lease renewals over video — without either party needing to travel. Recordings stored for dispute resolution.' },
  { icon: Shield,          color: '#f43f5e', title: 'Security & Access Control',       desc: 'Guard duty shift logs. Incident reporting with photo evidence. Real-time alert to landlord on any security event. Digital access control for gates and common areas.' },
  { icon: Camera,          color: '#fb923c', title: 'Listing & Virtual Tours',         desc: 'Post vacant units with photos, floor plans, and a 360° virtual tour or video walkthrough. Prospective tenants browse and shortlist before ever leaving home.' },
];

/* ─── Listing preview ───────────────────────────────────────────────────── */
const LISTING = {
  title: '3-Bedroom Apartment',
  estate: 'Lekki Pearl Estate, Block A',
  price: '₦5,400,000/yr',
  beds: 3, baths: 2, size: '142 m²',
  features: ['24/7 Security', 'Backup Power', 'Swimming Pool', 'Gym', 'Car Park'],
  rating: 4.8, reviews: 12,
};

/* ─── Nav waypoints for inspection route ───────────────────────────────── */
const NAV_STEPS = [
  { icon: '📍', label: 'Your Location', sub: 'Victoria Island, Lagos', color: '#34d399' },
  { icon: '🛣️', label: 'Lekki Expressway', sub: '6.2 km · 18 min', color: '#60a5fa' },
  { icon: '🏢', label: 'Lekki Pearl Estate', sub: 'Arrive · Gate B', color: '#6366f1' },
  { icon: '🗓️', label: 'Inspection Booked', sub: '2:30 PM · Mr Balogun (Agent)', color: '#fbbf24' },
];

export function RealEstate() {
  const [activeProp, setActiveProp] = useState(0);
  const [activeTab, setActiveTab] = useState<'rent' | 'visitors' | 'security' | 'maintenance'>('rent');
  const [navStep, setNavStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setNavStep(s => (s + 1) % NAV_STEPS.length), 1800);
    return () => clearInterval(id);
  }, []);

  const prop = PROPERTIES[activeProp];

  return (
    <section className="py-28 relative bg-[#06080f] border-t border-white/5 overflow-hidden">

      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 65%)' }} />

      <div className="container mx-auto px-6 relative z-10">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-mono tracking-widest mb-5 uppercase">
            <Home className="w-3.5 h-3.5" /> Real Estate & Property Management
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Every Property Managed.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400">
              Every Move, Guided.
            </span>
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed">
            Landlords manage their entire estate portfolio from one dashboard — rents, maintenance jobs, visitors, security, and meetings.
            Tenants log faults from their phones; landlords assign contractors and track every job to resolution.
            Prospective tenants take virtual tours, then let the app navigate them to the property for a physical inspection.
          </p>
        </motion.div>

        {/* ── Two-column: Landlord dashboard + Feature cards ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start mb-24">

          {/* LEFT (3/5) — Landlord dashboard */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-2xl border border-indigo-500/15 bg-[#080a14] overflow-hidden shadow-[0_0_60px_rgba(99,102,241,0.05)]">

              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#090b16] border-b border-white/5">
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                  <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-widest">Landlord Command · Alhaji Musa Estates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bell className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px] font-mono text-amber-400">3 alerts</span>
                </div>
              </div>

              {/* Property selector pills */}
              <div className="flex gap-2 px-4 py-3 border-b border-white/5 overflow-x-auto">
                {PROPERTIES.map((p, i) => (
                  <button key={p.id} onClick={() => setActiveProp(i)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs whitespace-nowrap transition-all duration-150"
                    style={{
                      borderColor: i === activeProp ? `${p.color}50` : 'rgba(255,255,255,0.06)',
                      background:  i === activeProp ? `${p.color}12` : 'transparent',
                      color: i === activeProp ? p.color : 'rgba(255,255,255,0.35)',
                    }}>
                    <Building2 className="w-3 h-3" />
                    {p.name}
                  </button>
                ))}
              </div>

              {/* Active property stats */}
              <AnimatePresence mode="wait">
                <motion.div key={activeProp}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="grid grid-cols-4 divide-x divide-white/5 border-b border-white/5">
                    {[
                      { label: 'Units',       value: `${prop.units}`,                  sub: 'total' },
                      { label: 'Occupied',    value: `${prop.occupied}`,               sub: `${Math.round((prop.occupied/prop.units)*100)}%` },
                      { label: 'Arrears',     value: `${prop.arrears}`,                sub: 'tenants', warn: prop.arrears > 0 },
                      { label: 'Maintenance', value: `${prop.maintenance}`,            sub: 'open jobs', warn: prop.maintenance > 0 },
                    ].map(({ label, value, sub, warn }) => (
                      <div key={label} className="px-3 py-3 text-center">
                        <div className={`text-base font-bold font-mono ${warn ? 'text-red-400' : 'text-white'}`}>{value}</div>
                        <div className="text-[9px] font-mono text-white/30 uppercase">{label}</div>
                        <div className="text-[9px] text-white/20 mt-0.5">{sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tab bar */}
                  <div className="flex gap-0 border-b border-white/5">
                    {(['rent', 'visitors', 'security', 'maintenance'] as const).map(tab => (
                      <button key={tab} onClick={() => setActiveTab(tab)}
                        className="flex-1 py-2 text-[10px] font-mono uppercase tracking-widest transition-colors border-b-2 relative"
                        style={{
                          color: activeTab === tab ? prop.color : 'rgba(255,255,255,0.25)',
                          borderBottomColor: activeTab === tab ? prop.color : 'transparent',
                        }}>
                        {tab === 'maintenance' ? 'jobs' : tab}
                        {tab === 'maintenance' && prop.maintenance > 0 && (
                          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-amber-400" />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Tab content */}
                  <AnimatePresence mode="wait">
                    <motion.div key={activeTab}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      {activeTab === 'rent' && (
                        <div className="divide-y divide-white/4">
                          {RENT_ROWS.map(r => {
                            const sc = { PAID: '#34d399', OVERDUE: '#f43f5e', DUE: '#fb923c' }[r.status]!;
                            return (
                              <div key={r.tenant} className="flex items-center justify-between px-4 py-2.5">
                                <div className="flex items-center gap-3">
                                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-white/50">{r.unit}</div>
                                  <div>
                                    <div className="text-xs text-white font-medium">{r.tenant}</div>
                                    <div className="text-[10px] text-white/30 font-mono">Due {r.due} · {r.method}</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-xs font-mono text-white/60">{r.amount}</span>
                                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold font-mono uppercase"
                                    style={{ color: sc, background: `${sc}15`, border: `1px solid ${sc}30` }}>{r.status}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {activeTab === 'visitors' && (
                        <div className="divide-y divide-white/4">
                          {VISITORS.map(v => (
                            <div key={v.name} className="flex items-center justify-between px-4 py-2.5">
                              <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full shrink-0 ${v.status === 'IN' ? 'bg-green-400' : 'bg-white/20'}`} />
                                <div>
                                  <div className="text-xs text-white font-medium">{v.name}</div>
                                  <div className="text-[10px] text-white/30 font-mono">{v.purpose} · Unit {v.unit}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-white/30">{v.time}</span>
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono"
                                  style={{ color: v.status === 'IN' ? '#34d399' : 'rgba(255,255,255,0.2)', background: v.status === 'IN' ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.04)' }}>
                                  {v.status}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === 'security' && (
                        <div className="p-4 space-y-2">
                          {[
                            { icon: CheckCircle2, color: '#34d399', msg: 'Guard shift handover logged — 8:00 AM', time: '08:01' },
                            { icon: AlertCircle,  color: '#f43f5e', msg: 'Unauthorised vehicle at Gate B — plate captured', time: '10:14' },
                            { icon: CheckCircle2, color: '#34d399', msg: 'Maintenance crew ID verified at entrance', time: '08:47' },
                            { icon: Bell,         color: '#fb923c', msg: 'Fire exit door held open > 2 min — Unit C Wing', time: '11:30' },
                          ].map((e, i) => (
                            <div key={i} className="flex items-start gap-3 p-2 rounded-lg bg-white/2 border border-white/5">
                              <e.icon className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: e.color }} />
                              <div className="flex-1">
                                <div className="text-[11px] text-white/65">{e.msg}</div>
                              </div>
                              <span className="text-[10px] font-mono text-white/20 shrink-0">{e.time}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === 'maintenance' && (
                        <div>
                          <div className="divide-y divide-white/4">
                            {MAINTENANCE.map(m => {
                              const priorityColor = {
                                URGENT: '#f43f5e', HIGH: '#fb923c',
                                MEDIUM: '#f59e0b', LOW: '#60a5fa',
                              }[m.priority]!;
                              const statusColor = {
                                'IN PROGRESS': '#a78bfa', PENDING: '#fb923c',
                                RESOLVED: '#34d399', SCHEDULED: '#60a5fa',
                              }[m.status]!;
                              return (
                                <div key={m.id} className="px-4 py-3">
                                  <div className="flex items-start justify-between gap-3 mb-1.5">
                                    <div className="flex items-start gap-2.5 flex-1 min-w-0">
                                      <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                                        style={{ background: `${priorityColor}18`, border: `1px solid ${priorityColor}25` }}>
                                        <Wrench className="w-3 h-3" style={{ color: priorityColor }} />
                                      </div>
                                      <div className="min-w-0">
                                        <div className="text-xs font-medium text-white leading-snug">{m.issue}</div>
                                        <div className="text-[10px] text-white/30 font-mono mt-0.5">
                                          Unit {m.unit} · {m.tenant} · {m.category}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1 shrink-0">
                                      <span className="px-1.5 py-0.5 rounded text-[8px] font-bold font-mono uppercase"
                                        style={{ color: priorityColor, background: `${priorityColor}15` }}>
                                        {m.priority}
                                      </span>
                                      <span className="px-1.5 py-0.5 rounded text-[8px] font-mono uppercase"
                                        style={{ color: statusColor, background: `${statusColor}12` }}>
                                        {m.status}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between pl-8">
                                    <div className="flex items-center gap-1 text-[10px] text-white/25 font-mono">
                                      <Hammer className="w-2.5 h-2.5" />
                                      {m.assignee}
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] font-mono"
                                      style={{ color: m.status === 'RESOLVED' ? '#34d399' : 'rgba(255,255,255,0.25)' }}>
                                      <Clock className="w-2.5 h-2.5" />
                                      {m.eta}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="px-4 py-2.5 border-t border-white/5 bg-[#090b16]">
                            <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-indigo-500/20 bg-indigo-500/8 text-[11px] font-bold text-indigo-300 hover:bg-indigo-500/15 transition-colors">
                              <ClipboardList className="w-3.5 h-3.5" /> Log New Maintenance Request
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>

              {/* Quick actions */}
              <div className="flex gap-2 px-4 py-3 border-t border-white/5 bg-[#090b16]">
                {[
                  { icon: DollarSign, label: 'Rent Reminder', color: '#34d399' },
                  { icon: Wrench,     label: 'New Job',        color: '#f59e0b' },
                  { icon: Video,      label: 'Meeting',        color: '#a78bfa' },
                  { icon: Key,        label: 'Access',         color: '#60a5fa' },
                  { icon: Bell,       label: 'Alert Tenant',   color: '#fb923c' },
                ].map(a => (
                  <button key={a.label}
                    className="flex-1 flex flex-col items-center gap-1 py-2 rounded-lg border border-white/5 hover:border-white/10 transition-colors"
                    style={{ background: `${a.color}08` }}>
                    <a.icon className="w-3.5 h-3.5" style={{ color: a.color }} />
                    <span className="text-[9px] font-mono text-white/30">{a.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT (2/5) — Feature cards */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-white/45 text-sm leading-relaxed mb-1">
              Managing an estate in Nigeria means collecting rents by hand, calling tenants for every issue,
              and having no record of who enters or leaves. Awajimaa ends that completely.
            </p>
            {FEATURES.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="flex gap-3 p-3.5 rounded-xl border border-white/5 bg-[#080a14] hover:border-indigo-500/15 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${f.color}15`, border: `1px solid ${f.color}20` }}>
                  <f.icon className="w-4 h-4" style={{ color: f.color }} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white mb-0.5">{f.title}</div>
                  <div className="text-[11px] text-white/35 leading-relaxed">{f.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Tenant experience: Virtual tour + Navigation ─────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              The Tenant Experience
            </h3>
            <p className="text-white/40 text-sm max-w-xl mx-auto">
              Browse listings, take a virtual tour, and let the app guide you straight to the door for a physical inspection.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Property listing card */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.45 }}
              className="rounded-2xl border border-white/8 bg-[#080a14] overflow-hidden"
            >
              {/* Photo placeholder */}
              <div className="relative h-44 bg-gradient-to-br from-indigo-900/30 to-[#060810]">
                <div className="absolute inset-0 flex items-center justify-center opacity-15">
                  <Home className="w-20 h-20 text-indigo-300" />
                </div>
                <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-indigo-600/80 text-[10px] font-bold text-white">AVAILABLE</div>
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 text-[10px] font-mono text-white">
                  <Camera className="w-3 h-3" /> 8 photos
                </div>
                {/* Virtual tour badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-violet-600/80 border border-violet-400/30 backdrop-blur-sm">
                  <Eye className="w-3.5 h-3.5 text-white" />
                  <span className="text-[10px] font-bold text-white">360° Virtual Tour</span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <div className="text-sm font-bold text-white">{LISTING.title}</div>
                    <div className="text-[11px] text-white/40 mt-0.5">{LISTING.estate}</div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-[11px] font-mono text-amber-400">{LISTING.rating}</span>
                  </div>
                </div>
                <div className="text-base font-bold text-indigo-400 mb-3">{LISTING.price}</div>

                <div className="flex gap-3 mb-3 text-[11px] text-white/40 font-mono">
                  <span>🛏 {LISTING.beds} beds</span>
                  <span>🚿 {LISTING.baths} baths</span>
                  <span>📐 {LISTING.size}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {LISTING.features.map(f => (
                    <span key={f} className="px-2 py-0.5 rounded-full text-[9px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20">{f}</span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-violet-600/20 border border-violet-500/30 text-[11px] font-bold text-violet-300">
                    <Eye className="w-3.5 h-3.5" /> Virtual Tour
                  </button>
                  <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-[11px] font-bold text-indigo-300">
                    <Navigation className="w-3.5 h-3.5" /> Navigate
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Virtual tour panel */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="rounded-2xl border border-violet-500/15 bg-[#0a080f] overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0b0910] border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-violet-400" />
                  <span className="text-[11px] font-mono text-violet-400 uppercase tracking-widest">Virtual Tour</span>
                </div>
                <span className="text-[10px] font-mono text-white/20">360°</span>
              </div>

              {/* Mock tour viewport */}
              <div className="relative h-40 bg-gradient-to-br from-slate-800/50 to-[#060408] flex items-center justify-center border-b border-white/5">
                <motion.div
                  animate={{ rotate: [0, 3, 0, -3, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-violet-600/20 border-2 border-violet-500/30 flex items-center justify-center mx-auto mb-2">
                    <Eye className="w-8 h-8 text-violet-400 opacity-60" />
                  </div>
                  <div className="text-[10px] font-mono text-white/25">Living Room · Looking North</div>
                </motion.div>
                {/* Room navigation dots */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                  {['Living', 'Kitchen', 'Bed 1', 'Bed 2', 'Bath'].map((r, i) => (
                    <div key={r} className="w-1.5 h-1.5 rounded-full"
                      style={{ background: i === 0 ? '#a78bfa' : 'rgba(255,255,255,0.15)' }} />
                  ))}
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="text-xs font-bold text-white mb-2">Browse Rooms</div>
                {['Living Room', 'Kitchen', 'Master Bedroom', 'Bathroom', 'Balcony'].map((room, i) => (
                  <div key={room} className="flex items-center justify-between py-1.5 border-b border-white/4 last:border-0">
                    <div className="flex items-center gap-2 text-[11px] text-white/50">
                      <div className="w-4 h-4 rounded bg-violet-500/15 flex items-center justify-center text-[8px]">🏠</div>
                      {room}
                    </div>
                    <div className="flex items-center gap-1 text-[9px] text-violet-400">
                      <Eye className="w-2.5 h-2.5" /> View
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Navigation to property */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="rounded-2xl border border-indigo-500/15 bg-[#080a14] overflow-hidden"
            >
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#090b16] border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-indigo-400" />
                  <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-widest">Navigate to Property</span>
                </div>
                <motion.div
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex items-center gap-1"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span className="text-[9px] font-mono text-indigo-400">LIVE</span>
                </motion.div>
              </div>

              {/* Mini map placeholder */}
              <div className="relative h-36 bg-[#070910] border-b border-white/5 overflow-hidden">
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 100">
                  {/* Road lines */}
                  {[[0,50,200,50],[100,0,100,100],[30,0,160,100],[0,20,200,80]].map(([x1,y1,x2,y2],i)=>(
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(99,102,241,0.3)" strokeWidth="1.5"/>
                  ))}
                </svg>
                {/* Route line */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100">
                  <motion.path
                    d="M 20 80 Q 80 60 100 50 Q 140 35 170 25"
                    fill="none" stroke="#6366f1" strokeWidth="2.5" strokeDasharray="6 3"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.5, ease: 'easeInOut' }}
                  />
                  <circle cx="20" cy="80" r="4" fill="#34d399" />
                  <circle cx="170" cy="25" r="5" fill="#6366f1" />
                  <text x="155" y="18" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">DESTINATION</text>
                </svg>
                {/* ETA badge */}
                <div className="absolute bottom-2 right-2 px-2 py-1 rounded-lg bg-[#0d1020]/90 border border-indigo-500/25 backdrop-blur-sm">
                  <div className="text-xs font-bold text-white font-mono">18 min</div>
                  <div className="text-[9px] text-white/30 font-mono">6.2 km</div>
                </div>
              </div>

              {/* Step by step */}
              <div className="p-4 space-y-2.5">
                {NAV_STEPS.map((step, i) => (
                  <motion.div key={step.label}
                    animate={{ opacity: navStep >= i ? 1 : 0.3 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm"
                      style={{ background: navStep >= i ? `${step.color}20` : 'rgba(255,255,255,0.04)', border: `1px solid ${navStep >= i ? step.color+'40' : 'rgba(255,255,255,0.06)'}` }}>
                      {step.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-semibold text-white">{step.label}</div>
                      <div className="text-[10px] text-white/35 font-mono">{step.sub}</div>
                    </div>
                    {navStep >= i && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: step.color }} />}
                  </motion.div>
                ))}
              </div>

              <div className="px-4 pb-4">
                <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-xs font-bold text-indigo-300 hover:bg-indigo-600/30 transition-colors">
                  <Navigation className="w-3.5 h-3.5" /> Start Navigation
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Bottom stats ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-indigo-500/12 bg-indigo-500/3 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-indigo-500/10">
            <h4 className="text-sm font-bold text-white">Awajimaa Real Estate — The Opportunity</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-indigo-500/8">
            {[
              { stat: '$180B',   label: 'Nigerian real estate market value (2024)' },
              { stat: '17M+',    label: 'Housing unit deficit across Nigeria' },
              { stat: '₦0',      label: 'Cost to post a property listing on Awajimaa' },
              { stat: '2%–3%',   label: 'Commission on transactions processed through the platform' },
            ].map(({ stat, label }, i) => (
              <motion.div key={stat}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="px-6 py-5"
              >
                <div className="text-2xl font-bold text-indigo-400 font-mono mb-1">{stat}</div>
                <div className="text-[11px] text-white/35 leading-relaxed">{label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
