const DOMNodeCollection = require("./dom_node_collection.js");

window.$l = function(el) {
  if (typeof el === "string") {
    let nodeList = document.querySelectorAll(el);
    let arrayNodeList = Array.prototype.slice.call(nodeList);
    return new DOMNodeCollection(arrayNodeList);
  } else if (el instanceof "HTMLElement") {
    return new DOMNodeCollection([el]);
  }
};
