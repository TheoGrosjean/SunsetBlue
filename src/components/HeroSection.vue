<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { villa, hero } from '../data/villa'
import AppIcon from './AppIcon.vue'

// Le fond est un calque `fixed inset-0`, comme l'écran de chargement : c'est la
// seule façon de couvrir tout l'écran sur Safari iOS (sous la barre d'état et
// la barre d'outils). L'accueil prend la hauteur mesurée de ce calque.
const section = ref(null)
const backdrop = ref(null)
const height = ref(null)
const inView = ref(true)

let resizeObserver
let intersectionObserver

onMounted(() => {
  resizeObserver = new ResizeObserver(([entry]) => {
    height.value = entry.contentRect.height
  })
  resizeObserver.observe(backdrop.value)

  // Masque le calque une fois l'accueil sorti de l'écran
  intersectionObserver = new IntersectionObserver(([entry]) => {
    inView.value = entry.isIntersecting
  })
  intersectionObserver.observe(section.value)
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
})
</script>

<template>
  <section id="accueil" ref="section" class="relative min-h-screen-dynamic" :style="height ? { minHeight: `${height}px` } : null">
    <!-- Calque de fond fixe, plein écran -->
    <div ref="backdrop" class="fixed inset-0 overflow-hidden bg-ocean-950" :class="{ invisible: !inView }" aria-hidden="true">
      <!-- Photo de fond (si fournie) -->
      <img
        v-if="hero.image.src"
        :src="hero.image.src"
        :alt="hero.image.alt"
        class="absolute inset-0 h-full w-full scale-105 object-cover"
      />

      <!-- Décor « coucher de soleil » en attendant la photo -->
      <div v-else class="absolute inset-0" aria-hidden="true">
        <div
          class="absolute inset-0 bg-[linear-gradient(to_bottom,#050f29_0%,#0b2160_30%,#1a47c9_55%,#c46a3a_80%,#f28a1e_90%,#ffc26b_100%)]"
        ></div>
        <div
          class="absolute bottom-[22%] left-1/2 h-36 w-36 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#ffe0a3] shadow-[0_0_80px_30px_rgba(255,194,107,0.8),0_0_220px_120px_rgba(242,138,30,0.45)]"
        ></div>
        <div class="absolute inset-x-0 bottom-0 h-[22%] bg-linear-to-b from-ocean-500 via-ocean-800 to-ocean-950"></div>
        <div
          class="absolute bottom-0 left-1/2 h-[22%] w-28 -translate-x-1/2 bg-linear-to-b from-sunset-300/80 via-sunset-400/30 to-transparent blur-md"
        ></div>
        <p class="absolute right-6 bottom-6 text-[0.6rem] uppercase tracking-[0.3em] text-sand-50/40">Photo principale à venir</p>
      </div>

      <!-- Voile pour la lisibilité -->
      <div
        class="absolute inset-0"
        :class="
          hero.image.src
            ? 'bg-linear-to-b from-ocean-950/60 via-ocean-950/20 to-ocean-950/70'
            : 'bg-linear-to-b from-ocean-950/40 via-transparent to-transparent'
        "
      ></div>
      <div
        v-if="hero.image.src"
        class="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_48%,rgba(5,15,41,0.55)_0%,transparent_100%)]"
      ></div>
    </div>

    <!-- Contenu, centré dans la zone visible de l'écran -->
    <div class="relative z-10 flex min-h-screen-dynamic items-center justify-center">
      <div class="mt-[-12vh] px-6 text-center">
        <p v-reveal class="eyebrow text-gold-200">Villa de prestige · Vue océan</p>

        <h1 v-reveal="150" class="mt-8 leading-none">
          <span
            class="-mt-8 block px-6 pt-8 pb-2 font-script text-7xl text-gold-gradient drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:text-8xl md:text-9xl"
            >Sunset</span
          >
          <span class="-mt-2 block font-serif text-6xl font-semibold text-sand-50 sm:text-7xl md:-mt-4 md:text-8xl">Blue</span>
        </h1>

        <div v-reveal="300" class="mt-6 flex items-center justify-center gap-4 text-gold-200 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
          <span class="h-px w-12 bg-gold-300/80"></span>
          <span class="text-sm font-medium tracking-[0.6em]">VILLA</span>
          <span class="h-px w-12 bg-gold-300/80"></span>
        </div>

        <p
          v-reveal="450"
          class="mx-auto mt-8 max-w-xl font-serif text-xl italic text-sand-50 drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)] sm:text-2xl"
        >
          {{ villa.tagline }}
        </p>

        <div v-reveal="600" class="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#disponibilites"
            class="bg-gold-gradient px-9 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-ocean-950 shadow-lg shadow-ocean-950/30 transition hover:brightness-110"
          >
            Voir les disponibilités
          </a>
          <a
            href="#villa"
            class="group flex items-center gap-3 border border-sand-50/40 px-9 py-4 text-xs font-medium uppercase tracking-[0.3em] text-sand-50 backdrop-blur-sm transition hover:border-gold-300 hover:text-gold-200"
          >
            Découvrir
            <AppIcon name="arrow" class="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
        </div>
      </div>

      <a href="#villa" class="absolute bottom-8 left-1/2 -translate-x-1/2 text-sand-50/70" aria-label="Défiler vers le bas">
        <span class="block h-12 w-px animate-pulse bg-linear-to-b from-transparent via-gold-300 to-transparent"></span>
      </a>
    </div>
  </section>
</template>
