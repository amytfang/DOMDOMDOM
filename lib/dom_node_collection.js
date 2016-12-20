class DOMNodeCollection {
  constructor(elements) {
    this.elements = elements;
  }

  html(htmlString = null) {
    if (htmlString === null) {
      return this.elements[0].innerHTML;
    } else {
      this.elements.forEach((el) => { el.innerHTML = htmlString; });
    }
  }

  empty() {
    this.html("");
  }

  append(addendum) {
    if (typeof addendum === "string") {
      this.elements.forEach((el) => el.innerHTML = el.innerHTML.concat(addendum));
    } else if (addendum instanceof HTMLElement) {
      this.elements.forEach((el) => el.innerHTML = el.innerHTML.concat(addendum.outerHTML));
    } else {
      addendum.elements.forEach((el) => this.append(el));
    }
  }

  attr(attribute, value = null) {
    if (value === null) {
      return this.elements[0].getAttribute(attribute);
    } else {
      this.elements.forEach((el) => el.setAttribute(attribute, value));
    }
  }

  addClass(className) {
    this.elements.forEach((el) => el.classList.add(className));
  }

  removeClass(className) {
    this.elements.forEach((el) => el.classList.remove(className));
  }

  toggleClass(className) {
    this.elements.forEach((el) => el.classList.toggle(className));
  }

  children() {
    let childrenList = [];
    this.elements.forEach((el) => {
      let elChildren = el.children;
      for(let i = 0; i < elChildren.length; i++){
        childrenList.push(elChildren[i]);
      }
    });
    return new DOMNodeCollection(childrenList);
  }

  parent() {
    let parentList = [];
    this.elements.forEach((el) => parentList.push(el.parentNode));
    return new DOMNodeCollection(parentList);
  }

  find(selectors) {
    let findList = [];
    this.elements.forEach((el) => {
      let elFind = el.querySelectorAll(selectors);
      for(let i = 0; i < elFind.length; i++){
        findList.push(elFind[i]);
      }
    });
    return new DOMNodeCollection(findList);
  }

  remove() {
    this.elements.forEach((el) => el.remove());
    this.elements = [];
  }

  on(e, callback) {
    this.elements.forEach((el) => el.addEventListener(e, callback));
  }
}

module.exports = DOMNodeCollection;
