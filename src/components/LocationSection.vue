<script setup>
import { villa, surroundings } from '../data/villa'
import AppIcon from './AppIcon.vue'
import SectionTitle from './SectionTitle.vue'
</script>

<template>
  <section id="situation" class="bg-sand-100 py-28 lg:py-36">
    <div class="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-5 lg:px-10">
      <div class="lg:col-span-2">
        <SectionTitle eyebrow="Situation" title="Un emplacement privilégié" align="left" />
        <p v-reveal class="mt-8 flex items-center gap-3 font-serif text-xl italic text-ocean-700">
          <AppIcon name="pin" class="h-5 w-5 text-gold-500" />
          {{ villa.location }}
        </p>
        <ul class="mt-10 divide-y divide-gold-200 border-y border-gold-200">
          <li v-for="(s, i) in surroundings" :key="s.label" v-reveal="i * 100" class="flex items-baseline justify-between py-4">
            <span class="text-sm text-ocean-950/70">{{ s.label }}</span>
            <span class="font-serif text-2xl text-gold-deep">{{ s.distance }}</span>
          </li>
        </ul>
      </div>

      <!-- Encart carte : remplacer par un <iframe> Google Maps -->
      <div v-reveal="200" class="relative aspect-[4/3] overflow-hidden bg-ocean-900 lg:col-span-3">
        <div class="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,var(--color-gold-300)_1px,transparent_0)] [background-size:22px_22px]"></div>
        <div class="absolute inset-4 border border-gold-300/30"></div>
        <div class="relative flex h-full flex-col items-center justify-center gap-4 text-center text-gold-200/80">
          <span class="relative flex h-14 w-14 items-center justify-center">
            <span class="absolute inset-0 animate-ping rounded-full bg-sunset-400/30"></span>
            <AppIcon name="pin" class="relative h-10 w-10 text-sunset-300" />
          </span>
          <span class="text-[0.65rem] uppercase tracking-[0.3em]">Carte à venir</span>
        </div>
      </div>
    </div>
  </section>
</template>
