<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  columns?: number | string
  stretch?: boolean
}>(), {
  columns: 1,
  stretch: false,
})

const style = computed(() => ({
  gridTemplateColumns: `repeat(${Number(props.columns) || 1}, minmax(0, 1fr))`,
}))
</script>

<template>
  <div class="sp-grid" :class="{ 'is-stretch': stretch }" :style="style">
    <slot />
  </div>
</template>
