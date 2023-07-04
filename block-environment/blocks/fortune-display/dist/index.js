/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 759:
/***/ (() => {

/* src/index.js
 * The JavaScript configuration file for the Fortune Display block.
 * This block will display a random fortune from the current site's
 * collection of fortune custom posts.
 * 
 * This file includes the code we write for telling WordPress
 * how the block should behave in the Block Editor.
 * */

// Grabs registerBlockType from wp.blocks (wp-blocks package, see presentation.php)
var registerBlockType = wp.blocks.registerBlockType;

/* Grabs the serverSideRender component from the wp object
 * and gives it the alias ServerSideRender (components should be uppercased).
 * This is useful for displaying blocks in the editor that we render with PHP.
 * (Part of the wp-server-side-render render package, see fortune-display.php.)
 * */
var _wp = wp,
  ServerSideRender = _wp.serverSideRender;

/* Grabs the InspectorControls component rendering on the right-side panel in the Block Editor.
 * Part of wp.blockEditor (wp-block-editor package, see presentation.php)
 * */
var InspectorControls = wp.blockEditor.InspectorControls;

/* Grabs more components for laying out the block and manipulating attributes.
 * These are all part of wp.components (wp-components package, see presentation.php)
 * */
var _wp$components = wp.components,
  TextControl = _wp$components.TextControl,
  Panel = _wp$components.Panel,
  PanelRow = _wp$components.PanelRow,
  PanelBody = _wp$components.PanelBody;

/* This is where we register the block in our JavaScript.
 * Arg 1 is the name of the block. Generally 'plugin/block'.
 * Make sure you use the same name in your PHP file (see presentation.php)
 * */
registerBlockType('block-environment/fortune-display', {
  title: 'Fortune',
  category: 'theme',
  attributes: {
    prefix: {
      type: 'string',
      "default": 'Fortune'
    }
  },
  /* edit: this property handles how the block appears in the editor, 
   * and how the author will manipulate the block's attributes.
   * */
  edit: function edit(_ref) {
    var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;
    return wp.element.createElement("div", null, wp.element.createElement(ServerSideRender, {
      block: "block-environment/fortune-display",
      attributes: attributes
    }), wp.element.createElement(InspectorControls, null, wp.element.createElement(Panel, null, wp.element.createElement(PanelBody, null, wp.element.createElement(PanelRow, null, wp.element.createElement(TextControl, {
      label: "Prefix",
      value: attributes.prefix,
      onChange: function onChange(newValue) {
        return setAttributes({
          prefix: newValue
        });
      }
    }))))));
  },
  /* save: this property handles how the block appears on the front-end of WordPress.
   * In this case, we return null, as we're rendering this block with PHP.
   * */
  save: function save(props) {
    return null;
  }
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(759);
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_src_index__WEBPACK_IMPORTED_MODULE_0__);
/* backend.js 
 * Webpack will read the files you import
 * and use babel for transpiling your JSX and ES6 
 * into code that most browsers can read. 
 * It will also process your SASS code into minified CSS.
 * */


})();

/******/ })()
;
//# sourceMappingURL=index.js.map