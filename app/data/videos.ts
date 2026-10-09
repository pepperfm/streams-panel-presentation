export interface PresentationVideo {
  id: string
  title: string
  description: string
  /** seconds */
  duration: number
  preview?: boolean
}

/** Hero: «Было → Стало» (before/after wipe edit). */
export const hero: PresentationVideo = {
  id: 'bylo-stalo',
  title: 'Было → Стало',
  description: 'Таблицы, вкладки, заметки и оверлеи — теперь в одной панели.',
  duration: 30.13
}

/** Second block under the hero: «Один вопрос». */
export const oneQuestion: PresentationVideo = {
  id: 'odin-vopros',
  title: 'Один вопрос',
  description: 'Спросите панель про донаты — и попросите неоновый виджет.',
  duration: 26.77
}

export const chapters: PresentationVideo[] = [
  { id: '01-vhod-i-profil', title: 'Вход и профиль', duration: 28.13, preview: true,
    description: 'Вход через DonationAlerts в пару кликов — и публичная страница стримера уже готова.' },
  { id: '02-panel', title: 'Панель за минуту', duration: 49.17, preview: true,
    description: 'Расписание, постер недели, вишлист и события — всё в одной панели.' },
  { id: '03-assistant', title: 'ИИ-ассистент', duration: 38.1, preview: true,
    description: 'Спросите про донаты или попросите добавить цель — ассистент предложит, вы подтвердите.' },
  { id: '04-widget', title: 'Виджеты для OBS', duration: 28.63, preview: true,
    description: 'Опишите виджет словами — получите живое превью и готовую ссылку для OBS.' },
  { id: '05-style', title: 'Оформление страницы', duration: 51.4, preview: true,
    description: 'Опишите стиль — ИИ подготовит оформление, вы проверите и примените.' }
]
