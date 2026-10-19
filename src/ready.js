// Signal « site prêt » : levé quand l'écran de chargement commence à disparaître.
// Les animations v-reveal attendent ce signal pour que le hero s'anime au bon moment.
let resolve
export const siteReady = new Promise((r) => (resolve = r))
export const markSiteReady = () => resolve()
