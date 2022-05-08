/* eslint-disable import/extensions */
import xD from '../utils/xD.js';
import keyLangs from '../keystyle/keyLangs.js';

export default class Button {
  // { mainText, alterText, keyCode }
  constructor(keyCode, language) {
    this.code = keyCode;
    const item = keyLangs[language].find((el) => el.keyCode === keyCode);
    this.mainDiv = xD.create('div', 'main').aChilds(item.main).getNode();
    this.alterDiv = xD.create('div', 'alter').aChilds(item.alternative).getNode();
    this.content = xD.create('div', 'key').aAttributes(['keyCode', keyCode]).aChilds([this.alterDiv, this.mainDiv]).getNode();
  }

  update(language) {
    const key = keyLangs[language].find((item) => item.keyCode === this.code);
    if (key) {
      this.mainDiv = xD(this.mainDiv).html(key.main).getNode();
      this.alterDiv = xD(this.alterDiv).html(key.alternative).getNode();
    }
  }
}
