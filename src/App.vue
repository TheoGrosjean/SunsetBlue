<script setup>
import SiteLoader from './components/SiteLoader.vue'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import IntroSection from './components/IntroSection.vue'
import AmenitiesSection from './components/AmenitiesSection.vue'
import RoomsSection from './components/RoomsSection.vue'
import GallerySection from './components/GallerySection.vue'
import LocationSection from './components/LocationSection.vue'
import AirbnbSection from './components/AirbnbSection.vue'
import ReviewsSection from './components/ReviewsSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <SiteLoader />
  <NavBar />
  <main>
    <HeroSection />
    <IntroSection />
    <AmenitiesSection />
    <RoomsSection />
    <GallerySection />
    <LocationSection />
    <AirbnbSection />
    <ReviewsSection />
    <ContactSection />
  </main>
  <SiteFooter />
</template>
