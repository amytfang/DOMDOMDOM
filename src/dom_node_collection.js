class DOMNodeCollection {
  constructor(elements) {
    this.elements = elements;
  }

  each(callback) {
    this.elements.forEach(callback);
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
    if (addendum instanceof HTMLElement) {
      addendum = $l(addendum);
    }

    if (typeof addendum === "string") {
      this.each((el) => el.appendChild(new Text(addendum)));
    } else if (addendum instanceof DOMNodeCollection) {
      this.each((el) => {
        addendum.each(addEl => el.appendChild(addEl.cloneNode(true)));
      });
    }
  }


  attr(attribute, value = null) {
    if (value === null) {
      return this.elements[0].getAttribute(attribute);
    } else {
      this.each((el) => el.setAttribute(attribute, value));
    }
  }

  addClass(className) {
    this.each(el => el.classList.add(className));
  }

  removeClass(className) {
    this.each(el => el.classList.remove(className));
  }

  toggleClass(className) {
    this.each(el => el.classList.toggle(className));
  }

  children() {
    let childrenList = [];
    this.each(el => {
      const elChildren = el.children;
      childrenList = childrenList.concat(Array.from(elChildren));
    });
    return new DOMNodeCollection(childrenList);
  }

  parent() {
    let parentList = [];
    this.each(el => parentList.push(el.parentNode));
    return new DOMNodeCollection(parentList);
  }

  find(selectors) {
    let findList = [];
    this.each(el => {
      let elFind = el.querySelectorAll(selectors);
      findList = findList.concat(Array.from(elFind));
    });
    return new DOMNodeCollection(findList);
  }

  remove() {
    this.each(el => el.remove());
    this.elements = [];
  }

  on(e, callback) {
    this.each(el => {
      el.addEventListener(e, callback);
      const callbackStore = `callback-${e.toLowerCase()}`;
      if (!e[callbackStore]) el[callbackStore] = [];
      el[callbackStore].push(callback);
    });
  }

  off(e) {
    this.each(el => {
      const callbackStore = `callback-${e.toLowerCase()}`;
      if (el[callbackStore]) {
        el[callbackStore].forEach(cb => el.removeEventListener(e, cb));
      }
      el[callbackStore] = [];
    });
  }
}

module.exports = DOMNodeCollection;
