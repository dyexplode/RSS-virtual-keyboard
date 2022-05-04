/*
@param {String} el
@param {String} className
@param {HTMLElement} child
@param {HTMLElement} prent
@param {...array} dataAttr
*/

export default function create(el, classNames, child, parent, ...dataAttr) {
  let element = null;
  // create New HTMLElement
  try {
    element = document.createElement(el);
  } catch (error) {
    throw new Error('Unable to create element in Document... Please check the correct element name');
  }
  // add classes to New HTMLElement
  if (classNames) element.classList.add(...classNames.split(' ')); // input as "class1 class2 class3"

  // add children element in New HTMLElement
  if (child && Array.isArray(child)) {
    child.forEach((childElement) => childElement && element.appendChild(childElement));
  } else if (child && typeof child === 'object') {
    element.appendChild(child);
  } else if (child && typeof child === 'string') {
    element.innerHTML = child;
  }

  // add to parent this element
  if (parent) parent.appendChild(element);

  // add some attribute   <div id="" data-code="xxx" disabled></div>
  if (dataAttr.length) {
    dataAttr.forEach(([attrName, attrValue]) => {
      if (attrValue === '') {
        element.setAttribute(attrName, '');
      } else if (attrName.match(/value|id|placeholder|cols|rows|autocorrect|spellcheck|src|alt/)) {
        element.setAttribute(attrName, attrValue);
      } else {
        element.dataset[attrName] = attrValue;
      }
    });
  }
  return element;
}
