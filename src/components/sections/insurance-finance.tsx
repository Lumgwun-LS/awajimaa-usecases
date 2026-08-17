import { motion } from 'framer-motion';
import { Shield, Fingerprint, Wallet, Users } from 'lucide-react';

export function InsuranceFinance() {
  return (
    <section className="py-32 relative bg-background border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="text-secondary font-mono text-sm tracking-wider mb-4 border border-secondary/30 inline-block px-3 py-1 rounded-full bg-secondary/10">FINANCE & INSURANCE</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Trust, Verified at the Edge.</h2>
          <p className="text-xl text-muted-foreground">
            The largest insurance and financial distribution network in Africa. Verified identity, automated claims, and community banking built natively into the platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative bg-card border border-white/10 p-8 rounded-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
            <Shield className="w-10 h-10 text-primary mb-6 relative z-10" />
            <h3 className="text-2xl font-bold mb-3 relative z-10">Insurance Infrastructure</h3>
            <p className="text-muted-foreground relative z-10 mb-6">
              Connect to millions of users instantly. Real-time incident verification through the emergency network automates claims processing and cuts fraud.
            </p>
            <div className="bg-background border border-white/5 p-4 rounded-lg relative z-10">
              <div className="text-sm font-mono text-muted-foreground mb-1">REVENUE MODEL</div>
              <div className="font-bold text-lg">$200K/yr + 2% of premiums</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative bg-card border border-white/10 p-8 rounded-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-colors"></div>
            <Wallet className="w-10 h-10 text-secondary mb-6 relative z-10" />
            <h3 className="text-2xl font-bold mb-3 relative z-10">Identity & Payments</h3>
            <p className="text-muted-foreground relative z-10 mb-6">
              BVN/NIN verification combined with multi-currency wallets (Paystack, Stripe, PayPal). Enabling group savings pools and micro-loans seamlessly.
            </p>
            <div className="flex gap-4 relative z-10">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Fingerprint className="w-4 h-4 text-primary" /> Verified ID
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <Users className="w-4 h-4 text-secondary" /> Group Savings
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}