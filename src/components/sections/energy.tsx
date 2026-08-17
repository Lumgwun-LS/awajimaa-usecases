import { motion } from 'framer-motion';
import { Droplet, RadioReceiver, ShieldAlert } from 'lucide-react';
import oilImg from '@assets/generated_images/oil-spill-drone.jpg';

export function Energy() {
  return (
    <section className="py-32 relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 relative rounded-2xl overflow-hidden border border-white/10 aspect-square lg:aspect-auto lg:h-[600px]"
          >
            <img src={oilImg} alt="Oil spill drone surveillance" className="w-full h-full object-cover" />
            
            {/* Overlay UI elements */}
            <div className="absolute top-6 right-6 flex flex-col gap-2">
              <div className="bg-red-500/20 border border-red-500/50 text-red-500 font-mono text-xs px-3 py-1 rounded backdrop-blur animate-pulse flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                ANOMALY DETECTED
              </div>
              <div className="bg-background/80 backdrop-blur border border-white/10 text-white font-mono text-xs px-3 py-1 rounded">
                ALT: 400ft | SPD: 42kts
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="text-secondary font-mono text-sm tracking-wider mb-4 border border-secondary/30 inline-block px-3 py-1 rounded-full bg-secondary/10">ENERGY SECTOR</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Midnight. 50 Miles Offshore. <br />Spill Detected.</h2>
            <p className="text-xl text-muted-foreground mb-10">
              For oil and gas operators, every minute of delay costs millions. Awajimaa closes the gap between detection and deployment.
            </p>

            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="mt-1 bg-secondary/20 p-3 rounded-lg border border-secondary/30 h-min">
                  <Droplet className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Real-time Spill Detection</h4>
                  <p className="text-muted-foreground">Automated incident reporting feeds directly into the corporate command center.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="mt-1 bg-primary/20 p-3 rounded-lg border border-primary/30 h-min">
                  <RadioReceiver className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Drone Deployment</h4>
                  <p className="text-muted-foreground">Instantly dispatch automated surveillance drones to verify the threat and assess damage.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="mt-1 bg-white/10 p-3 rounded-lg border border-white/20 h-min">
                  <ShieldAlert className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Response Team Dispatch</h4>
                  <p className="text-muted-foreground">Coordinate containment teams, marine vessels, and government liaisons on one secure channel.</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}