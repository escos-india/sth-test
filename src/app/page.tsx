'use client';

import { CommunityUpdates } from '@/components/landing/community-updates';
import { HeroSection } from '@/components/landing/hero-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <CommunityUpdates />
    </>
  );
}
