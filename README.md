# Streams Panel — презентация

Презентация продукта [Streams Panel](https://streams-panel.ru): 16 слайдов на [Slidev](https://sli.dev). Текст совпадает с утверждённым черновиком.

## Требования

[Bun](https://bun.sh).

## Запуск

```bash
bun install
bun run dev
```

Локальный сервер откроет колоду. Клавиша пробела показывает следующий слайд или следующую карточку.

## Сборка

```bash
bun run build
```

Статический SPA собирается в каталог `dist/`.

## Экспорт в PDF

```bash
bun run export
```

Файл появится как `streams-panel.pdf` в корне репозитория. Для картинок каждого слайда:

```bash
bunx slidev export --format png --output slides-png
```

## Как добавить скриншот

Положите файл в `public/screens/` и укажите путь в компоненте `Shot`. Если `src` не задан, остаётся светло-фиолетовая рамка с подписью.

```html
<Shot src="/screens/schedule.png" caption="Скриншот: расписание в панели" />
```
