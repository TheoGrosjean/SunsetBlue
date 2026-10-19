<script setup>
import { rooms } from '../data/villa'
import ImageSlot from './ImageSlot.vue'
import SectionTitle from './SectionTitle.vue'
</script>

<template>
  <section id="chambres" class="bg-sand-100 py-28 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-10">
      <SectionTitle eyebrow="Les espaces nuit" title="Des chambres pensées pour le repos" />

      <div class="mt-20 grid gap-10 md:grid-cols-3">
        <article v-for="(room, i) in rooms" :key="room.name" v-reveal="i * 150" class="group">
          <ImageSlot v-bind="room.image" class="aspect-[3/4] shadow-lg shadow-ocean-900/10">
            <div class="absolute inset-0 bg-linear-to-t from-ocean-950/70 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100"></div>
          </ImageSlot>
          <div class="mt-6 border-l border-gold-400 pl-5">
            <h3 class="font-serif text-2xl text-ocean-800">{{ room.name }}</h3>
            <p class="mt-2 text-sm text-ocean-950/60">{{ room.details }}</p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
