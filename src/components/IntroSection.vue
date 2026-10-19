<script setup>
import { intro, stats } from '../data/villa'
import ImageSlot from './ImageSlot.vue'
</script>

<template>
  <section id="villa" class="relative overflow-hidden py-28 lg:py-36">
    <div class="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-10">
      <!-- Photos superposées -->
      <div class="relative order-2 lg:order-1">
        <div v-reveal class="relative mr-12 sm:mr-24">
          <ImageSlot v-bind="intro.images[0]" class="aspect-[4/5] shadow-2xl shadow-ocean-900/15" />
          <div class="absolute -top-5 -left-5 -z-10 h-full w-full border border-gold-300"></div>
        </div>
        <div v-reveal="200" class="absolute -right-0 -bottom-12 w-1/2 border-8 border-sand-50 shadow-xl shadow-ocean-900/20">
          <ImageSlot v-bind="intro.images[1]" class="aspect-square" />
        </div>
      </div>

      <div class="order-1 lg:order-2">
        <p v-reveal class="eyebrow">Bienvenue</p>
        <h2 v-reveal="100" class="mt-4 font-serif text-4xl leading-tight font-medium text-ocean-800 sm:text-5xl">
          {{ intro.title }}
        </h2>
        <div v-reveal="150" class="mt-6 flex items-center gap-3">
          <span class="h-px w-10 bg-gold-400"></span>
          <span class="h-1.5 w-1.5 rotate-45 bg-gold-400"></span>
        </div>
        <p
          v-for="(p, i) in intro.paragraphs"
          :key="i"
          v-reveal="200 + i * 100"
          class="mt-6 text-[0.95rem] leading-relaxed text-ocean-950/70"
        >
          {{ p }}
        </p>

        <dl class="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-gold-200 bg-gold-200 sm:grid-cols-4">
          <div v-for="(s, i) in stats" :key="s.label" v-reveal="i * 100" class="bg-sand-50 px-4 py-6 text-center">
            <dt class="sr-only">{{ s.label }}</dt>
            <dd class="font-serif text-4xl font-semibold text-gold-deep">{{ s.value }}</dd>
            <dd class="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-ocean-950/60">{{ s.label }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
