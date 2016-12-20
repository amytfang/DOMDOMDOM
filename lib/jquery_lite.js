/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);