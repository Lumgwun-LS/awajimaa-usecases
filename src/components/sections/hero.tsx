import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Download } from 'lucide-react';
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
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
            href="https://awajimaaappstore.com"
            target="_blank"
            rel="noreferrer"
            className="h-14 px-8 bg-primary text-black font-semibold rounded hover:bg-primary/90 transition-colors flex items-center gap-2 text-lg"
          >
            <Download className="w-5 h-5" /> Get the App
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