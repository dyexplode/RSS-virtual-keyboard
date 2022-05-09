/* eslint-disable import/extensions */
import xD from '../utils/xD.js';
import keyLangs from '../keystyle/keyLangs.js';

export default class Button {
  constructor(keyCode, language) {
    this.code = keyCode;
    const item = keyLangs[language].find((el) => el.keyCode === keyCode);
    this.main = item.main;
    this.alternative = item.alternate;
    this.mainDiv = xD.create('div', 'main').aChilds(item.main).getNode();
    this.functional = Boolean(keyCode.match(/Esc|Backspace|Tab|Caps|Enter|Shift|Control|Alt|Meta|Arrow|Delete|F[0-9]|Context|Space/));
    if (!this.functional && item.alternate.match(/[a-zA-Zа-яА-ЯёЁ]/)) {
      this.alterDiv = xD.create('div', 'alter').aChilds('').getNode();
    } else {
      this.alterDiv = xD.create('div', 'alter').aChilds(item.alternate).getNode();
    }
    this.content = xD.create('div', 'key').aAttributes(['keyCode', keyCode], ['functional', `${this.functional}`]).aChilds([this.alterDiv, this.mainDiv]).getNode();
  }

  update(language) {
    const key = keyLangs[language].find((item) => item.keyCode === this.code);
    if (key) {
      this.main = key.main;
      this.alternative = key.alternate;
      this.mainDiv.innerHTML = key.main;
      if (!this.functional && key.alternate.match(/[a-zA-Zа-яА-ЯёЁ]/)) {
        this.alterDiv.innerHTML = '';
      } else {
        this.alterDiv.innerHTML = key.alternate;
      }
    }
  }
}
