<template>
  <div class="sgfm-surface relative">
    <ParticleBackground />
    <LandingNavbar />
    <main class="sgfm-banded">
      <HeroSection />
      <StatsSection />
      <HowItWorks />
      <RoleAccessSection />
      <AINewsSection />
      <TestimonialsSection />
      <FAQSection />
      <ChoiceSection />
    </main>
    <LandingFooter />
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
import ParticleBackground from '@/components/landing/ParticleBackground.vue'
import LandingNavbar from '@/components/landing/LandingNavbar.vue'
import HeroSection from '@/components/landing/HeroSection.vue'
import StatsSection from '@/components/landing/StatsSection.vue'
import HowItWorks from '@/components/landing/HowItWorks.vue'
import RoleAccessSection from '@/components/landing/RoleAccessSection.vue'
import AINewsSection from '@/components/landing/AINewsSection.vue'
import TestimonialsSection from '@/components/landing/TestimonialsSection.vue'
import FAQSection from '@/components/landing/FAQSection.vue'
import ChoiceSection from '@/components/landing/ChoiceSection.vue'
import LandingFooter from '@/components/landing/LandingFooter.vue'
import BackToTop from '@/components/landing/BackToTop.vue'
</script>
