import xD from '../utils/xD.js';
import keys from '../keystyle/keys.js';


export default class Keyboard {
  constructor(keyLayout) {
    xD('#keyboard').aChilds(keyLayout.map((keys) => xD.create('div', 'keystring').aChilds(keys.map((key) => {
      const item = keys.ru.find((el) => el.keyCode === key);
      return xD.create('div', 'key').aChilds([xD.create('div', 'alter').aChilds(item.alternate).getNode(),
        xD.create('div', 'main-key').aChilds(item.main).getNode()]).getNode();
    })).getNode())).getNode();
  }
}