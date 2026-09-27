<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  src?: string
  caption: string
  alt?: string
}>()

const imageSrc = computed(() => props.src?.trim() ?? '')
const hasImage = computed(() => imageSrc.value.length > 0)
</script>

<template>
  <figure class="sp-shot" :class="{ 'is-filled': hasImage }">
    <div v-if="hasImage" class="sp-shot__media">
      <img
        class="sp-shot__img"
        :src="imageSrc"
        :alt="alt || caption"
      >
    </div>
    <div class="sp-shot__caption">{{ caption }}</div>
  </figure>
</template>
