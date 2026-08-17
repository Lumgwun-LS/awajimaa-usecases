import { motion } from 'framer-motion';
import { Activity, AlertTriangle, ShieldCheck, Map } from 'lucide-react';
import govImg from '@assets/generated_images/governor-dashboard.jpg';

export function Governor() {
  return (
    <section className="py-32 relative bg-card overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <div className="text-primary font-mono text-sm tracking-wider mb-4 border border-primary/30 inline-block px-3 py-1 rounded-full bg-primary/10">STATE GOVERNMENTS</div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">The Governor's Screen.</h2>
          <p className="text-xl text-muted-foreground">
            Watch your entire state on one screen. Subscribe to give every resident access to emergency response, health, and commerce while you monitor the pulse of the state in real time.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8 relative rounded-2xl overflow-hidden border border-white/10 group aspect-video"
          >
            <div className="absolute inset-0 bg-black/40 z-10 transition-opacity group-hover:bg-black/20"></div>
            <img src={govImg} alt="Governor Dashboard" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
            
            <div className="absolute bottom-6 left-6 z-20 flex gap-4">
              <div className="bg-background/80 backdrop-blur border border-white/10 p-4 rounded-lg flex items-center gap-3">
                <Activity className="text-primary w-6 h-6" />
                <div>
                  <div className="text-2xl font-bold font-mono">1,402</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Active Patrols</div>
                </div>
              </div>
              <div className="bg-background/80 backdrop-blur border border-white/10 p-4 rounded-lg flex items-center gap-3">
                <AlertTriangle className="text-secondary w-6 h-6" />
                <div>
                  <div className="text-2xl font-bold font-mono">3</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Critical Alerts</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4 flex flex-col gap-6"
          >
            <div className="bg-background border border-white/5 p-6 rounded-2xl flex-1 hover:border-primary/50 transition-colors">
              <ShieldCheck className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">State Surveillance</h3>
              <p className="text-muted-foreground text-sm">
                IoT-connected AI street lights and drone feeds stream directly into a centralized surveillance studio.
              </p>
            </div>
            
            <div className="bg-background border border-white/5 p-6 rounded-2xl flex-1 hover:border-secondary/50 transition-colors">
              <Map className="w-8 h-8 text-secondary mb-4" />
              <h3 className="text-xl font-bold mb-2">Global Emergency Map</h3>
              <p className="text-muted-foreground text-sm">
                Track every ambulance dispatch, fire response, and incident timeline across all state districts instantly.
              </p>
            </div>
            
            <div className="bg-background border border-white/5 p-6 rounded-2xl flex-1">
              <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-4">Value Proposition</h3>
              <div className="text-3xl font-bold text-white mb-1">$500K - $2M</div>
              <div className="text-sm text-muted-foreground">Annual state subscription revenue</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}