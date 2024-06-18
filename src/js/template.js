const tpl = ` <link href="https://fonts.googleapis.com/icon?family=Material+Icons&amp;text=ads_click,text_rotation_none,text_fields,format_size,blind,restart_alt,close,link,local_parking,contrast,spellcheck,local_library,format_bold,format_line_spacing" rel="stylesheet">
<div class="asw-menu" style="display: none;" id="aswMenu">
    <div class="asw-menu-header">
        <div class="asw-translate">
            Accessibility Tools
        </div>
        <div>
            <div role="button" class="asw-menu-reset"  title="Reset settings" onclick="window.ASM.reset()">
                Reset
                <span class="material-icons" >
                    restart_alt
                </span>
            </div>
            <div role="button" class="asw-menu-close" title="Close" onclick="window.ASM.toggleMenu()">
                <span class="material-icons" >
                    close
                </span>
            </div>
        </div>
    </div>
    <div class="asw-menu-content">
        <div class="asw-card">
            <div class="asw-items content">
                <button class="asw-btn" type="button" onclick="window.ASM.adjustFontSize(0.1)">
                    <span class="material-icons">format_size</span>
                    <span class="asw-translate">Increase Font Size</span>
                </button>
                <button class="asw-btn" type="button"onclick="window.ASM.adjustFontSize(-0.1)">
                    <span class="material-icons">text_fields</span>
                    <span class="asw-translate">Decrease Font Size</span>
                </button>
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
                <button class="asw-btn" type="button" onclick="window.ASM.enableHighlightHeadings()">
                    <span class="material-icons">local_parking</span>
                    <span class="asw-translate">Highlight Headings</span>
                </button>
                <button class="asw-btn" type="button" onclick="window.ASM.enableHighlightLinks()">
                    <span class="material-icons">link</span>
                    <span class="asw-translate">Highlight Links</span>
                </button>
                <button class="asw-btn" type="button" onclick="window.ASM.adjustFontWeight(400)">
                    <span class="material-icons">format_bold</span>
                    <span class="asw-translate">Font Weight</span>
                </button>
                <button class="asw-btn" type="button"onclick="window.ASM.enableBigCursor()">
                    <span class="material-icons">ads_click</span>
                    <span class="asw-translate">Bigger Cursor</span>
                </button>
                <button class="asw-btn" type="button"onclick="window.ASM.adjustContrast()">
                    <span class="material-icons">contrast</span>
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
