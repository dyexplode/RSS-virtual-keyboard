class CDOM {
  // Select tag from DOM or add tag
  constructor(selectNode) {
    this.xD_elem = (typeof selectNode === 'string')
      ? document.querySelector(selectNode)
      : selectNode;
  }

  // Get Node from CDOM class
  getNode() {
    return this.xD_elem;
  }

  // Set HTML or Get HTML if argument is empty
  html(html) {
    if (typeof html === 'string') {
      this.xD_elem.innerHTML = html;
      return this;
    }
    return this.xD_elem.outerHTML.trim();
  }

  // Remove all HTML from xD_elem
  clear() {
    return this.html('');
  }

  // Add childs or child or text content
  aChilds(childs) {
    if (childs && Array.isArray(childs)) {
      childs.forEach((childElement) => childElement && this.xD_elem.appendChild(childElement));
    } else if (childs && typeof childs === 'object') {
      this.xD_elem.appendChild(childs);
    } else if (childs && typeof childs === 'string') {
      this.html(childs);
    }
    return this;
  }

  // Add class for Node
  aClass(classes) {
    if (classes) {
      this.xD_elem.classList.add(...classes.split(' '));
    }
  }

  rClass(classes) {
    if (classes) {
      this.xD_elem.classList.remove(...classes.split(' '));
    }
  }

  // Add parent for this Node in CDOM class
  aParent(parent) {
    if (parent) {
      parent.appendChild(this.xD_elem);
    }
    return this;
  }

  // Add attribute for this Node in CDOM class
  aAttributes(...attribs) {
    if (attribs.length) {
      attribs.forEach(([attrName, attrValue]) => {
        if (attrValue === '') {
          this.xD_elem.setAttribute(attrName, '');
        } else if (attrName.match(/value|id|placeholder|cols|rows|autocorrect|spellcheck|src|alt|href/)) {
          this.xD_elem.setAttribute(attrName, attrValue);
        } else {
          this.xD_elem.dataset[attrName] = attrValue;
        }
      });
    }
    return this;
  }
}

export default function xD(selector) {
  return new CDOM(selector);
}

xD.create = (tagName, classes = '') => {
  let el;
  try {
    el = document.createElement(tagName);
  } catch (error) {
    throw new Error(`Tag Name ${tagName} is not valid in create.add function`);
  }
  if (classes) {
    el.classList.add(...classes.split(' '));
  }
  return xD(el);
};
