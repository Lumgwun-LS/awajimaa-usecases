import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, Star, Users, DollarSign, CheckCircle2,
  ChevronRight, Award, Vote, Ticket, Medal,
  Crown, BarChart2, Bell, Settings, Layers,
  ArrowRight, ClipboardList, BadgeCheck, Sparkles,
} from 'lucide-react';

/* ─── Award programs ────────────────────────────────────────────────────── */
const PROGRAMS = [
  { id: 'tech',  name: 'Nigeria Tech Awards 2025',     org: 'TechHub Nigeria',       cats: 12, nominees: 148, votes: 34_271, revenue: '₦17.1M', color: '#f59e0b' },
  { id: 'sme',   name: 'Best SME Awards 2025',         org: 'Nairametrics Group',    cats:  8, nominees:  96, votes: 21_840, revenue: '₦10.9M', color: '#a78bfa' },
  { id: 'media', name: 'African Media Excellence',     org: 'Pan-African Media Org', cats: 10, nominees: 112, votes: 28_560, revenue: '₦14.3M', color: '#34d399' },
];

/* ─── Categories ────────────────────────────────────────────────────────── */
const CATEGORIES = [
  { name: 'Startup of the Year',      nominees: 18, votes: 8_420, status: 'VOTING OPEN' },
  { name: 'Best Fintech Product',     nominees: 14, votes: 7_200, status: 'VOTING OPEN' },
  { name: 'Tech CEO of the Year',     nominees: 12, votes: 6_100, status: 'VOTING OPEN' },
  { name: 'EdTech Innovation Award',  nominees:  9, votes: 5_441, status: 'CLOSED'      },
  { name: 'Best Developer Community', nominees: 11, votes: 4_320, status: 'VOTING OPEN' },
];

/* ─── Nominees ──────────────────────────────────────────────────────────── */
const NOMINEES = [
  { name: 'Paystack Inc.',    cat: 'Best Fintech Product', votes: 4_201, pct: 88, status: 'SHORTLISTED', initials: 'PA' },
  { name: 'Flutterwave',      cat: 'Best Fintech Product', votes: 3_800, pct: 79, status: 'SHORTLISTED', initials: 'FL' },
  { name: 'Piggyvest',        cat: 'Best Fintech Product', votes: 2_940, pct: 62, status: 'SHORTLISTED', initials: 'PV' },
  { name: 'Kuda Bank',        cat: 'Best Fintech Product', votes: 1_820, pct: 38, status: 'REVIEWING',   initials: 'KB' },
];

/* ─── Vote tally (live) ─────────────────────────────────────────────────── */
const TALLY = [
  { label: 'Paystack Inc.',   pct: 88, color: '#f59e0b' },
  { label: 'Flutterwave',     pct: 79, color: '#fb923c' },
  { label: 'Piggyvest',       pct: 62, color: '#60a5fa' },
  { label: 'Kuda Bank',       pct: 38, color: '#a78bfa' },
  { label: 'Carbon Finance',  pct: 21, color: '#34d399' },
];

/* ─── Voting card nominees ──────────────────────────────────────────────── */
const VOTE_NOMINEES = [
  { name: 'Dr Amaka Okonkwo',  org: 'Ventures Park',   cat: 'Tech CEO of the Year', initials: 'AO', color: '#f59e0b' },
  { name: 'Mr Emeka Eze',      org: 'Andela Nigeria',  cat: 'Tech CEO of the Year', initials: 'EE', color: '#a78bfa' },
  { name: 'Ms Temi Bankole',   org: 'Hotels.ng',       cat: 'Tech CEO of the Year', initials: 'TB', color: '#34d399' },
];

/* ─── Features ──────────────────────────────────────────────────────────── */
const FEATURES = [
  { icon: ClipboardList,  color: '#f59e0b', title: 'Open Nominations',        desc: 'Publish a nomination form with your custom categories. The public submits nominees via a shareable link. You review, shortlist, and approve entries from a single dashboard.' },
  { icon: Vote,           color: '#a78bfa', title: 'Paid Public Voting',       desc: 'Set a voting fee per vote (e.g. ₦500). Voters pay via Paystack, bank transfer, or card before their vote is counted. Revenue deposited directly to the award organisation.' },
  { icon: Layers,         color: '#60a5fa', title: 'Category Management',      desc: 'Unlimited award categories. Set voting open/close dates per category independently. Configure maximum votes per voter per category.' },
  { icon: BarChart2,      color: '#34d399', title: 'Live Vote Leaderboard',    desc: 'Real-time vote tally visible to the public or kept private until announcement. Percentage bars update live. Tie-breaking rules configurable.' },
  { icon: Ticket,         color: '#fb923c', title: 'Ceremony Ticket Sales',    desc: 'Sell tickets to the award gala — standard, VIP, table bookings. QR code e-tickets. Check-in via the app. Capacity management built in.' },
  { icon: BadgeCheck,     color: '#f43f5e', title: 'Digital Winner Certificates', desc: 'Auto-generate branded digital certificates for winners. Shareable link, downloadable PDF, verifiable QR code. Nominees get participation certificates too.' },
];

/* ─── Nomination flow steps ─────────────────────────────────────────────── */
const NOM_STEPS = [
  { icon: '📋', title: 'Publish Form',    desc: 'Organisation creates categories and opens nominations' },
  { icon: '✍️', title: 'Public Nominates', desc: 'Anyone submits a nominee via the public link' },
  { icon: '🔍', title: 'Review & Shortlist', desc: 'Org reviews all submissions, approves shortlist' },
  { icon: '🗳️', title: 'Voting Opens',    desc: 'Public votes — each vote costs the set fee' },
  { icon: '🏆', title: 'Winners Announced', desc: 'Top vote-getter crowned; certificates auto-generated' },
];

/* ─── Animated vote counter ─────────────────────────────────────────────── */
function LiveVoteCount({ from, target }: { from: number; target: number }) {
  const [val, setVal] = useState(from);
  useEffect(() => {
    const id = setInterval(() => {
      setVal(v => {
        const next = v + Math.ceil((target - from) / 40);
        return next >= target ? target : next;
      });
    }, 60);
    return () => clearInterval(id);
  }, [from, target]);
  return <span>{val.toLocaleString()}</span>;
}

export function Awards() {
  const [activeProg, setActiveProg] = useState(0);
  const [activeTab, setActiveTab] = useState<'nominees' | 'voting' | 'categories'>('nominees');
  const [voteState, setVoteState] = useState<'idle' | 'paying' | 'done'>('idle');
  const [votedIdx, setVotedIdx] = useState<number | null>(null);

  const prog = PROGRAMS[activeProg];

  function castVote(i: number) {
    setVoteState('paying');
    setVotedIdx(i);
    setTimeout(() => setVoteState('done'), 1800);
  }

  return (
    <section className="py-28 relative bg-[#09080a] border-t border-white/5 overflow-hidden">

      {/* Radial gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 65%)' }} />
      {/* Subtle sparkle dots */}
      {[...Array(12)].map((_, i) => (
        <motion.div key={i}
          className="absolute w-0.5 h-0.5 rounded-full bg-amber-400/30"
          style={{ left: `${8 + i * 8}%`, top: `${10 + (i % 4) * 20}%` }}
          animate={{ opacity: [0.2, 0.7, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">

        {/* ── Header ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-mono tracking-widest mb-5 uppercase">
            <Trophy className="w-3.5 h-3.5" /> Awards & Recognition Platform
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
            Where Excellence<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400">
              Is Recognised.
            </span>
          </h2>
          <p className="text-white/55 text-lg max-w-2xl mx-auto leading-relaxed">
            Award organisations manage every stage on one platform — open nominations, paid public voting,
            live leaderboards, ceremony ticketing, and digital certificates for winners.
          </p>
        </motion.div>

        {/* ── Nomination flow ────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="relative overflow-hidden rounded-2xl border border-amber-500/12 bg-amber-500/3 p-8">
            <div className="text-[10px] font-mono text-amber-500/50 uppercase tracking-widest text-center mb-6">End-to-End Award Flow</div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-0 relative">
              {/* Connecting line on desktop */}
              <div className="absolute top-5 left-[10%] right-[10%] h-px bg-gradient-to-r from-amber-500/10 via-amber-500/30 to-amber-500/10 hidden md:block" />
              {NOM_STEPS.map((s, i) => (
                <motion.div key={s.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center relative z-10"
                >
                  <div className="w-10 h-10 rounded-full bg-[#100d00] border border-amber-500/30 flex items-center justify-center text-xl mb-3">
                    {s.icon}
                  </div>
                  <div className="text-xs font-bold text-amber-400 mb-1">{s.title}</div>
                  <div className="text-[10px] text-white/35 leading-relaxed max-w-[120px]">{s.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Two columns: Dashboard + Voting card ──────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start mb-24">

          {/* LEFT (3/5) — Award management dashboard */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-2xl border border-amber-500/15 bg-[#0b0900] overflow-hidden shadow-[0_0_60px_rgba(245,158,11,0.04)]">

              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0d0b00] border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest">Award Control Centre</span>
                </div>
                <div className="flex items-center gap-1">
                  <motion.div className="w-1.5 h-1.5 rounded-full bg-amber-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity }} />
                  <span className="text-[10px] font-mono text-amber-400/60">LIVE</span>
                </div>
              </div>

              {/* Program selector */}
              <div className="flex flex-col gap-1 p-3 border-b border-white/5 bg-[#0a0800]">
                {PROGRAMS.map((p, i) => (
                  <button key={p.id} onClick={() => setActiveProg(i)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg border text-left transition-all duration-150 text-xs"
                    style={{
                      borderColor: i === activeProg ? `${p.color}40` : 'rgba(255,255,255,0.05)',
                      background:  i === activeProg ? `${p.color}10`  : 'transparent',
                    }}>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-3 h-3 shrink-0" style={{ color: i === activeProg ? p.color : 'rgba(255,255,255,0.2)' }} />
                      <div>
                        <span className={i === activeProg ? 'text-white font-semibold' : 'text-white/35'}>{p.name}</span>
                        <span className="text-[10px] text-white/25 ml-2 font-mono">{p.org}</span>
                      </div>
                    </div>
                    {i === activeProg && <ChevronRight className="w-3 h-3" style={{ color: p.color }} />}
                  </button>
                ))}
              </div>

              {/* Stats strip */}
              <AnimatePresence mode="wait">
                <motion.div key={activeProg}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="grid grid-cols-4 divide-x divide-white/5 border-b border-white/5">
                    {[
                      { label: 'Categories', value: `${prog.cats}` },
                      { label: 'Nominees',   value: `${prog.nominees}` },
                      { label: 'Votes Cast', value: prog.votes.toLocaleString() },
                      { label: 'Revenue',    value: prog.revenue, gold: true },
                    ].map(({ label, value, gold }) => (
                      <div key={label} className="px-3 py-3 text-center">
                        <div className={`text-base font-bold font-mono ${gold ? 'text-amber-400' : 'text-white'}`}>{value}</div>
                        <div className="text-[9px] font-mono text-white/30 uppercase mt-0.5">{label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tab bar */}
                  <div className="flex border-b border-white/5">
                    {(['nominees', 'voting', 'categories'] as const).map(tab => (
                      <button key={tab} onClick={() => setActiveTab(tab)}
                        className="flex-1 py-2 text-[10px] font-mono uppercase tracking-widest transition-colors border-b-2"
                        style={{
                          color: activeTab === tab ? prog.color : 'rgba(255,255,255,0.25)',
                          borderBottomColor: activeTab === tab ? prog.color : 'transparent',
                        }}>
                        {tab}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div key={activeTab}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {/* Nominees tab */}
                      {activeTab === 'nominees' && (
                        <div className="divide-y divide-white/4">
                          {NOMINEES.map(n => {
                            const sc = { SHORTLISTED: '#34d399', REVIEWING: '#fb923c' }[n.status]!;
                            return (
                              <div key={n.name} className="flex items-center justify-between px-4 py-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white/70 bg-amber-500/15 border border-amber-500/20 shrink-0">
                                    {n.initials}
                                  </div>
                                  <div>
                                    <div className="text-xs font-semibold text-white">{n.name}</div>
                                    <div className="text-[10px] text-white/30 font-mono">{n.cat}</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <div className="text-right">
                                    <div className="text-xs font-mono text-white/70">{n.votes.toLocaleString()} votes</div>
                                    <div className="w-20 h-1 bg-white/5 rounded-full mt-1 overflow-hidden">
                                      <motion.div className="h-full rounded-full"
                                        style={{ background: prog.color }}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${n.pct}%` }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8 }}
                                      />
                                    </div>
                                  </div>
                                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase"
                                    style={{ color: sc, background: `${sc}15` }}>{n.status}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Voting/tally tab */}
                      {activeTab === 'voting' && (
                        <div className="p-4 space-y-3">
                          <div className="text-[10px] font-mono text-white/30 mb-2 uppercase tracking-widest">Best Fintech Product — Live Tally</div>
                          {TALLY.map((t, i) => (
                            <div key={t.label} className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-white/65">{t.label}</span>
                                <span className="text-[10px] font-mono" style={{ color: t.color }}>{t.pct}%</span>
                              </div>
                              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <motion.div className="h-full rounded-full"
                                  style={{ background: t.color }}
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${t.pct}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 0.9, delay: i * 0.08 }}
                                />
                              </div>
                            </div>
                          ))}
                          <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono text-white/25">
                            <span>Total votes: <span className="text-amber-400">7,200</span></span>
                            <span>Voting closes: Aug 30</span>
                          </div>
                        </div>
                      )}

                      {/* Categories tab */}
                      {activeTab === 'categories' && (
                        <div className="divide-y divide-white/4">
                          {CATEGORIES.map(c => (
                            <div key={c.name} className="flex items-center justify-between px-4 py-2.5">
                              <div>
                                <div className="text-xs text-white font-medium">{c.name}</div>
                                <div className="text-[10px] text-white/30 font-mono mt-0.5">{c.nominees} nominees · {c.votes.toLocaleString()} votes</div>
                              </div>
                              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase"
                                style={{
                                  color: c.status === 'VOTING OPEN' ? '#34d399' : 'rgba(255,255,255,0.25)',
                                  background: c.status === 'VOTING OPEN' ? 'rgba(52,211,153,0.12)' : 'rgba(255,255,255,0.04)',
                                  border: `1px solid ${c.status === 'VOTING OPEN' ? 'rgba(52,211,153,0.25)' : 'rgba(255,255,255,0.06)'}`,
                                }}>
                                {c.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>

              {/* Admin actions */}
              <div className="flex gap-2 px-4 py-3 border-t border-white/5 bg-[#0a0800]">
                {[
                  { icon: Users,         label: 'Nominations', color: '#f59e0b' },
                  { icon: Vote,          label: 'Voting Setup', color: '#a78bfa' },
                  { icon: Ticket,        label: 'Tickets',      color: '#34d399' },
                  { icon: BadgeCheck,    label: 'Certificates', color: '#fb923c' },
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

          {/* RIGHT (2/5) — Public voting card */}
          <motion.div
            className="lg:col-span-2 space-y-4"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.7 }}
          >
            {/* Voting card */}
            <div className="rounded-2xl border border-amber-500/20 bg-[#0c0a00] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e0c00] border-b border-amber-500/10">
                <div className="flex items-center gap-2">
                  <Vote className="w-4 h-4 text-amber-400" />
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest">Public Vote</span>
                </div>
                <span className="text-[10px] font-mono text-amber-500/50">₦500 / vote</span>
              </div>

              <div className="p-4">
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-3">Tech CEO of the Year — Nigeria Tech Awards 2025</div>

                <div className="space-y-2 mb-4">
                  {VOTE_NOMINEES.map((n, i) => (
                    <motion.button key={n.name}
                      onClick={() => voteState === 'idle' && castVote(i)}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-150 text-left"
                      style={{
                        borderColor: votedIdx === i && voteState !== 'idle'
                          ? `${n.color}50` : 'rgba(255,255,255,0.06)',
                        background: votedIdx === i && voteState !== 'idle'
                          ? `${n.color}10` : 'rgba(255,255,255,0.02)',
                      }}>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                        style={{ background: `${n.color}25`, border: `1px solid ${n.color}30` }}>
                        {n.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-white">{n.name}</div>
                        <div className="text-[10px] text-white/35 font-mono">{n.org}</div>
                      </div>
                      {votedIdx === i && voteState === 'done'
                        ? <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: n.color }} />
                        : <div className="w-4 h-4 rounded-full border-2 shrink-0"
                            style={{ borderColor: votedIdx === i ? n.color : 'rgba(255,255,255,0.15)' }} />
                      }
                    </motion.button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {voteState === 'idle' && (
                    <motion.button key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => votedIdx !== null && setVoteState('paying')}
                      className="w-full py-2.5 rounded-xl text-xs font-bold transition-colors"
                      style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#fbbf24' }}>
                      Cast Vote · ₦500 via Paystack
                    </motion.button>
                  )}
                  {voteState === 'paying' && (
                    <motion.div key="paying"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-center"
                    >
                      <div className="text-xs text-amber-400 mb-1 font-mono">Processing payment…</div>
                      <div className="flex justify-center gap-1">
                        {[0,1,2].map(i => (
                          <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-400"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }} />
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {voteState === 'done' && (
                    <motion.div key="done"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded-xl border border-green-500/25 bg-green-500/8 p-3 text-center"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto mb-1" />
                      <div className="text-xs text-green-400 font-bold">Vote Counted!</div>
                      <div className="text-[10px] text-white/30 mt-0.5">Receipt sent to your email</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Vote count footer */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/5 bg-[#0a0800]">
                <span className="text-[10px] font-mono text-white/25">Total votes cast today</span>
                <span className="text-xs font-bold text-amber-400 font-mono">
                  <LiveVoteCount from={6_100} target={6_127} />
                </span>
              </div>
            </div>

            {/* Feature cards */}
            {FEATURES.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                className="flex gap-3 p-3.5 rounded-xl border border-white/5 bg-[#0b0900] hover:border-amber-500/12 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${f.color}15`, border: `1px solid ${f.color}20` }}>
                  <f.icon className="w-3.5 h-3.5" style={{ color: f.color }} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white mb-0.5">{f.title}</div>
                  <div className="text-[11px] text-white/35 leading-relaxed">{f.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Winner certificate mockup ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Certificate preview */}
            <div className="rounded-2xl border border-amber-500/20 bg-gradient-to-br from-[#120e00] to-[#080600] p-8 text-center relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.08) 0%, transparent 60%)' }} />
              <div className="relative z-10">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-amber-500/15 border-2 border-amber-500/40 flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-amber-400" />
                  </div>
                </div>
                <div className="text-[9px] font-mono text-amber-500/50 uppercase tracking-[4px] mb-2">Certificate of Excellence</div>
                <div className="text-lg font-bold text-white mb-1">Paystack Inc.</div>
                <div className="text-xs text-amber-400 mb-3">Winner — Best Fintech Product</div>
                <div className="text-[10px] text-white/30 leading-relaxed max-w-xs mx-auto mb-5">
                  This certifies that the above has been selected as the recipient of this award
                  at the <em>Nigeria Tech Awards 2025</em>, as determined by public vote.
                </div>
                <div className="flex items-center justify-center gap-6 pt-4 border-t border-amber-500/10">
                  <div className="text-center">
                    <div className="w-16 h-px bg-amber-500/30 mb-1" />
                    <div className="text-[9px] text-white/25 font-mono">Organisation Seal</div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <BadgeCheck className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-px bg-amber-500/30 mb-1" />
                    <div className="text-[9px] text-white/25 font-mono">Verify at awajimaa.com</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gala ticket */}
            <div className="rounded-2xl border border-amber-500/20 bg-[#0b0900] overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 bg-[#100d00] border-b border-amber-500/10">
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-amber-400" />
                  <span className="text-[11px] font-mono text-amber-400 uppercase tracking-widest">Gala Ceremony Tickets</span>
                </div>
              </div>
              <div className="p-5 space-y-3">
                {[
                  { tier: 'Standard Entry',    price: '₦15,000',  avail: 340, cap: 500, color: '#60a5fa' },
                  { tier: 'VIP Seat',          price: '₦45,000',  avail:  28, cap:  80, color: '#a78bfa' },
                  { tier: 'Table Booking (10)', price: '₦350,000', avail:   5, cap:  20, color: '#f59e0b' },
                ].map(t => (
                  <div key={t.tier} className="p-3.5 rounded-xl border border-white/6 bg-white/2">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-xs font-semibold text-white">{t.tier}</div>
                        <div className="text-[10px] text-white/35 font-mono">{t.avail} remaining of {t.cap}</div>
                      </div>
                      <div className="text-sm font-bold font-mono" style={{ color: t.color }}>{t.price}</div>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full"
                        style={{ background: t.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(t.avail / t.cap) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-[9px] text-white/20 font-mono">{Math.round((1 - t.avail/t.cap)*100)}% sold</span>
                      <button className="text-[10px] font-bold px-2.5 py-1 rounded-lg"
                        style={{ color: t.color, background: `${t.color}15`, border: `1px solid ${t.color}25` }}>
                        Buy Ticket
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex items-center gap-2 pt-1">
                  <BadgeCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="text-[10px] text-white/30">QR e-ticket delivered instantly · App check-in at the gate</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Bottom stats ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-amber-500/12 bg-amber-500/3 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-amber-500/10">
            <h4 className="text-sm font-bold text-white">The Awards Economy — Awajimaa's Opportunity</h4>
            <p className="text-[11px] text-white/30 mt-0.5">Nigeria alone hosts 300+ annual award events. Each drives ticketing, voting fees, and ceremony revenue — all flowing through the platform.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-amber-500/8">
            {[
              { stat: '300+',    label: 'Annual award events in Nigeria alone' },
              { stat: '₦500',    label: 'Average voting fee — ₦50 commission per vote to Awajimaa' },
              { stat: '5%',      label: 'Platform commission on ceremony ticket sales' },
              { stat: '₦17M+',  label: 'Revenue generated from a single mid-size tech awards event' },
            ].map(({ stat, label }, i) => (
              <motion.div key={stat}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="px-6 py-5"
              >
                <div className="text-2xl font-bold text-amber-400 font-mono mb-1">{stat}</div>
                <div className="text-[11px] text-white/35 leading-relaxed">{label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
