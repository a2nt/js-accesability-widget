/*
<button class="asw-btn" type="button" onclick="window.ASM.adjustLineHeight(1)">
    <span class="material-icons">format_line_spacing</span>
    <span class="asw-translate">Line Spacing</span>
</button>
<button class="asw-btn" type="button" onclick="window.ASM.adjustLetterSpacing(0.1)">
    <span class="material-icons">text_rotation_none</span>
    <span class="asw-translate">Letter Spacing</span>
</button>
<button class="asw-btn" type="button" onclick="window.ASM.enableDyslexicFont()">
    <span class="material-icons">spellcheck</span>
    <span class="asw-translate">Dyslexic Font</span>
</button>
*/
const tpl = `<div class="asw-menu" style="display: none;" id="aswMenu">
    <div class="asw-menu-header">
        <div class="asw-translate">
            Accessibility Tools
        </div>
        <div>
            <div role="button" class="asw-menu-reset"  title="Reset settings" onclick="window.ASM.reset()">
                Reset
                <i class="fa-solid fa-arrows-rotate"></i>
            </div>
            <div role="button" class="asw-menu-close" title="Close" onclick="window.ASM.toggleMenu()">
                <i class="fa-solid fa-xmark"></i>
            </div>
        </div>
    </div>
    <div class="asw-menu-content">
        <div class="asw-card">
            <div class="asw-items content">
                <button class="asw-btn" type="button" onclick="window.ASM.speech()">
                    <i class="fa-solid fa-volume-high"></i>
                    <span class="asw-translate">Speak on click</span>
                </button>
                <button class="asw-btn" type="button" onclick="window.ASM.redableText()">
                    <i class="fa-solid fa-font"></i>
                    <span class="asw-translate">Redable Font</span>
                </button>
                <button class="asw-btn" type="button" onclick="window.ASM.adjustFontSize(0.1)">
                    <i class="fa-solid fa-plus"></i>
                    <span class="asw-translate">Increase Size</span>
                </button>
                <button class="asw-btn" type="button"onclick="window.ASM.adjustFontSize(-0.1)">
                    <i class="fa-solid fa-minus"></i>
                    <span class="asw-translate">Decrease Size</span>
                </button>
                <button class="asw-btn" type="button" onclick="window.ASM.keyboard()">
                    <i class="fa-solid fa-keyboard"></i>
                    <span class="asw-translate">Screen Keyboard</span>
                </button>
                <button class="asw-btn" type="button" onclick="window.ASM.enableHighlightHeadings()">
                    <i class="fa-solid fa-heading"></i>
                    <span class="asw-translate">Highlight Headings</span>
                </button>
                <button class="asw-btn" type="button" onclick="window.ASM.enableHighlightLinks()">
                    <i class="fa-solid fa-link"></i>
                    <span class="asw-translate">Highlight Links</span>
                </button>
                <button class="asw-btn" type="button" onclick="window.ASM.adjustFontWeight(400)">
                    <i class="fa-solid fa-bold"></i>
                    <span class="asw-translate">Font Weight</span>
                </button>
                <button class="asw-btn" type="button"onclick="window.ASM.enableBigCursor()">
                    <i class="fa-solid fa-arrow-pointer"></i>
                    <span class="asw-translate">Bigger Cursor</span>
                </button>

                <button class="asw-btn" type="button"onclick="window.ASM.readability()">
                    <i class="fa-solid fa-newspaper"></i>
                    <span class="asw-translate">Redable Mode</span>
                </button>

                <button class="asw-btn" type="button"onclick="window.ASM.monochrome()">
                    <i class="fa-solid fa-palette"></i>
                    <span class="asw-translate">Monochrome Mode</span>
                </button>

                <button class="asw-btn" type="button"onclick="window.ASM.adjustContrast()">
                    <i class="fa-solid fa-circle-half-stroke"></i>
                    <span class="asw-translate">Contrast</span>
                </button>
            </div>
        </div>
    </div>

</div>


<div class="asw-widget">
    <a class="asw-menu-btn" title="Open Accessibility Menu" role="button" aria-expanded="false" onclick="window.ASM.toggleMenu()" title="Accessibility Menu">
        <i class="fa-solid fa-wheelchair"></i>
    </a>
</div>`

export default tpl
