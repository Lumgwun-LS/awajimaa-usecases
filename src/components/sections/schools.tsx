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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Empowering The Next <br className="hidden md:block"/>Billion Minds.</h2>
            <p className="text-xl text-muted-foreground mb-4">
              Connecting schools, teachers, students, and parents across Africa with AI-powered learning tools.
            </p>
            <a href="https://awajimaaschools.com" target="_blank" rel="noreferrer" className="text-sm font-mono text-primary hover:underline flex items-center justify-center gap-2 mb-8">
              <Globe className="w-4 h-4" /> awajimaaschools.com
            </a>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((f, i) => (
              <div key={i} className="bg-card/40 backdrop-blur border border-white/10 p-6 rounded-xl hover:bg-card/60 transition-colors">
                <f.icon className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-bold text-lg mb-2 text-white">{f.title}</h4>
                <p className="text-sm text-white/60">{f.desc}</p>
              </div>
            ))}
            
            <div className="col-span-1 sm:col-span-2 bg-secondary/10 border border-secondary/20 p-6 rounded-xl flex items-center justify-center gap-3">
              <Globe className="w-5 h-5 text-secondary" />
              <span className="text-secondary font-medium">Cross-platform: Works on low-bandwidth mobile networks, SMS fallback</span>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 bg-gradient-to-br from-black to-card border border-white/10 rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px]"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/20 blur-[50px]"></div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-6 font-mono text-white/90">Scale & Revenue</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Per-student SaaS Model</div>
                  <div className="text-3xl font-bold text-primary">$2<span className="text-lg text-white/50 font-normal">/student/mo</span></div>
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
                  <div className="text-3xl font-bold text-white">$24M <span className="text-sm font-normal text-white/60">ARR</span></div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
