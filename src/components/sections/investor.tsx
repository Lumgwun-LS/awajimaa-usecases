import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Users, Network } from 'lucide-react';
import investorImg from '@assets/generated_images/investor-scale.jpg';

export function InvestorScale() {
  return (
    <section className="py-32 relative bg-background border-t border-white/5 overflow-hidden">
      
      {/* Background Image with heavy overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img src={investorImg} alt="Data visualization" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/80"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="text-primary font-mono text-sm tracking-wider mb-4 border border-primary/30 inline-block px-3 py-1 rounded-full bg-primary/10">THE SCALE</div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Africa's WeChat Moment.</h2>
          <p className="text-xl text-muted-foreground">
            Network effects compound as each sector joins. When a government mandates the platform, millions of citizens follow. When citizens join, commerce, logistics, and healthcare scale exponentially.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card/50 backdrop-blur border border-white/10 p-8 rounded-2xl text-center"
          >
            <Users className="w-10 h-10 text-primary mx-auto mb-4" />
            <div className="text-5xl font-bold mb-2">1.4B</div>
            <div className="text-sm font-mono text-muted-foreground uppercase tracking-widest">People</div>
            <p className="mt-4 text-sm text-muted-foreground">Addressable market across 54 African countries.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card/50 backdrop-blur border border-white/10 p-8 rounded-2xl text-center"
          >
            <BarChart3 className="w-10 h-10 text-secondary mx-auto mb-4" />
            <div className="text-5xl font-bold mb-2">$1B+</div>
            <div className="text-sm font-mono text-muted-foreground uppercase tracking-widest">TAM</div>
            <p className="mt-4 text-sm text-muted-foreground">Subscription, commission, and SaaS revenue streams.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card/50 backdrop-blur border border-white/10 p-8 rounded-2xl text-center"
          >
            <Network className="w-10 h-10 text-white mx-auto mb-4" />
            <div className="text-5xl font-bold mb-2">1.5%</div>
            <div className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Commission</div>
            <p className="mt-4 text-sm text-muted-foreground">Standard fee on all Awa Hub marketplace transactions.</p>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-primary text-primary-foreground rounded-2xl p-10 md:p-16 text-center max-w-4xl mx-auto"
        >
          <h3 className="text-3xl md:text-5xl font-bold mb-6">The Platform is Built. <br />The Continent is Waiting.</h3>
          <p className="text-xl opacity-90 mb-10 font-light">
            Whether you are a State Governor looking to secure your state, an Oil Executive protecting assets, or an Investor ready to back Africa's unified OS.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="h-14 px-8 bg-black text-white font-semibold rounded hover:bg-black/80 transition-colors flex items-center justify-center gap-2 text-lg">
              Contact the Founders <ArrowRight className="w-5 h-5" />
            </button>
            <button className="h-14 px-8 border border-black/20 text-black font-semibold rounded hover:bg-black/5 transition-colors text-lg flex items-center justify-center">
              Request Full Pitch Deck
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}