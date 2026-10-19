<script setup>
import { villa } from '../data/villa'
import logo from '../assets/logo.jpg'
import AppIcon from './AppIcon.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-ocean-950 pt-20 pb-10 text-sand-50/70">
    <div class="mx-auto max-w-7xl px-6 lg:px-10">
      <div class="flex flex-col items-center text-center">
        <img :src="logo" alt="Sunset Blue Villa" class="h-28 w-28 rounded-full object-cover ring-1 ring-gold-300/50 ring-offset-4 ring-offset-ocean-950" />
        <p class="mt-6 font-serif text-lg italic">{{ villa.tagline }}</p>
        <div class="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[0.65rem] uppercase tracking-[0.25em]">
          <a href="#villa" class="hover:text-gold-200">La villa</a>
          <a href="#equipements" class="hover:text-gold-200">Équipements</a>
          <a href="#galerie" class="hover:text-gold-200">Galerie</a>
          <a href="#disponibilites" class="hover:text-gold-200">Disponibilités</a>
          <a href="#contact" class="hover:text-gold-200">Contact</a>
        </div>
        <a v-if="villa.instagram" :href="villa.instagram" target="_blank" rel="noopener" class="mt-8 text-gold-300 hover:text-gold-100" aria-label="Instagram">
          <AppIcon name="instagram" class="h-6 w-6" />
        </a>
      </div>
      <div class="mt-16 flex flex-col items-center justify-between gap-3 border-t border-gold-300/15 pt-8 text-xs text-sand-50/40 sm:flex-row">
        <p>© {{ year }} {{ villa.name }} · Tous droits réservés</p>
        <p>{{ villa.location }}</p>
      </div>
    </div>
  </footer>
</template>
