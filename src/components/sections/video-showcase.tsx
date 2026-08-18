import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Play, Pause, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const videos = [
  {
    id: 'awajimaa-app-video',
    title: 'Awajimaa App',
    subtitle: 'Emergency Response Ad',
    desc: 'The super-app that dispatches ambulances, reports crimes, and connects citizens to government services in seconds.',
    tags: ['Emergency', 'Civictech', 'Super-App'],
    path: '/awajimaa-app-video/',
    gradient: 'from-red-900/80 via-red-800/60 to-black',
    accent: '#ef4444',
    glow: 'rgba(239,68,68,0.4)',
    icon: '🚨',
  },
  {
    id: 'awajimaa-investor-video',
    title: 'Awajimaa Group',
    subtitle: 'Investor Vision Video',
    desc: "Africa's digital infrastructure story — the continent-scale opportunity, the platform, the team, and the tipping point.",
    tags: ['Investor', 'Vision', '$1B+ TAM'],
    path: '/awajimaa-investor-video/',
    gradient: 'from-yellow-900/80 via-amber-800/60 to-black',
    accent: '#FFB300',
    glow: 'rgba(255,179,0,0.4)',
    icon: '📈',
  },
  {
    id: 'awajimaa-ai-video',
    title: 'Awajimaa AI',
    subtitle: 'Business Platform Ad',
    desc: 'AI that writes your content, manages your social media, builds your APK, and grows your business — automatically.',
    tags: ['AI', 'Business', 'Automation'],
    path: '/awajimaa-ai-video/',
    gradient: 'from-violet-900/80 via-purple-800/60 to-black',
    accent: '#7c3aed',
    glow: 'rgba(124,58,237,0.4)',
    icon: '🤖',
  },
  {
    id: 'awajimaa-schools-video',
    title: 'Awajimaa Schools',
    subtitle: 'Education Platform Ad',
    desc: 'Digital classrooms, attendance tracking, and academic analytics for schools, states, and education ministries across Africa.',
    tags: ['EdTech', 'Government', 'SaaS'],
    path: '/awajimaa-schools-video/',
    gradient: 'from-blue-900/80 via-sky-800/60 to-black',
    accent: '#0ea5e9',
    glow: 'rgba(14,165,233,0.4)',
    icon: '🎓',
  },
  {
    id: 'genhal-explainer-video',
    title: 'GenHaL',
    subtitle: 'Preserve Your Roots',
    desc: 'Family trees, heritage recordings, language corpus, and wills — the digital infrastructure for African cultural memory.',
    tags: ['Heritage', 'Culture', 'Diaspora'],
    path: '/genhal-explainer-video/',
    gradient: 'from-amber-900/80 via-orange-800/60 to-black',
    accent: '#f59e0b',
    glow: 'rgba(245,158,11,0.4)',
    icon: '🌳',
  },
  {
    id: 'appstore-promo-video',
    title: 'Awajimaa App Store',
    subtitle: 'Promotional Ad',
    desc: 'The marketplace where African developers build, list, and monetise apps — keeping 85% of every sale.',
    tags: ['Developers', 'Marketplace', 'Apps'],
    path: '/appstore-promo-video/',
    gradient: 'from-green-900/80 via-emerald-800/60 to-black',
    accent: '#39FF14',
    glow: 'rgba(57,255,20,0.4)',
    icon: '🛍️',
  },
  {
    id: 'awajimaa-tools-video',
    title: 'Awajimaa AI Tools',
    subtitle: 'Creative Platform Video',
    desc: 'AI-powered creative tools: image generation, video production, social media content, and brand assets for every business.',
    tags: ['Creative', 'AI Tools', 'Content'],
    path: '/awajimaa-tools-video/',
    gradient: 'from-pink-900/80 via-rose-800/60 to-black',
    accent: '#ec4899',
    glow: 'rgba(236,72,153,0.4)',
    icon: '🎨',
  },
  {
    id: 'awahub-app-video',
    title: 'Awa Hub',
    subtitle: 'African Marketplace Ad',
    desc: 'Cross-border commerce for African merchants — list products, accept payments, and ship across 54 countries.',
    tags: ['Commerce', 'Marketplace', 'Africa'],
    path: '/awahub-app-video/',
    gradient: 'from-teal-900/80 via-cyan-800/60 to-black',
    accent: '#14b8a6',
    glow: 'rgba(20,184,166,0.4)',
    icon: '🛒',
  },
  {
    id: 'vendorhub-promo-video',
    title: 'Awa Biz Suite',
    subtitle: 'Promo Video',
    desc: 'The all-in-one business platform — orders, inventory, social media, invoicing, voice campaigns and more.',
    tags: ['SaaS', 'SMEs', 'Business'],
    path: '/vendorhub-promo-video/',
    gradient: 'from-indigo-900/80 via-blue-800/60 to-black',
    accent: '#6366f1',
    glow: 'rgba(99,102,241,0.4)',
    icon: '💼',
  },
  {
    id: 'vendorhub-walkthrough-video',
    title: 'Awa Biz Suite',
    subtitle: 'Full Walkthrough',
    desc: 'A complete tour of every feature — from onboarding to analytics, social media to APK builder.',
    tags: ['Walkthrough', 'Demo', 'Features'],
    path: '/vendorhub-walkthrough-video/',
    gradient: 'from-slate-800/80 via-gray-700/60 to-black',
    accent: '#94a3b8',
    glow: 'rgba(148,163,184,0.4)',
    icon: '▶️',
  },
];

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function VideoShowcase() {
  const [active, setActive] = useState(0);
  const [modal, setModal] = useState<number | null>(null);
  // videoPaused: user explicitly paused the inline player
  const [videoPaused, setVideoPaused] = useState(false);
  // sliderHovered: mouse is over the slider — pauses auto-advance
  const [sliderHovered, setSliderHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const next = useCallback(() => {
    setActive(i => (i + 1) % videos.length);
    setVideoPaused(false); // new slide always auto-plays
  }, []);
  const prev = useCallback(() => {
    setActive(i => (i - 1 + videos.length) % videos.length);
    setVideoPaused(false);
  }, []);

  // Jump to slide — also resets play state
  const goTo = useCallback((i: number) => {
    setActive(i);
    setVideoPaused(false);
  }, []);

  // Auto-advance only when: video is paused by user OR slider is not hovered,
  // AND the modal is closed. While the inline video plays, let it run uninterrupted.
  useEffect(() => {
    if (!videoPaused || sliderHovered || modal !== null) return;
    timerRef.current = setInterval(next, 5500);
    return () => clearInterval(timerRef.current);
  }, [videoPaused, sliderHovered, modal, next]);

  const v = videos[active];

  return (
    <section className="py-24 relative bg-[#050505] border-t border-white/5 overflow-hidden">
      {/* Ambient glow behind active card */}
      <motion.div
        key={active}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 50% at 50% 40%, ${v.glow}, transparent 70%)` }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.01 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 text-white/60 text-xs font-mono tracking-widest mb-4 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Now Playing — {videos.length} Videos
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Watch Us Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Africa.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Every platform, every use-case — in motion.
          </p>
        </motion.div>

        {/* Slider */}
        <div
          className="relative"
          onMouseEnter={() => setSliderHovered(true)}
          onMouseLeave={() => setSliderHovered(false)}
        >
          {/* Featured card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 60, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.97 }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* When playing: no 3D tilt (mouse events captured by iframe) */}
              <div className="max-w-5xl mx-auto">
                <div
                  className={`relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)]`}
                  style={{ aspectRatio: '16/9', background: '#000' }}
                >
                  {/* ── INLINE VIDEO (auto-plays, keyed so changing slide kills audio) ── */}
                  <AnimatePresence mode="wait">
                    {!videoPaused ? (
                      <motion.div
                        key={`playing-${v.path}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="absolute inset-0"
                      >
                        <iframe
                          key={v.path}
                          src={v.path}
                          title={v.title}
                          className="w-full h-full"
                          allow="autoplay"
                        />
                      </motion.div>
                    ) : (
                      /* ── PAUSED STATE: gradient preview card ── */
                      <motion.div
                        key={`paused-${v.path}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className={`absolute inset-0 bg-gradient-to-br ${v.gradient} flex items-center justify-center`}
                      >
                        {/* Background emoji */}
                        <div className="absolute inset-0 flex items-center justify-center text-[200px] opacity-5 select-none pointer-events-none">
                          {v.icon}
                        </div>
                        {/* Scanlines */}
                        <div className="absolute inset-0 pointer-events-none"
                          style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)' }} />
                        {/* Big resume button */}
                        <button
                          onClick={() => setVideoPaused(false)}
                          className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center border-2 border-white/30 bg-black/40 backdrop-blur-sm hover:scale-110 transition-transform"
                          style={{ boxShadow: `0 0 40px ${v.glow}` }}
                        >
                          <Play className="w-8 h-8 text-white fill-white ml-1" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── OVERLAY: always visible controls on top of the iframe ── */}
                  <div className="absolute inset-0 pointer-events-none z-10">
                    {/* Top bar: tags + icon + pause button */}
                    <div className="absolute top-0 left-0 right-0 flex items-start justify-between p-4 pointer-events-auto"
                      style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 100%)' }}
                    >
                      <div className="flex gap-2 flex-wrap">
                        {v.tags.map(t => (
                          <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm text-white/80 uppercase tracking-wider">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        {/* Pause / Resume toggle */}
                        <button
                          onClick={() => setVideoPaused(p => !p)}
                          className="w-9 h-9 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm hover:bg-black/70 transition-colors flex items-center justify-center text-white"
                          title={videoPaused ? 'Resume' : 'Pause'}
                        >
                          {videoPaused
                            ? <Play className="w-4 h-4 fill-white ml-0.5" />
                            : <Pause className="w-4 h-4 fill-white" />
                          }
                        </button>
                        {/* Fullscreen */}
                        <button
                          onClick={() => setModal(active)}
                          className="w-9 h-9 rounded-full bg-black/50 border border-white/20 backdrop-blur-sm hover:bg-black/70 transition-colors flex items-center justify-center text-white"
                          title="Fullscreen"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Bottom bar: title + description (only when paused) */}
                    <AnimatePresence>
                      {videoPaused && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="absolute bottom-0 left-0 right-0 p-6 md:p-10 pointer-events-auto"
                          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)' }}
                        >
                          <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">{v.subtitle}</p>
                          <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">{v.title}</h3>
                          <p className="text-white/60 text-sm max-w-lg leading-relaxed">{v.desc}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Accent progress bar — only while video is playing */}
                  {!videoPaused && (
                    <motion.div
                      key={`bar-${active}`}
                      className="absolute bottom-0 left-0 h-1 rounded-b-2xl z-20"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 5.5, ease: 'linear' }}
                      style={{ background: v.accent }}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 transition-colors flex items-center justify-center text-white/70 hover:text-white backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 transition-colors flex items-center justify-center text-white/70 hover:text-white backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="mt-8 flex gap-3 overflow-x-auto pb-2 scrollbar-hide justify-center flex-wrap">
          {videos.map((vid, i) => (
            <button
              key={vid.id}
              onClick={() => goTo(i)}
              className={`shrink-0 relative rounded-xl overflow-hidden border transition-all duration-300 ${
                i === active
                  ? 'border-white/40 scale-105 shadow-lg'
                  : 'border-white/10 opacity-50 hover:opacity-80 hover:border-white/20'
              }`}
              style={{
                width: 96, height: 54,
                background: `linear-gradient(135deg, ${vid.accent}33, #000)`,
                boxShadow: i === active ? `0 0 20px ${vid.glow}` : undefined,
              }}
            >
              <span className="absolute inset-0 flex items-center justify-center text-xl">{vid.icon}</span>
              {i === active && (
                <motion.div layoutId="thumb-indicator" className="absolute inset-0 ring-2 ring-white/40 rounded-xl" />
              )}
            </button>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-5">
          {videos.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i === active ? 24 : 6,
                background: i === active ? v.accent : 'rgba(255,255,255,0.2)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Modal / Lightbox */}
      <AnimatePresence>
        {modal !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            onClick={() => setModal(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" />

            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="relative w-full max-w-5xl z-10"
              onClick={e => e.stopPropagation()}
            >
              {/* Modal header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div>
                  <span className="text-xs font-mono text-white/40 uppercase tracking-widest">{videos[modal].subtitle}</span>
                  <h3 className="text-lg font-bold text-white">{videos[modal].title}</h3>
                </div>
                <button
                  onClick={() => setModal(null)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* iframe — keyed so React fully unmounts the old one (kills audio)
                  before mounting the new video. AnimatePresence mode="wait"
                  ensures exit completes before enter begins → zero audio overlap. */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={videos[modal].path}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black"
                  style={{ aspectRatio: '16/9' }}
                >
                  <iframe
                    key={videos[modal].path}
                    src={videos[modal].path}
                    title={videos[modal].title}
                    className="w-full h-full"
                    allow="autoplay"
                    loading="lazy"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Modal nav */}
              <div className="flex items-center justify-between mt-4 px-1">
                <button
                  onClick={() => setModal(m => m !== null ? (m - 1 + videos.length) % videos.length : 0)}
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <div className="flex gap-1">
                  {videos.map((_, i) => (
                    <button key={i} onClick={() => setModal(i)}
                      className="w-1.5 h-1.5 rounded-full transition-all"
                      style={{ background: i === modal ? videos[modal].accent : 'rgba(255,255,255,0.2)', width: i === modal ? 16 : 6 }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setModal(m => m !== null ? (m + 1) % videos.length : 0)}
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
