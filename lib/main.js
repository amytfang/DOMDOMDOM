const DOMNodeCollection = require("./dom_node_collection.js");

const _loadedCallbacks = [];
let _isLoaded = false;

window.$l = function(el) {
  if (typeof el === "string") {
    let nodeList = document.querySelectorAll(el);
    let arrayNodeList = Array.prototype.slice.call(nodeList);
    return new DOMNodeCollection(arrayNodeList);
  } else if (typeof el === "function") {
    handleFunction(el);
  } else if (el instanceof "HTMLElement") {
    return new DOMNodeCollection([el]);
  }
};

window.$l.extend = function() {
  return Object.assign(...arguments);
};

window.$l.ajax = function(options){
  let defaults = {
    method: 'GET',
    success: () => {},
    error: () => {},
    data: {},
    url: window.location.href,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  const args = window.$l.extend(defaults, options);
  const xhr = new XMLHttpRequest();

  xhr.open(args.method, args.url, true);
  xhr.onload((e) => {
    if (xhr.status === 200) {
      args.success(xhr.response);
    } else {
      args.error(xhr.response);
    }
  });

  xhr.send(JSON.stringify(args.data));
};

function handleFunction(func) {
  if (_isLoaded) {
    func();
  } else {
    _loadedCallbacks.push(func);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  _isLoaded = true;
  _loadedCallbacks.forEach((func) => func());
});
