/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Characters = __webpack_require__(/*! ./models/characters.js */ \"./src/models/characters.js\");\nconst CharacterSelectView = __webpack_require__(/*! ./views/character_select_view.js */ \"./src/views/character_select_view.js\");\nconst CharacterView = __webpack_require__(/*! ./views/character_view.js */ \"./src/views/character_view.js\");\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  console.log('JavaScript Loaded');\n\n  const characterContainer = document.querySelector('.characters-div');\n  const characterView = new CharacterView(characterContainer);\n  characterView.bindEvents();\n\n  const characterSelectContainer = document.querySelector('.character-dropdown');\n  const characterSelectView = new CharacterSelectView(characterSelectContainer);\n  characterSelectView.bindEvents();\n\n  const characters = new Characters();\n  characters.getData();\n  characters.bindEvents();\n});\n\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "./src/helpers/pub_sub.js":
/*!********************************!*\
  !*** ./src/helpers/pub_sub.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const PubSub = {\n  publish: function (channel, payload) {\n    const event = new CustomEvent(channel, {\n      detail: payload\n    });\n    document.dispatchEvent(event);\n  },\n\n  subscribe: function (channel, callback) {\n    document.addEventListener(channel, callback);\n  }\n};\n\nmodule.exports = PubSub;\n\n\n//# sourceURL=webpack:///./src/helpers/pub_sub.js?");

/***/ }),

/***/ "./src/helpers/request_helper.js":
/*!***************************************!*\
  !*** ./src/helpers/request_helper.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const RequestHelper = function (url) {\n  this.url = url\n}\n\nRequestHelper.prototype.get = function () {\n  return fetch(this.url)\n    .then(response => response.json());\n};\n\nmodule.exports = RequestHelper;\n\n\n//# sourceURL=webpack:///./src/helpers/request_helper.js?");

/***/ }),

/***/ "./src/models/characters.js":
/*!**********************************!*\
  !*** ./src/models/characters.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const RequestHelper = __webpack_require__(/*! ../helpers/request_helper.js */ \"./src/helpers/request_helper.js\");\nconst PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\n\nconst Characters = function() { //constructor\n  this.characterList = [];\n};\n\nCharacters.prototype.getData = function () {\n  const allUrls = this.getUrlList(`https://rickandmortyapi.com/api/character/?page=`);\n  Promise.all(allUrls.map( function(url) {\n    const requestHelper = new RequestHelper(url);\n    return requestHelper.get()\n  }))\n    .then((characters) => {\n      const flattened = characters.flat(1);\n      console.log(flattened);\n\n      const temp = flattened.reduce((sum, x) => {\n        // x.results.forEach((char) => {\n        //   sum.push(char);\n        // });\n        sum.push.apply(sum, x.results);\n        return sum;\n      },[]);\n      console.log('temp:', temp);\n\n      this.characterList = temp;\n      const allChars = [];\n      let names = this.characterList.forEach((character) => {\n        allChars.push(character.name)\n      })\n      PubSub.publish('Chars:ready', allChars)\n    })\n    .catch(() => {\n\n    });\n};\n\nCharacters.prototype.bindEvents = function () {\n  PubSub.subscribe('CharsSelV:selected', (evt) => {\n    const selectedIndex = evt.detail;\n    const selectedCharacter = this.characterList[selectedIndex];\n    // send character wherever\n    PubSub.publish('Chars:selected-ready', selectedCharacter)\n  });\n};\n\nCharacters.prototype.getUrlList = function (url) {\n  const urlList = [];\n  for (let pageNumber = 1; pageNumber < 21; pageNumber++) {\n    const newUrl = url + pageNumber\n    urlList.push(newUrl);\n  };\n  return urlList;\n};\n\nmodule.exports = Characters;\n\n\n//# sourceURL=webpack:///./src/models/characters.js?");

/***/ }),

/***/ "./src/views/character_list_view.js":
/*!******************************************!*\
  !*** ./src/views/character_list_view.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\");\nconst RequestHelper = __webpack_require__(/*! ../helpers/request_helper.js */ \"./src/helpers/request_helper.js\");\nconst Characters = __webpack_require__(/*! ../models/characters.js */ \"./src/models/characters.js\");\n\nconst CharacterListView = function(container){\n  this.container = container;\n};\n\nCharacterListView.prototype.bindEvents = function () {\n  PubSub.subscribe('Chars:all-chars-ready', (evt) => {\n    const characters = evt.detail;\n    this.render(characters);\n  });\n};\n\nCharacterListView.prototype.render = function (characters) {\n  // this.container.innerHTML = \"\";\n  console.log(characters);\n  const characterView = new CharacterView(this.container, character)\n  characterView.render();\n};\n\nmodule.exports = CharacterListView;\n\n\n//# sourceURL=webpack:///./src/views/character_list_view.js?");

/***/ }),

/***/ "./src/views/character_select_view.js":
/*!********************************************!*\
  !*** ./src/views/character_select_view.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\")\n\nconst CharacterSelectView = function(container){\n  this.container = container;\n};\n\nCharacterSelectView.prototype.bindEvents = function () {\n  PubSub.subscribe('Chars:ready', (evt) => {\n    const names = evt.detail;\n    names.forEach((name, index) => {\n      const option = document.createElement('option')\n      option.textContent = name;\n      option.value = index;\n      this.container.appendChild(option);\n    });\n    this.container.addEventListener('change', (evt) => {\n      const selectedChar = evt.target.value;\n      PubSub.publish('CharsSelV:selected', selectedChar)\n    });\n  });\n};\n\n\n\nmodule.exports = CharacterSelectView;\n\n\n//# sourceURL=webpack:///./src/views/character_select_view.js?");

/***/ }),

/***/ "./src/views/character_view.js":
/*!*************************************!*\
  !*** ./src/views/character_view.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const RequestHelper = __webpack_require__(/*! ../helpers/request_helper.js */ \"./src/helpers/request_helper.js\");\nconst PubSub = __webpack_require__(/*! ../helpers/pub_sub.js */ \"./src/helpers/pub_sub.js\")\nconst CharacterListView = __webpack_require__(/*! ./character_list_view.js */ \"./src/views/character_list_view.js\")\n\nconst CharacterView = function(container){\n  this.container = container;\n};\n\nCharacterView.prototype.bindEvents = function () {\n  PubSub.subscribe('Chars:selected-ready', (evt) => {\n    const character = evt.detail;\n    this.render(character);\n  });\n};\n\nCharacterView.prototype.render = function (character) {\n  this.container.innerHTML = '';\n\n  const characterContainer = document.createElement('div');\n  characterContainer.classList.add('character-container');\n\n  const name = this.createContentHeading(character.name);\n  characterContainer.appendChild(name);\n\n  const status = this.createPara('status', character.status);\n  characterContainer.appendChild(status);\n\n  const species = this.createPara('species', character.species);\n  characterContainer.appendChild(species);\n\n  const gender = this.createPara('gender', character.gender);\n  characterContainer.appendChild(gender);\n\n  const origin = this.createPara('origin', character.origin.name);\n  characterContainer.appendChild(origin);\n\n  const image = this.createImg(character.image);\n  characterContainer.appendChild(image);\n\n  this.container.appendChild(characterContainer);\n};\n\nCharacterView.prototype.createContentHeading = function (name) {\n  const heading = document.createElement('h3');\n  heading.classList.add('character-name');\n  heading.textContent = name;\n  return heading;\n};\n\nCharacterView.prototype.createPara = function (label, text) {\n  const para = document.createElement('p');\n  para.classList.add('character-details');\n  para.textContent = `${label}: ${text}`\n  return para;\n};\n\nCharacterView.prototype.createImg = function (src) {\n  const img = document.createElement('img');\n  img.classList.add('character-image');\n  img.src = src;\n  return img;\n};\n\nmodule.exports = CharacterView;\n\n\n//# sourceURL=webpack:///./src/views/character_view.js?");

/***/ })

/******/ });