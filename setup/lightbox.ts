import { ref } from 'vue'

export const lightboxSrc = ref('')
export const lightboxAlt = ref('')

export function openLightbox(src: string, alt = '') {
  lightboxSrc.value = src
  lightboxAlt.value = alt
}

export function closeLightbox() {
  lightboxSrc.value = ''
  lightboxAlt.value = ''
}
