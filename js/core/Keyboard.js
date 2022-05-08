/* eslint-disable import/extensions */
import xD from '../utils/xD.js';
import Button from './Button.js';

export default class Keyboard {
  constructor(keyLayout) {
    this.keyLayout = keyLayout;
    this.buttonsPressed = new Set();
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
          // console.log(keyCode, this.language);
          const btn = new Button(keyCode, this.language);
          this.buttons.push(btn);
          return btn.content;
        })).getNode())).getNode();
    this.display.focus();
    document.addEventListener('keydown', this.processEvent);
    document.addEventListener('keyup', this.processEvent);
    this.container.addEventListener('mousedown', this.processEvent);
    this.container.addEventListener('mouseup', this.processEvent);
    this.container.addEventListener('mouseleave', this.processEvent);
    return this;
  }

  // Processing event key
  processEvent = (event) => {
    event.stopPropagation();
    const { code, type } = event;
    const btn = this.buttons.find((item) => item.code === code);
    if (!btn) return;
    this.display.focus();
    console.log(event, btn);
    // Pressdown button
    if (type.match(/keydown|mousedown/)) {
      if (!type.match(/mouse/)) event.preventDefault();
      xD(btn.content).aClass('pressed');
      this.printToDisplay(btn, btn.main);
      if (code.match(/Shift/)) this.isShiftPressed = true;
      if (code.match(/Caps/) && !this.isCapsPressed) this.isCapsPressed = true;
    }

    // UnPress button
    if (type.match(/keyup|mouseup/)) {
      if (!type.match(/mouse/)) event.preventDefault();
      xD(btn.content).rClass('pressed');
    }
  };

  // Print to textarea
  printToDisplay(btn, char) {
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
    };
    if (redirectKeys[btn.code]) redirectKeys[btn.code]();
    if (!btn.functional) {
      this.display.value = `${left}${char}${right}`;
      cursor += 1;
    }
    this.display.setSelectionRange(cursor, cursor);
  }
}
