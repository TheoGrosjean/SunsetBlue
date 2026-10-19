import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { siteReady } from './ready'

const app = createApp(App)

// v-reveal : fondu à l'apparition au scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
)

app.directive('reveal', {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value) el.style.transitionDelay = `${binding.value}ms`
    siteReady.then(() => observer.observe(el))
  },
  unmounted(el) {
    observer.unobserve(el)
  },
})

app.mount('#app')
