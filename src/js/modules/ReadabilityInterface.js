import Readability from '@mozilla/readability'

class ReadabilityInterface {
  #container
  #hidden = true

  constructor() {
    this.#container = document.getElementById('AsmReadable')

    if (!this.#container) {
      this.#container = document.createElement('div')
      this.#container.setAttribute('id', 'AsmReadable')
      this.#container.classList.add('asm-redable-content')
      this.#container.style.display = 'none'

      document.getElementsByTagName('body')[0].appendChild(this.#container)
    }
  }

  show() {
    if (!this.#container.innerHTML) {
      this.update()
    }

    this.#hidden = false
    this.#container.style.display = 'block'
  }

  update() {
    const documentClone = document.cloneNode(true)

    const article = new Readability.Readability(documentClone).parse()
    this.#container.innerHTML = `<h1>${article.title}</h1>${article.content}`
  }

  hide() {
    this.#hidden = true
    this.#container.style.display = 'none'
  }

  toggle() {
    if (this.#hidden) {
      this.show()
    } else {
      this.hide()
    }
  }
}

export default ReadabilityInterface
