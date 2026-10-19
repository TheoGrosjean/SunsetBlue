import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { siteReady } from './ready'

const app = createApp(App)

// v-reveal : fondu à l'apparition au scroll
const REVEAL_DELAY_FACTOR = 0.5
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.05 },
)

app.directive('reveal', {
  mounted(el, binding) {
    el.classList.add('reveal')
    // Les délais indiqués dans les composants (v-reveal="150") sont réduits de moitié
    if (binding.value) el.style.transitionDelay = `${binding.value * REVEAL_DELAY_FACTOR}ms`
    siteReady.then(() => observer.observe(el))
  },
  unmounted(el) {
    observer.unobserve(el)
  },
})

app.mount('#app')
