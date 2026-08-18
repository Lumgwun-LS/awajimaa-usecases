import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import heroImg from '@assets/generated_images/hero-africa.jpg';
import iconLogo from '@assets/awa_3_1787004494041.jpg';

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/80 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background z-10"></div>
        <img 
          src={heroImg} 
          alt="Africa from space" 
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Floating golden orbs */}
      {[
        { w: 500, h: 500, top: '5%',  left: '10%',  color: '#f59e0b', delay: 0 },
        { w: 350, h: 350, top: '55%', left: '65%',  color: '#fbbf24', delay: 1.2 },
        { w: 280, h: 280, top: '20%', left: '70%',  color: '#f59e0b', delay: 2.4 },
        { w: 220, h: 220, top: '70%', left: '5%',   color: '#fcd34d', delay: 0.8 },
        { w: 180, h: 180, top: '40%', left: '45%',  color: '#f59e0b', delay: 3.2 },
        { w: 120, h: 120, top: '85%', left: '80%',  color: '#fbbf24', delay: 1.8 },
      ].map((o, i) => (
        <motion.div key={i}
          className="absolute rounded-full pointer-events-none z-0"
          style={{
            width: o.w, height: o.h, top: o.top, left: o.left,
            background: `radial-gradient(circle, ${o.color}14 0%, transparent 70%)`,
            filter: 'blur(50px)',
          }}
          animate={{ y: [0, -30, 0], x: [0, 15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: o.delay }}
        />
      ))}

      {/* Slow rotating large ring centered behind logo */}
      <motion.div
        className="absolute pointer-events-none z-0"
        style={{
          width: 500, height: 500,
          top: '50%', left: '50%',
          marginTop: -250, marginLeft: -250,
          borderRadius: '50%',
          border: '1px solid rgba(245,158,11,0.04)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {/* Flying upward particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none z-0"
          style={{
            left: `${8 + i * 9}%`,
            bottom: '10%',
            background: i % 2 === 0 ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.15)',
          }}
          animate={{ y: [0, -140, 0], opacity: [0, 0.7, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
        />
      ))}

      <div className="relative z-20 container mx-auto px-6 text-center">
        {/* Icon mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <img
            src={iconLogo}
            alt="Awajimaa"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover shadow-[0_0_40px_rgba(57,255,20,0.25)] ring-2 ring-white/10"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-mono tracking-wider mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          UNIFIED CIVICTECH · FINTECH · SUPER-APP
        </motion.div>

        <motion.h1 
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-tight"
        >
          Mission Control <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            For Africa.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="text-sm md:text-base font-mono tracking-[0.25em] text-white/40 uppercase mb-4"
        >
          Stay Safe, Do More, And Be More
        </motion.p>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light"
        >
          A unified Civictech &amp; Fintech super-app for{' '}
          <span className="text-primary font-medium">Reporting Emergencies</span>,{' '}
          <span className="text-secondary font-medium">Commerce</span>, and{' '}
          <span className="text-white font-medium">Education</span> —
          the digital infrastructure powering States &amp; Organizations across Africa and beyond.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://awajimaaappstore.com/dl/awajimaa-app"
            target="_blank"
            rel="noreferrer"
            className="h-14 px-8 bg-primary text-black font-semibold rounded hover:bg-primary/90 transition-colors flex items-center gap-2 text-lg"
          >
            Enter The Awajimaa App
          </a>
          <a
            href="https://awajimaaappstore.com"
            target="_blank"
            rel="noreferrer"
            className="h-14 px-8 border border-white/20 text-white font-semibold rounded hover:bg-white/5 transition-colors text-lg flex items-center gap-2"
          >
            Browse App Store <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs font-mono uppercase tracking-widest">Scroll to initialize</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </motion.div>
    </section>
  );
}
