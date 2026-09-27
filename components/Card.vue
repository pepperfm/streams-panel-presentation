<script setup lang="ts">
defineProps<{
  title?: string
  text?: string
  index?: string
}>()
</script>

<template>
  <article class="sp-card" :class="{ 'is-step': Boolean(index) }">
    <div v-if="index" class="sp-card__index">{{ index }}</div>
    <div v-if="title" class="sp-card__title">{{ title }}</div>
    <div v-if="text" class="sp-card__text">{{ text }}</div>
    <slot />
  </article>
</template>
