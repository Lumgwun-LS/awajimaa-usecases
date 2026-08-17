import { Hero } from '@/components/sections/hero';
import { OsVision } from '@/components/sections/os-vision';
import { Governor } from '@/components/sections/governor';
import { Energy } from '@/components/sections/energy';
import { HealthEmergency } from '@/components/sections/health-emergency';
import { Marketplace } from '@/components/sections/marketplace';
import { Logistics } from '@/components/sections/logistics';
import { InsuranceFinance } from '@/components/sections/insurance-finance';
import { InvestorScale } from '@/components/sections/investor';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground">
      <Hero />
      <OsVision />
      <Governor />
      <Energy />
      <HealthEmergency />
      <Marketplace />
      <Logistics />
      <InsuranceFinance />
      <InvestorScale />
      <Footer />
    </div>
  );
}