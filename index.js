/* eslint-disable import/extensions */
import create from './js/utils/create.js';
import getDOM from './js/utils/getDOM.js';
import en from './js/keystyle/en.js';

const BODY = document.querySelector('body');
BODY.addEventListener('click', () => {});
BODY.prepend(getDOM());
document.addEventListener('keydown', (e) => {
  console.log(e);
});

const keyLayout = [['Escape', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Delete'],
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Enter'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Backslash'],
  ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'MetaRight', 'ContextMenu', 'ControlRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight']];

const keyCont = document.querySelector('#keyboard');
keyCont.append(...keyLayout.map((keys) => create('div', 'keystring', keys.map((key) => {
  const item = en.find((el) => el.keyCode === key);
  return create('div', 'key', [create('div', 'alter', item.alternate), create('div', 'main-key', item.main)]);
}))));
