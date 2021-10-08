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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 49);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGraph = exports.canUse32BitsIndices = exports.extractPixel = exports.matrixFromCamera = exports.getCorrectionRatio = exports.floatColor = exports.zIndexOrdering = exports.createNormalizationFunction = exports.getPixelRatio = exports.createElement = exports.cancelFrame = exports.requestFrame = exports.assignDeep = exports.isPlainObject = void 0;
var is_graph_1 = __importDefault(__webpack_require__(140));
var matrices_1 = __webpack_require__(41);
/**
 * Checks whether the given value is a plain object.
 *
 * @param  {mixed}   value - Target value.
 * @return {boolean}
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
function isPlainObject(value) {
    return typeof value === "object" && value !== null && value.constructor === Object;
}
exports.isPlainObject = isPlainObject;
/**
 * Very simple recursive Object.assign-like function.
 *
 * @param  {object} target       - First object.
 * @param  {object} [...objects] - Objects to merge.
 * @return {object}
 */
function assignDeep(target) {
    var objects = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        objects[_i - 1] = arguments[_i];
    }
    target = target || {};
    for (var i = 0, l = objects.length; i < l; i++) {
        var o = objects[i];
        if (!o)
            continue;
        for (var k in o) {
            if (isPlainObject(o[k])) {
                target[k] = assignDeep(target[k], o[k]);
            }
            else {
                target[k] = o[k];
            }
        }
    }
    return target;
}
exports.assignDeep = assignDeep;
/**
 * Just some dirty trick to make requestAnimationFrame and cancelAnimationFrame "work" in Node.js, for unit tests:
 */
exports.requestFrame = typeof requestAnimationFrame !== "undefined"
    ? function (callback) { return requestAnimationFrame(callback); }
    : function (callback) { return setTimeout(callback, 0); };
exports.cancelFrame = typeof cancelAnimationFrame !== "undefined"
    ? function (requestID) { return cancelAnimationFrame(requestID); }
    : function (requestID) { return clearTimeout(requestID); };
/**
 * Function used to create DOM elements easily.
 *
 * @param  {string} tag        - Tag name of the element to create.
 * @param  {object} style      - Styles map.
 * @param  {object} attributes - Attributes map.
 * @return {HTMLElement}
 */
function createElement(tag, style, attributes) {
    var element = document.createElement(tag);
    if (style) {
        for (var k in style) {
            element.style[k] = style[k];
        }
    }
    if (attributes) {
        for (var k in attributes) {
            element.setAttribute(k, attributes[k]);
        }
    }
    return element;
}
exports.createElement = createElement;
/**
 * Function returning the browser's pixel ratio.
 *
 * @return {number}
 */
function getPixelRatio() {
    if (typeof window.devicePixelRatio !== "undefined")
        return window.devicePixelRatio;
    return 1;
}
exports.getPixelRatio = getPixelRatio;
function createNormalizationFunction(extent) {
    var _a = __read(extent.x, 2), minX = _a[0], maxX = _a[1], _b = __read(extent.y, 2), minY = _b[0], maxY = _b[1];
    var ratio = Math.max(maxX - minX, maxY - minY);
    if (ratio === 0)
        ratio = 1;
    var dX = (maxX + minX) / 2, dY = (maxY + minY) / 2;
    var fn = function (data) {
        return {
            x: 0.5 + (data.x - dX) / ratio,
            y: 0.5 + (data.y - dY) / ratio,
        };
    };
    // TODO: possibility to apply this in batch over array of indices
    fn.applyTo = function (data) {
        data.x = 0.5 + (data.x - dX) / ratio;
        data.y = 0.5 + (data.y - dY) / ratio;
    };
    fn.inverse = function (data) {
        return {
            x: dX + ratio * (data.x - 0.5),
            y: dY + ratio * (data.y - 0.5),
        };
    };
    fn.ratio = ratio;
    return fn;
}
exports.createNormalizationFunction = createNormalizationFunction;
/**
 * Function ordering the given elements in reverse z-order so they drawn
 * the correct way.
 *
 * @param  {number}   extent   - [min, max] z values.
 * @param  {function} getter   - Z attribute getter function.
 * @param  {array}    elements - The array to sort.
 * @return {array} - The sorted array.
 */
function zIndexOrdering(extent, getter, elements) {
    // If k is > n, we'll use a standard sort
    return elements.sort(function (a, b) {
        var zA = getter(a) || 0, zB = getter(b) || 0;
        if (zA < zB)
            return -1;
        if (zA > zB)
            return 1;
        return 0;
    });
    // TODO: counting sort optimization
}
exports.zIndexOrdering = zIndexOrdering;
/**
 * WebGL utils
 * ===========
 */
/**
 * Memoized function returning a float-encoded color from various string
 * formats describing colors.
 */
var FLOAT_COLOR_CACHE = {};
var INT8 = new Int8Array(4);
var INT32 = new Int32Array(INT8.buffer, 0, 1);
var FLOAT32 = new Float32Array(INT8.buffer, 0, 1);
var RGBA_TEST_REGEX = /^\s*rgba?\s*\(/;
var RGBA_EXTRACT_REGEX = /^\s*rgba?\s*\(\s*([0-9]*)\s*,\s*([0-9]*)\s*,\s*([0-9]*)(?:\s*,\s*(.*)?)?\)\s*$/;
function floatColor(val) {
    // If the color is already computed, we yield it
    if (typeof FLOAT_COLOR_CACHE[val] !== "undefined")
        return FLOAT_COLOR_CACHE[val];
    var r = 0, g = 0, b = 0, a = 1;
    // Handling hexadecimal notation
    if (val[0] === "#") {
        if (val.length === 4) {
            r = parseInt(val.charAt(1) + val.charAt(1), 16);
            g = parseInt(val.charAt(2) + val.charAt(2), 16);
            b = parseInt(val.charAt(3) + val.charAt(3), 16);
        }
        else {
            r = parseInt(val.charAt(1) + val.charAt(2), 16);
            g = parseInt(val.charAt(3) + val.charAt(4), 16);
            b = parseInt(val.charAt(5) + val.charAt(6), 16);
        }
    }
    // Handling rgb notation
    else if (RGBA_TEST_REGEX.test(val)) {
        var match = val.match(RGBA_EXTRACT_REGEX);
        if (match) {
            r = +match[1];
            g = +match[2];
            b = +match[3];
            if (match[4])
                a = +match[4];
        }
    }
    a = (a * 255) | 0;
    INT32[0] = ((a << 24) | (b << 16) | (g << 8) | r) & 0xfeffffff;
    var color = FLOAT32[0];
    FLOAT_COLOR_CACHE[val] = color;
    return color;
}
exports.floatColor = floatColor;
/**
 * In sigma, the graph is normalized into a [0, 1], [0, 1] square, before being given to the various renderers. This
 * helps dealing with quadtree in particular.
 * But at some point, we need to rescale it so that it takes the best place in the screen, ie. we always want to see two
 * nodes "touching" opposite sides of the graph, with the camera being at its default state.
 *
 * This function determines this ratio.
 */
function getCorrectionRatio(viewportDimensions, graphDimensions) {
    var viewportRatio = viewportDimensions.height / viewportDimensions.width;
    var graphRatio = graphDimensions.height / graphDimensions.width;
    // If the stage and the graphs are in different directions (such as the graph being wider that tall while the stage
    // is taller than wide), we can stop here to have indeed nodes touching opposite sides:
    if ((viewportRatio < 1 && graphRatio > 1) || (viewportRatio > 1 && graphRatio < 1)) {
        return 1;
    }
    // Else, we need to fit the graph inside the stage:
    // 1. If the graph is "squarer" (ie. with a ratio closer to 1), we need to make the largest sides touch;
    // 2. If the stage is "squarer", we need to make the smallest sides touch.
    return Math.min(Math.max(graphRatio, 1 / graphRatio), Math.max(1 / viewportRatio, viewportRatio));
}
exports.getCorrectionRatio = getCorrectionRatio;
/**
 * Function returning a matrix from the current state of the camera.
 */
// TODO: it's possible to optimize this drastically!
function matrixFromCamera(state, viewportDimensions, graphDimensions, padding, inverse) {
    var angle = state.angle, ratio = state.ratio, x = state.x, y = state.y;
    var width = viewportDimensions.width, height = viewportDimensions.height;
    var matrix = (0, matrices_1.identity)();
    var smallestDimension = Math.min(width, height) - 2 * padding;
    var correctionRatio = getCorrectionRatio(viewportDimensions, graphDimensions);
    if (!inverse) {
        (0, matrices_1.multiply)(matrix, (0, matrices_1.scale)((0, matrices_1.identity)(), 2 * (smallestDimension / width) * correctionRatio, 2 * (smallestDimension / height) * correctionRatio));
        (0, matrices_1.multiply)(matrix, (0, matrices_1.rotate)((0, matrices_1.identity)(), -angle));
        (0, matrices_1.multiply)(matrix, (0, matrices_1.scale)((0, matrices_1.identity)(), 1 / ratio));
        (0, matrices_1.multiply)(matrix, (0, matrices_1.translate)((0, matrices_1.identity)(), -x, -y));
    }
    else {
        (0, matrices_1.multiply)(matrix, (0, matrices_1.translate)((0, matrices_1.identity)(), x, y));
        (0, matrices_1.multiply)(matrix, (0, matrices_1.scale)((0, matrices_1.identity)(), ratio));
        (0, matrices_1.multiply)(matrix, (0, matrices_1.rotate)((0, matrices_1.identity)(), angle));
        (0, matrices_1.multiply)(matrix, (0, matrices_1.scale)((0, matrices_1.identity)(), width / smallestDimension / 2 / correctionRatio, height / smallestDimension / 2 / correctionRatio));
    }
    return matrix;
}
exports.matrixFromCamera = matrixFromCamera;
/**
 * Function extracting the color at the given pixel.
 */
function extractPixel(gl, x, y, array) {
    var data = array || new Uint8Array(4);
    gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, data);
    return data;
}
exports.extractPixel = extractPixel;
/**
 * Function used to know whether given webgl context can use 32 bits indices.
 */
function canUse32BitsIndices(gl) {
    var webgl2 = typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext;
    return webgl2 || !!gl.getExtension("OES_element_index_uint");
}
exports.canUse32BitsIndices = canUse32BitsIndices;
/**
 * Check if the graph variable is a valid graph, and if sigma can render it.
 */
function validateGraph(graph) {
    // check if it's a valid graphology instance
    if (!(0, is_graph_1.default)(graph))
        throw new Error("Sigma: invalid graph instance.");
    // check if nodes have x/y attributes
    graph.forEachNode(function (key, attributes) {
        if (!Number.isFinite(attributes.x) || !Number.isFinite(attributes.y)) {
            throw new Error("Sigma: Coordinates of node " + key + " are invalid. A node must have a numeric 'x' and 'y' attribute.");
        }
    });
}
exports.validateGraph = validateGraph;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(22);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(21),
    getRawTag = __webpack_require__(58),
    objectToString = __webpack_require__(59);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var listCacheClear = __webpack_require__(67),
    listCacheDelete = __webpack_require__(68),
    listCacheGet = __webpack_require__(69),
    listCacheHas = __webpack_require__(70),
    listCacheSet = __webpack_require__(71);

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(7);

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(11);

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var isKeyable = __webpack_require__(86);

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEdgeCompoundProgram = exports.AbstractEdgeProgram = void 0;
/**
 * Sigma.js WebGL Abstract Edge Program
 * =====================================
 *
 * @module
 */
var program_1 = __webpack_require__(47);
/**
 * Edge Program class.
 *
 * @constructor
 */
var AbstractEdgeProgram = /** @class */ (function (_super) {
    __extends(AbstractEdgeProgram, _super);
    function AbstractEdgeProgram(gl, vertexShaderSource, fragmentShaderSource, points, attributes) {
        return _super.call(this, gl, vertexShaderSource, fragmentShaderSource, points, attributes) || this;
    }
    return AbstractEdgeProgram;
}(program_1.AbstractProgram));
exports.AbstractEdgeProgram = AbstractEdgeProgram;
function createEdgeCompoundProgram(programClasses) {
    return /** @class */ (function () {
        function EdgeCompoundProgram(gl) {
            this.programs = programClasses.map(function (ProgramClass) { return new ProgramClass(gl); });
        }
        EdgeCompoundProgram.prototype.bufferData = function () {
            this.programs.forEach(function (program) { return program.bufferData(); });
        };
        EdgeCompoundProgram.prototype.allocate = function (capacity) {
            this.programs.forEach(function (program) { return program.allocate(capacity); });
        };
        EdgeCompoundProgram.prototype.bind = function () {
            // nothing todo, it's already done in each program constructor
        };
        EdgeCompoundProgram.prototype.computeIndices = function () {
            this.programs.forEach(function (program) { return program.computeIndices(); });
        };
        EdgeCompoundProgram.prototype.render = function (params) {
            this.programs.forEach(function (program) {
                program.bind();
                program.bufferData();
                program.render(params);
            });
        };
        EdgeCompoundProgram.prototype.process = function (sourceData, targetData, data, hidden, offset) {
            this.programs.forEach(function (program) { return program.process(sourceData, targetData, data, hidden, offset); });
        };
        return EdgeCompoundProgram;
    }());
}
exports.createEdgeCompoundProgram = createEdgeCompoundProgram;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(56),
    getValue = __webpack_require__(63);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(4),
    isObject = __webpack_require__(0);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(20);

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(12),
    isLength = __webpack_require__(30);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),
/* 17 */
/***/ (function(module, exports) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(19),
    overRest = __webpack_require__(52),
    setToString = __webpack_require__(53);

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(11);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(2);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(57)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var Stack = __webpack_require__(66),
    assignMergeValue = __webpack_require__(25),
    baseFor = __webpack_require__(90),
    baseMergeDeep = __webpack_require__(92),
    isObject = __webpack_require__(0),
    keysIn = __webpack_require__(34),
    safeGet = __webpack_require__(33);

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    stack || (stack = new Stack);
    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

module.exports = baseMerge;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(11),
    root = __webpack_require__(2);

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(13),
    eq = __webpack_require__(7);

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignMergeValue;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var overArg = __webpack_require__(100);

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ }),
/* 27 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(101),
    isObjectLike = __webpack_require__(3);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),
/* 29 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 30 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(2),
    stubFalse = __webpack_require__(103);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)(module)))

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(105),
    baseUnary = __webpack_require__(106),
    nodeUtil = __webpack_require__(107);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),
/* 33 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(object, key) {
  if (key === 'constructor' && typeof object[key] === 'function') {
    return;
  }

  if (key == '__proto__') {
    return;
  }

  return object[key];
}

module.exports = safeGet;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(111),
    baseKeysIn = __webpack_require__(113),
    isArrayLike = __webpack_require__(15);

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),
/* 36 */
/***/ (function(module, exports) {

/**
 * Graphology isGraph
 * ===================
 *
 * Very simple function aiming at ensuring the given variable is a
 * graphology instance.
 */

/**
 * Checking the value is a graphology instance.
 *
 * @param  {any}     value - Target value.
 * @return {boolean}
 */
module.exports = function isGraph(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.addUndirectedEdgeWithKey === 'function' &&
    typeof value.dropNode === 'function' &&
    typeof value.multi === 'boolean'
  );
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

function copy(src,dest){
	for(var p in src){
		dest[p] = src[p];
	}
}
/**
^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
 */
function _extends(Class,Super){
	var pt = Class.prototype;
	if(!(pt instanceof Super)){
		function t(){};
		t.prototype = Super.prototype;
		t = new t();
		copy(pt,t);
		Class.prototype = pt = t;
	}
	if(pt.constructor != Class){
		if(typeof Class != 'function'){
			console.error("unknow Class:"+Class)
		}
		pt.constructor = Class
	}
}
var htmlns = 'http://www.w3.org/1999/xhtml' ;
// Node Types
var NodeType = {}
var ELEMENT_NODE                = NodeType.ELEMENT_NODE                = 1;
var ATTRIBUTE_NODE              = NodeType.ATTRIBUTE_NODE              = 2;
var TEXT_NODE                   = NodeType.TEXT_NODE                   = 3;
var CDATA_SECTION_NODE          = NodeType.CDATA_SECTION_NODE          = 4;
var ENTITY_REFERENCE_NODE       = NodeType.ENTITY_REFERENCE_NODE       = 5;
var ENTITY_NODE                 = NodeType.ENTITY_NODE                 = 6;
var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
var COMMENT_NODE                = NodeType.COMMENT_NODE                = 8;
var DOCUMENT_NODE               = NodeType.DOCUMENT_NODE               = 9;
var DOCUMENT_TYPE_NODE          = NodeType.DOCUMENT_TYPE_NODE          = 10;
var DOCUMENT_FRAGMENT_NODE      = NodeType.DOCUMENT_FRAGMENT_NODE      = 11;
var NOTATION_NODE               = NodeType.NOTATION_NODE               = 12;

// ExceptionCode
var ExceptionCode = {}
var ExceptionMessage = {};
var INDEX_SIZE_ERR              = ExceptionCode.INDEX_SIZE_ERR              = ((ExceptionMessage[1]="Index size error"),1);
var DOMSTRING_SIZE_ERR          = ExceptionCode.DOMSTRING_SIZE_ERR          = ((ExceptionMessage[2]="DOMString size error"),2);
var HIERARCHY_REQUEST_ERR       = ExceptionCode.HIERARCHY_REQUEST_ERR       = ((ExceptionMessage[3]="Hierarchy request error"),3);
var WRONG_DOCUMENT_ERR          = ExceptionCode.WRONG_DOCUMENT_ERR          = ((ExceptionMessage[4]="Wrong document"),4);
var INVALID_CHARACTER_ERR       = ExceptionCode.INVALID_CHARACTER_ERR       = ((ExceptionMessage[5]="Invalid character"),5);
var NO_DATA_ALLOWED_ERR         = ExceptionCode.NO_DATA_ALLOWED_ERR         = ((ExceptionMessage[6]="No data allowed"),6);
var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = ((ExceptionMessage[7]="No modification allowed"),7);
var NOT_FOUND_ERR               = ExceptionCode.NOT_FOUND_ERR               = ((ExceptionMessage[8]="Not found"),8);
var NOT_SUPPORTED_ERR           = ExceptionCode.NOT_SUPPORTED_ERR           = ((ExceptionMessage[9]="Not supported"),9);
var INUSE_ATTRIBUTE_ERR         = ExceptionCode.INUSE_ATTRIBUTE_ERR         = ((ExceptionMessage[10]="Attribute in use"),10);
//level2
var INVALID_STATE_ERR        	= ExceptionCode.INVALID_STATE_ERR        	= ((ExceptionMessage[11]="Invalid state"),11);
var SYNTAX_ERR               	= ExceptionCode.SYNTAX_ERR               	= ((ExceptionMessage[12]="Syntax error"),12);
var INVALID_MODIFICATION_ERR 	= ExceptionCode.INVALID_MODIFICATION_ERR 	= ((ExceptionMessage[13]="Invalid modification"),13);
var NAMESPACE_ERR            	= ExceptionCode.NAMESPACE_ERR           	= ((ExceptionMessage[14]="Invalid namespace"),14);
var INVALID_ACCESS_ERR       	= ExceptionCode.INVALID_ACCESS_ERR      	= ((ExceptionMessage[15]="Invalid access"),15);

/**
 * DOM Level 2
 * Object DOMException
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 */
function DOMException(code, message) {
	if(message instanceof Error){
		var error = message;
	}else{
		error = this;
		Error.call(this, ExceptionMessage[code]);
		this.message = ExceptionMessage[code];
		if(Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
	}
	error.code = code;
	if(message) this.message = this.message + ": " + message;
	return error;
};
DOMException.prototype = Error.prototype;
copy(ExceptionCode,DOMException)
/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
 * The items in the NodeList are accessible via an integral index, starting from 0.
 */
function NodeList() {
};
NodeList.prototype = {
	/**
	 * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
	 * @standard level1
	 */
	length:0, 
	/**
	 * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
	 * @standard level1
	 * @param index  unsigned long 
	 *   Index into the collection.
	 * @return Node
	 * 	The node at the indexth position in the NodeList, or null if that is not a valid index. 
	 */
	item: function(index) {
		return this[index] || null;
	},
	toString:function(isHTML,nodeFilter){
		for(var buf = [], i = 0;i<this.length;i++){
			serializeToString(this[i],buf,isHTML,nodeFilter);
		}
		return buf.join('');
	}
};
function LiveNodeList(node,refresh){
	this._node = node;
	this._refresh = refresh
	_updateLiveList(this);
}
function _updateLiveList(list){
	var inc = list._node._inc || list._node.ownerDocument._inc;
	if(list._inc != inc){
		var ls = list._refresh(list._node);
		//console.log(ls.length)
		__set__(list,'length',ls.length);
		copy(ls,list);
		list._inc = inc;
	}
}
LiveNodeList.prototype.item = function(i){
	_updateLiveList(this);
	return this[i];
}

_extends(LiveNodeList,NodeList);
/**
 * 
 * Objects implementing the NamedNodeMap interface are used to represent collections of nodes that can be accessed by name. Note that NamedNodeMap does not inherit from NodeList; NamedNodeMaps are not maintained in any particular order. Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index, but this is simply to allow convenient enumeration of the contents of a NamedNodeMap, and does not imply that the DOM specifies an order to these Nodes.
 * NamedNodeMap objects in the DOM are live.
 * used for attributes or DocumentType entities 
 */
function NamedNodeMap() {
};

function _findNodeIndex(list,node){
	var i = list.length;
	while(i--){
		if(list[i] === node){return i}
	}
}

function _addNamedNode(el,list,newAttr,oldAttr){
	if(oldAttr){
		list[_findNodeIndex(list,oldAttr)] = newAttr;
	}else{
		list[list.length++] = newAttr;
	}
	if(el){
		newAttr.ownerElement = el;
		var doc = el.ownerDocument;
		if(doc){
			oldAttr && _onRemoveAttribute(doc,el,oldAttr);
			_onAddAttribute(doc,el,newAttr);
		}
	}
}
function _removeNamedNode(el,list,attr){
	//console.log('remove attr:'+attr)
	var i = _findNodeIndex(list,attr);
	if(i>=0){
		var lastIndex = list.length-1
		while(i<lastIndex){
			list[i] = list[++i]
		}
		list.length = lastIndex;
		if(el){
			var doc = el.ownerDocument;
			if(doc){
				_onRemoveAttribute(doc,el,attr);
				attr.ownerElement = null;
			}
		}
	}else{
		throw DOMException(NOT_FOUND_ERR,new Error(el.tagName+'@'+attr))
	}
}
NamedNodeMap.prototype = {
	length:0,
	item:NodeList.prototype.item,
	getNamedItem: function(key) {
//		if(key.indexOf(':')>0 || key == 'xmlns'){
//			return null;
//		}
		//console.log()
		var i = this.length;
		while(i--){
			var attr = this[i];
			//console.log(attr.nodeName,key)
			if(attr.nodeName == key){
				return attr;
			}
		}
	},
	setNamedItem: function(attr) {
		var el = attr.ownerElement;
		if(el && el!=this._ownerElement){
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		var oldAttr = this.getNamedItem(attr.nodeName);
		_addNamedNode(this._ownerElement,this,attr,oldAttr);
		return oldAttr;
	},
	/* returns Node */
	setNamedItemNS: function(attr) {// raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
		var el = attr.ownerElement, oldAttr;
		if(el && el!=this._ownerElement){
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		oldAttr = this.getNamedItemNS(attr.namespaceURI,attr.localName);
		_addNamedNode(this._ownerElement,this,attr,oldAttr);
		return oldAttr;
	},

	/* returns Node */
	removeNamedItem: function(key) {
		var attr = this.getNamedItem(key);
		_removeNamedNode(this._ownerElement,this,attr);
		return attr;
		
		
	},// raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
	
	//for level2
	removeNamedItemNS:function(namespaceURI,localName){
		var attr = this.getNamedItemNS(namespaceURI,localName);
		_removeNamedNode(this._ownerElement,this,attr);
		return attr;
	},
	getNamedItemNS: function(namespaceURI, localName) {
		var i = this.length;
		while(i--){
			var node = this[i];
			if(node.localName == localName && node.namespaceURI == namespaceURI){
				return node;
			}
		}
		return null;
	}
};
/**
 * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
 */
function DOMImplementation(/* Object */ features) {
	this._features = {};
	if (features) {
		for (var feature in features) {
			 this._features = features[feature];
		}
	}
};

DOMImplementation.prototype = {
	hasFeature: function(/* string */ feature, /* string */ version) {
		var versions = this._features[feature.toLowerCase()];
		if (versions && (!version || version in versions)) {
			return true;
		} else {
			return false;
		}
	},
	// Introduced in DOM Level 2:
	createDocument:function(namespaceURI,  qualifiedName, doctype){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
		var doc = new Document();
		doc.implementation = this;
		doc.childNodes = new NodeList();
		doc.doctype = doctype;
		if(doctype){
			doc.appendChild(doctype);
		}
		if(qualifiedName){
			var root = doc.createElementNS(namespaceURI,qualifiedName);
			doc.appendChild(root);
		}
		return doc;
	},
	// Introduced in DOM Level 2:
	createDocumentType:function(qualifiedName, publicId, systemId){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
		var node = new DocumentType();
		node.name = qualifiedName;
		node.nodeName = qualifiedName;
		node.publicId = publicId;
		node.systemId = systemId;
		// Introduced in DOM Level 2:
		//readonly attribute DOMString        internalSubset;
		
		//TODO:..
		//  readonly attribute NamedNodeMap     entities;
		//  readonly attribute NamedNodeMap     notations;
		return node;
	}
};


/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 */

function Node() {
};

Node.prototype = {
	firstChild : null,
	lastChild : null,
	previousSibling : null,
	nextSibling : null,
	attributes : null,
	parentNode : null,
	childNodes : null,
	ownerDocument : null,
	nodeValue : null,
	namespaceURI : null,
	prefix : null,
	localName : null,
	// Modified in DOM Level 2:
	insertBefore:function(newChild, refChild){//raises 
		return _insertBefore(this,newChild,refChild);
	},
	replaceChild:function(newChild, oldChild){//raises 
		this.insertBefore(newChild,oldChild);
		if(oldChild){
			this.removeChild(oldChild);
		}
	},
	removeChild:function(oldChild){
		return _removeChild(this,oldChild);
	},
	appendChild:function(newChild){
		return this.insertBefore(newChild,null);
	},
	hasChildNodes:function(){
		return this.firstChild != null;
	},
	cloneNode:function(deep){
		return cloneNode(this.ownerDocument||this,this,deep);
	},
	// Modified in DOM Level 2:
	normalize:function(){
		var child = this.firstChild;
		while(child){
			var next = child.nextSibling;
			if(next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE){
				this.removeChild(next);
				child.appendData(next.data);
			}else{
				child.normalize();
				child = next;
			}
		}
	},
  	// Introduced in DOM Level 2:
	isSupported:function(feature, version){
		return this.ownerDocument.implementation.hasFeature(feature,version);
	},
    // Introduced in DOM Level 2:
    hasAttributes:function(){
    	return this.attributes.length>0;
    },
    lookupPrefix:function(namespaceURI){
    	var el = this;
    	while(el){
    		var map = el._nsMap;
    		//console.dir(map)
    		if(map){
    			for(var n in map){
    				if(map[n] == namespaceURI){
    					return n;
    				}
    			}
    		}
    		el = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;
    	}
    	return null;
    },
    // Introduced in DOM Level 3:
    lookupNamespaceURI:function(prefix){
    	var el = this;
    	while(el){
    		var map = el._nsMap;
    		//console.dir(map)
    		if(map){
    			if(prefix in map){
    				return map[prefix] ;
    			}
    		}
    		el = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;
    	}
    	return null;
    },
    // Introduced in DOM Level 3:
    isDefaultNamespace:function(namespaceURI){
    	var prefix = this.lookupPrefix(namespaceURI);
    	return prefix == null;
    }
};


function _xmlEncoder(c){
	return c == '<' && '&lt;' ||
         c == '>' && '&gt;' ||
         c == '&' && '&amp;' ||
         c == '"' && '&quot;' ||
         '&#'+c.charCodeAt()+';'
}


copy(NodeType,Node);
copy(NodeType,Node.prototype);

/**
 * @param callback return true for continue,false for break
 * @return boolean true: break visit;
 */
function _visitNode(node,callback){
	if(callback(node)){
		return true;
	}
	if(node = node.firstChild){
		do{
			if(_visitNode(node,callback)){return true}
        }while(node=node.nextSibling)
    }
}



function Document(){
}
function _onAddAttribute(doc,el,newAttr){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns == 'http://www.w3.org/2000/xmlns/'){
		//update namespace
		el._nsMap[newAttr.prefix?newAttr.localName:''] = newAttr.value
	}
}
function _onRemoveAttribute(doc,el,newAttr,remove){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns == 'http://www.w3.org/2000/xmlns/'){
		//update namespace
		delete el._nsMap[newAttr.prefix?newAttr.localName:'']
	}
}
function _onUpdateChild(doc,el,newChild){
	if(doc && doc._inc){
		doc._inc++;
		//update childNodes
		var cs = el.childNodes;
		if(newChild){
			cs[cs.length++] = newChild;
		}else{
			//console.log(1)
			var child = el.firstChild;
			var i = 0;
			while(child){
				cs[i++] = child;
				child =child.nextSibling;
			}
			cs.length = i;
		}
	}
}

/**
 * attributes;
 * children;
 * 
 * writeable properties:
 * nodeValue,Attr:value,CharacterData:data
 * prefix
 */
function _removeChild(parentNode,child){
	var previous = child.previousSibling;
	var next = child.nextSibling;
	if(previous){
		previous.nextSibling = next;
	}else{
		parentNode.firstChild = next
	}
	if(next){
		next.previousSibling = previous;
	}else{
		parentNode.lastChild = previous;
	}
	_onUpdateChild(parentNode.ownerDocument,parentNode);
	return child;
}
/**
 * preformance key(refChild == null)
 */
function _insertBefore(parentNode,newChild,nextChild){
	var cp = newChild.parentNode;
	if(cp){
		cp.removeChild(newChild);//remove and update
	}
	if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
		var newFirst = newChild.firstChild;
		if (newFirst == null) {
			return newChild;
		}
		var newLast = newChild.lastChild;
	}else{
		newFirst = newLast = newChild;
	}
	var pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;

	newFirst.previousSibling = pre;
	newLast.nextSibling = nextChild;
	
	
	if(pre){
		pre.nextSibling = newFirst;
	}else{
		parentNode.firstChild = newFirst;
	}
	if(nextChild == null){
		parentNode.lastChild = newLast;
	}else{
		nextChild.previousSibling = newLast;
	}
	do{
		newFirst.parentNode = parentNode;
	}while(newFirst !== newLast && (newFirst= newFirst.nextSibling))
	_onUpdateChild(parentNode.ownerDocument||parentNode,parentNode);
	//console.log(parentNode.lastChild.nextSibling == null)
	if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
		newChild.firstChild = newChild.lastChild = null;
	}
	return newChild;
}
function _appendSingleChild(parentNode,newChild){
	var cp = newChild.parentNode;
	if(cp){
		var pre = parentNode.lastChild;
		cp.removeChild(newChild);//remove and update
		var pre = parentNode.lastChild;
	}
	var pre = parentNode.lastChild;
	newChild.parentNode = parentNode;
	newChild.previousSibling = pre;
	newChild.nextSibling = null;
	if(pre){
		pre.nextSibling = newChild;
	}else{
		parentNode.firstChild = newChild;
	}
	parentNode.lastChild = newChild;
	_onUpdateChild(parentNode.ownerDocument,parentNode,newChild);
	return newChild;
	//console.log("__aa",parentNode.lastChild.nextSibling == null)
}
Document.prototype = {
	//implementation : null,
	nodeName :  '#document',
	nodeType :  DOCUMENT_NODE,
	doctype :  null,
	documentElement :  null,
	_inc : 1,
	
	insertBefore :  function(newChild, refChild){//raises 
		if(newChild.nodeType == DOCUMENT_FRAGMENT_NODE){
			var child = newChild.firstChild;
			while(child){
				var next = child.nextSibling;
				this.insertBefore(child,refChild);
				child = next;
			}
			return newChild;
		}
		if(this.documentElement == null && newChild.nodeType == ELEMENT_NODE){
			this.documentElement = newChild;
		}
		
		return _insertBefore(this,newChild,refChild),(newChild.ownerDocument = this),newChild;
	},
	removeChild :  function(oldChild){
		if(this.documentElement == oldChild){
			this.documentElement = null;
		}
		return _removeChild(this,oldChild);
	},
	// Introduced in DOM Level 2:
	importNode : function(importedNode,deep){
		return importNode(this,importedNode,deep);
	},
	// Introduced in DOM Level 2:
	getElementById :	function(id){
		var rtv = null;
		_visitNode(this.documentElement,function(node){
			if(node.nodeType == ELEMENT_NODE){
				if(node.getAttribute('id') == id){
					rtv = node;
					return true;
				}
			}
		})
		return rtv;
	},
	
	getElementsByClassName: function(className) {
		var pattern = new RegExp("(^|\\s)" + className + "(\\s|$)");
		return new LiveNodeList(this, function(base) {
			var ls = [];
			_visitNode(base.documentElement, function(node) {
				if(node !== base && node.nodeType == ELEMENT_NODE) {
					if(pattern.test(node.getAttribute('class'))) {
						ls.push(node);
					}
				}
			});
			return ls;
		});
	},
	
	//document factory method:
	createElement :	function(tagName){
		var node = new Element();
		node.ownerDocument = this;
		node.nodeName = tagName;
		node.tagName = tagName;
		node.childNodes = new NodeList();
		var attrs	= node.attributes = new NamedNodeMap();
		attrs._ownerElement = node;
		return node;
	},
	createDocumentFragment :	function(){
		var node = new DocumentFragment();
		node.ownerDocument = this;
		node.childNodes = new NodeList();
		return node;
	},
	createTextNode :	function(data){
		var node = new Text();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createComment :	function(data){
		var node = new Comment();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createCDATASection :	function(data){
		var node = new CDATASection();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createProcessingInstruction :	function(target,data){
		var node = new ProcessingInstruction();
		node.ownerDocument = this;
		node.tagName = node.target = target;
		node.nodeValue= node.data = data;
		return node;
	},
	createAttribute :	function(name){
		var node = new Attr();
		node.ownerDocument	= this;
		node.name = name;
		node.nodeName	= name;
		node.localName = name;
		node.specified = true;
		return node;
	},
	createEntityReference :	function(name){
		var node = new EntityReference();
		node.ownerDocument	= this;
		node.nodeName	= name;
		return node;
	},
	// Introduced in DOM Level 2:
	createElementNS :	function(namespaceURI,qualifiedName){
		var node = new Element();
		var pl = qualifiedName.split(':');
		var attrs	= node.attributes = new NamedNodeMap();
		node.childNodes = new NodeList();
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.tagName = qualifiedName;
		node.namespaceURI = namespaceURI;
		if(pl.length == 2){
			node.prefix = pl[0];
			node.localName = pl[1];
		}else{
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		attrs._ownerElement = node;
		return node;
	},
	// Introduced in DOM Level 2:
	createAttributeNS :	function(namespaceURI,qualifiedName){
		var node = new Attr();
		var pl = qualifiedName.split(':');
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.name = qualifiedName;
		node.namespaceURI = namespaceURI;
		node.specified = true;
		if(pl.length == 2){
			node.prefix = pl[0];
			node.localName = pl[1];
		}else{
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		return node;
	}
};
_extends(Document,Node);


function Element() {
	this._nsMap = {};
};
Element.prototype = {
	nodeType : ELEMENT_NODE,
	hasAttribute : function(name){
		return this.getAttributeNode(name)!=null;
	},
	getAttribute : function(name){
		var attr = this.getAttributeNode(name);
		return attr && attr.value || '';
	},
	getAttributeNode : function(name){
		return this.attributes.getNamedItem(name);
	},
	setAttribute : function(name, value){
		var attr = this.ownerDocument.createAttribute(name);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr)
	},
	removeAttribute : function(name){
		var attr = this.getAttributeNode(name)
		attr && this.removeAttributeNode(attr);
	},
	
	//four real opeartion method
	appendChild:function(newChild){
		if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
			return this.insertBefore(newChild,null);
		}else{
			return _appendSingleChild(this,newChild);
		}
	},
	setAttributeNode : function(newAttr){
		return this.attributes.setNamedItem(newAttr);
	},
	setAttributeNodeNS : function(newAttr){
		return this.attributes.setNamedItemNS(newAttr);
	},
	removeAttributeNode : function(oldAttr){
		//console.log(this == oldAttr.ownerElement)
		return this.attributes.removeNamedItem(oldAttr.nodeName);
	},
	//get real attribute name,and remove it by removeAttributeNode
	removeAttributeNS : function(namespaceURI, localName){
		var old = this.getAttributeNodeNS(namespaceURI, localName);
		old && this.removeAttributeNode(old);
	},
	
	hasAttributeNS : function(namespaceURI, localName){
		return this.getAttributeNodeNS(namespaceURI, localName)!=null;
	},
	getAttributeNS : function(namespaceURI, localName){
		var attr = this.getAttributeNodeNS(namespaceURI, localName);
		return attr && attr.value || '';
	},
	setAttributeNS : function(namespaceURI, qualifiedName, value){
		var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr)
	},
	getAttributeNodeNS : function(namespaceURI, localName){
		return this.attributes.getNamedItemNS(namespaceURI, localName);
	},
	
	getElementsByTagName : function(tagName){
		return new LiveNodeList(this,function(base){
			var ls = [];
			_visitNode(base,function(node){
				if(node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName)){
					ls.push(node);
				}
			});
			return ls;
		});
	},
	getElementsByTagNameNS : function(namespaceURI, localName){
		return new LiveNodeList(this,function(base){
			var ls = [];
			_visitNode(base,function(node){
				if(node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)){
					ls.push(node);
				}
			});
			return ls;
			
		});
	}
};
Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;


_extends(Element,Node);
function Attr() {
};
Attr.prototype.nodeType = ATTRIBUTE_NODE;
_extends(Attr,Node);


function CharacterData() {
};
CharacterData.prototype = {
	data : '',
	substringData : function(offset, count) {
		return this.data.substring(offset, offset+count);
	},
	appendData: function(text) {
		text = this.data+text;
		this.nodeValue = this.data = text;
		this.length = text.length;
	},
	insertData: function(offset,text) {
		this.replaceData(offset,0,text);
	
	},
	appendChild:function(newChild){
		throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR])
	},
	deleteData: function(offset, count) {
		this.replaceData(offset,count,"");
	},
	replaceData: function(offset, count, text) {
		var start = this.data.substring(0,offset);
		var end = this.data.substring(offset+count);
		text = start + text + end;
		this.nodeValue = this.data = text;
		this.length = text.length;
	}
}
_extends(CharacterData,Node);
function Text() {
};
Text.prototype = {
	nodeName : "#text",
	nodeType : TEXT_NODE,
	splitText : function(offset) {
		var text = this.data;
		var newText = text.substring(offset);
		text = text.substring(0, offset);
		this.data = this.nodeValue = text;
		this.length = text.length;
		var newNode = this.ownerDocument.createTextNode(newText);
		if(this.parentNode){
			this.parentNode.insertBefore(newNode, this.nextSibling);
		}
		return newNode;
	}
}
_extends(Text,CharacterData);
function Comment() {
};
Comment.prototype = {
	nodeName : "#comment",
	nodeType : COMMENT_NODE
}
_extends(Comment,CharacterData);

function CDATASection() {
};
CDATASection.prototype = {
	nodeName : "#cdata-section",
	nodeType : CDATA_SECTION_NODE
}
_extends(CDATASection,CharacterData);


function DocumentType() {
};
DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
_extends(DocumentType,Node);

function Notation() {
};
Notation.prototype.nodeType = NOTATION_NODE;
_extends(Notation,Node);

function Entity() {
};
Entity.prototype.nodeType = ENTITY_NODE;
_extends(Entity,Node);

function EntityReference() {
};
EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
_extends(EntityReference,Node);

function DocumentFragment() {
};
DocumentFragment.prototype.nodeName =	"#document-fragment";
DocumentFragment.prototype.nodeType =	DOCUMENT_FRAGMENT_NODE;
_extends(DocumentFragment,Node);


function ProcessingInstruction() {
}
ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
_extends(ProcessingInstruction,Node);
function XMLSerializer(){}
XMLSerializer.prototype.serializeToString = function(node,isHtml,nodeFilter){
	return nodeSerializeToString.call(node,isHtml,nodeFilter);
}
Node.prototype.toString = nodeSerializeToString;
function nodeSerializeToString(isHtml,nodeFilter){
	var buf = [];
	var refNode = this.nodeType == 9 && this.documentElement || this;
	var prefix = refNode.prefix;
	var uri = refNode.namespaceURI;
	
	if(uri && prefix == null){
		//console.log(prefix)
		var prefix = refNode.lookupPrefix(uri);
		if(prefix == null){
			//isHTML = true;
			var visibleNamespaces=[
			{namespace:uri,prefix:null}
			//{namespace:uri,prefix:''}
			]
		}
	}
	serializeToString(this,buf,isHtml,nodeFilter,visibleNamespaces);
	//console.log('###',this.nodeType,uri,prefix,buf.join(''))
	return buf.join('');
}
function needNamespaceDefine(node,isHTML, visibleNamespaces) {
	var prefix = node.prefix||'';
	var uri = node.namespaceURI;
	if (!prefix && !uri){
		return false;
	}
	if (prefix === "xml" && uri === "http://www.w3.org/XML/1998/namespace" 
		|| uri == 'http://www.w3.org/2000/xmlns/'){
		return false;
	}
	
	var i = visibleNamespaces.length 
	//console.log('@@@@',node.tagName,prefix,uri,visibleNamespaces)
	while (i--) {
		var ns = visibleNamespaces[i];
		// get namespace prefix
		//console.log(node.nodeType,node.tagName,ns.prefix,prefix)
		if (ns.prefix == prefix){
			return ns.namespace != uri;
		}
	}
	//console.log(isHTML,uri,prefix=='')
	//if(isHTML && prefix ==null && uri == 'http://www.w3.org/1999/xhtml'){
	//	return false;
	//}
	//node.flag = '11111'
	//console.error(3,true,node.flag,node.prefix,node.namespaceURI)
	return true;
}
function serializeToString(node,buf,isHTML,nodeFilter,visibleNamespaces){
	if(nodeFilter){
		node = nodeFilter(node);
		if(node){
			if(typeof node == 'string'){
				buf.push(node);
				return;
			}
		}else{
			return;
		}
		//buf.sort.apply(attrs, attributeSorter);
	}
	switch(node.nodeType){
	case ELEMENT_NODE:
		if (!visibleNamespaces) visibleNamespaces = [];
		var startVisibleNamespaces = visibleNamespaces.length;
		var attrs = node.attributes;
		var len = attrs.length;
		var child = node.firstChild;
		var nodeName = node.tagName;
		
		isHTML =  (htmlns === node.namespaceURI) ||isHTML 
		buf.push('<',nodeName);
		
		
		
		for(var i=0;i<len;i++){
			// add namespaces for attributes
			var attr = attrs.item(i);
			if (attr.prefix == 'xmlns') {
				visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
			}else if(attr.nodeName == 'xmlns'){
				visibleNamespaces.push({ prefix: '', namespace: attr.value });
			}
		}
		for(var i=0;i<len;i++){
			var attr = attrs.item(i);
			if (needNamespaceDefine(attr,isHTML, visibleNamespaces)) {
				var prefix = attr.prefix||'';
				var uri = attr.namespaceURI;
				var ns = prefix ? ' xmlns:' + prefix : " xmlns";
				buf.push(ns, '="' , uri , '"');
				visibleNamespaces.push({ prefix: prefix, namespace:uri });
			}
			serializeToString(attr,buf,isHTML,nodeFilter,visibleNamespaces);
		}
		// add namespace for current node		
		if (needNamespaceDefine(node,isHTML, visibleNamespaces)) {
			var prefix = node.prefix||'';
			var uri = node.namespaceURI;
			if (uri) {
				// Avoid empty namespace value like xmlns:ds=""
				// Empty namespace URL will we produce an invalid XML document
				var ns = prefix ? ' xmlns:' + prefix : " xmlns";
				buf.push(ns, '="' , uri , '"');
				visibleNamespaces.push({ prefix: prefix, namespace:uri });
			}
		}
		
		if(child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)){
			buf.push('>');
			//if is cdata child node
			if(isHTML && /^script$/i.test(nodeName)){
				while(child){
					if(child.data){
						buf.push(child.data);
					}else{
						serializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);
					}
					child = child.nextSibling;
				}
			}else
			{
				while(child){
					serializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);
					child = child.nextSibling;
				}
			}
			buf.push('</',nodeName,'>');
		}else{
			buf.push('/>');
		}
		// remove added visible namespaces
		//visibleNamespaces.length = startVisibleNamespaces;
		return;
	case DOCUMENT_NODE:
	case DOCUMENT_FRAGMENT_NODE:
		var child = node.firstChild;
		while(child){
			serializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);
			child = child.nextSibling;
		}
		return;
	case ATTRIBUTE_NODE:
		/**
		 * Well-formedness constraint: No < in Attribute Values
		 * The replacement text of any entity referred to directly or indirectly in an attribute value must not contain a <.
		 * @see https://www.w3.org/TR/xml/#CleanAttrVals
		 * @see https://www.w3.org/TR/xml/#NT-AttValue
		 */
		return buf.push(' ', node.name, '="', node.value.replace(/[<&"]/g,_xmlEncoder), '"');
	case TEXT_NODE:
		/**
		 * The ampersand character (&) and the left angle bracket (<) must not appear in their literal form,
		 * except when used as markup delimiters, or within a comment, a processing instruction, or a CDATA section.
		 * If they are needed elsewhere, they must be escaped using either numeric character references or the strings
		 * `&amp;` and `&lt;` respectively.
		 * The right angle bracket (>) may be represented using the string " &gt; ", and must, for compatibility,
		 * be escaped using either `&gt;` or a character reference when it appears in the string `]]>` in content,
		 * when that string is not marking the end of a CDATA section.
		 *
		 * In the content of elements, character data is any string of characters
		 * which does not contain the start-delimiter of any markup
		 * and does not include the CDATA-section-close delimiter, `]]>`.
		 *
		 * @see https://www.w3.org/TR/xml/#NT-CharData
		 */
		return buf.push(node.data
			.replace(/[<&]/g,_xmlEncoder)
			.replace(/]]>/g, ']]&gt;')
		);
	case CDATA_SECTION_NODE:
		return buf.push( '<![CDATA[',node.data,']]>');
	case COMMENT_NODE:
		return buf.push( "<!--",node.data,"-->");
	case DOCUMENT_TYPE_NODE:
		var pubid = node.publicId;
		var sysid = node.systemId;
		buf.push('<!DOCTYPE ',node.name);
		if(pubid){
			buf.push(' PUBLIC ', pubid);
			if (sysid && sysid!='.') {
				buf.push(' ', sysid);
			}
			buf.push('>');
		}else if(sysid && sysid!='.'){
			buf.push(' SYSTEM ', sysid, '>');
		}else{
			var sub = node.internalSubset;
			if(sub){
				buf.push(" [",sub,"]");
			}
			buf.push(">");
		}
		return;
	case PROCESSING_INSTRUCTION_NODE:
		return buf.push( "<?",node.target," ",node.data,"?>");
	case ENTITY_REFERENCE_NODE:
		return buf.push( '&',node.nodeName,';');
	//case ENTITY_NODE:
	//case NOTATION_NODE:
	default:
		buf.push('??',node.nodeName);
	}
}
function importNode(doc,node,deep){
	var node2;
	switch (node.nodeType) {
	case ELEMENT_NODE:
		node2 = node.cloneNode(false);
		node2.ownerDocument = doc;
		//var attrs = node2.attributes;
		//var len = attrs.length;
		//for(var i=0;i<len;i++){
			//node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
		//}
	case DOCUMENT_FRAGMENT_NODE:
		break;
	case ATTRIBUTE_NODE:
		deep = true;
		break;
	//case ENTITY_REFERENCE_NODE:
	//case PROCESSING_INSTRUCTION_NODE:
	////case TEXT_NODE:
	//case CDATA_SECTION_NODE:
	//case COMMENT_NODE:
	//	deep = false;
	//	break;
	//case DOCUMENT_NODE:
	//case DOCUMENT_TYPE_NODE:
	//cannot be imported.
	//case ENTITY_NODE:
	//case NOTATION_NODE：
	//can not hit in level3
	//default:throw e;
	}
	if(!node2){
		node2 = node.cloneNode(false);//false
	}
	node2.ownerDocument = doc;
	node2.parentNode = null;
	if(deep){
		var child = node.firstChild;
		while(child){
			node2.appendChild(importNode(doc,child,deep));
			child = child.nextSibling;
		}
	}
	return node2;
}
//
//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
//					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};
function cloneNode(doc,node,deep){
	var node2 = new node.constructor();
	for(var n in node){
		var v = node[n];
		if(typeof v != 'object' ){
			if(v != node2[n]){
				node2[n] = v;
			}
		}
	}
	if(node.childNodes){
		node2.childNodes = new NodeList();
	}
	node2.ownerDocument = doc;
	switch (node2.nodeType) {
	case ELEMENT_NODE:
		var attrs	= node.attributes;
		var attrs2	= node2.attributes = new NamedNodeMap();
		var len = attrs.length
		attrs2._ownerElement = node2;
		for(var i=0;i<len;i++){
			node2.setAttributeNode(cloneNode(doc,attrs.item(i),true));
		}
		break;;
	case ATTRIBUTE_NODE:
		deep = true;
	}
	if(deep){
		var child = node.firstChild;
		while(child){
			node2.appendChild(cloneNode(doc,child,deep));
			child = child.nextSibling;
		}
	}
	return node2;
}

function __set__(object,key,value){
	object[key] = value
}
//do dynamic
try{
	if(Object.defineProperty){
		Object.defineProperty(LiveNodeList.prototype,'length',{
			get:function(){
				_updateLiveList(this);
				return this.$$length;
			}
		});
		Object.defineProperty(Node.prototype,'textContent',{
			get:function(){
				return getTextContent(this);
			},
			set:function(data){
				switch(this.nodeType){
				case ELEMENT_NODE:
				case DOCUMENT_FRAGMENT_NODE:
					while(this.firstChild){
						this.removeChild(this.firstChild);
					}
					if(data || String(data)){
						this.appendChild(this.ownerDocument.createTextNode(data));
					}
					break;
				default:
					//TODO:
					this.data = data;
					this.value = data;
					this.nodeValue = data;
				}
			}
		})
		
		function getTextContent(node){
			switch(node.nodeType){
			case ELEMENT_NODE:
			case DOCUMENT_FRAGMENT_NODE:
				var buf = [];
				node = node.firstChild;
				while(node){
					if(node.nodeType!==7 && node.nodeType !==8){
						buf.push(getTextContent(node));
					}
					node = node.nextSibling;
				}
				return buf.join('');
			default:
				return node.nodeValue;
			}
		}
		__set__ = function(object,key,value){
			//console.log(value)
			object['$$'+key] = value
		}
	}
}catch(e){//ie8
}

//if(typeof require == 'function'){
	exports.Node = Node;
	exports.DOMException = DOMException;
	exports.DOMImplementation = DOMImplementation;
	exports.XMLSerializer = XMLSerializer;
//}


/***/ }),
/* 38 */
/***/ (function(module, exports) {

/**
 * Graphology Common GEXF Helpers
 * ===============================
 *
 * Miscellaneous helpers used by both instance of the code.
 */

/**
 * Function used to cast a string value to the desired type.
 *
 * @param  {string} type - Value type.
 * @param  {string} type - String value.
 * @return {any}         - Parsed type.
 */
exports.cast = function(type, value) {
  switch (type) {
    case 'boolean':
      value = (value === 'true');
      break;

    case 'integer':
    case 'long':
    case 'float':
    case 'double':
      value = +value;
      break;

    case 'liststring':
      value = value ? value.split('|') : [];
      break;

    default:
  }

  return value;
};

/**
 * Function deleting illegal characters from a potential tag name to avoid
 * generating invalid XML.
 *
 * @param  {string} type - Tag name.
 * @return {string}
 */
var SANITIZE_PATTERN = /["'<>&\s]/g;

exports.sanitizeTagName = function sanitizeTagName(tagName) {
  return tagName.replace(SANITIZE_PATTERN, '').trim();
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

/**
 * Graphology isGraph
 * ===================
 *
 * Very simple function aiming at ensuring the given variable is a
 * graphology instance.
 */

/**
 * Checking the value is a graphology instance.
 *
 * @param  {any}     value - Target value.
 * @return {boolean}
 */
module.exports = function isGraph(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.addUndirectedEdgeWithKey === 'function' &&
    typeof value.dropNode === 'function' &&
    typeof value.multi === 'boolean'
  );
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sigma.js Camera Class
 * ======================
 *
 * Class designed to store camera information & used to update it.
 * @module
 */
var events_1 = __webpack_require__(16);
var animate_1 = __webpack_require__(139);
var easings_1 = __importDefault(__webpack_require__(42));
var utils_1 = __webpack_require__(1);
/**
 * Defaults.
 */
var DEFAULT_ZOOMING_RATIO = 1.5;
/**
 * Camera class
 *
 * @constructor
 */
var Camera = /** @class */ (function (_super) {
    __extends(Camera, _super);
    function Camera() {
        var _this = _super.call(this) || this;
        _this.x = 0.5;
        _this.y = 0.5;
        _this.angle = 0;
        _this.ratio = 1;
        _this.nextFrame = null;
        _this.previousState = null;
        _this.enabled = true;
        // State
        _this.previousState = _this.getState();
        return _this;
    }
    /**
     * Static method used to create a Camera object with a given state.
     *
     * @param state
     * @return {Camera}
     */
    Camera.from = function (state) {
        var camera = new Camera();
        return camera.setState(state);
    };
    /**
     * Method used to enable the camera.
     *
     * @return {Camera}
     */
    Camera.prototype.enable = function () {
        this.enabled = true;
        return this;
    };
    /**
     * Method used to disable the camera.
     *
     * @return {Camera}
     */
    Camera.prototype.disable = function () {
        this.enabled = false;
        return this;
    };
    /**
     * Method used to retrieve the camera's current state.
     *
     * @return {object}
     */
    Camera.prototype.getState = function () {
        return {
            x: this.x,
            y: this.y,
            angle: this.angle,
            ratio: this.ratio,
        };
    };
    /**
     * Method used to check whether the camera has the given state.
     *
     * @return {object}
     */
    Camera.prototype.hasState = function (state) {
        return this.x === state.x && this.y === state.y && this.ratio === state.ratio && this.angle === state.angle;
    };
    /**
     * Method used to retrieve the camera's previous state.
     *
     * @return {object}
     */
    Camera.prototype.getPreviousState = function () {
        var state = this.previousState;
        if (!state)
            return null;
        return {
            x: state.x,
            y: state.y,
            angle: state.angle,
            ratio: state.ratio,
        };
    };
    /**
     * Method used to check whether the camera is currently being animated.
     *
     * @return {boolean}
     */
    Camera.prototype.isAnimated = function () {
        return !!this.nextFrame;
    };
    /**
     * Method used to set the camera's state.
     *
     * @param  {object} state - New state.
     * @return {Camera}
     */
    Camera.prototype.setState = function (state) {
        if (!this.enabled)
            return this;
        // TODO: validations
        // TODO: update by function
        // Keeping track of last state
        this.previousState = this.getState();
        if (state.x)
            this.x = state.x;
        if (state.y)
            this.y = state.y;
        if (state.angle)
            this.angle = state.angle;
        if (state.ratio)
            this.ratio = state.ratio;
        // Emitting
        if (!this.hasState(this.previousState))
            this.emit("updated", this.getState());
        return this;
    };
    /**
     * Method used to animate the camera.
     *
     * @param  {object}                    state      - State to reach eventually.
     * @param  {object}                    opts       - Options:
     * @param  {number}                      duration - Duration of the animation.
     * @param  {string | number => number}   easing   - Easing function or name of an existing one
     * @param  {function}                  callback   - Callback
     */
    Camera.prototype.animate = function (state, opts, callback) {
        var _this = this;
        if (!this.enabled)
            return;
        var options = Object.assign({}, animate_1.ANIMATE_DEFAULTS, opts);
        var easing = typeof options.easing === "function" ? options.easing : easings_1.default[options.easing];
        // State
        var start = Date.now(), initialState = this.getState();
        // Function performing the animation
        var fn = function () {
            var t = (Date.now() - start) / options.duration;
            // The animation is over:
            if (t >= 1) {
                _this.nextFrame = null;
                _this.setState(state);
                if (_this.animationCallback) {
                    _this.animationCallback.call(null);
                    _this.animationCallback = undefined;
                }
                return;
            }
            var coefficient = easing(t);
            var newState = {};
            if (state.x)
                newState.x = initialState.x + (state.x - initialState.x) * coefficient;
            if (state.y)
                newState.y = initialState.y + (state.y - initialState.y) * coefficient;
            if (state.angle)
                newState.angle = initialState.angle + (state.angle - initialState.angle) * coefficient;
            if (state.ratio)
                newState.ratio = initialState.ratio + (state.ratio - initialState.ratio) * coefficient;
            _this.setState(newState);
            _this.nextFrame = (0, utils_1.requestFrame)(fn);
        };
        if (this.nextFrame) {
            (0, utils_1.cancelFrame)(this.nextFrame);
            if (this.animationCallback)
                this.animationCallback.call(null);
            this.nextFrame = (0, utils_1.requestFrame)(fn);
        }
        else {
            fn();
        }
        this.animationCallback = callback;
    };
    /**
     * Method used to zoom the camera.
     *
     * @param  {number|object} factorOrOptions - Factor or options.
     * @return {function}
     */
    Camera.prototype.animatedZoom = function (factorOrOptions) {
        if (!factorOrOptions) {
            this.animate({ ratio: this.ratio / DEFAULT_ZOOMING_RATIO });
        }
        else {
            if (typeof factorOrOptions === "number")
                return this.animate({ ratio: this.ratio / factorOrOptions });
            else
                this.animate({
                    ratio: this.ratio / (factorOrOptions.factor || DEFAULT_ZOOMING_RATIO),
                }, factorOrOptions);
        }
    };
    /**
     * Method used to unzoom the camera.
     *
     * @param  {number|object} factorOrOptions - Factor or options.
     */
    Camera.prototype.animatedUnzoom = function (factorOrOptions) {
        if (!factorOrOptions) {
            this.animate({ ratio: this.ratio * DEFAULT_ZOOMING_RATIO });
        }
        else {
            if (typeof factorOrOptions === "number")
                return this.animate({ ratio: this.ratio * factorOrOptions });
            else
                this.animate({
                    ratio: this.ratio * (factorOrOptions.factor || DEFAULT_ZOOMING_RATIO),
                }, factorOrOptions);
        }
    };
    /**
     * Method used to reset the camera.
     *
     * @param  {object} options - Options.
     */
    Camera.prototype.animatedReset = function (options) {
        this.animate({
            x: 0.5,
            y: 0.5,
            ratio: 1,
            angle: 0,
        }, options);
    };
    /**
     * Returns a new Camera instance, with the same state as the current camera.
     *
     * @return {Camera}
     */
    Camera.prototype.copy = function () {
        return Camera.from(this.getState());
    };
    return Camera;
}(events_1.EventEmitter));
exports.default = Camera;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Sigma.js WebGL Matrices Helpers
 * ================================
 *
 * Matrices-related helper functions used by sigma's WebGL renderer.
 * @module
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiplyVec = exports.multiply = exports.translate = exports.rotate = exports.scale = exports.identity = void 0;
function identity() {
    return Float32Array.of(1, 0, 0, 0, 1, 0, 0, 0, 1);
}
exports.identity = identity;
// TODO: optimize
function scale(m, x, y) {
    m[0] = x;
    m[4] = typeof y === "number" ? y : x;
    return m;
}
exports.scale = scale;
function rotate(m, r) {
    var s = Math.sin(r), c = Math.cos(r);
    m[0] = c;
    m[1] = s;
    m[3] = -s;
    m[4] = c;
    return m;
}
exports.rotate = rotate;
function translate(m, x, y) {
    m[6] = x;
    m[7] = y;
    return m;
}
exports.translate = translate;
function multiply(a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2];
    var a10 = a[3], a11 = a[4], a12 = a[5];
    var a20 = a[6], a21 = a[7], a22 = a[8];
    var b00 = b[0], b01 = b[1], b02 = b[2];
    var b10 = b[3], b11 = b[4], b12 = b[5];
    var b20 = b[6], b21 = b[7], b22 = b[8];
    a[0] = b00 * a00 + b01 * a10 + b02 * a20;
    a[1] = b00 * a01 + b01 * a11 + b02 * a21;
    a[2] = b00 * a02 + b01 * a12 + b02 * a22;
    a[3] = b10 * a00 + b11 * a10 + b12 * a20;
    a[4] = b10 * a01 + b11 * a11 + b12 * a21;
    a[5] = b10 * a02 + b11 * a12 + b12 * a22;
    a[6] = b20 * a00 + b21 * a10 + b22 * a20;
    a[7] = b20 * a01 + b21 * a11 + b22 * a21;
    a[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return a;
}
exports.multiply = multiply;
function multiplyVec(a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2];
    var a10 = a[3], a11 = a[4], a12 = a[5];
    var a20 = a[6], a21 = a[7], a22 = a[8];
    var b0 = b[0], b1 = b[1], b2 = b[2];
    var c = Array.isArray(b) ? [0, 0, 0] : Float32Array.of(0, 0, 0);
    c[0] = b0 * a00 + b1 * a10 + b2 * a20;
    c[1] = b0 * a01 + b1 * a11 + b2 * a21;
    c[2] = b0 * a02 + b1 * a12 + b2 * a22;
    return c;
}
exports.multiplyVec = multiplyVec;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.cubicInOut = exports.cubicOut = exports.cubicIn = exports.quadraticInOut = exports.quadraticOut = exports.quadraticIn = exports.linear = void 0;
/**
 * Sigma.js Easings
 * =================
 *
 * Handy collection of easing functions.
 * @module
 */
var linear = function (k) { return k; };
exports.linear = linear;
var quadraticIn = function (k) { return k * k; };
exports.quadraticIn = quadraticIn;
var quadraticOut = function (k) { return k * (2 - k); };
exports.quadraticOut = quadraticOut;
var quadraticInOut = function (k) {
    if ((k *= 2) < 1)
        return 0.5 * k * k;
    return -0.5 * (--k * (k - 2) - 1);
};
exports.quadraticInOut = quadraticInOut;
var cubicIn = function (k) { return k * k * k; };
exports.cubicIn = cubicIn;
var cubicOut = function (k) { return --k * k * k + 1; };
exports.cubicOut = cubicOut;
var cubicInOut = function (k) {
    if ((k *= 2) < 1)
        return 0.5 * k * k * k;
    return 0.5 * ((k -= 2) * k * k + 2);
};
exports.cubicInOut = cubicInOut;
var easings = {
    linear: exports.linear,
    quadraticIn: exports.quadraticIn,
    quadraticOut: exports.quadraticOut,
    quadraticInOut: exports.quadraticInOut,
    cubicIn: exports.cubicIn,
    cubicOut: exports.cubicOut,
    cubicInOut: exports.cubicInOut,
};
exports.default = easings;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var captor_1 = __importStar(__webpack_require__(44));
/**
 * Constants.
 */
var DRAG_TIMEOUT = 200;
var DRAGGED_EVENTS_TOLERANCE = 3;
var MOUSE_INERTIA_DURATION = 200;
var MOUSE_INERTIA_RATIO = 3;
var MOUSE_ZOOM_DURATION = 250;
var ZOOMING_RATIO = 1.7;
var DOUBLE_CLICK_TIMEOUT = 300;
var DOUBLE_CLICK_ZOOMING_RATIO = 2.2;
var DOUBLE_CLICK_ZOOMING_DURATION = 200;
/**
 * Mouse captor class.
 *
 * @constructor
 */
var MouseCaptor = /** @class */ (function (_super) {
    __extends(MouseCaptor, _super);
    function MouseCaptor(container, renderer) {
        var _this = _super.call(this, container, renderer) || this;
        // State
        _this.enabled = true;
        _this.draggedEvents = 0;
        _this.downStartTime = null;
        _this.lastMouseX = null;
        _this.lastMouseY = null;
        _this.isMouseDown = false;
        _this.isMoving = false;
        _this.movingTimeout = null;
        _this.startCameraState = null;
        _this.clicks = 0;
        _this.doubleClickTimeout = null;
        _this.currentWheelDirection = 0;
        // Binding methods
        _this.handleClick = _this.handleClick.bind(_this);
        _this.handleRightClick = _this.handleRightClick.bind(_this);
        _this.handleDown = _this.handleDown.bind(_this);
        _this.handleUp = _this.handleUp.bind(_this);
        _this.handleMove = _this.handleMove.bind(_this);
        _this.handleWheel = _this.handleWheel.bind(_this);
        _this.handleOut = _this.handleOut.bind(_this);
        // Binding events
        container.addEventListener("click", _this.handleClick, false);
        container.addEventListener("contextmenu", _this.handleRightClick, false);
        container.addEventListener("mousedown", _this.handleDown, false);
        container.addEventListener("mousemove", _this.handleMove, false);
        container.addEventListener("wheel", _this.handleWheel, false);
        container.addEventListener("mouseout", _this.handleOut, false);
        document.addEventListener("mouseup", _this.handleUp, false);
        return _this;
    }
    MouseCaptor.prototype.kill = function () {
        var container = this.container;
        container.removeEventListener("click", this.handleClick);
        container.removeEventListener("contextmenu", this.handleRightClick);
        container.removeEventListener("mousedown", this.handleDown);
        container.removeEventListener("mousemove", this.handleMove);
        container.removeEventListener("wheel", this.handleWheel);
        container.removeEventListener("mouseout", this.handleOut);
        document.removeEventListener("mouseup", this.handleUp);
    };
    MouseCaptor.prototype.handleClick = function (e) {
        var _this = this;
        if (!this.enabled)
            return;
        this.clicks++;
        if (this.clicks === 2) {
            this.clicks = 0;
            if (typeof this.doubleClickTimeout === "number") {
                clearTimeout(this.doubleClickTimeout);
                this.doubleClickTimeout = null;
            }
            return this.handleDoubleClick(e);
        }
        setTimeout(function () {
            _this.clicks = 0;
            _this.doubleClickTimeout = null;
        }, DOUBLE_CLICK_TIMEOUT);
        // NOTE: this is here to prevent click events on drag
        if (this.draggedEvents < DRAGGED_EVENTS_TOLERANCE)
            this.emit("click", (0, captor_1.getMouseCoords)(e));
    };
    MouseCaptor.prototype.handleRightClick = function (e) {
        if (!this.enabled)
            return;
        this.emit("rightClick", (0, captor_1.getMouseCoords)(e));
    };
    MouseCaptor.prototype.handleDoubleClick = function (e) {
        if (!this.enabled)
            return;
        var camera = this.renderer.getCamera();
        var newRatio = camera.getState().ratio / DOUBLE_CLICK_ZOOMING_RATIO;
        camera.animate(this.renderer.getViewportZoomedState({ x: (0, captor_1.getX)(e), y: (0, captor_1.getY)(e) }, newRatio), {
            easing: "quadraticInOut",
            duration: DOUBLE_CLICK_ZOOMING_DURATION,
        });
        if (e.preventDefault)
            e.preventDefault();
        else
            e.returnValue = false;
        e.stopPropagation();
        return false;
    };
    MouseCaptor.prototype.handleDown = function (e) {
        if (!this.enabled)
            return;
        this.startCameraState = this.renderer.getCamera().getState();
        this.lastMouseX = (0, captor_1.getX)(e);
        this.lastMouseY = (0, captor_1.getY)(e);
        this.draggedEvents = 0;
        this.downStartTime = Date.now();
        // TODO: dispatch events
        switch (e.which) {
            default:
                // Left button pressed
                this.isMouseDown = true;
                this.emit("mousedown", (0, captor_1.getMouseCoords)(e));
        }
    };
    MouseCaptor.prototype.handleUp = function (e) {
        var _this = this;
        if (!this.enabled || !this.isMouseDown)
            return;
        var camera = this.renderer.getCamera();
        this.isMouseDown = false;
        if (typeof this.movingTimeout === "number") {
            clearTimeout(this.movingTimeout);
            this.movingTimeout = null;
        }
        var x = (0, captor_1.getX)(e), y = (0, captor_1.getY)(e);
        var cameraState = camera.getState(), previousCameraState = camera.getPreviousState() || { x: 0, y: 0 };
        if (this.isMoving) {
            camera.animate({
                x: cameraState.x + MOUSE_INERTIA_RATIO * (cameraState.x - previousCameraState.x),
                y: cameraState.y + MOUSE_INERTIA_RATIO * (cameraState.y - previousCameraState.y),
            }, {
                duration: MOUSE_INERTIA_DURATION,
                easing: "quadraticOut",
            });
        }
        else if (this.lastMouseX !== x || this.lastMouseY !== y) {
            camera.setState({
                x: cameraState.x,
                y: cameraState.y,
            });
        }
        this.isMoving = false;
        setTimeout(function () {
            _this.draggedEvents = 0;
            _this.renderer.refresh();
        }, 0);
        this.emit("mouseup", (0, captor_1.getMouseCoords)(e));
    };
    MouseCaptor.prototype.handleMove = function (e) {
        var _this = this;
        if (!this.enabled)
            return;
        this.emit("mousemove", (0, captor_1.getMouseCoords)(e));
        if (this.isMouseDown) {
            // TODO: dispatch events
            this.isMoving = true;
            this.draggedEvents++;
            if (typeof this.movingTimeout === "number") {
                clearTimeout(this.movingTimeout);
            }
            this.movingTimeout = window.setTimeout(function () {
                _this.movingTimeout = null;
                _this.isMoving = false;
            }, DRAG_TIMEOUT);
            var camera = this.renderer.getCamera();
            var eX = (0, captor_1.getX)(e), eY = (0, captor_1.getY)(e);
            var lastMouse = this.renderer.viewportToFramedGraph({
                x: this.lastMouseX,
                y: this.lastMouseY,
            });
            var mouse = this.renderer.viewportToFramedGraph({ x: eX, y: eY });
            var offsetX = lastMouse.x - mouse.x, offsetY = lastMouse.y - mouse.y;
            var cameraState = camera.getState();
            var x = cameraState.x + offsetX, y = cameraState.y + offsetY;
            camera.setState({ x: x, y: y });
            this.lastMouseX = eX;
            this.lastMouseY = eY;
        }
        if (e.preventDefault)
            e.preventDefault();
        else
            e.returnValue = false;
        e.stopPropagation();
        return false;
    };
    MouseCaptor.prototype.handleWheel = function (e) {
        var _this = this;
        if (e.preventDefault)
            e.preventDefault();
        else
            e.returnValue = false;
        e.stopPropagation();
        if (!this.enabled)
            return false;
        var delta = (0, captor_1.getWheelDelta)(e);
        if (!delta)
            return false;
        var ratioDiff = delta > 0 ? 1 / ZOOMING_RATIO : ZOOMING_RATIO;
        var camera = this.renderer.getCamera();
        var newRatio = camera.getState().ratio * ratioDiff;
        var wheelDirection = delta > 0 ? 1 : -1;
        var now = Date.now();
        // Cancel events that are too close too each other and in the same direction:
        if (this.currentWheelDirection === wheelDirection &&
            this.lastWheelTriggerTime &&
            now - this.lastWheelTriggerTime < MOUSE_ZOOM_DURATION / 5) {
            return false;
        }
        camera.animate(this.renderer.getViewportZoomedState({ x: (0, captor_1.getX)(e), y: (0, captor_1.getY)(e) }, newRatio), {
            easing: "quadraticOut",
            duration: MOUSE_ZOOM_DURATION,
        }, function () {
            _this.currentWheelDirection = 0;
        });
        this.currentWheelDirection = wheelDirection;
        this.lastWheelTriggerTime = now;
        return false;
    };
    MouseCaptor.prototype.handleOut = function () {
        // TODO: dispatch event
    };
    return MouseCaptor;
}(captor_1.default));
exports.default = MouseCaptor;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWheelDelta = exports.getTouchCoords = exports.getTouchesArray = exports.getMouseCoords = exports.getPosition = exports.getY = exports.getX = void 0;
/**
 * Sigma.js Captor Class
 * ======================
 * @module
 */
var events_1 = __webpack_require__(16);
/**
 * Captor utils functions
 * ======================
 */
/**
 * Extract the local X position from a mouse event or touch object.
 *
 * @param  {event}  e - A mouse event or touch object.
 * @return {number}     The local X value of the mouse.
 */
function getX(e) {
    if (typeof e.offsetX !== "undefined")
        return e.offsetX;
    if (typeof e.clientX !== "undefined")
        return e.clientX;
    throw new Error("Captor: could not extract x from event.");
}
exports.getX = getX;
/**
 * Extract the local Y position from a mouse event or touch object.
 *
 * @param  {event}  e - A mouse event or touch object.
 * @return {number}     The local Y value of the mouse.
 */
function getY(e) {
    if (typeof e.offsetY !== "undefined")
        return e.offsetY;
    if (typeof e.clientY !== "undefined")
        return e.clientY;
    throw new Error("Captor: could not extract y from event.");
}
exports.getY = getY;
/**
 * Extract the local X and Y coordinates from a mouse event or touch object.
 *
 * @param  {event}  e - A mouse event or touch object.
 * @return {number}     The local Y value of the mouse.
 */
function getPosition(e) {
    return {
        x: getX(e),
        y: getY(e),
    };
}
exports.getPosition = getPosition;
/**
 * Convert mouse coords to sigma coords.
 *
 * @param  {event}   e   - A mouse event or touch object.
 *
 * @return {object}
 */
function getMouseCoords(e) {
    return {
        x: getX(e),
        y: getY(e),
        clientX: e.clientX,
        clientY: e.clientY,
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        altKey: e.altKey,
        shiftKey: e.shiftKey,
        // TODO: this is not ideal... But I am wondering why we don't just pass the event through
        preventDefault: e.preventDefault.bind(e),
        original: e,
    };
}
exports.getMouseCoords = getMouseCoords;
var MAX_TOUCHES = 2;
function getTouchesArray(touches) {
    var arr = [];
    for (var i = 0, l = Math.min(touches.length, MAX_TOUCHES); i < l; i++)
        arr.push(touches[i]);
    return arr;
}
exports.getTouchesArray = getTouchesArray;
/**
 * Convert touch coords to sigma coords.
 */
function getTouchCoords(e) {
    return {
        touches: getTouchesArray(e.touches).map(getPosition),
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        altKey: e.altKey,
        shiftKey: e.shiftKey,
        // TODO: same as for getMouseCoords
        preventDefault: e.preventDefault.bind(e),
        original: e,
    };
}
exports.getTouchCoords = getTouchCoords;
/**
 * Extract the wheel delta from a mouse event or touch object.
 *
 * @param  {event}  e - A mouse event or touch object.
 * @return {number}     The wheel delta of the mouse.
 */
function getWheelDelta(e) {
    // TODO: check those ratios again to ensure a clean Chrome/Firefox compat
    if (typeof e.deltaY !== "undefined")
        return (e.deltaY * -3) / 360;
    if (typeof e.detail !== "undefined")
        return e.detail / -9;
    throw new Error("Captor: could not extract delta from event.");
}
exports.getWheelDelta = getWheelDelta;
/**
 * Abstract class representing a captor like the user's mouse or touch controls.
 */
var Captor = /** @class */ (function (_super) {
    __extends(Captor, _super);
    function Captor(container, renderer) {
        var _this = _super.call(this) || this;
        // Properties
        _this.container = container;
        _this.renderer = renderer;
        return _this;
    }
    return Captor;
}(events_1.EventEmitter));
exports.default = Captor;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rectangleCollidesWithQuad = exports.squareCollidesWithQuad = exports.getCircumscribedAlignedRectangle = exports.isRectangleAligned = void 0;
/**
 * Sigma.js Quad Tree Class
 * =========================
 *
 * Class implementing the quad tree data structure used to solve hovers and
 * determine which elements are currently in the scope of the camera so that
 * we don't waste time rendering things the user cannot see anyway.
 * @module
 */
/* eslint no-nested-ternary: 0 */
/* eslint no-constant-condition: 0 */
var extend_1 = __importDefault(__webpack_require__(141));
// TODO: should not ask the quadtree when the camera has the whole graph in
// sight.
// TODO: a square can be represented as topleft + width, saying for the quad blocks (reduce mem)
// TODO: jsdoc
// TODO: be sure we can handle cases overcoming boundaries (because of size) or use a maxed size
// TODO: filtering unwanted labels beforehand through the filter function
// NOTE: this is basically a MX-CIF Quadtree at this point
// NOTE: need to explore R-Trees for edges
// NOTE: need to explore 2d segment tree for edges
// NOTE: probably can do faster using spatial hashing
/**
 * Constants.
 *
 * Note that since we are representing a static 4-ary tree, the indices of the
 * quadrants are the following:
 *   - TOP_LEFT:     4i + b
 *   - TOP_RIGHT:    4i + 2b
 *   - BOTTOM_LEFT:  4i + 3b
 *   - BOTTOM_RIGHT: 4i + 4b
 */
var BLOCKS = 4, MAX_LEVEL = 5;
var OUTSIDE_BLOCK = "outside";
var X_OFFSET = 0, Y_OFFSET = 1, WIDTH_OFFSET = 2, HEIGHT_OFFSET = 3;
var TOP_LEFT = 1, TOP_RIGHT = 2, BOTTOM_LEFT = 3, BOTTOM_RIGHT = 4;
var hasWarnedTooMuchOutside = false;
/**
 * Geometry helpers.
 */
/**
 * Function returning whether the given rectangle is axis-aligned.
 *
 * @param  {Rectangle} rect
 * @return {boolean}
 */
function isRectangleAligned(rect) {
    return rect.x1 === rect.x2 || rect.y1 === rect.y2;
}
exports.isRectangleAligned = isRectangleAligned;
/**
 * Function returning the smallest rectangle that contains the given rectangle, and that is aligned with the axis.
 *
 * @param {Rectangle} rect
 * @return {Rectangle}
 */
function getCircumscribedAlignedRectangle(rect) {
    var width = Math.sqrt(Math.pow(rect.x2 - rect.x1, 2) + Math.pow(rect.y2 - rect.y1, 2));
    var heightVector = {
        x: ((rect.y1 - rect.y2) * rect.height) / width,
        y: ((rect.x2 - rect.x1) * rect.height) / width,
    };
    // Compute all corners:
    var tl = { x: rect.x1, y: rect.y1 };
    var tr = { x: rect.x2, y: rect.y2 };
    var bl = {
        x: rect.x1 + heightVector.x,
        y: rect.y1 + heightVector.y,
    };
    var br = {
        x: rect.x2 + heightVector.x,
        y: rect.y2 + heightVector.y,
    };
    var xL = Math.min(tl.x, tr.x, bl.x, br.x);
    var xR = Math.max(tl.x, tr.x, bl.x, br.x);
    var yT = Math.min(tl.y, tr.y, bl.y, br.y);
    var yB = Math.max(tl.y, tr.y, bl.y, br.y);
    return {
        x1: xL,
        y1: yT,
        x2: xR,
        y2: yT,
        height: yB - yT,
    };
}
exports.getCircumscribedAlignedRectangle = getCircumscribedAlignedRectangle;
/**
 *
 * @param x1
 * @param y1
 * @param w
 * @param qx
 * @param qy
 * @param qw
 * @param qh
 */
function squareCollidesWithQuad(x1, y1, w, qx, qy, qw, qh) {
    return x1 < qx + qw && x1 + w > qx && y1 < qy + qh && y1 + w > qy;
}
exports.squareCollidesWithQuad = squareCollidesWithQuad;
function rectangleCollidesWithQuad(x1, y1, w, h, qx, qy, qw, qh) {
    return x1 < qx + qw && x1 + w > qx && y1 < qy + qh && y1 + h > qy;
}
exports.rectangleCollidesWithQuad = rectangleCollidesWithQuad;
function pointIsInQuad(x, y, qx, qy, qw, qh) {
    var xmp = qx + qw / 2, ymp = qy + qh / 2, top = y < ymp, left = x < xmp;
    return top ? (left ? TOP_LEFT : TOP_RIGHT) : left ? BOTTOM_LEFT : BOTTOM_RIGHT;
}
/**
 * Helper functions that are not bound to the class so an external user
 * cannot mess with them.
 */
function buildQuadrants(maxLevel, data) {
    // [block, level]
    var stack = [0, 0];
    while (stack.length) {
        var level = stack.pop(), block = stack.pop();
        var topLeftBlock = 4 * block + BLOCKS, topRightBlock = 4 * block + 2 * BLOCKS, bottomLeftBlock = 4 * block + 3 * BLOCKS, bottomRightBlock = 4 * block + 4 * BLOCKS;
        var x = data[block + X_OFFSET], y = data[block + Y_OFFSET], width = data[block + WIDTH_OFFSET], height = data[block + HEIGHT_OFFSET], hw = width / 2, hh = height / 2;
        data[topLeftBlock + X_OFFSET] = x;
        data[topLeftBlock + Y_OFFSET] = y;
        data[topLeftBlock + WIDTH_OFFSET] = hw;
        data[topLeftBlock + HEIGHT_OFFSET] = hh;
        data[topRightBlock + X_OFFSET] = x + hw;
        data[topRightBlock + Y_OFFSET] = y;
        data[topRightBlock + WIDTH_OFFSET] = hw;
        data[topRightBlock + HEIGHT_OFFSET] = hh;
        data[bottomLeftBlock + X_OFFSET] = x;
        data[bottomLeftBlock + Y_OFFSET] = y + hh;
        data[bottomLeftBlock + WIDTH_OFFSET] = hw;
        data[bottomLeftBlock + HEIGHT_OFFSET] = hh;
        data[bottomRightBlock + X_OFFSET] = x + hw;
        data[bottomRightBlock + Y_OFFSET] = y + hh;
        data[bottomRightBlock + WIDTH_OFFSET] = hw;
        data[bottomRightBlock + HEIGHT_OFFSET] = hh;
        if (level < maxLevel - 1) {
            stack.push(bottomRightBlock, level + 1);
            stack.push(bottomLeftBlock, level + 1);
            stack.push(topRightBlock, level + 1);
            stack.push(topLeftBlock, level + 1);
        }
    }
}
function insertNode(maxLevel, data, containers, key, x, y, size) {
    var x1 = x - size, y1 = y - size, w = size * 2;
    var level = 0, block = 0;
    while (true) {
        // If we reached max level
        if (level >= maxLevel) {
            containers[block] = containers[block] || [];
            containers[block].push(key);
            return;
        }
        var topLeftBlock = 4 * block + BLOCKS, topRightBlock = 4 * block + 2 * BLOCKS, bottomLeftBlock = 4 * block + 3 * BLOCKS, bottomRightBlock = 4 * block + 4 * BLOCKS;
        var collidingWithTopLeft = squareCollidesWithQuad(x1, y1, w, data[topLeftBlock + X_OFFSET], data[topLeftBlock + Y_OFFSET], data[topLeftBlock + WIDTH_OFFSET], data[topLeftBlock + HEIGHT_OFFSET]);
        var collidingWithTopRight = squareCollidesWithQuad(x1, y1, w, data[topRightBlock + X_OFFSET], data[topRightBlock + Y_OFFSET], data[topRightBlock + WIDTH_OFFSET], data[topRightBlock + HEIGHT_OFFSET]);
        var collidingWithBottomLeft = squareCollidesWithQuad(x1, y1, w, data[bottomLeftBlock + X_OFFSET], data[bottomLeftBlock + Y_OFFSET], data[bottomLeftBlock + WIDTH_OFFSET], data[bottomLeftBlock + HEIGHT_OFFSET]);
        var collidingWithBottomRight = squareCollidesWithQuad(x1, y1, w, data[bottomRightBlock + X_OFFSET], data[bottomRightBlock + Y_OFFSET], data[bottomRightBlock + WIDTH_OFFSET], data[bottomRightBlock + HEIGHT_OFFSET]);
        var collisions = [
            collidingWithTopLeft,
            collidingWithTopRight,
            collidingWithBottomLeft,
            collidingWithBottomRight,
        ].reduce(function (acc, current) {
            if (current)
                return acc + 1;
            else
                return acc;
        }, 0);
        // If we have no collision at root level, inject node in the outside block
        if (collisions === 0 && level === 0) {
            containers[OUTSIDE_BLOCK].push(key);
            if (!hasWarnedTooMuchOutside && containers[OUTSIDE_BLOCK].length >= 5) {
                hasWarnedTooMuchOutside = true;
                console.warn("sigma/quadtree.insertNode: At least 5 nodes are outside the global quadtree zone. " +
                    "You might have a problem with the normalization function or the custom bounding box.");
            }
            return;
        }
        // If we don't have at least a collision but deeper, there is an issue
        if (collisions === 0)
            throw new Error("sigma/quadtree.insertNode: no collision (level: " + level + ", key: " + key + ", x: " + x + ", y: " + y + ", size: " + size + ").");
        // If we have 3 collisions, we have a geometry problem obviously
        if (collisions === 3)
            throw new Error("sigma/quadtree.insertNode: 3 impossible collisions (level: " + level + ", key: " + key + ", x: " + x + ", y: " + y + ", size: " + size + ").");
        // If we have more that one collision, we stop here and store the node
        // in the relevant containers
        if (collisions > 1) {
            containers[block] = containers[block] || [];
            containers[block].push(key);
            return;
        }
        else {
            level++;
        }
        // Else we recurse into the correct quads
        if (collidingWithTopLeft)
            block = topLeftBlock;
        if (collidingWithTopRight)
            block = topRightBlock;
        if (collidingWithBottomLeft)
            block = bottomLeftBlock;
        if (collidingWithBottomRight)
            block = bottomRightBlock;
    }
}
function getNodesInAxisAlignedRectangleArea(maxLevel, data, containers, x1, y1, w, h) {
    // [block, level]
    var stack = [0, 0];
    var collectedNodes = [];
    var container;
    while (stack.length) {
        var level = stack.pop(), block = stack.pop();
        // Collecting nodes
        container = containers[block];
        if (container)
            (0, extend_1.default)(collectedNodes, container);
        // If we reached max level
        if (level >= maxLevel)
            continue;
        var topLeftBlock = 4 * block + BLOCKS, topRightBlock = 4 * block + 2 * BLOCKS, bottomLeftBlock = 4 * block + 3 * BLOCKS, bottomRightBlock = 4 * block + 4 * BLOCKS;
        var collidingWithTopLeft = rectangleCollidesWithQuad(x1, y1, w, h, data[topLeftBlock + X_OFFSET], data[topLeftBlock + Y_OFFSET], data[topLeftBlock + WIDTH_OFFSET], data[topLeftBlock + HEIGHT_OFFSET]);
        var collidingWithTopRight = rectangleCollidesWithQuad(x1, y1, w, h, data[topRightBlock + X_OFFSET], data[topRightBlock + Y_OFFSET], data[topRightBlock + WIDTH_OFFSET], data[topRightBlock + HEIGHT_OFFSET]);
        var collidingWithBottomLeft = rectangleCollidesWithQuad(x1, y1, w, h, data[bottomLeftBlock + X_OFFSET], data[bottomLeftBlock + Y_OFFSET], data[bottomLeftBlock + WIDTH_OFFSET], data[bottomLeftBlock + HEIGHT_OFFSET]);
        var collidingWithBottomRight = rectangleCollidesWithQuad(x1, y1, w, h, data[bottomRightBlock + X_OFFSET], data[bottomRightBlock + Y_OFFSET], data[bottomRightBlock + WIDTH_OFFSET], data[bottomRightBlock + HEIGHT_OFFSET]);
        if (collidingWithTopLeft)
            stack.push(topLeftBlock, level + 1);
        if (collidingWithTopRight)
            stack.push(topRightBlock, level + 1);
        if (collidingWithBottomLeft)
            stack.push(bottomLeftBlock, level + 1);
        if (collidingWithBottomRight)
            stack.push(bottomRightBlock, level + 1);
    }
    return collectedNodes;
}
/**
 * QuadTree class.
 *
 * @constructor
 * @param {object} boundaries - The graph boundaries.
 */
var QuadTree = /** @class */ (function () {
    function QuadTree(params) {
        var _a;
        if (params === void 0) { params = {}; }
        this.containers = (_a = {}, _a[OUTSIDE_BLOCK] = [], _a);
        this.cache = null;
        this.lastRectangle = null;
        // Allocating the underlying byte array
        var L = Math.pow(4, MAX_LEVEL);
        this.data = new Float32Array(BLOCKS * ((4 * L - 1) / 3));
        if (params.boundaries)
            this.resize(params.boundaries);
        else
            this.resize({
                x: 0,
                y: 0,
                width: 1,
                height: 1,
            });
    }
    QuadTree.prototype.add = function (key, x, y, size) {
        insertNode(MAX_LEVEL, this.data, this.containers, key, x, y, size);
        return this;
    };
    QuadTree.prototype.resize = function (boundaries) {
        this.clear();
        // Building the quadrants
        this.data[X_OFFSET] = boundaries.x;
        this.data[Y_OFFSET] = boundaries.y;
        this.data[WIDTH_OFFSET] = boundaries.width;
        this.data[HEIGHT_OFFSET] = boundaries.height;
        buildQuadrants(MAX_LEVEL, this.data);
    };
    QuadTree.prototype.clear = function () {
        var _a;
        this.containers = (_a = {}, _a[OUTSIDE_BLOCK] = [], _a);
        return this;
    };
    QuadTree.prototype.point = function (x, y) {
        var nodes = this.containers[OUTSIDE_BLOCK];
        var block = 0, level = 0;
        do {
            if (this.containers[block])
                nodes.push.apply(nodes, __spreadArray([], __read(this.containers[block]), false));
            var quad = pointIsInQuad(x, y, this.data[block + X_OFFSET], this.data[block + Y_OFFSET], this.data[block + WIDTH_OFFSET], this.data[block + HEIGHT_OFFSET]);
            block = 4 * block + quad * BLOCKS;
            level++;
        } while (level <= MAX_LEVEL);
        return nodes;
    };
    QuadTree.prototype.rectangle = function (x1, y1, x2, y2, height) {
        var _a;
        var lr = this.lastRectangle;
        if (lr && x1 === lr.x1 && x2 === lr.x2 && y1 === lr.y1 && y2 === lr.y2 && height === lr.height) {
            return this.cache;
        }
        this.lastRectangle = {
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            height: height,
        };
        // If the rectangle is shifted, we use the smallest aligned rectangle that contains the shifted one:
        if (!isRectangleAligned(this.lastRectangle))
            this.lastRectangle = getCircumscribedAlignedRectangle(this.lastRectangle);
        this.cache = getNodesInAxisAlignedRectangleArea(MAX_LEVEL, this.data, this.containers, x1, y1, Math.abs(x1 - x2) || Math.abs(y1 - y2), height);
        // Add all the nodes in the outside block, since they might be relevant, and since they should be very few:
        (_a = this.cache).push.apply(_a, __spreadArray([], __read(this.containers[OUTSIDE_BLOCK]), false));
        return this.cache;
    };
    return QuadTree;
}());
exports.default = QuadTree;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function drawLabel(context, data, settings) {
    if (!data.label)
        return;
    var size = settings.labelSize, font = settings.labelFont, weight = settings.labelWeight;
    context.fillStyle = "#000";
    context.font = weight + " " + size + "px " + font;
    context.fillText(data.label, data.x + data.size + 3, data.y + size / 3);
}
exports.default = drawLabel;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractProgram = void 0;
/**
 * Sigma.js WebGL Renderer Program
 * ================================
 *
 * Class representing a single WebGL program used by sigma's WebGL renderer.
 * @module
 */
var utils_1 = __webpack_require__(151);
/**
 * Abstract Program class.
 *
 * @constructor
 */
var AbstractProgram = /** @class */ (function () {
    function AbstractProgram(gl, vertexShaderSource, fragmentShaderSource, points, attributes) {
        this.array = new Float32Array();
        this.points = points;
        this.attributes = attributes;
        this.gl = gl;
        this.vertexShaderSource = vertexShaderSource;
        this.fragmentShaderSource = fragmentShaderSource;
        var buffer = gl.createBuffer();
        if (buffer === null)
            throw new Error("AbstractProgram: error while creating the buffer");
        this.buffer = buffer;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        this.vertexShader = (0, utils_1.loadVertexShader)(gl, this.vertexShaderSource);
        this.fragmentShader = (0, utils_1.loadFragmentShader)(gl, this.fragmentShaderSource);
        this.program = (0, utils_1.loadProgram)(gl, [this.vertexShader, this.fragmentShader]);
    }
    AbstractProgram.prototype.bufferData = function () {
        var gl = this.gl;
        gl.bufferData(gl.ARRAY_BUFFER, this.array, gl.DYNAMIC_DRAW);
    };
    AbstractProgram.prototype.allocate = function (capacity) {
        this.array = new Float32Array(this.points * this.attributes * capacity);
    };
    return AbstractProgram;
}());
exports.AbstractProgram = AbstractProgram;


/***/ }),
/* 48 */
/***/ (function(module, exports) {

(()=>{"use strict";var e={d:(n,o)=>{for(var t in o)e.o(o,t)&&!e.o(n,t)&&Object.defineProperty(n,t,{enumerable:!0,get:o[t]})},o:(e,n)=>Object.prototype.hasOwnProperty.call(e,n),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},n={};e.r(n),e.d(n,{default:()=>o});const o="precision mediump float;\n\nvarying vec4 v_color;\nvarying vec2 v_normal;\nvarying float v_thickness;\n\nconst float feather = 0.001;\nconst vec4 color0 = vec4(0.0, 0.0, 0.0, 0.0);\n\nvoid main(void) {\n  float dist = length(v_normal) * v_thickness;\n\n  float t = smoothstep(\n    v_thickness - feather,\n    v_thickness,\n    dist\n  );\n\n  gl_FragColor = mix(v_color, color0, t);\n}\n";module.exports=n})();

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// Graphology & Sigma
var randomLayout = __webpack_require__(50);
window.graphlayout = {
  random: randomLayout
};
window.ForceAtlas2Layout = __webpack_require__(118);
window.Graph = __webpack_require__(123);
window.gexf = __webpack_require__(124);
window.Sigma = __webpack_require__(136);


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Graphology Random Layout
 * =========================
 *
 * Simple layout giving uniform random positions to the nodes.
 */
var defaults = __webpack_require__(51),
    isGraph = __webpack_require__(36);

/**
 * Default options.
 */
var DEFAULTS = {
  attributes: {
    x: 'x',
    y: 'y'
  },
  center: 0.5,
  rng: Math.random,
  scale: 1
};

/**
 * Abstract function running the layout.
 *
 * @param  {Graph}    graph          - Target  graph.
 * @param  {object}   [options]      - Options:
 * @param  {object}     [attributes] - Attributes names to map.
 * @param  {number}     [center]     - Center of the layout.
 * @param  {function}   [rng]        - Custom RNG function to be used.
 * @param  {number}     [scale]      - Scale of the layout.
 * @return {object}                  - The positions by node.
 */
function genericRandomLayout(assign, graph, options) {
  if (!isGraph(graph))
    throw new Error('graphology-layout/random: the given graph is not a valid graphology instance.');

  options = defaults(options, DEFAULTS);

  var positions = {},
      nodes = graph.nodes(),
      center = options.center,
      rng = options.rng,
      scale = options.scale;

  var l = nodes.length,
      node,
      x,
      y,
      i;

  for (i = 0; i < l; i++) {
    node = nodes[i];

    x = rng() * scale;
    y = rng() * scale;

    if (center !== 0.5) {
      x += center - 0.5 * scale;
      y += center - 0.5 * scale;
    }

    positions[node] = {
      x: x,
      y: y
    };

    if (assign) {
      graph.setNodeAttribute(node, options.attributes.x, x);
      graph.setNodeAttribute(node, options.attributes.y, y);
    }
  }

  return positions;
}

var randomLayout = genericRandomLayout.bind(null, false);
randomLayout.assign = genericRandomLayout.bind(null, true);

module.exports = randomLayout;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(17),
    baseRest = __webpack_require__(18),
    customDefaultsMerge = __webpack_require__(65),
    mergeWith = __webpack_require__(115);

/**
 * This method is like `_.defaults` except that it recursively assigns
 * default properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 3.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaults
 * @example
 *
 * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
 * // => { 'a': { 'b': 2, 'c': 3 } }
 */
var defaultsDeep = baseRest(function(args) {
  args.push(undefined, customDefaultsMerge);
  return apply(mergeWith, undefined, args);
});

module.exports = defaultsDeep;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(17);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var baseSetToString = __webpack_require__(54),
    shortOut = __webpack_require__(64);

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var constant = __webpack_require__(55),
    defineProperty = __webpack_require__(20),
    identity = __webpack_require__(19);

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),
/* 55 */
/***/ (function(module, exports) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(12),
    isMasked = __webpack_require__(60),
    isObject = __webpack_require__(0),
    toSource = __webpack_require__(62);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),
/* 57 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(21);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 59 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(61);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(2);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 62 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),
/* 63 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),
/* 64 */
/***/ (function(module, exports) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var baseMerge = __webpack_require__(23),
    isObject = __webpack_require__(0);

/**
 * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
 * objects into destination objects that are passed thru.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to merge.
 * @param {Object} object The parent object of `objValue`.
 * @param {Object} source The parent object of `srcValue`.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 * @returns {*} Returns the value to assign.
 */
function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
  if (isObject(objValue) && isObject(srcValue)) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, objValue);
    baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack);
    stack['delete'](srcValue);
  }
  return objValue;
}

module.exports = customDefaultsMerge;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(5),
    stackClear = __webpack_require__(72),
    stackDelete = __webpack_require__(73),
    stackGet = __webpack_require__(74),
    stackHas = __webpack_require__(75),
    stackSet = __webpack_require__(76);

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ }),
/* 67 */
/***/ (function(module, exports) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(6);

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(6);

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(6);

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(6);

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(5);

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ }),
/* 73 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ }),
/* 74 */
/***/ (function(module, exports) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ }),
/* 75 */
/***/ (function(module, exports) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var ListCache = __webpack_require__(5),
    Map = __webpack_require__(24),
    MapCache = __webpack_require__(77);

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(78),
    mapCacheDelete = __webpack_require__(85),
    mapCacheGet = __webpack_require__(87),
    mapCacheHas = __webpack_require__(88),
    mapCacheSet = __webpack_require__(89);

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var Hash = __webpack_require__(79),
    ListCache = __webpack_require__(5),
    Map = __webpack_require__(24);

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var hashClear = __webpack_require__(80),
    hashDelete = __webpack_require__(81),
    hashGet = __webpack_require__(82),
    hashHas = __webpack_require__(83),
    hashSet = __webpack_require__(84);

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(8);

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ }),
/* 81 */
/***/ (function(module, exports) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(8);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(8);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var nativeCreate = __webpack_require__(8);

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(9);

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ }),
/* 86 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(9);

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(9);

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var getMapData = __webpack_require__(9);

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var createBaseFor = __webpack_require__(91);

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;


/***/ }),
/* 91 */
/***/ (function(module, exports) {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var assignMergeValue = __webpack_require__(25),
    cloneBuffer = __webpack_require__(93),
    cloneTypedArray = __webpack_require__(94),
    copyArray = __webpack_require__(97),
    initCloneObject = __webpack_require__(98),
    isArguments = __webpack_require__(28),
    isArray = __webpack_require__(29),
    isArrayLikeObject = __webpack_require__(102),
    isBuffer = __webpack_require__(31),
    isFunction = __webpack_require__(12),
    isObject = __webpack_require__(0),
    isPlainObject = __webpack_require__(104),
    isTypedArray = __webpack_require__(32),
    safeGet = __webpack_require__(33),
    toPlainObject = __webpack_require__(108);

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key),
      srcValue = safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

module.exports = baseMergeDeep;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(2);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)(module)))

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(95);

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var Uint8Array = __webpack_require__(96);

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(2);

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ }),
/* 97 */
/***/ (function(module, exports) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var baseCreate = __webpack_require__(99),
    getPrototype = __webpack_require__(26),
    isPrototype = __webpack_require__(27);

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(0);

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ }),
/* 100 */
/***/ (function(module, exports) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(4),
    isObjectLike = __webpack_require__(3);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var isArrayLike = __webpack_require__(15),
    isObjectLike = __webpack_require__(3);

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;


/***/ }),
/* 103 */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(4),
    getPrototype = __webpack_require__(26),
    isObjectLike = __webpack_require__(3);

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(4),
    isLength = __webpack_require__(30),
    isObjectLike = __webpack_require__(3);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),
/* 106 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(22);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)(module)))

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(109),
    keysIn = __webpack_require__(34);

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

module.exports = toPlainObject;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(110),
    baseAssignValue = __webpack_require__(13);

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(13),
    eq = __webpack_require__(7);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(112),
    isArguments = __webpack_require__(28),
    isArray = __webpack_require__(29),
    isBuffer = __webpack_require__(31),
    isIndex = __webpack_require__(35),
    isTypedArray = __webpack_require__(32);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),
/* 112 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(0),
    isPrototype = __webpack_require__(27),
    nativeKeysIn = __webpack_require__(114);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),
/* 114 */
/***/ (function(module, exports) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var baseMerge = __webpack_require__(23),
    createAssigner = __webpack_require__(116);

/**
 * This method is like `_.merge` except that it accepts `customizer` which
 * is invoked to produce the merged values of the destination and source
 * properties. If `customizer` returns `undefined`, merging is handled by the
 * method instead. The `customizer` is invoked with six arguments:
 * (objValue, srcValue, key, object, source, stack).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   if (_.isArray(objValue)) {
 *     return objValue.concat(srcValue);
 *   }
 * }
 *
 * var object = { 'a': [1], 'b': [2] };
 * var other = { 'a': [3], 'b': [4] };
 *
 * _.mergeWith(object, other, customizer);
 * // => { 'a': [1, 3], 'b': [2, 4] }
 */
var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
  baseMerge(object, source, srcIndex, customizer);
});

module.exports = mergeWith;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var baseRest = __webpack_require__(18),
    isIterateeCall = __webpack_require__(117);

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(7),
    isArrayLike = __webpack_require__(15),
    isIndex = __webpack_require__(35),
    isObject = __webpack_require__(0);

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Graphology ForceAtlas2 Layout Supervisor
 * =========================================
 *
 * Supervisor class able to spawn a web worker to run the FA2 layout in a
 * separate thread not to block UI with heavy synchronous computations.
 */
var workerFunction = __webpack_require__(119),
    isGraph = __webpack_require__(120),
    helpers = __webpack_require__(121);

var DEFAULT_SETTINGS = __webpack_require__(122);

/**
 * Class representing a FA2 layout run by a webworker.
 *
 * @constructor
 * @param  {Graph}         graph        - Target graph.
 * @param  {object|number} params       - Parameters:
 * @param  {object}          [settings] - Settings.
 */
function FA2LayoutSupervisor(graph, params) {
  params = params || {};

  // Validation
  if (!isGraph(graph))
    throw new Error('graphology-layout-forceatlas2/worker: the given graph is not a valid graphology instance.');

  // Validating settings
  var settings = helpers.assign({}, DEFAULT_SETTINGS, params.settings),
      validationError = helpers.validateSettings(settings);

  if (validationError)
    throw new Error('graphology-layout-forceatlas2/worker: ' + validationError.message);

  // Properties
  this.worker = null;
  this.graph = graph;
  this.settings = settings;
  this.matrices = null;
  this.running = false;
  this.killed = false;

  // Binding listeners
  this.handleMessage = this.handleMessage.bind(this);

  var respawnFrame = undefined;
  var self = this;

  this.handleGraphUpdate = function() {
    if (self.worker)
      self.worker.terminate();

    if (respawnFrame)
      clearTimeout(respawnFrame);

    respawnFrame = setTimeout(function() {
      respawnFrame = undefined;
      self.spawnWorker();
    }, 0);
  };

  graph.on('nodeAdded', this.handleGraphUpdate);
  graph.on('edgeAdded', this.handleGraphUpdate);
  graph.on('nodeDropped', this.handleGraphUpdate);
  graph.on('edgeDropped', this.handleGraphUpdate);

  // Spawning worker
  this.spawnWorker();
}

/**
 * Internal method used to spawn the web worker.
 */
FA2LayoutSupervisor.prototype.spawnWorker = function() {
  if (this.worker)
    this.worker.terminate();

  this.worker = helpers.createWorker(workerFunction);
  this.worker.addEventListener('message', this.handleMessage);

  if (this.running) {
    this.running = false;
    this.start();
  }
};

/**
 * Internal method used to handle the worker's messages.
 *
 * @param {object} event - Event to handle.
 */
FA2LayoutSupervisor.prototype.handleMessage = function(event) {
  if (!this.running)
    return;

  var matrix = new Float32Array(event.data.nodes);

  helpers.assignLayoutChanges(this.graph, matrix);
  this.matrices.nodes = matrix;

  // Looping
  this.askForIterations();
};

/**
 * Internal method used to ask for iterations from the worker.
 *
 * @param  {boolean} withEdges - Should we send edges along?
 * @return {FA2LayoutSupervisor}
 */
FA2LayoutSupervisor.prototype.askForIterations = function(withEdges) {
  var matrices = this.matrices;

  var payload = {
    settings: this.settings,
    nodes: matrices.nodes.buffer
  };

  var buffers = [matrices.nodes.buffer];

  if (withEdges) {
    payload.edges = matrices.edges.buffer;
    buffers.push(matrices.edges.buffer);
  }

  this.worker.postMessage(payload, buffers);

  return this;
};

/**
 * Method used to start the layout.
 *
 * @return {FA2LayoutSupervisor}
 */
FA2LayoutSupervisor.prototype.start = function() {
  if (this.killed)
    throw new Error('graphology-layout-forceatlas2/worker.start: layout was killed.');

  if (this.running)
    return this;

  // Building matrices
  this.matrices = helpers.graphToByteArrays(this.graph);

  this.running = true;
  this.askForIterations(true);

  return this;
};

/**
 * Method used to stop the layout.
 *
 * @return {FA2LayoutSupervisor}
 */
FA2LayoutSupervisor.prototype.stop = function() {
  this.running = false;

  return this;
};

/**
 * Method used to kill the layout.
 *
 * @return {FA2LayoutSupervisor}
 */
FA2LayoutSupervisor.prototype.kill = function() {
  if (this.killed)
    return this;

  this.running = false;
  this.killed = true;

  // Clearing memory
  this.matrices = null;

  // Terminating worker
  this.worker.terminate();

  // Unbinding listeners
  this.graph.removeListener('nodeAdded', this.handleGraphUpdate);
  this.graph.removeListener('edgeAdded', this.handleGraphUpdate);
  this.graph.removeListener('nodeDropped', this.handleGraphUpdate);
  this.graph.removeListener('edgeDropped', this.handleGraphUpdate);
};

/**
 * Exporting.
 */
module.exports = FA2LayoutSupervisor;


/***/ }),
/* 119 */
/***/ (function(module, exports) {

/**
 * Graphology ForceAtlas2 Layout Webworker
 * ========================================
 *
 * Web worker able to run the layout in a separate thread.
 */
module.exports = function worker() {
  var NODES,
      EDGES;

  var moduleShim = {};

  (function() {
    /* eslint no-constant-condition: 0 */
/**
 * Graphology ForceAtlas2 Iteration
 * =================================
 *
 * Function used to perform a single iteration of the algorithm.
 */

/**
 * Matrices properties accessors.
 */
var NODE_X = 0,
    NODE_Y = 1,
    NODE_DX = 2,
    NODE_DY = 3,
    NODE_OLD_DX = 4,
    NODE_OLD_DY = 5,
    NODE_MASS = 6,
    NODE_CONVERGENCE = 7,
    NODE_SIZE = 8,
    NODE_FIXED = 9;

var EDGE_SOURCE = 0,
    EDGE_TARGET = 1,
    EDGE_WEIGHT = 2;

var REGION_NODE = 0,
    REGION_CENTER_X = 1,
    REGION_CENTER_Y = 2,
    REGION_SIZE = 3,
    REGION_NEXT_SIBLING = 4,
    REGION_FIRST_CHILD = 5,
    REGION_MASS = 6,
    REGION_MASS_CENTER_X = 7,
    REGION_MASS_CENTER_Y = 8;

var SUBDIVISION_ATTEMPTS = 3;

/**
 * Constants.
 */
var PPN = 10,
    PPE = 3,
    PPR = 9;

var MAX_FORCE = 10;

/**
 * Function used to perform a single interation of the algorithm.
 *
 * @param  {object}       options    - Layout options.
 * @param  {Float32Array} NodeMatrix - Node data.
 * @param  {Float32Array} EdgeMatrix - Edge data.
 * @return {object}                  - Some metadata.
 */
moduleShim.exports = function iterate(options, NodeMatrix, EdgeMatrix) {

  // Initializing variables
  var l, r, n, n1, n2, rn, e, w, g, s;

  var order = NodeMatrix.length,
      size = EdgeMatrix.length;

  var adjustSizes = options.adjustSizes;

  var thetaSquared = options.barnesHutTheta * options.barnesHutTheta;

  var outboundAttCompensation,
      coefficient,
      xDist,
      yDist,
      ewc,
      distance,
      factor;

  var RegionMatrix = [];

  // 1) Initializing layout data
  //-----------------------------

  // Resetting positions & computing max values
  for (n = 0; n < order; n += PPN) {
    NodeMatrix[n + NODE_OLD_DX] = NodeMatrix[n + NODE_DX];
    NodeMatrix[n + NODE_OLD_DY] = NodeMatrix[n + NODE_DY];
    NodeMatrix[n + NODE_DX] = 0;
    NodeMatrix[n + NODE_DY] = 0;
  }

  // If outbound attraction distribution, compensate
  if (options.outboundAttractionDistribution) {
    outboundAttCompensation = 0;
    for (n = 0; n < order; n += PPN) {
      outboundAttCompensation += NodeMatrix[n + NODE_MASS];
    }

    outboundAttCompensation /= (order / PPN);
  }


  // 1.bis) Barnes-Hut computation
  //------------------------------

  if (options.barnesHutOptimize) {

    // Setting up
    var minX = Infinity,
        maxX = -Infinity,
        minY = Infinity,
        maxY = -Infinity,
        q, q2, subdivisionAttempts;

    // Computing min and max values
    for (n = 0; n < order; n += PPN) {
      minX = Math.min(minX, NodeMatrix[n + NODE_X]);
      maxX = Math.max(maxX, NodeMatrix[n + NODE_X]);
      minY = Math.min(minY, NodeMatrix[n + NODE_Y]);
      maxY = Math.max(maxY, NodeMatrix[n + NODE_Y]);
    }

    // squarify bounds, it's a quadtree
    var dx = maxX - minX, dy = maxY - minY;
    if (dx > dy) {
      minY -= (dx - dy) / 2;
      maxY = minY + dx;
    }
    else {
      minX -= (dy - dx) / 2;
      maxX = minX + dy;
    }

    // Build the Barnes Hut root region
    RegionMatrix[0 + REGION_NODE] = -1;
    RegionMatrix[0 + REGION_CENTER_X] = (minX + maxX) / 2;
    RegionMatrix[0 + REGION_CENTER_Y] = (minY + maxY) / 2;
    RegionMatrix[0 + REGION_SIZE] = Math.max(maxX - minX, maxY - minY);
    RegionMatrix[0 + REGION_NEXT_SIBLING] = -1;
    RegionMatrix[0 + REGION_FIRST_CHILD] = -1;
    RegionMatrix[0 + REGION_MASS] = 0;
    RegionMatrix[0 + REGION_MASS_CENTER_X] = 0;
    RegionMatrix[0 + REGION_MASS_CENTER_Y] = 0;

    // Add each node in the tree
    l = 1;
    for (n = 0; n < order; n += PPN) {

      // Current region, starting with root
      r = 0;
      subdivisionAttempts = SUBDIVISION_ATTEMPTS;

      while (true) {
        // Are there sub-regions?

        // We look at first child index
        if (RegionMatrix[r + REGION_FIRST_CHILD] >= 0) {

          // There are sub-regions

          // We just iterate to find a "leaf" of the tree
          // that is an empty region or a region with a single node
          // (see next case)

          // Find the quadrant of n
          if (NodeMatrix[n + NODE_X] < RegionMatrix[r + REGION_CENTER_X]) {

            if (NodeMatrix[n + NODE_Y] < RegionMatrix[r + REGION_CENTER_Y]) {

              // Top Left quarter
              q = RegionMatrix[r + REGION_FIRST_CHILD];
            }
            else {

              // Bottom Left quarter
              q = RegionMatrix[r + REGION_FIRST_CHILD] + PPR;
            }
          }
          else {
            if (NodeMatrix[n + NODE_Y] < RegionMatrix[r + REGION_CENTER_Y]) {

              // Top Right quarter
              q = RegionMatrix[r + REGION_FIRST_CHILD] + PPR * 2;
            }
            else {

              // Bottom Right quarter
              q = RegionMatrix[r + REGION_FIRST_CHILD] + PPR * 3;
            }
          }

          // Update center of mass and mass (we only do it for non-leave regions)
          RegionMatrix[r + REGION_MASS_CENTER_X] =
            (RegionMatrix[r + REGION_MASS_CENTER_X] * RegionMatrix[r + REGION_MASS] +
             NodeMatrix[n + NODE_X] * NodeMatrix[n + NODE_MASS]) /
            (RegionMatrix[r + REGION_MASS] + NodeMatrix[n + NODE_MASS]);

          RegionMatrix[r + REGION_MASS_CENTER_Y] =
            (RegionMatrix[r + REGION_MASS_CENTER_Y] * RegionMatrix[r + REGION_MASS] +
             NodeMatrix[n + NODE_Y] * NodeMatrix[n + NODE_MASS]) /
            (RegionMatrix[r + REGION_MASS] + NodeMatrix[n + NODE_MASS]);

          RegionMatrix[r + REGION_MASS] += NodeMatrix[n + NODE_MASS];

          // Iterate on the right quadrant
          r = q;
          continue;
        }
        else {

          // There are no sub-regions: we are in a "leaf"

          // Is there a node in this leave?
          if (RegionMatrix[r + REGION_NODE] < 0) {

            // There is no node in region:
            // we record node n and go on
            RegionMatrix[r + REGION_NODE] = n;
            break;
          }
          else {

            // There is a node in this region

            // We will need to create sub-regions, stick the two
            // nodes (the old one r[0] and the new one n) in two
            // subregions. If they fall in the same quadrant,
            // we will iterate.

            // Create sub-regions
            RegionMatrix[r + REGION_FIRST_CHILD] = l * PPR;
            w = RegionMatrix[r + REGION_SIZE] / 2; // new size (half)

            // NOTE: we use screen coordinates
            // from Top Left to Bottom Right

            // Top Left sub-region
            g = RegionMatrix[r + REGION_FIRST_CHILD];

            RegionMatrix[g + REGION_NODE] = -1;
            RegionMatrix[g + REGION_CENTER_X] = RegionMatrix[r + REGION_CENTER_X] - w;
            RegionMatrix[g + REGION_CENTER_Y] = RegionMatrix[r + REGION_CENTER_Y] - w;
            RegionMatrix[g + REGION_SIZE] = w;
            RegionMatrix[g + REGION_NEXT_SIBLING] = g + PPR;
            RegionMatrix[g + REGION_FIRST_CHILD] = -1;
            RegionMatrix[g + REGION_MASS] = 0;
            RegionMatrix[g + REGION_MASS_CENTER_X] = 0;
            RegionMatrix[g + REGION_MASS_CENTER_Y] = 0;

            // Bottom Left sub-region
            g += PPR;
            RegionMatrix[g + REGION_NODE] = -1;
            RegionMatrix[g + REGION_CENTER_X] = RegionMatrix[r + REGION_CENTER_X] - w;
            RegionMatrix[g + REGION_CENTER_Y] = RegionMatrix[r + REGION_CENTER_Y] + w;
            RegionMatrix[g + REGION_SIZE] = w;
            RegionMatrix[g + REGION_NEXT_SIBLING] = g + PPR;
            RegionMatrix[g + REGION_FIRST_CHILD] = -1;
            RegionMatrix[g + REGION_MASS] = 0;
            RegionMatrix[g + REGION_MASS_CENTER_X] = 0;
            RegionMatrix[g + REGION_MASS_CENTER_Y] = 0;

            // Top Right sub-region
            g += PPR;
            RegionMatrix[g + REGION_NODE] = -1;
            RegionMatrix[g + REGION_CENTER_X] = RegionMatrix[r + REGION_CENTER_X] + w;
            RegionMatrix[g + REGION_CENTER_Y] = RegionMatrix[r + REGION_CENTER_Y] - w;
            RegionMatrix[g + REGION_SIZE] = w;
            RegionMatrix[g + REGION_NEXT_SIBLING] = g + PPR;
            RegionMatrix[g + REGION_FIRST_CHILD] = -1;
            RegionMatrix[g + REGION_MASS] = 0;
            RegionMatrix[g + REGION_MASS_CENTER_X] = 0;
            RegionMatrix[g + REGION_MASS_CENTER_Y] = 0;

            // Bottom Right sub-region
            g += PPR;
            RegionMatrix[g + REGION_NODE] = -1;
            RegionMatrix[g + REGION_CENTER_X] = RegionMatrix[r + REGION_CENTER_X] + w;
            RegionMatrix[g + REGION_CENTER_Y] = RegionMatrix[r + REGION_CENTER_Y] + w;
            RegionMatrix[g + REGION_SIZE] = w;
            RegionMatrix[g + REGION_NEXT_SIBLING] = RegionMatrix[r + REGION_NEXT_SIBLING];
            RegionMatrix[g + REGION_FIRST_CHILD] = -1;
            RegionMatrix[g + REGION_MASS] = 0;
            RegionMatrix[g + REGION_MASS_CENTER_X] = 0;
            RegionMatrix[g + REGION_MASS_CENTER_Y] = 0;

            l += 4;

            // Now the goal is to find two different sub-regions
            // for the two nodes: the one previously recorded (r[0])
            // and the one we want to add (n)

            // Find the quadrant of the old node
            if (NodeMatrix[RegionMatrix[r + REGION_NODE] + NODE_X] < RegionMatrix[r + REGION_CENTER_X]) {
              if (NodeMatrix[RegionMatrix[r + REGION_NODE] + NODE_Y] < RegionMatrix[r + REGION_CENTER_Y]) {

                // Top Left quarter
                q = RegionMatrix[r + REGION_FIRST_CHILD];
              }
              else {

                // Bottom Left quarter
                q = RegionMatrix[r + REGION_FIRST_CHILD] + PPR;
              }
            }
            else {
              if (NodeMatrix[RegionMatrix[r + REGION_NODE] + NODE_Y] < RegionMatrix[r + REGION_CENTER_Y]) {

                // Top Right quarter
                q = RegionMatrix[r + REGION_FIRST_CHILD] + PPR * 2;
              }
              else {

                // Bottom Right quarter
                q = RegionMatrix[r + REGION_FIRST_CHILD] + PPR * 3;
              }
            }

            // We remove r[0] from the region r, add its mass to r and record it in q
            RegionMatrix[r + REGION_MASS] = NodeMatrix[RegionMatrix[r + REGION_NODE] + NODE_MASS];
            RegionMatrix[r + REGION_MASS_CENTER_X] = NodeMatrix[RegionMatrix[r + REGION_NODE] + NODE_X];
            RegionMatrix[r + REGION_MASS_CENTER_Y] = NodeMatrix[RegionMatrix[r + REGION_NODE] + NODE_Y];

            RegionMatrix[q + REGION_NODE] = RegionMatrix[r + REGION_NODE];
            RegionMatrix[r + REGION_NODE] = -1;

            // Find the quadrant of n
            if (NodeMatrix[n + NODE_X] < RegionMatrix[r + REGION_CENTER_X]) {
              if (NodeMatrix[n + NODE_Y] < RegionMatrix[r + REGION_CENTER_Y]) {

                // Top Left quarter
                q2 = RegionMatrix[r + REGION_FIRST_CHILD];
              }
              else {
                // Bottom Left quarter
                q2 = RegionMatrix[r + REGION_FIRST_CHILD] + PPR;
              }
            }
            else {
              if (NodeMatrix[n + NODE_Y] < RegionMatrix[r + REGION_CENTER_Y]) {

                // Top Right quarter
                q2 = RegionMatrix[r + REGION_FIRST_CHILD] + PPR * 2;
              }
              else {

                // Bottom Right quarter
                q2 = RegionMatrix[r + REGION_FIRST_CHILD] + PPR * 3;
              }
            }

            if (q === q2) {

              // If both nodes are in the same quadrant,
              // we have to try it again on this quadrant
              if (subdivisionAttempts--) {
                r = q;
                continue; // while
              }
              else {
                // we are out of precision here, and we cannot subdivide anymore
                // but we have to break the loop anyway
                subdivisionAttempts = SUBDIVISION_ATTEMPTS;
                break; // while
              }

            }

            // If both quadrants are different, we record n
            // in its quadrant
            RegionMatrix[q2 + REGION_NODE] = n;
            break;
          }
        }
      }
    }
  }


  // 2) Repulsion
  //--------------
  // NOTES: adjustSizes = antiCollision & scalingRatio = coefficient

  if (options.barnesHutOptimize) {
    coefficient = options.scalingRatio;

    // Applying repulsion through regions
    for (n = 0; n < order; n += PPN) {

      // Computing leaf quad nodes iteration

      r = 0; // Starting with root region
      while (true) {

        if (RegionMatrix[r + REGION_FIRST_CHILD] >= 0) {

          // The region has sub-regions

          // We run the Barnes Hut test to see if we are at the right distance
          distance = (
            (Math.pow(NodeMatrix[n + NODE_X] - RegionMatrix[r + REGION_MASS_CENTER_X], 2)) +
            (Math.pow(NodeMatrix[n + NODE_Y] - RegionMatrix[r + REGION_MASS_CENTER_Y], 2))
          );

          s = RegionMatrix[r + REGION_SIZE];

          if ((4 * s * s) / distance < thetaSquared) {

            // We treat the region as a single body, and we repulse

            xDist = NodeMatrix[n + NODE_X] - RegionMatrix[r + REGION_MASS_CENTER_X];
            yDist = NodeMatrix[n + NODE_Y] - RegionMatrix[r + REGION_MASS_CENTER_Y];

            if (adjustSizes === true) {

              //-- Linear Anti-collision Repulsion
              if (distance > 0) {
                factor = coefficient * NodeMatrix[n + NODE_MASS] *
                  RegionMatrix[r + REGION_MASS] / distance;

                NodeMatrix[n + NODE_DX] += xDist * factor;
                NodeMatrix[n + NODE_DY] += yDist * factor;
              }
              else if (distance < 0) {
                factor = -coefficient * NodeMatrix[n + NODE_MASS] *
                  RegionMatrix[r + REGION_MASS] / Math.sqrt(distance);

                NodeMatrix[n + NODE_DX] += xDist * factor;
                NodeMatrix[n + NODE_DY] += yDist * factor;
              }
            }
            else {

              //-- Linear Repulsion
              if (distance > 0) {
                factor = coefficient * NodeMatrix[n + NODE_MASS] *
                  RegionMatrix[r + REGION_MASS] / distance;

                NodeMatrix[n + NODE_DX] += xDist * factor;
                NodeMatrix[n + NODE_DY] += yDist * factor;
              }
            }

            // When this is done, we iterate. We have to look at the next sibling.
            r = RegionMatrix[r + REGION_NEXT_SIBLING];
            if (r < 0)
              break; // No next sibling: we have finished the tree

            continue;
          }
          else {

            // The region is too close and we have to look at sub-regions
            r = RegionMatrix[r + REGION_FIRST_CHILD];
            continue;
          }

        }
        else {

          // The region has no sub-region
          // If there is a node r[0] and it is not n, then repulse
          rn = RegionMatrix[r + REGION_NODE];

          if (rn >= 0 && rn !== n) {
            xDist = NodeMatrix[n + NODE_X] - NodeMatrix[rn + NODE_X];
            yDist = NodeMatrix[n + NODE_Y] - NodeMatrix[rn + NODE_Y];

            distance = xDist * xDist + yDist * yDist;

            if (adjustSizes === true) {

              //-- Linear Anti-collision Repulsion
              if (distance > 0) {
                factor = coefficient * NodeMatrix[n + NODE_MASS] *
                  NodeMatrix[rn + NODE_MASS] / distance;

                NodeMatrix[n + NODE_DX] += xDist * factor;
                NodeMatrix[n + NODE_DY] += yDist * factor;
              }
              else if (distance < 0) {
                factor = -coefficient * NodeMatrix[n + NODE_MASS] *
                  NodeMatrix[rn + NODE_MASS] / Math.sqrt(distance);

                NodeMatrix[n + NODE_DX] += xDist * factor;
                NodeMatrix[n + NODE_DY] += yDist * factor;
              }
            }
            else {

              //-- Linear Repulsion
              if (distance > 0) {
                factor = coefficient * NodeMatrix[n + NODE_MASS] *
                  NodeMatrix[rn + NODE_MASS] / distance;

                NodeMatrix[n + NODE_DX] += xDist * factor;
                NodeMatrix[n + NODE_DY] += yDist * factor;
              }
            }

          }

          // When this is done, we iterate. We have to look at the next sibling.
          r = RegionMatrix[r + REGION_NEXT_SIBLING];

          if (r < 0)
            break; // No next sibling: we have finished the tree

          continue;
        }
      }
    }
  }
  else {
    coefficient = options.scalingRatio;

    // Square iteration
    for (n1 = 0; n1 < order; n1 += PPN) {
      for (n2 = 0; n2 < n1; n2 += PPN) {

        // Common to both methods
        xDist = NodeMatrix[n1 + NODE_X] - NodeMatrix[n2 + NODE_X];
        yDist = NodeMatrix[n1 + NODE_Y] - NodeMatrix[n2 + NODE_Y];

        if (adjustSizes === true) {

          //-- Anticollision Linear Repulsion
          distance = Math.sqrt(xDist * xDist + yDist * yDist) -
            NodeMatrix[n1 + NODE_SIZE] -
            NodeMatrix[n2 + NODE_SIZE];

          if (distance > 0) {
            factor = coefficient *
              NodeMatrix[n1 + NODE_MASS] *
              NodeMatrix[n2 + NODE_MASS] /
              distance / distance;

            // Updating nodes' dx and dy
            NodeMatrix[n1 + NODE_DX] += xDist * factor;
            NodeMatrix[n1 + NODE_DY] += yDist * factor;

            NodeMatrix[n2 + NODE_DX] += xDist * factor;
            NodeMatrix[n2 + NODE_DY] += yDist * factor;
          }
          else if (distance < 0) {
            factor = 100 * coefficient *
              NodeMatrix[n1 + NODE_MASS] *
              NodeMatrix[n2 + NODE_MASS];

            // Updating nodes' dx and dy
            NodeMatrix[n1 + NODE_DX] += xDist * factor;
            NodeMatrix[n1 + NODE_DY] += yDist * factor;

            NodeMatrix[n2 + NODE_DX] -= xDist * factor;
            NodeMatrix[n2 + NODE_DY] -= yDist * factor;
          }
        }
        else {

          //-- Linear Repulsion
          distance = Math.sqrt(xDist * xDist + yDist * yDist);

          if (distance > 0) {
            factor = coefficient *
              NodeMatrix[n1 + NODE_MASS] *
              NodeMatrix[n2 + NODE_MASS] /
              distance / distance;

            // Updating nodes' dx and dy
            NodeMatrix[n1 + NODE_DX] += xDist * factor;
            NodeMatrix[n1 + NODE_DY] += yDist * factor;

            NodeMatrix[n2 + NODE_DX] -= xDist * factor;
            NodeMatrix[n2 + NODE_DY] -= yDist * factor;
          }
        }
      }
    }
  }


  // 3) Gravity
  //------------
  g = options.gravity / options.scalingRatio;
  coefficient = options.scalingRatio;
  for (n = 0; n < order; n += PPN) {
    factor = 0;

    // Common to both methods
    xDist = NodeMatrix[n + NODE_X];
    yDist = NodeMatrix[n + NODE_Y];
    distance = Math.sqrt(
      Math.pow(xDist, 2) + Math.pow(yDist, 2)
    );

    if (options.strongGravityMode) {

      //-- Strong gravity
      if (distance > 0)
        factor = coefficient * NodeMatrix[n + NODE_MASS] * g;
    }
    else {

      //-- Linear Anti-collision Repulsion n
      if (distance > 0)
        factor = coefficient * NodeMatrix[n + NODE_MASS] * g / distance;
    }

    // Updating node's dx and dy
    NodeMatrix[n + NODE_DX] -= xDist * factor;
    NodeMatrix[n + NODE_DY] -= yDist * factor;
  }

  // 4) Attraction
  //---------------
  coefficient = 1 *
    (options.outboundAttractionDistribution ?
      outboundAttCompensation :
      1);

  // TODO: simplify distance
  // TODO: coefficient is always used as -c --> optimize?
  for (e = 0; e < size; e += PPE) {
    n1 = EdgeMatrix[e + EDGE_SOURCE];
    n2 = EdgeMatrix[e + EDGE_TARGET];
    w = EdgeMatrix[e + EDGE_WEIGHT];

    // Edge weight influence
    ewc = Math.pow(w, options.edgeWeightInfluence);

    // Common measures
    xDist = NodeMatrix[n1 + NODE_X] - NodeMatrix[n2 + NODE_X];
    yDist = NodeMatrix[n1 + NODE_Y] - NodeMatrix[n2 + NODE_Y];

    // Applying attraction to nodes
    if (adjustSizes === true) {

      distance = Math.sqrt(
        (Math.pow(xDist, 2) + Math.pow(yDist, 2)) -
        NodeMatrix[n1 + NODE_SIZE] -
        NodeMatrix[n2 + NODE_SIZE]
      );

      if (options.linLogMode) {
        if (options.outboundAttractionDistribution) {

          //-- LinLog Degree Distributed Anti-collision Attraction
          if (distance > 0) {
            factor = -coefficient * ewc * Math.log(1 + distance) /
            distance /
            NodeMatrix[n1 + NODE_MASS];
          }
        }
        else {

          //-- LinLog Anti-collision Attraction
          if (distance > 0) {
            factor = -coefficient * ewc * Math.log(1 + distance) / distance;
          }
        }
      }
      else {
        if (options.outboundAttractionDistribution) {

          //-- Linear Degree Distributed Anti-collision Attraction
          if (distance > 0) {
            factor = -coefficient * ewc / NodeMatrix[n1 + NODE_MASS];
          }
        }
        else {

          //-- Linear Anti-collision Attraction
          if (distance > 0) {
            factor = -coefficient * ewc;
          }
        }
      }
    }
    else {

      distance = Math.sqrt(
        Math.pow(xDist, 2) + Math.pow(yDist, 2)
      );

      if (options.linLogMode) {
        if (options.outboundAttractionDistribution) {

          //-- LinLog Degree Distributed Attraction
          if (distance > 0) {
            factor = -coefficient * ewc * Math.log(1 + distance) /
              distance /
              NodeMatrix[n1 + NODE_MASS];
          }
        }
        else {

          //-- LinLog Attraction
          if (distance > 0)
            factor = -coefficient * ewc * Math.log(1 + distance) / distance;
        }
      }
      else {
        if (options.outboundAttractionDistribution) {

          //-- Linear Attraction Mass Distributed
          // NOTE: Distance is set to 1 to override next condition
          distance = 1;
          factor = -coefficient * ewc / NodeMatrix[n1 + NODE_MASS];
        }
        else {

          //-- Linear Attraction
          // NOTE: Distance is set to 1 to override next condition
          distance = 1;
          factor = -coefficient * ewc;
        }
      }
    }

    // Updating nodes' dx and dy
    // TODO: if condition or factor = 1?
    if (distance > 0) {

      // Updating nodes' dx and dy
      NodeMatrix[n1 + NODE_DX] += xDist * factor;
      NodeMatrix[n1 + NODE_DY] += yDist * factor;

      NodeMatrix[n2 + NODE_DX] -= xDist * factor;
      NodeMatrix[n2 + NODE_DY] -= yDist * factor;
    }
  }


  // 5) Apply Forces
  //-----------------
  var force,
      swinging,
      traction,
      nodespeed,
      newX,
      newY;

  // MATH: sqrt and square distances
  if (adjustSizes === true) {

    for (n = 0; n < order; n += PPN) {
      if (NodeMatrix[n + NODE_FIXED] !== 1) {
        force = Math.sqrt(
          Math.pow(NodeMatrix[n + NODE_DX], 2) +
          Math.pow(NodeMatrix[n + NODE_DY], 2)
        );

        if (force > MAX_FORCE) {
          NodeMatrix[n + NODE_DX] =
            NodeMatrix[n + NODE_DX] * MAX_FORCE / force;
          NodeMatrix[n + NODE_DY] =
            NodeMatrix[n + NODE_DY] * MAX_FORCE / force;
        }

        swinging = NodeMatrix[n + NODE_MASS] *
          Math.sqrt(
            (NodeMatrix[n + NODE_OLD_DX] - NodeMatrix[n + NODE_DX]) *
            (NodeMatrix[n + NODE_OLD_DX] - NodeMatrix[n + NODE_DX]) +
            (NodeMatrix[n + NODE_OLD_DY] - NodeMatrix[n + NODE_DY]) *
            (NodeMatrix[n + NODE_OLD_DY] - NodeMatrix[n + NODE_DY])
          );

        traction = Math.sqrt(
          (NodeMatrix[n + NODE_OLD_DX] + NodeMatrix[n + NODE_DX]) *
          (NodeMatrix[n + NODE_OLD_DX] + NodeMatrix[n + NODE_DX]) +
          (NodeMatrix[n + NODE_OLD_DY] + NodeMatrix[n + NODE_DY]) *
          (NodeMatrix[n + NODE_OLD_DY] + NodeMatrix[n + NODE_DY])
        ) / 2;

        nodespeed =
          0.1 * Math.log(1 + traction) / (1 + Math.sqrt(swinging));

        // Updating node's positon
        newX = NodeMatrix[n + NODE_X] + NodeMatrix[n + NODE_DX] *
          (nodespeed / options.slowDown);
        NodeMatrix[n + NODE_X] = newX;

        newY = NodeMatrix[n + NODE_Y] + NodeMatrix[n + NODE_DY] *
          (nodespeed / options.slowDown);
        NodeMatrix[n + NODE_Y] = newY;
      }
    }
  }
  else {

    for (n = 0; n < order; n += PPN) {
      if (NodeMatrix[n + NODE_FIXED] !== 1) {

        swinging = NodeMatrix[n + NODE_MASS] *
          Math.sqrt(
            (NodeMatrix[n + NODE_OLD_DX] - NodeMatrix[n + NODE_DX]) *
            (NodeMatrix[n + NODE_OLD_DX] - NodeMatrix[n + NODE_DX]) +
            (NodeMatrix[n + NODE_OLD_DY] - NodeMatrix[n + NODE_DY]) *
            (NodeMatrix[n + NODE_OLD_DY] - NodeMatrix[n + NODE_DY])
          );

        traction = Math.sqrt(
          (NodeMatrix[n + NODE_OLD_DX] + NodeMatrix[n + NODE_DX]) *
          (NodeMatrix[n + NODE_OLD_DX] + NodeMatrix[n + NODE_DX]) +
          (NodeMatrix[n + NODE_OLD_DY] + NodeMatrix[n + NODE_DY]) *
          (NodeMatrix[n + NODE_OLD_DY] + NodeMatrix[n + NODE_DY])
        ) / 2;

        nodespeed = NodeMatrix[n + NODE_CONVERGENCE] *
          Math.log(1 + traction) / (1 + Math.sqrt(swinging));

        // Updating node convergence
        NodeMatrix[n + NODE_CONVERGENCE] =
          Math.min(1, Math.sqrt(
            nodespeed *
            (Math.pow(NodeMatrix[n + NODE_DX], 2) +
             Math.pow(NodeMatrix[n + NODE_DY], 2)) /
            (1 + Math.sqrt(swinging))
          ));

        // Updating node's positon
        newX = NodeMatrix[n + NODE_X] + NodeMatrix[n + NODE_DX] *
          (nodespeed / options.slowDown);
        NodeMatrix[n + NODE_X] = newX;

        newY = NodeMatrix[n + NODE_Y] + NodeMatrix[n + NODE_DY] *
          (nodespeed / options.slowDown);
        NodeMatrix[n + NODE_Y] = newY;
      }
    }
  }

  // We return the information about the layout (no need to return the matrices)
  return {};
};

  })();

  var iterate = moduleShim.exports;

  self.addEventListener('message', function(event) {
    var data = event.data;

    NODES = new Float32Array(data.nodes);

    if (data.edges)
      EDGES = new Float32Array(data.edges);

    // Running the iteration
    iterate(
      data.settings,
      NODES,
      EDGES
    );

    // Sending result to supervisor
    self.postMessage({
      nodes: NODES.buffer
    }, [NODES.buffer]);
  });
};



/***/ }),
/* 120 */
/***/ (function(module, exports) {

/**
 * Graphology isGraph
 * ===================
 *
 * Very simple function aiming at ensuring the given variable is a
 * graphology instance.
 */

/**
 * Checking the value is a graphology instance.
 *
 * @param  {any}     value - Target value.
 * @return {boolean}
 */
module.exports = function isGraph(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.addUndirectedEdgeWithKey === 'function' &&
    typeof value.dropNode === 'function' &&
    typeof value.multi === 'boolean'
  );
};


/***/ }),
/* 121 */
/***/ (function(module, exports) {

/**
 * Graphology ForceAtlas2 Helpers
 * ===============================
 *
 * Miscellaneous helper functions.
 */

/**
 * Constants.
 */
var PPN = 10,
    PPE = 3;

/**
 * Very simple Object.assign-like function.
 *
 * @param  {object} target       - First object.
 * @param  {object} [...objects] - Objects to merge.
 * @return {object}
 */
exports.assign = function(target) {
  target = target || {};

  var objects = Array.prototype.slice.call(arguments).slice(1),
      i,
      k,
      l;

  for (i = 0, l = objects.length; i < l; i++) {
    if (!objects[i])
      continue;

    for (k in objects[i])
      target[k] = objects[i][k];
  }

  return target;
};

/**
 * Function used to validate the given settings.
 *
 * @param  {object}      settings - Settings to validate.
 * @return {object|null}
 */
exports.validateSettings = function(settings) {

  if ('linLogMode' in settings &&
      typeof settings.linLogMode !== 'boolean')
    return {message: 'the `linLogMode` setting should be a boolean.'};

  if ('outboundAttractionDistribution' in settings &&
      typeof settings.outboundAttractionDistribution !== 'boolean')
    return {message: 'the `outboundAttractionDistribution` setting should be a boolean.'};

  if ('adjustSizes' in settings &&
      typeof settings.adjustSizes !== 'boolean')
    return {message: 'the `adjustSizes` setting should be a boolean.'};

  if ('edgeWeightInfluence' in settings &&
      typeof settings.edgeWeightInfluence !== 'number' &&
      settings.edgeWeightInfluence < 0)
    return {message: 'the `edgeWeightInfluence` setting should be a number >= 0.'};

  if ('scalingRatio' in settings &&
      typeof settings.scalingRatio !== 'number' &&
      settings.scalingRatio < 0)
    return {message: 'the `scalingRatio` setting should be a number >= 0.'};

  if ('strongGravityMode' in settings &&
      typeof settings.strongGravityMode !== 'boolean')
    return {message: 'the `strongGravityMode` setting should be a boolean.'};

  if ('gravity' in settings &&
      typeof settings.gravity !== 'number' &&
      settings.gravity < 0)
    return {message: 'the `gravity` setting should be a number >= 0.'};

  if ('slowDown' in settings &&
      typeof settings.slowDown !== 'number' &&
      settings.slowDown < 0)
    return {message: 'the `slowDown` setting should be a number >= 0.'};

  if ('barnesHutOptimize' in settings &&
      typeof settings.barnesHutOptimize !== 'boolean')
    return {message: 'the `barnesHutOptimize` setting should be a boolean.'};

  if ('barnesHutTheta' in settings &&
      typeof settings.barnesHutTheta !== 'number' &&
      settings.barnesHutTheta < 0)
    return {message: 'the `barnesHutTheta` setting should be a number >= 0.'};

  return null;
};

/**
 * Function generating a flat matrix for both nodes & edges of the given graph.
 *
 * @param  {Graph}  graph - Target graph.
 * @return {object}       - Both matrices.
 */
exports.graphToByteArrays = function(graph) {
  var order = graph.order,
      size = graph.size,
      index = {},
      j;

  var NodeMatrix = new Float32Array(order * PPN),
      EdgeMatrix = new Float32Array(size * PPE);

  // Iterate through nodes
  j = 0;
  graph.forEachNode(function(node, attr) {

    // Node index
    index[node] = j;

    // Populating byte array
    NodeMatrix[j] = attr.x;
    NodeMatrix[j + 1] = attr.y;
    NodeMatrix[j + 2] = 0;
    NodeMatrix[j + 3] = 0;
    NodeMatrix[j + 4] = 0;
    NodeMatrix[j + 5] = 0;
    NodeMatrix[j + 6] = 1 + graph.degree(node);
    NodeMatrix[j + 7] = 1;
    NodeMatrix[j + 8] = attr.size || 1;
    NodeMatrix[j + 9] = attr.fixed ? 1 : 0;
    j += PPN;
  });

  // Iterate through edges
  j = 0;
  graph.forEachEdge(function(edge, attr, source, target) {

    // Populating byte array
    EdgeMatrix[j] = index[source];
    EdgeMatrix[j + 1] = index[target];
    EdgeMatrix[j + 2] = attr.weight || 0;
    j += PPE;
  });

  return {
    nodes: NodeMatrix,
    edges: EdgeMatrix
  };
};

/**
 * Function applying the layout back to the graph.
 *
 * @param {Graph}        graph      - Target graph.
 * @param {Float32Array} NodeMatrix - Node matrix.
 */
exports.assignLayoutChanges = function(graph, NodeMatrix) {
  var i = 0;

  graph.updateEachNodeAttributes(function(node, attr) {
    attr.x = NodeMatrix[i];
    attr.y = NodeMatrix[i + 1];

    i += PPN;

    return attr;
  }, {attributes: ['x', 'y']});
};

/**
 * Function collecting the layout positions.
 *
 * @param  {Graph}        graph      - Target graph.
 * @param  {Float32Array} NodeMatrix - Node matrix.
 * @return {object}                  - Map to node positions.
 */
exports.collectLayoutChanges = function(graph, NodeMatrix) {
  var nodes = graph.nodes(),
      positions = {};

  for (var i = 0, j = 0, l = NodeMatrix.length; i < l; i += PPN) {
    positions[nodes[j]] = {
      x: NodeMatrix[i],
      y: NodeMatrix[i + 1]
    };

    j++;
  }

  return positions;
};

/**
 * Function returning a web worker from the given function.
 *
 * @param  {function}  fn - Function for the worker.
 * @return {DOMString}
 */
exports.createWorker = function createWorker(fn) {
  var xURL = window.URL || window.webkitURL;
  var code = fn.toString();
  var objectUrl = xURL.createObjectURL(new Blob(['(' + code + ').call(this);'], {type: 'text/javascript'}));
  var worker = new Worker(objectUrl);
  xURL.revokeObjectURL(objectUrl);

  return worker;
};


/***/ }),
/* 122 */
/***/ (function(module, exports) {

/**
 * Graphology ForceAtlas2 Layout Default Settings
 * ===============================================
 */
module.exports = {
  linLogMode: false,
  outboundAttractionDistribution: false,
  adjustSizes: false,
  edgeWeightInfluence: 0,
  scalingRatio: 1,
  strongGravityMode: false,
  gravity: 1,
  slowDown: 1,
  barnesHutOptimize: false,
  barnesHutTheta: 0.5
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).graphology=t()}(this,(function(){"use strict";function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(t)}function t(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,r(e,t)}function n(e){return(n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function r(e,t){return(r=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function i(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function o(e,t,n){return(o=i()?Reflect.construct:function(e,t,n){var i=[null];i.push.apply(i,t);var o=new(Function.bind.apply(e,i));return n&&r(o,n.prototype),o}).apply(null,arguments)}function a(e){var t="function"==typeof Map?new Map:void 0;return(a=function(e){if(null===e||(i=e,-1===Function.toString.call(i).indexOf("[native code]")))return e;var i;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,a)}function a(){return o(e,arguments,n(this).constructor)}return a.prototype=Object.create(e.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),r(a,e)})(e)}function u(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var d=function(){for(var e=arguments[0],t=1,n=arguments.length;t<n;t++)if(arguments[t])for(var r in arguments[t])e[r]=arguments[t][r];return e};function c(e,t,n,r){var i=e._nodes.get(t),o=null;return i?o="mixed"===r?i.out&&i.out[n]||i.undirected&&i.undirected[n]:"directed"===r?i.out&&i.out[n]:i.undirected&&i.undirected[n]:o}function s(t){return null!==t&&"object"===e(t)&&"function"==typeof t.addUndirectedEdgeWithKey&&"function"==typeof t.dropNode}function h(t){return"object"===e(t)&&null!==t&&t.constructor===Object}function f(e){var t;for(t in e)return!1;return!0}function p(e,t,n){Object.defineProperty(e,t,{enumerable:!1,configurable:!1,writable:!0,value:n})}function g(e,t,n){var r={enumerable:!0,configurable:!0};"function"==typeof n?r.get=n:(r.value=n,r.writable=!1),Object.defineProperty(e,t,r)}function l(e){return!!h(e)&&!(e.attributes&&!Array.isArray(e.attributes))}"function"==typeof Object.assign&&(d=Object.assign);var y,v={exports:{}},b="object"==typeof Reflect?Reflect:null,w=b&&"function"==typeof b.apply?b.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};y=b&&"function"==typeof b.ownKeys?b.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var m=Number.isNaN||function(e){return e!=e};function _(){_.init.call(this)}v.exports=_,v.exports.once=function(e,t){return new Promise((function(n,r){function i(n){e.removeListener(t,o),r(n)}function o(){"function"==typeof e.removeListener&&e.removeListener("error",i),n([].slice.call(arguments))}j(e,t,o,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&j(e,"error",t,n)}(e,i,{once:!0})}))},_.EventEmitter=_,_.prototype._events=void 0,_.prototype._eventsCount=0,_.prototype._maxListeners=void 0;var k=10;function G(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function x(e){return void 0===e._maxListeners?_.defaultMaxListeners:e._maxListeners}function E(e,t,n,r){var i,o,a,u;if(G(n),void 0===(o=e._events)?(o=e._events=Object.create(null),e._eventsCount=0):(void 0!==o.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),o=e._events),a=o[t]),void 0===a)a=o[t]=n,++e._eventsCount;else if("function"==typeof a?a=o[t]=r?[n,a]:[a,n]:r?a.unshift(n):a.push(n),(i=x(e))>0&&a.length>i&&!a.warned){a.warned=!0;var d=new Error("Possible EventEmitter memory leak detected. "+a.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");d.name="MaxListenersExceededWarning",d.emitter=e,d.type=t,d.count=a.length,u=d,console&&console.warn&&console.warn(u)}return e}function S(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function A(e,t,n){var r={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},i=S.bind(r);return i.listener=n,r.wrapFn=i,i}function L(e,t,n){var r=e._events;if(void 0===r)return[];var i=r[t];return void 0===i?[]:"function"==typeof i?n?[i.listener||i]:[i]:n?function(e){for(var t=new Array(e.length),n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(i):D(i,i.length)}function N(e){var t=this._events;if(void 0!==t){var n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function D(e,t){for(var n=new Array(t),r=0;r<t;++r)n[r]=e[r];return n}function j(e,t,n,r){if("function"==typeof e.on)r.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function i(o){r.once&&e.removeEventListener(t,i),n(o)}))}}function U(e){Object.defineProperty(this,"_next",{writable:!1,enumerable:!1,value:e}),this.done=!1}Object.defineProperty(_,"defaultMaxListeners",{enumerable:!0,get:function(){return k},set:function(e){if("number"!=typeof e||e<0||m(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");k=e}}),_.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},_.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||m(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},_.prototype.getMaxListeners=function(){return x(this)},_.prototype.emit=function(e){for(var t=[],n=1;n<arguments.length;n++)t.push(arguments[n]);var r="error"===e,i=this._events;if(void 0!==i)r=r&&void 0===i.error;else if(!r)return!1;if(r){var o;if(t.length>0&&(o=t[0]),o instanceof Error)throw o;var a=new Error("Unhandled error."+(o?" ("+o.message+")":""));throw a.context=o,a}var u=i[e];if(void 0===u)return!1;if("function"==typeof u)w(u,this,t);else{var d=u.length,c=D(u,d);for(n=0;n<d;++n)w(c[n],this,t)}return!0},_.prototype.addListener=function(e,t){return E(this,e,t,!1)},_.prototype.on=_.prototype.addListener,_.prototype.prependListener=function(e,t){return E(this,e,t,!0)},_.prototype.once=function(e,t){return G(t),this.on(e,A(this,e,t)),this},_.prototype.prependOnceListener=function(e,t){return G(t),this.prependListener(e,A(this,e,t)),this},_.prototype.removeListener=function(e,t){var n,r,i,o,a;if(G(t),void 0===(r=this._events))return this;if(void 0===(n=r[e]))return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete r[e],r.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(i=-1,o=n.length-1;o>=0;o--)if(n[o]===t||n[o].listener===t){a=n[o].listener,i=o;break}if(i<0)return this;0===i?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,i),1===n.length&&(r[e]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",e,a||t)}return this},_.prototype.off=_.prototype.removeListener,_.prototype.removeAllListeners=function(e){var t,n,r;if(void 0===(n=this._events))return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){var i,o=Object.keys(n);for(r=0;r<o.length;++r)"removeListener"!==(i=o[r])&&this.removeAllListeners(i);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=n[e]))this.removeListener(e,t);else if(void 0!==t)for(r=t.length-1;r>=0;r--)this.removeListener(e,t[r]);return this},_.prototype.listeners=function(e){return L(this,e,!0)},_.prototype.rawListeners=function(e){return L(this,e,!1)},_.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):N.call(e,t)},_.prototype.listenerCount=N,_.prototype.eventNames=function(){return this._eventsCount>0?y(this._events):[]},U.prototype.next=function(){if(this.done)return{done:!0};var e=this._next();return e.done&&(this.done=!0),e},"undefined"!=typeof Symbol&&(U.prototype[Symbol.iterator]=function(){return this}),U.of=function(){var e=arguments,t=e.length,n=0;return new U((function(){return n>=t?{done:!0}:{done:!1,value:e[n++]}}))},U.empty=function(){var e=new U(null);return e.done=!0,e},U.is=function(e){return e instanceof U||"object"==typeof e&&null!==e&&"function"==typeof e.next};var O=U,C=function(e,t){for(var n,r=arguments.length>1?t:1/0,i=r!==1/0?new Array(r):[],o=0;;){if(o===r)return i;if((n=e.next()).done)return o!==t?i.slice(0,o):i;i[o++]=n.value}},K=function(e){function n(t,n){var r;return(r=e.call(this)||this).name="GraphError",r.message=t||"",r.data=n||{},r}return t(n,e),n}(a(Error)),z=function(e){function n(t,r){var i;return(i=e.call(this,t,r)||this).name="InvalidArgumentsGraphError","function"==typeof Error.captureStackTrace&&Error.captureStackTrace(u(i),n.prototype.constructor),i}return t(n,e),n}(K),M=function(e){function n(t,r){var i;return(i=e.call(this,t,r)||this).name="NotFoundGraphError","function"==typeof Error.captureStackTrace&&Error.captureStackTrace(u(i),n.prototype.constructor),i}return t(n,e),n}(K),P=function(e){function n(t,r){var i;return(i=e.call(this,t,r)||this).name="UsageGraphError","function"==typeof Error.captureStackTrace&&Error.captureStackTrace(u(i),n.prototype.constructor),i}return t(n,e),n}(K);function T(e,t){this.key=e,this.attributes=t,this.inDegree=0,this.outDegree=0,this.undirectedDegree=0,this.directedSelfLoops=0,this.undirectedSelfLoops=0,this.in={},this.out={},this.undirected={}}function R(e,t){this.key=e,this.attributes=t,this.inDegree=0,this.outDegree=0,this.directedSelfLoops=0,this.in={},this.out={}}function F(e,t){this.key=e,this.attributes=t,this.undirectedDegree=0,this.undirectedSelfLoops=0,this.undirected={}}function I(e,t,n,r,i,o){this.key=t,this.attributes=o,this.undirected=e,this.source=r,this.target=i,this.generatedKey=n}function W(e,t,n,r,i,o,a){var u,d,c="out",s="in";if(t&&(c=s="undirected"),e.multi){if(void 0===(d=(u=o[c])[i])&&(d=new Set,u[i]=d),d.add(n),r===i&&t)return;void 0===(u=a[s])[r]&&(u[r]=d)}else{if(o[c][i]=n,r===i&&t)return;a[s][r]=n}}function Y(e,t,n){var r=e.multi,i=n.source,o=n.target,a=i.key,u=o.key,d=i[t?"undirected":"out"],c=t?"undirected":"in";if(u in d)if(r){var s=d[u];1===s.size?(delete d[u],delete o[c][a]):s.delete(n)}else delete d[u];r||delete o[c][a]}R.prototype.upgradeToMixed=function(){this.undirectedDegree=0,this.undirectedSelfLoops=0,this.undirected={}},F.prototype.upgradeToMixed=function(){this.inDegree=0,this.outDegree=0,this.directedSelfLoops=0,this.in={},this.out={}};var B=[{name:function(e){return"get".concat(e,"Attribute")},attacher:function(e,t,n){e.prototype[t]=function(e,r){var i;if("mixed"!==this.type&&"mixed"!==n&&n!==this.type)throw new P("Graph.".concat(t,": cannot find this type of edges in your ").concat(this.type," graph."));if(arguments.length>2){if(this.multi)throw new P("Graph.".concat(t,": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));var o=""+e,a=""+r;if(r=arguments[2],!(i=c(this,o,a,n)))throw new M("Graph.".concat(t,': could not find an edge for the given path ("').concat(o,'" - "').concat(a,'").'))}else if(e=""+e,!(i=this._edges.get(e)))throw new M("Graph.".concat(t,': could not find the "').concat(e,'" edge in the graph.'));if("mixed"!==n&&i.undirected!==("undirected"===n))throw new M("Graph.".concat(t,': could not find the "').concat(e,'" ').concat(n," edge in the graph."));return i.attributes[r]}}},{name:function(e){return"get".concat(e,"Attributes")},attacher:function(e,t,n){e.prototype[t]=function(e){var r;if("mixed"!==this.type&&"mixed"!==n&&n!==this.type)throw new P("Graph.".concat(t,": cannot find this type of edges in your ").concat(this.type," graph."));if(arguments.length>1){if(this.multi)throw new P("Graph.".concat(t,": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));var i=""+e,o=""+arguments[1];if(!(r=c(this,i,o,n)))throw new M("Graph.".concat(t,': could not find an edge for the given path ("').concat(i,'" - "').concat(o,'").'))}else if(e=""+e,!(r=this._edges.get(e)))throw new M("Graph.".concat(t,': could not find the "').concat(e,'" edge in the graph.'));if("mixed"!==n&&r.undirected!==("undirected"===n))throw new M("Graph.".concat(t,': could not find the "').concat(e,'" ').concat(n," edge in the graph."));return r.attributes}}},{name:function(e){return"has".concat(e,"Attribute")},attacher:function(e,t,n){e.prototype[t]=function(e,r){var i;if("mixed"!==this.type&&"mixed"!==n&&n!==this.type)throw new P("Graph.".concat(t,": cannot find this type of edges in your ").concat(this.type," graph."));if(arguments.length>2){if(this.multi)throw new P("Graph.".concat(t,": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));var o=""+e,a=""+r;if(r=arguments[2],!(i=c(this,o,a,n)))throw new M("Graph.".concat(t,': could not find an edge for the given path ("').concat(o,'" - "').concat(a,'").'))}else if(e=""+e,!(i=this._edges.get(e)))throw new M("Graph.".concat(t,': could not find the "').concat(e,'" edge in the graph.'));if("mixed"!==n&&i.undirected!==("undirected"===n))throw new M("Graph.".concat(t,': could not find the "').concat(e,'" ').concat(n," edge in the graph."));return i.attributes.hasOwnProperty(r)}}},{name:function(e){return"set".concat(e,"Attribute")},attacher:function(e,t,n){e.prototype[t]=function(e,r,i){var o;if("mixed"!==this.type&&"mixed"!==n&&n!==this.type)throw new P("Graph.".concat(t,": cannot find this type of edges in your ").concat(this.type," graph."));if(arguments.length>3){if(this.multi)throw new P("Graph.".concat(t,": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));var a=""+e,u=""+r;if(r=arguments[2],i=arguments[3],!(o=c(this,a,u,n)))throw new M("Graph.".concat(t,': could not find an edge for the given path ("').concat(a,'" - "').concat(u,'").'))}else if(e=""+e,!(o=this._edges.get(e)))throw new M("Graph.".concat(t,': could not find the "').concat(e,'" edge in the graph.'));if("mixed"!==n&&o.undirected!==("undirected"===n))throw new M("Graph.".concat(t,': could not find the "').concat(e,'" ').concat(n," edge in the graph."));return o.attributes[r]=i,this.emit("edgeAttributesUpdated",{key:o.key,type:"set",attributes:o.attributes,name:r}),this}}},{name:function(e){return"update".concat(e,"Attribute")},attacher:function(e,t,n){e.prototype[t]=function(e,r,i){var o;if("mixed"!==this.type&&"mixed"!==n&&n!==this.type)throw new P("Graph.".concat(t,": cannot find this type of edges in your ").concat(this.type," graph."));if(arguments.length>3){if(this.multi)throw new P("Graph.".concat(t,": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));var a=""+e,u=""+r;if(r=arguments[2],i=arguments[3],!(o=c(this,a,u,n)))throw new M("Graph.".concat(t,': could not find an edge for the given path ("').concat(a,'" - "').concat(u,'").'))}else if(e=""+e,!(o=this._edges.get(e)))throw new M("Graph.".concat(t,': could not find the "').concat(e,'" edge in the graph.'));if("function"!=typeof i)throw new z("Graph.".concat(t,": updater should be a function."));if("mixed"!==n&&o.undirected!==("undirected"===n))throw new M("Graph.".concat(t,': could not find the "').concat(e,'" ').concat(n," edge in the graph."));return o.attributes[r]=i(o.attributes[r]),this.emit("edgeAttributesUpdated",{key:o.key,type:"set",attributes:o.attributes,name:r}),this}}},{name:function(e){return"remove".concat(e,"Attribute")},attacher:function(e,t,n){e.prototype[t]=function(e,r){var i;if("mixed"!==this.type&&"mixed"!==n&&n!==this.type)throw new P("Graph.".concat(t,": cannot find this type of edges in your ").concat(this.type," graph."));if(arguments.length>2){if(this.multi)throw new P("Graph.".concat(t,": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));var o=""+e,a=""+r;if(r=arguments[2],!(i=c(this,o,a,n)))throw new M("Graph.".concat(t,': could not find an edge for the given path ("').concat(o,'" - "').concat(a,'").'))}else if(e=""+e,!(i=this._edges.get(e)))throw new M("Graph.".concat(t,': could not find the "').concat(e,'" edge in the graph.'));if("mixed"!==n&&i.undirected!==("undirected"===n))throw new M("Graph.".concat(t,': could not find the "').concat(e,'" ').concat(n," edge in the graph."));return delete i.attributes[r],this.emit("edgeAttributesUpdated",{key:i.key,type:"remove",attributes:i.attributes,name:r}),this}}},{name:function(e){return"replace".concat(e,"Attributes")},attacher:function(e,t,n){e.prototype[t]=function(e,r){var i;if("mixed"!==this.type&&"mixed"!==n&&n!==this.type)throw new P("Graph.".concat(t,": cannot find this type of edges in your ").concat(this.type," graph."));if(arguments.length>2){if(this.multi)throw new P("Graph.".concat(t,": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));var o=""+e,a=""+r;if(r=arguments[2],!(i=c(this,o,a,n)))throw new M("Graph.".concat(t,': could not find an edge for the given path ("').concat(o,'" - "').concat(a,'").'))}else if(e=""+e,!(i=this._edges.get(e)))throw new M("Graph.".concat(t,': could not find the "').concat(e,'" edge in the graph.'));if(!h(r))throw new z("Graph.".concat(t,": provided attributes are not a plain object."));if("mixed"!==n&&i.undirected!==("undirected"===n))throw new M("Graph.".concat(t,': could not find the "').concat(e,'" ').concat(n," edge in the graph."));return i.attributes=r,this.emit("edgeAttributesUpdated",{key:i.key,type:"replace",attributes:i.attributes}),this}}},{name:function(e){return"merge".concat(e,"Attributes")},attacher:function(e,t,n){e.prototype[t]=function(e,r){var i;if("mixed"!==this.type&&"mixed"!==n&&n!==this.type)throw new P("Graph.".concat(t,": cannot find this type of edges in your ").concat(this.type," graph."));if(arguments.length>2){if(this.multi)throw new P("Graph.".concat(t,": cannot use a {source,target} combo when asking about an edge's attributes in a MultiGraph since we cannot infer the one you want information about."));var o=""+e,a=""+r;if(r=arguments[2],!(i=c(this,o,a,n)))throw new M("Graph.".concat(t,': could not find an edge for the given path ("').concat(o,'" - "').concat(a,'").'))}else if(e=""+e,!(i=this._edges.get(e)))throw new M("Graph.".concat(t,': could not find the "').concat(e,'" edge in the graph.'));if(!h(r))throw new z("Graph.".concat(t,": provided attributes are not a plain object."));if("mixed"!==n&&i.undirected!==("undirected"===n))throw new M("Graph.".concat(t,': could not find the "').concat(e,'" ').concat(n," edge in the graph."));return d(i.attributes,r),this.emit("edgeAttributesUpdated",{key:i.key,type:"merge",attributes:i.attributes,data:r}),this}}}];var J=O,q=function(){var e,t=arguments,n=-1;return new J((function r(){if(!e){if(++n>=t.length)return{done:!0};e=t[n]}var i=e.next();return i.done?(e=null,r()):i}))},H=[{name:"edges",type:"mixed"},{name:"inEdges",type:"directed",direction:"in"},{name:"outEdges",type:"directed",direction:"out"},{name:"inboundEdges",type:"mixed",direction:"in"},{name:"outboundEdges",type:"mixed",direction:"out"},{name:"directedEdges",type:"directed"},{name:"undirectedEdges",type:"undirected"}];function Q(e,t){for(var n in t)e.push(t[n].key)}function V(e,t){for(var n in t)t[n].forEach((function(t){return e.push(t.key)}))}function X(e,t,n){for(var r in e)if(r!==n){var i=e[r];t(i.key,i.attributes,i.source.key,i.target.key,i.source.attributes,i.target.attributes,i.undirected,i.generatedKey)}}function Z(e,t,n){for(var r in e)r!==n&&e[r].forEach((function(e){return t(e.key,e.attributes,e.source.key,e.target.key,e.source.attributes,e.target.attributes,e.undirected,e.generatedKey)}))}function $(e,t,n){for(var r in e)if(r!==n){var i=e[r];if(t(i.key,i.attributes,i.source.key,i.target.key,i.source.attributes,i.target.attributes,i.undirected,i.generatedKey))return!0}return!1}function ee(e,t,n){var r,i,o,a,u;for(var d in e)if(d!==n)for(r=e[d].values();!0!==(i=r.next()).done;)if(a=(o=i.value).source,u=o.target,t(o.key,o.attributes,a.key,u.key,a.attributes,u.attributes,o.undirected,o.generatedKey))return!0;return!1}function te(e,t){var n=Object.keys(e),r=n.length,i=null,o=0;return new O((function a(){var u;if(i){var d=i.next();if(d.done)return i=null,o++,a();u=d.value}else{if(o>=r)return{done:!0};var c=n[o];if(c===t)return o++,a();if((u=e[c])instanceof Set)return i=u.values(),a();o++}return{done:!1,value:[u.key,u.attributes,u.source.key,u.target.key,u.source.attributes,u.target.attributes]}}))}function ne(e,t,n){var r=t[n];r&&e.push(r.key)}function re(e,t,n){var r=t[n];r&&r.forEach((function(t){return e.push(t.key)}))}function ie(e,t,n){var r=e[t];if(r){var i=r.source,o=r.target;n(r.key,r.attributes,i.key,o.key,i.attributes,o.attributes,r.undirected,r.generatedKey)}}function oe(e,t,n){var r=e[t];r&&r.forEach((function(e){return n(e.key,e.attributes,e.source.key,e.target.key,e.source.attributes,e.target.attributes,e.undirected,e.generatedKey)}))}function ae(e,t,n){var r=e[t];if(!r)return!1;var i=r.source,o=r.target;return n(r.key,r.attributes,i.key,o.key,i.attributes,o.attributes,r.undirected,r.generatedKey)}function ue(e,t,n){var r=e[t];if(!r)return!1;for(var i,o,a=r.values();!0!==(i=a.next()).done;)if(n((o=i.value).key,o.attributes,o.source.key,o.target.key,o.source.attributes,o.target.attributes,o.undirected,o.generatedKey))return!0;return!1}function de(e,t){var n=e[t];if(n instanceof Set){var r=n.values();return new O((function(){var e=r.next();if(e.done)return e;var t=e.value;return{done:!1,value:[t.key,t.attributes,t.source.key,t.target.key,t.source.attributes,t.target.attributes]}}))}return O.of([n.key,n.attributes,n.source.key,n.target.key,n.source.attributes,n.target.attributes])}function ce(e,t){if(0===e.size)return[];if("mixed"===t||t===e.type)return"function"==typeof Array.from?Array.from(e._edges.keys()):C(e._edges.keys(),e._edges.size);for(var n,r,i="undirected"===t?e.undirectedSize:e.directedSize,o=new Array(i),a="undirected"===t,u=e._edges.values(),d=0;!0!==(n=u.next()).done;)(r=n.value).undirected===a&&(o[d++]=r.key);return o}function se(e,t,n){if(0!==e.size)for(var r,i,o="mixed"!==t&&t!==e.type,a="undirected"===t,u=e._edges.values();!0!==(r=u.next()).done;)if(i=r.value,!o||i.undirected===a){var d=i,c=d.key,s=d.attributes,h=d.source,f=d.target;n(c,s,h.key,f.key,h.attributes,f.attributes,i.undirected,i.generatedKey)}}function he(e,t,n){if(0===e.size)return!1;for(var r,i,o="mixed"!==t&&t!==e.type,a="undirected"===t,u=e._edges.values();!0!==(r=u.next()).done;)if(i=r.value,!o||i.undirected===a){var d=i,c=d.key,s=d.attributes,h=d.source,f=d.target;if(n(c,s,h.key,f.key,h.attributes,f.attributes,i.undirected,i.generatedKey))return!0}return!1}function fe(e,t){if(0===e.size)return O.empty();var n="mixed"!==t&&t!==e.type,r="undirected"===t,i=e._edges.values();return new O((function(){for(var e,t;;){if((e=i.next()).done)return e;if(t=e.value,!n||t.undirected===r)break}return{value:[t.key,t.attributes,t.source.key,t.target.key,t.source.attributes,t.target.attributes],done:!1}}))}function pe(e,t,n,r){var i=[],o=e?V:Q;return"undirected"!==t&&("out"!==n&&o(i,r.in),"in"!==n&&o(i,r.out),!n&&r.directedSelfLoops>0&&i.splice(i.lastIndexOf(r.key),1)),"directed"!==t&&o(i,r.undirected),i}function ge(e,t,n,r,i){var o=e?Z:X;"undirected"!==t&&("out"!==n&&o(r.in,i),"in"!==n&&o(r.out,i,n?null:r.key)),"directed"!==t&&o(r.undirected,i)}function le(e,t,n,r,i){var o=e?ee:$;if("undirected"!==t){if("out"!==n&&o(r.in,i))return!0;if("in"!==n&&o(r.out,i,n?null:r.key))return!0}return!("directed"===t||!o(r.undirected,i))}function ye(e,t,n){var r=O.empty();return"undirected"!==e&&("out"!==t&&void 0!==n.in&&(r=q(r,te(n.in))),"in"!==t&&void 0!==n.out&&(r=q(r,te(n.out,t?null:n.key)))),"directed"!==e&&void 0!==n.undirected&&(r=q(r,te(n.undirected))),r}function ve(e,t,n,r,i){var o=t?re:ne,a=[];return"undirected"!==e&&(void 0!==r.in&&"out"!==n&&o(a,r.in,i),void 0!==r.out&&"in"!==n&&o(a,r.out,i),!n&&r.directedSelfLoops>0&&a.splice(a.lastIndexOf(r.key),1)),"directed"!==e&&void 0!==r.undirected&&o(a,r.undirected,i),a}function be(e,t,n,r,i,o){var a=t?oe:ie;"undirected"!==e&&(void 0!==r.in&&"out"!==n&&a(r.in,i,o),r.key!==i&&void 0!==r.out&&"in"!==n&&a(r.out,i,o)),"directed"!==e&&void 0!==r.undirected&&a(r.undirected,i,o)}function we(e,t,n,r,i,o){var a=t?ue:ae;if("undirected"!==e){if(void 0!==r.in&&"out"!==n&&a(r.in,i,o))return!0;if(r.key!==i&&void 0!==r.out&&"in"!==n&&a(r.out,i,o,n?null:r.key))return!0}return!("directed"===e||void 0===r.undirected||!a(r.undirected,i,o))}function me(e,t,n,r){var i=O.empty();return"undirected"!==e&&(void 0!==n.in&&"out"!==t&&r in n.in&&(i=q(i,de(n.in,r))),void 0!==n.out&&"in"!==t&&r in n.out&&(i=q(i,de(n.out,r)))),"directed"!==e&&void 0!==n.undirected&&r in n.undirected&&(i=q(i,de(n.undirected,r))),i}var _e=[{name:"neighbors",type:"mixed"},{name:"inNeighbors",type:"directed",direction:"in"},{name:"outNeighbors",type:"directed",direction:"out"},{name:"inboundNeighbors",type:"mixed",direction:"in"},{name:"outboundNeighbors",type:"mixed",direction:"out"},{name:"directedNeighbors",type:"directed"},{name:"undirectedNeighbors",type:"undirected"}];function ke(e,t){if(void 0!==t)for(var n in t)e.add(n)}function Ge(e,t,n){if("mixed"!==e){if("undirected"===e)return Object.keys(n.undirected);if("string"==typeof t)return Object.keys(n[t])}var r=new Set;return"undirected"!==e&&("out"!==t&&ke(r,n.in),"in"!==t&&ke(r,n.out)),"directed"!==e&&ke(r,n.undirected),C(r.values(),r.size)}function xe(e,t,n){for(var r in t){var i=t[r];i instanceof Set&&(i=i.values().next().value);var o=i.source,a=i.target,u=o===e?a:o;n(u.key,u.attributes)}}function Ee(e,t,n,r){for(var i in n){var o=n[i];o instanceof Set&&(o=o.values().next().value);var a=o.source,u=o.target,d=a===t?u:a;e.has(d.key)||(e.add(d.key),r(d.key,d.attributes))}}function Se(e,t,n){for(var r in t){var i=t[r];i instanceof Set&&(i=i.values().next().value);var o=i.source,a=i.target,u=o===e?a:o;if(n(u.key,u.attributes))return!0}return!1}function Ae(e,t,n,r){for(var i in n){var o=n[i];o instanceof Set&&(o=o.values().next().value);var a=o.source,u=o.target,d=a===t?u:a;if(!e.has(d.key))if(e.add(d.key),r(d.key,d.attributes))return!0}return!1}function Le(e,t){var n=Object.keys(t),r=n.length,i=0;return new O((function(){if(i>=r)return{done:!0};var o=t[n[i++]];o instanceof Set&&(o=o.values().next().value);var a=o.source,u=o.target,d=a===e?u:a;return{done:!1,value:[d.key,d.attributes]}}))}function Ne(e,t,n){var r=Object.keys(n),i=r.length,o=0;return new O((function a(){if(o>=i)return{done:!0};var u=n[r[o++]];u instanceof Set&&(u=u.values().next().value);var d=u.source,c=u.target,s=d===t?c:d;return e.has(s.key)?a():(e.add(s.key),{done:!1,value:[s.key,s.attributes]})}))}function De(e,t,n,r,i){var o=e._nodes.get(r);if("undirected"!==t){if("out"!==n&&void 0!==o.in)for(var a in o.in)if(a===i)return!0;if("in"!==n&&void 0!==o.out)for(var u in o.out)if(u===i)return!0}if("directed"!==t&&void 0!==o.undirected)for(var d in o.undirected)if(d===i)return!0;return!1}function je(e,t){var n=t.name,r=t.type,i=t.direction,o="forEach"+n[0].toUpperCase()+n.slice(1,-1);e.prototype[o]=function(e,t){if("mixed"===r||"mixed"===this.type||r===this.type){e=""+e;var n=this._nodes.get(e);if(void 0===n)throw new M("Graph.".concat(o,': could not find the "').concat(e,'" node in the graph.'));!function(e,t,n,r){if("mixed"!==e){if("undirected"===e)return xe(n,n.undirected,r);if("string"==typeof t)return xe(n,n[t],r)}var i=new Set;"undirected"!==e&&("out"!==t&&Ee(i,n,n.in,r),"in"!==t&&Ee(i,n,n.out,r)),"directed"!==e&&Ee(i,n,n.undirected,r)}("mixed"===r?this.type:r,i,n,t)}}}function Ue(e,t){var n=t.name,r=t.type,i=t.direction,o="forEach"+n[0].toUpperCase()+n.slice(1,-1)+"Until";e.prototype[o]=function(e,t){if("mixed"===r||"mixed"===this.type||r===this.type){e=""+e;var n=this._nodes.get(e);if(void 0===n)throw new M("Graph.".concat(o,': could not find the "').concat(e,'" node in the graph.'));return function(e,t,n,r){if("mixed"!==e){if("undirected"===e)return Se(n,n.undirected,r);if("string"==typeof t)return Se(n,n[t],r)}var i=new Set;if("undirected"!==e){if("out"!==t&&Ae(i,n,n.in,r))return!0;if("in"!==t&&Ae(i,n,n.out,r))return!0}return!("directed"===e||!Ae(i,n,n.undirected,r))}("mixed"===r?this.type:r,i,n,t)}}}function Oe(e,t){var n=t.name,r=t.type,i=t.direction,o=n.slice(0,-1)+"Entries";e.prototype[o]=function(e){if("mixed"!==r&&"mixed"!==this.type&&r!==this.type)return O.empty();e=""+e;var t=this._nodes.get(e);if(void 0===t)throw new M("Graph.".concat(o,': could not find the "').concat(e,'" node in the graph.'));return function(e,t,n){if("mixed"!==e){if("undirected"===e)return Le(n,n.undirected);if("string"==typeof t)return Le(n,n[t])}var r=O.empty(),i=new Set;return"undirected"!==e&&("out"!==t&&(r=q(r,Ne(i,n,n.in))),"in"!==t&&(r=q(r,Ne(i,n,n.out)))),"directed"!==e&&(r=q(r,Ne(i,n,n.undirected))),r}("mixed"===r?this.type:r,i,t)}}function Ce(e,t,n){for(var r,i,o,a,u,d,c,s=t._nodes.values(),h=t.type;!0!==(r=s.next()).done;){if(i=r.value,"undirected"!==h)for(o in a=i.out)if(d=(u=a[o]).target,c=n(i.key,d.key,i.attributes,d.attributes,u.key,u.attributes,u.undirected,u.generatedKey),e&&c)return!0;if("directed"!==h)for(o in a=i.undirected)if((d=(u=a[o]).target).key!==o&&(d=u.source),c=n(i.key,d.key,i.attributes,d.attributes,u.key,u.attributes,u.undirected,u.generatedKey),e&&c)return!0}return!1}function Ke(e,t,n){for(var r,i,o,a,u,d,c,s,h,f=t._nodes.values(),p=t.type;!0!==(r=f.next()).done;){if(i=r.value,"undirected"!==p)for(o in d=i.out)for(a=d[o].values();!0!==(u=a.next()).done;)if(s=(c=u.value).target,h=n(i.key,s.key,i.attributes,s.attributes,c.key,c.attributes,c.undirected,c.generatedKey),e&&h)return!0;if("directed"!==p)for(o in d=i.undirected)for(a=d[o].values();!0!==(u=a.next()).done;)if((s=(c=u.value).target).key!==o&&(s=c.source),h=n(i.key,s.key,i.attributes,s.attributes,c.key,c.attributes,c.undirected,c.generatedKey),e&&h)return!0}return!1}function ze(e,t){var n={key:e};return f(t.attributes)||(n.attributes=d({},t.attributes)),n}function Me(e,t){var n={source:t.source.key,target:t.target.key};return t.generatedKey||(n.key=e),f(t.attributes)||(n.attributes=d({},t.attributes)),t.undirected&&(n.undirected=!0),n}function Pe(e){return h(e)?"key"in e?!("attributes"in e)||h(e.attributes)&&null!==e.attributes?null:"invalid-attributes":"no-key":"not-object"}function Te(e){return h(e)?"source"in e?"target"in e?!("attributes"in e)||h(e.attributes)&&null!==e.attributes?"undirected"in e&&"boolean"!=typeof e.undirected?"invalid-undirected":null:"invalid-attributes":"no-target":"no-source":"not-object"}var Re=new Set(["directed","undirected","mixed"]),Fe=new Set(["domain","_events","_eventsCount","_maxListeners"]),Ie={allowSelfLoops:!0,edgeKeyGenerator:null,multi:!1,type:"mixed"};function We(e,t,n){var r=new e.NodeDataClass(t,n);return e._nodes.set(t,r),e.emit("nodeAdded",{key:t,attributes:n}),r}function Ye(e,t,n,r,i,o,a,u){if(!r&&"undirected"===e.type)throw new P("Graph.".concat(t,": you cannot add a directed edge to an undirected graph. Use the #.addEdge or #.addUndirectedEdge instead."));if(r&&"directed"===e.type)throw new P("Graph.".concat(t,": you cannot add an undirected edge to a directed graph. Use the #.addEdge or #.addDirectedEdge instead."));if(u&&!h(u))throw new z("Graph.".concat(t,': invalid attributes. Expecting an object but got "').concat(u,'"'));if(o=""+o,a=""+a,u=u||{},!e.allowSelfLoops&&o===a)throw new P("Graph.".concat(t,': source & target are the same ("').concat(o,"\"), thus creating a loop explicitly forbidden by this graph 'allowSelfLoops' option set to false."));var d=e._nodes.get(o),c=e._nodes.get(a);if(!d)throw new M("Graph.".concat(t,': source node "').concat(o,'" not found.'));if(!c)throw new M("Graph.".concat(t,': target node "').concat(a,'" not found.'));var s={key:null,undirected:r,source:o,target:a,attributes:u};if(n&&(i=e._edgeKeyGenerator(s)),i=""+i,e._edges.has(i))throw new P("Graph.".concat(t,': the "').concat(i,'" edge already exists in the graph.'));if(!e.multi&&(r?void 0!==d.undirected[a]:void 0!==d.out[a]))throw new P("Graph.".concat(t,': an edge linking "').concat(o,'" to "').concat(a,"\" already exists. If you really want to add multiple edges linking those nodes, you should create a multi graph by using the 'multi' option."));var f=new I(r,i,n,d,c,u);return e._edges.set(i,f),o===a?r?(d.undirectedSelfLoops++,e._undirectedSelfLoopCount++):(d.directedSelfLoops++,e._directedSelfLoopCount++):r?(d.undirectedDegree++,c.undirectedDegree++):(d.outDegree++,c.inDegree++),W(e,r,f,o,a,d,c),r?e._undirectedSize++:e._directedSize++,s.key=i,e.emit("edgeAdded",s),i}function Be(e,t,n,r,i,o,a,u,c){if(!r&&"undirected"===e.type)throw new P("Graph.".concat(t,": you cannot add a directed edge to an undirected graph. Use the #.addEdge or #.addUndirectedEdge instead."));if(r&&"directed"===e.type)throw new P("Graph.".concat(t,": you cannot add an undirected edge to a directed graph. Use the #.addEdge or #.addDirectedEdge instead."));if(u)if(c){if("function"!=typeof u)throw new z("Graph.".concat(t,': invalid updater function. Expecting a function but got "').concat(u,'"'))}else if(!h(u))throw new z("Graph.".concat(t,': invalid attributes. Expecting an object but got "').concat(u,'"'));var s;if(o=""+o,a=""+a,c&&(s=u,u=void 0),!e.allowSelfLoops&&o===a)throw new P("Graph.".concat(t,': source & target are the same ("').concat(o,"\"), thus creating a loop explicitly forbidden by this graph 'allowSelfLoops' option set to false."));var f,p,g=e._nodes.get(o),l=e._nodes.get(a);if(!n&&(f=e._edges.get(i))){if(f.source.key!==o||f.target.key!==a||r&&(f.source.key!==a||f.target.key!==o))throw new P("Graph.".concat(t,': inconsistency detected when attempting to merge the "').concat(i,'" edge with "').concat(o,'" source & "').concat(a,'" target vs. ("').concat(f.source.key,'", "').concat(f.target.key,'").'));p=f}if(p||e.multi||!g||(p=r?g.undirected[a]:g.out[a]),p){if(c?!s:!u)return p.key;if(c){var y=p.attributes;p.attributes=s(y),e.emit("edgeAttributesUpdated",{type:"replace",key:p.key,attributes:p.attributes})}else d(p.attributes,u),e.emit("edgeAttributesUpdated",{type:"merge",key:p.key,attributes:p.attributes,data:u});return p.key}u=u||{},c&&s&&(u=s(u));var v={key:null,undirected:r,source:o,target:a,attributes:u};if(n&&(i=e._edgeKeyGenerator(v)),i=""+i,e._edges.has(i))throw new P("Graph.".concat(t,': the "').concat(i,'" edge already exists in the graph.'));return g||(g=We(e,o,{}),o===a&&(l=g)),l||(l=We(e,a,{})),f=new I(r,i,n,g,l,u),e._edges.set(i,f),o===a?r?(g.undirectedSelfLoops++,e._undirectedSelfLoopCount++):(g.directedSelfLoops++,e._directedSelfLoopCount++):r?(g.undirectedDegree++,l.undirectedDegree++):(g.outDegree++,l.inDegree++),W(e,r,f,o,a,g,l),r?e._undirectedSize++:e._directedSize++,v.key=i,e.emit("edgeAdded",v),i}var Je=function(e){function n(t){var n;if(n=e.call(this)||this,(t=d({},Ie,t)).edgeKeyGenerator&&"function"!=typeof t.edgeKeyGenerator)throw new z("Graph.constructor: invalid 'edgeKeyGenerator' option. Expecting a function but got \"".concat(t.edgeKeyGenerator,'".'));if("boolean"!=typeof t.multi)throw new z("Graph.constructor: invalid 'multi' option. Expecting a boolean but got \"".concat(t.multi,'".'));if(!Re.has(t.type))throw new z('Graph.constructor: invalid \'type\' option. Should be one of "mixed", "directed" or "undirected" but got "'.concat(t.type,'".'));if("boolean"!=typeof t.allowSelfLoops)throw new z("Graph.constructor: invalid 'allowSelfLoops' option. Expecting a boolean but got \"".concat(t.allowSelfLoops,'".'));var r,i="mixed"===t.type?T:"directed"===t.type?R:F;return p(u(n),"NodeDataClass",i),p(u(n),"_attributes",{}),p(u(n),"_nodes",new Map),p(u(n),"_edges",new Map),p(u(n),"_directedSize",0),p(u(n),"_undirectedSize",0),p(u(n),"_directedSelfLoopCount",0),p(u(n),"_undirectedSelfLoopCount",0),p(u(n),"_edgeKeyGenerator",t.edgeKeyGenerator||(r=0,function(){return r++})),p(u(n),"_options",t),Fe.forEach((function(e){return p(u(n),e,n[e])})),g(u(n),"order",(function(){return n._nodes.size})),g(u(n),"size",(function(){return n._edges.size})),g(u(n),"directedSize",(function(){return n._directedSize})),g(u(n),"undirectedSize",(function(){return n._undirectedSize})),g(u(n),"selfLoopCount",(function(){return n._directedSelfLoopCount+n._undirectedSelfLoopCount})),g(u(n),"directedSelfLoopCount",(function(){return n._directedSelfLoopCount})),g(u(n),"undirectedSelfLoopCount",(function(){return n._undirectedSelfLoopCount})),g(u(n),"multi",n._options.multi),g(u(n),"type",n._options.type),g(u(n),"allowSelfLoops",n._options.allowSelfLoops),g(u(n),"implementation",(function(){return"graphology"})),n}t(n,e);var r=n.prototype;return r.hasNode=function(e){return this._nodes.has(""+e)},r.hasDirectedEdge=function(e,t){if("undirected"===this.type)return!1;if(1===arguments.length){var n=""+e,r=this._edges.get(n);return!!r&&!r.undirected}if(2===arguments.length){e=""+e,t=""+t;var i=this._nodes.get(e);if(!i)return!1;var o=i.out[t];return!!o&&(!this.multi||!!o.size)}throw new z("Graph.hasDirectedEdge: invalid arity (".concat(arguments.length,", instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target."))},r.hasUndirectedEdge=function(e,t){if("directed"===this.type)return!1;if(1===arguments.length){var n=""+e,r=this._edges.get(n);return!!r&&r.undirected}if(2===arguments.length){e=""+e,t=""+t;var i=this._nodes.get(e);if(!i)return!1;var o=i.undirected[t];return!!o&&(!this.multi||!!o.size)}throw new z("Graph.hasDirectedEdge: invalid arity (".concat(arguments.length,", instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target."))},r.hasEdge=function(e,t){if(1===arguments.length){var n=""+e;return this._edges.has(n)}if(2===arguments.length){e=""+e,t=""+t;var r=this._nodes.get(e);if(!r)return!1;var i=void 0!==r.out&&r.out[t];return i||(i=void 0!==r.undirected&&r.undirected[t]),!!i&&(!this.multi||!!i.size)}throw new z("Graph.hasEdge: invalid arity (".concat(arguments.length,", instead of 1 or 2). You can either ask for an edge id or for the existence of an edge between a source & a target."))},r.directedEdge=function(e,t){if("undirected"!==this.type){if(e=""+e,t=""+t,this.multi)throw new P("Graph.directedEdge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.directedEdges instead.");var n=this._nodes.get(e);if(!n)throw new M('Graph.directedEdge: could not find the "'.concat(e,'" source node in the graph.'));if(!this._nodes.has(t))throw new M('Graph.directedEdge: could not find the "'.concat(t,'" target node in the graph.'));var r=n.out&&n.out[t]||void 0;return r?r.key:void 0}},r.undirectedEdge=function(e,t){if("directed"!==this.type){if(e=""+e,t=""+t,this.multi)throw new P("Graph.undirectedEdge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.undirectedEdges instead.");var n=this._nodes.get(e);if(!n)throw new M('Graph.undirectedEdge: could not find the "'.concat(e,'" source node in the graph.'));if(!this._nodes.has(t))throw new M('Graph.undirectedEdge: could not find the "'.concat(t,'" target node in the graph.'));var r=n.undirected&&n.undirected[t]||void 0;return r?r.key:void 0}},r.edge=function(e,t){if(this.multi)throw new P("Graph.edge: this method is irrelevant with multigraphs since there might be multiple edges between source & target. See #.edges instead.");e=""+e,t=""+t;var n=this._nodes.get(e);if(!n)throw new M('Graph.edge: could not find the "'.concat(e,'" source node in the graph.'));if(!this._nodes.has(t))throw new M('Graph.edge: could not find the "'.concat(t,'" target node in the graph.'));var r=n.out&&n.out[t]||n.undirected&&n.undirected[t]||void 0;if(r)return r.key},r.inDegree=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if("boolean"!=typeof t)throw new z('Graph.inDegree: Expecting a boolean but got "'.concat(t,'" for the second parameter (allowing self-loops to be counted).'));e=""+e;var n=this._nodes.get(e);if(!n)throw new M('Graph.inDegree: could not find the "'.concat(e,'" node in the graph.'));if("undirected"===this.type)return 0;var r=t?n.directedSelfLoops:0;return n.inDegree+r},r.outDegree=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if("boolean"!=typeof t)throw new z('Graph.outDegree: Expecting a boolean but got "'.concat(t,'" for the second parameter (allowing self-loops to be counted).'));e=""+e;var n=this._nodes.get(e);if(!n)throw new M('Graph.outDegree: could not find the "'.concat(e,'" node in the graph.'));if("undirected"===this.type)return 0;var r=t?n.directedSelfLoops:0;return n.outDegree+r},r.directedDegree=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if("boolean"!=typeof t)throw new z('Graph.directedDegree: Expecting a boolean but got "'.concat(t,'" for the second parameter (allowing self-loops to be counted).'));e=""+e;var n=this._nodes.get(e);if(!n)throw new M('Graph.directedDegree: could not find the "'.concat(e,'" node in the graph.'));if("undirected"===this.type)return 0;var r=t?n.directedSelfLoops:0,i=n.inDegree+r,o=n.outDegree+r;return i+o},r.undirectedDegree=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if("boolean"!=typeof t)throw new z('Graph.undirectedDegree: Expecting a boolean but got "'.concat(t,'" for the second parameter (allowing self-loops to be counted).'));e=""+e;var n=this._nodes.get(e);if(!n)throw new M('Graph.undirectedDegree: could not find the "'.concat(e,'" node in the graph.'));if("directed"===this.type)return 0;var r=t?n.undirectedSelfLoops:0;return n.undirectedDegree+2*r},r.degree=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];if("boolean"!=typeof t)throw new z('Graph.degree: Expecting a boolean but got "'.concat(t,'" for the second parameter (allowing self-loops to be counted).'));e=""+e;var n=this._nodes.get(e);if(!n)throw new M('Graph.degree: could not find the "'.concat(e,'" node in the graph.'));var r=0,i=0;return"directed"!==this.type&&(t&&(i=n.undirectedSelfLoops),r+=n.undirectedDegree+2*i),"undirected"!==this.type&&(t&&(i=n.directedSelfLoops),r+=n.inDegree+n.outDegree+2*i),r},r.source=function(e){e=""+e;var t=this._edges.get(e);if(!t)throw new M('Graph.source: could not find the "'.concat(e,'" edge in the graph.'));return t.source.key},r.target=function(e){e=""+e;var t=this._edges.get(e);if(!t)throw new M('Graph.target: could not find the "'.concat(e,'" edge in the graph.'));return t.target.key},r.extremities=function(e){e=""+e;var t=this._edges.get(e);if(!t)throw new M('Graph.extremities: could not find the "'.concat(e,'" edge in the graph.'));return[t.source.key,t.target.key]},r.opposite=function(e,t){e=""+e,t=""+t;var n=this._edges.get(t);if(!n)throw new M('Graph.opposite: could not find the "'.concat(t,'" edge in the graph.'));var r=n.source.key,i=n.target.key;if(e!==r&&e!==i)throw new M('Graph.opposite: the "'.concat(e,'" node is not attached to the "').concat(t,'" edge (').concat(r,", ").concat(i,")."));return e===r?i:r},r.hasExtremity=function(e,t){e=""+e,t=""+t;var n=this._edges.get(e);if(!n)throw new M('Graph.hasExtremity: could not find the "'.concat(e,'" edge in the graph.'));return n.source.key===t||n.target.key===t},r.isUndirected=function(e){e=""+e;var t=this._edges.get(e);if(!t)throw new M('Graph.isUndirected: could not find the "'.concat(e,'" edge in the graph.'));return t.undirected},r.isDirected=function(e){e=""+e;var t=this._edges.get(e);if(!t)throw new M('Graph.isDirected: could not find the "'.concat(e,'" edge in the graph.'));return!t.undirected},r.isSelfLoop=function(e){e=""+e;var t=this._edges.get(e);if(!t)throw new M('Graph.isSelfLoop: could not find the "'.concat(e,'" edge in the graph.'));return t.source===t.target},r.hasGeneratedKey=function(e){e=""+e;var t=this._edges.get(e);if(!t)throw new M('Graph.hasGeneratedKey: could not find the "'.concat(e,'" edge in the graph.'));return t.generatedKey},r.addNode=function(e,t){return function(e,t,n){if(n&&!h(n))throw new z('Graph.addNode: invalid attributes. Expecting an object but got "'.concat(n,'"'));if(t=""+t,n=n||{},e._nodes.has(t))throw new P('Graph.addNode: the "'.concat(t,'" node already exist in the graph.'));var r=new e.NodeDataClass(t,n);return e._nodes.set(t,r),e.emit("nodeAdded",{key:t,attributes:n}),r}(this,e,t).key},r.mergeNode=function(e,t){if(t&&!h(t))throw new z('Graph.mergeNode: invalid attributes. Expecting an object but got "'.concat(t,'"'));e=""+e,t=t||{};var n=this._nodes.get(e);return n?(t&&(d(n.attributes,t),this.emit("nodeAttributesUpdated",{type:"merge",key:e,attributes:n.attributes,data:t})),e):(n=new this.NodeDataClass(e,t),this._nodes.set(e,n),this.emit("nodeAdded",{key:e,attributes:t}),e)},r.updateNode=function(e,t){if(t&&"function"!=typeof t)throw new z('Graph.updateNode: invalid updater function. Expecting a function but got "'.concat(t,'"'));e=""+e;var n=this._nodes.get(e);if(n){if(t){var r=n.attributes;n.attributes=t(r),this.emit("nodeAttributesUpdated",{type:"replace",key:e,attributes:n.attributes})}return e}var i=t?t({}):{};return n=new this.NodeDataClass(e,i),this._nodes.set(e,n),this.emit("nodeAdded",{key:e,attributes:i}),e},r.dropNode=function(e){var t=this;e=""+e;var n=this._nodes.get(e);if(!n)throw new M('Graph.dropNode: could not find the "'.concat(e,'" node in the graph.'));this.forEachEdge(e,(function(e){t.dropEdge(e)})),this._nodes.delete(e),this.emit("nodeDropped",{key:e,attributes:n.attributes})},r.dropEdge=function(e){var t;if(arguments.length>1){var n=""+arguments[0],r=""+arguments[1];if(!(t=c(this,n,r,this.type)))throw new M('Graph.dropEdge: could not find the "'.concat(n,'" -> "').concat(r,'" edge in the graph.'))}else if(e=""+e,!(t=this._edges.get(e)))throw new M('Graph.dropEdge: could not find the "'.concat(e,'" edge in the graph.'));this._edges.delete(t.key);var i=t,o=i.source,a=i.target,u=i.attributes,d=t.undirected;return o===a?d?(o.undirectedSelfLoops--,this._undirectedSelfLoopCount--):(o.directedSelfLoops--,this._directedSelfLoopCount--):d?(o.undirectedDegree--,a.undirectedDegree--):(o.outDegree--,a.inDegree--),Y(this,d,t),d?this._undirectedSize--:this._directedSize--,this.emit("edgeDropped",{key:e,attributes:u,source:o.key,target:a.key,undirected:d}),this},r.clear=function(){this._edges.clear(),this._nodes.clear(),this.emit("cleared")},r.clearEdges=function(){this._edges.clear(),this.clearIndex(),this.emit("edgesCleared")},r.getAttribute=function(e){return this._attributes[e]},r.getAttributes=function(){return this._attributes},r.hasAttribute=function(e){return this._attributes.hasOwnProperty(e)},r.setAttribute=function(e,t){return this._attributes[e]=t,this.emit("attributesUpdated",{type:"set",attributes:this._attributes,name:e}),this},r.updateAttribute=function(e,t){if("function"!=typeof t)throw new z("Graph.updateAttribute: updater should be a function.");var n=this._attributes[e];return this._attributes[e]=t(n),this.emit("attributesUpdated",{type:"set",attributes:this._attributes,name:e}),this},r.removeAttribute=function(e){return delete this._attributes[e],this.emit("attributesUpdated",{type:"remove",attributes:this._attributes,name:e}),this},r.replaceAttributes=function(e){if(!h(e))throw new z("Graph.replaceAttributes: provided attributes are not a plain object.");return this._attributes=e,this.emit("attributesUpdated",{type:"replace",attributes:this._attributes}),this},r.mergeAttributes=function(e){if(!h(e))throw new z("Graph.mergeAttributes: provided attributes are not a plain object.");return d(this._attributes,e),this.emit("attributesUpdated",{type:"merge",attributes:this._attributes,data:e}),this},r.getNodeAttribute=function(e,t){e=""+e;var n=this._nodes.get(e);if(!n)throw new M('Graph.getNodeAttribute: could not find the "'.concat(e,'" node in the graph.'));return n.attributes[t]},r.getNodeAttributes=function(e){e=""+e;var t=this._nodes.get(e);if(!t)throw new M('Graph.getNodeAttributes: could not find the "'.concat(e,'" node in the graph.'));return t.attributes},r.hasNodeAttribute=function(e,t){e=""+e;var n=this._nodes.get(e);if(!n)throw new M('Graph.hasNodeAttribute: could not find the "'.concat(e,'" node in the graph.'));return n.attributes.hasOwnProperty(t)},r.setNodeAttribute=function(e,t,n){e=""+e;var r=this._nodes.get(e);if(!r)throw new M('Graph.setNodeAttribute: could not find the "'.concat(e,'" node in the graph.'));if(arguments.length<3)throw new z("Graph.setNodeAttribute: not enough arguments. Either you forgot to pass the attribute's name or value, or you meant to use #.replaceNodeAttributes / #.mergeNodeAttributes instead.");return r.attributes[t]=n,this.emit("nodeAttributesUpdated",{key:e,type:"set",attributes:r.attributes,name:t}),this},r.updateNodeAttribute=function(e,t,n){e=""+e;var r=this._nodes.get(e);if(!r)throw new M('Graph.updateNodeAttribute: could not find the "'.concat(e,'" node in the graph.'));if(arguments.length<3)throw new z("Graph.updateNodeAttribute: not enough arguments. Either you forgot to pass the attribute's name or updater, or you meant to use #.replaceNodeAttributes / #.mergeNodeAttributes instead.");if("function"!=typeof n)throw new z("Graph.updateAttribute: updater should be a function.");var i=r.attributes,o=n(i[t]);return i[t]=o,this.emit("nodeAttributesUpdated",{key:e,type:"set",attributes:r.attributes,name:t}),this},r.removeNodeAttribute=function(e,t){e=""+e;var n=this._nodes.get(e);if(!n)throw new M('Graph.hasNodeAttribute: could not find the "'.concat(e,'" node in the graph.'));return delete n.attributes[t],this.emit("nodeAttributesUpdated",{key:e,type:"remove",attributes:n.attributes,name:t}),this},r.replaceNodeAttributes=function(e,t){e=""+e;var n=this._nodes.get(e);if(!n)throw new M('Graph.replaceNodeAttributes: could not find the "'.concat(e,'" node in the graph.'));if(!h(t))throw new z("Graph.replaceNodeAttributes: provided attributes are not a plain object.");return n.attributes=t,this.emit("nodeAttributesUpdated",{key:e,type:"replace",attributes:n.attributes}),this},r.mergeNodeAttributes=function(e,t){e=""+e;var n=this._nodes.get(e);if(!n)throw new M('Graph.mergeNodeAttributes: could not find the "'.concat(e,'" node in the graph.'));if(!h(t))throw new z("Graph.mergeNodeAttributes: provided attributes are not a plain object.");return d(n.attributes,t),this.emit("nodeAttributesUpdated",{key:e,type:"merge",attributes:n.attributes,data:t}),this},r.updateEachNodeAttributes=function(e,t){if("function"!=typeof e)throw new z("Graph.updateEachNodeAttributes: expecting an updater function.");if(t&&!l(t))throw new z("Graph.updateEachNodeAttributes: invalid hints. Expecting an object having the following shape: {attributes?: [string]}");for(var n,r,i=this._nodes.values();!0!==(n=i.next()).done;)(r=n.value).attributes=e(r.key,r.attributes);this.emit("eachNodeAttributesUpdated",{hints:t||null})},r.updateEachEdgeAttributes=function(e,t){if("function"!=typeof e)throw new z("Graph.updateEachEdgeAttributes: expecting an updater function.");if(t&&!l(t))throw new z("Graph.updateEachEdgeAttributes: invalid hints. Expecting an object having the following shape: {attributes?: [string]}");for(var n,r,i=this._edges.values();!0!==(n=i.next()).done;)(r=n.value).attributes=e(r.key,r.attributes);this.emit("eachEdgeAttributesUpdated",{hints:t||null})},r.forEach=function(e){if("function"!=typeof e)throw new z("Graph.forEach: expecting a callback.");this.multi?Ke(!1,this,e):Ce(!1,this,e)},r.forEachUntil=function(e){if("function"!=typeof e)throw new z("Graph.forEach: expecting a callback.");return this.multi?Ke(!0,this,e):Ce(!0,this,e)},r.adjacency=function(){return this.multi?(o=(e=this)._nodes.values(),a=e.type,u="outer",d=null,new O((function e(){var c;if("outer"===u)return!0===(c=o.next()).done?c:(t=c.value,u="directed",e());if("directed"===u)return"undirected"===a?(u="undirected",e()):(r=t.out,n=Object.keys(t.out),i=0,u="inner-directed",e());if("undirected"===u){if("directed"===a)return u="outer",e();r=t.undirected,n=Object.keys(t.undirected),i=0,u="inner-undirected"}if(!d&&i>=n.length)return u="inner-undirected"===u?"outer":"undirected",e();if(!d){var s=n[i++];return d=r[s].values(),e()}if((c=d.next()).done)return d=null,e();var h=c.value,f=h.target;return"inner-undirected"===u&&f.key===t.key&&(f=h.source),{done:!1,value:[t.key,f.key,t.attributes,f.attributes,h.key,h.attributes]}}))):function(e){var t,n,r,i,o=e._nodes.values(),a=e.type,u="outer";return new O((function e(){var d;if("outer"===u)return!0===(d=o.next()).done?d:(t=d.value,u="directed",e());if("directed"===u)return"undirected"===a?(u="undirected",e()):(r=t.out,n=Object.keys(t.out),i=0,u="inner-directed",e());if("undirected"===u){if("directed"===a)return u="outer",e();r=t.undirected,n=Object.keys(t.undirected),i=0,u="inner-undirected"}if(i>=n.length)return u="inner-undirected"===u?"outer":"undirected",e();var c=n[i++],s=r[c],h=s.target;return"inner-undirected"===u&&h.key===t.key&&(h=s.source),{done:!1,value:[t.key,h.key,t.attributes,h.attributes,s.key,s.attributes]}}))}(this);var e,t,n,r,i,o,a,u,d},r.nodes=function(){return"function"==typeof Array.from?Array.from(this._nodes.keys()):C(this._nodes.keys(),this._nodes.size)},r.forEachNode=function(e){if("function"!=typeof e)throw new z("Graph.forEachNode: expecting a callback.");this._nodes.forEach((function(t,n){e(n,t.attributes)}))},r.forEachNodeUntil=function(e){if("function"!=typeof e)throw new z("Graph.forEachNode: expecting a callback.");for(var t,n,r=this._nodes.values();!0!==(t=r.next()).done;)if(e((n=t.value).key,n.attributes))return!0;return!1},r.nodeEntries=function(){var e=this._nodes.values();return new O((function(){var t=e.next();if(t.done)return t;var n=t.value;return{value:[n.key,n.attributes],done:!1}}))},r.exportNode=function(e){e=""+e;var t=this._nodes.get(e);if(!t)throw new M('Graph.exportNode: could not find the "'.concat(e,'" node in the graph.'));return ze(e,t)},r.exportEdge=function(e){e=""+e;var t=this._edges.get(e);if(!t)throw new M('Graph.exportEdge: could not find the "'.concat(e,'" edge in the graph.'));return Me(e,t)},r.export=function(){var e=new Array(this._nodes.size),t=0;this._nodes.forEach((function(n,r){e[t++]=ze(r,n)}));var n=new Array(this._edges.size);return t=0,this._edges.forEach((function(e,r){n[t++]=Me(r,e)})),{attributes:this.getAttributes(),nodes:e,edges:n,options:{type:this.type,multi:this.multi,allowSelfLoops:this.allowSelfLoops}}},r.importNode=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=Pe(e);if(n){if("not-object"===n)throw new z('Graph.importNode: invalid serialized node. A serialized node should be a plain object with at least a "key" property.');if("no-key"===n)throw new z("Graph.importNode: no key provided.");if("invalid-attributes"===n)throw new z("Graph.importNode: invalid attributes. Attributes should be a plain object, null or omitted.")}var r=e.key,i=e.attributes,o=void 0===i?{}:i;return t?this.mergeNode(r,o):this.addNode(r,o),this},r.importEdge=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=Te(e);if(n){if("not-object"===n)throw new z('Graph.importEdge: invalid serialized edge. A serialized edge should be a plain object with at least a "source" & "target" property.');if("no-source"===n)throw new z("Graph.importEdge: missing souce.");if("no-target"===n)throw new z("Graph.importEdge: missing target.");if("invalid-attributes"===n)throw new z("Graph.importEdge: invalid attributes. Attributes should be a plain object, null or omitted.");if("invalid-undirected"===n)throw new z("Graph.importEdge: invalid undirected. Undirected should be boolean or omitted.")}var r=e.source,i=e.target,o=e.attributes,a=void 0===o?{}:o,u=e.undirected,d=void 0!==u&&u;return"key"in e?(t?d?this.mergeUndirectedEdgeWithKey:this.mergeDirectedEdgeWithKey:d?this.addUndirectedEdgeWithKey:this.addDirectedEdgeWithKey).call(this,e.key,r,i,a):(t?d?this.mergeUndirectedEdge:this.mergeDirectedEdge:d?this.addUndirectedEdge:this.addDirectedEdge).call(this,r,i,a),this},r.import=function(e){var t,n,r,i=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(s(e))return this.import(e.export(),i),this;if(!h(e))throw new z("Graph.import: invalid argument. Expecting a serialized graph or, alternatively, a Graph instance.");if(e.attributes){if(!h(e.attributes))throw new z("Graph.import: invalid attributes. Expecting a plain object.");i?this.mergeAttributes(e.attributes):this.replaceAttributes(e.attributes)}if(e.nodes){if(r=e.nodes,!Array.isArray(r))throw new z("Graph.import: invalid nodes. Expecting an array.");for(t=0,n=r.length;t<n;t++)this.importNode(r[t],i)}if(e.edges){if(r=e.edges,!Array.isArray(r))throw new z("Graph.import: invalid edges. Expecting an array.");for(t=0,n=r.length;t<n;t++)this.importEdge(r[t],i)}return this},r.nullCopy=function(e){return new n(d({},this._options,e))},r.emptyCopy=function(e){var t=this.nullCopy(e);return this._nodes.forEach((function(e,n){var r=d({},e.attributes);e=new t.NodeDataClass(n,r),t._nodes.set(n,e)})),t},r.copy=function(){var e=new n(this._options);return e.import(this),e},r.upgradeToMixed=function(){return"mixed"===this.type||(this._nodes.forEach((function(e){return e.upgradeToMixed()})),this._options.type="mixed",g(this,"type",this._options.type),p(this,"NodeDataClass",T)),this},r.upgradeToMulti=function(){return this.multi||(this._options.multi=!0,g(this,"multi",!0),(e=this)._nodes.forEach((function(t,n){if(t.out)for(var r in t.out){var i=new Set;i.add(t.out[r]),t.out[r]=i,e._nodes.get(r).in[n]=i}if(t.undirected)for(var o in t.undirected)if(!(o>n)){var a=new Set;a.add(t.undirected[o]),t.undirected[o]=a,e._nodes.get(o).undirected[n]=a}}))),this;var e},r.clearIndex=function(){return this._nodes.forEach((function(e){void 0!==e.in&&(e.in={},e.out={}),void 0!==e.undirected&&(e.undirected={})})),this},r.toJSON=function(){return this.export()},r.toString=function(){return"[object Graph]"},r.inspect=function(){var e=this,t={};this._nodes.forEach((function(e,n){t[n]=e.attributes}));var n={},r={};this._edges.forEach((function(t,i){var o=t.undirected?"--":"->",a="",u="(".concat(t.source.key,")").concat(o,"(").concat(t.target.key,")");t.generatedKey?e.multi&&(void 0===r[u]?r[u]=0:r[u]++,a+="".concat(r[u],". ")):a+="[".concat(i,"]: "),n[a+=u]=t.attributes}));var i={};for(var o in this)this.hasOwnProperty(o)&&!Fe.has(o)&&"function"!=typeof this[o]&&(i[o]=this[o]);return i.attributes=this._attributes,i.nodes=t,i.edges=n,p(i,"constructor",this.constructor),i},n}(v.exports.EventEmitter);"undefined"!=typeof Symbol&&(Je.prototype[Symbol.for("nodejs.util.inspect.custom")]=Je.prototype.inspect),[{name:function(e){return"".concat(e,"Edge")},generateKey:!0},{name:function(e){return"".concat(e,"DirectedEdge")},generateKey:!0,type:"directed"},{name:function(e){return"".concat(e,"UndirectedEdge")},generateKey:!0,type:"undirected"},{name:function(e){return"".concat(e,"EdgeWithKey")}},{name:function(e){return"".concat(e,"DirectedEdgeWithKey")},type:"directed"},{name:function(e){return"".concat(e,"UndirectedEdgeWithKey")},type:"undirected"}].forEach((function(e){["add","merge","update"].forEach((function(t){var n=e.name(t),r="add"===t?Ye:Be;e.generateKey?Je.prototype[n]=function(i,o,a){return r(this,n,!0,"undirected"===(e.type||this.type),null,i,o,a,"update"===t)}:Je.prototype[n]=function(i,o,a,u){return r(this,n,!1,"undirected"===(e.type||this.type),i,o,a,u,"update"===t)}}))})),"undefined"!=typeof Symbol&&(Je.prototype[Symbol.iterator]=Je.prototype.adjacency),function(e){B.forEach((function(t){var n=t.name,r=t.attacher;r(e,n("Edge"),"mixed"),r(e,n("DirectedEdge"),"directed"),r(e,n("UndirectedEdge"),"undirected")}))}(Je),function(e){H.forEach((function(t){!function(e,t){var n=t.name,r=t.type,i=t.direction;e.prototype[n]=function(e,t){if("mixed"!==r&&"mixed"!==this.type&&r!==this.type)return[];if(!arguments.length)return ce(this,r);if(1===arguments.length){e=""+e;var o=this._nodes.get(e);if(void 0===o)throw new M("Graph.".concat(n,': could not find the "').concat(e,'" node in the graph.'));return pe(this.multi,"mixed"===r?this.type:r,i,o)}if(2===arguments.length){e=""+e,t=""+t;var a=this._nodes.get(e);if(!a)throw new M("Graph.".concat(n,':  could not find the "').concat(e,'" source node in the graph.'));if(!this._nodes.has(t))throw new M("Graph.".concat(n,':  could not find the "').concat(t,'" target node in the graph.'));return ve(r,this.multi,i,a,t)}throw new z("Graph.".concat(n,": too many arguments (expecting 0, 1 or 2 and got ").concat(arguments.length,")."))}}(e,t),function(e,t){var n=t.name,r=t.type,i=t.direction,o="forEach"+n[0].toUpperCase()+n.slice(1,-1);e.prototype[o]=function(e,t,n){if("mixed"===r||"mixed"===this.type||r===this.type){if(1===arguments.length)return se(this,r,n=e);if(2===arguments.length){e=""+e,n=t;var a=this._nodes.get(e);if(void 0===a)throw new M("Graph.".concat(o,': could not find the "').concat(e,'" node in the graph.'));return ge(this.multi,"mixed"===r?this.type:r,i,a,n)}if(3===arguments.length){e=""+e,t=""+t;var u=this._nodes.get(e);if(!u)throw new M("Graph.".concat(o,':  could not find the "').concat(e,'" source node in the graph.'));if(!this._nodes.has(t))throw new M("Graph.".concat(o,':  could not find the "').concat(t,'" target node in the graph.'));return be(r,this.multi,i,u,t,n)}throw new z("Graph.".concat(o,": too many arguments (expecting 1, 2 or 3 and got ").concat(arguments.length,")."))}}}(e,t),function(e,t){var n=t.name,r=t.type,i=t.direction,o="forEach"+n[0].toUpperCase()+n.slice(1,-1)+"Until";e.prototype[o]=function(e,t,n){if("mixed"!==r&&"mixed"!==this.type&&r!==this.type)return!1;if(1===arguments.length)return he(this,r,n=e);if(2===arguments.length){e=""+e,n=t;var a=this._nodes.get(e);if(void 0===a)throw new M("Graph.".concat(o,': could not find the "').concat(e,'" node in the graph.'));return le(this.multi,"mixed"===r?this.type:r,i,a,n)}if(3===arguments.length){e=""+e,t=""+t;var u=this._nodes.get(e);if(!u)throw new M("Graph.".concat(o,':  could not find the "').concat(e,'" source node in the graph.'));if(!this._nodes.has(t))throw new M("Graph.".concat(o,':  could not find the "').concat(t,'" target node in the graph.'));return we(r,this.multi,i,u,t,n)}throw new z("Graph.".concat(o,": too many arguments (expecting 1, 2 or 3 and got ").concat(arguments.length,")."))}}(e,t),function(e,t){var n=t.name,r=t.type,i=t.direction,o=n.slice(0,-1)+"Entries";e.prototype[o]=function(e,t){if("mixed"!==r&&"mixed"!==this.type&&r!==this.type)return O.empty();if(!arguments.length)return fe(this,r);if(1===arguments.length){e=""+e;var n=this._nodes.get(e);if(!n)throw new M("Graph.".concat(o,': could not find the "').concat(e,'" node in the graph.'));return ye(r,i,n)}if(2===arguments.length){e=""+e,t=""+t;var a=this._nodes.get(e);if(!a)throw new M("Graph.".concat(o,':  could not find the "').concat(e,'" source node in the graph.'));if(!this._nodes.has(t))throw new M("Graph.".concat(o,':  could not find the "').concat(t,'" target node in the graph.'));return me(r,i,a,t)}throw new z("Graph.".concat(o,": too many arguments (expecting 0, 1 or 2 and got ").concat(arguments.length,")."))}}(e,t)}))}(Je),function(e){_e.forEach((function(t){!function(e,t){var n=t.name,r=t.type,i=t.direction;e.prototype[n]=function(e){if("mixed"!==r&&"mixed"!==this.type&&r!==this.type)return[];if(2===arguments.length){var t=""+arguments[0],o=""+arguments[1];if(!this._nodes.has(t))throw new M("Graph.".concat(n,': could not find the "').concat(t,'" node in the graph.'));if(!this._nodes.has(o))throw new M("Graph.".concat(n,': could not find the "').concat(o,'" node in the graph.'));return De(this,r,i,t,o)}if(1===arguments.length){e=""+e;var a=this._nodes.get(e);if(void 0===a)throw new M("Graph.".concat(n,': could not find the "').concat(e,'" node in the graph.'));return Ge("mixed"===r?this.type:r,i,a)}throw new z("Graph.".concat(n,": invalid number of arguments (expecting 1 or 2 and got ").concat(arguments.length,")."))}}(e,t),je(e,t),Ue(e,t),Oe(e,t)}))}(Je);var qe=function(e){function n(t){var n=d({type:"directed"},t);if("multi"in n&&!1!==n.multi)throw new z("DirectedGraph.from: inconsistent indication that the graph should be multi in given options!");if("directed"!==n.type)throw new z('DirectedGraph.from: inconsistent "'+n.type+'" type in given options!');return e.call(this,n)||this}return t(n,e),n}(Je),He=function(e){function n(t){var n=d({type:"undirected"},t);if("multi"in n&&!1!==n.multi)throw new z("UndirectedGraph.from: inconsistent indication that the graph should be multi in given options!");if("undirected"!==n.type)throw new z('UndirectedGraph.from: inconsistent "'+n.type+'" type in given options!');return e.call(this,n)||this}return t(n,e),n}(Je),Qe=function(e){function n(t){var n=d({multi:!0},t);if("multi"in n&&!0!==n.multi)throw new z("MultiGraph.from: inconsistent indication that the graph should be simple in given options!");return e.call(this,n)||this}return t(n,e),n}(Je),Ve=function(e){function n(t){var n=d({type:"directed",multi:!0},t);if("multi"in n&&!0!==n.multi)throw new z("MultiDirectedGraph.from: inconsistent indication that the graph should be simple in given options!");if("directed"!==n.type)throw new z('MultiDirectedGraph.from: inconsistent "'+n.type+'" type in given options!');return e.call(this,n)||this}return t(n,e),n}(Je),Xe=function(e){function n(t){var n=d({type:"undirected",multi:!0},t);if("multi"in n&&!0!==n.multi)throw new z("MultiUndirectedGraph.from: inconsistent indication that the graph should be simple in given options!");if("undirected"!==n.type)throw new z('MultiUndirectedGraph.from: inconsistent "'+n.type+'" type in given options!');return e.call(this,n)||this}return t(n,e),n}(Je);function Ze(e){e.from=function(t,n){var r=d({},t.options,n),i=new e(r);return i.import(t),i}}return Ze(Je),Ze(qe),Ze(He),Ze(Qe),Ze(Ve),Ze(Xe),Je.Graph=Je,Je.DirectedGraph=qe,Je.UndirectedGraph=He,Je.MultiGraph=Qe,Je.MultiDirectedGraph=Ve,Je.MultiUndirectedGraph=Xe,Je.InvalidArgumentsGraphError=z,Je.NotFoundGraphError=M,Je.UsageGraphError=P,Je}));
//# sourceMappingURL=graphology.umd.min.js.map


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Graphology GEXF
 * ================
 *
 * Library endpoint.
 */
module.exports = __webpack_require__(125);


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Graphology Node GEXF Endpoint
 * ==============================
 *
 * Endpoint gathering both parser & writer for Node.js.
 */
var xmldom = __webpack_require__(126),
    createParserFunction = __webpack_require__(129);

var doc = (new xmldom.DOMParser()).parseFromString('<t></t>', 'application/xml');

exports.parse = createParserFunction(
  xmldom.DOMParser,
  doc.constructor
);
exports.write = __webpack_require__(132);


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

function DOMParser(options){
	this.options = options ||{locator:{}};
}

DOMParser.prototype.parseFromString = function(source,mimeType){
	var options = this.options;
	var sax =  new XMLReader();
	var domBuilder = options.domBuilder || new DOMHandler();//contentHandler and LexicalHandler
	var errorHandler = options.errorHandler;
	var locator = options.locator;
	var defaultNSMap = options.xmlns||{};
	var isHTML = /\/x?html?$/.test(mimeType);//mimeType.toLowerCase().indexOf('html') > -1;
  	var entityMap = isHTML?htmlEntity.entityMap:{'lt':'<','gt':'>','amp':'&','quot':'"','apos':"'"};
	if(locator){
		domBuilder.setDocumentLocator(locator)
	}

	sax.errorHandler = buildErrorHandler(errorHandler,domBuilder,locator);
	sax.domBuilder = options.domBuilder || domBuilder;
	if(isHTML){
		defaultNSMap['']= 'http://www.w3.org/1999/xhtml';
	}
	defaultNSMap.xml = defaultNSMap.xml || 'http://www.w3.org/XML/1998/namespace';
	if(source && typeof source === 'string'){
		sax.parse(source,defaultNSMap,entityMap);
	}else{
		sax.errorHandler.error("invalid doc source");
	}
	return domBuilder.doc;
}
function buildErrorHandler(errorImpl,domBuilder,locator){
	if(!errorImpl){
		if(domBuilder instanceof DOMHandler){
			return domBuilder;
		}
		errorImpl = domBuilder ;
	}
	var errorHandler = {}
	var isCallback = errorImpl instanceof Function;
	locator = locator||{}
	function build(key){
		var fn = errorImpl[key];
		if(!fn && isCallback){
			fn = errorImpl.length == 2?function(msg){errorImpl(key,msg)}:errorImpl;
		}
		errorHandler[key] = fn && function(msg){
			fn('[xmldom '+key+']\t'+msg+_locator(locator));
		}||function(){};
	}
	build('warning');
	build('error');
	build('fatalError');
	return errorHandler;
}

//console.log('#\n\n\n\n\n\n\n####')
/**
 * +ContentHandler+ErrorHandler
 * +LexicalHandler+EntityResolver2
 * -DeclHandler-DTDHandler
 *
 * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
 * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
 */
function DOMHandler() {
    this.cdata = false;
}
function position(locator,node){
	node.lineNumber = locator.lineNumber;
	node.columnNumber = locator.columnNumber;
}
/**
 * @see org.xml.sax.ContentHandler#startDocument
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
 */
DOMHandler.prototype = {
	startDocument : function() {
    	this.doc = new DOMImplementation().createDocument(null, null, null);
    	if (this.locator) {
        	this.doc.documentURI = this.locator.systemId;
    	}
	},
	startElement:function(namespaceURI, localName, qName, attrs) {
		var doc = this.doc;
	    var el = doc.createElementNS(namespaceURI, qName||localName);
	    var len = attrs.length;
	    appendElement(this, el);
	    this.currentElement = el;

		this.locator && position(this.locator,el)
	    for (var i = 0 ; i < len; i++) {
	        var namespaceURI = attrs.getURI(i);
	        var value = attrs.getValue(i);
	        var qName = attrs.getQName(i);
			var attr = doc.createAttributeNS(namespaceURI, qName);
			this.locator &&position(attrs.getLocator(i),attr);
			attr.value = attr.nodeValue = value;
			el.setAttributeNode(attr)
	    }
	},
	endElement:function(namespaceURI, localName, qName) {
		var current = this.currentElement
		var tagName = current.tagName;
		this.currentElement = current.parentNode;
	},
	startPrefixMapping:function(prefix, uri) {
	},
	endPrefixMapping:function(prefix) {
	},
	processingInstruction:function(target, data) {
	    var ins = this.doc.createProcessingInstruction(target, data);
	    this.locator && position(this.locator,ins)
	    appendElement(this, ins);
	},
	ignorableWhitespace:function(ch, start, length) {
	},
	characters:function(chars, start, length) {
		chars = _toString.apply(this,arguments)
		//console.log(chars)
		if(chars){
			if (this.cdata) {
				var charNode = this.doc.createCDATASection(chars);
			} else {
				var charNode = this.doc.createTextNode(chars);
			}
			if(this.currentElement){
				this.currentElement.appendChild(charNode);
			}else if(/^\s*$/.test(chars)){
				this.doc.appendChild(charNode);
				//process xml
			}
			this.locator && position(this.locator,charNode)
		}
	},
	skippedEntity:function(name) {
	},
	endDocument:function() {
		this.doc.normalize();
	},
	setDocumentLocator:function (locator) {
	    if(this.locator = locator){// && !('lineNumber' in locator)){
	    	locator.lineNumber = 0;
	    }
	},
	//LexicalHandler
	comment:function(chars, start, length) {
		chars = _toString.apply(this,arguments)
	    var comm = this.doc.createComment(chars);
	    this.locator && position(this.locator,comm)
	    appendElement(this, comm);
	},

	startCDATA:function() {
	    //used in characters() methods
	    this.cdata = true;
	},
	endCDATA:function() {
	    this.cdata = false;
	},

	startDTD:function(name, publicId, systemId) {
		var impl = this.doc.implementation;
	    if (impl && impl.createDocumentType) {
	        var dt = impl.createDocumentType(name, publicId, systemId);
	        this.locator && position(this.locator,dt)
	        appendElement(this, dt);
	    }
	},
	/**
	 * @see org.xml.sax.ErrorHandler
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
	 */
	warning:function(error) {
		console.warn('[xmldom warning]\t'+error,_locator(this.locator));
	},
	error:function(error) {
		console.error('[xmldom error]\t'+error,_locator(this.locator));
	},
	fatalError:function(error) {
		throw new ParseError(error, this.locator);
	}
}
function _locator(l){
	if(l){
		return '\n@'+(l.systemId ||'')+'#[line:'+l.lineNumber+',col:'+l.columnNumber+']'
	}
}
function _toString(chars,start,length){
	if(typeof chars == 'string'){
		return chars.substr(start,length)
	}else{//java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
		if(chars.length >= start+length || start){
			return new java.lang.String(chars,start,length)+'';
		}
		return chars;
	}
}

/*
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
 * used method of org.xml.sax.ext.LexicalHandler:
 *  #comment(chars, start, length)
 *  #startCDATA()
 *  #endCDATA()
 *  #startDTD(name, publicId, systemId)
 *
 *
 * IGNORED method of org.xml.sax.ext.LexicalHandler:
 *  #endDTD()
 *  #startEntity(name)
 *  #endEntity(name)
 *
 *
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
 * IGNORED method of org.xml.sax.ext.DeclHandler
 * 	#attributeDecl(eName, aName, type, mode, value)
 *  #elementDecl(name, model)
 *  #externalEntityDecl(name, publicId, systemId)
 *  #internalEntityDecl(name, value)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
 * IGNORED method of org.xml.sax.EntityResolver2
 *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
 *  #resolveEntity(publicId, systemId)
 *  #getExternalSubset(name, baseURI)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
 * IGNORED method of org.xml.sax.DTDHandler
 *  #notationDecl(name, publicId, systemId) {};
 *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
 */
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(key){
	DOMHandler.prototype[key] = function(){return null}
})

/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
function appendElement (hander,node) {
    if (!hander.currentElement) {
        hander.doc.appendChild(node);
    } else {
        hander.currentElement.appendChild(node);
    }
}//appendChild and setAttributeNS are preformance key

//if(typeof require == 'function'){
var htmlEntity = __webpack_require__(127);
var sax = __webpack_require__(128);
var XMLReader = sax.XMLReader;
var ParseError = sax.ParseError;
var DOMImplementation = exports.DOMImplementation = __webpack_require__(37).DOMImplementation;
exports.XMLSerializer = __webpack_require__(37).XMLSerializer ;
exports.DOMParser = DOMParser;
exports.__DOMHandler = DOMHandler;
//}


/***/ }),
/* 127 */
/***/ (function(module, exports) {

exports.entityMap = {
       lt: '<',
       gt: '>',
       amp: '&',
       quot: '"',
       apos: "'",
       Agrave: "À",
       Aacute: "Á",
       Acirc: "Â",
       Atilde: "Ã",
       Auml: "Ä",
       Aring: "Å",
       AElig: "Æ",
       Ccedil: "Ç",
       Egrave: "È",
       Eacute: "É",
       Ecirc: "Ê",
       Euml: "Ë",
       Igrave: "Ì",
       Iacute: "Í",
       Icirc: "Î",
       Iuml: "Ï",
       ETH: "Ð",
       Ntilde: "Ñ",
       Ograve: "Ò",
       Oacute: "Ó",
       Ocirc: "Ô",
       Otilde: "Õ",
       Ouml: "Ö",
       Oslash: "Ø",
       Ugrave: "Ù",
       Uacute: "Ú",
       Ucirc: "Û",
       Uuml: "Ü",
       Yacute: "Ý",
       THORN: "Þ",
       szlig: "ß",
       agrave: "à",
       aacute: "á",
       acirc: "â",
       atilde: "ã",
       auml: "ä",
       aring: "å",
       aelig: "æ",
       ccedil: "ç",
       egrave: "è",
       eacute: "é",
       ecirc: "ê",
       euml: "ë",
       igrave: "ì",
       iacute: "í",
       icirc: "î",
       iuml: "ï",
       eth: "ð",
       ntilde: "ñ",
       ograve: "ò",
       oacute: "ó",
       ocirc: "ô",
       otilde: "õ",
       ouml: "ö",
       oslash: "ø",
       ugrave: "ù",
       uacute: "ú",
       ucirc: "û",
       uuml: "ü",
       yacute: "ý",
       thorn: "þ",
       yuml: "ÿ",
       nbsp: "\u00a0",
       iexcl: "¡",
       cent: "¢",
       pound: "£",
       curren: "¤",
       yen: "¥",
       brvbar: "¦",
       sect: "§",
       uml: "¨",
       copy: "©",
       ordf: "ª",
       laquo: "«",
       not: "¬",
       shy: "­­",
       reg: "®",
       macr: "¯",
       deg: "°",
       plusmn: "±",
       sup2: "²",
       sup3: "³",
       acute: "´",
       micro: "µ",
       para: "¶",
       middot: "·",
       cedil: "¸",
       sup1: "¹",
       ordm: "º",
       raquo: "»",
       frac14: "¼",
       frac12: "½",
       frac34: "¾",
       iquest: "¿",
       times: "×",
       divide: "÷",
       forall: "∀",
       part: "∂",
       exist: "∃",
       empty: "∅",
       nabla: "∇",
       isin: "∈",
       notin: "∉",
       ni: "∋",
       prod: "∏",
       sum: "∑",
       minus: "−",
       lowast: "∗",
       radic: "√",
       prop: "∝",
       infin: "∞",
       ang: "∠",
       and: "∧",
       or: "∨",
       cap: "∩",
       cup: "∪",
       'int': "∫",
       there4: "∴",
       sim: "∼",
       cong: "≅",
       asymp: "≈",
       ne: "≠",
       equiv: "≡",
       le: "≤",
       ge: "≥",
       sub: "⊂",
       sup: "⊃",
       nsub: "⊄",
       sube: "⊆",
       supe: "⊇",
       oplus: "⊕",
       otimes: "⊗",
       perp: "⊥",
       sdot: "⋅",
       Alpha: "Α",
       Beta: "Β",
       Gamma: "Γ",
       Delta: "Δ",
       Epsilon: "Ε",
       Zeta: "Ζ",
       Eta: "Η",
       Theta: "Θ",
       Iota: "Ι",
       Kappa: "Κ",
       Lambda: "Λ",
       Mu: "Μ",
       Nu: "Ν",
       Xi: "Ξ",
       Omicron: "Ο",
       Pi: "Π",
       Rho: "Ρ",
       Sigma: "Σ",
       Tau: "Τ",
       Upsilon: "Υ",
       Phi: "Φ",
       Chi: "Χ",
       Psi: "Ψ",
       Omega: "Ω",
       alpha: "α",
       beta: "β",
       gamma: "γ",
       delta: "δ",
       epsilon: "ε",
       zeta: "ζ",
       eta: "η",
       theta: "θ",
       iota: "ι",
       kappa: "κ",
       lambda: "λ",
       mu: "μ",
       nu: "ν",
       xi: "ξ",
       omicron: "ο",
       pi: "π",
       rho: "ρ",
       sigmaf: "ς",
       sigma: "σ",
       tau: "τ",
       upsilon: "υ",
       phi: "φ",
       chi: "χ",
       psi: "ψ",
       omega: "ω",
       thetasym: "ϑ",
       upsih: "ϒ",
       piv: "ϖ",
       OElig: "Œ",
       oelig: "œ",
       Scaron: "Š",
       scaron: "š",
       Yuml: "Ÿ",
       fnof: "ƒ",
       circ: "ˆ",
       tilde: "˜",
       ensp: " ",
       emsp: " ",
       thinsp: " ",
       zwnj: "‌",
       zwj: "‍",
       lrm: "‎",
       rlm: "‏",
       ndash: "–",
       mdash: "—",
       lsquo: "‘",
       rsquo: "’",
       sbquo: "‚",
       ldquo: "“",
       rdquo: "”",
       bdquo: "„",
       dagger: "†",
       Dagger: "‡",
       bull: "•",
       hellip: "…",
       permil: "‰",
       prime: "′",
       Prime: "″",
       lsaquo: "‹",
       rsaquo: "›",
       oline: "‾",
       euro: "€",
       trade: "™",
       larr: "←",
       uarr: "↑",
       rarr: "→",
       darr: "↓",
       harr: "↔",
       crarr: "↵",
       lceil: "⌈",
       rceil: "⌉",
       lfloor: "⌊",
       rfloor: "⌋",
       loz: "◊",
       spades: "♠",
       clubs: "♣",
       hearts: "♥",
       diams: "♦"
};


/***/ }),
/* 128 */
/***/ (function(module, exports) {

//[4]   	NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
//[4a]   	NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
//[5]   	Name	   ::=   	NameStartChar (NameChar)*
var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]///\u10000-\uEFFFF
var nameChar = new RegExp("[\\-\\.0-9"+nameStartChar.source.slice(1,-1)+"\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
var tagNamePattern = new RegExp('^'+nameStartChar.source+nameChar.source+'*(?:\:'+nameStartChar.source+nameChar.source+'*)?$');
//var tagNamePattern = /^[a-zA-Z_][\w\-\.]*(?:\:[a-zA-Z_][\w\-\.]*)?$/
//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')

//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
var S_TAG = 0;//tag name offerring
var S_ATTR = 1;//attr name offerring 
var S_ATTR_SPACE=2;//attr name end and space offer
var S_EQ = 3;//=space?
var S_ATTR_NOQUOT_VALUE = 4;//attr value(no quot value only)
var S_ATTR_END = 5;//attr value end and no space(quot end)
var S_TAG_SPACE = 6;//(attr value end || tag end ) && (space offer)
var S_TAG_CLOSE = 7;//closed el<el />

/**
 * Creates an error that will not be caught by XMLReader aka the SAX parser.
 *
 * @param {string} message
 * @param {any?} locator Optional, can provide details about the location in the source
 * @constructor
 */
function ParseError(message, locator) {
	this.message = message
	this.locator = locator
	if(Error.captureStackTrace) Error.captureStackTrace(this, ParseError);
}
ParseError.prototype = new Error();
ParseError.prototype.name = ParseError.name

function XMLReader(){
	
}

XMLReader.prototype = {
	parse:function(source,defaultNSMap,entityMap){
		var domBuilder = this.domBuilder;
		domBuilder.startDocument();
		_copy(defaultNSMap ,defaultNSMap = {})
		parse(source,defaultNSMap,entityMap,
				domBuilder,this.errorHandler);
		domBuilder.endDocument();
	}
}
function parse(source,defaultNSMapCopy,entityMap,domBuilder,errorHandler){
	function fixedFromCharCode(code) {
		// String.prototype.fromCharCode does not supports
		// > 2 bytes unicode chars directly
		if (code > 0xffff) {
			code -= 0x10000;
			var surrogate1 = 0xd800 + (code >> 10)
				, surrogate2 = 0xdc00 + (code & 0x3ff);

			return String.fromCharCode(surrogate1, surrogate2);
		} else {
			return String.fromCharCode(code);
		}
	}
	function entityReplacer(a){
		var k = a.slice(1,-1);
		if(k in entityMap){
			return entityMap[k]; 
		}else if(k.charAt(0) === '#'){
			return fixedFromCharCode(parseInt(k.substr(1).replace('x','0x')))
		}else{
			errorHandler.error('entity not found:'+a);
			return a;
		}
	}
	function appendText(end){//has some bugs
		if(end>start){
			var xt = source.substring(start,end).replace(/&#?\w+;/g,entityReplacer);
			locator&&position(start);
			domBuilder.characters(xt,0,end-start);
			start = end
		}
	}
	function position(p,m){
		while(p>=lineEnd && (m = linePattern.exec(source))){
			lineStart = m.index;
			lineEnd = lineStart + m[0].length;
			locator.lineNumber++;
			//console.log('line++:',locator,startPos,endPos)
		}
		locator.columnNumber = p-lineStart+1;
	}
	var lineStart = 0;
	var lineEnd = 0;
	var linePattern = /.*(?:\r\n?|\n)|.*$/g
	var locator = domBuilder.locator;
	
	var parseStack = [{currentNSMap:defaultNSMapCopy}]
	var closeMap = {};
	var start = 0;
	while(true){
		try{
			var tagStart = source.indexOf('<',start);
			if(tagStart<0){
				if(!source.substr(start).match(/^\s*$/)){
					var doc = domBuilder.doc;
	    			var text = doc.createTextNode(source.substr(start));
	    			doc.appendChild(text);
	    			domBuilder.currentElement = text;
				}
				return;
			}
			if(tagStart>start){
				appendText(tagStart);
			}
			switch(source.charAt(tagStart+1)){
			case '/':
				var end = source.indexOf('>',tagStart+3);
				var tagName = source.substring(tagStart+2,end);
				var config = parseStack.pop();
				if(end<0){
					
	        		tagName = source.substring(tagStart+2).replace(/[\s<].*/,'');
	        		errorHandler.error("end tag name: "+tagName+' is not complete:'+config.tagName);
	        		end = tagStart+1+tagName.length;
	        	}else if(tagName.match(/\s</)){
	        		tagName = tagName.replace(/[\s<].*/,'');
	        		errorHandler.error("end tag name: "+tagName+' maybe not complete');
	        		end = tagStart+1+tagName.length;
				}
				var localNSMap = config.localNSMap;
				var endMatch = config.tagName == tagName;
				var endIgnoreCaseMach = endMatch || config.tagName&&config.tagName.toLowerCase() == tagName.toLowerCase()
		        if(endIgnoreCaseMach){
		        	domBuilder.endElement(config.uri,config.localName,tagName);
					if(localNSMap){
						for(var prefix in localNSMap){
							domBuilder.endPrefixMapping(prefix) ;
						}
					}
					if(!endMatch){
		            	errorHandler.fatalError("end tag name: "+tagName+' is not match the current start tagName:'+config.tagName ); // No known test case
					}
		        }else{
		        	parseStack.push(config)
		        }
				
				end++;
				break;
				// end elment
			case '?':// <?...?>
				locator&&position(tagStart);
				end = parseInstruction(source,tagStart,domBuilder);
				break;
			case '!':// <!doctype,<![CDATA,<!--
				locator&&position(tagStart);
				end = parseDCC(source,tagStart,domBuilder,errorHandler);
				break;
			default:
				locator&&position(tagStart);
				var el = new ElementAttributes();
				var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
				//elStartEnd
				var end = parseElementStartPart(source,tagStart,el,currentNSMap,entityReplacer,errorHandler);
				var len = el.length;
				
				
				if(!el.closed && fixSelfClosed(source,end,el.tagName,closeMap)){
					el.closed = true;
					if(!entityMap.nbsp){
						errorHandler.warning('unclosed xml attribute');
					}
				}
				if(locator && len){
					var locator2 = copyLocator(locator,{});
					//try{//attribute position fixed
					for(var i = 0;i<len;i++){
						var a = el[i];
						position(a.offset);
						a.locator = copyLocator(locator,{});
					}
					domBuilder.locator = locator2
					if(appendElement(el,domBuilder,currentNSMap)){
						parseStack.push(el)
					}
					domBuilder.locator = locator;
				}else{
					if(appendElement(el,domBuilder,currentNSMap)){
						parseStack.push(el)
					}
				}
				
				
				
				if(el.uri === 'http://www.w3.org/1999/xhtml' && !el.closed){
					end = parseHtmlSpecialContent(source,end,el.tagName,entityReplacer,domBuilder)
				}else{
					end++;
				}
			}
		}catch(e){
			if (e instanceof ParseError) {
				throw e;
			}
			errorHandler.error('element parse error: '+e)
			end = -1;
		}
		if(end>start){
			start = end;
		}else{
			//TODO: 这里有可能sax回退，有位置错误风险
			appendText(Math.max(tagStart,start)+1);
		}
	}
}
function copyLocator(f,t){
	t.lineNumber = f.lineNumber;
	t.columnNumber = f.columnNumber;
	return t;
}

/**
 * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
 * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
 */
function parseElementStartPart(source,start,el,currentNSMap,entityReplacer,errorHandler){

	/**
	 * @param {string} qname
	 * @param {string} value
	 * @param {number} startIndex
	 */
	function addAttribute(qname, value, startIndex) {
		if (qname in el.attributeNames) errorHandler.fatalError('Attribute ' + qname + ' redefined')
		el.addValue(qname, value, startIndex)
	}
	var attrName;
	var value;
	var p = ++start;
	var s = S_TAG;//status
	while(true){
		var c = source.charAt(p);
		switch(c){
		case '=':
			if(s === S_ATTR){//attrName
				attrName = source.slice(start,p);
				s = S_EQ;
			}else if(s === S_ATTR_SPACE){
				s = S_EQ;
			}else{
				//fatalError: equal must after attrName or space after attrName
				throw new Error('attribute equal must after attrName'); // No known test case
			}
			break;
		case '\'':
		case '"':
			if(s === S_EQ || s === S_ATTR //|| s == S_ATTR_SPACE
				){//equal
				if(s === S_ATTR){
					errorHandler.warning('attribute value must after "="')
					attrName = source.slice(start,p)
				}
				start = p+1;
				p = source.indexOf(c,start)
				if(p>0){
					value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
					addAttribute(attrName, value, start-1);
					s = S_ATTR_END;
				}else{
					//fatalError: no end quot match
					throw new Error('attribute value no end \''+c+'\' match');
				}
			}else if(s == S_ATTR_NOQUOT_VALUE){
				value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
				//console.log(attrName,value,start,p)
				addAttribute(attrName, value, start);
				//console.dir(el)
				errorHandler.warning('attribute "'+attrName+'" missed start quot('+c+')!!');
				start = p+1;
				s = S_ATTR_END
			}else{
				//fatalError: no equal before
				throw new Error('attribute value must after "="'); // No known test case
			}
			break;
		case '/':
			switch(s){
			case S_TAG:
				el.setTagName(source.slice(start,p));
			case S_ATTR_END:
			case S_TAG_SPACE:
			case S_TAG_CLOSE:
				s =S_TAG_CLOSE;
				el.closed = true;
			case S_ATTR_NOQUOT_VALUE:
			case S_ATTR:
			case S_ATTR_SPACE:
				break;
			//case S_EQ:
			default:
				throw new Error("attribute invalid close char('/')") // No known test case
			}
			break;
		case ''://end document
			errorHandler.error('unexpected end of input');
			if(s == S_TAG){
				el.setTagName(source.slice(start,p));
			}
			return p;
		case '>':
			switch(s){
			case S_TAG:
				el.setTagName(source.slice(start,p));
			case S_ATTR_END:
			case S_TAG_SPACE:
			case S_TAG_CLOSE:
				break;//normal
			case S_ATTR_NOQUOT_VALUE://Compatible state
			case S_ATTR:
				value = source.slice(start,p);
				if(value.slice(-1) === '/'){
					el.closed  = true;
					value = value.slice(0,-1)
				}
			case S_ATTR_SPACE:
				if(s === S_ATTR_SPACE){
					value = attrName;
				}
				if(s == S_ATTR_NOQUOT_VALUE){
					errorHandler.warning('attribute "'+value+'" missed quot(")!');
					addAttribute(attrName, value.replace(/&#?\w+;/g,entityReplacer), start)
				}else{
					if(currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !value.match(/^(?:disabled|checked|selected)$/i)){
						errorHandler.warning('attribute "'+value+'" missed value!! "'+value+'" instead!!')
					}
					addAttribute(value, value, start)
				}
				break;
			case S_EQ:
				throw new Error('attribute value missed!!');
			}
//			console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))
			return p;
		/*xml space '\x20' | #x9 | #xD | #xA; */
		case '\u0080':
			c = ' ';
		default:
			if(c<= ' '){//space
				switch(s){
				case S_TAG:
					el.setTagName(source.slice(start,p));//tagName
					s = S_TAG_SPACE;
					break;
				case S_ATTR:
					attrName = source.slice(start,p)
					s = S_ATTR_SPACE;
					break;
				case S_ATTR_NOQUOT_VALUE:
					var value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
					errorHandler.warning('attribute "'+value+'" missed quot(")!!');
					addAttribute(attrName, value, start)
				case S_ATTR_END:
					s = S_TAG_SPACE;
					break;
				//case S_TAG_SPACE:
				//case S_EQ:
				//case S_ATTR_SPACE:
				//	void();break;
				//case S_TAG_CLOSE:
					//ignore warning
				}
			}else{//not space
//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
				switch(s){
				//case S_TAG:void();break;
				//case S_ATTR:void();break;
				//case S_ATTR_NOQUOT_VALUE:void();break;
				case S_ATTR_SPACE:
					var tagName =  el.tagName;
					if(currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !attrName.match(/^(?:disabled|checked|selected)$/i)){
						errorHandler.warning('attribute "'+attrName+'" missed value!! "'+attrName+'" instead2!!')
					}
					addAttribute(attrName, attrName, start);
					start = p;
					s = S_ATTR;
					break;
				case S_ATTR_END:
					errorHandler.warning('attribute space is required"'+attrName+'"!!')
				case S_TAG_SPACE:
					s = S_ATTR;
					start = p;
					break;
				case S_EQ:
					s = S_ATTR_NOQUOT_VALUE;
					start = p;
					break;
				case S_TAG_CLOSE:
					throw new Error("elements closed character '/' and '>' must be connected to");
				}
			}
		}//end outer switch
		//console.log('p++',p)
		p++;
	}
}
/**
 * @return true if has new namespace define
 */
function appendElement(el,domBuilder,currentNSMap){
	var tagName = el.tagName;
	var localNSMap = null;
	//var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
	var i = el.length;
	while(i--){
		var a = el[i];
		var qName = a.qName;
		var value = a.value;
		var nsp = qName.indexOf(':');
		if(nsp>0){
			var prefix = a.prefix = qName.slice(0,nsp);
			var localName = qName.slice(nsp+1);
			var nsPrefix = prefix === 'xmlns' && localName
		}else{
			localName = qName;
			prefix = null
			nsPrefix = qName === 'xmlns' && ''
		}
		//can not set prefix,because prefix !== ''
		a.localName = localName ;
		//prefix == null for no ns prefix attribute 
		if(nsPrefix !== false){//hack!!
			if(localNSMap == null){
				localNSMap = {}
				//console.log(currentNSMap,0)
				_copy(currentNSMap,currentNSMap={})
				//console.log(currentNSMap,1)
			}
			currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
			a.uri = 'http://www.w3.org/2000/xmlns/'
			domBuilder.startPrefixMapping(nsPrefix, value) 
		}
	}
	var i = el.length;
	while(i--){
		a = el[i];
		var prefix = a.prefix;
		if(prefix){//no prefix attribute has no namespace
			if(prefix === 'xml'){
				a.uri = 'http://www.w3.org/XML/1998/namespace';
			}if(prefix !== 'xmlns'){
				a.uri = currentNSMap[prefix || '']
				
				//{console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
			}
		}
	}
	var nsp = tagName.indexOf(':');
	if(nsp>0){
		prefix = el.prefix = tagName.slice(0,nsp);
		localName = el.localName = tagName.slice(nsp+1);
	}else{
		prefix = null;//important!!
		localName = el.localName = tagName;
	}
	//no prefix element has default namespace
	var ns = el.uri = currentNSMap[prefix || ''];
	domBuilder.startElement(ns,localName,tagName,el);
	//endPrefixMapping and startPrefixMapping have not any help for dom builder
	//localNSMap = null
	if(el.closed){
		domBuilder.endElement(ns,localName,tagName);
		if(localNSMap){
			for(prefix in localNSMap){
				domBuilder.endPrefixMapping(prefix) 
			}
		}
	}else{
		el.currentNSMap = currentNSMap;
		el.localNSMap = localNSMap;
		//parseStack.push(el);
		return true;
	}
}
function parseHtmlSpecialContent(source,elStartEnd,tagName,entityReplacer,domBuilder){
	if(/^(?:script|textarea)$/i.test(tagName)){
		var elEndStart =  source.indexOf('</'+tagName+'>',elStartEnd);
		var text = source.substring(elStartEnd+1,elEndStart);
		if(/[&<]/.test(text)){
			if(/^script$/i.test(tagName)){
				//if(!/\]\]>/.test(text)){
					//lexHandler.startCDATA();
					domBuilder.characters(text,0,text.length);
					//lexHandler.endCDATA();
					return elEndStart;
				//}
			}//}else{//text area
				text = text.replace(/&#?\w+;/g,entityReplacer);
				domBuilder.characters(text,0,text.length);
				return elEndStart;
			//}
			
		}
	}
	return elStartEnd+1;
}
function fixSelfClosed(source,elStartEnd,tagName,closeMap){
	//if(tagName in closeMap){
	var pos = closeMap[tagName];
	if(pos == null){
		//console.log(tagName)
		pos =  source.lastIndexOf('</'+tagName+'>')
		if(pos<elStartEnd){//忘记闭合
			pos = source.lastIndexOf('</'+tagName)
		}
		closeMap[tagName] =pos
	}
	return pos<elStartEnd;
	//} 
}
function _copy(source,target){
	for(var n in source){target[n] = source[n]}
}
function parseDCC(source,start,domBuilder,errorHandler){//sure start with '<!'
	var next= source.charAt(start+2)
	switch(next){
	case '-':
		if(source.charAt(start + 3) === '-'){
			var end = source.indexOf('-->',start+4);
			//append comment source.substring(4,end)//<!--
			if(end>start){
				domBuilder.comment(source,start+4,end-start-4);
				return end+3;
			}else{
				errorHandler.error("Unclosed comment");
				return -1;
			}
		}else{
			//error
			return -1;
		}
	default:
		if(source.substr(start+3,6) == 'CDATA['){
			var end = source.indexOf(']]>',start+9);
			domBuilder.startCDATA();
			domBuilder.characters(source,start+9,end-start-9);
			domBuilder.endCDATA() 
			return end+3;
		}
		//<!DOCTYPE
		//startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId) 
		var matchs = split(source,start);
		var len = matchs.length;
		if(len>1 && /!doctype/i.test(matchs[0][0])){
			var name = matchs[1][0];
			var pubid = false;
			var sysid = false;
			if(len>3){
				if(/^public$/i.test(matchs[2][0])){
					pubid = matchs[3][0];
					sysid = len>4 && matchs[4][0];
				}else if(/^system$/i.test(matchs[2][0])){
					sysid = matchs[3][0];
				}
			}
			var lastMatch = matchs[len-1]
			domBuilder.startDTD(name, pubid, sysid);
			domBuilder.endDTD();
			
			return lastMatch.index+lastMatch[0].length
		}
	}
	return -1;
}



function parseInstruction(source,start,domBuilder){
	var end = source.indexOf('?>',start);
	if(end){
		var match = source.substring(start,end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
		if(match){
			var len = match[0].length;
			domBuilder.processingInstruction(match[1], match[2]) ;
			return end+2;
		}else{//error
			return -1;
		}
	}
	return -1;
}

function ElementAttributes(){
	this.attributeNames = {}
}
ElementAttributes.prototype = {
	setTagName:function(tagName){
		if(!tagNamePattern.test(tagName)){
			throw new Error('invalid tagName:'+tagName)
		}
		this.tagName = tagName
	},
	addValue:function(qName, value, offset) {
		if(!tagNamePattern.test(qName)){
			throw new Error('invalid attribute:'+qName)
		}
		this.attributeNames[qName] = this.length;
		this[this.length++] = {qName:qName,value:value,offset:offset}
	},
	length:0,
	getLocalName:function(i){return this[i].localName},
	getLocator:function(i){return this[i].locator},
	getQName:function(i){return this[i].qName},
	getURI:function(i){return this[i].uri},
	getValue:function(i){return this[i].value}
//	,getIndex:function(uri, localName)){
//		if(localName){
//			
//		}else{
//			var qName = uri
//		}
//	},
//	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
//	getType:function(uri,localName){}
//	getType:function(i){},
}



function split(source,start){
	var match;
	var buf = [];
	var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
	reg.lastIndex = start;
	reg.exec(source);//skip <
	while(match = reg.exec(source)){
		buf.push(match);
		if(match[1])return buf;
	}
}

exports.XMLReader = XMLReader;
exports.ParseError = ParseError;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint no-self-compare: 0 */
/**
 * Graphology Browser GEXF Parser
 * ===============================
 *
 * Browser version of the graphology GEXF parser using DOMParser to function.
 */
var isGraphConstructor = __webpack_require__(130),
    mergeEdge = __webpack_require__(131).mergeEdge,
    helpers = __webpack_require__(38);

var cast = helpers.cast;

/**
 * Function checking whether the given value is a NaN.
 *
 * @param  {any} value - Value to test.
 * @return {boolean}
 */
function isReallyNaN(value) {
  return value !== value;
}

/**
 * Function used to convert a viz:color attribute into a CSS rgba? string.
 *
 * @param  {Node}   element - DOM element.
 * @return {string}
 */
function toRGBString(element) {
  var a = element.getAttribute('a'),
      r = element.getAttribute('r'),
      g = element.getAttribute('g'),
      b = element.getAttribute('b');

  return a ?
    ('rgba(' + r + ',' + g + ',' + b + ',' + a + ')') :
    ('rgb(' + r + ',' + g + ',' + b + ')');
}

/**
 * Function returning the first matching tag of the `viz` namespace matching
 * the desired tag name.
 *
 * @param  {Node}   element - Target DOM element.
 * @param  {string} name    - Tag name.
 * @return {Node}
 */
function getFirstMatchingVizTag(element, name) {
  var vizElement = element.getElementsByTagName('viz:' + name)[0];

  if (!vizElement)
    vizElement = element.getElementsByTagNameNS('viz', name)[0];

  if (!vizElement)
    vizElement = element.getElementsByTagName(name)[0];

  return vizElement;
}

/**
 * Function used to collect meta information.
 *
 * @param  {Array<Node>} elements - Target DOM element.
 * @return {object}
 */
function collectMeta(elements) {
  var meta = {},
      element,
      value;

  for (var i = 0, l = elements.length; i < l; i++) {
    element = elements[i];

    if (element.nodeName === '#text')
      continue;

    value = element.textContent.trim();

    if (value)
      meta[element.tagName.toLowerCase()] = element.textContent;
  }

  return meta;
}

/**
 * Function used to extract the model from the right elements.
 *
 * @param  {Array<Node>} elements - Target DOM elements.
 * @return {array}                - The model & default attributes.
 */
function extractModel(elements) {
  var model = {},
      defaults = {},
      element,
      defaultElement,
      id;

  for (var i = 0, l = elements.length; i < l; i++) {
    element = elements[i];
    id = element.getAttribute('id') || element.getAttribute('for');

    model[id] = {
      id: id,
      type: element.getAttribute('type') || 'string',
      title: !isReallyNaN(+id) ?
        (element.getAttribute('title') || id) :
        id
    };

    // Default?
    defaultElement = element.getElementsByTagName('default')[0];

    if (defaultElement)
      defaults[model[id].title] = cast(
        model[id].type,
        defaultElement.textContent
      );
  }

  return [model, defaults];
}

/**
 * Function used to collect an element's attributes.
 *
 * @param  {object} model    - Data model to use.
 * @param  {object} defaults - Default values.
 * @param  {Node}   element  - Target DOM element.
 * @return {object}          - The collected attributes.
 */
function collectAttributes(model, defaults, element) {
  var data = {},
      label = element.getAttribute('label'),
      weight = element.getAttribute('weight');

  if (label)
    data.label = label;

  if (weight)
    data.weight = +weight;

  var valueElements = element.getElementsByTagName('attvalue'),
      valueElement,
      id;

  for (var i = 0, l = valueElements.length; i < l; i++) {
    valueElement = valueElements[i];
    id = (
      valueElement.getAttribute('id') ||
      valueElement.getAttribute('for')
    );

    data[model[id].title] = cast(
      model[id].type,
      valueElement.getAttribute('value')
    );
  }

  // Applying default values
  var k;

  for (k in defaults) {
    if (!(k in data))
      data[k] = defaults[k];
  }

  // TODO: shortcut here to avoid viz when namespace is not set

  // Attempting to find viz namespace tags

  //-- 1) Color
  var vizElement = getFirstMatchingVizTag(element, 'color');

  if (vizElement)
    data.color = toRGBString(vizElement);

  //-- 2) Size
  vizElement = getFirstMatchingVizTag(element, 'size');

  if (vizElement)
    data.size = +vizElement.getAttribute('value');

  //-- 3) Position
  var x, y, z;

  vizElement = getFirstMatchingVizTag(element, 'position');

  if (vizElement) {
    x = vizElement.getAttribute('x');
    y = vizElement.getAttribute('y');
    z = vizElement.getAttribute('z');

    if (x)
      data.x = +x;
    if (y)
      data.y = +y;
    if (z)
      data.z = +z;
  }

  //-- 4) Shape
  vizElement = getFirstMatchingVizTag(element, 'shape');

  if (vizElement)
    data.shape = vizElement.getAttribute('value');

  //-- 5) Thickness
  vizElement = getFirstMatchingVizTag(element, 'thickness');

  if (vizElement)
    data.thickness = +vizElement.getAttribute('value');

  return data;
}

/**
 * Factory taking implementations of `DOMParser` & `Document` returning
 * the parser function.
 */
module.exports = function createParserFunction(DOMParser, Document) {

  /**
   * Function taking either a string or a document and returning a
   * graphology instance.
   *
   * @param  {function}        Graph  - A graphology constructor.
   * @param  {string|Document} source - The source to parse.
   */

  // TODO: option to map the data to the attributes for customization, nodeModel, edgeModel, nodeReducer, edgeReducer
  // TODO: option to disable the model mapping heuristic
  return function parse(Graph, source) {
    var xmlDoc = source;

    var element,
        result,
        type,
        attributes,
        id,
        s,
        t,
        i,
        l;

    if (!isGraphConstructor(Graph))
      throw new Error('graphology-gexf/parser: invalid Graph constructor.');

    // If source is a string, we are going to parse it
    if (typeof source === 'string')
      xmlDoc = (new DOMParser()).parseFromString(source, 'application/xml');

    if (!(xmlDoc instanceof Document))
      throw new Error('graphology-gexf/parser: source should either be a XML document or a string.');

    // Finding useful elements
    var GRAPH_ELEMENT = xmlDoc.getElementsByTagName('graph')[0],
        META_ELEMENT = xmlDoc.getElementsByTagName('meta')[0],
        META_ELEMENTS = (META_ELEMENT && META_ELEMENT.childNodes) || [],
        NODE_ELEMENTS = xmlDoc.getElementsByTagName('node'),
        EDGE_ELEMENTS = xmlDoc.getElementsByTagName('edge'),
        MODEL_ELEMENTS = xmlDoc.getElementsByTagName('attributes'),
        NODE_MODEL_ELEMENTS = [],
        EDGE_MODEL_ELEMENTS = [];

    for (i = 0, l = MODEL_ELEMENTS.length; i < l; i++) {
      element = MODEL_ELEMENTS[i];

      if (element.getAttribute('class') === 'node')
        NODE_MODEL_ELEMENTS = element.getElementsByTagName('attribute');
      else if (element.getAttribute('class') === 'edge')
        EDGE_MODEL_ELEMENTS = element.getElementsByTagName('attribute');
    }

    // Information
    var DEFAULT_EDGE_TYPE = GRAPH_ELEMENT.getAttribute('defaultedgetype') || 'undirected';

    if (DEFAULT_EDGE_TYPE === 'mutual')
      DEFAULT_EDGE_TYPE = 'undirected';

    // Computing models
    result = extractModel(NODE_MODEL_ELEMENTS);

    var NODE_MODEL = result[0],
        NODE_DEFAULT_ATTRIBUTES = result[1];

    result = extractModel(EDGE_MODEL_ELEMENTS);

    var EDGE_MODEL = result[0],
        EDGE_DEFAULT_ATTRIBUTES = result[1];

    // Polling the first edge to guess the type of the edges
    var graphType = EDGE_ELEMENTS[0] ?
      (EDGE_ELEMENTS[0].getAttribute('type') || DEFAULT_EDGE_TYPE) :
      'mixed';

    // Instantiating our graph
    var graph = new Graph({
      type: graphType
    });

    // Collecting meta
    var meta = collectMeta(META_ELEMENTS),
        lastModifiedDate = META_ELEMENT && META_ELEMENT.getAttribute('lastmodifieddate');

    graph.replaceAttributes(meta);

    if (lastModifiedDate)
      graph.setAttribute('lastModifiedDate', lastModifiedDate);

    // Adding nodes
    for (i = 0, l = NODE_ELEMENTS.length; i < l; i++) {
      element = NODE_ELEMENTS[i];

      graph.addNode(
        element.getAttribute('id'),
        collectAttributes(NODE_MODEL, NODE_DEFAULT_ATTRIBUTES, element)
      );
    }

    // Adding edges
    for (i = 0, l = EDGE_ELEMENTS.length; i < l; i++) {
      element = EDGE_ELEMENTS[i];

      id = element.getAttribute('id');
      type = element.getAttribute('type') || DEFAULT_EDGE_TYPE;
      s = element.getAttribute('source');
      t = element.getAttribute('target');
      attributes = collectAttributes(EDGE_MODEL, EDGE_DEFAULT_ATTRIBUTES, element);

      // If we encountered an edge with a different type, we upgrade the graph
      if (type !== graph.type && graph.type !== 'mixed') {
        graph.upgradeToMixed();
      }

      // If we encountered twice the same edge, we upgrade the graph
      if (
        !graph.multi &&
        (
          (type === 'directed' && graph.hasDirectedEdge(s, t)) ||
          (graph.hasUndirectedEdge(s, t))
        )
      ) {
        graph.upgradeToMulti();
      }

      mergeEdge(
        graph,
        type !== 'directed',
        id || null,
        s,
        t,
        attributes
      );
    }

    return graph;
  };
};


/***/ }),
/* 130 */
/***/ (function(module, exports) {

/**
 * Graphology isGraphConstructor
 * ==============================
 *
 * Very simple function aiming at ensuring the given variable is a
 * graphology constructor.
 */

/**
 * Checking the value is a graphology constructor.
 *
 * @param  {any}     value - Target value.
 * @return {boolean}
 */
module.exports = function isGraphConstructor(value) {
  return (
    value !== null &&
    typeof value === 'function' &&
    typeof value.prototype === 'object' &&
    typeof value.prototype.addUndirectedEdgeWithKey === 'function' &&
    typeof value.prototype.dropNode === 'function'
  );
};


/***/ }),
/* 131 */
/***/ (function(module, exports) {

/**
 * Graphology Edge Adders
 * =======================
 *
 * Generic edge addition functions that can be used to avoid nasty repetitive
 * conditions.
 */

exports.addEdge = function addEdge(graph, undirected, key, source, target, attributes) {
  if (undirected) {
    if (key === null || key === undefined)
      graph.addUndirectedEdge(source, target, attributes);
    else
      graph.addUndirectedEdgeWithKey(key, source, target, attributes);
  }
  else {
    if (key === null || key === undefined)
      graph.addDirectedEdge(source, target, attributes);
    else
      graph.addDirectedEdgeWithKey(key, source, target, attributes);
  }
};

exports.copyEdge = function copyEdge(graph, undirected, key, source, target, attributes) {
  attributes = Object.assign({}, attributes);

  if (undirected) {
    if (key === null || key === undefined)
      graph.addUndirectedEdge(source, target, attributes);
    else
      graph.addUndirectedEdgeWithKey(key, source, target, attributes);
  }
  else {
    if (key === null || key === undefined)
      graph.addDirectedEdge(source, target, attributes);
    else
      graph.addDirectedEdgeWithKey(key, source, target, attributes);
  }
};

exports.mergeEdge = function mergeEdge(graph, undirected, key, source, target, attributes) {
  if (undirected) {
    if (key === null || key === undefined)
      graph.mergeUndirectedEdge(source, target, attributes);
    else
      graph.mergeUndirectedEdgeWithKey(key, source, target, attributes);
  }
  else {
    if (key === null || key === undefined)
      graph.mergeDirectedEdge(source, target, attributes);
    else
      graph.mergeDirectedEdgeWithKey(key, source, target, attributes);
  }
};

exports.updateEdge = function updateEdge(graph, undirected, key, source, target, attributes) {
  if (undirected) {
    if (key === null || key === undefined)
      graph.updateUndirectedEdge(source, target, attributes);
    else
      graph.updateUndirectedEdgeWithKey(key, source, target, attributes);
  }
  else {
    if (key === null || key === undefined)
      graph.updateDirectedEdge(source, target, attributes);
    else
      graph.updateDirectedEdgeWithKey(key, source, target, attributes);
  }
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint no-self-compare: 0 */
/**
 * Graphology Common GEXF Writer
 * ==============================
 *
 * GEXF writer working for both node.js & the browser.
 */
var isGraph = __webpack_require__(39),
    inferType = __webpack_require__(133),
    XMLWriter = __webpack_require__(134),
    sanitizeTagName = __webpack_require__(38).sanitizeTagName;

// TODO: handle object in color, position with object for viz

/**
 * Constants.
 */
var GEXF_NAMESPACE = 'http://www.gexf.net/1.2draft',
    GEXF_VIZ_NAMESPACE = 'http:///www.gexf.net/1.1draft/viz';

var VIZ_RESERVED_NAMES = new Set([
  'color',
  'size',
  'x',
  'y',
  'z',
  'shape',
  'thickness'
]);

var RGBA_TEST = /^\s*rgba?\s*\(/i,
    RGBA_MATCH = /^\s*rgba?\s*\(\s*([0-9]*)\s*,\s*([0-9]*)\s*,\s*([0-9]*)\s*(?:,\s*([.0-9]*))?\)\s*$/;

/**
 * Function used to transform a CSS color into a RGBA object.
 *
 * @param  {string} value - Target value.
 * @return {object}
 */
function CSSColorToRGBA(value) {
  if (!value || typeof value !== 'string')
    return {};

  if (value[0] === '#') {
    value = value.slice(1);

    return (value.length === 3) ?
      {
        r: parseInt(value[0] + value[0], 16),
        g: parseInt(value[1] + value[1], 16),
        b: parseInt(value[2] + value[2], 16)
      } :
      {
        r: parseInt(value[0] + value[1], 16),
        g: parseInt(value[2] + value[3], 16),
        b: parseInt(value[4] + value[5], 16)
      };
  }
  else if (RGBA_TEST.test(value)) {
    var result = {};

    value = value.match(RGBA_MATCH);
    result.r = +value[1];
    result.g = +value[2];
    result.b = +value[3];

    if (value[4])
      result.a = +value[4];

    return result;
  }

  return {};
}

/**
 * Function used to map an element's attributes to a standardized map of
 * GEXF expected properties (label, viz, attributes).
 *
 * @param  {string} type       - The element's type.
 * @param  {string} key        - The element's key.
 * @param  {object} attributes - The element's attributes.
 * @return {object}
 */
function DEFAULT_ELEMENT_FORMATTER(type, key, attributes) {
  var output = {},
      name;

  for (name in attributes) {
    if (name === 'label') {
      output.label = attributes.label;
    }
    else if (type === 'edge' && name === 'weight') {
      output.weight = attributes.weight;
    }
    else if (VIZ_RESERVED_NAMES.has(name)) {
      output.viz = output.viz || {};
      output.viz[name] = attributes[name];
    }
    else {
      output.attributes = output.attributes || {};
      output.attributes[name] = attributes[name];
    }
  }

  return output;
}

var DEFAULT_NODE_FORMATTER = DEFAULT_ELEMENT_FORMATTER.bind(null, 'node'),
    DEFAULT_EDGE_FORMATTER = DEFAULT_ELEMENT_FORMATTER.bind(null, 'edge');

/**
 * Function used to check whether the given integer is 32 bits or not.
 *
 * @param  {number} number - Target number.
 * @return {boolean}
 */
function is32BitInteger(number) {
  return number <= 0x7FFFFFFF && number >= -0x7FFFFFFF;
}

/**
 * Function used to check whether the given value is "empty".
 *
 * @param  {any} value - Target value.
 * @return {boolean}
 */
function isEmptyValue(value) {
  return (
    typeof value === 'undefined' ||
    value === null ||
    value === '' ||
    value !== value
  );
}

/**
 * Function used to detect a JavaScript's value type in the GEXF model.
 *
 * @param  {any}    value - Target value.
 * @return {string}
 */
function detectValueType(value) {

  if (isEmptyValue(value))
    return 'empty';

  if (Array.isArray(value))
    return 'liststring';

  if (typeof value === 'boolean')
    return 'boolean';

  if (typeof value === 'object')
    return 'string';

  // Numbers
  if (typeof value === 'number') {

    // Integer
    if (value === (value | 0)) {

      // Long (JavaScript integer can go up to 53 bit)?
      return is32BitInteger(value) ? 'integer' : 'long';
    }

    // JavaScript numbers are 64 bit float, hence the double
    return 'double';
  }

  return 'string';
}

/**
 * Function used to cast the given value into the given type.
 *
 * @param  {string} type  - Target type.
 * @param  {any}    value - Value to cast.
 * @return {string}
 */
function cast(type, value) {
  if (type === 'liststring' && Array.isArray(value))
    return value.join('|');
  return '' + value;
}

/**
 * Function used to collect data from a graph's nodes.
 *
 * @param  {Graph}    graph   - Target graph.
 * @param  {function} format  - Function formatting the nodes attributes.
 * @return {array}
 */
function collectNodeData(graph, format) {
  var nodes = new Array(graph.order);
  var i = 0;

  graph.forEachNode(function(node, attr) {
    var data = format(node, attr);
    data.key = node;
    nodes[i++] = data;
  });

  return nodes;
}

/**
 * Function used to collect data from a graph's edges.
 *
 * @param  {Graph}    graph   - Target graph.
 * @param  {function} reducer - Function reducing the edges attributes.
 * @return {array}
 */
function collectEdgeData(graph, reducer) {
  var edges = new Array(graph.size);
  var i = 0;

  graph.forEachEdge(function(edge, attr, source, target, _sa, _ta, undirected) {
    var data = reducer(edge, attr);
    data.key = edge;
    data.source = source;
    data.target = target;
    data.undirected = undirected;
    edges[i++] = data;
  });

  return edges;
}

/**
 * Function used to infer the model of the graph's nodes or edges.
 *
 * @param  {array} elements - The graph's relevant elements.
 * @return {array}
 */

// TODO: on large graph, we could also sample or let the user indicate the types
function inferModel(elements) {
  var model = {},
      attributes,
      type,
      k;

  // Testing every attributes
  for (var i = 0, l = elements.length; i < l; i++) {
    attributes = elements[i].attributes;

    if (!attributes)
      continue;

    for (k in attributes) {
      type = detectValueType(attributes[k]);

      if (type === 'empty')
        continue;

      if (!model[k])
        model[k] = type;
      else {
        if (model[k] === 'integer' && type === 'long')
          model[k] = type;
        else if (model[k] !== type)
          model[k] = 'string';
      }
    }
  }

  // TODO: check default values
  return model;
}

/**
 * Function used to write a model.
 *
 * @param {XMLWriter} writer     - The writer to use.
 * @param {object}    model      - Model to write.
 * @param {string}    modelClass - Class of the model.
 */
function writeModel(writer, model, modelClass) {
  var name;

  if (!Object.keys(model).length)
    return;

  writer.startElement('attributes');
  writer.writeAttribute('class', modelClass);

  for (name in model) {
    writer.startElement('attribute');
    writer.writeAttribute('id', name);
    writer.writeAttribute('title', name);
    writer.writeAttribute('type', model[name]);
    writer.endElement();
  }

  writer.endElement();
}

function writeElements(writer, type, model, elements) {
  var emptyModel = !Object.keys(model).length,
      element,
      name,
      color,
      value,
      edgeType,
      attributes,
      weight,
      viz,
      k,
      i,
      l;

  writer.startElement(type + 's');

  for (i = 0, l = elements.length; i < l; i++) {
    element = elements[i];
    attributes = element.attributes;
    viz = element.viz;

    writer.startElement(type);
    writer.writeAttribute('id', element.key);

    if (type === 'edge') {
      edgeType = element.undirected ? 'undirected' : 'directed';

      if (edgeType !== writer.defaultEdgeType)
        writer.writeAttribute('type', edgeType);

      writer.writeAttribute('source', element.source);
      writer.writeAttribute('target', element.target);

      weight = element.weight;

      if ((typeof weight === 'number' && !isNaN(weight)) || typeof weight === 'string')
        writer.writeAttribute('weight', element.weight);
    }

    if (element.label)
      writer.writeAttribute('label', element.label);

    if (!emptyModel && attributes) {
      writer.startElement('attvalues');

      for (name in model) {
        if (name in attributes) {
          value = attributes[name];

          if (isEmptyValue(value))
            continue;

          writer.startElement('attvalue');
          writer.writeAttribute('for', name);
          writer.writeAttribute('value', cast(model[name], value));
          writer.endElement();
        }
      }

      writer.endElement();
    }

    if (viz) {

      //-- 1) Color
      if (viz.color) {
        color = CSSColorToRGBA(viz.color);

        writer.startElementNS('viz', 'color');

        for (k in color)
          writer.writeAttribute(k, color[k]);

        writer.endElement();
      }

      //-- 2) Size
      if ('size' in viz) {
        writer.startElementNS('viz', 'size');
        writer.writeAttribute('value', viz.size);
        writer.endElement();
      }

      //-- 3) Position
      if ('x' in viz || 'y' in viz || 'z' in viz) {
        writer.startElementNS('viz', 'position');

        if ('x' in viz)
          writer.writeAttribute('x', viz.x);

        if ('y' in viz)
          writer.writeAttribute('y', viz.y);

        if ('z' in viz)
          writer.writeAttribute('z', viz.z);

        writer.endElement();
      }

      //-- 4) Shape
      if (viz.shape) {
        writer.startElementNS('viz', 'shape');
        writer.writeAttribute('value', viz.shape);
        writer.endElement();
      }

      //-- 5) Thickness
      if ('thickness' in viz) {
        writer.startElementNS('viz', 'thickness');
        writer.writeAttribute('value', viz.thickness);
        writer.endElement();
      }
    }

    writer.endElement();
  }

  writer.endElement();
}

/**
 * Defaults.
 */
var DEFAULTS = {
  encoding: 'UTF-8',
  pretty: true,
  formatNode: DEFAULT_NODE_FORMATTER,
  formatEdge: DEFAULT_EDGE_FORMATTER
};

/**
 * Function taking a graphology instance & outputting a gexf string.
 *
 * @param  {Graph}  graph        - Target graphology instance.
 * @param  {object} options      - Options:
 * @param  {string}   [encoding]   - Character encoding.
 * @param  {boolean}  [pretty]     - Whether to pretty print output.
 * @param  {function} [formatNode] - Function formatting nodes' output.
 * @param  {function} [formatEdge] - Function formatting edges' output.
 * @return {string}              - GEXF string.
 */
module.exports = function write(graph, options) {
  if (!isGraph(graph))
    throw new Error('graphology-gexf/writer: invalid graphology instance.');

  options = options || {};

  var indent = options.pretty === false ? false : '  ';

  var formatNode = options.formatNode || DEFAULTS.formatNode,
      formatEdge = options.formatEdge || DEFAULTS.formatEdge;

  var writer = new XMLWriter(indent);

  writer.startDocument('1.0', options.encoding || DEFAULTS.encoding);

  // Starting gexf
  writer.startElement('gexf');
  writer.writeAttribute('version', '1.2');
  writer.writeAttribute('xmlns', GEXF_NAMESPACE);
  writer.writeAttribute('xmlns:viz', GEXF_VIZ_NAMESPACE);

  // Processing meta
  writer.startElement('meta');
  var graphAttributes = graph.getAttributes();

  if (graphAttributes.lastModifiedDate)
    writer.writeAttribute('lastmodifieddate', graphAttributes.lastModifiedDate);

  var metaTagName;

  for (var k in graphAttributes) {
    if (k === 'lastModifiedDate')
      continue;

    metaTagName = sanitizeTagName(k);

    if (!metaTagName)
      continue;

    writer.writeElement(metaTagName, graphAttributes[k]);
  }

  writer.endElement();
  writer.startElement('graph');

  var type = inferType(graph);

  writer.defaultEdgeType = type === 'mixed' ?
    'directed' :
    type;

  writer.writeAttribute(
    'defaultedgetype',
    writer.defaultEdgeType
  );

  // Processing model
  var nodes = collectNodeData(graph, formatNode),
      edges = collectEdgeData(graph, formatEdge);

  var nodeModel = inferModel(nodes);

  writeModel(writer, nodeModel, 'node');

  var edgeModel = inferModel(edges);

  writeModel(writer, edgeModel, 'edge');

  // Processing nodes
  writeElements(writer, 'node', nodeModel, nodes);

  // Processing edges
  writeElements(writer, 'edge', edgeModel, edges);

  return writer.toString();
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Graphology inferType
 * =====================
 *
 * Useful function used to "guess" the real type of the given Graph using
 * introspection.
 */
var isGraph = __webpack_require__(39);

/**
 * Returning the inferred type of the given graph.
 *
 * @param  {Graph}   graph - Target graph.
 * @return {boolean}
 */
module.exports = function inferType(graph) {
  if (!isGraph(graph))
    throw new Error('graphology-utils/infer-type: expecting a valid graphology instance.');

  var declaredType = graph.type;

  if (declaredType !== 'mixed')
    return declaredType;

  if (
    (graph.directedSize === 0 && graph.undirectedSize === 0) ||
    (graph.directedSize > 0 && graph.undirectedSize > 0)
  )
    return 'mixed';

  if (graph.directedSize > 0)
    return 'directed';

  return 'undirected';
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(135);


/***/ }),
/* 135 */
/***/ (function(module, exports) {


function isFalse(s) {
  return typeof s !== 'number' && !s;
}

function strval(s) {
  if (typeof s == 'string') {
    return s;
  }
  else if (typeof s == 'number') {
    return s+'';
  }
  else if (typeof s == 'function') {
    return s();
  }
  else if (s instanceof XMLWriter) {
    return s.toString();
  }
  else throw Error('Bad Parameter');
}

function XMLWriter(indent, callback) {

    if (!(this instanceof XMLWriter)) {
        return new XMLWriter();
    }

    this.name_regex = /[_:A-Za-z][-._:A-Za-z0-9]*/;
    this.indent = indent ? true : false;
    this.indentString = this.indent && typeof indent === 'string' ? indent : '    ';
    this.output = '';
    this.stack = [];
    this.tags = 0;
    this.attributes = 0;
    this.attribute = 0;
    this.texts = 0;
    this.comment = 0;
    this.dtd = 0;
    this.root = '';
    this.pi = 0;
    this.cdata = 0;
    this.started_write = false;
    this.writer;
    this.writer_encoding = 'UTF-8';

    if (typeof callback == 'function') {
        this.writer = callback;
    } else {
        this.writer = function (s, e) {
            this.output += s;
        }
    }
}

XMLWriter.prototype = {
    toString : function () {
        this.flush();
        return this.output;
    },

    indenter : function () {
      if (this.indent) {
        this.write('\n');
        for (var i = 1; i < this.tags; i++) {
          this.write(this.indentString);
        }
      }
    },

    write : function () {
        for (var i = 0; i < arguments.length; i++) {
            this.writer(arguments[i], this.writer_encoding);
        }
    },


    flush : function () {
        for (var i = this.tags; i > 0; i--) {
            this.endElement();
        }
        this.tags = 0;
    },

    startDocument : function (version, encoding, standalone) {
        if (this.tags || this.attributes) return this;

        this.startPI('xml');
        this.startAttribute('version');
        this.text(typeof version == "string" ? version : "1.0");
        this.endAttribute();
        if (typeof encoding == "string") {
            this.startAttribute('encoding');
            this.text(encoding);
            this.endAttribute();
            this.writer_encoding = encoding;
        }
        if (standalone) {
            this.startAttribute('standalone');
            this.text("yes");
            this.endAttribute();
        }
        this.endPI();
        if (!this.indent) {
          this.write('\n');
        }
        return this;
    },

    endDocument : function () {
        if (this.attributes) this.endAttributes();
        return this;
    },

    writeElement : function (name, content) {
        return this.startElement(name).text(content).endElement();
    },

    writeElementNS : function (prefix, name, uri, content) {
        if (!content) {
            content = uri;
        }
        return this.startElementNS(prefix, name, uri).text(content).endElement();
    },

    startElement : function (name) {
        name = strval(name);
        if (!name.match(this.name_regex)) throw Error('Invalid Parameter');
        if (this.tags === 0 && this.root && this.root !== name) throw Error('Invalid Parameter');
        if (this.attributes) this.endAttributes();
        ++this.tags;
        this.texts = 0;
        if (this.stack.length > 0)
          this.stack[this.stack.length-1].containsTag = true;

        this.stack.push({
            name: name,
            tags: this.tags
        });
        if (this.started_write) this.indenter();
        this.write('<', name);
        this.startAttributes();
        this.started_write = true;
        return this;
    },
    startElementNS : function (prefix, name, uri) {
        prefix = strval(prefix);
        name = strval(name);

        if (!prefix.match(this.name_regex)) throw Error('Invalid Parameter');
        if (!name.match(this.name_regex)) throw Error('Invalid Parameter');
        if (this.attributes) this.endAttributes();
        ++this.tags;
        this.texts = 0;
        if (this.stack.length > 0)
          this.stack[this.stack.length-1].containsTag = true;

        this.stack.push({
            name: prefix + ':' + name,
            tags: this.tags
        });
        if (this.started_write) this.indenter();
        this.write('<', prefix + ':' + name);
        this.startAttributes();
        this.started_write = true;
        return this;
    },

    endElement : function () {
        if (!this.tags) return this;
        var t = this.stack.pop();
        if (this.attributes > 0) {
            if (this.attribute) {
                if (this.texts) this.endAttribute();
                this.endAttribute();
            }
            this.write('/');
            this.endAttributes();
        } else {
            if (t.containsTag) this.indenter();
            this.write('</', t.name, '>');
        }
        --this.tags;
        this.texts = 0;
        return this;
    },

    writeAttribute : function (name, content) {
        if (typeof content == 'function') {
          content = content();
        }
        if (isFalse(content)) {
           return this;
        }
        return this.startAttribute(name).text(content).endAttribute();
    },
    writeAttributeNS : function (prefix, name, uri, content) {
        if (!content) {
            content = uri;
        }
        if (typeof content == 'function') {
          content = content();
        }
        if (isFalse(content)) {
          return this;
        }
        return this.startAttributeNS(prefix, name, uri).text(content).endAttribute();
    },

    startAttributes : function () {
        this.attributes = 1;
        return this;
    },

    endAttributes : function () {
        if (!this.attributes) return this;
        if (this.attribute) this.endAttribute();
        this.attributes = 0;
        this.attribute = 0;
        this.texts = 0;
        this.write('>');
        return this;
    },

    startAttribute : function (name) {
        name = strval(name);
        if (!name.match(this.name_regex)) throw Error('Invalid Parameter');
        if (!this.attributes && !this.pi) return this;
        if (this.attribute) return this;
        this.attribute = 1;
        this.write(' ', name, '="');
        return this;
    },
    startAttributeNS : function (prefix, name, uri) {
        prefix = strval(prefix);
        name = strval(name);

        if (!prefix.match(this.name_regex)) throw Error('Invalid Parameter');
        if (!name.match(this.name_regex)) throw Error('Invalid Parameter');
        if (!this.attributes && !this.pi) return this;
        if (this.attribute) return this;
        this.attribute = 1;
        this.write(' ', prefix + ':' + name, '="');
        return this;
    },
    endAttribute : function () {
        if (!this.attribute) return this;
        this.attribute = 0;
        this.texts = 0;
        this.write('"');
        return this;
    },

    text : function (content) {
        content = strval(content);
        if (!this.tags && !this.comment && !this.pi && !this.cdata) return this;
        if (this.attributes && this.attribute) {
            ++this.texts;
            this.write(content
                       .replace(/&/g, '&amp;')
                       .replace(/</g, '&lt;')
                       .replace(/"/g, '&quot;')
                       .replace(/\t/g, '&#x9;')
                       .replace(/\n/g, '&#xA;')
                       .replace(/\r/g, '&#xD;')
                      );
            return this;
        } else if (this.attributes && !this.attribute) {
            this.endAttributes();
        }
        if (this.comment || this.cdata) {
            this.write(content);
        }
        else {
          this.write(content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
        }
        ++this.texts;
        this.started_write = true;
        return this;
    },

    writeComment : function (content) {
        return this.startComment().text(content).endComment();
    },

    startComment : function () {
        if (this.comment) return this;
        if (this.attributes) this.endAttributes();
        this.indenter();
        this.write('<!--');
        this.comment = 1;
        this.started_write = true;
        return this;
    },

    endComment : function () {
        if (!this.comment) return this;
        this.write('-->');
        this.comment = 0;
        return this;
    },

    writeDocType : function (name, pubid, sysid, subset) {
        return this.startDocType(name, pubid, sysid, subset).endDocType()
    },

    startDocType : function (name, pubid, sysid, subset) {
        if (this.dtd || this.tags) return this;

        name = strval(name);
        pubid = pubid ? strval(pubid) : pubid;
        sysid = sysid ? strval(sysid) : sysid;
        subset = subset ? strval(subset) : subset;

        if (!name.match(this.name_regex)) throw Error('Invalid Parameter');
        if (pubid && !pubid.match(/^[\w\-][\w\s\-\/\+\:\.]*/)) throw Error('Invalid Parameter');
        if (sysid && !sysid.match(/^[\w\.][\w\-\/\\\:\.]*/)) throw Error('Invalid Parameter');
        if (subset && !subset.match(/[\w\s\<\>\+\.\!\#\-\?\*\,\(\)\|]*/)) throw Error('Invalid Parameter');

        pubid = pubid ? ' PUBLIC "' + pubid + '"' : (sysid) ? ' SYSTEM' : '';
        sysid = sysid ? ' "' + sysid + '"' : '';
        subset = subset ? ' [' + subset + ']': '';

        if (this.started_write) this.indenter();
        this.write('<!DOCTYPE ', name, pubid, sysid, subset);
        this.root = name;
        this.dtd = 1;
        this.started_write = true;
        return this;
    },

    endDocType : function () {
        if (!this.dtd) return this;
        this.write('>');
        return this;
    },

    writePI : function (name, content) {
        return this.startPI(name).text(content).endPI()
    },

    startPI : function (name) {
        name = strval(name);
        if (!name.match(this.name_regex)) throw Error('Invalid Parameter');
        if (this.pi) return this;
        if (this.attributes) this.endAttributes();
        if (this.started_write) this.indenter();
        this.write('<?', name);
        this.pi = 1;
        this.started_write = true;
        return this;
    },

    endPI : function () {
        if (!this.pi) return this;
        this.write('?>');
        this.pi = 0;
        return this;
    },

    writeCData : function (content) {
        return this.startCData().text(content).endCData();
    },

    startCData : function () {
        if (this.cdata) return this;
        if (this.attributes) this.endAttributes();
        this.indenter();
        this.write('<![CDATA[');
        this.cdata = 1;
        this.started_write = true;
        return this;
    },

    endCData : function () {
        if (!this.cdata) return this;
        this.write(']]>');
        this.cdata = 0;
        return this;
    },

    writeRaw : function(content) {
        content = strval(content);
        if (!this.tags && !this.comment && !this.pi && !this.cdata) return this;
        if (this.attributes && this.attribute) {
            ++this.texts;
            this.write(content.replace('&', '&amp;').replace('"', '&quot;'));
            return this;
        } else if (this.attributes && !this.attribute) {
            this.endAttributes();
        }
        ++this.texts;
        this.write(content);
        this.started_write = true;
        return this;
    }

}

module.exports = XMLWriter;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sigma = exports.MouseCaptor = exports.QuadTree = exports.Camera = void 0;
/**
 * Sigma.js Library Endpoint
 * ==========================
 *
 * The library endpoint.
 * @module
 */
var sigma_1 = __importDefault(__webpack_require__(137));
exports.Sigma = sigma_1.default;
var camera_1 = __importDefault(__webpack_require__(40));
exports.Camera = camera_1.default;
var quadtree_1 = __importDefault(__webpack_require__(45));
exports.QuadTree = quadtree_1.default;
var mouse_1 = __importDefault(__webpack_require__(43));
exports.MouseCaptor = mouse_1.default;
exports.default = sigma_1.default;


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sigma.js
 * ========
 * @module
 */
var events_1 = __webpack_require__(16);
var extent_1 = __importDefault(__webpack_require__(138));
var camera_1 = __importDefault(__webpack_require__(40));
var mouse_1 = __importDefault(__webpack_require__(43));
var quadtree_1 = __importDefault(__webpack_require__(45));
var utils_1 = __webpack_require__(1);
var labels_1 = __webpack_require__(142);
var settings_1 = __webpack_require__(143);
var touch_1 = __importDefault(__webpack_require__(160));
var matrices_1 = __webpack_require__(41);
var nodeExtent = extent_1.default.nodeExtent;
/**
 * Constants.
 */
var PIXEL_RATIO = (0, utils_1.getPixelRatio)();
var WEBGL_OVERSAMPLING_RATIO = (0, utils_1.getPixelRatio)();
var SIZE_SCALING_EXPONENT = 0.5;
/**
 * Important functions.
 */
function applyNodeDefaults(settings, key, data) {
    if (!data.hasOwnProperty("x") || !data.hasOwnProperty("y"))
        throw new Error("Sigma: could not find a valid position (x, y) for node \"" + key + "\". All your nodes must have a number \"x\" and \"y\". Maybe your forgot to apply a layout or your \"nodeReducer\" is not returning the correct data?");
    if (!data.color)
        data.color = settings.defaultNodeColor;
    if (!data.label && data.label !== "")
        data.label = null;
    if (data.label !== undefined && data.label !== null)
        data.label = "" + data.label;
    else
        data.label = null;
    if (!data.size)
        data.size = 2;
    if (!data.hasOwnProperty("hidden"))
        data.hidden = false;
    if (!data.hasOwnProperty("highlighted"))
        data.highlighted = false;
    if (!data.type || data.type === "")
        data.type = settings.defaultNodeType;
    if (!data.zIndex)
        data.zIndex = 0;
    return data;
}
function applyEdgeDefaults(settings, key, data) {
    if (!data.color)
        data.color = settings.defaultEdgeColor;
    if (!data.label)
        data.label = "";
    if (!data.size)
        data.size = 0.5;
    if (!data.hasOwnProperty("hidden"))
        data.hidden = false;
    if (!data.type || data.type === "")
        data.type = settings.defaultEdgeType;
    if (!data.zIndex)
        data.zIndex = 0;
    return data;
}
/**
 * Main class.
 *
 * @constructor
 * @param {Graph}       graph     - Graph to render.
 * @param {HTMLElement} container - DOM container in which to render.
 * @param {object}      settings  - Optional settings.
 */
var Sigma = /** @class */ (function (_super) {
    __extends(Sigma, _super);
    function Sigma(graph, container, settings) {
        if (settings === void 0) { settings = {}; }
        var _this = _super.call(this) || this;
        _this.elements = {};
        _this.canvasContexts = {};
        _this.webGLContexts = {};
        _this.activeListeners = {};
        _this.quadtree = new quadtree_1.default();
        _this.labelGrid = new labels_1.LabelGrid();
        _this.nodeDataCache = {};
        _this.edgeDataCache = {};
        _this.nodeKeyToIndex = {};
        _this.edgeKeyToIndex = {};
        _this.nodeExtent = { x: [0, 1], y: [0, 1] };
        _this.matrix = (0, matrices_1.identity)();
        _this.invMatrix = (0, matrices_1.identity)();
        _this.customBBox = null;
        _this.normalizationFunction = (0, utils_1.createNormalizationFunction)({
            x: [-Infinity, Infinity],
            y: [-Infinity, Infinity],
        });
        // Cache:
        _this.cameraSizeRatio = 1;
        // Starting dimensions
        _this.width = 0;
        _this.height = 0;
        // State
        _this.displayedLabels = new Set();
        _this.highlightedNodes = new Set();
        _this.hoveredNode = null;
        _this.renderFrame = null;
        _this.renderHighlightedNodesFrame = null;
        _this.needToProcess = false;
        _this.needToSoftProcess = false;
        // programs
        _this.nodePrograms = {};
        _this.edgePrograms = {};
        _this.settings = (0, utils_1.assignDeep)({}, settings_1.DEFAULT_SETTINGS, settings);
        // Validating
        (0, settings_1.validateSettings)(_this.settings);
        (0, utils_1.validateGraph)(graph);
        if (!(container instanceof HTMLElement))
            throw new Error("Sigma: container should be an html element.");
        // Properties
        _this.graph = graph;
        _this.container = container;
        _this.initializeCache();
        // Initializing contexts
        _this.createWebGLContext("edges");
        _this.createWebGLContext("nodes");
        _this.createCanvasContext("edgeLabels");
        _this.createCanvasContext("labels");
        _this.createCanvasContext("hovers");
        _this.createCanvasContext("mouse");
        // Blending
        var gl = _this.webGLContexts.nodes;
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
        gl = _this.webGLContexts.edges;
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.enable(gl.BLEND);
        // Loading programs
        for (var type in _this.settings.nodeProgramClasses) {
            var NodeProgramClass = _this.settings.nodeProgramClasses[type];
            _this.nodePrograms[type] = new NodeProgramClass(_this.webGLContexts.nodes);
        }
        for (var type in _this.settings.edgeProgramClasses) {
            var EdgeProgramClass = _this.settings.edgeProgramClasses[type];
            _this.edgePrograms[type] = new EdgeProgramClass(_this.webGLContexts.edges);
        }
        // Initial resize
        _this.resize();
        // Initializing the camera
        _this.camera = new camera_1.default();
        // Binding camera events
        _this.bindCameraHandlers();
        // Initializing captors
        _this.mouseCaptor = new mouse_1.default(_this.elements.mouse, _this);
        _this.touchCaptor = new touch_1.default(_this.elements.mouse, _this);
        // Binding event handlers
        _this.bindEventHandlers();
        // Binding graph handlers
        _this.bindGraphHandlers();
        // Processing data for the first time & render
        _this.process();
        _this.render();
        return _this;
    }
    /**---------------------------------------------------------------------------
     * Internal methods.
     **---------------------------------------------------------------------------
     */
    /**
     * Internal function used to create a canvas element.
     * @param  {string} id - Context's id.
     * @return {Sigma}
     */
    Sigma.prototype.createCanvas = function (id) {
        var canvas = (0, utils_1.createElement)("canvas", {
            position: "absolute",
        }, {
            class: "sigma-" + id,
        });
        this.elements[id] = canvas;
        this.container.appendChild(canvas);
        return canvas;
    };
    /**
     * Internal function used to create a canvas context and add the relevant
     * DOM elements.
     *
     * @param  {string} id - Context's id.
     * @return {Sigma}
     */
    Sigma.prototype.createCanvasContext = function (id) {
        var canvas = this.createCanvas(id);
        var contextOptions = {
            preserveDrawingBuffer: false,
            antialias: false,
        };
        this.canvasContexts[id] = canvas.getContext("2d", contextOptions);
        return this;
    };
    /**
     * Internal function used to create a canvas context and add the relevant
     * DOM elements.
     *
     * @param  {string} id - Context's id.
     * @return {Sigma}
     */
    Sigma.prototype.createWebGLContext = function (id) {
        var canvas = this.createCanvas(id);
        var contextOptions = {
            preserveDrawingBuffer: false,
            antialias: false,
        };
        var context;
        // First we try webgl2 for an easy performance boost
        context = canvas.getContext("webgl2", contextOptions);
        // Else we fall back to webgl
        if (!context)
            context = canvas.getContext("webgl", contextOptions);
        // Edge, I am looking right at you...
        if (!context)
            context = canvas.getContext("experimental-webgl", contextOptions);
        this.webGLContexts[id] = context;
        return this;
    };
    /**
     * Method used to initialize display data cache.
     *
     * @return {Sigma}
     */
    Sigma.prototype.initializeCache = function () {
        var _this = this;
        var graph = this.graph;
        // NOTE: the data caches are never reset to avoid paying a GC cost
        // But this could prove to be a bad decision. In which case just "reset"
        // them here.
        var i = 0;
        graph.forEachNode(function (key) {
            _this.nodeKeyToIndex[key] = i++;
        });
        i = 0;
        graph.forEachEdge(function (key) {
            _this.edgeKeyToIndex[key] = i++;
        });
    };
    /**
     * Method binding camera handlers.
     *
     * @return {Sigma}
     */
    Sigma.prototype.bindCameraHandlers = function () {
        var _this = this;
        this.activeListeners.camera = function () {
            _this._scheduleRefresh();
        };
        this.camera.on("updated", this.activeListeners.camera);
        return this;
    };
    /**
     * Method binding event handlers.
     *
     * @return {Sigma}
     */
    Sigma.prototype.bindEventHandlers = function () {
        var _this = this;
        // Handling window resize
        this.activeListeners.handleResize = function () {
            _this.needToSoftProcess = true;
            _this._scheduleRefresh();
        };
        window.addEventListener("resize", this.activeListeners.handleResize);
        // Function checking if the mouse is on the given node
        var mouseIsOnNode = function (mouseX, mouseY, nodeX, nodeY, size) {
            return (mouseX > nodeX - size &&
                mouseX < nodeX + size &&
                mouseY > nodeY - size &&
                mouseY < nodeY + size &&
                Math.sqrt(Math.pow(mouseX - nodeX, 2) + Math.pow(mouseY - nodeY, 2)) < size);
        };
        // Function returning the nodes in the mouse's quad
        var getQuadNodes = function (mouseX, mouseY) {
            var mouseGraphPosition = _this.viewportToFramedGraph({ x: mouseX, y: mouseY });
            // TODO: minus 1? lol
            return _this.quadtree.point(mouseGraphPosition.x, 1 - mouseGraphPosition.y);
        };
        // Handling mouse move
        this.activeListeners.handleMove = function (e) {
            // NOTE: for the canvas renderer, testing the pixel's alpha should
            // give some boost but this slows things down for WebGL empirically.
            var quadNodes = getQuadNodes(e.x, e.y);
            // We will hover the node whose center is closest to mouse
            var minDistance = Infinity, nodeToHover = null;
            for (var i = 0, l = quadNodes.length; i < l; i++) {
                var node = quadNodes[i];
                var data = _this.nodeDataCache[node];
                var pos = _this.framedGraphToViewport(data);
                var size = _this.scaleSize(data.size);
                if (mouseIsOnNode(e.x, e.y, pos.x, pos.y, size)) {
                    var distance = Math.sqrt(Math.pow(e.x - pos.x, 2) + Math.pow(e.y - pos.y, 2));
                    // TODO: sort by min size also for cases where center is the same
                    if (distance < minDistance) {
                        minDistance = distance;
                        nodeToHover = node;
                    }
                }
            }
            if (nodeToHover && _this.hoveredNode !== nodeToHover && !_this.nodeDataCache[nodeToHover].hidden) {
                // Handling passing from one node to the other directly
                if (_this.hoveredNode)
                    _this.emit("leaveNode", { node: _this.hoveredNode });
                _this.hoveredNode = nodeToHover;
                _this.emit("enterNode", { node: nodeToHover });
                _this.scheduleHighlightedNodesRender();
                return;
            }
            // Checking if the hovered node is still hovered
            if (_this.hoveredNode) {
                var data = _this.nodeDataCache[_this.hoveredNode];
                var pos = _this.framedGraphToViewport(data);
                var size = _this.scaleSize(data.size);
                if (!mouseIsOnNode(e.x, e.y, pos.x, pos.y, size)) {
                    var node = _this.hoveredNode;
                    _this.hoveredNode = null;
                    _this.emit("leaveNode", { node: node });
                    return _this.scheduleHighlightedNodesRender();
                }
            }
        };
        // Handling click
        var createClickListener = function (eventType) {
            return function (e) {
                var quadNodes = getQuadNodes(e.x, e.y);
                for (var i = 0, l = quadNodes.length; i < l; i++) {
                    var node = quadNodes[i];
                    var data = _this.nodeDataCache[node];
                    var pos = _this.framedGraphToViewport(data);
                    var size = _this.scaleSize(data.size);
                    if (mouseIsOnNode(e.x, e.y, pos.x, pos.y, size))
                        return _this.emit(eventType + "Node", { node: node, captor: e, event: e });
                }
                return _this.emit(eventType + "Stage", { event: e });
            };
        };
        this.activeListeners.handleClick = createClickListener("click");
        this.activeListeners.handleRightClick = createClickListener("rightClick");
        this.activeListeners.handleDown = createClickListener("down");
        this.mouseCaptor.on("mousemove", this.activeListeners.handleMove);
        this.mouseCaptor.on("click", this.activeListeners.handleClick);
        this.mouseCaptor.on("rightClick", this.activeListeners.handleRightClick);
        this.mouseCaptor.on("mousedown", this.activeListeners.handleDown);
        // TODO
        // Deal with Touch captor events
        return this;
    };
    /**
     * Method binding graph handlers
     *
     * @return {Sigma}
     */
    Sigma.prototype.bindGraphHandlers = function () {
        var _this = this;
        var graph = this.graph;
        this.activeListeners.graphUpdate = function () {
            _this.needToProcess = true;
            _this._scheduleRefresh();
        };
        this.activeListeners.softGraphUpdate = function () {
            _this.needToSoftProcess = true;
            _this._scheduleRefresh();
        };
        this.activeListeners.addNodeGraphUpdate = function (e) {
            // Adding entry to cache
            _this.nodeKeyToIndex[e.key] = graph.order - 1;
            _this.activeListeners.graphUpdate();
        };
        this.activeListeners.addEdgeGraphUpdate = function (e) {
            // Adding entry to cache
            _this.nodeKeyToIndex[e.key] = graph.order - 1;
            _this.activeListeners.graphUpdate();
        };
        // TODO: clean cache on drop!
        // TODO: bind this on composed state events
        // TODO: it could be possible to update only specific node etc. by holding
        // a fixed-size pool of updated items
        graph.on("nodeAdded", this.activeListeners.addNodeGraphUpdate);
        graph.on("nodeDropped", this.activeListeners.graphUpdate);
        graph.on("nodeAttributesUpdated", this.activeListeners.softGraphUpdate);
        graph.on("eachNodeAttributesUpdated", this.activeListeners.graphUpdate);
        graph.on("edgeAdded", this.activeListeners.addEdgeGraphUpdate);
        graph.on("edgeDropped", this.activeListeners.graphUpdate);
        graph.on("edgeAttributesUpdated", this.activeListeners.softGraphUpdate);
        graph.on("eachEdgeAttributesUpdated", this.activeListeners.graphUpdate);
        graph.on("edgesCleared", this.activeListeners.graphUpdate);
        graph.on("cleared", this.activeListeners.graphUpdate);
        return this;
    };
    /**
     * Method used to process the whole graph's data.
     *
     * @return {Sigma}
     */
    Sigma.prototype.process = function (keepArrays) {
        var _this = this;
        if (keepArrays === void 0) { keepArrays = false; }
        var graph = this.graph;
        var settings = this.settings;
        var dimensions = this.getDimensions();
        var nodeZExtent = [Infinity, -Infinity];
        var edgeZExtent = [Infinity, -Infinity];
        // Clearing the quad
        this.quadtree.clear();
        // Resetting the label grid
        // TODO: it's probably better to do this explicitly or on resizes for layout and anims
        this.labelGrid.resizeAndClear(dimensions, settings.labelGridCellSize);
        // Clear the highlightedNodes
        this.highlightedNodes = new Set();
        // Computing extents
        var nodeExtentProperties = ["x", "y"];
        this.nodeExtent = nodeExtent(graph, nodeExtentProperties);
        // NOTE: it is important to compute this matrix after computing the node's extent
        // because #.getGraphDimensions relies on it
        var nullCamera = new camera_1.default();
        var nullCameraMatrix = (0, utils_1.matrixFromCamera)(nullCamera.getState(), this.getDimensions(), this.getGraphDimensions(), this.getSetting("stagePadding") || 0);
        // Rescaling function
        this.normalizationFunction = (0, utils_1.createNormalizationFunction)(this.customBBox || this.nodeExtent);
        var nodesPerPrograms = {};
        var nodes = graph.nodes();
        for (var i = 0, l = nodes.length; i < l; i++) {
            var node = nodes[i];
            // Node display data resolution:
            //   1. First we get the node's attributes
            //   2. We optionally reduce them using the function provided by the user
            //      Note that this function must return a total object and won't be merged
            //   3. We apply our defaults, while running some vital checks
            //   4. We apply the normalization function
            // We shallow copy node data to avoid dangerous behaviors from reducers
            var attr = Object.assign({}, graph.getNodeAttributes(node));
            if (settings.nodeReducer)
                attr = settings.nodeReducer(node, attr);
            var data = applyNodeDefaults(this.settings, node, attr);
            nodesPerPrograms[data.type] = (nodesPerPrograms[data.type] || 0) + 1;
            this.nodeDataCache[node] = data;
            this.normalizationFunction.applyTo(data);
            if (this.settings.zIndex) {
                if (data.zIndex < nodeZExtent[0])
                    nodeZExtent[0] = data.zIndex;
                if (data.zIndex > nodeZExtent[1])
                    nodeZExtent[1] = data.zIndex;
            }
        }
        for (var type in nodesPerPrograms) {
            if (!this.nodePrograms.hasOwnProperty(type)) {
                throw new Error("Sigma: could not find a suitable program for node type \"" + type + "\"!");
            }
            if (!keepArrays)
                this.nodePrograms[type].allocate(nodesPerPrograms[type]);
            // We reset that count here, so that we can reuse it while calling the Program#process methods:
            nodesPerPrograms[type] = 0;
        }
        // Handling node z-index
        // TODO: z-index needs us to compute display data before hand
        if (this.settings.zIndex && nodeZExtent[0] !== nodeZExtent[1])
            nodes = (0, utils_1.zIndexOrdering)(nodeZExtent, function (node) { return _this.nodeDataCache[node].zIndex; }, nodes);
        for (var i = 0, l = nodes.length; i < l; i++) {
            var node = nodes[i];
            var data = this.nodeDataCache[node];
            this.quadtree.add(node, data.x, 1 - data.y, data.size / this.width);
            if (data.label)
                this.labelGrid.add(node, data.size, this.framedGraphToViewport(data, { matrix: nullCameraMatrix }));
            this.nodePrograms[data.type].process(data, data.hidden, nodesPerPrograms[data.type]++);
            // Save the node in the highlighted set if needed
            if (data.highlighted && !data.hidden)
                this.highlightedNodes.add(node);
            this.nodeKeyToIndex[node] = i;
        }
        this.labelGrid.organize();
        var edgesPerPrograms = {};
        var edges = graph.edges();
        for (var i = 0, l = edges.length; i < l; i++) {
            var edge = edges[i];
            // Edge display data resolution:
            //   1. First we get the edge's attributes
            //   2. We optionally reduce them using the function provided by the user
            //      Note that this function must return a total object and won't be merged
            //   3. We apply our defaults, while running some vital checks
            // We shallow copy edge data to avoid dangerous behaviors from reducers
            var attr = Object.assign({}, graph.getEdgeAttributes(edge));
            if (settings.edgeReducer)
                attr = settings.edgeReducer(edge, attr);
            var data = applyEdgeDefaults(this.settings, edge, attr);
            edgesPerPrograms[data.type] = (edgesPerPrograms[data.type] || 0) + 1;
            this.edgeDataCache[edge] = data;
            if (this.settings.zIndex) {
                if (data.zIndex < edgeZExtent[0])
                    edgeZExtent[0] = data.zIndex;
                if (data.zIndex > edgeZExtent[1])
                    edgeZExtent[1] = data.zIndex;
            }
        }
        for (var type in edgesPerPrograms) {
            if (!this.edgePrograms.hasOwnProperty(type)) {
                throw new Error("Sigma: could not find a suitable program for edge type \"" + type + "\"!");
            }
            if (!keepArrays)
                this.edgePrograms[type].allocate(edgesPerPrograms[type]);
            // We reset that count here, so that we can reuse it while calling the Program#process methods:
            edgesPerPrograms[type] = 0;
        }
        // Handling edge z-index
        if (this.settings.zIndex && edgeZExtent[0] !== edgeZExtent[1])
            edges = (0, utils_1.zIndexOrdering)(edgeZExtent, function (edge) { return _this.edgeDataCache[edge].zIndex; }, edges);
        for (var i = 0, l = edges.length; i < l; i++) {
            var edge = edges[i];
            var data = this.edgeDataCache[edge];
            var extremities = graph.extremities(edge), sourceData = this.nodeDataCache[extremities[0]], targetData = this.nodeDataCache[extremities[1]];
            var hidden = data.hidden || sourceData.hidden || targetData.hidden;
            this.edgePrograms[data.type].process(sourceData, targetData, data, hidden, edgesPerPrograms[data.type]++);
            this.nodeKeyToIndex[edge] = i;
        }
        for (var type in this.edgePrograms) {
            var program = this.edgePrograms[type];
            if (!keepArrays && typeof program.computeIndices === "function")
                program.computeIndices();
        }
        return this;
    };
    /**
     * Method that decides whether to reprocess graph or not, and then render the
     * graph.
     *
     * @return {Sigma}
     */
    Sigma.prototype._refresh = function () {
        // Do we need to process data?
        if (this.needToProcess) {
            this.process();
        }
        else if (this.needToSoftProcess) {
            this.process(true);
        }
        // Resetting state
        this.needToProcess = false;
        this.needToSoftProcess = false;
        // Rendering
        this.render();
        return this;
    };
    /**
     * Method that schedules a `_refresh` call if none has been scheduled yet. It
     * will then be processed next available frame.
     *
     * @return {Sigma}
     */
    Sigma.prototype._scheduleRefresh = function () {
        var _this = this;
        if (!this.renderFrame) {
            this.renderFrame = (0, utils_1.requestFrame)(function () {
                _this._refresh();
                _this.renderFrame = null;
            });
        }
        return this;
    };
    /**
     * Method used to render labels.
     *
     * @return {Sigma}
     */
    Sigma.prototype.renderLabels = function () {
        if (!this.settings.renderLabels)
            return this;
        var cameraState = this.camera.getState();
        // this.labelGrid.draw(this.canvasContexts.labels, this.camera);
        // Finding visible nodes to display their labels
        var visibleNodes;
        if (cameraState.ratio >= 1) {
            // Camera is unzoomed so no need to ask the quadtree for visible nodes
            visibleNodes = new Set(this.graph.nodes());
        }
        else {
            // Let's ask the quadtree
            var viewRectangle = this.viewRectangle();
            visibleNodes = new Set(this.quadtree.rectangle(viewRectangle.x1, 1 - viewRectangle.y1, viewRectangle.x2, 1 - viewRectangle.y2, viewRectangle.height));
        }
        // Selecting labels to draw
        // TODO: drop gridsettings likewise
        // TODO: optimize through visible nodes
        var labelsToDisplay = this.labelGrid.getLabelsToDisplay(cameraState.ratio, this.settings.labelDensity);
        this.displayedLabels = new Set();
        // Drawing labels
        var context = this.canvasContexts.labels;
        for (var i = 0, l = labelsToDisplay.length; i < l; i++) {
            var node = labelsToDisplay[i];
            var data = this.nodeDataCache[node];
            // If the node is hidden, we don't need to display its label obviously
            if (data.hidden)
                continue;
            var _a = this.framedGraphToViewport(data), x = _a.x, y = _a.y;
            // TODO: we can cache the labels we need to render until the camera's ratio changes
            // TODO: this should be computed in the canvas components?
            var size = this.scaleSize(data.size);
            if (size < this.settings.labelRenderedSizeThreshold)
                continue;
            if (!visibleNodes.has(node))
                continue;
            // TODO:
            // Because displayed edge labels depend directly on actually rendered node
            // labels, we need to only add to this.displayedLabels nodes whose label
            // is rendered.
            // This makes this.displayedLabels depend on viewport, which might become
            // an issue once we start memoizing getLabelsToDisplay.
            this.displayedLabels.add(node);
            this.settings.labelRenderer(context, {
                key: node,
                label: data.label,
                color: "#000",
                size: size,
                x: x,
                y: y,
            }, this.settings);
        }
        return this;
    };
    /**
     * Method used to render edge labels, based on which node labels were
     * rendered.
     *
     * @return {Sigma}
     */
    Sigma.prototype.renderEdgeLabels = function () {
        if (!this.settings.renderEdgeLabels)
            return this;
        var context = this.canvasContexts.edgeLabels;
        // Clearing
        context.clearRect(0, 0, this.width, this.height);
        var edgeLabelsToDisplay = (0, labels_1.edgeLabelsToDisplayFromNodes)({
            graph: this.graph,
            hoveredNode: this.hoveredNode,
            displayedNodeLabels: this.displayedLabels,
            highlightedNodes: this.highlightedNodes,
        });
        for (var i = 0, l = edgeLabelsToDisplay.length; i < l; i++) {
            var edge = edgeLabelsToDisplay[i], extremities = this.graph.extremities(edge), sourceData = this.nodeDataCache[extremities[0]], targetData = this.nodeDataCache[extremities[1]], edgeData = this.edgeDataCache[edgeLabelsToDisplay[i]];
            // If the edge is hidden we don't need to display its label
            // NOTE: the test on sourceData & targetData is probably paranoid at this point?
            if (edgeData.hidden || sourceData.hidden || targetData.hidden) {
                continue;
            }
            var _a = this.framedGraphToViewport(sourceData), sourceX = _a.x, sourceY = _a.y;
            var _b = this.framedGraphToViewport(targetData), targetX = _b.x, targetY = _b.y;
            // TODO: we can cache the labels we need to render until the camera's ratio changes
            // TODO: this should be computed in the canvas components?
            var size = this.scaleSize(edgeData.size);
            this.settings.edgeLabelRenderer(context, {
                key: edge,
                label: edgeData.label,
                color: edgeData.color,
                size: size,
            }, {
                key: extremities[0],
                x: sourceX,
                y: sourceY,
            }, {
                key: extremities[1],
                x: targetX,
                y: targetY,
            }, this.settings);
        }
        return this;
    };
    /**
     * Method used to render the highlighted nodes.
     *
     * @return {Sigma}
     */
    Sigma.prototype.renderHighlightedNodes = function () {
        var _this = this;
        var context = this.canvasContexts.hovers;
        // Clearing
        context.clearRect(0, 0, this.width, this.height);
        // Rendering
        var render = function (node) {
            var data = _this.nodeDataCache[node];
            var _a = _this.framedGraphToViewport(data), x = _a.x, y = _a.y;
            var size = _this.scaleSize(data.size);
            _this.settings.hoverRenderer(context, {
                key: node,
                label: data.label,
                color: data.color,
                size: size,
                x: x,
                y: y,
            }, _this.settings);
        };
        if (this.hoveredNode && !this.nodeDataCache[this.hoveredNode].hidden) {
            render(this.hoveredNode);
        }
        this.highlightedNodes.forEach(function (node) {
            // The hovered node has already been highlighted
            if (node === _this.hoveredNode)
                return;
            render(node);
        });
    };
    /**
     * Method used to schedule a hover render.
     *
     */
    Sigma.prototype.scheduleHighlightedNodesRender = function () {
        var _this = this;
        if (this.renderHighlightedNodesFrame || this.renderFrame)
            return;
        this.renderHighlightedNodesFrame = (0, utils_1.requestFrame)(function () {
            // Resetting state
            _this.renderHighlightedNodesFrame = null;
            // Rendering
            _this.renderHighlightedNodes();
            _this.renderEdgeLabels();
        });
    };
    /**
     * Method used to render.
     *
     * @return {Sigma}
     */
    Sigma.prototype.render = function () {
        // If a render was scheduled, we cancel it
        if (this.renderFrame) {
            (0, utils_1.cancelFrame)(this.renderFrame);
            this.renderFrame = null;
            this.needToProcess = false;
            this.needToSoftProcess = false;
        }
        // First we need to resize
        this.resize();
        // Clearing the canvases
        this.clear();
        // Recomputing useful camera-related values:
        this.updateCachedValues();
        // If we have no nodes we can stop right there
        if (!this.graph.order)
            return this;
        // TODO: improve this heuristic or move to the captor itself?
        // TODO: deal with the touch captor here as well
        var mouseCaptor = this.mouseCaptor;
        var moving = this.camera.isAnimated() ||
            mouseCaptor.isMoving ||
            mouseCaptor.draggedEvents ||
            mouseCaptor.currentWheelDirection;
        // Then we need to extract a matrix from the camera
        var cameraState = this.camera.getState();
        var viewportDimensions = this.getDimensions();
        var graphDimensions = this.getGraphDimensions();
        var padding = this.getSetting("stagePadding") || 0;
        this.matrix = (0, utils_1.matrixFromCamera)(cameraState, viewportDimensions, graphDimensions, padding);
        this.invMatrix = (0, utils_1.matrixFromCamera)(cameraState, viewportDimensions, graphDimensions, padding, true);
        // Drawing nodes
        for (var type in this.nodePrograms) {
            var program = this.nodePrograms[type];
            program.bind();
            program.bufferData();
            program.render({
                matrix: this.matrix,
                width: this.width,
                height: this.height,
                ratio: cameraState.ratio,
                nodesPowRatio: 0.5,
                scalingRatio: WEBGL_OVERSAMPLING_RATIO,
            });
        }
        // Drawing edges
        if (!this.settings.hideEdgesOnMove || !moving) {
            for (var type in this.edgePrograms) {
                var program = this.edgePrograms[type];
                program.bind();
                program.bufferData();
                program.render({
                    matrix: this.matrix,
                    width: this.width,
                    height: this.height,
                    ratio: cameraState.ratio,
                    edgesPowRatio: 0.5,
                    scalingRatio: WEBGL_OVERSAMPLING_RATIO,
                });
            }
        }
        // Do not display labels on move per setting
        if (this.settings.hideLabelsOnMove && moving)
            return this;
        this.renderLabels();
        this.renderEdgeLabels();
        this.renderHighlightedNodes();
        return this;
    };
    /**
     * Internal method used to update expensive and therefore cached values
     * each time the camera state is updated.
     */
    Sigma.prototype.updateCachedValues = function () {
        var ratio = this.camera.getState().ratio;
        this.cameraSizeRatio = Math.pow(ratio, SIZE_SCALING_EXPONENT);
    };
    /**---------------------------------------------------------------------------
     * Public API.
     **---------------------------------------------------------------------------
     */
    /**
     * Method returning the renderer's camera.
     *
     * @return {Camera}
     */
    Sigma.prototype.getCamera = function () {
        return this.camera;
    };
    /**
     * Method returning the renderer's graph.
     *
     * @return {Graph}
     */
    Sigma.prototype.getGraph = function () {
        return this.graph;
    };
    /**
     * Method returning the mouse captor.
     *
     * @return {MouseCaptor}
     */
    Sigma.prototype.getMouseCaptor = function () {
        return this.mouseCaptor;
    };
    /**
     * Method returning the touch captor.
     *
     * @return {TouchCaptor}
     */
    Sigma.prototype.getTouchCaptor = function () {
        return this.touchCaptor;
    };
    /**
     * Method returning the current renderer's dimensions.
     *
     * @return {Dimensions}
     */
    Sigma.prototype.getDimensions = function () {
        return { width: this.width, height: this.height };
    };
    /**
     * Method returning the current graph's dimensions.
     *
     * @return {Dimensions}
     */
    Sigma.prototype.getGraphDimensions = function () {
        var extent = this.customBBox || this.nodeExtent;
        return {
            width: extent.x[1] - extent.x[0] || 1,
            height: extent.y[1] - extent.y[0] || 1,
        };
    };
    /**
     * Method used to get all the sigma node attributes.
     * It's usefull for example to get the position of a node
     * and to get values that are set by the nodeReducer
     *
     * @param  {string} key - The node's key.
     * @return {NodeDisplayData | undefined} A copy of the desired node's attribute or undefined if not found
     */
    Sigma.prototype.getNodeDisplayData = function (key) {
        var node = this.nodeDataCache[key];
        return node ? Object.assign({}, node) : undefined;
    };
    /**
     * Method used to get all the sigma edge attributes.
     * It's usefull for example to get values that are set by the edgeReducer.
     *
     * @param  {string} key - The edge's key.
     * @return {EdgeDisplayData | undefined} A copy of the desired edge's attribute or undefined if not found
     */
    Sigma.prototype.getEdgeDisplayData = function (key) {
        var edge = this.edgeDataCache[key];
        return edge ? Object.assign({}, edge) : undefined;
    };
    /**
     * Method returning the current value for a given setting key.
     *
     * @param  {string} key - The setting key to get.
     * @return {any} The value attached to this setting key or undefined if not found
     */
    Sigma.prototype.getSetting = function (key) {
        return this.settings[key];
    };
    /**
     * Method setting the value of a given setting key. Note that this will schedule
     * a new render next frame.
     *
     * @param  {string} key - The setting key to set.
     * @param  {any}    value - The value to set.
     * @return {Sigma}
     */
    Sigma.prototype.setSetting = function (key, value) {
        this.settings[key] = value;
        (0, settings_1.validateSettings)(this.settings);
        this.needToProcess = true; // TODO: some keys may work with only needToSoftProcess or even nothing
        this._scheduleRefresh();
        return this;
    };
    /**
     * Method updating the value of a given setting key using the provided function.
     * Note that this will schedule a new render next frame.
     *
     * @param  {string}   key     - The setting key to set.
     * @param  {function} updater - The update function.
     * @return {Sigma}
     */
    Sigma.prototype.updateSetting = function (key, updater) {
        this.settings[key] = updater(this.settings[key]);
        (0, settings_1.validateSettings)(this.settings);
        this.needToProcess = true; // TODO: some keys may work with only needToSoftProcess or even nothing
        this._scheduleRefresh();
        return this;
    };
    /**
     * Method used to resize the renderer.
     *
     * @return {Sigma}
     */
    Sigma.prototype.resize = function () {
        var previousWidth = this.width, previousHeight = this.height;
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        if (this.width === 0)
            throw new Error("Sigma: container has no width.");
        if (this.height === 0)
            throw new Error("Sigma: container has no height.");
        // If nothing has changed, we can stop right here
        if (previousWidth === this.width && previousHeight === this.height)
            return this;
        // Sizing dom elements
        for (var id in this.elements) {
            var element = this.elements[id];
            element.style.width = this.width + "px";
            element.style.height = this.height + "px";
        }
        // Sizing canvas contexts
        for (var id in this.canvasContexts) {
            this.elements[id].setAttribute("width", this.width * PIXEL_RATIO + "px");
            this.elements[id].setAttribute("height", this.height * PIXEL_RATIO + "px");
            if (PIXEL_RATIO !== 1)
                this.canvasContexts[id].scale(PIXEL_RATIO, PIXEL_RATIO);
        }
        // Sizing WebGL contexts
        for (var id in this.webGLContexts) {
            this.elements[id].setAttribute("width", this.width * WEBGL_OVERSAMPLING_RATIO + "px");
            this.elements[id].setAttribute("height", this.height * WEBGL_OVERSAMPLING_RATIO + "px");
            this.webGLContexts[id].viewport(0, 0, this.width * WEBGL_OVERSAMPLING_RATIO, this.height * WEBGL_OVERSAMPLING_RATIO);
        }
        return this;
    };
    /**
     * Method used to clear all the canvases.
     *
     * @return {Sigma}
     */
    Sigma.prototype.clear = function () {
        this.webGLContexts.nodes.clear(this.webGLContexts.nodes.COLOR_BUFFER_BIT);
        this.webGLContexts.edges.clear(this.webGLContexts.edges.COLOR_BUFFER_BIT);
        this.canvasContexts.labels.clearRect(0, 0, this.width, this.height);
        this.canvasContexts.hovers.clearRect(0, 0, this.width, this.height);
        this.canvasContexts.edgeLabels.clearRect(0, 0, this.width, this.height);
        return this;
    };
    /**
     * Method used to refresh all computed data.
     *
     * @return {Sigma}
     */
    Sigma.prototype.refresh = function () {
        this.needToProcess = true;
        this._refresh();
        return this;
    };
    /**
     * Method used to refresh all computed data, at the next available frame.
     * If this method has already been called this frame, then it will only render once at the next available frame.
     *
     * @return {Sigma}
     */
    Sigma.prototype.scheduleRefresh = function () {
        this.needToProcess = true;
        this._scheduleRefresh();
        return this;
    };
    /**
     * Method used to (un)zoom, while preserving the position of a viewport point.
     * Used for instance to zoom "on the mouse cursor".
     *
     * @param viewportTarget
     * @param newRatio
     * @return {CameraState}
     */
    Sigma.prototype.getViewportZoomedState = function (viewportTarget, newRatio) {
        var _a = this.camera.getState(), ratio = _a.ratio, angle = _a.angle, x = _a.x, y = _a.y;
        // TODO: handle max zoom
        var ratioDiff = newRatio / ratio;
        var center = {
            x: this.width / 2,
            y: this.height / 2,
        };
        var graphMousePosition = this.viewportToFramedGraph(viewportTarget);
        var graphCenterPosition = this.viewportToFramedGraph(center);
        return {
            angle: angle,
            x: (graphMousePosition.x - graphCenterPosition.x) * (1 - ratioDiff) + x,
            y: (graphMousePosition.y - graphCenterPosition.y) * (1 - ratioDiff) + y,
            ratio: newRatio,
        };
    };
    /**
     * Method returning the abstract rectangle containing the graph according
     * to the camera's state.
     *
     * @return {object} - The view's rectangle.
     */
    Sigma.prototype.viewRectangle = function () {
        // TODO: reduce relative margin?
        var marginX = (0 * this.width) / 8, marginY = (0 * this.height) / 8;
        var p1 = this.viewportToFramedGraph({ x: 0 - marginX, y: 0 - marginY }), p2 = this.viewportToFramedGraph({ x: this.width + marginX, y: 0 - marginY }), h = this.viewportToFramedGraph({ x: 0, y: this.height + marginY });
        return {
            x1: p1.x,
            y1: p1.y,
            x2: p2.x,
            y2: p2.y,
            height: p2.y - h.y,
        };
    };
    /**
     * Method returning the coordinates of a point from the framed graph system to the viewport system. It allows
     * overriding anything that is used to get the translation matrix, or even the matrix itself.
     *
     * Be careful if overriding dimensions, padding or cameraState, as the computation of the matrix is not the lightest
     * of computations.
     */
    Sigma.prototype.framedGraphToViewport = function (coordinates, override) {
        if (override === void 0) { override = {}; }
        var recomputeMatrix = !!override.cameraState || !!override.viewportDimensions || !override.graphDimensions;
        var matrix = override.matrix
            ? override.matrix
            : recomputeMatrix
                ? (0, utils_1.matrixFromCamera)(override.cameraState || this.camera.getState(), override.viewportDimensions || this.getDimensions(), override.graphDimensions || this.getGraphDimensions(), override.padding || this.getSetting("stagePadding") || 0)
                : this.matrix;
        var framedGraphVec = [coordinates.x, coordinates.y, 1];
        var viewportVec = (0, matrices_1.multiplyVec)(matrix, framedGraphVec);
        return {
            x: ((1 + viewportVec[0]) * this.width) / 2,
            y: ((1 - viewportVec[1]) * this.height) / 2,
        };
    };
    /**
     * Method returning the coordinates of a point from the viewport system to the framed graph system. It allows
     * overriding anything that is used to get the translation matrix, or even the matrix itself.
     *
     * Be careful if overriding dimensions, padding or cameraState, as the computation of the matrix is not the lightest
     * of computations.
     */
    Sigma.prototype.viewportToFramedGraph = function (coordinates, override) {
        if (override === void 0) { override = {}; }
        var recomputeMatrix = !!override.cameraState || !!override.viewportDimensions || !override.graphDimensions;
        var invMatrix = override.matrix
            ? override.matrix
            : recomputeMatrix
                ? (0, utils_1.matrixFromCamera)(override.cameraState || this.camera.getState(), override.viewportDimensions || this.getDimensions(), override.graphDimensions || this.getGraphDimensions(), override.padding || this.getSetting("stagePadding") || 0, true)
                : this.invMatrix;
        var viewportVec = [(coordinates.x / this.width) * 2 - 1, 1 - (coordinates.y / this.height) * 2, 1];
        var framedGraphVec = (0, matrices_1.multiplyVec)(invMatrix, viewportVec);
        return {
            x: framedGraphVec[0],
            y: framedGraphVec[1],
        };
    };
    /**
     * Method used to translate a point's coordinates from the viewport system (pixel distance from the top-left of the
     * stage) to the graph system (the reference system of data as they are in the given graph instance).
     *
     * This method accepts an optional camera which can be useful if you need to translate coordinates
     * based on a different view than the one being currently being displayed on screen.
     *
     * @param {Coordinates} viewportPoint
     */
    Sigma.prototype.viewportToGraph = function (viewportPoint) {
        return this.normalizationFunction.inverse(this.viewportToFramedGraph(viewportPoint));
    };
    /**
     * Method used to translate a point's coordinates from the graph system (the reference system of data as they are in
     * the given graph instance) to the viewport system (pixel distance from the top-left of the stage).
     *
     * This method accepts an optional camera which can be useful if you need to translate coordinates
     * based on a different view than the one being currently being displayed on screen.
     *
     * @param {Coordinates} graphPoint
     */
    Sigma.prototype.graphToViewport = function (graphPoint) {
        return this.framedGraphToViewport(this.normalizationFunction(graphPoint));
    };
    /**
     * Method returning the graph's bounding box.
     *
     * @return {{ x: Extent, y: Extent }}
     */
    Sigma.prototype.getBBox = function () {
        return nodeExtent(this.graph, ["x", "y"]);
    };
    /**
     * Method returning the graph's custom bounding box, if any.
     *
     * @return {{ x: Extent, y: Extent } | null}
     */
    Sigma.prototype.getCustomBBox = function () {
        return this.customBBox;
    };
    /**
     * Method used to override the graph's bounding box with a custom one. Give `null` as the argument to stop overriding.
     *
     * @return {Sigma}
     */
    Sigma.prototype.setCustomBBox = function (customBBox) {
        this.customBBox = customBBox;
        this._scheduleRefresh();
        return this;
    };
    /**
     * Method used to shut the container & release event listeners.
     *
     * @return {undefined}
     */
    Sigma.prototype.kill = function () {
        var graph = this.graph;
        // Emitting "kill" events so that plugins and such can cleanup
        this.emit("kill");
        // Releasing events
        this.removeAllListeners();
        // Releasing camera handlers
        this.camera.removeListener("updated", this.activeListeners.camera);
        // Releasing DOM events & captors
        window.removeEventListener("resize", this.activeListeners.handleResize);
        this.mouseCaptor.kill();
        this.touchCaptor.kill();
        // Releasing graph handlers
        graph.removeListener("nodeAdded", this.activeListeners.addNodeGraphUpdate);
        graph.removeListener("nodeDropped", this.activeListeners.graphUpdate);
        graph.removeListener("nodeAttributesUpdated", this.activeListeners.softGraphUpdate);
        graph.removeListener("eachNodeAttributesUpdated", this.activeListeners.graphUpdate);
        graph.removeListener("edgeAdded", this.activeListeners.addEdgeGraphUpdate);
        graph.removeListener("edgeDropped", this.activeListeners.graphUpdate);
        graph.removeListener("edgeAttributesUpdated", this.activeListeners.softGraphUpdate);
        graph.removeListener("eachEdgeAttributesUpdated", this.activeListeners.graphUpdate);
        graph.removeListener("edgesCleared", this.activeListeners.graphUpdate);
        graph.removeListener("cleared", this.activeListeners.graphUpdate);
        // Releasing cache & state
        this.quadtree = new quadtree_1.default();
        this.nodeDataCache = {};
        this.edgeDataCache = {};
        this.highlightedNodes.clear();
        // Clearing frames
        if (this.renderFrame) {
            (0, utils_1.cancelFrame)(this.renderFrame);
            this.renderFrame = null;
        }
        if (this.renderHighlightedNodesFrame) {
            (0, utils_1.cancelFrame)(this.renderHighlightedNodesFrame);
            this.renderHighlightedNodesFrame = null;
        }
        // Destroying canvases
        var container = this.container;
        while (container.firstChild)
            container.removeChild(container.firstChild);
    };
    /**
     * Method used to scale the given size according to the camera's ratio, i.e.
     * zooming state.
     *
     * @param  {number} size - The size to scale (node size, edge thickness etc.).
     * @return {number}      - The scaled size.
     */
    Sigma.prototype.scaleSize = function (size) {
        return size / this.cameraSizeRatio;
    };
    return Sigma;
}(events_1.EventEmitter));
exports.default = Sigma;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Graphology Extent
 * ==================
 *
 * Simple function returning the extent of selected attributes of the graph.
 */
var isGraph = __webpack_require__(36);

/**
 * Function returning the extent of the selected node attributes.
 *
 * @param  {Graph}        graph     - Target graph.
 * @param  {string|array} attribute - Single or multiple attributes.
 * @return {array|object}
 */
function nodeExtent(graph, attribute) {
  if (!isGraph(graph))
    throw new Error('graphology-metrics/extent: the given graph is not a valid graphology instance.');

  var attributes = [].concat(attribute);

  var value,
      key,
      a;

  var results = {};

  for (a = 0; a < attributes.length; a++) {
    key = attributes[a];

    results[key] = [Infinity, -Infinity];
  }

  graph.forEachNode(function(node, data) {
    for (a = 0; a < attributes.length; a++) {
      key = attributes[a];
      value = data[key];

      if (value < results[key][0])
        results[key][0] = value;

      if (value > results[key][1])
        results[key][1] = value;
    }
  });

  return typeof attribute === 'string' ? results[attribute] : results;
}

/**
 * Function returning the extent of the selected edge attributes.
 *
 * @param  {Graph}        graph     - Target graph.
 * @param  {string|array} attribute - Single or multiple attributes.
 * @return {array|object}
 */
function edgeExtent(graph, attribute) {
  if (!isGraph(graph))
    throw new Error('graphology-metrics/extent: the given graph is not a valid graphology instance.');

  var attributes = [].concat(attribute);

  var value,
      key,
      a;

  var results = {};

  for (a = 0; a < attributes.length; a++) {
    key = attributes[a];

    results[key] = [Infinity, -Infinity];
  }

  graph.forEachEdge(function(edge, data) {
    for (a = 0; a < attributes.length; a++) {
      key = attributes[a];
      value = data[key];

      if (value < results[key][0])
        results[key][0] = value;

      if (value > results[key][1])
        results[key][1] = value;
    }
  });

  return typeof attribute === 'string' ? results[attribute] : results;
}

/**
 * Exporting.
 */
var extent = nodeExtent;
extent.nodeExtent = nodeExtent;
extent.edgeExtent = edgeExtent;

module.exports = extent;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.animateNodes = exports.ANIMATE_DEFAULTS = void 0;
var index_1 = __webpack_require__(1);
var easings_1 = __importDefault(__webpack_require__(42));
exports.ANIMATE_DEFAULTS = {
    easing: "quadraticInOut",
    duration: 150,
};
/**
 * Function used to animate the nodes.
 */
function animateNodes(graph, targets, opts, callback) {
    var options = Object.assign({}, exports.ANIMATE_DEFAULTS, opts);
    var easing = typeof options.easing === "function" ? options.easing : easings_1.default[options.easing];
    var start = Date.now();
    var startPositions = {};
    for (var node in targets) {
        var attrs = targets[node];
        startPositions[node] = {};
        for (var k in attrs)
            startPositions[node][k] = graph.getNodeAttribute(node, k);
    }
    var frame = null;
    var step = function () {
        var p = (Date.now() - start) / options.duration;
        if (p >= 1) {
            // Animation is done
            for (var node in targets) {
                var attrs = targets[node];
                for (var k in attrs)
                    graph.setNodeAttribute(node, k, attrs[k]);
            }
            if (typeof callback === "function")
                callback();
            return;
        }
        p = easing(p);
        for (var node in targets) {
            var attrs = targets[node];
            var s = startPositions[node];
            for (var k in attrs)
                graph.setNodeAttribute(node, k, attrs[k] * p + s[k] * (1 - p));
        }
        frame = (0, index_1.requestFrame)(step);
    };
    step();
    return function () {
        if (frame)
            (0, index_1.cancelFrame)(frame);
    };
}
exports.animateNodes = animateNodes;


/***/ }),
/* 140 */
/***/ (function(module, exports) {

/**
 * Graphology isGraph
 * ===================
 *
 * Very simple function aiming at ensuring the given variable is a
 * graphology instance.
 */

/**
 * Checking the value is a graphology instance.
 *
 * @param  {any}     value - Target value.
 * @return {boolean}
 */
module.exports = function isGraph(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.addUndirectedEdgeWithKey === 'function' &&
    typeof value.dropNode === 'function' &&
    typeof value.multi === 'boolean'
  );
};


/***/ }),
/* 141 */
/***/ (function(module, exports) {

/**
 * Extend function
 * ================
 *
 * Function used to push a bunch of values into an array at once.
 *
 * Its strategy is to mutate target array's length then setting the new indices
 * to be the values to add.
 *
 * A benchmark proved that it is faster than the following strategies:
 *   1) `array.push.apply(array, values)`.
 *   2) A loop of pushes.
 *   3) `array = array.concat(values)`, obviously.
 *
 * Intuitively, this is correct because when adding a lot of elements, the
 * chosen strategies does not need to handle the `arguments` object to
 * execute #.apply's variadicity and because the array know its final length
 * at the beginning, avoiding potential multiple reallocations of the underlying
 * contiguous array. Some engines may be able to optimize the loop of push
 * operations but empirically they don't seem to do so.
 */

/**
 * Extends the target array with the given values.
 *
 * @param  {array} array  - Target array.
 * @param  {array} values - Values to add.
 */
module.exports = function extend(array, values) {
  var l2 = values.length;

  if (l2 === 0)
    return;

  var l1 = array.length;

  array.length += l2;

  for (var i = 0; i < l2; i++)
    array[l1 + i] = values[i];
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.edgeLabelsToDisplayFromNodes = exports.LabelGrid = exports.axisAlignedRectangularCollision = void 0;
// TODO: full jsdocs
/**
 * Helpers.
 */
function axisAlignedRectangularCollision(x1, y1, w1, h1, x2, y2, w2, h2) {
    return x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2;
}
exports.axisAlignedRectangularCollision = axisAlignedRectangularCollision;
/**
 * Classes.
 */
/**
 * Class representing a single candidate for the label grid selection.
 *
 * It also describes a deterministic way to compare two candidates to assess
 * which one is better.
 */
var LabelCandidate = /** @class */ (function () {
    function LabelCandidate(key, size) {
        this.key = key;
        this.size = size;
    }
    LabelCandidate.compare = function (first, second) {
        // First we compare by size
        if (first.size > second.size)
            return -1;
        if (first.size < second.size)
            return 1;
        // Then since no two nodes can have the same key, we use it to
        // deterministically tie-break by key
        if (first.key > second.key)
            return 1;
        // NOTE: this comparator cannot return 0
        return -1;
    };
    return LabelCandidate;
}());
/**
 * Class representing a 2D spatial grid divided into constant-size cells.
 */
var LabelGrid = /** @class */ (function () {
    function LabelGrid() {
        this.width = 0;
        this.height = 0;
        this.cellSize = 0;
        this.columns = 0;
        this.rows = 0;
        this.cells = {};
    }
    LabelGrid.prototype.resizeAndClear = function (dimensions, cellSize) {
        this.width = dimensions.width;
        this.height = dimensions.height;
        this.cellSize = cellSize;
        this.columns = Math.ceil(dimensions.width / cellSize);
        this.rows = Math.ceil(dimensions.height / cellSize);
        this.cells = {};
    };
    LabelGrid.prototype.getIndex = function (pos) {
        var xIndex = Math.floor(pos.x / this.cellSize);
        var yIndex = Math.floor(pos.y / this.cellSize);
        return xIndex * this.columns + yIndex;
    };
    LabelGrid.prototype.add = function (key, size, pos) {
        var candidate = new LabelCandidate(key, size);
        var index = this.getIndex(pos);
        var cell = this.cells[index];
        if (!cell) {
            cell = [];
            this.cells[index] = cell;
        }
        cell.push(candidate);
    };
    LabelGrid.prototype.organize = function () {
        for (var k in this.cells) {
            var cell = this.cells[k];
            cell.sort(LabelCandidate.compare);
        }
    };
    LabelGrid.prototype.getLabelsToDisplay = function (ratio, density) {
        // TODO: work on visible nodes to optimize? ^ -> threshold outside so that memoization works?
        // TODO: adjust threshold lower, but increase cells a bit?
        // TODO: hunt for geom issue in disguise
        // TODO: memoize while ratio does not move. method to force recompute
        var cellArea = this.cellSize * this.cellSize;
        var scaledCellArea = cellArea / ratio / ratio;
        var scaledDensity = (scaledCellArea * density) / cellArea;
        var labelsToDisplayPerCell = Math.ceil(scaledDensity);
        var labels = [];
        for (var k in this.cells) {
            var cell = this.cells[k];
            for (var i = 0; i < Math.min(labelsToDisplayPerCell, cell.length); i++) {
                labels.push(cell[i].key);
            }
        }
        return labels;
    };
    LabelGrid.prototype.draw = function (context, renderer) {
        context.strokeStyle = "red";
        context.lineWidth = 1;
        for (var i = 0; i < this.columns; i++) {
            var pos = renderer.framedGraphToViewport({ x: (i * this.cellSize) / this.width, y: 0 });
            context.beginPath();
            context.moveTo(pos.x, 0);
            context.lineTo(pos.x, this.height);
            context.stroke();
        }
        for (var j = 0; j < this.rows; j++) {
            var pos = renderer.framedGraphToViewport({ x: 0, y: (j * this.cellSize) / this.height });
            context.beginPath();
            context.moveTo(0, pos.y);
            context.lineTo(this.width, pos.y);
            context.stroke();
        }
    };
    return LabelGrid;
}());
exports.LabelGrid = LabelGrid;
/**
 * Label heuristic selecting edge labels to display, based on displayed node
 * labels
 *
 * @param  {object} params                 - Parameters:
 * @param  {Set}      displayedNodeLabels  - Currently displayed node labels.
 * @param  {Set}      highlightedNodes     - Highlighted nodes.
 * @param  {Graph}    graph                - The rendered graph.
 * @param  {string}   hoveredNode          - Hovered node (optional)
 * @return {Array}                         - The selected labels.
 */
function edgeLabelsToDisplayFromNodes(params) {
    var graph = params.graph, hoveredNode = params.hoveredNode, highlightedNodes = params.highlightedNodes, displayedNodeLabels = params.displayedNodeLabels;
    var worthyEdges = [];
    // TODO: the code below can be optimized using #.forEach and batching the code per adj
    // We should display an edge's label if:
    //   - Any of its extremities is highlighted or hovered
    //   - Both of its extremities has its label shown
    graph.forEachEdge(function (edge, _, source, target) {
        if (source === hoveredNode ||
            target === hoveredNode ||
            highlightedNodes.has(source) ||
            highlightedNodes.has(target) ||
            (displayedNodeLabels.has(source) && displayedNodeLabels.has(target))) {
            worthyEdges.push(edge);
        }
    });
    return worthyEdges;
}
exports.edgeLabelsToDisplayFromNodes = edgeLabelsToDisplayFromNodes;


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Sigma.js Settings
 * =================================
 *
 * The list of settings and some handy functions.
 * @module
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_SETTINGS = exports.validateSettings = void 0;
var label_1 = __importDefault(__webpack_require__(46));
var hover_1 = __importDefault(__webpack_require__(144));
var edge_label_1 = __importDefault(__webpack_require__(146));
var node_fast_1 = __importDefault(__webpack_require__(147));
var edge_1 = __importDefault(__webpack_require__(152));
var edge_arrow_1 = __importDefault(__webpack_require__(154));
function validateSettings(settings) {
    if (typeof settings.labelDensity !== "number" || settings.labelDensity < 0) {
        throw new Error("Settings: invalid `labelDensity`. Expecting a positive number.");
    }
}
exports.validateSettings = validateSettings;
exports.DEFAULT_SETTINGS = {
    // Performance
    hideEdgesOnMove: false,
    hideLabelsOnMove: false,
    renderLabels: true,
    renderEdgeLabels: false,
    // Component rendering
    defaultNodeColor: "#999",
    defaultNodeType: "circle",
    defaultEdgeColor: "#ccc",
    defaultEdgeType: "line",
    labelFont: "Arial",
    labelSize: 14,
    labelWeight: "normal",
    edgeLabelFont: "Arial",
    edgeLabelSize: 14,
    edgeLabelWeight: "normal",
    stagePadding: 30,
    // Labels
    labelDensity: 0.07,
    labelGridCellSize: 60,
    labelRenderedSizeThreshold: 6,
    // Reducers
    nodeReducer: null,
    edgeReducer: null,
    // Features
    zIndex: false,
    // Renderers
    labelRenderer: label_1.default,
    hoverRenderer: hover_1.default,
    edgeLabelRenderer: edge_label_1.default,
    // Program classes
    nodeProgramClasses: {
        circle: node_fast_1.default,
    },
    edgeProgramClasses: {
        arrow: edge_arrow_1.default,
        line: edge_1.default,
    },
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = __importDefault(__webpack_require__(145));
var label_1 = __importDefault(__webpack_require__(46));
/**
 * Draw an hovered node.
 * - if there is no label => display a shadow on the node
 * - if the label box is bigger than node size => display a label box that contains the node with a shadow
 * - else node with shadow and the label box
 */
function drawHover(context, data, settings) {
    var size = settings.labelSize, font = settings.labelFont, weight = settings.labelWeight;
    context.font = weight + " " + size + "px " + font;
    // Then we draw the label background
    context.fillStyle = "#FFF";
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 8;
    context.shadowColor = "#000";
    var MARGIN = 2;
    if (typeof data.label === "string") {
        var textWidth = context.measureText(data.label).width, boxWidth = Math.round(textWidth + 9), boxHeight = Math.round(size + 2 * MARGIN), radious = Math.max(data.size, size / 2) + MARGIN;
        var angleRadian = Math.asin(boxHeight / 2 / radious);
        var xDeltaCoord = Math.sqrt(Math.abs(Math.pow(radious, 2) - Math.pow(boxHeight / 2, 2)));
        context.beginPath();
        context.moveTo(data.x + xDeltaCoord, data.y + boxHeight / 2);
        context.lineTo(data.x + radious + boxWidth, data.y + boxHeight / 2);
        context.lineTo(data.x + radious + boxWidth, data.y - boxHeight / 2);
        context.lineTo(data.x + xDeltaCoord, data.y - boxHeight / 2);
        context.arc(data.x, data.y, radious, angleRadian, -angleRadian);
        context.closePath();
        context.fill();
    }
    else {
        context.beginPath();
        context.arc(data.x, data.y, data.size + MARGIN, 0, Math.PI * 2);
        context.closePath();
        context.fill();
    }
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 0;
    // the inner node of the label box
    (0, node_1.default)(context, data);
    // And finally we draw the label
    (0, label_1.default)(context, data, settings);
}
exports.default = drawHover;


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var PI_TIMES_2 = Math.PI * 2;
function drawNode(context, data) {
    context.fillStyle = data.color;
    context.beginPath();
    context.arc(data.x, data.y, data.size, 0, PI_TIMES_2, true);
    context.closePath();
    context.fill();
}
exports.default = drawNode;


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function drawEdgeLabel(context, edgeData, sourceData, targetData, settings) {
    var size = settings.edgeLabelSize, font = settings.edgeLabelFont, weight = settings.edgeLabelWeight, label = edgeData.label;
    if (!label)
        return;
    context.fillStyle = edgeData.color;
    context.font = weight + " " + size + "px " + font;
    var textWidth = context.measureText(label).width;
    var cx = (sourceData.x + targetData.x) / 2;
    var cy = (sourceData.y + targetData.y) / 2;
    var dx = targetData.x - sourceData.x;
    var dy = targetData.y - sourceData.y;
    var d = Math.sqrt(dx * dx + dy * dy);
    var angle;
    if (dx > 0) {
        if (dy > 0)
            angle = Math.acos(dx / d);
        else
            angle = Math.asin(dy / d);
    }
    else {
        if (dy > 0)
            angle = Math.acos(dx / d) + Math.PI;
        else
            angle = Math.asin(dx / d) + Math.PI / 2;
    }
    context.save();
    context.translate(cx, cy);
    context.rotate(angle);
    context.fillText(label, -textWidth / 2, edgeData.size / 2 + size);
    context.restore();
}
exports.default = drawEdgeLabel;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(1);
var node_fast_vert_glsl_1 = __importDefault(__webpack_require__(148));
var node_fast_frag_glsl_1 = __importDefault(__webpack_require__(149));
var node_1 = __webpack_require__(150);
var POINTS = 1, ATTRIBUTES = 4;
var NodeProgramFast = /** @class */ (function (_super) {
    __extends(NodeProgramFast, _super);
    function NodeProgramFast(gl) {
        var _this = _super.call(this, gl, node_fast_vert_glsl_1.default, node_fast_frag_glsl_1.default, POINTS, ATTRIBUTES) || this;
        _this.bind();
        return _this;
    }
    NodeProgramFast.prototype.process = function (data, hidden, offset) {
        var array = this.array;
        var i = offset * POINTS * ATTRIBUTES;
        if (hidden) {
            array[i++] = 0;
            array[i++] = 0;
            array[i++] = 0;
            array[i++] = 0;
            return;
        }
        var color = (0, utils_1.floatColor)(data.color);
        array[i++] = data.x;
        array[i++] = data.y;
        array[i++] = data.size;
        array[i] = color;
    };
    NodeProgramFast.prototype.render = function (params) {
        var gl = this.gl;
        var program = this.program;
        gl.useProgram(program);
        gl.uniform1f(this.ratioLocation, 1 / Math.pow(params.ratio, params.nodesPowRatio));
        gl.uniform1f(this.scaleLocation, params.scalingRatio);
        gl.uniformMatrix3fv(this.matrixLocation, false, params.matrix);
        gl.drawArrays(gl.POINTS, 0, this.array.length / ATTRIBUTES);
    };
    return NodeProgramFast;
}(node_1.AbstractNodeProgram));
exports.default = NodeProgramFast;


/***/ }),
/* 148 */
/***/ (function(module, exports) {

(()=>{"use strict";var o={d:(t,n)=>{for(var e in n)o.o(n,e)&&!o.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:n[e]})},o:(o,t)=>Object.prototype.hasOwnProperty.call(o,t),r:o=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})}},t={};o.r(t),o.d(t,{default:()=>n});const n="attribute vec2 a_position;\nattribute float a_size;\nattribute vec4 a_color;\n\nuniform float u_ratio;\nuniform float u_scale;\nuniform mat3 u_matrix;\n\nvarying vec4 v_color;\nvarying float v_border;\n\nconst float bias = 255.0 / 254.0;\n\nvoid main() {\n\n  gl_Position = vec4(\n    (u_matrix * vec3(a_position, 1)).xy,\n    0,\n    1\n  );\n\n  // Multiply the point size twice:\n  //  - x SCALING_RATIO to correct the canvas scaling\n  //  - x 2 to correct the formulae\n  gl_PointSize = a_size * u_ratio * u_scale * 2.0;\n\n  v_border = (1.0 / u_ratio) * (0.5 / a_size);\n\n  // Extract the color:\n  v_color = a_color;\n  v_color.a *= bias;\n}\n";module.exports=t})();

/***/ }),
/* 149 */
/***/ (function(module, exports) {

(()=>{"use strict";var o={d:(e,n)=>{for(var r in n)o.o(n,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(o,e)=>Object.prototype.hasOwnProperty.call(o,e),r:o=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})}},e={};o.r(e),o.d(e,{default:()=>n});const n="precision mediump float;\n\nvarying vec4 v_color;\nvarying float v_border;\n\nconst float radius = 0.5;\n\nvoid main(void) {\n  vec4 color0 = vec4(0.0, 0.0, 0.0, 0.0);\n  vec2 m = gl_PointCoord - vec2(0.5, 0.5);\n  float dist = radius - length(m);\n\n  float t = 0.0;\n  if (dist > v_border)\n    t = 1.0;\n  else if (dist > 0.0)\n    t = dist / v_border;\n\n  gl_FragColor = mix(color0, v_color, t);\n}\n";module.exports=e})();

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNodeCompoundProgram = exports.AbstractNodeProgram = void 0;
/**
 * Sigma.js WebGL Abstract Node Program
 * =====================================
 *
 * @module
 */
var program_1 = __webpack_require__(47);
/**
 * Node Program class.
 *
 * @constructor
 */
var AbstractNodeProgram = /** @class */ (function (_super) {
    __extends(AbstractNodeProgram, _super);
    function AbstractNodeProgram(gl, vertexShaderSource, fragmentShaderSource, points, attributes) {
        var _this = _super.call(this, gl, vertexShaderSource, fragmentShaderSource, points, attributes) || this;
        // Locations
        _this.positionLocation = gl.getAttribLocation(_this.program, "a_position");
        _this.sizeLocation = gl.getAttribLocation(_this.program, "a_size");
        _this.colorLocation = gl.getAttribLocation(_this.program, "a_color");
        // Uniform Location
        var matrixLocation = gl.getUniformLocation(_this.program, "u_matrix");
        if (matrixLocation === null)
            throw new Error("AbstractNodeProgram: error while getting matrixLocation");
        _this.matrixLocation = matrixLocation;
        var ratioLocation = gl.getUniformLocation(_this.program, "u_ratio");
        if (ratioLocation === null)
            throw new Error("AbstractNodeProgram: error while getting ratioLocation");
        _this.ratioLocation = ratioLocation;
        var scaleLocation = gl.getUniformLocation(_this.program, "u_scale");
        if (scaleLocation === null)
            throw new Error("AbstractNodeProgram: error while getting scaleLocation");
        _this.scaleLocation = scaleLocation;
        return _this;
    }
    AbstractNodeProgram.prototype.bind = function () {
        var gl = this.gl;
        gl.enableVertexAttribArray(this.positionLocation);
        gl.enableVertexAttribArray(this.sizeLocation);
        gl.enableVertexAttribArray(this.colorLocation);
        gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, this.attributes * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.vertexAttribPointer(this.sizeLocation, 1, gl.FLOAT, false, this.attributes * Float32Array.BYTES_PER_ELEMENT, 8);
        gl.vertexAttribPointer(this.colorLocation, 4, gl.UNSIGNED_BYTE, true, this.attributes * Float32Array.BYTES_PER_ELEMENT, 12);
    };
    return AbstractNodeProgram;
}(program_1.AbstractProgram));
exports.AbstractNodeProgram = AbstractNodeProgram;
/**
 * Helper function combining two or more programs into a single compound one.
 * Note that this is more a quick & easy way to combine program than a really
 * performant option. More performant programs can be written entirely.
 *
 * @param  {array}    programClasses - Program classes to combine.
 * @return {function}
 */
function createNodeCompoundProgram(programClasses) {
    return /** @class */ (function () {
        function NodeCompoundProgram(gl) {
            this.programs = programClasses.map(function (ProgramClass) { return new ProgramClass(gl); });
        }
        NodeCompoundProgram.prototype.bufferData = function () {
            this.programs.forEach(function (program) { return program.bufferData(); });
        };
        NodeCompoundProgram.prototype.allocate = function (capacity) {
            this.programs.forEach(function (program) { return program.allocate(capacity); });
        };
        NodeCompoundProgram.prototype.bind = function () {
            // nothing todo, it's already done in each program constructor
        };
        NodeCompoundProgram.prototype.render = function (params) {
            this.programs.forEach(function (program) { return program.render(params); });
        };
        NodeCompoundProgram.prototype.process = function (data, hidden, offset) {
            this.programs.forEach(function (program) { return program.process(data, hidden, offset); });
        };
        return NodeCompoundProgram;
    }());
}
exports.createNodeCompoundProgram = createNodeCompoundProgram;


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Sigma.js Shader Utils
 * ======================
 *
 * Code used to load sigma's shaders.
 * @module
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadProgram = exports.loadFragmentShader = exports.loadVertexShader = void 0;
/**
 * Function used to load a shader.
 */
function loadShader(type, gl, source) {
    var glType = type === "VERTEX" ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER;
    // Creating the shader
    var shader = gl.createShader(glType);
    if (shader === null) {
        throw new Error("loadShader: error while creating the shader");
    }
    // Loading source
    gl.shaderSource(shader, source);
    // Compiling the shader
    gl.compileShader(shader);
    // Retrieving compilation status
    var successfullyCompiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    // Throwing if something went awry
    if (!successfullyCompiled) {
        var infoLog = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error("loadShader: error while compiling the shader:\n" + infoLog + "\n" + source);
    }
    return shader;
}
function loadVertexShader(gl, source) {
    return loadShader("VERTEX", gl, source);
}
exports.loadVertexShader = loadVertexShader;
function loadFragmentShader(gl, source) {
    return loadShader("FRAGMENT", gl, source);
}
exports.loadFragmentShader = loadFragmentShader;
/**
 * Function used to load a program.
 */
function loadProgram(gl, shaders) {
    var program = gl.createProgram();
    if (program === null) {
        throw new Error("loadProgram: error while creating the program.");
    }
    var i, l;
    // Attaching the shaders
    for (i = 0, l = shaders.length; i < l; i++)
        gl.attachShader(program, shaders[i]);
    gl.linkProgram(program);
    // Checking status
    var successfullyLinked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!successfullyLinked) {
        gl.deleteProgram(program);
        throw new Error("loadProgram: error while linking the program.");
    }
    return program;
}
exports.loadProgram = loadProgram;


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sigma.js WebGL Renderer Edge Program
 * =====================================
 *
 * Program rendering edges as thick lines using four points translated
 * orthogonally from the source & target's centers by half thickness.
 *
 * Rendering two triangles by using only four points is made possible through
 * the use of indices.
 *
 * This method should be faster than the 6 points / 2 triangles approach and
 * should handle thickness better than with gl.LINES.
 *
 * This version of the shader balances geometry computation evenly between
 * the CPU & GPU (normals are computed on the CPU side).
 * @module
 */
var utils_1 = __webpack_require__(1);
var edge_vert_glsl_1 = __importDefault(__webpack_require__(153));
var edge_frag_glsl_1 = __importDefault(__webpack_require__(48));
var edge_1 = __webpack_require__(10);
var POINTS = 4, ATTRIBUTES = 6, STRIDE = POINTS * ATTRIBUTES;
var EdgeProgram = /** @class */ (function (_super) {
    __extends(EdgeProgram, _super);
    function EdgeProgram(gl) {
        var _this = _super.call(this, gl, edge_vert_glsl_1.default, edge_frag_glsl_1.default, POINTS, ATTRIBUTES) || this;
        // Initializing indices buffer
        var indicesBuffer = gl.createBuffer();
        if (indicesBuffer === null)
            throw new Error("EdgeProgram: error while getting resolutionLocation");
        _this.indicesBuffer = indicesBuffer;
        // Locations
        _this.positionLocation = gl.getAttribLocation(_this.program, "a_position");
        _this.colorLocation = gl.getAttribLocation(_this.program, "a_color");
        _this.normalLocation = gl.getAttribLocation(_this.program, "a_normal");
        _this.thicknessLocation = gl.getAttribLocation(_this.program, "a_thickness");
        // Uniform locations
        var scaleLocation = gl.getUniformLocation(_this.program, "u_scale");
        if (scaleLocation === null)
            throw new Error("EdgeProgram: error while getting scaleLocation");
        _this.scaleLocation = scaleLocation;
        var matrixLocation = gl.getUniformLocation(_this.program, "u_matrix");
        if (matrixLocation === null)
            throw new Error("EdgeProgram: error while getting matrixLocation");
        _this.matrixLocation = matrixLocation;
        var cameraRatioLocation = gl.getUniformLocation(_this.program, "u_cameraRatio");
        if (cameraRatioLocation === null)
            throw new Error("EdgeProgram: error while getting cameraRatioLocation");
        _this.cameraRatioLocation = cameraRatioLocation;
        var viewportRatioLocation = gl.getUniformLocation(_this.program, "u_viewportRatio");
        if (viewportRatioLocation === null)
            throw new Error("EdgeProgram: error while getting viewportRatioLocation");
        _this.viewportRatioLocation = viewportRatioLocation;
        var thicknessRatioLocation = gl.getUniformLocation(_this.program, "u_thicknessRatio");
        if (thicknessRatioLocation === null)
            throw new Error("EdgeProgram: error while getting thicknessRatioLocation");
        _this.thicknessRatioLocation = thicknessRatioLocation;
        // Enabling the OES_element_index_uint extension
        // NOTE: on older GPUs, this means that really large graphs won't
        // have all their edges rendered. But it seems that the
        // `OES_element_index_uint` is quite everywhere so we'll handle
        // the potential issue if it really arises.
        // NOTE: when using webgl2, the extension is enabled by default
        _this.canUse32BitsIndices = (0, utils_1.canUse32BitsIndices)(gl);
        _this.IndicesArray = _this.canUse32BitsIndices ? Uint32Array : Uint16Array;
        _this.indicesArray = new _this.IndicesArray();
        _this.indicesType = _this.canUse32BitsIndices ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT;
        _this.bind();
        return _this;
    }
    EdgeProgram.prototype.bind = function () {
        var gl = this.gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
        // Bindings
        gl.enableVertexAttribArray(this.positionLocation);
        gl.enableVertexAttribArray(this.normalLocation);
        gl.enableVertexAttribArray(this.thicknessLocation);
        gl.enableVertexAttribArray(this.colorLocation);
        gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.vertexAttribPointer(this.normalLocation, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 8);
        gl.vertexAttribPointer(this.thicknessLocation, 1, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 16);
        gl.vertexAttribPointer(this.colorLocation, 4, gl.UNSIGNED_BYTE, true, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 20);
    };
    EdgeProgram.prototype.computeIndices = function () {
        var l = this.array.length / ATTRIBUTES;
        var size = l + l / 2;
        var indices = new this.IndicesArray(size);
        for (var i = 0, c = 0; i < l; i += 4) {
            indices[c++] = i;
            indices[c++] = i + 1;
            indices[c++] = i + 2;
            indices[c++] = i + 2;
            indices[c++] = i + 1;
            indices[c++] = i + 3;
        }
        this.indicesArray = indices;
    };
    EdgeProgram.prototype.bufferData = function () {
        _super.prototype.bufferData.call(this);
        // Indices data
        var gl = this.gl;
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indicesArray, gl.STATIC_DRAW);
    };
    EdgeProgram.prototype.process = function (sourceData, targetData, data, hidden, offset) {
        if (hidden) {
            for (var i_1 = offset * STRIDE, l = i_1 + STRIDE; i_1 < l; i_1++)
                this.array[i_1] = 0;
            return;
        }
        var thickness = data.size || 1, x1 = sourceData.x, y1 = sourceData.y, x2 = targetData.x, y2 = targetData.y, color = (0, utils_1.floatColor)(data.color);
        // Computing normals
        var dx = x2 - x1, dy = y2 - y1;
        var len = dx * dx + dy * dy, n1 = 0, n2 = 0;
        if (len) {
            len = 1 / Math.sqrt(len);
            n1 = -dy * len;
            n2 = dx * len;
        }
        var i = POINTS * ATTRIBUTES * offset;
        var array = this.array;
        // First point
        array[i++] = x1;
        array[i++] = y1;
        array[i++] = n1;
        array[i++] = n2;
        array[i++] = thickness;
        array[i++] = color;
        // First point flipped
        array[i++] = x1;
        array[i++] = y1;
        array[i++] = -n1;
        array[i++] = -n2;
        array[i++] = thickness;
        array[i++] = color;
        // Second point
        array[i++] = x2;
        array[i++] = y2;
        array[i++] = n1;
        array[i++] = n2;
        array[i++] = thickness;
        array[i++] = color;
        // Second point flipped
        array[i++] = x2;
        array[i++] = y2;
        array[i++] = -n1;
        array[i++] = -n2;
        array[i++] = thickness;
        array[i] = color;
    };
    EdgeProgram.prototype.render = function (params) {
        var gl = this.gl;
        var program = this.program;
        gl.useProgram(program);
        // Binding uniforms
        gl.uniform1f(this.scaleLocation, params.scalingRatio);
        gl.uniformMatrix3fv(this.matrixLocation, false, params.matrix);
        gl.uniform1f(this.cameraRatioLocation, params.ratio);
        gl.uniform1f(this.viewportRatioLocation, 1 / Math.min(params.width, params.height));
        gl.uniform1f(this.thicknessRatioLocation, 1 / Math.pow(params.ratio, params.edgesPowRatio));
        // Drawing:
        gl.drawElements(gl.TRIANGLES, this.indicesArray.length, this.indicesType, 0);
    };
    return EdgeProgram;
}(edge_1.AbstractEdgeProgram));
exports.default = EdgeProgram;


/***/ }),
/* 153 */
/***/ (function(module, exports) {

(()=>{"use strict";var n={d:(t,o)=>{for(var e in o)n.o(o,e)&&!n.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:o[e]})},o:(n,t)=>Object.prototype.hasOwnProperty.call(n,t),r:n=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})}},t={};n.r(t),n.d(t,{default:()=>o});const o="attribute vec2 a_position;\nattribute vec2 a_normal;\nattribute float a_thickness;\nattribute vec4 a_color;\n\nuniform mat3 u_matrix;\nuniform float u_scale;\nuniform float u_cameraRatio;\nuniform float u_viewportRatio;\nuniform float u_thicknessRatio;\n\nvarying vec4 v_color;\nvarying vec2 v_normal;\nvarying float v_thickness;\n\nconst float minThickness = 0.8;\nconst float bias = 255.0 / 254.0;\n\nvoid main() {\n\n  // Computing thickness in screen space:\n  float thickness = a_thickness * u_thicknessRatio * u_scale * u_viewportRatio / 2.0;\n  thickness = max(thickness, minThickness * u_viewportRatio);\n\n  // Add normal vector to the position in screen space, but correct thickness first:\n  vec2 position = (u_matrix * vec3(a_position + a_normal * thickness * u_cameraRatio, 1)).xy;\n\n  gl_Position = vec4(position, 0, 1);\n\n  v_normal = a_normal;\n  v_thickness = thickness;\n\n  // Extract the color:\n  v_color = a_color;\n  v_color.a *= bias;\n}\n";module.exports=t})();

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sigma.js WebGL Renderer Edge Arrow Program
 * ===========================================
 *
 * Compound program rendering edges as an arrow from the source to the target.
 * @module
 */
var edge_1 = __webpack_require__(10);
var edge_arrowHead_1 = __importDefault(__webpack_require__(155));
var edge_clamped_1 = __importDefault(__webpack_require__(158));
var program = (0, edge_1.createEdgeCompoundProgram)([edge_clamped_1.default, edge_arrowHead_1.default]);
exports.default = program;


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __webpack_require__(1);
var edge_arrowHead_vert_glsl_1 = __importDefault(__webpack_require__(156));
var edge_arrowHead_frag_glsl_1 = __importDefault(__webpack_require__(157));
var edge_1 = __webpack_require__(10);
var POINTS = 3, ATTRIBUTES = 10, STRIDE = POINTS * ATTRIBUTES;
var EdgeArrowHeadProgram = /** @class */ (function (_super) {
    __extends(EdgeArrowHeadProgram, _super);
    function EdgeArrowHeadProgram(gl) {
        var _this = _super.call(this, gl, edge_arrowHead_vert_glsl_1.default, edge_arrowHead_frag_glsl_1.default, POINTS, ATTRIBUTES) || this;
        // Locations
        _this.positionLocation = gl.getAttribLocation(_this.program, "a_position");
        _this.colorLocation = gl.getAttribLocation(_this.program, "a_color");
        _this.normalLocation = gl.getAttribLocation(_this.program, "a_normal");
        _this.thicknessLocation = gl.getAttribLocation(_this.program, "a_thickness");
        _this.radiusLocation = gl.getAttribLocation(_this.program, "a_radius");
        _this.barycentricLocation = gl.getAttribLocation(_this.program, "a_barycentric");
        // Uniform locations
        var scaleLocation = gl.getUniformLocation(_this.program, "u_scale");
        if (scaleLocation === null)
            throw new Error("EdgeArrowHeadProgram: error while getting scaleLocation");
        _this.scaleLocation = scaleLocation;
        var matrixLocation = gl.getUniformLocation(_this.program, "u_matrix");
        if (matrixLocation === null)
            throw new Error("EdgeArrowHeadProgram: error while getting matrixLocation");
        _this.matrixLocation = matrixLocation;
        var cameraRatioLocation = gl.getUniformLocation(_this.program, "u_cameraRatio");
        if (cameraRatioLocation === null)
            throw new Error("EdgeArrowHeadProgram: error while getting cameraRatioLocation");
        _this.cameraRatioLocation = cameraRatioLocation;
        var viewportRatioLocation = gl.getUniformLocation(_this.program, "u_viewportRatio");
        if (viewportRatioLocation === null)
            throw new Error("EdgeArrowHeadProgram: error while getting viewportRatioLocation");
        _this.viewportRatioLocation = viewportRatioLocation;
        var thicknessRatioLocation = gl.getUniformLocation(_this.program, "u_thicknessRatio");
        if (thicknessRatioLocation === null)
            throw new Error("EdgeArrowHeadProgram: error while getting thicknessRatioLocation");
        _this.thicknessRatioLocation = thicknessRatioLocation;
        _this.bind();
        return _this;
    }
    EdgeArrowHeadProgram.prototype.bind = function () {
        var gl = this.gl;
        // Bindings
        gl.enableVertexAttribArray(this.positionLocation);
        gl.enableVertexAttribArray(this.normalLocation);
        gl.enableVertexAttribArray(this.thicknessLocation);
        gl.enableVertexAttribArray(this.radiusLocation);
        gl.enableVertexAttribArray(this.colorLocation);
        gl.enableVertexAttribArray(this.barycentricLocation);
        gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.vertexAttribPointer(this.normalLocation, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 8);
        gl.vertexAttribPointer(this.thicknessLocation, 1, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 16);
        gl.vertexAttribPointer(this.radiusLocation, 1, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 20);
        gl.vertexAttribPointer(this.colorLocation, 4, gl.UNSIGNED_BYTE, true, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 24);
        // TODO: maybe we can optimize here by packing this in a bit mask
        gl.vertexAttribPointer(this.barycentricLocation, 3, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 28);
    };
    EdgeArrowHeadProgram.prototype.computeIndices = function () {
        // nothing to do
    };
    EdgeArrowHeadProgram.prototype.process = function (sourceData, targetData, data, hidden, offset) {
        if (hidden) {
            for (var i_1 = offset * STRIDE, l = i_1 + STRIDE; i_1 < l; i_1++)
                this.array[i_1] = 0;
            return;
        }
        var thickness = data.size || 1, radius = targetData.size || 1, x1 = sourceData.x, y1 = sourceData.y, x2 = targetData.x, y2 = targetData.y, color = (0, utils_1.floatColor)(data.color);
        // Computing normals
        var dx = x2 - x1, dy = y2 - y1;
        var len = dx * dx + dy * dy, n1 = 0, n2 = 0;
        if (len) {
            len = 1 / Math.sqrt(len);
            n1 = -dy * len;
            n2 = dx * len;
        }
        var i = POINTS * ATTRIBUTES * offset;
        var array = this.array;
        // First point
        array[i++] = x2;
        array[i++] = y2;
        array[i++] = -n1;
        array[i++] = -n2;
        array[i++] = thickness;
        array[i++] = radius;
        array[i++] = color;
        array[i++] = 1;
        array[i++] = 0;
        array[i++] = 0;
        // Second point
        array[i++] = x2;
        array[i++] = y2;
        array[i++] = -n1;
        array[i++] = -n2;
        array[i++] = thickness;
        array[i++] = radius;
        array[i++] = color;
        array[i++] = 0;
        array[i++] = 1;
        array[i++] = 0;
        // Third point
        array[i++] = x2;
        array[i++] = y2;
        array[i++] = -n1;
        array[i++] = -n2;
        array[i++] = thickness;
        array[i++] = radius;
        array[i++] = color;
        array[i++] = 0;
        array[i++] = 0;
        array[i] = 1;
    };
    EdgeArrowHeadProgram.prototype.render = function (params) {
        var gl = this.gl;
        var program = this.program;
        gl.useProgram(program);
        // Binding uniforms
        gl.uniform1f(this.scaleLocation, params.scalingRatio);
        gl.uniformMatrix3fv(this.matrixLocation, false, params.matrix);
        gl.uniform1f(this.cameraRatioLocation, params.ratio);
        gl.uniform1f(this.viewportRatioLocation, 1 / Math.min(params.width, params.height));
        gl.uniform1f(this.thicknessRatioLocation, 1 / Math.pow(params.ratio, params.edgesPowRatio));
        // Drawing:
        gl.drawArrays(gl.TRIANGLES, 0, this.array.length / ATTRIBUTES);
    };
    return EdgeArrowHeadProgram;
}(edge_1.AbstractEdgeProgram));
exports.default = EdgeArrowHeadProgram;


/***/ }),
/* 156 */
/***/ (function(module, exports) {

(()=>{"use strict";var a={d:(n,t)=>{for(var o in t)a.o(t,o)&&!a.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:t[o]})},o:(a,n)=>Object.prototype.hasOwnProperty.call(a,n),r:a=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(a,"__esModule",{value:!0})}},n={};a.r(n),a.d(n,{default:()=>t});const t="attribute vec2 a_position;\nattribute vec2 a_normal;\nattribute float a_thickness;\nattribute float a_radius;\nattribute vec4 a_color;\nattribute vec3 a_barycentric;\n\nuniform mat3 u_matrix;\nuniform float u_scale;\nuniform float u_cameraRatio;\nuniform float u_viewportRatio;\nuniform float u_thicknessRatio;\n\nvarying vec4 v_color;\n\nconst float arrowHeadLengthThicknessRatio = 2.5;\nconst float arrowHeadWidthLengthRatio = 0.66;\nconst float minThickness = 0.8;\nconst float bias = 255.0 / 254.0;\n\nvoid main() {\n\n  // Computing thickness in screen space:\n  float thickness = a_thickness * u_thicknessRatio * u_scale * u_viewportRatio / 2.0;\n  thickness = max(thickness, minThickness * u_viewportRatio);\n\n  float nodeRadius = a_radius * u_thicknessRatio * u_viewportRatio * u_cameraRatio;\n  float arrowHeadLength = thickness * 2.0 * arrowHeadLengthThicknessRatio * u_cameraRatio;\n  float arrowHeadHalfWidth = arrowHeadWidthLengthRatio * arrowHeadLength / 2.0;\n\n  float da = a_barycentric.x;\n  float db = a_barycentric.y;\n  float dc = a_barycentric.z;\n\n  vec2 delta = vec2(\n      da * ((nodeRadius) * a_normal.y)\n    + db * ((nodeRadius + arrowHeadLength) * a_normal.y + arrowHeadHalfWidth * a_normal.x)\n    + dc * ((nodeRadius + arrowHeadLength) * a_normal.y - arrowHeadHalfWidth * a_normal.x),\n\n      da * (-(nodeRadius) * a_normal.x)\n    + db * (-(nodeRadius + arrowHeadLength) * a_normal.x + arrowHeadHalfWidth * a_normal.y)\n    + dc * (-(nodeRadius + arrowHeadLength) * a_normal.x - arrowHeadHalfWidth * a_normal.y)\n  );\n\n  vec2 position = (u_matrix * vec3(a_position + delta, 1)).xy;\n\n  gl_Position = vec4(position, 0, 1);\n\n  // Extract the color:\n  v_color = a_color;\n  v_color.a *= bias;\n}\n";module.exports=n})();

/***/ }),
/* 157 */
/***/ (function(module, exports) {

(()=>{"use strict";var e={d:(o,r)=>{for(var t in r)e.o(r,t)&&!e.o(o,t)&&Object.defineProperty(o,t,{enumerable:!0,get:r[t]})},o:(e,o)=>Object.prototype.hasOwnProperty.call(e,o),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},o={};e.r(o),e.d(o,{default:()=>r});const r="precision mediump float;\n\nvarying vec4 v_color;\n\nvoid main(void) {\n  gl_FragColor = v_color;\n}\n";module.exports=o})();

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var edge_1 = __webpack_require__(10);
var utils_1 = __webpack_require__(1);
var edge_clamped_vert_glsl_1 = __importDefault(__webpack_require__(159));
var edge_frag_glsl_1 = __importDefault(__webpack_require__(48));
var POINTS = 4, ATTRIBUTES = 7, STRIDE = POINTS * ATTRIBUTES;
var EdgeClampedProgram = /** @class */ (function (_super) {
    __extends(EdgeClampedProgram, _super);
    function EdgeClampedProgram(gl) {
        var _this = _super.call(this, gl, edge_clamped_vert_glsl_1.default, edge_frag_glsl_1.default, POINTS, ATTRIBUTES) || this;
        // Initializing indices buffer
        var indicesBuffer = gl.createBuffer();
        if (indicesBuffer === null)
            throw new Error("EdgeClampedProgram: error while getting resolutionLocation");
        _this.indicesBuffer = indicesBuffer;
        // Locations:
        _this.positionLocation = gl.getAttribLocation(_this.program, "a_position");
        _this.colorLocation = gl.getAttribLocation(_this.program, "a_color");
        _this.normalLocation = gl.getAttribLocation(_this.program, "a_normal");
        _this.thicknessLocation = gl.getAttribLocation(_this.program, "a_thickness");
        _this.radiusLocation = gl.getAttribLocation(_this.program, "a_radius");
        // Uniform locations
        var scaleLocation = gl.getUniformLocation(_this.program, "u_scale");
        if (scaleLocation === null)
            throw new Error("EdgeClampedProgram: error while getting scaleLocation");
        _this.scaleLocation = scaleLocation;
        var matrixLocation = gl.getUniformLocation(_this.program, "u_matrix");
        if (matrixLocation === null)
            throw new Error("EdgeClampedProgram: error while getting matrixLocation");
        _this.matrixLocation = matrixLocation;
        var cameraRatioLocation = gl.getUniformLocation(_this.program, "u_cameraRatio");
        if (cameraRatioLocation === null)
            throw new Error("EdgeClampedProgram: error while getting cameraRatioLocation");
        _this.cameraRatioLocation = cameraRatioLocation;
        var viewportRatioLocation = gl.getUniformLocation(_this.program, "u_viewportRatio");
        if (viewportRatioLocation === null)
            throw new Error("EdgeClampedProgram: error while getting viewportRatioLocation");
        _this.viewportRatioLocation = viewportRatioLocation;
        var thicknessRatioLocation = gl.getUniformLocation(_this.program, "u_thicknessRatio");
        if (thicknessRatioLocation === null)
            throw new Error("EdgeClampedProgram: error while getting thicknessRatioLocation");
        _this.thicknessRatioLocation = thicknessRatioLocation;
        // Enabling the OES_element_index_uint extension
        // NOTE: on older GPUs, this means that really large graphs won't
        // have all their edges rendered. But it seems that the
        // `OES_element_index_uint` is quite everywhere so we'll handle
        // the potential issue if it really arises.
        // NOTE: when using webgl2, the extension is enabled by default
        _this.canUse32BitsIndices = (0, utils_1.canUse32BitsIndices)(gl);
        _this.IndicesArray = _this.canUse32BitsIndices ? Uint32Array : Uint16Array;
        _this.indicesArray = new _this.IndicesArray();
        _this.indicesType = _this.canUse32BitsIndices ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT;
        _this.bind();
        return _this;
    }
    EdgeClampedProgram.prototype.bind = function () {
        var gl = this.gl;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
        // Bindings
        gl.enableVertexAttribArray(this.positionLocation);
        gl.enableVertexAttribArray(this.normalLocation);
        gl.enableVertexAttribArray(this.thicknessLocation);
        gl.enableVertexAttribArray(this.colorLocation);
        gl.enableVertexAttribArray(this.radiusLocation);
        gl.vertexAttribPointer(this.positionLocation, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.vertexAttribPointer(this.normalLocation, 2, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 8);
        gl.vertexAttribPointer(this.thicknessLocation, 1, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 16);
        gl.vertexAttribPointer(this.colorLocation, 4, gl.UNSIGNED_BYTE, true, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 20);
        gl.vertexAttribPointer(this.radiusLocation, 1, gl.FLOAT, false, ATTRIBUTES * Float32Array.BYTES_PER_ELEMENT, 24);
    };
    EdgeClampedProgram.prototype.process = function (sourceData, targetData, data, hidden, offset) {
        if (hidden) {
            for (var i_1 = offset * STRIDE, l = i_1 + STRIDE; i_1 < l; i_1++)
                this.array[i_1] = 0;
            return;
        }
        var thickness = data.size || 1, x1 = sourceData.x, y1 = sourceData.y, x2 = targetData.x, y2 = targetData.y, radius = targetData.size || 1, color = (0, utils_1.floatColor)(data.color);
        // Computing normals
        var dx = x2 - x1, dy = y2 - y1;
        var len = dx * dx + dy * dy, n1 = 0, n2 = 0;
        if (len) {
            len = 1 / Math.sqrt(len);
            n1 = -dy * len;
            n2 = dx * len;
        }
        var i = POINTS * ATTRIBUTES * offset;
        var array = this.array;
        // First point
        array[i++] = x1;
        array[i++] = y1;
        array[i++] = n1;
        array[i++] = n2;
        array[i++] = thickness;
        array[i++] = color;
        array[i++] = 0;
        // First point flipped
        array[i++] = x1;
        array[i++] = y1;
        array[i++] = -n1;
        array[i++] = -n2;
        array[i++] = thickness;
        array[i++] = color;
        array[i++] = 0;
        // Second point
        array[i++] = x2;
        array[i++] = y2;
        array[i++] = n1;
        array[i++] = n2;
        array[i++] = thickness;
        array[i++] = color;
        array[i++] = radius;
        // Second point flipped
        array[i++] = x2;
        array[i++] = y2;
        array[i++] = -n1;
        array[i++] = -n2;
        array[i++] = thickness;
        array[i++] = color;
        array[i] = -radius;
    };
    EdgeClampedProgram.prototype.computeIndices = function () {
        var l = this.array.length / ATTRIBUTES;
        var size = l + l / 2;
        var indices = new this.IndicesArray(size);
        for (var i = 0, c = 0; i < l; i += 4) {
            indices[c++] = i;
            indices[c++] = i + 1;
            indices[c++] = i + 2;
            indices[c++] = i + 2;
            indices[c++] = i + 1;
            indices[c++] = i + 3;
        }
        this.indicesArray = indices;
    };
    EdgeClampedProgram.prototype.bufferData = function () {
        _super.prototype.bufferData.call(this);
        // Indices data
        var gl = this.gl;
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indicesArray, gl.STATIC_DRAW);
    };
    EdgeClampedProgram.prototype.render = function (params) {
        var gl = this.gl;
        var program = this.program;
        gl.useProgram(program);
        // Binding uniforms
        gl.uniform1f(this.scaleLocation, params.scalingRatio);
        gl.uniformMatrix3fv(this.matrixLocation, false, params.matrix);
        gl.uniform1f(this.cameraRatioLocation, params.ratio);
        gl.uniform1f(this.viewportRatioLocation, 1 / Math.min(params.width, params.height));
        gl.uniform1f(this.thicknessRatioLocation, 1 / Math.pow(params.ratio, params.edgesPowRatio));
        // Drawing:
        gl.drawElements(gl.TRIANGLES, this.indicesArray.length, this.indicesType, 0);
    };
    return EdgeClampedProgram;
}(edge_1.AbstractEdgeProgram));
exports.default = EdgeClampedProgram;


/***/ }),
/* 159 */
/***/ (function(module, exports) {

(()=>{"use strict";var n={d:(t,o)=>{for(var e in o)n.o(o,e)&&!n.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:o[e]})},o:(n,t)=>Object.prototype.hasOwnProperty.call(n,t),r:n=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})}},t={};n.r(t),n.d(t,{default:()=>o});const o="attribute vec2 a_position;\nattribute vec2 a_normal;\nattribute float a_thickness;\nattribute vec4 a_color;\nattribute float a_radius;\n\nuniform mat3 u_matrix;\nuniform float u_scale;\nuniform float u_cameraRatio;\nuniform float u_viewportRatio;\nuniform float u_thicknessRatio;\n\nvarying vec4 v_color;\nvarying vec2 v_normal;\nvarying float v_thickness;\n\nconst float arrowHeadLengthThicknessRatio = 2.5;\nconst float minThickness = 0.8;\nconst float bias = 255.0 / 254.0;\n\nvoid main() {\n\n  // Computing thickness in screen space:\n  float thickness = a_thickness * u_thicknessRatio * u_scale * u_viewportRatio / 2.0;\n  thickness = max(thickness, minThickness * u_viewportRatio);\n\n  float direction = sign(a_radius);\n  float nodeRadius = direction * a_radius * u_thicknessRatio * u_viewportRatio;\n  float arrowHeadLength = thickness * 2.0 * arrowHeadLengthThicknessRatio;\n\n  vec2 arrowHeadVector = vec2(-direction * a_normal.y, direction * a_normal.x);\n\n  // Add normal vector to the position in screen space, but correct thickness first:\n  vec2 position = a_position + a_normal * thickness * u_cameraRatio;\n  // Add vector that corrects the arrow head length:\n  position = position + arrowHeadVector * (arrowHeadLength + nodeRadius) * u_cameraRatio;\n  // Apply camera\n  position = (u_matrix * vec3(position, 1)).xy;\n\n  gl_Position = vec4(position, 0, 1);\n\n  v_normal = a_normal;\n  v_thickness = thickness;\n\n  // Extract the color:\n  v_color = a_color;\n  v_color.a *= bias;\n}\n";module.exports=t})();

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var captor_1 = __importStar(__webpack_require__(44));
var DRAG_TIMEOUT = 200;
var TOUCH_INERTIA_RATIO = 3;
var TOUCH_INERTIA_DURATION = 200;
/**
 * Touch captor class.
 *
 * @constructor
 */
var TouchCaptor = /** @class */ (function (_super) {
    __extends(TouchCaptor, _super);
    function TouchCaptor(container, renderer) {
        var _this = _super.call(this, container, renderer) || this;
        _this.enabled = true;
        _this.isMoving = false;
        _this.touchMode = 0; // number of touches down
        // Binding methods:
        _this.handleStart = _this.handleStart.bind(_this);
        _this.handleLeave = _this.handleLeave.bind(_this);
        _this.handleMove = _this.handleMove.bind(_this);
        // Binding events
        container.addEventListener("touchstart", _this.handleStart, false);
        container.addEventListener("touchend", _this.handleLeave, false);
        container.addEventListener("touchcancel", _this.handleLeave, false);
        container.addEventListener("touchmove", _this.handleMove, false);
        return _this;
    }
    TouchCaptor.prototype.kill = function () {
        var container = this.container;
        container.removeEventListener("touchstart", this.handleStart);
        container.removeEventListener("touchend", this.handleLeave);
        container.removeEventListener("touchcancel", this.handleLeave);
        container.removeEventListener("touchmove", this.handleMove);
    };
    TouchCaptor.prototype.getDimensions = function () {
        return {
            width: this.container.offsetWidth,
            height: this.container.offsetHeight,
        };
    };
    TouchCaptor.prototype.dispatchRelatedMouseEvent = function (type, e, position, emitter) {
        var mousePosition = position || (0, captor_1.getPosition)(e.touches[0]);
        var mouseEvent = new MouseEvent(type, {
            clientX: mousePosition.x,
            clientY: mousePosition.y,
            altKey: e.altKey,
            ctrlKey: e.ctrlKey,
        });
        (emitter || this.container).dispatchEvent(mouseEvent);
    };
    TouchCaptor.prototype.handleStart = function (e) {
        if (!this.enabled)
            return;
        // Prevent default to avoid default browser behaviors...
        e.preventDefault();
        // ...but simulate mouse behavior anyway, to get the MouseCaptor working as well:
        if (e.touches.length === 1)
            this.dispatchRelatedMouseEvent("mousedown", e);
        var touches = (0, captor_1.getTouchesArray)(e.touches);
        this.isMoving = true;
        this.touchMode = touches.length;
        this.startCameraState = this.renderer.getCamera().getState();
        this.startTouchesPositions = touches.map(captor_1.getPosition);
        this.lastTouchesPositions = this.startTouchesPositions;
        // When there are two touches down, let's record distance and angle as well:
        if (this.touchMode === 2) {
            var _a = __read(this.startTouchesPositions, 2), _b = _a[0], x0 = _b.x, y0 = _b.y, _c = _a[1], x1 = _c.x, y1 = _c.y;
            this.startTouchesAngle = Math.atan2(y1 - y0, x1 - x0);
            this.startTouchesDistance = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
        }
        this.emit("touchdown", (0, captor_1.getTouchCoords)(e));
    };
    TouchCaptor.prototype.handleLeave = function (e) {
        if (!this.enabled)
            return;
        // Prevent default to avoid default browser behaviors...
        e.preventDefault();
        // ...but simulate mouse behavior anyway, to get the MouseCaptor working as well:
        if (e.touches.length === 0 && this.lastTouchesPositions && this.lastTouchesPositions.length) {
            this.dispatchRelatedMouseEvent("mouseup", e, this.lastTouchesPositions[0], document);
            this.dispatchRelatedMouseEvent("click", e, this.lastTouchesPositions[0]);
        }
        if (this.movingTimeout) {
            this.isMoving = false;
            clearTimeout(this.movingTimeout);
        }
        switch (this.touchMode) {
            case 2:
                if (e.touches.length === 1) {
                    this.handleStart(e);
                    e.preventDefault();
                    break;
                }
            /* falls through */
            case 1:
                // TODO
                // Dispatch event
                if (this.isMoving) {
                    var camera = this.renderer.getCamera();
                    var cameraState = camera.getState(), previousCameraState = camera.getPreviousState() || { x: 0, y: 0 };
                    camera.animate({
                        x: cameraState.x + TOUCH_INERTIA_RATIO * (cameraState.x - previousCameraState.x),
                        y: cameraState.y + TOUCH_INERTIA_RATIO * (cameraState.y - previousCameraState.y),
                    }, {
                        duration: TOUCH_INERTIA_DURATION,
                        easing: "quadraticOut",
                    });
                }
                this.isMoving = false;
                this.touchMode = 0;
                break;
        }
        this.emit("touchup", (0, captor_1.getTouchCoords)(e));
    };
    TouchCaptor.prototype.handleMove = function (e) {
        var _a;
        var _this = this;
        if (!this.enabled)
            return;
        // Prevent default to avoid default browser behaviors...
        e.preventDefault();
        // ...but simulate mouse behavior anyway, to get the MouseCaptor working as well:
        if (e.touches.length === 1)
            this.dispatchRelatedMouseEvent("mousemove", e);
        var startCameraState = this.startCameraState;
        var touches = (0, captor_1.getTouchesArray)(e.touches);
        var touchesPositions = touches.map(captor_1.getPosition);
        this.lastTouchesPositions = touchesPositions;
        this.isMoving = true;
        if (this.movingTimeout)
            clearTimeout(this.movingTimeout);
        this.movingTimeout = window.setTimeout(function () {
            _this.isMoving = false;
        }, DRAG_TIMEOUT);
        switch (this.touchMode) {
            case 1: {
                var _b = this.renderer.viewportToFramedGraph((this.startTouchesPositions || [])[0]), xStart = _b.x, yStart = _b.y;
                var _c = this.renderer.viewportToFramedGraph(touchesPositions[0]), x = _c.x, y = _c.y;
                this.renderer.getCamera().setState({
                    x: startCameraState.x + xStart - x,
                    y: startCameraState.y + yStart - y,
                });
                break;
            }
            case 2: {
                /**
                 * Here is the thinking here:
                 *
                 * 1. We can find the new angle and ratio, by comparing the vector from "touch one" to "touch two" at the start
                 *    of the d'n'd and now
                 *
                 * 2. We can use `Camera#viewportToGraph` inside formula to retrieve the new camera position, using the graph
                 *    position of a touch at the beginning of the d'n'd (using `startCamera.viewportToGraph`) and the viewport
                 *    position of this same touch now
                 */
                var newCameraState = {};
                var _d = touchesPositions[0], x0 = _d.x, y0 = _d.y;
                var _e = touchesPositions[1], x1 = _e.x, y1 = _e.y;
                var angleDiff = Math.atan2(y1 - y0, x1 - x0) - this.startTouchesAngle;
                var ratioDiff = Math.hypot(y1 - y0, x1 - x0) / this.startTouchesDistance;
                // 1.
                newCameraState.ratio = startCameraState.ratio / ratioDiff;
                newCameraState.angle = startCameraState.angle + angleDiff;
                // 2.
                var dimensions = this.getDimensions();
                var touchGraphPosition = this.renderer.viewportToFramedGraph((this.startTouchesPositions || [])[0], { cameraState: startCameraState });
                var smallestDimension = Math.min(dimensions.width, dimensions.height);
                var dx = smallestDimension / dimensions.width;
                var dy = smallestDimension / dimensions.height;
                var ratio = newCameraState.ratio / smallestDimension;
                // Align with center of the graph:
                var x = x0 - smallestDimension / 2 / dx;
                var y = y0 - smallestDimension / 2 / dy;
                // Rotate:
                _a = __read([
                    x * Math.cos(-newCameraState.angle) - y * Math.sin(-newCameraState.angle),
                    y * Math.cos(-newCameraState.angle) + x * Math.sin(-newCameraState.angle),
                ], 2), x = _a[0], y = _a[1];
                newCameraState.x = touchGraphPosition.x - x * ratio;
                newCameraState.y = touchGraphPosition.y + y * ratio;
                this.renderer.getCamera().setState(newCameraState);
                break;
            }
        }
        this.emit("touchmove", (0, captor_1.getTouchCoords)(e));
    };
    return TouchCaptor;
}(captor_1.default));
exports.default = TouchCaptor;


/***/ })
/******/ ]);