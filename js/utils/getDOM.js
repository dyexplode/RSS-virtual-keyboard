// eslint-disable-next-line import/extensions
import xD from './xD.js';

export default function getDOM() {
  return xD.create('div', 'wrapper').aChilds([
    xD.create('header', 'header')
      .aChilds([
        xD.create('h1', 'title')
          .aChilds('RSS Virtual Keyboard &larr;')
          .getNode(),
        xD.create('p', 'description')
          .aChilds('This keyboard create on win10 and xubuntu.')
          .getNode()])
      .getNode(),
    xD.create('main', 'main')
      .aChilds([
        xD.create('textarea', 'text-display')
          .aAttributes(['rows', '10'], ['cols', '100'])
          .getNode(),
        xD.create('div', 'keyboard-container')
          .aAttributes(['id', 'keyboard'])
          .getNode()])
      .getNode(),
    xD.create('footer', 'footer')
      .aChilds(
        xD.create('div', 'footer-content')
          .aChilds('Change language Ctrl(left) + Shift(left)')
          .getNode(),
      ).getNode()])
    .getNode();
}
