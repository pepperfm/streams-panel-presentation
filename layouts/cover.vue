<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  kicker?: string
  headline?: string
  subtitle?: string
  website?: string
  hero?: boolean
  cta?: string
}>()

const subtitleText = computed(() => props.subtitle?.trim() ?? '')
const ctaLabel = computed(() => props.cta?.trim() ?? '')
const href = computed(() => {
  if (!props.website)
    return ''
  return props.website.startsWith('http') ? props.website : `https://${props.website}`
})
</script>

<template>
  <div class="slidev-layout sp-cover" :class="{ 'is-hero': hero }">
    <div v-if="hero" class="sp-logo">
      <span class="sp-logo__accent">S</span>treams<span class="sp-logo__accent">P</span>anel
    </div>
    <div class="sp-cover__main">
      <div v-if="kicker" class="sp-cover__kicker">{{ kicker }}</div>
      <h1 class="sp-cover__title">{{ headline }}</h1>
      <div v-if="subtitleText" class="sp-cover__sub">{{ subtitleText }}</div>
      <a
        v-if="ctaLabel && href"
        class="sp-cover__cta"
        :href="href"
        target="_blank"
        rel="noopener"
      >{{ ctaLabel }}</a>
    </div>
    <a
      v-if="website"
      class="sp-cover__url"
      :class="{ 'is-secondary': Boolean(ctaLabel) }"
      :href="href"
      :target="ctaLabel ? '_blank' : undefined"
      :rel="ctaLabel ? 'noopener' : undefined"
    >{{ website }}</a>
  </div>
</template>
