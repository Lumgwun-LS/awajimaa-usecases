import { useEffect } from 'react';

/**
 * Dynamic SEO Head — updates document.title and meta description
 * as the user scrolls between sections, which helps with
 * social sharing of deep links and improves click-through rates
 * from search results.
 */

const sections: Record<string, { title: string; description: string }> = {
  home: {
    title: "Awajimaa — Africa's #1 Civictech & Fintech Super-App | Investor Showcase",
    description:
      "5 platforms. 54 countries. Emergency response, AI commerce, education, heritage & developer tools. $850M+ revenue pathways. Open for Series A investment.",
  },
  vision: {
    title: "Awajimaa OS Vision — Africa's Digital Infrastructure Platform",
    description:
      "Awajimaa is building Africa's digital OS: a super-intelligent platform powering emergency response, commerce, education, and heritage across 54 African countries.",
  },
  'use-cases': {
    title: "Awajimaa Use Cases — Governor, Energy, Health, Commerce, Logistics",
    description:
      "From dispatching ambulances to powering state energy grids and cross-border commerce — Awajimaa's civictech and fintech use cases across African governments and enterprises.",
  },
  investors: {
    title: "Invest in Awajimaa — Africa's #1 Tech Ecosystem | Series A Open",
    description:
      "Awajimaa is raising a Series A round. $850M+ in validated revenue pathways across 5 platforms. Contact investors@awajimaagroup.com or WhatsApp +234 706 724 6050.",
  },
  platforms: {
    title: "Awajimaa Platforms — Awa Biz Suite, App Store, GenHaL, Schools",
    description:
      "Explore all 5 Awajimaa platforms: Awa Biz Suite (AI SaaS), Awajimaa App Store (developer marketplace), GenHaL (heritage), and Awajimaa Schools (government EdTech).",
  },
  videos: {
    title: "Awajimaa Platform Videos — Watch the Ecosystem in Motion",
    description:
      "Watch product videos for all 5 Awajimaa platforms: emergency response, AI commerce, education, heritage preservation, and the African developer marketplace.",
  },
};

export function SeoHead() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const meta = sections[id];
            if (meta) {
              document.title = meta.title;
              const desc = document.querySelector('meta[name="description"]');
              if (desc) desc.setAttribute('content', meta.description);
              // Update OG tags for dynamic sharing
              const ogTitle = document.querySelector('meta[property="og:title"]');
              const ogDesc = document.querySelector('meta[property="og:description"]');
              if (ogTitle) ogTitle.setAttribute('content', meta.title);
              if (ogDesc) ogDesc.setAttribute('content', meta.description);
            }
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    // Observe all section anchors
    Object.keys(sections).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null; // renders nothing — side-effects only
}
