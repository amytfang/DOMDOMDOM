const DOMNodeCollection = require("./dom_node_collection.js");

const loadedCallbacks = [];
let loaded = false;

const $l = function(el) {
  if (typeof el === "string") {
    if (toCreateElement(el)) {
      const elementTag = parseTag(el);
      const elInnerHTML = parseInnerHMTL(el, elementTag.length);
      let newElement = document.createElement(elementTag);
      newElement.innerHTML = elInnerHTML;
      return new DOMNodeCollection([newElement]);
    } else {
      const nodeList = document.querySelectorAll(el);
      const arrayNodeList = Array.from(nodeList);
      return new DOMNodeCollection(arrayNodeList);
    }
  } else if (typeof el === "function") {
    handleFunction(el);
  } else if (el instanceof HTMLElement) {
    return new DOMNodeCollection([el]);
  }
};

window.$l = $l;

$l.extend = function() {
  return Object.assign(...arguments);
};

$l.ajax = function(options) {
  return new Promise(function(resolve, reject) {
    const defaults = {
      method: "GET",
      success: () => {},
      error: () => {},
      data: {},
      url: window.location.href,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    };
    options.method = options.method.toUpperCase();
    if (options.method === "GET" && options.hasOwnProperty("data")) {
      options.url += "?" + toQuery(options.data);
    }
    const args = $l.extend(defaults, options);
    const xhr = new XMLHttpRequest();

    xhr.open(args.method, args.url, true);
    xhr.onload = (e) => {
      if (xhr.status === 200) {
        args.success(xhr.response);
        resolve(xhr.response);
      } else {
        args.error(xhr.response);
        reject(xhr.response);
      }
    };

    xhr.send(JSON.stringify(args.data));
  });
};

document.addEventListener("DOMContentLoaded", () => {
  loaded = true;
  loadedCallbacks.forEach((func) => func());
});

// Helper methods

function toCreateElement(string) {
  return (string[0] === "<" && string.slice(-1) === ">") ? true : false;
}

function parseTag(string) {
  let result = "";
  for (let i = 1; i < string.length; i++) {
    if (string[i] === ">") break;
    result += string[i];
  }
  return result;
}

function parseInnerHMTL(string, tagLength) {
  return string.slice(tagLength+2, string.length - tagLength - 3);
}

function toQuery(data) {
  let result = "";
  for (let prop in data) {
    if (data.hasOwnProperty(prop)) {
      result += prop + "=" + data[prop] +"&";
    }
  }
  return result.slice(0, -1);
}

function handleFunction(func) {
  if (loaded) {
    func();
  } else {
    loadedCallbacks.push(func);
  }
}
