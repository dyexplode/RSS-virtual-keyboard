/* eslint-disable import/extensions */
import xD from '../utils/xD.js';
import Button from './Button.js';
import keyLangs from '../keystyle/keyLangs.js';
import * as storage from '../utils/storage.js';

export default class Keyboard {
  constructor(keyLayout) {
    this.keyLayout = keyLayout;
    this.isCapsPressed = false;
  }

  init(language) {
    this.buttons = [];
    this.language = language;
    this.display = xD('.text-display')
      .aAttributes(
        ['autocorrect', 'off'],
        ['spellcheck', 'false'],
        ['placeholder', 'Press any key on virtual keyboard or real keyboard for starts...'],
      ).getNode();

    // Render Keyboard in container
    this.container = xD('#keyboard')
      .aChilds(this.keyLayout.map((keystring) => xD.create('div', 'keystring')
        .aChilds(keystring.map((keyCode) => {
          const btn = new Button(keyCode, this.language);
          this.buttons.push(btn);
          return btn.content;
        })).getNode())).getNode();
    this.display.focus();
    document.addEventListener('keydown', this.processEvent);
    document.addEventListener('keyup', this.processEvent);
    this.container.addEventListener('mousedown', this.preProcessEvent);
    this.container.addEventListener('mouseup', this.preProcessEvent);
    return this;
  }

  // Preload process event for mouse
  preProcessEvent = (event) => {
    event.stopPropagation();
    const theTarget = event.target.closest('.key');
    if (!theTarget) return;
    // if mouse drop out of button We have to clear classes of buttons
    theTarget.addEventListener('mouseleave', this.dropMouse);
    this.processEvent({ code: theTarget.dataset.keyCode, type: event.type });
  };

  dropMouse = ({ target: { dataset: { keyCode } } }) => {
    this.clearKeyPressed(keyCode);
  };

  clearKeyPressed(code) {
    const btn = this.buttons.find((bn) => bn.code === code);
    btn.content.removeEventListener('mouseleave', this.dropMouse);
    if (!code.match(/Caps/)) xD(btn.content).rClass('pressed');
    if (code.match(/Caps/) && !this.isCapsPressed) xD(btn.content).rClass('pressed');
    if (code.match(/Shift/)) {
      this.isShiftPressed = false;
      this.goToUpper();
    }
    if (code.match(/Caps/)) this.goToUpper();
    if (code.match(/Control/)) this.isCtrlPressed = false;
  }

  // Processing event key
  processEvent = (event) => {
    if (event.stopPropagation) event.stopPropagation();
    const { code, type } = event;
    const btn = this.buttons.find((item) => item.code === code);
    if (!btn) return;
    this.display.focus();
    // Pressdown button
    if (type.match(/keydown|mousedown/)) {
      if (!type.match(/mouse/)) event.preventDefault();
      xD(btn.content).aClass('pressed');
      if (code.match(/Caps/) && !this.isCapsPressed) {
        this.isCapsPressed = true;
      } else if (code.match(/Caps/) && this.isCapsPressed) this.isCapsPressed = false;
      if (code.match(/Shift/)) {
        this.isShiftPressed = true;
        this.goToUpper();
      }
      if (code.match(/Control/)) this.isCtrlPressed = true;
      if ((code.match(/Shift/) && this.isCtrlPressed) || (code.match(/Control/) && this.isShiftPressed)) this.switchLanguage();
      // print to display
      this.printToDisplay(btn);
    }

    // UnPress button
    if (type.match(/keyup|mouseup/)) {
      if (!type.match(/mouse/)) event.preventDefault();
      this.clearKeyPressed(code);
    }
  };

  // Print to textarea
  printToDisplay(btn) {
    let cursor = this.display.selectionStart;
    const left = this.display.value.slice(0, cursor);
    const right = this.display.value.slice(cursor);
    const redirectKeys = {
      Space: () => {
        this.display.value = `${left} ${right}`;
        cursor += 1;
      },
      Enter: () => {
        this.display.value = `${left}\n${right}`;
        cursor += 1;
      },
      Tab: () => {
        this.display.value = `${left}\t${right}`;
        cursor += 1;
      },
      Delete: () => {
        this.display.value = `${left}${right.slice(1)}`;
      },
      Backspace: () => {
        this.display.value = `${left.slice(0, -1)}${right}`;
        cursor -= 1;
      },
      ArrowRight: () => {
        this.display.value = `${left}▶${right}`;
        cursor += 1;
      },
      ArrowLeft: () => {
        this.display.value = `${left}◀${right}`;
        cursor += 1;
      },
      ArrowUp: () => {
        this.display.value = `${left}▲${right}`;
        cursor += 1;
      },
      ArrowDown: () => {
        this.display.value = `${left}▼${right}`;
        cursor += 1;
      },
    };
    if (redirectKeys[btn.code]) redirectKeys[btn.code]();
    if (!btn.functional) {
      this.display.value = `${left}${this.getChar(btn)}${right}`;
      cursor += 1;
    }
    this.display.setSelectionRange(cursor, cursor);
  }

  switchLanguage() {
    const lngs = Object.keys(keyLangs);
    if (lngs.indexOf(this.language) + 1 < lngs.length) {
      this.language = lngs[lngs.indexOf(this.language) + 1];
    } else {
      [this.language] = lngs;
    }
    storage.push('kLng', this.language);
    this.buttons.forEach((button) => button.update(this.language));
  }

  goToUpper() {
    if (this.isShiftPressed) {
      this.buttons.forEach((btn) => {
        const btt = btn;
        if (btt.alternative) {
          if (this.isCapsPressed) {
            if (btt.main.match(/[a-zа-яё]/)) btt.mainDiv.innerHTML = btt.main;
            if (!btt.main.match(/[a-zа-яё]/)) btt.alterDiv.innerHTML = btt.main;
            if (!btt.main.match(/[a-zа-яё]/)) btt.mainDiv.innerHTML = btt.alternative;
          } else {
            btt.mainDiv.innerHTML = btt.alternative;
            if (!btt.main.match(/[a-zа-яё]/)) btt.alterDiv.innerHTML = btt.main;
          }
        }
      });
    } else {
      this.buttons.forEach((btn) => {
        const btt = btn;
        if (btt.alternative) {
          if (this.isCapsPressed) {
            if (btt.main.match(/[a-zа-яё]/)) btt.mainDiv.innerHTML = btt.alternative;
            if (!btt.main.match(/[a-zа-яё]/)) {
              btt.alterDiv.innerHTML = btt.alternative;
              btt.mainDiv.innerHTML = btt.main;
            }
          } else {
            btt.mainDiv.innerHTML = btt.main;
            if (!btt.main.match(/[a-zа-яё]/)) btt.alterDiv.innerHTML = btt.alternative;
          }
        }
      });
    }
  }

  // Get approved char before print on display
  getChar(button) {
    let char = '';
    if (button.main.match(/[a-zа-яё]/)) {
      char = button.main;
      if ((this.isShiftPressed && !this.isCapsPressed)
       || (!this.isShiftPressed && this.isCapsPressed)) char = button.alternative;
    } else {
      char = button.main;
      if (this.isShiftPressed) char = button.alternative;
    }
    return char;
  }
}
