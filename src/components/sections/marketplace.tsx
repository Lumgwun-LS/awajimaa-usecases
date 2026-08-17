import { motion } from 'framer-motion';
import { Store, TrendingUp, Handshake, Landmark } from 'lucide-react';
import marketImg from '@assets/generated_images/market-kano.jpg';

export function Marketplace() {
  return (
    <section className="py-32 relative bg-background border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-primary font-mono text-sm tracking-wider mb-4 border border-primary/30 inline-block px-3 py-1 rounded-full bg-primary/10">AWA HUB MARKETPLACE</div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Kano to Nairobi <br />in 30 Seconds.</h2>
            <p className="text-xl text-muted-foreground mb-8">
              A pan-African digital market that ignores borders. A farmer in Kano secures a bulk deal with a buyer in Nairobi, verified by milestone tracking and protected by integrated payments.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-card border border-white/5 p-5 rounded-xl">
                <Store className="w-6 h-6 text-secondary mb-3" />
                <h4 className="font-bold mb-1">Major Markets</h4>
                <p className="text-sm text-muted-foreground">Direct access to the continent's largest trading hubs.</p>
              </div>
              <div className="bg-card border border-white/5 p-5 rounded-xl">
                <TrendingUp className="w-6 h-6 text-primary mb-3" />
                <h4 className="font-bold mb-1">Commodity Trading</h4>
                <p className="text-sm text-muted-foreground">Real-time pricing and bulk agricultural trades.</p>
              </div>
              <div className="bg-card border border-white/5 p-5 rounded-xl">
                <Handshake className="w-6 h-6 text-white mb-3" />
                <h4 className="font-bold mb-1">Business Deals</h4>
                <p className="text-sm text-muted-foreground">Milestone-based escrow and contract management.</p>
              </div>
              <div className="bg-card border border-white/5 p-5 rounded-xl">
                <Landmark className="w-6 h-6 text-primary mb-3" />
                <h4 className="font-bold mb-1">Finance Tools</h4>
                <p className="text-sm text-muted-foreground">Built-in expense tracking, P&L, and invoicing.</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/5] lg:h-[700px] w-full group"
          >
            <img src={marketImg} alt="African night market" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
            
            {/* UI overlay simulating a trade */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-sm bg-background/90 backdrop-blur-md border border-primary/30 p-6 rounded-xl shadow-2xl">
              <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-4">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">BUYER</div>
                  <div className="font-bold flex items-center gap-2">Nairobi <span className="w-2 h-2 rounded-full bg-green-500"></span></div>
                </div>
                <div className="text-primary font-mono animate-pulse">← TRADE →</div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground mb-1">SELLER</div>
                  <div className="font-bold flex items-center gap-2 justify-end"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Kano</div>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-xs text-muted-foreground mb-1">AMOUNT</div>
                  <div className="text-2xl font-bold text-white">$24,500.00</div>
                </div>
                <div className="bg-primary/20 text-primary border border-primary/50 px-3 py-1 rounded text-xs font-bold">
                  ESCROW LOCKED
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}