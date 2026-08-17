import { motion } from 'framer-motion';
import { 
  Download, 
  Star, 
  CheckCircle,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Globe2,
  HeartPulse,
  Landmark,
  Briefcase,
  GraduationCap,
  Leaf,
  Truck
} from 'lucide-react';
import appStoreBg from '@assets/generated_images/app-store.jpg';

const categories = [
  { name: "Health", icon: HeartPulse, color: "text-red-400", bg: "bg-red-400/10" },
  { name: "Emergency", icon: ShieldCheck, color: "text-orange-400", bg: "bg-orange-400/10" },
  { name: "Business", icon: Briefcase, color: "text-blue-400", bg: "bg-blue-400/10" },
  { name: "Education", icon: GraduationCap, color: "text-purple-400", bg: "bg-purple-400/10" },
  { name: "Agriculture", icon: Leaf, color: "text-green-400", bg: "bg-green-400/10" },
  { name: "Finance", icon: Landmark, color: "text-yellow-400", bg: "bg-yellow-400/10" },
  { name: "Logistics", icon: Truck, color: "text-cyan-400", bg: "bg-cyan-400/10" },
];

const mockApps = [
  { name: "Afiya Care", cat: "Health", rating: "4.9", dev: "Lagos Tech", color: "from-red-500/20 to-transparent", price: "Free" },
  { name: "CropYield AI", cat: "Agriculture", rating: "4.7", dev: "AgriConnect", color: "from-green-500/20 to-transparent", price: "Premium" },
  { name: "NairaFlow", cat: "Finance", rating: "4.8", dev: "FinTech Africa", color: "from-yellow-500/20 to-transparent", price: "Free" },
  { name: "EduStream", cat: "Education", rating: "4.6", dev: "LearnTech", color: "from-purple-500/20 to-transparent", price: "$2.99" },
  { name: "FleetTrack", cat: "Logistics", rating: "4.9", dev: "MoveIt", color: "from-cyan-500/20 to-transparent", price: "Premium" },
  { name: "BizMate", cat: "Business", rating: "4.5", dev: "SME Solutions", color: "from-blue-500/20 to-transparent", price: "Free" },
  { name: "RapidResponse", cat: "Emergency", rating: "5.0", dev: "GovTech NG", color: "from-orange-500/20 to-transparent", price: "State Mandated" },
  { name: "MarketConnect", cat: "Business", rating: "4.8", dev: "TradeNet", color: "from-blue-500/20 to-transparent", price: "Free" }
];

export function AppStore() {
  return (
    <section className="py-32 relative bg-background border-t border-white/5 overflow-hidden">
      
      <div className="absolute inset-0 z-0 opacity-15">
        <img src={appStoreBg} alt="App Store Grid" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-secondary font-mono text-sm tracking-wider mb-4 border border-secondary/30 inline-block px-3 py-1 rounded-full bg-secondary/10">
              AWAJIMAA APP STORE
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Africa's First <br />Dedicated App Market.</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Built for African developers, for African problems. Currently live with real developer accounts and app submissions.
            </p>
            <a href="https://awajimaaappstore.com" target="_blank" rel="noreferrer" className="text-sm font-mono text-secondary hover:underline flex items-center gap-2 mb-10">
              <Globe2 className="w-4 h-4" /> awajimaaappstore.com
            </a>

            <ul className="space-y-4 mb-8">
              {[
                "AI-powered review for quality and safety",
                "Developers keep 85% of revenue",
                "State governments can mandate specific apps",
                "Integration with Awajimaa's 50M+ user base for instant distribution"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <CheckCircle className="w-6 h-6 text-secondary shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {mockApps.map((app, i) => (
              <div key={i} className={`bg-card/60 backdrop-blur border border-white/10 p-4 rounded-xl relative overflow-hidden group hover:border-secondary/50 transition-colors`}>
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${app.color} opacity-20 group-hover:opacity-40 transition-opacity rounded-full blur-2xl -mr-10 -mt-10`}></div>
                
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-black/50 border border-white/5 flex items-center justify-center mb-3">
                    <Cpu className="w-5 h-5 text-white/70" />
                  </div>
                  <h4 className="font-bold text-sm mb-1">{app.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                    <span className="text-secondary">{app.cat}</span> • {app.dev}
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1 text-xs font-mono">
                      <Star className="w-3 h-3 text-secondary fill-secondary" /> {app.rating}
                    </div>
                    <span className="text-xs font-bold text-white/90 bg-white/10 px-2 py-1 rounded">
                      {app.price}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Categories row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-20"
        >
          {categories.map((cat, i) => (
            <div key={i} className="flex items-center gap-2 bg-card border border-white/5 px-4 py-2 rounded-full">
              <cat.icon className={`w-4 h-4 ${cat.color}`} />
              <span className="text-sm font-medium">{cat.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Revenue Model */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-secondary/10 border border-secondary/20 rounded-2xl p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 justify-between"
        >
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Developer Ecosystem Revenue</h3>
            <p className="text-secondary/80 text-sm">$15 platform fee per app + 15% commission on paid apps.</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-secondary mb-1">10,000 Apps</div>
            <div className="text-sm text-white/70 font-mono">= $150K/year base + Infinite Upside</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
