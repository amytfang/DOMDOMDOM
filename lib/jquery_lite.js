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

	window.$l = function(el) {
	  if (typeof el === "string") {
	    let nodeList = document.querySelectorAll(el);
	    let arrayNodeList = Array.prototype.slice.call(nodeList);
	    return new DOMNodeCollection(arrayNodeList);
	  } else if (el instanceof "HTMLElement") {
	    return new DOMNodeCollection([el]);
	  }
	};


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


/***/ }
/******/ ]);