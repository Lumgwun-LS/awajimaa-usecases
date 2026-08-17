import { motion } from 'framer-motion';
import { 
  Share2, 
  Package, 
  Users, 
  PieChart, 
  LayoutTemplate, 
  Mic, 
  Smartphone, 
  Sparkles,
  CreditCard,
  TrendingUp,
  Activity
} from 'lucide-react';
import bgImg from '@assets/generated_images/awa-biz-suite.jpg';

const features = [
  {
    icon: Share2,
    title: "Social Media Manager",
    desc: "AI-generated posts, schedule to Facebook/Instagram/X/LinkedIn/TikTok, video creation with music"
  },
  {
    icon: Package,
    title: "Sales & Inventory",
    desc: "Real-time stock tracking, purchase orders, multi-branch operations"
  },
  {
    icon: Users,
    title: "CRM",
    desc: "Lead capture, UTM tracking, pipeline management, birthday automation"
  },
  {
    icon: PieChart,
    title: "Financial Suite",
    desc: "Sales ledger, expense categories, P&L, investment tracking"
  },
  {
    icon: LayoutTemplate,
    title: "Website Builder",
    desc: "Drag-and-drop, AI-generated copy, product shop, custom domain"
  },
  {
    icon: Mic,
    title: "Voice Campaigns",
    desc: "Automated voice call broadcasts to customers"
  },
  {
    icon: Smartphone,
    title: "APK Builder",
    desc: "Generate a real Android app from your website in one click"
  },
  {
    icon: Sparkles,
    title: "AI Tools",
    desc: "AI quick-create (describe a product in plain English → it creates it), AI data analysis, video caption generation"
  },
  {
    icon: CreditCard,
    title: "Multi-currency Payments",
    desc: "Stripe, Paystack, PayPal, Nomba, Remita, Squad"
  }
];

export function AwaBizSuite() {
  return (
    <section className="py-32 relative bg-background border-t border-white/5 overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 opacity-15">
        <img src={bgImg} alt="Awa Biz Suite Dashboard" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="text-primary font-mono text-sm tracking-wider mb-4 border border-primary/30 inline-block px-3 py-1 rounded-full bg-primary/10">
            AWA BIZ SUITE
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">The Backbone of <br className="hidden md:block"/>African Commerce.</h2>
          <p className="text-xl text-muted-foreground mb-8">
            A complete business operating system for African SMEs and enterprises. Powering every business on the Awajimaa platform.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm font-mono text-muted-foreground">
            <a href="https://awajimaaai.com" target="_blank" rel="noreferrer" className="text-primary hover:underline">awajimaaai.com</a>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card/50 backdrop-blur border border-white/10 p-8 rounded-2xl group hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <f.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Revenue Pitch */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-card/80 backdrop-blur border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Activity className="w-48 h-48 text-primary" />
          </div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-3">
                <TrendingUp className="text-primary" />
                SME Revenue Scale
              </h3>
              <p className="text-muted-foreground mb-6">
                Three subscription tiers at ₦5,000 / ₦15,000 / ₦30,000 per month (~$3/$10/$20 USD).
              </p>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-muted-foreground">Target SMEs</span>
                  <span className="text-white font-bold">500,000</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-muted-foreground">Avg. ARPU</span>
                  <span className="text-white font-bold">$10 / month</span>
                </div>
                <div className="flex justify-between items-center text-primary">
                  <span>Projected ARR</span>
                  <span className="text-2xl font-bold">$60,000,000</span>
                </div>
              </div>
            </div>
            
            <div className="bg-black/50 border border-white/10 rounded-xl p-6 font-mono text-xs text-primary/80">
              <div className="mb-2 text-white/50">{'>'} initializing revenue_model.sh</div>
              <div className="mb-2">calculating TAM... 54 countries</div>
              <div className="mb-2">addressable_smes: 44,000,000</div>
              <div className="mb-2">target_capture: 1.1%</div>
              <div className="mb-4">status: EXECUTABLE</div>
              <div className="text-primary animate-pulse">
                {'>'} $60M ARR FROM THIS PLATFORM ALONE
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
