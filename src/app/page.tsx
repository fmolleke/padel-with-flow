'use client';

import { HeroSection } from '@/components/sections/HeroSection';
import { PhilosophySection } from '@/components/sections/PhilosophySection';
import { AudienceSection } from '@/components/sections/AudienceSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { CTASection } from '@/components/sections/CTASection';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <AudienceSection />
      <GallerySection />
      <CTASection />
    </>
  );
}
