<script setup lang="ts">
const props = defineProps<{ id: string, title: string, autoplay?: boolean }>()

const media = useVideoMedia()
const video = useTemplateRef<HTMLVideoElement>('video')
const started = ref(props.autoplay ?? false)

function play() {
  started.value = true
  video.value?.play()
}

defineExpose({ play })
</script>

<template>
  <div class="relative aspect-video overflow-hidden rounded-xl bg-black ring ring-default shadow-2xl shadow-primary/10">
    <video
      ref="video"
      class="size-full"
      :poster="media.poster(id)"
      :controls="started"
      :autoplay="autoplay"
      :aria-label="title"
      preload="metadata"
      playsinline
      @play="started = true"
    >
      <source
        :src="media.sd(id)"
        type="video/mp4"
        media="(max-width: 768px)"
      >
      <source
        :src="media.hd(id)"
        type="video/mp4"
      >
    </video>
    <button
      v-if="!started"
      type="button"
      class="group absolute inset-0 flex items-center justify-center bg-black/25 transition hover:bg-black/10"
      :aria-label="`Смотреть: ${title}`"
      @click="play"
    >
      <span class="flex size-20 items-center justify-center rounded-full bg-primary text-inverted shadow-lg shadow-primary/40 transition group-hover:scale-110 sm:size-24">
        <UIcon
          name="i-lucide-play"
          class="ms-1 size-9 sm:size-11"
        />
      </span>
    </button>
  </div>
</template>
