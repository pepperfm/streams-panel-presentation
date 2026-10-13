export interface PresentationVideo {
  id: string
  title: string
  description: string
  /** seconds */
  duration: number
  preview?: boolean
}

/** Hero: «Спроси свою панель» (files keep the bylo-stalo-* names). */
export const hero: PresentationVideo = {
  id: 'bylo-stalo',
  title: 'Спроси свою панель',
  description: 'AI-ассистент отвечает по твоим данным и сам создаёт игры, стримы в расписании и виджеты — просто напиши ему.',
  duration: 34
}

/** Second block under the hero: «Один вопрос». */
export const oneQuestion: PresentationVideo = {
  id: 'odin-vopros',
  title: 'Один вопрос',
  description: 'Спросите панель про донаты — и попросите неоновый виджет.',
  duration: 26.77
}

export const chapters: PresentationVideo[] = [
  { id: 'claude-20261013/01-profile', title: 'Вход и профиль', duration: 16, preview: true,
    description: 'Вход через DonationAlerts, дополнительные источники донатов и публичная страница стримера.' },
  { id: 'claude-20261013/02-schedule', title: 'Расписание и постер', duration: 16, preview: true,
    description: 'Собери неделю эфиров, подготовь постер и покажи расписание зрителям.' },
  { id: 'claude-20261013/03-music', title: 'Музыка и Player', duration: 20, preview: true,
    description: 'Заявки зрителей попадают в очередь, а отдельное приложение StreamsPanel Player воспроизводит треки.' },
  { id: 'claude-20261013/04-obs', title: 'OBS и оформление', duration: 16, preview: true,
    description: 'Добавь виджет ссылкой в OBS, проверь оформление и примени выбранный стиль.' },
  { id: 'claude-20261013/05-assistant', title: 'ИИ-ассистент', duration: 12, preview: true,
    description: 'Опиши задачу словами: ассистент подготовит изменение и дождётся твоего подтверждения.' }
]
