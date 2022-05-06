/* eslint-disable import/extensions */
import xD from './js/utils/xD.js';
import getDOM from './js/utils/getDOM.js';
// import xD from './js/utils/create.js';
import en from './js/keystyle/en.js';
import ru from './js/keystyle/ru.js';

const BODY = document.querySelector('body');
BODY.addEventListener('click', () => {});
BODY.prepend(getDOM());
document.addEventListener('keydown', (e) => {
  console.log('keyDown', e);
});
document.addEventListener('keyup', (e) => {
  console.log('keyUp', e);
});

const keyLayout = [['Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Delete'],
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Enter'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash'],
  ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'MetaRight', 'ContextMenu', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight']];

xD('#keyboard').aChilds(keyLayout.map((keys) => xD.create('div', 'keystring').aChilds(keys.map((key) => {
  const item = ru.find((el) => el.keyCode === key);
  return xD.create('div', 'key').aChilds([xD.create('div', 'alter').aChilds(item.alternate).getNode(),
    xD.create('div', 'main-key').aChilds(item.main).getNode()]).getNode();
})).getNode())).getNode();
