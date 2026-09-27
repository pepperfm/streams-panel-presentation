<script setup lang="ts">
import { lockShortcuts, useNav } from '@slidev/client'
import { onMounted, onUnmounted, watch } from 'vue'
import { closeLightbox, lightboxAlt, lightboxSrc } from './setup/lightbox'

const { isPlaying, isPresenter, isPrintMode } = useNav()

let releaseShortcuts: (() => void) | null = null

watch(lightboxSrc, (src) => {
  if (src && !releaseShortcuts)
    releaseShortcuts = lockShortcuts()
  if (!src && releaseShortcuts) {
    releaseShortcuts()
    releaseShortcuts = null
  }
})

watch([isPlaying, isPresenter, isPrintMode], () => {
  if (!isPlaying.value || isPresenter.value || isPrintMode.value)
    closeLightbox()
})

function onKeyDown(event: KeyboardEvent) {
  if (!lightboxSrc.value)
    return
  event.preventDefault()
  event.stopImmediatePropagation()
  if (event.key === 'Escape')
    closeLightbox()
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown, true)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown, true)
  releaseShortcuts?.()
  releaseShortcuts = null
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="lightboxSrc"
      class="sp-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Скриншот"
      @click.self="closeLightbox"
    >
      <button type="button" class="sp-lightbox__close" @click="closeLightbox">
        Закрыть
      </button>
      <img class="sp-lightbox__img" :src="lightboxSrc" :alt="lightboxAlt">
    </div>
  </Teleport>
</template>
