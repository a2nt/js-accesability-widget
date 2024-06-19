import HTMLMagnifier from 'html-magnifier/html-magnifier'

class MagnifierInterface {
  active = false
  static #magnifier
  static #hidden = true

  constructor() {
    if (this.active) {
      return this
    }

    MagnifierInterface.#magnifier = new HTMLMagnifier({
      zoom: 2,
      shape: 'square',
      width: 200,
      height: 200,
    })

    this.active = true
  }

  destroy() {
    this.active = false
    document.querySelectorAll('.magnifier').forEach((el) => {
      el.remove()
    })
  }

  static toggle() {
    if (MagnifierInterface.#hidden) {
      MagnifierInterface.show()
      return
    }

    MagnifierInterface.hide()
  }

  static show() {
    MagnifierInterface.#magnifier.show()
  }

  static hide() {
    MagnifierInterface.#magnifier.hide()
  }
}

export default MagnifierInterface
