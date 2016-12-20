const DOMNodeCollection = require("./dom_node_collection.js");

const loadedCallbacks = [];
let loaded = false;

const $l = function(el) {
  if (typeof el === "string") {
    const nodeList = document.querySelectorAll(el);
    const arrayNodeList = Array.from(nodeList);
    return new DOMNodeCollection(arrayNodeList);
  } else if (typeof el === "function") {
    handleFunction(el);
  } else if (el instanceof "HTMLElement") {
    return new DOMNodeCollection([el]);
  }
};

// NB: for testing
window.$l = $l;

$l.extend = function() {
  return Object.assign(...arguments);
};

$l.ajax = function(options) {
  const defaults = {
    method: "GET",
    success: () => {},
    error: () => {},
    data: {},
    url: window.location.href,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  options.method = options.method.toUpperCase();
  if (options.method === "GET") options.url += "?" + toQuery(options.data);

  const args = $l.extend(defaults, options);
  const xhr = new XMLHttpRequest();

  xhr.open(args.method, args.url, true);
  xhr.onload = (e) => {
    if (xhr.status === 200) {
      args.success(xhr.response);
    } else {
      args.error(xhr.response);
    }
  };

  xhr.send(JSON.stringify(args.data));
};

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

document.addEventListener("DOMContentLoaded", () => {
  loaded = true;
  loadedCallbacks.forEach((func) => func());
});
