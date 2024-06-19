import Keyboard from 'simple-keyboard'
import 'simple-keyboard/build/css/index.css'

class ScreenKeyboard {
  active = false
  static #keyboard
  static #keyboardContainer
  static #curInput

  constructor() {
    if (this.active) {
      return this
    }

    ScreenKeyboard.#keyboardContainer = document.createElement('div')
    ScreenKeyboard.#keyboardContainer.classList.add('asw-keyboard')
    ScreenKeyboard.#keyboardContainer.style.display = 'none'

    const el = document.createElement('div')
    el.classList.add('simple-keyboard')
    ScreenKeyboard.#keyboardContainer.appendChild(el)

    document.body.appendChild(ScreenKeyboard.#keyboardContainer)
    ScreenKeyboard.update()

    document.addEventListener('click', ScreenKeyboard.hideEvent)

    this.active = true
  }

  destroy() {
    this.active = false
    document.querySelectorAll('input,textarea').forEach((el) => {
      el.removeEventListener('focus', ScreenKeyboard.show)
      el.removeEventListener('focusout', ScreenKeyboard.hideEvent)
    })

    document.removeEventListener('click', ScreenKeyboard.hideEvent)
  }

  static hideEvent(e) {
    const showTags = [
      'input', 'textarea',
    ]
    const target = e.relatedTarget || e.explicitOriginalTarget || e.target
    if (
      target && target.tagName && !showTags.includes(target.tagName.toLowerCase())
            && target.classList && !target.classList.contains('hg-button')
    ) {
      ScreenKeyboard.hide()
    }
  }

  static update() {
    document.querySelectorAll('input,textarea').forEach((el) => {
      if (el.dataset.keyboard_enabled) {
        return
      }

      el.addEventListener('focus', ScreenKeyboard.show)

      el.addEventListener('focusout', ScreenKeyboard.hideEvent)

      el.addEventListener('change', (e) => {
        if (ScreenKeyboard.#keyboard) {
          ScreenKeyboard.#keyboard.setInput(e.currentTarget.value)
        }
      })

      el.dataset.keyboard_enabled = true
    })
  }

  static show(e) {
    const el = e.target
    ScreenKeyboard.#curInput = el

    if (!ScreenKeyboard.#keyboard) {
      const onChange = (val) => {
        ScreenKeyboard.#curInput.value = val
      }

      const onKeyPress = (button) => {
        if (button === "{shift}" || button === "{lock}") {
          const currentLayout = ScreenKeyboard.#keyboard.options.layoutName;
          const shiftToggle = currentLayout === "default" ? "shift" : "default";

          ScreenKeyboard.#keyboard.setOptions({
            layoutName: shiftToggle,
          })
        }
      }

      ScreenKeyboard.#keyboard = new Keyboard({
        onChange: (val) => onChange(val),
        onKeyPress: (button) => onKeyPress(button),
      })
    }

    ScreenKeyboard.#keyboard.setInput(el.value)
    ScreenKeyboard.#keyboardContainer.style.display = 'block'
  }

  static hide() {
    ScreenKeyboard.#keyboardContainer.style.display = 'none'
  }
}

export default ScreenKeyboard
