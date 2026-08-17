import { motion } from 'framer-motion';
import { Stethoscope, Ambulance, FileHeart, Video } from 'lucide-react';

export function HealthEmergency() {
  return (
    <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="font-mono text-sm tracking-wider mb-4 border border-primary-foreground/30 inline-block px-3 py-1 rounded-full">HEALTH & EMERGENCY</div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Before the Ambulance Arrives.</h2>
          <p className="text-xl font-light opacity-90">
            Connect every hospital, clinic, and emergency responder to a unified network. Doctors receive patient vitals and video feeds before the ambulance even reaches the ER.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Ambulance, title: "Smart Dispatch", desc: "Route ambulances around traffic using real-time city data." },
            { icon: Video, title: "Tele-Health", desc: "Instant video consultations connecting village patients to city specialists." },
            { icon: Stethoscope, title: "Hospital Network", desc: "Load balance emergencies across hospitals based on real-time bed capacity." },
            { icon: FileHeart, title: "Health Records", desc: "Unified patient records accessible instantly by authorized responders." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-black/10 border border-black/10 p-8 rounded-2xl backdrop-blur-sm hover:bg-black/20 transition-colors"
            >
              <item.icon className="w-10 h-10 mb-6" />
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="opacity-80 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}