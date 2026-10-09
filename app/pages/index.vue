<script setup lang="ts">
import type { PresentationVideo } from '~/data/videos'
import { chapters, hero, teaser, trailer } from '~/data/videos'

const siteUrl = useRuntimeConfig().public.siteUrl
const media = useVideoMedia()
const heroPlayer = useTemplateRef<{ play: () => void }>('heroPlayer')

/** Modal player: a playlist (chapters or the single teaser) and the current index. */
const playlist = shallowRef<PresentationVideo[]>([])
const current = ref<number | null>(null)
const open = computed({
  get: () => current.value !== null,
  set: (value: boolean) => {
    if (!value) current.value = null
  }
})
const video = computed(() => (current.value === null ? null : playlist.value[current.value]))
const isChapters = computed(() => playlist.value === chapters)
const modalTitle = computed(() => {
  if (!video.value) return ''
  return isChapters.value ? `Глава ${(current.value ?? 0) + 1}. ${video.value.title}` : video.value.title
})

function play(list: PresentationVideo[], index = 0) {
  playlist.value = list
  current.value = index
}

function step(delta: number) {
  if (current.value === null) return
  current.value = Math.min(playlist.value.length - 1, Math.max(0, current.value + delta))
}

function watchHero() {
  document.getElementById('hero-video')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  heroPlayer.value?.play()
}

const tryLink = { label: 'Попробовать бесплатно', to: siteUrl, target: '_blank', trailingIcon: 'i-lucide-arrow-up-right' }
</script>

<template>
  <div>
    <UPageHero
      title="Всё для стримера — в одной панели"
      description="Донаты и топ донатеров, расписание и постер недели, вишлист и магазин, виджеты для OBS и ИИ-ассистент. Вход через DonationAlerts, а DonateX и DonatePay можно подключить позже."
      :links="[
        { ...tryLink, size: 'xl' },
        { label: 'Смотреть видео', icon: 'i-lucide-play', size: 'xl', color: 'neutral', variant: 'subtle', onClick: watchHero }
      ]"
      :ui="{ container: 'py-16 sm:py-20 lg:py-24 gap-10 sm:gap-y-14', title: 'text-4xl sm:text-6xl text-balance', description: 'max-w-3xl mx-auto text-balance' }"
    >
      <template #headline>
        <UBadge
          label="Видео-презентация"
          icon="i-lucide-clapperboard"
          variant="subtle"
          size="lg"
        />
      </template>

      <div
        id="hero-video"
        class="mx-auto w-full max-w-5xl"
      >
        <VideoPlayer
          :id="hero.id"
          ref="heroPlayer"
          :title="hero.title"
        />
        <div class="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p class="text-sm text-muted">
            {{ hero.title }} · {{ formatDuration(hero.duration) }}
          </p>
          <UButton
            color="neutral"
            variant="ghost"
            :aria-label="`Смотреть: ${teaser.title}`"
            class="gap-3 p-1.5 pe-3"
            @click="play([teaser])"
          >
            <img
              :src="media.poster(teaser.id)"
              alt=""
              class="aspect-video w-20 rounded object-cover ring ring-default"
            >
            <span class="text-start">
              <span class="block text-sm font-medium text-highlighted">Ещё видео: «{{ teaser.title }}»</span>
              <span class="block text-xs text-muted">{{ teaser.description }} · {{ formatDuration(teaser.duration) }}</span>
            </span>
          </UButton>
        </div>
      </div>
    </UPageHero>

    <UPageSection
      id="trailer"
      headline="Обзор"
      :title="trailer.title"
      :description="trailer.description"
      :ui="{ container: 'py-12 sm:py-16 lg:py-20' }"
    >
      <div class="mx-auto w-full max-w-5xl">
        <VideoPlayer
          :id="trailer.id"
          :title="trailer.title"
        />
      </div>
    </UPageSection>

    <UPageSection
      id="chapters"
      headline="По главам"
      title="Пять коротких видео"
      description="Каждая глава — один сценарий от начала до результата."
      :ui="{ container: 'py-12 sm:py-16 lg:py-20' }"
    >
      <UPageGrid class="lg:grid-cols-6">
        <ChapterCard
          v-for="(item, index) in chapters"
          :key="item.id"
          :chapter="item"
          :index="index"
          :class="index < 2 ? 'lg:col-span-3' : 'lg:col-span-2 last:sm:max-lg:col-span-2'"
          @open="play(chapters, index)"
        />
      </UPageGrid>
    </UPageSection>

    <UPageSection :ui="{ container: 'pt-0 sm:pt-0 lg:pt-0' }">
      <UPageCTA
        title="Готовы попробовать?"
        description="Войдите через DonationAlerts — панель и публичная страница будут готовы сразу."
        variant="subtle"
        :links="[{ ...tryLink, size: 'xl' }]"
      />
    </UPageSection>

    <UModal
      v-model:open="open"
      :title="modalTitle"
      :description="video?.description"
      :ui="{ content: 'sm:max-w-[min(64rem,calc((100dvh-11rem)*16/9))]', body: 'p-0 sm:p-0', footer: 'justify-between' }"
    >
      <template #body>
        <VideoPlayer
          v-if="video"
          :id="video.id"
          :key="video.id"
          :title="video.title"
          autoplay
          class="rounded-none shadow-none ring-0"
        />
      </template>
      <template
        v-if="isChapters"
        #footer
      >
        <UButton
          label="Предыдущая"
          icon="i-lucide-chevron-left"
          color="neutral"
          variant="ghost"
          :disabled="!current"
          @click="step(-1)"
        />
        <UButton
          label="Следующая"
          trailing-icon="i-lucide-chevron-right"
          color="neutral"
          variant="ghost"
          :disabled="current === playlist.length - 1"
          @click="step(1)"
        />
      </template>
    </UModal>
  </div>
</template>
