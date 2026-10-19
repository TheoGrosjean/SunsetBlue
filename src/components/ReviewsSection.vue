<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { reviews } from '../data/villa'

const active = ref(0)
let timer
const go = (i) => {
  active.value = i
  clearInterval(timer)
  timer = setInterval(() => (active.value = (active.value + 1) % reviews.length), 7000)
}
onMounted(() => go(0))
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <section class="relative overflow-hidden bg-linear-to-br from-ocean-700 via-ocean-800 to-ocean-950 py-28 lg:py-36">
    <div class="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-sunset-400/20 blur-3xl"></div>

    <div class="relative mx-auto max-w-4xl px-6 text-center">
      <p v-reveal class="eyebrow text-gold-300">Ils ont séjourné chez nous</p>
      <div v-reveal="100" class="mt-6 font-serif text-8xl leading-none text-gold-300/60">“</div>

      <div class="relative min-h-[16rem] sm:min-h-[12rem]">
        <transition-group
          enter-active-class="transition duration-700 ease-out"
          enter-from-class="opacity-0 translate-y-4"
          leave-active-class="transition duration-300 absolute inset-x-0 top-0"
          leave-to-class="opacity-0"
        >
          <figure v-for="(r, i) in reviews" v-show="i === active" :key="r.author">
            <blockquote class="font-serif text-2xl leading-relaxed text-sand-50 italic sm:text-3xl">
              {{ r.quote }}
            </blockquote>
            <figcaption class="mt-8 text-xs uppercase tracking-[0.3em] text-gold-200">
              {{ r.author }} <span class="text-sand-50/40">· {{ r.origin }}</span>
            </figcaption>
          </figure>
        </transition-group>
      </div>

      <div class="mt-10 flex justify-center gap-3">
        <button
          v-for="(r, i) in reviews"
          :key="i"
          class="h-1 transition-all duration-500"
          :class="i === active ? 'w-10 bg-gold-300' : 'w-4 bg-sand-50/30 hover:bg-sand-50/60'"
          :aria-label="`Avis ${i + 1}`"
          @click="go(i)"
        ></button>
      </div>
    </div>
  </section>
</template>
