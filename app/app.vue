<script setup lang="ts">
const siteUrl = useRuntimeConfig().public.siteUrl

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'theme-color', content: '#0a0a0a' }
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
  ]
})

const title = 'StreamsPanel — видео-презентация'
const description = 'Донаты и топ донатеров, расписание и постер недели, вишлист и магазин, виджеты для OBS и ИИ-ассистент в одной панели для стримеров.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <UApp>
    <UHeader
      :toggle="false"
      :ui="{ container: 'max-w-7xl' }"
    >
      <template #left>
        <NuxtLink
          :to="siteUrl"
          target="_blank"
          class="focus-visible:outline-3 outline-primary/25 rounded-md p-1 -ms-1"
        >
          <AppLogo />
        </NuxtLink>
      </template>

      <template #right>
        <UButton
          :to="siteUrl"
          target="_blank"
          label="Попробовать бесплатно"
          trailing-icon="i-lucide-arrow-up-right"
          size="sm"
          class="hidden sm:inline-flex"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          © {{ new Date().getFullYear() }} StreamsPanel
        </p>
      </template>

      <template #right>
        <UButton
          :to="siteUrl"
          target="_blank"
          label="streams-panel.ru"
          trailing-icon="i-lucide-arrow-up-right"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>
