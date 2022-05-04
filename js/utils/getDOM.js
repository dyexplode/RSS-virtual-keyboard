// eslint-disable-next-line import/extensions
import create from './create.js';

export default function getDOM() {
  return create('div', 'wrapper', [
    create('header', 'header', create('div', 'logo', [
      create('h1', 'title', 'RSS Virtual Keyboard &larr;'),
      create('p', 'description', 'This keyboard create on win10 and xubuntu.'),
    ])),
    create('main', '', [
      create('textarea', 'text-display', null, null, ['rows', '10'], ['cols', '100']),
      create('div', 'keyboard-container', null, null, ['id', 'keyboard']),
    ]),
    create('footer', 'footer', create('div', '', 'Change language Ctrl(left) + Shift(left)')),
  ]);
}
