<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { gallery } from '../data/villa'
import ImageSlot from './ImageSlot.vue'
import SectionTitle from './SectionTitle.vue'
import AppIcon from './AppIcon.vue'

// Seules les vraies photos sont ouvrables dans la visionneuse
const photos = computed(() => gallery.filter((g) => g.src))
const current = ref(-1)

const open = (item) => {
  if (item.src) current.value = photos.value.indexOf(item)
}
const close = () => (current.value = -1)
const step = (d) => (current.value = (current.value + d + photos.value.length) % photos.value.length)

const onKey = (e) => {
  if (current.value < 0) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') step(1)
  if (e.key === 'ArrowLeft') step(-1)
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <section id="galerie" class="py-28 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-10">
      <SectionTitle eyebrow="Galerie" title="Laissez-vous inspirer" />

      <div class="mt-20 grid grid-flow-dense auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4 md:gap-4">
        <button
          v-for="(item, i) in gallery"
          :key="i"
          v-reveal="(i % 4) * 80"
          type="button"
          class="group relative overflow-hidden text-left"
          :class="[item.wide ? 'col-span-2' : '', item.src ? 'cursor-zoom-in' : 'cursor-default']"
          :aria-label="item.alt"
          @click="open(item)"
        >
          <ImageSlot
            v-bind="item"
            class="h-full w-full transition duration-700 [&_img]:transition [&_img]:duration-700 group-hover:[&_img]:scale-105"
          />
        </button>
      </div>
    </div>

    <!-- Visionneuse -->
    <transition enter-active-class="transition duration-300" enter-from-class="opacity-0" leave-active-class="transition duration-200" leave-to-class="opacity-0">
      <div
        v-if="current >= 0"
        class="fixed inset-0 z-[60] flex items-center justify-center bg-ocean-950/95 p-4 backdrop-blur"
        role="dialog"
        aria-modal="true"
        @click.self="close"
      >
        <img :src="photos[current].src" :alt="photos[current].alt" class="max-h-[85vh] max-w-full object-contain shadow-2xl" />
        <p class="absolute bottom-6 left-1/2 -translate-x-1/2 font-serif text-lg italic text-sand-50/80">{{ photos[current].alt }}</p>
        <button class="absolute top-6 right-6 text-sand-50/80 hover:text-gold-300" aria-label="Fermer" @click="close">
          <AppIcon name="close" class="h-8 w-8" />
        </button>
        <template v-if="photos.length > 1">
          <button class="absolute left-4 text-sand-50/70 hover:text-gold-300" aria-label="Précédente" @click="step(-1)">
            <AppIcon name="left" class="h-10 w-10" />
          </button>
          <button class="absolute right-4 text-sand-50/70 hover:text-gold-300" aria-label="Suivante" @click="step(1)">
            <AppIcon name="right" class="h-10 w-10" />
          </button>
        </template>
      </div>
    </transition>
  </section>
</template>
