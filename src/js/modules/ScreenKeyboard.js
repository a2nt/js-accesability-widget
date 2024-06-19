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

    this.active = true
  }

  destroy() {
    this.active = false
    document.removeEventListener('click', ScreenKeyboard.show)
  }


  static update() {
    document.querySelectorAll('input,textarea').forEach((el) => {
      if (el.dataset.keyboard_enabled) {
        return
      }

      el.addEventListener('focus', ScreenKeyboard.show)
      el.addEventListener('focusout', (e) => {
        if (!e.explicitOriginalTarget.classList.contains('hg-button')) {
          ScreenKeyboard.hide()
        }
      })
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
