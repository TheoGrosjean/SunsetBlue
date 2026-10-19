<script setup>
import { reactive, computed, onMounted } from 'vue'
import { airbnb } from '../data/villa'
import SectionTitle from './SectionTitle.vue'
import AppIcon from './AppIcon.vue'

const listingId = airbnb.listingUrl.match(/rooms\/(\d+)/)?.[1] ?? ''

// Dates en heure locale (format AAAA-MM-JJ des champs date)
const pad = (n) => String(n).padStart(2, '0')
const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const fromISO = (iso) => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}
const addDays = (iso, n) => {
  const d = fromISO(iso)
  d.setDate(d.getDate() + n)
  return toISO(d)
}
const today = toISO(new Date())

const form = reactive({ arrival: '', departure: '', guests: 2 })

const minDeparture = computed(() => (form.arrival ? addDays(form.arrival, airbnb.minNights) : today))
const nights = computed(() => {
  if (!form.arrival || !form.departure) return 0
  return Math.round((fromISO(form.departure) - fromISO(form.arrival)) / 86400000)
})

const onArrival = () => {
  if (form.departure && form.departure < minDeparture.value) form.departure = minDeparture.value
}

// Ouvre l'annonce Airbnb avec les dates et voyageurs pré-remplis :
// Airbnb y affiche directement la disponibilité et le prix.
const bookingUrl = computed(() => {
  if (!airbnb.listingUrl) return ''
  const url = new URL(airbnb.listingUrl)
  url.search = ''
  if (form.arrival && form.departure && nights.value > 0) {
    url.searchParams.set('check_in', form.arrival)
    url.searchParams.set('check_out', form.departure)
  }
  url.searchParams.set('adults', form.guests)
  return url.toString()
})

// Widget officiel Airbnb (carte de l'annonce)
onMounted(() => {
  if (!listingId || document.querySelector('script[data-airbnb-sdk]')) return
  const script = document.createElement('script')
  script.src = 'https://www.airbnb.fr/embeddable/airbnb_jssdk'
  script.async = true
  script.dataset.airbnbSdk = ''
  document.body.appendChild(script)
})

const field = 'mt-2 w-full border-0 border-b border-gold-300/40 bg-transparent px-0 py-3 text-sand-50 [color-scheme:dark] focus:border-gold-300 focus:outline-none focus:ring-0 transition'
const label = 'text-[0.65rem] font-medium uppercase tracking-[0.25em] text-gold-200/80'
</script>

<template>
  <section id="disponibilites" class="py-28 lg:py-36">
    <div class="mx-auto max-w-7xl px-6 lg:px-10">
      <SectionTitle eyebrow="Réservation" title="Disponibilités en temps réel" />
      <p v-reveal class="mx-auto mt-8 max-w-xl text-center leading-relaxed text-ocean-950/70">
        Choisissez vos dates : vous accédez directement au calendrier et au tarif de la villa sur Airbnb.
      </p>

      <div class="mt-16 grid items-stretch gap-8 lg:grid-cols-5">
        <!-- Sélecteur de séjour -->
        <form
          v-reveal
          class="relative overflow-hidden bg-ocean-900 p-8 shadow-2xl shadow-ocean-900/30 sm:p-12 lg:col-span-3"
          @submit.prevent
        >
          <div class="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-sunset-400/15 blur-3xl"></div>

          <div class="relative grid gap-8 sm:grid-cols-2">
            <label class="block">
              <span :class="label">Arrivée</span>
              <input v-model="form.arrival" type="date" :min="today" :class="field" @change="onArrival" />
            </label>
            <label class="block">
              <span :class="label">Départ</span>
              <input v-model="form.departure" type="date" :min="minDeparture" :class="field" />
            </label>
            <label class="block sm:col-span-2">
              <span :class="label">Voyageurs</span>
              <select v-model="form.guests" :class="field">
                <option v-for="n in airbnb.maxGuests" :key="n" :value="n" class="text-ocean-950">
                  {{ n }} voyageur{{ n > 1 ? 's' : '' }}
                </option>
              </select>
            </label>
          </div>

          <div class="relative mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p class="font-serif text-xl text-sand-50/90 italic">
              <template v-if="nights > 0">{{ nights }} nuit{{ nights > 1 ? 's' : '' }} · {{ form.guests }} voyageur{{ form.guests > 1 ? 's' : '' }}</template>
              <template v-else>Séjour de {{ airbnb.minNights }} nuits minimum</template>
            </p>
            <a
              v-if="bookingUrl"
              :href="bookingUrl"
              target="_blank"
              rel="noopener"
              class="bg-gold-gradient group inline-flex items-center justify-center gap-3 px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-ocean-950 transition hover:brightness-110"
            >
              Voir les disponibilités
              <AppIcon name="arrow" class="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <span
              v-else
              class="inline-flex items-center justify-center border border-gold-300/40 px-8 py-4 text-xs uppercase tracking-[0.25em] text-gold-200/60"
            >Lien Airbnb à configurer</span>
          </div>

          <p class="relative mt-8 flex items-center gap-2 border-t border-gold-300/15 pt-6 text-xs text-sand-50/50">
            <svg class="h-4 w-4 text-gold-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" /><path stroke-linecap="round" stroke-linejoin="round" d="m9 12 2 2 4-4" /></svg>
            {{ airbnb.note }}
          </p>
        </form>

        <!-- Carte de l'annonce Airbnb -->
        <div v-reveal="150" class="flex items-center justify-center border border-gold-200 bg-sand-100 p-6 lg:col-span-2">
          <div
            v-if="listingId"
            class="airbnb-embed-frame w-full max-w-112.5"
            :data-id="listingId"
            data-view="home"
            data-hide-price="true"
            style="height: 300px; margin: auto"
          >
            <a :href="`${airbnb.listingUrl}?source=embed_widget`" target="_blank" rel="noopener" class="font-serif text-xl text-ocean-800 underline decoration-gold-300 underline-offset-4">
              Voir l’annonce sur Airbnb
            </a>
          </div>
          <div v-else class="py-12 text-center text-gold-600/70">
            <AppIcon name="pin" class="mx-auto h-8 w-8" />
            <p class="mt-4 text-[0.65rem] font-medium uppercase tracking-[0.3em]">Annonce Airbnb à venir</p>
            <p class="mt-2 font-serif text-lg italic">L’aperçu de l’annonce s’affichera ici</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
