<script setup>
defineProps({ name: { type: String, required: true } })

const paths = {
  pool: 'M2 18c1.5 0 2.5-1 4-1s2.5 1 4 1 2.5-1 4-1 2.5 1 4 1 2.5-1 4-1M2 21c1.5 0 2.5-1 4-1s2.5 1 4 1 2.5-1 4-1 2.5 1 4 1 2.5-1 4-1M8 15V5a2 2 0 0 1 4 0M16 15V5a2 2 0 0 0-4 0M8 9h8M8 12.5h8',
  wave: 'M2 12c2 0 3-2 5-2s3 2 5 2 3-2 5-2 3 2 5 2M2 17c2 0 3-2 5-2s3 2 5 2 3-2 5-2 3 2 5 2M12 3v3M5.6 5.6l1.4 1.4M18.4 5.6 17 7',
  wifi: 'M2 8.8a15 15 0 0 1 20 0M5 12.4a10.5 10.5 0 0 1 14 0M8.5 15.9a5.5 5.5 0 0 1 7 0M12 19.5h.01',
  snow: 'M12 2v20M4.9 6l14.2 12M4.9 18 19.1 6M9 3.5l3 2.5 3-2.5M9 20.5l3-2.5 3 2.5',
  kitchen: 'M4 3h16v18H4zM4 9h16M8 6h.01M12 6h.01M8 13v4',
  parking: 'M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM9 17V7h4a3 3 0 0 1 0 6H9',
  sun: 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  bbq: 'M4 9h16a8 8 0 0 1-16 0ZM8 17l-2 5M16 17l2 5M9 2c0 1.5 1 1.5 1 3s-1 1.5-1 3M14 2c0 1.5 1 1.5 1 3s-1 1.5-1 3',
  tv: 'M3 5h18v12H3zM8 21h8M12 17v4',
  washer: 'M4 2h16v20H4zM4 6h16M12 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  pin: 'M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12ZM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  mail: 'M3 5h18v14H3zM3 6l9 7 9-7',
  phone: 'M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2Z',
  instagram: 'M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM17.5 6.5h.01',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  close: 'M6 6l12 12M18 6 6 18',
  left: 'M15 18l-6-6 6-6',
  right: 'M9 18l6-6-6-6',
}
</script>

<template>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path :d="paths[name]" />
  </svg>
</template>
