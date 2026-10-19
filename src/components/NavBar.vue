<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import logo from '../assets/logo.jpg'

const links = [
  { href: '#villa', label: 'La villa' },
  { href: '#equipements', label: 'Équipements' },
  { href: '#chambres', label: 'Chambres' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#disponibilites', label: 'Disponibilités' },
]

const scrolled = ref(false)
const open = ref(false)
const onScroll = () => (scrolled.value = window.scrollY > 40)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-500"
    :class="scrolled || open ? 'bg-ocean-950/90 py-3 shadow-lg shadow-ocean-950/20 backdrop-blur-md' : 'py-6'"
  >
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
      <a href="#accueil" class="flex items-center gap-3" @click="open = false">
        <img :src="logo" alt="Sunset Blue Villa" class="h-11 w-11 rounded-full object-cover ring-1 ring-gold-300/60" />
        <span class="leading-none">
          <span class="-my-2 inline-block px-1 py-2 font-script text-2xl text-gold-gradient">Sunset</span>
          <span class="ml-1 font-serif text-xl font-semibold text-sand-50">Blue</span>
        </span>
      </a>

      <ul class="hidden items-center gap-9 lg:flex">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            class="group relative text-[0.7rem] font-medium uppercase tracking-[0.25em] text-sand-50/85 transition hover:text-gold-200"
          >
            {{ link.label }}
            <span class="absolute -bottom-1.5 left-0 h-px w-0 bg-gold-300 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </li>
      </ul>

      <a
        href="#disponibilites"
        class="hidden border border-gold-300/70 px-6 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.25em] text-gold-100 transition hover:bg-gold-300 hover:text-ocean-950 lg:inline-block"
      >
        Réserver
      </a>

      <button class="text-sand-50 lg:hidden" :aria-expanded="open" aria-label="Menu" @click="open = !open">
        <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.3">
          <path v-if="!open" stroke-linecap="round" d="M4 7h16M4 12h16M10 17h10" />
          <path v-else stroke-linecap="round" d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </nav>

    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <ul v-if="open" class="flex flex-col items-center gap-6 px-6 pt-6 pb-10 lg:hidden">
        <li v-for="link in [...links, { href: '#disponibilites', label: 'Réserver' }]" :key="link.href">
          <a
            :href="link.href"
            class="text-sm uppercase tracking-[0.3em] text-sand-50/90 hover:text-gold-200"
            @click="open = false"
          >{{ link.label }}</a>
        </li>
      </ul>
    </transition>
  </header>
</template>
