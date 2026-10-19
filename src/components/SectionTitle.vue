<script setup>
defineProps({
  eyebrow: String,
  title: String,
  light: Boolean,
  align: { type: String, default: 'center' },
})
</script>

<template>
  <div v-reveal :class="align === 'center' ? 'mx-auto max-w-2xl text-center' : ''">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h2
      class="mt-4 font-serif text-4xl leading-tight font-medium sm:text-5xl"
      :class="light ? 'text-sand-50' : 'text-ocean-800'"
    >
      {{ title }}
    </h2>
    <div class="mt-6 flex items-center gap-3" :class="align === 'center' ? 'justify-center' : ''">
      <span class="h-px w-10 bg-gold-400"></span>
      <span class="h-1.5 w-1.5 rotate-45 bg-gold-400"></span>
      <span class="h-px w-10 bg-gold-400"></span>
    </div>
  </div>
</template>
