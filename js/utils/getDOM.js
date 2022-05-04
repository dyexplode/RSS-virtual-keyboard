// eslint-disable-next-line import/extensions
import create from './create.js';

export default function getDOM() {
  return create('div', 'wrapper', [
    create('header', 'header', create('div', 'logo', [
      create('h1', 'title', 'Virtual Keyboard &larr;'),
      create('p', 'description', 'This keyboard create on win10 and xubuntu. Change language Ctrl(left) + Shift(left)'),
    ])),
    create('main', '', [
      create('textarea', 'text-display'),
      create('div', 'keyboard-container'),
    ]),
    create('footer', 'footer'),
  ]);
}
