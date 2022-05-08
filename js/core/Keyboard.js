/* eslint-disable import/extensions */
import xD from '../utils/xD.js';
import Button from './Button.js';

export default class Keyboard {
  constructor(keyLayout) {
    this.keyLayout = keyLayout;
    this.buttonsPressed = new Set();
    this.isCapsPressed = false;
    /*
    document.addEventListener('keydown', (e) => {
      console.log('keyDown', e);
    });

    document.addEventListener('keyup', (e) => {
      console.log('keyUp', e);
    });
    */
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
    return this;
  }

  draw() {
    xD('#keyboard')
      .aChilds(this.keyLayout.map((keystring) => xD.create('div', 'keystring')
        .aChilds(keystring.map((keyCode) => {
          // console.log(keyCode, this.language);
          const btn = new Button(keyCode, this.language);
          this.buttons.push(btn);
          return btn.content;
        })).getNode())).getNode();
    this.display.focus();
  }
}
