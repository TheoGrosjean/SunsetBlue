<script setup>
import { amenities } from '../data/villa'
import AppIcon from './AppIcon.vue'
import SectionTitle from './SectionTitle.vue'
</script>

<template>
  <section id="equipements" class="relative overflow-hidden bg-ocean-950 py-28 lg:py-36">
    <div class="pointer-events-none absolute -top-40 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-ocean-600/25 blur-3xl"></div>
    <div class="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-sunset-500/10 blur-3xl"></div>

    <div class="relative mx-auto max-w-7xl px-6 lg:px-10">
      <SectionTitle eyebrow="Confort & prestations" title="Tout pour un séjour d’exception" light />

      <div class="mt-20 grid gap-px bg-gold-300/15 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(a, i) in amenities"
          :key="a.title"
          v-reveal="(i % 4) * 100"
          class="group bg-ocean-950 p-8 transition duration-500 hover:bg-ocean-900"
        >
          <AppIcon :name="a.icon" class="h-9 w-9 text-gold-300 transition duration-500 group-hover:-translate-y-1 group-hover:text-sunset-300" />
          <h3 class="mt-6 font-serif text-2xl text-sand-50">{{ a.title }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-sand-50/55">{{ a.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
