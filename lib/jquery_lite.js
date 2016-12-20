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


/***/ },
/* 1 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);