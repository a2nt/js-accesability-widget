class SpeechInterface {
  active = false

  constructor() {
    if (this.active) {
      return this
    }

    document.addEventListener('click', SpeechInterface.speakEvent)
    this.active = true
  }

  destroy() {
    this.active = false

    window.speechSynthesis.cancel()
    document.removeEventListener('click', SpeechInterface.speakEvent)
  }

  static speakEvent(e) {
    SpeechInterface.speak(e.target.innerText)
  }

  static speak(text) {
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(text))
  }
}

export default SpeechInterface
