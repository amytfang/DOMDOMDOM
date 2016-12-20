class DOMNodeCollection {
  constructor(elements) {
    this.elements = elements;
  }

  html(htmlString = null) {
    if (htmlString === null) {
      return this.elements[0].innerHTML;
    } else {
      this.elements.forEach((el) => el.innerHTML = htmlString);
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

  addClass() {
    this.elements.forEach((el) => {
      if (el.className === "") {
        el.className = cl;
      } else {
        el.className = el.className + " " + cl;
      }
    });
  }

  removeClass() {

  }
}

module.exports = DOMNodeCollection;
