import '../scss/app.scss'

import ReadabilityInterface from 'modules/ReadabilityInterface'
import SpeechInterface from 'modules/SpeechInterface'
import ScreenKeyboard from 'modules/ScreenKeyboard'
import MagnifierInterface from 'modules/MagnifierInterface'
import template from './template'

class ASM {
  static toggleMenu() {
    const menu = document.getElementById('aswMenu')

    if (menu.style.display === 'none') {
      menu.style.display = 'block'
    } else {
      menu.style.display = 'none'
    }
  }

  static hideMenu() {
    const menu = document.getElementById('aswMenu')
    menu.style.display = 'none'
  }

  static checkClasslist(classList) {
    const blockedClasses = [
      'material-icons',
      'fa-solid',
      'fa',
      'asw-btn',
      'asw-translate',
    ]

    let allowed = true
    blockedClasses.forEach((cls) => {
      if (classList.contains(cls)) {
        allowed = false
      }
    })

    return allowed
  }

  static adjustFontSize(multiply = 0) {
    const storedPercentage = parseFloat(localStorage.getItem('fontPercentage'));

    if (multiply) {
      if (storedPercentage) {
        const newPercentage = storedPercentage + multiply;
        localStorage.setItem('fontPercentage', newPercentage);
      } else {
        const newPercentage = 1 + multiply;
        localStorage.setItem('fontPercentage', newPercentage);
      }
    }

    document
      .querySelectorAll("*")
      .forEach((el) => {
        if (this.checkClasslist(el.classList)) {
          let orgFontSize = parseFloat(el.getAttribute('data-asw-orgFontSize'));

          if (!orgFontSize) {
            orgFontSize = parseFloat(window.getComputedStyle(el).getPropertyValue('font-size'));
            el.setAttribute('data-asw-orgFontSize', orgFontSize);
          }
          const adjustedFontSize = orgFontSize * (parseFloat(localStorage.getItem('fontPercentage')) || 1);
          el.style['font-size'] = `${adjustedFontSize}px`;
        }
      });
  }

  static adjustLetterSpacing(inc = 0) {
    let isLetterSpacingEnabled = parseInt(localStorage.getItem('isLetterSpacingEnabled'));

    let increment
    if (inc) {
      increment = inc
    } else {
      isLetterSpacingEnabled = !isLetterSpacingEnabled;
      increment = 0.1;
    }

    if (!isLetterSpacingEnabled) {
      document
        .querySelectorAll("*")
        .forEach((el) => {
          if (this.checkClasslist(el.classList)) {
            let orgLetterSpacing = el.getAttribute('data-asw-orgLetterSpacing');

            if (!orgLetterSpacing) {
              orgLetterSpacing = el.style['letter-spacing'];
              el.setAttribute('data-asw-orgLetterSpacing', orgLetterSpacing);
              if (!(orgLetterSpacing)) {
                orgLetterSpacing = 0;
              }
              orgLetterSpacing = parseFloat(orgLetterSpacing);
              const newLetterSpacing = orgLetterSpacing + increment;
              el.style['letter-spacing'] = `${newLetterSpacing}em`;
            }
          }
        });

      localStorage.setItem('isLetterSpacingEnabled', 1);
    } else {
      document
        .querySelectorAll("*")
        .forEach((el) => {
          if (this.checkClasslist(el.classList)) {
            const orgLetterSpacing = el.getAttribute('data-asw-orgLetterSpacing');
            if (orgLetterSpacing) {
              el.style['letter-spacing'] = orgLetterSpacing;
              el.removeAttribute('data-asw-orgLetterSpacing');
            }
            else {
              el.style.removeProperty('letter-spacing');
            }
          }
        });

      localStorage.setItem('isLetterSpacingEnabled', 0);
    }
  }

  static enableDyslexicFont(load = false) {
    let orgFontFamily
    let isDyslexicFontEnabled = parseInt(localStorage.getItem('isDyslexicFontEnabled'));
    if (load) {
      isDyslexicFontEnabled = !isDyslexicFontEnabled;
    }
    if (!isDyslexicFontEnabled) {
      document
        .querySelectorAll("*")
        .forEach((el) => {
          if (this.checkClasslist(el.classList)) {
            orgFontFamily = el.style['font-family'];
            el.setAttribute('data-asw-orgFontFamily', orgFontFamily);
            //el.style['font-family'] = 'OpenDyslexic3';
            el.style['font-family'] = 'Arial';
          }
        });

      localStorage.setItem('isDyslexicFontEnabled', 1);
    } else {
      document
        .querySelectorAll("*")
        .forEach((el) => {
          if (this.checkClasslist(el.classList)) {
            orgFontFamily = el.getAttribute('data-asw-orgFontFamily');
            if (orgFontFamily) {
              el.style['font-family'] = orgFontFamily;
              el.removeAttribute('data-asw-orgFontFamily');
            }
            else {
              el.style.removeProperty('font-family');
            }
          }
        });

      localStorage.setItem('isDyslexicFontEnabled', 0);
    }
  }

  static enableBigCursor(load = false) {
    let isBigCursorEnabled = parseInt(localStorage.getItem('isBigCursorEnabled'));
    if (load) {
      isBigCursorEnabled = !isBigCursorEnabled;
    }
    if (!isBigCursorEnabled) {
      document
        .querySelectorAll("*")
        .forEach((el) => {
          el.style.cursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 512 512'%3E%3Cpath d='M429.742 319.31L82.49 0l-.231 471.744 105.375-100.826 61.89 141.083 96.559-42.358-61.89-141.083 145.549-9.25zM306.563 454.222l-41.62 18.259-67.066-152.879-85.589 81.894.164-333.193 245.264 225.529-118.219 7.512 67.066 152.878z' xmlns='http://www.w3.org/2000/svg'/%3E%3C/svg%3E"), default`;;
        });
      localStorage.setItem('isBigCursorEnabled', 1);
    } else {
      document
        .querySelectorAll("*")
        .forEach((el) => {
          el.style.cursor = 'default';
        });

      localStorage.setItem('isBigCursorEnabled', 0);
    }
  }

  static enableHighlightLinks(load = false) {
    let isHighlightLinks = parseInt(localStorage.getItem('isHighlightLinks'));
    if (load) {
      isHighlightLinks = !isHighlightLinks;
    }
    if (!isHighlightLinks) {
      document.querySelectorAll('a,button').forEach((anchor) => {
        const orgTextDecoration = window.getComputedStyle(anchor).getPropertyValue('text-decoration');
        const orgFontWeight = window.getComputedStyle(anchor).getPropertyValue('font-weight');
        const orgFontSize = window.getComputedStyle(anchor).getPropertyValue('font-size');
        const orgLinkColor = window.getComputedStyle(anchor).getPropertyValue('color');
        anchor.setAttribute('data-asw-orgLinkTextDecoration', orgTextDecoration);
        anchor.setAttribute('data-asw-orgLinkFontWeight', orgFontWeight);
        anchor.setAttribute('data-asw-orgLinkFontSize', orgFontSize);
        anchor.setAttribute('data-asw-orgLinkColor', orgLinkColor);
        anchor.style.textDecoration = 'underline';
        anchor.style.fontWeight = '800';
        anchor.style['font-size'] = `${parseInt(orgFontSize) * 1.1}px`;
        anchor.style['color'] = '#ff0000';
      });

      localStorage.setItem('isHighlightLinks', 1);
    } else {
      document.querySelectorAll('a,button').forEach((anchor) => {
        const orgTextDecoration = anchor.getAttribute('data-asw-orgLinkTextDecoration');
        const orgFontWeight = anchor.getAttribute('data-asw-orgLinkFontWeight');
        const orgFontSize = anchor.getAttribute('data-asw-orgLinkFontSize');
        const orgLinkColor = anchor.getAttribute('data-asw-orgLinkColor');
        anchor.style.color = orgLinkColor;
        anchor.style.fontSize = orgFontSize;
        anchor.style.textDecoration = orgTextDecoration;
        anchor.style.fontWeight = orgFontWeight;
      });

      localStorage.setItem('isHighlightLinks', 0);
    }
  }


  static enableHighlightHeadings(load = false) {
    let isHighlightHeadings = parseInt(localStorage.getItem('isHighlightHeadings'));
    if (load) {
      isHighlightHeadings = !isHighlightHeadings;
    }
    if (!isHighlightHeadings) {
      document.querySelectorAll('h1, h2, h3,heading1').forEach((heading) => {
        const orgTextDecoration = window.getComputedStyle(heading).getPropertyValue('text-decoration');
        const orgHighlightColor = window.getComputedStyle(heading).getPropertyValue('color');
        heading.setAttribute('data-asw-orgHighlightTextDecoration', orgTextDecoration)
        heading.setAttribute('data-asw-orgHighlightColor', orgHighlightColor);
        heading.style.color = '#ff0000';
        heading.style.textDecoration = 'underline';
      });

      localStorage.setItem('isHighlightHeadings', 1);
    } else {
      document.querySelectorAll('h1, h2, h3,heading1').forEach((heading) => {
        const orgTextDecoration = heading.getAttribute('data-asw-orgHighlightTextDecoration');
        const orgHighlightColor = heading.getAttribute('data-asw-orgHighlightColor');
        heading.style.textDecoration = orgTextDecoration;
        heading.style.color = orgHighlightColor;
      });

      localStorage.setItem('isHighlightHeadings', 0);
    }
  }

  static adjustLineHeight(inc = 0) {
    let isLineHeightEnabled = parseInt(localStorage.getItem('isLineHeightEnabled'));
    let increment
    if (inc) {
      increment = inc
    } else {
      isLineHeightEnabled = !isLineHeightEnabled;
      increment = 1;
    }
    if (!isLineHeightEnabled) {
      document
        .querySelectorAll("*")
        .forEach((el) => {
          if (this.checkClasslist(el.classList)) {
            let orgLineHeight = el.getAttribute('data-asw-orgLineHeight');

            if (!orgLineHeight) {
              orgLineHeight = el.style['line-height'];
              el.setAttribute('data-asw-orgLineHeight', orgLineHeight);
              if (!orgLineHeight) {
                orgLineHeight = 1.1;
              }
              orgLineHeight = parseFloat(orgLineHeight);
              const newLineHeight = orgLineHeight + increment;
              el.style['line-height'] = newLineHeight;
            }
          }
        });

      localStorage.setItem('isLineHeightEnabled', 1);
    } else {
      document
        .querySelectorAll("*")
        .forEach((el) => {
          if (this.checkClasslist(el.classList)) {
            const orgLineHeight = el.getAttribute('data-asw-orgLineHeight');
            if (orgLineHeight) {
              el.style['line-height'] = orgLineHeight;
              el.removeAttribute('data-asw-orgLineHeight');
            }
            else {
              el.style.removeProperty('line-height');
            }

          }
        });

      localStorage.setItem('isLineHeightEnabled', 0);
    }
  }

  static adjustFontWeight(inc = 100) {
    let isFontWeightEnabled = parseInt(localStorage.getItem('isFontWeightEnabled'));
    let increment = inc
    if (increment === 100) {
      isFontWeightEnabled = !isFontWeightEnabled;
      increment = 400;
    }
    if (!isFontWeightEnabled) {
      document
        .querySelectorAll("*")
        .forEach((el) => {
          if (this.checkClasslist(el.classList)) {
            let orgBoldFontWeight = window.getComputedStyle(el).getPropertyValue('--org-bold-font-weight');
            if (!orgBoldFontWeight) {
              orgBoldFontWeight = window.getComputedStyle(el).getPropertyValue('font-weight');
              el.style.setProperty('--org-bold-font-weight', orgBoldFontWeight);
            }
            const newFontWeight = parseInt(orgBoldFontWeight) + increment;
            el.style.setProperty('font-weight', newFontWeight);
          }
        });
      localStorage.setItem('isFontWeightEnabled', 1);
    } else {
      document
        .querySelectorAll("*")
        .forEach((el) => {
          if (this.checkClasslist(el.classList)) {
            const orgBoldFontWeight = window.getComputedStyle(el).getPropertyValue('--org-bold-font-weight');
            if (orgBoldFontWeight) {
              el.style['font-weight'] = orgBoldFontWeight;
            } else {
              el.style.removeProperty('font-weight');
            }
            el.style.removeProperty('--org-bold-font-weight');
          }
        });
      localStorage.setItem('isFontWeightEnabled', 0);
    }
  }

  static adjustContrast(load = false) {
    let isContrastEnabled = parseInt(localStorage.getItem('isContrastEnabled'));
    if (load) {
      isContrastEnabled = !isContrastEnabled;
    }
    if (!isContrastEnabled) {
      document
        .querySelectorAll("*")
        .forEach((el) => {
          let orgColor = el.getAttribute('data-asw-orgContrastColor');
          let orgBgColor = el.getAttribute('data-asw-orgContrastBgColor');

          if (!orgColor) {
            orgColor = el.style.color;
            el.setAttribute('data-asw-orgContrastColor', orgColor);
          }
          if (!orgBgColor) {
            orgBgColor = window.getComputedStyle(el).getPropertyValue('background-color');
            el.setAttribute('data-asw-orgContrastBgColor', orgBgColor);
          }

          el.style["color"] = '#ffff00';
          el.style["background-color"] = '#0000ff';
        });

      localStorage.setItem('isContrastEnabled', 1);
    } else {
      document
        .querySelectorAll("*")
        .forEach((el) => {
          const orgContrastColor = el.getAttribute('data-asw-orgContrastColor');
          const orgContrastBgColor = el.getAttribute('data-asw-orgContrastBgColor');
          if (orgContrastColor) {
            el.style.color = orgContrastColor;
          } else {
            el.style.removeProperty('color');
          }
          if (orgContrastBgColor) {
            el.style.backgroundColor = orgContrastBgColor;
          } else {
            el.style.removeProperty('background-color');
          }
          el.removeAttribute('data-asw-orgContrastColor');
          el.removeAttribute('data-asw-orgContrastBgColor');
        });
      localStorage.setItem('isContrastEnabled', 0);
    }
  }

  static redableText() {
    this.adjustLineHeight(1)
    this.adjustLetterSpacing(0.1)
    this.enableDyslexicFont()
  }

  static init() {
    this.adjustFontSize()
    this.adjustLetterSpacing()
    this.enableDyslexicFont(true)
    this.enableBigCursor(true)
    this.enableHighlightLinks(true)
    this.enableHighlightHeadings(true)
    this.adjustLineHeight()
    this.adjustFontWeight()
    this.adjustContrast(true)
  }

  static #redability
  static readability() {
    if (!this.#redability) {
      this.#redability = new ReadabilityInterface()
    }

    this.#redability.toggle()
  }

  static #speechInterface
  static speech() {
    if (!this.#speechInterface || !this.#speechInterface.active) {
      this.#speechInterface = new SpeechInterface()
      return
    }

    if (this.#speechInterface.active) {
      this.#speechInterface.destroy()
    }
  }

  static #screenKeyboard
  static keyboard() {
    if (!this.#screenKeyboard || !this.#screenKeyboard.active) {
      this.#screenKeyboard = new ScreenKeyboard()
      return
    }

    if (this.#screenKeyboard.active) {
      this.#screenKeyboard.destroy()
    }
  }

  static #screenMagnifier
  static magnifier() {
    if (!this.#screenMagnifier || !this.#screenMagnifier.active) {
      this.#screenMagnifier = new MagnifierInterface()
      MagnifierInterface.show()

      ASM.hideMenu()

      return this
    }

    if (this.#screenMagnifier.active) {
      this.#screenMagnifier.destroy()
    }
  }

  static monochrome() {
    const container = document.getElementsByTagName('html')[0]
    if (container.style.filter === 'grayscale(1)') {
      container.style.filter = null
    } else {
      container.style.filter = 'grayscale(1)'
    }
  }

  static reset() {
    if (this.#redability) {
      this.#redability.hide()
    }

    if (this.#speechInterface && this.#speechInterface.active) {
      this.#speechInterface.destroy()
    }

    localStorage.clear();
    this.init()
    //this.hideMenu()
  }
}


const init = () => {
  const container = document.getElementById('Asm')
  if (container) {
    return;
  }

  const body = document.body
  const asm = document.createElement('div')
  asm.setAttribute('id', 'Asm')
  asm.innerHTML = template
  body.appendChild(asm)

  ASM.init()
}

window.addEventListener('DOMContentLoaded', init)

window.ASM = ASM
