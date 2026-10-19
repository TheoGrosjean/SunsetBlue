<script setup>
import { ref, onMounted } from 'vue'
import { hero, villa, loader } from '../data/villa'
import { markSiteReady } from '../ready'
import logo from '../assets/logo.jpg'

const VARIANTS = ['sunset', 'signature', 'logo', 'rideau']

// ?loader=xxx dans l'adresse permet de tester une variante sans toucher au code
const requested = new URLSearchParams(window.location.search).get('loader')
const variant = VARIANTS.includes(requested) ? requested : VARIANTS.includes(loader) ? loader : ''

// Durée minimale d'affichage (le temps que l'animation se joue) et durée de sortie
const MIN_DURATION = { sunset: 2600, signature: 2800, logo: 2300, rideau: 2300 }
const EXIT_DURATION = 1000
const MAX_WAIT = 6000

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const visible = ref(Boolean(variant))
const started = ref(false) // lancé une fois les polices chargées
const leaving = ref(false)

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

const heroLoaded = () =>
  new Promise((resolve) => {
    if (!hero.image.src) return resolve()
    const img = new Image()
    img.onload = img.onerror = resolve
    img.src = hero.image.src
  })

onMounted(async () => {
  if (!variant) return markSiteReady()

  const root = document.documentElement
  root.style.overflow = 'hidden'

  // Les polices doivent être prêtes avant de dessiner le texte (variante signature)
  await Promise.race([document.fonts.ready, wait(1500)])
  started.value = true

  await Promise.race([
    Promise.all([heroLoaded(), wait(reduceMotion ? 300 : MIN_DURATION[variant])]),
    wait(MAX_WAIT),
  ])

  leaving.value = true
  markSiteReady()
  await wait(reduceMotion ? 300 : EXIT_DURATION)
  root.style.overflow = ''
  visible.value = false
})

const word = 'SUNSET BLUE'.split('')
</script>

<template>
  <div
    v-if="visible"
    class="loader fixed inset-x-0 top-0 z-100 h-lvh overflow-hidden"
    :class="[`loader--${variant}`, { 'is-started': started, 'is-leaving': leaving }]"
    role="status"
    :aria-label="`Chargement de ${villa.name}`"
  >
    <!-- 1. COUCHER DE SOLEIL ─────────────────────────────── -->
    <template v-if="variant === 'sunset'">
      <div class="sunset-panel absolute inset-0 bg-ocean-950">
        <div class="sunset-sky absolute inset-x-0 top-0 h-[60%] overflow-hidden">
          <div class="sunset-glow absolute inset-0"></div>
          <div class="sunset-sun absolute bottom-0 left-1/2 h-24 w-24 rounded-full sm:h-28 sm:w-28"></div>
        </div>
        <div class="sunset-horizon absolute inset-x-0 top-[60%] h-px bg-gold-300"></div>
        <div class="sunset-reflect absolute top-[60%] left-1/2 h-[18%] w-20 -translate-x-1/2"></div>
        <div class="sunset-title absolute inset-x-0 top-[68%] text-center leading-none">
          <span class="text-gold-gradient block px-4 pt-6 pb-1 font-script text-6xl sm:text-7xl">Sunset</span>
          <span class="-mt-3 block font-serif text-4xl font-semibold text-sand-50 sm:text-5xl">Blue</span>
        </div>
      </div>
    </template>

    <!-- 2. SIGNATURE ─────────────────────────────────────── -->
    <template v-else-if="variant === 'signature'">
      <div class="signature-panel absolute inset-0 flex flex-col items-center justify-center bg-ocean-950 px-6">
        <svg class="signature-svg w-full max-w-xl" viewBox="0 0 600 210" aria-hidden="true">
          <defs>
            <linearGradient id="loader-gold" x1="0" x2="1" y1="0" y2="0.3">
              <stop offset="0%" stop-color="#966b2c" />
              <stop offset="40%" stop-color="#dcbc6c" />
              <stop offset="55%" stop-color="#f4ead0" />
              <stop offset="75%" stop-color="#cfa448" />
              <stop offset="100%" stop-color="#966b2c" />
            </linearGradient>
          </defs>
          <text x="300" y="155" text-anchor="middle" class="signature-text font-script">Sunset</text>
        </svg>
        <span class="signature-blue -mt-4 block font-serif text-5xl font-semibold text-sand-50 sm:-mt-6 sm:text-6xl">Blue</span>
        <div class="signature-villa mt-5 flex items-center gap-4 text-gold-200">
          <span class="signature-line h-px w-12 bg-gold-300/80"></span>
          <span class="text-xs font-medium tracking-[0.6em]">VILLA</span>
          <span class="signature-line h-px w-12 bg-gold-300/80"></span>
        </div>
      </div>
    </template>

    <!-- 3. LOGO ──────────────────────────────────────────── -->
    <template v-else-if="variant === 'logo'">
      <div class="logo-panel absolute inset-0 flex flex-col items-center justify-center bg-sand-50 px-6">
        <div class="logo-content flex flex-col items-center">
          <div class="relative h-48 w-48 sm:h-56 sm:w-56">
            <svg class="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 200 200" aria-hidden="true">
              <circle cx="100" cy="100" r="96" fill="none" stroke="#efe5d3" stroke-width="1.5" />
              <circle class="logo-ring" cx="100" cy="100" r="96" fill="none" stroke="#cfa448" stroke-width="1.5" stroke-linecap="round" />
            </svg>
            <img :src="logo" alt="" class="logo-img absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] rounded-full object-cover" />
          </div>
          <p class="logo-tagline mt-8 text-center font-serif text-xl text-ocean-800 italic">{{ villa.tagline }}</p>
        </div>
      </div>
    </template>

    <!-- 4. RIDEAU ────────────────────────────────────────── -->
    <template v-else-if="variant === 'rideau'">
      <div class="rideau-top absolute inset-x-0 top-0 h-1/2 bg-ocean-950"></div>
      <div class="rideau-bottom absolute inset-x-0 bottom-0 h-1/2 bg-ocean-950"></div>
      <div class="rideau-content absolute inset-0 flex flex-col items-center justify-center px-6">
        <p class="font-serif text-4xl font-medium tracking-[0.35em] text-sand-50 sm:text-6xl">
          <span
            v-for="(letter, i) in word"
            :key="i"
            class="rideau-letter inline-block"
            :class="{ 'text-gold-300': i < 6 }"
            :style="{ animationDelay: `${200 + i * 70}ms` }"
          >{{ letter === ' ' ? ' ' : letter }}</span>
        </p>
        <div class="mt-8 h-px w-56 overflow-hidden bg-sand-50/10 sm:w-72">
          <div class="rideau-progress h-full bg-linear-to-r from-gold-600 via-gold-200 to-gold-500"></div>
        </div>
        <p class="rideau-villa mt-6 text-[0.65rem] font-medium tracking-[0.6em] text-gold-200/80">VILLA</p>
      </div>
    </template>
  </div>
</template>

<style scoped>
/* Les animations ne démarrent qu'une fois les polices prêtes (.is-started) */
.loader:not(.is-started) * {
  animation-play-state: paused !important;
}

/* ── 1. Coucher de soleil ── */
/* Sortie : fondu enchaîné vers la photo d'accueil */
.sunset-panel {
  transition: opacity 1s ease-in-out, transform 1.2s ease-out, filter 1s ease-in-out;
}
.is-leaving .sunset-panel {
  opacity: 0;
  transform: scale(1.08);
  filter: blur(4px);
}
.sunset-glow {
  background: radial-gradient(ellipse 70% 90% at 50% 100%, rgba(242, 138, 30, 0.75), rgba(196, 106, 58, 0.35) 45%, transparent 75%),
    linear-gradient(to bottom, #050f29, #0b2160 60%, #1238a8);
  opacity: 0;
  animation: fade-in 2.2s ease-out 0.3s forwards;
}
.sunset-sun {
  background: radial-gradient(circle, #fff3d6 0%, #ffe0a3 45%, #ffa53d 100%);
  box-shadow: 0 0 60px 20px rgba(255, 194, 107, 0.6), 0 0 140px 60px rgba(242, 138, 30, 0.35);
  transform: translate(-50%, -260%);
  animation: sun-set 2.4s cubic-bezier(0.3, 0.1, 0.3, 1) 0.2s forwards;
}
@keyframes sun-set {
  to { transform: translate(-50%, 45%); }
}
.sunset-horizon {
  transform: scaleX(0);
  animation: grow-x 1.2s cubic-bezier(0.6, 0, 0.2, 1) forwards;
}
.sunset-reflect {
  background: linear-gradient(to bottom, rgba(255, 194, 107, 0.7), transparent);
  filter: blur(8px);
  opacity: 0;
  animation: fade-in 1s ease-out 1.6s forwards;
}
.sunset-title {
  opacity: 0;
  animation: fade-up 1s ease-out 1.3s forwards;
}

/* ── 2. Signature ── */
.signature-panel {
  transition: opacity 0.9s ease, transform 1s ease, filter 0.9s ease;
}
.is-leaving .signature-panel {
  opacity: 0;
  transform: scale(1.06);
  filter: blur(6px);
}
.signature-text {
  font-size: 150px;
  fill: url(#loader-gold);
  fill-opacity: 0;
  stroke: url(#loader-gold);
  stroke-width: 1.2;
  stroke-dasharray: 1400;
  stroke-dashoffset: 1400;
  animation: draw 2.2s cubic-bezier(0.5, 0, 0.3, 1) forwards, fill-in 0.8s ease 1.7s forwards;
}
@keyframes draw {
  to { stroke-dashoffset: 0; }
}
@keyframes fill-in {
  to { fill-opacity: 1; stroke-width: 0; }
}
.signature-blue {
  opacity: 0;
  animation: fade-up 0.9s ease-out 1.6s forwards;
}
.signature-villa {
  opacity: 0;
  animation: fade-in 0.8s ease-out 2s forwards;
}
.signature-line {
  transform: scaleX(0);
  animation: grow-x 0.8s ease-out 2.1s forwards;
}

/* ── 3. Logo ── */
.logo-panel {
  transition: transform 1s cubic-bezier(0.7, 0, 0.2, 1) 0.15s;
}
.is-leaving .logo-panel {
  transform: translateY(-100%);
}
.logo-content {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.is-leaving .logo-content {
  opacity: 0;
  transform: scale(0.94);
}
.logo-ring {
  stroke-dasharray: 604;
  stroke-dashoffset: 604;
  animation: ring 2s cubic-bezier(0.5, 0, 0.3, 1) forwards;
}
@keyframes ring {
  to { stroke-dashoffset: 0; }
}
.logo-img {
  opacity: 0;
  transform: scale(0.85);
  animation: logo-in 1.1s cubic-bezier(0.2, 0.7, 0.2, 1) 0.2s forwards;
}
@keyframes logo-in {
  to { opacity: 1; transform: none; }
}
.logo-tagline {
  opacity: 0;
  animation: fade-up 0.9s ease-out 1s forwards;
}

/* ── 4. Rideau ── */
.rideau-top,
.rideau-bottom {
  transition: transform 1s cubic-bezier(0.7, 0, 0.2, 1) 0.2s;
}
.is-leaving .rideau-top {
  transform: translateY(-100%);
}
.is-leaving .rideau-bottom {
  transform: translateY(100%);
}
.rideau-content {
  transition: opacity 0.4s ease;
}
.is-leaving .rideau-content {
  opacity: 0;
}
.rideau-letter {
  opacity: 0;
  transform: translateY(0.4em);
  animation: letter-in 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
}
@keyframes letter-in {
  to { opacity: 1; transform: none; }
}
.rideau-progress {
  transform: scaleX(0);
  transform-origin: left;
  animation: grow-x 2.1s cubic-bezier(0.5, 0, 0.2, 1) forwards;
}
.rideau-villa {
  opacity: 0;
  animation: fade-in 0.8s ease-out 1.2s forwards;
}

/* ── Communs ── */
@keyframes fade-in {
  to { opacity: 1; }
}
@keyframes fade-up {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: none; }
}
@keyframes grow-x {
  to { transform: scaleX(1); }
}

@media (prefers-reduced-motion: reduce) {
  .loader * {
    animation-duration: 1ms !important;
    animation-delay: 0ms !important;
    transition-duration: 300ms !important;
  }
}
</style>
