---
theme: default
title: Streams Panel
titleTemplate: '%s'
info: Презентация продукта Streams Panel
author: Streams Panel
lang: ru
colorSchema: light
transition: fade
aspectRatio: 16/9
canvasWidth: 1920
highlighter: shiki
monaco: false
twoslash: false
selectable: true
download: false
exportFilename: streams-panel
favicon: /favicon.svg
clickAnimation: up
htmlAttrs:
  lang: ru
fonts:
  sans: Inter Variable
  provider: none
layout: cover
hero: true
kicker: ПРЕЗЕНТАЦИЯ ПРОДУКТА
subtitle: |
  Подготовь стрим и управляй им из одной панели.
  Расписание, постеры, страница для зрителей и заказ музыки.
website: streams-panel.ru
---

---
layout: content
variant: stack
kicker: ЧТО ЭТО И ДЛЯ КОГО
title: Одна панель для стримера и его зрителей
lead: Личная панель для подготовки эфиров и публичная страница для зрителей
footnote: "Для кого: стримеры на Twitch. Донаты — из DonationAlerts, DonateX и DonatePay"
---

<CardGrid :columns="3">
  <div v-click class="sp-reveal">
    <Card title="До эфира" text="Расписание, очередь событий и постер недели для анонса" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Для зрителей" text="Одна ссылка: расписание, топ донатеров, события и витрина" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="На стриме" text="Заказ треков из Яндекс Музыки и виджеты для сцены в OBS" />
  </div>
</CardGrid>

---
layout: content
variant: split
kicker: ВОЗМОЖНОСТИ · ПОДГОТОВКА ЭФИРОВ
title: Расписание и очередь событий
---

<CardGrid stretch>
  <div v-click class="sp-reveal">
    <Card title="Эфиры по дням и времени" text="Дата, время и событие — в вашем часовом поясе" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Очередь событий" text="Статусы, комментарии, YouTube-клипы и «Точно будет»" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Быстрое событие" text="Новое событие создаётся прямо из формы эфира" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Видно зрителям" text="Расписание и события с фильтрами на вашей странице" />
  </div>
</CardGrid>

<Shot caption="Скриншот: расписание в панели" />

---
layout: content
variant: split
kicker: ВОЗМОЖНОСТИ · АНОНСЫ
title: Постер недели и AI-обложки
---

<CardGrid stretch>
  <div v-click class="sp-reveal">
    <Card title="Постер из расписания" text="Эфиры текущей или следующей недели на одной картинке" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Своё оформление" text="Шаблон, шрифт, заголовки и ваш арт или логотип" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="AI-обложка" text="Арт по описанию, референсу и стилевым тегам" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Готово к публикации" text="Экспорт PNG или копирование в буфер для анонса" />
  </div>
</CardGrid>

<Shot caption="Скриншот: редактор постера недели" />

---
layout: content
variant: split
kicker: ВОЗМОЖНОСТИ · СТРАНИЦА ДЛЯ ЗРИТЕЛЕЙ
title: Публичная страница стримера
---

<CardGrid stretch>
  <div v-click class="sp-reveal">
    <Card title="Всё по одной ссылке" text="Профиль, топ донатеров, расписание, события и витрина" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Статус «В эфире»" text="После подключения Twitch зрители видят, идёт ли стрим" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Своё оформление" text="Палитра, фон, шрифт и макет каждого блока" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Био и свои кнопки" text="Описание, соцсети и внешние ссылки, например Boosty" />
  </div>
</CardGrid>

<Shot caption="Скриншот: публичная страница стримера" />

---
layout: content
variant: split
kicker: ВОЗМОЖНОСТИ · ВИТРИНА
title: Товары, услуги и вишлист
---

<CardGrid stretch>
  <div v-click class="sp-reveal">
    <Card title="Товары" text="Мерч и цифровые товары: фото, цена и ссылка" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Услуги" text="Форматы на заказ: что входит, цена и кнопка для связи" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Вишлист" text="Цели с суммой, собранным и прогрессом сбора" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Показ по переключателю" text="Раздел появляется на странице, когда он включён" />
  </div>
</CardGrid>

<Shot caption="Скриншот: товары и вишлист на публичной странице" />

---
layout: content
variant: split
kicker: ВОЗМОЖНОСТИ · ДОНАТЫ
title: Донаты и топ донатеров
---

<CardGrid stretch>
  <div v-click class="sp-reveal">
    <Card title="Вход через DonationAlerts" text="Доступ только на чтение, донаты подтягиваются сразу" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="DonateX и DonatePay" text="В профиле: вход в DonateX или API-ключ DonatePay" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Топ и последние донаты" text="Период, число мест и сервисы, которые учитываются" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Контроль синхронизации" text="Ручное обновление и дозагрузка сбойных страниц" />
  </div>
</CardGrid>

<Shot caption="Скриншот: страница донатов" />

---
layout: content
variant: split
kicker: ВОЗМОЖНОСТИ · НА СТРИМЕ
title: Заказ музыки из Яндекс Музыки
---

<CardGrid stretch>
  <div v-click class="sp-reveal">
    <Card title="Заявки от зрителей" text="Через донат DonationAlerts или баллы канала Twitch" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Очередь под контролем" text="Пропуск, удаление и очистка очереди из панели" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Свои правила" text="Мин. сумма доната, лимит очереди и кулдаун" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Треки, альбомы, плейлисты" text="Режим «только треки» и автопропуск при ошибке" />
  </div>
</CardGrid>

<Shot caption="Скриншот: очередь треков в панели" />

---
layout: content
variant: split
kicker: ВОЗМОЖНОСТИ · НА СТРИМЕ
title: StreamsPanel Player
---

<CardGrid stretch>
  <div v-click class="sp-reveal">
    <Card title="Отдельное приложение" text="Windows 10/11, не зависит от вкладки браузера" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Привязка по PIN" text="Одноразовый код на 120 секунд, доступ можно отозвать" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Управление в Player" text="Пауза, пропуск, громкость и порядок заявок" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Проверка и устройства" text="Тестовый трек, статус и версия устройств в панели" />
  </div>
</CardGrid>

<Shot caption="Скриншот: окно StreamsPanel Player" />

---
layout: content
variant: split
kicker: ВОЗМОЖНОСТИ · OBS
title: Виджеты для стрима
---

<CardGrid stretch>
  <div v-click class="sp-reveal">
    <Card title="Топ донатеров" text="Три пресета, от 3 до 20 мест, светлая или тёмная тема" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Бегущая строка" text="Текст до 500 символов и три скорости движения" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Чат Twitch" text="Бейджи, эмоуты, 7TV, модерация и стили ролей" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="События и музыка" text="Алерты Twitch, «Сейчас играет» и очередь треков" />
  </div>
</CardGrid>

<Shot caption="Скриншот: список виджетов" />

---
layout: content
variant: split
kicker: ВОЗМОЖНОСТИ · OBS
title: Настройка и публикация виджетов
---

<CardGrid stretch>
  <div v-click class="sp-reveal">
    <Card title="Живое превью" text="Виджет выглядит так же, как будет в OBS" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Черновик и публикация" text="Чат и события публикуются ревизиями из черновика" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Смена ссылки" text="Старая OBS-ссылка сразу перестаёт работать" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Анимации и звук" text="Анимации появления и звуковые пресеты алертов" />
  </div>
</CardGrid>

<Shot caption="Скриншот: редактор виджета чата с превью" />

---
layout: content
variant: split
kicker: ВОЗМОЖНОСТИ · TELEGRAM
title: Уведомления в Telegram
---

<CardGrid stretch>
  <div v-click class="sp-reveal">
    <Card title="Бот для каналов и групп" text="Добавьте бота — он привяжет канал или группу к профилю" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Анонс нового эфира" text="Сообщение по шаблону с датой и временем стрима" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Начало стрима на Twitch" text="Уведомление уходит, когда Twitch сообщает о старте" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Проверка в личке" text="Пример уведомления приходит вам в личные сообщения" />
  </div>
</CardGrid>

<Shot caption="Скриншот: настройки Telegram в профиле панели" />

---
layout: content
variant: split
kicker: ВОЗМОЖНОСТИ · AI-АССИСТЕНТ
title: AI-ассистент и отчёты
---

<CardGrid stretch>
  <div v-click class="sp-reveal">
    <Card title="Помощь по разделу" text="Учитывает текущий экран и выбранные объекты" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Статистика по запросу" text="Донаты за период и динамика стримов" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Сохранённые отчёты" text="Шаблоны запросов: запуск вручную или еженедельно" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Режимы и оценки" text="Справка, статистика, диагностика; оценка ответов" />
  </div>
</CardGrid>

<Shot caption="Скриншот: чат ассистента и страница отчётов" />

---
layout: content
variant: fill
kicker: ВОЗМОЖНОСТИ · ЕЩЁ В ПАНЕЛИ
title: Дашборд, подписка и обновления
---

<CardGrid :columns="2" stretch>
  <div v-click class="sp-reveal">
    <Card title="Дашборд" text="Ближайшие эфиры, очередь событий и топ донатов на одном экране" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Подписка" text="Статус, история платежей и отключение автопродления в биллинге" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Что нового" text="Страница обновлений и уведомления о новых релизах" />
  </div>
  <div v-click class="sp-reveal">
    <Card title="Русский и английский" text="Интерфейс переключается между RU и EN" />
  </div>
</CardGrid>

---
layout: content
variant: stack
kicker: КАК НАЧАТЬ
title: От подключения до первого расписания
footnote: |
  По желанию: установите StreamsPanel Player для заказа музыки и добавьте виджеты в OBS.
  Подсказки — во встроенном туре по панели; на сайте есть гайды и AI-помощник.
---

<CardGrid :columns="4">
  <div v-click class="sp-reveal">
    <Card index="01" text="Войдите через DonationAlerts. Страница и топ донатеров — бесплатно" />
  </div>
  <div v-click class="sp-reveal">
    <Card index="02" text="Подключите в профиле DonateX или DonatePay, если принимаете донаты там" />
  </div>
  <div v-click class="sp-reveal">
    <Card index="03" text="Включите панель: 7 дней пробного «Старт» или платный план" />
  </div>
  <div v-click class="sp-reveal">
    <Card index="04" text="Добавьте эфиры, соберите постер и поставьте ссылку в описание канала" />
  </div>
</CardGrid>

---
layout: cover
title: Подготовь следующий эфир вместе со StreamsPanel
subtitle: Новым аккаунтам — 7 дней пробного доступа к панели «Старт»
website: streams-panel.ru
---
