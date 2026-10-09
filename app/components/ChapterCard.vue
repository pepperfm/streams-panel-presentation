<script setup lang="ts">
import type { PresentationVideo } from '~/data/videos'

const props = defineProps<{ chapter: PresentationVideo, index: number }>()
defineEmits<{ open: [] }>()

const media = useVideoMedia()
const preview = media.preview(props.chapter.id)
const hovered = ref(false)
</script>

<template>
  <UPageCard
    :title="chapter.title"
    :description="chapter.description"
    variant="subtle"
    spotlight
    class="cursor-pointer"
    :ui="{ container: 'p-3 sm:p-3 gap-y-3', wrapper: 'px-2 pb-2', header: 'mb-0', title: 'text-lg' }"
    @click="$emit('open')"
    @pointerenter="hovered = $event.pointerType === 'mouse'"
    @pointerleave="hovered = false"
  >
    <template #header>
      <div class="relative aspect-video overflow-hidden rounded-md bg-black">
        <img
          :src="media.poster(chapter.id)"
          :alt="chapter.title"
          loading="lazy"
          class="size-full object-cover"
        >
        <video
          v-if="hovered && chapter.preview"
          class="absolute inset-0 size-full object-cover"
          autoplay
          muted
          loop
          playsinline
          preload="none"
        >
          <source
            :src="preview.webm"
            type="video/webm"
          >
          <source
            :src="preview.mp4"
            type="video/mp4"
          >
        </video>
        <div class="absolute inset-x-2 bottom-2 flex items-center justify-between">
          <UBadge
            :label="`Глава ${index + 1}`"
            color="neutral"
            variant="solid"
            size="sm"
          />
          <UBadge
            :label="formatDuration(chapter.duration)"
            icon="i-lucide-play"
            color="primary"
            variant="solid"
            size="sm"
          />
        </div>
      </div>
    </template>
  </UPageCard>
</template>
