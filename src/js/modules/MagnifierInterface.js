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
      width: 304,
      height: 171,
    })

    MagnifierInterface.#magnifier.on('syncScrollBars', (magnifierContent) => {
      magnifierContent.parentElement.scrollTop = document.scrollingElement.scrollTop
      magnifierContent.parentElement.scrollLeft = document.scrollingElement.scrollLeft
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
