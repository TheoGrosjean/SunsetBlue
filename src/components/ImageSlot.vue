<script setup>
// Affiche la photo si `src` est renseigné, sinon un encart élégant « Photo à venir ».
defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  dark: { type: Boolean, default: false },
  position: { type: String, default: 'center' },
})
</script>

<template>
  <div class="relative overflow-hidden">
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      loading="lazy"
      class="absolute inset-0 h-full w-full object-cover"
      :style="{ objectPosition: position }"
    />
    <div
      v-else
      class="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center"
      :class="dark
        ? 'bg-linear-to-br from-ocean-800 via-ocean-900 to-ocean-950 text-gold-200/70'
        : 'bg-linear-to-br from-sand-100 via-sand-200 to-gold-100 text-gold-600/70'"
    >
      <div class="absolute inset-3 border border-current opacity-30"></div>
      <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.8 7.2 8 5h8l1.2 2.2H20a1 1 0 0 1 1 1V19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.2a1 1 0 0 1 1-1h2.8Z" />
        <circle cx="12" cy="13" r="3.6" />
      </svg>
      <span class="text-[0.65rem] font-medium uppercase tracking-[0.3em]">Photo à venir</span>
      <span v-if="alt" class="font-serif text-lg italic">{{ alt }}</span>
    </div>
    <slot />
  </div>
</template>
