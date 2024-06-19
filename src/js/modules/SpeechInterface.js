class SpeechInterface {
  active = false
  static #voice

  constructor() {
    if (this.active) {
      return this
    }

    const voices = window.speechSynthesis.getVoices()
    const lang = document.documentElement.lang.slice(0, 2)
    const sex = 'fem'
    let langNum = 0

    const availableVoices = []

    voices.forEach((el) => {
      if (el.lang.includes(lang) && el.name.includes(sex)) {
        availableVoices.push(el)
      }
    })

    if (lang === 'en' && availableVoices.length > 2) {
      langNum = 1
    }

    if (typeof availableVoices[langNum] !== 'undefined') {
      SpeechInterface.#voice = availableVoices[langNum]
      console.log(`Found voice: ${availableVoices[langNum].name}`)
    }

    document.addEventListener('click', SpeechInterface.speakEvent)

    // speak links on Tab
    document.querySelectorAll('a,button').forEach((el) => el.addEventListener('focus', SpeechInterface.speakEvent))

    this.active = true
  }

  destroy() {
    this.active = false

    window.speechSynthesis.cancel()
    document.removeEventListener('click', SpeechInterface.speakEvent)
    document.querySelectorAll('a,button').forEach((el) => el.removeEventListener('focus', SpeechInterface.speakEvent))
  }

  static speakEvent(e) {
    SpeechInterface.speak(e.target.innerText)
  }

  static speak(text) {
    window.speechSynthesis.cancel()

    const utr = new SpeechSynthesisUtterance(text)
    utr.rate = 1
    if (SpeechInterface.#voice) {
      utr.voice = SpeechInterface.#voice
    }


    window.speechSynthesis.speak(utr)
  }
}

export default SpeechInterface
