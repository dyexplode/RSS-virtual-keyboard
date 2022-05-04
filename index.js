/* eslint-disable import/extensions */
import create from './js/utils/create.js';
import getDOM from './js/utils/getDOM.js';

const BODY = document.querySelector('body');
BODY.addEventListener('click', () => {});
BODY.prepend(getDOM());
document.addEventListener('keydown', (e) => {
  console.log(e);
});
// create();
