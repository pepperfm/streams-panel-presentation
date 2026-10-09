// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui'
  ],

  devtools: {
    enabled: true
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ru' }
    }
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'dark',
    fallback: 'dark'
  },

  runtimeConfig: {
    public: {
      // default: files in public/videos served by Nuxt; NUXT_PUBLIC_VIDEO_BASE_URL can point to a CDN later
      videoBaseUrl: '/videos',
      // Product CTA. This is not the canonical URL of the presentation page.
      siteUrl: 'https://streams-panel.ru',
      // Canonical origin of this page. Tags always add one trailing slash.
      // Override: NUXT_PUBLIC_PRESENTATION_URL. public/robots.txt and public/sitemap.xml stay on the production origin.
      presentationUrl: 'https://presentation.streams-panel.ru',
      // Yandex Webmaster verification slot. Set NUXT_PUBLIC_YANDEX_VERIFICATION to the code when it is issued.
      // Empty or whitespace renders no <meta name="yandex-verification">.
      yandexVerification: ''
    }
  },

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  icon: {
    clientBundle: {
      scan: true
    }
  }
})
