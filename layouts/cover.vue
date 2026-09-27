<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  kicker?: string
  headline?: string
  subtitle?: string
  website?: string
  hero?: boolean
}>()

const subtitleText = computed(() => props.subtitle?.trim() ?? '')
const href = computed(() => {
  if (!props.website)
    return ''
  return props.website.startsWith('http') ? props.website : `https://${props.website}`
})
</script>

<template>
  <div class="slidev-layout sp-cover" :class="{ 'is-hero': hero }">
    <div class="sp-cover__main">
      <div v-if="kicker" class="sp-cover__kicker">{{ kicker }}</div>
      <h1 class="sp-cover__title">{{ headline }}</h1>
      <div v-if="subtitleText" class="sp-cover__sub">{{ subtitleText }}</div>
    </div>
    <a v-if="website" class="sp-cover__url" :href="href">{{ website }}</a>
  </div>
</template>
