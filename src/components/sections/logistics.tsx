import { motion } from 'framer-motion';
import { PackageSearch, Truck, Route, Network } from 'lucide-react';

export function Logistics() {
  return (
    <section className="py-32 relative bg-card border-t border-white/5 overflow-hidden">
      {/* Background animated lines */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeOpacity="0.2"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:border-primary/50 transition-colors mt-8">
                <Truck className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-bold mb-2">Multi-Vendor Fleet</h4>
                <p className="text-sm text-muted-foreground">Manage thousands of drivers across different companies.</p>
              </div>
              <div className="bg-background border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:border-secondary/50 transition-colors">
                <PackageSearch className="w-8 h-8 text-secondary mb-4" />
                <h4 className="font-bold mb-2">Live Tracking</h4>
                <p className="text-sm text-muted-foreground">End-to-end shipment visibility for 50M+ users.</p>
              </div>
              <div className="bg-background border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:border-secondary/50 transition-colors">
                <Route className="w-8 h-8 text-white mb-4" />
                <h4 className="font-bold mb-2">Route Optimization</h4>
                <p className="text-sm text-muted-foreground">AI-driven pathing avoiding traffic and danger zones.</p>
              </div>
              <div className="bg-background border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:border-primary/50 transition-colors -mt-8">
                <Network className="w-8 h-8 text-primary mb-4" />
                <h4 className="font-bold mb-2">Warehouse Sync</h4>
                <p className="text-sm text-muted-foreground">Centralized inventory management across borders.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="text-primary font-mono text-sm tracking-wider mb-4 border border-primary/30 inline-block px-3 py-1 rounded-full bg-primary/10">MULTI-VENDOR LOGISTICS</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">The Veins of the <br />Continent.</h2>
            <p className="text-xl text-muted-foreground mb-8">
              A continent-wide supply chain built into the OS. Logistics companies plug into a pre-existing network of millions of users, managing fleets, warehouses, and cross-border deliveries seamlessly.
            </p>
            
            <div className="bg-background p-6 rounded-xl border border-white/5">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-sm text-muted-foreground uppercase">SaaS Revenue Potential</span>
                <span className="font-mono text-sm text-primary font-bold">ANNUAL</span>
              </div>
              <div className="text-4xl font-bold">$150K <span className="text-lg text-muted-foreground font-normal">/ major operator</span></div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}