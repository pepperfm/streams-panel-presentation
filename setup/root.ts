import { useDrawings, useNav } from '@slidev/client'
// The production bundler resolves this module only with the .ts extension.
import { showOverview } from '@slidev/client/state/storage.ts'
import { defineRootSetup } from '@slidev/types'
import { onMounted, onUnmounted } from 'vue'

/**
 * Click targets that must keep their own behavior (links, form controls, etc.).
 */
const INTERACTIVE_SELECTOR = [
  'a',
  'button',
  'input',
  'textarea',
  'select',
  'label',
  '[role="button"]',
  '[contenteditable]',
  'iframe',
  'video',
  'audio',
].join(',')

/**
 * Slidev 53 chrome. Selectors come from the installed client:
 * - `nav` and the play-mode controls slot (`#slide-container > .absolute`) — NavControls
 * - `#slidev-goto-dialog` — Goto.vue
 * - `.z-modal` — QuickOverview and Modal (info / recording)
 * - `.slidev-info-dialog` — InfoDialog.vue
 * - `.z-context-menu` — ContextMenu.vue
 * - `.z-menu` — MenuButton.vue
 * - `.z-nav` — drawing toolbar (DrawingControls via Draggable) and drag handles
 * - `.recording-dialog` — RecordingDialog.vue
 * - `.slidev-presenter` — presenter view
 */
const SLIDEV_UI_SELECTOR = [
  'nav',
  '#slide-container > .absolute',
  '#slidev-goto-dialog',
  '.slidev-info-dialog',
  '.z-context-menu',
  '.z-modal',
  '.z-menu',
  '.z-nav',
  '.recording-dialog',
  '.slidev-presenter',
].join(',')

function eventTargetElement(target: EventTarget | null) {
  if (target instanceof Element)
    return target
  if (target instanceof Node)
    return target.parentElement
  return null
}

function isModifiedClick(event: MouseEvent) {
  return event.button !== 0
    || event.altKey
    || event.ctrlKey
    || event.metaKey
    || event.shiftKey
}

function hasTextSelection() {
  const selection = window.getSelection()
  return !!selection && !selection.isCollapsed && selection.toString().length > 0
}

function shouldIgnoreTarget(target: EventTarget | null) {
  const element = eventTargetElement(target)
  if (!element)
    return true
  if (element.closest(INTERACTIVE_SELECTOR))
    return true
  if (element.closest(SLIDEV_UI_SELECTOR))
    return true
  // Play canvas only. Skips the dev editor and overlays portaled outside the slide.
  return !element.closest('#slide-container')
}

export default defineRootSetup(() => {
  const { next, isPlaying, isPresenter, isPrintMode } = useNav()
  const { drawingEnabled } = useDrawings()

  // Timestamp of the primary mouse press that may become a click.
  let armedAt = 0

  function inPlayMode() {
    return isPlaying.value
      && !isPresenter.value
      && !isPrintMode.value
      && !showOverview.value
      && !drawingEnabled.value
  }

  function onPointerDown(event: PointerEvent) {
    const primaryMouse = event.pointerType === 'mouse' && event.button === 0
    // Selection is still intact on pointerdown; a later click often clears it.
    armedAt = primaryMouse && !isModifiedClick(event) && !hasTextSelection() ? performance.now() : 0
    if (!primaryMouse || !inPlayMode())
      return

    // play.vue also navigates on pointerdown when the target is #slide-container
    // (left half prev, right half next). Stop that so the click is handled once, as next().
    const element = eventTargetElement(event.target)
    if (element?.id === 'slide-container')
      event.stopPropagation()
  }

  function onClick(event: MouseEvent) {
    const armed = armedAt > 0 && performance.now() - armedAt < 1000
    armedAt = 0
    if (!armed || !inPlayMode() || isModifiedClick(event) || hasTextSelection() || shouldIgnoreTarget(event.target))
      return

    void next()
  }

  onMounted(() => {
    window.addEventListener('pointerdown', onPointerDown, true)
    window.addEventListener('click', onClick)
  })

  onUnmounted(() => {
    window.removeEventListener('pointerdown', onPointerDown, true)
    window.removeEventListener('click', onClick)
  })
})
