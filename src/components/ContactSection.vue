<script setup>
import { reactive } from 'vue'
import { villa } from '../data/villa'
import AppIcon from './AppIcon.vue'
import SectionTitle from './SectionTitle.vue'

const form = reactive({ name: '', email: '', arrival: '', departure: '', guests: 2, message: '' })

// Sans serveur : ouvre la messagerie du visiteur avec la demande pré-remplie.
// (Peut être remplacé plus tard par Formspree, EmailJS, etc.)
const submit = () => {
  const subject = `Sunset Blue Villa — message de ${form.name}`
  const body = [
    `Nom : ${form.name}`,
    `Email : ${form.email}`,
    `Arrivée : ${form.arrival || '—'}`,
    `Départ : ${form.departure || '—'}`,
    `Voyageurs : ${form.guests}`,
    '',
    form.message,
  ].join('\n')
  window.location.href = `mailto:${villa.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

const field = 'w-full border-0 border-b border-gold-300/60 bg-transparent px-0 py-3 text-ocean-950 placeholder:text-ocean-950/35 focus:border-ocean-600 focus:ring-0 focus:outline-none transition'
const label = 'text-[0.65rem] font-medium uppercase tracking-[0.25em] text-ocean-950/55'
</script>

<template>
  <section id="contact" class="py-28 lg:py-36">
    <div class="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-5 lg:px-10">
      <div class="lg:col-span-2">
        <SectionTitle eyebrow="Contact" title="Une question ?" align="left" />
        <p v-reveal class="mt-8 leading-relaxed text-ocean-950/70">
          Une demande particulière, un séjour long ou une question sur la villa ? Écrivez-nous, nous vous répondons personnellement sous 24 heures.
        </p>
        <ul class="mt-10 space-y-5">
          <li v-reveal="100">
            <a :href="`mailto:${villa.email}`" class="flex items-center gap-4 text-ocean-800 transition hover:text-gold-600">
              <span class="flex h-11 w-11 items-center justify-center border border-gold-300"><AppIcon name="mail" class="h-5 w-5 text-gold-500" /></span>
              {{ villa.email }}
            </a>
          </li>
          <li v-reveal="200">
            <a :href="`tel:${villa.phone.replace(/\s/g, '')}`" class="flex items-center gap-4 text-ocean-800 transition hover:text-gold-600">
              <span class="flex h-11 w-11 items-center justify-center border border-gold-300"><AppIcon name="phone" class="h-5 w-5 text-gold-500" /></span>
              {{ villa.phone }}
            </a>
          </li>
        </ul>
      </div>

      <form v-reveal="200" class="bg-sand-100 p-8 shadow-xl shadow-ocean-900/5 sm:p-12 lg:col-span-3" @submit.prevent="submit">
        <div class="grid gap-8 sm:grid-cols-2">
          <label class="block">
            <span :class="label">Nom complet</span>
            <input v-model="form.name" required type="text" placeholder="Jean Dupont" :class="field" />
          </label>
          <label class="block">
            <span :class="label">Email</span>
            <input v-model="form.email" required type="email" placeholder="jean@exemple.com" :class="field" />
          </label>
          <label class="block">
            <span :class="label">Arrivée</span>
            <input v-model="form.arrival" type="date" :class="field" />
          </label>
          <label class="block">
            <span :class="label">Départ</span>
            <input v-model="form.departure" type="date" :min="form.arrival" :class="field" />
          </label>
          <label class="block sm:col-span-2">
            <span :class="label">Nombre de voyageurs</span>
            <select v-model="form.guests" :class="field">
              <option v-for="n in 8" :key="n" :value="n">{{ n }} voyageur{{ n > 1 ? 's' : '' }}</option>
            </select>
          </label>
          <label class="block sm:col-span-2">
            <span :class="label">Message</span>
            <textarea v-model="form.message" rows="4" placeholder="Vos souhaits, questions…" :class="[field, 'resize-none']"></textarea>
          </label>
        </div>
        <button type="submit" class="bg-gold-gradient mt-10 w-full px-9 py-4 text-xs font-semibold uppercase tracking-[0.3em] text-ocean-950 transition hover:brightness-110 sm:w-auto">
          Envoyer mon message
        </button>
      </form>
    </div>
  </section>
</template>
