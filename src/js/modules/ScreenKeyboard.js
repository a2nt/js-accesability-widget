import Keyboard from 'simple-keyboard'
import 'simple-keyboard/build/css/index.css'

class ScreenKeyboard {
  active = false
  static #keyboard
  static #keyboardContainer

  constructor() {
    if (this.active) {
      return
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
      el.addEventListener('focusout', ScreenKeyboard.hide)
      el.dataset.keyboard_enabled = true
    })
  }

  static show(e) {
    const el = e.target

    if (!ScreenKeyboard.#keyboard) {
      ScreenKeyboard.#keyboard = new Keyboard({
        input: el,
      })
    } else {
      ScreenKeyboard.#keyboard.setInput(el)
    }

    ScreenKeyboard.#keyboardContainer.style.display = 'block'
  }

  static hide(e) {
    const el = e.target

    ScreenKeyboard.#keyboardContainer.style.display = 'none'
  }
}

export default ScreenKeyboard
