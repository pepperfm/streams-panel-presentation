<script setup lang="ts">
import { computed } from 'vue'

defineOptions({ inheritAttrs: false })

const props = defineProps<{
  kicker?: string
  headline?: string
  lead?: string
  footnote?: string
  variant?: 'split' | 'stack' | 'fill'
}>()

const note = computed(() => props.footnote?.trim() ?? '')
const leadText = computed(() => props.lead?.trim() ?? '')
</script>

<template>
  <div class="slidev-layout sp-slide" :class="`is-${variant || 'stack'}`">
    <header class="sp-head">
      <div v-if="kicker" class="sp-kicker">{{ kicker }}</div>
      <h1 class="sp-title">{{ headline }}</h1>
      <div v-if="leadText" class="sp-lead">{{ leadText }}</div>
    </header>
    <div class="sp-body" :class="{ 'is-split': variant === 'split' }">
      <slot />
    </div>
    <div v-if="note" class="sp-note">{{ note }}</div>
  </div>
</template>
