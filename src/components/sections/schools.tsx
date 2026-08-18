import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Bot, 
  GraduationCap, 
  Users, 
  LineChart, 
  BellRing,
  Globe
} from 'lucide-react';
import schoolsBg from '@assets/generated_images/schools.jpg';

const features = [
  { icon: BookOpen, title: "School Management", desc: "Enrollment, class management, attendance, fee payments, report cards." },
  { icon: Bot, title: "AI Tutor", desc: "Students ask questions in natural language — AI answers in their local language." },
  { icon: GraduationCap, title: "Teacher Tools", desc: "Lesson plan generator, quiz builder, automated grading." },
  { icon: Users, title: "Parent Dashboard", desc: "Track child's progress, receive attendance alerts, pay fees online." },
  { icon: LineChart, title: "Government Dashboard", desc: "States subscribe to track educational metrics for every school in their state." },
  { icon: BellRing, title: "Ecosystem Integration", desc: "Connects to Awajimaa App for emergency alerts (evacuations) and tele-health for students." }
];

export function Schools() {
  return (
    <section className="py-32 relative bg-background border-t border-white/5 overflow-hidden">

      {/* Floating green orbs */}
      {[
        { w: 300, h: 300, top: '5%',  left: '3%',  color: '#22c55e', delay: 0 },
        { w: 220, h: 220, top: '60%', right: '5%', color: '#22c55e', delay: 1.5 },
        { w: 180, h: 180, top: '28%', left: '72%', color: '#14b8a6', delay: 3 },
        { w: 160, h: 160, top: '78%', left: '18%', color: '#22c55e', delay: 2 },
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

      {/* Flying particles (green) */}
      {[...Array(6)].map((_, i) => (
        <motion.div key={`p-${i}`}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{ left: `${10 + i * 14}%`, bottom: '10%', background: 'rgba(34,197,94,0.3)' }}
          animate={{ y: [0, -120, 0], opacity: [0, 0.6, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
        />
      ))}

      {/* Floating star/sparkle shapes */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute pointer-events-none select-none text-green-400/20 text-lg font-bold"
          style={{ left: `${8 + i * 20}%`, bottom: `${15 + i * 6}%` }}
          animate={{ y: [0, -60, 0], opacity: [0, 0.15, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 4 + i * 1, repeat: Infinity, delay: i * 0.8 }}
        >
          ✦
        </motion.div>
      ))}
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={schoolsBg} alt="Awajimaa Schools Dashboard" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background/80"></div>
        {/* Subtle green glow */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(57,255,20,0.05),transparent_60%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-primary font-mono text-sm tracking-wider mb-4 border border-primary/30 inline-block px-3 py-1 rounded-full bg-primary/10">
              AWAJIMAA SCHOOLS
            </div>
            <motion.h2
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Empowering The Next <br className="hidden md:block"/>Billion Minds.
            </motion.h2>
            <p className="text-xl text-muted-foreground mb-4">
              Connecting schools, teachers, students, and parents across Africa with AI-powered learning tools.
            </p>
            <a href="https://awajimaaschools.com" target="_blank" rel="noreferrer" className="text-sm font-mono text-primary hover:underline flex items-center justify-center gap-2 mb-8">
              <Globe className="w-4 h-4" /> awajimaaschools.com
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: i * 0.1 }}
                className="bg-card/40 backdrop-blur border border-white/10 p-6 rounded-xl hover:bg-card/60 transition-colors"
              >
                <f.icon className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-bold text-lg mb-2 text-white">{f.title}</h4>
                <p className="text-sm text-white/60">{f.desc}</p>
              </motion.div>
            ))}
            
            <div className="col-span-1 sm:col-span-2 bg-secondary/10 border border-secondary/20 p-6 rounded-xl flex items-center justify-center gap-3">
              <Globe className="w-5 h-5 text-secondary" />
              <span className="text-secondary font-medium">Cross-platform: Works on low-bandwidth mobile networks, SMS fallback</span>
            </div>
          </div>

          <motion.div 
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.2 }}
            className="lg:col-span-5 bg-gradient-to-br from-black to-card border border-white/10 rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px]"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/20 blur-[50px]"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6 font-mono text-white/90">Scale & Revenue</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Per-student SaaS Model</div>
                  <motion.div
                    className="text-3xl font-bold text-primary"
                    animate={{ textShadow: ['0 0 0px transparent', '0 0 20px #22c55e', '0 0 0px transparent'] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    $2<span className="text-lg text-white/50 font-normal">/student/mo</span>
                  </motion.div>
                </div>
                
                <div className="h-px w-full bg-white/10"></div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Market Context</div>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Nigeria alone has <strong>50M</strong> school-age children. A single State Government mandate equals instant adoption at massive scale.
                  </p>
                </div>
                
                <div className="h-px w-full bg-white/10"></div>
                
                <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <div className="text-xs font-mono text-primary uppercase tracking-wider mb-1">Initial Target (1M Students)</div>
                  <motion.div
                    className="text-3xl font-bold text-white"
                    animate={{ textShadow: ['0 0 0px transparent', '0 0 20px #22c55e', '0 0 0px transparent'] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 1.2 }}
                  >
                    $24M <span className="text-sm font-normal text-white/60">ARR</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
