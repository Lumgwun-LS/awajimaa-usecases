import { Nav } from '@/components/nav';
import { SeoHead } from '@/components/seo-head';
import { Hero } from '@/components/sections/hero';
import { OsVision } from '@/components/sections/os-vision';
import { Governor } from '@/components/sections/governor';
import { Energy } from '@/components/sections/energy';
import { OilSpillage } from '@/components/sections/oil-spillage';
import { HealthEmergency } from '@/components/sections/health-emergency';
import { Marketplace } from '@/components/sections/marketplace';
import { Logistics } from '@/components/sections/logistics';
import { InsuranceFinance } from '@/components/sections/insurance-finance';
import { RealEstate } from '@/components/sections/real-estate';
import { RevenueModel } from '@/components/sections/revenue-model';
import { InvestorScale } from '@/components/sections/investor';
import { AwaBizSuite } from '@/components/sections/awa-biz-suite';
import { AppStore } from '@/components/sections/app-store';
import { GenHal } from '@/components/sections/genhal';
import { Schools } from '@/components/sections/schools';
import { Ecosystem } from '@/components/sections/ecosystem';
import { VideoShowcase } from '@/components/sections/video-showcase';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground">
      <Nav />
      <SeoHead />
      <div id="home"><Hero /></div>
      <div id="vision"><OsVision /></div>
      <div id="use-cases">
        <Governor />
        <Energy />
        <OilSpillage />
        <HealthEmergency />
        <Marketplace />
        <Logistics />
        <InsuranceFinance />
        <RealEstate />
      </div>
      <div id="revenue"><RevenueModel /></div>
      <div id="investors"><InvestorScale /></div>
      <div id="videos"><VideoShowcase /></div>
      <div id="platforms">
        <AwaBizSuite />
        <AppStore />
        <GenHal />
        <Schools />
      </div>
      <Ecosystem />
      <Footer />
    </div>
  );
}