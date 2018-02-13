/**
 * GEXF Library Node Bindings
 * ===========================
 *
 * Author: PLIQUE Guillaume (Yomguithereal)
 * URL: https://github.com/Yomguithereal/gexf-parser
 * Version: 0.2.3
 */
var DOMParser = require('xmldom').DOMParser,
    DOMImplementation = require('xmldom').DOMImplementation,
    XMLSerializer = require('xmldom').XMLSerializer,
    parser = require('./src/parser.js'),
    writer = require('./src/writer.js');

// Helpers
function isPlainObject(v) {
  return v instanceof Object &&
         !(v instanceof Array) &&
         !(v instanceof Function);
}

function extend() {
  var i,
      k,
      res = {},
      l = arguments.length;

  for (i = l - 1; i >= 0; i--)
    for (k in arguments[i])
      if (res[k] && isPlainObject(arguments[i][k]))
        res[k] = extend(arguments[i][k], res[k]);
      else
        res[k] = arguments[i][k];

  return res;
}

// Namespace
var gexf = {};

Object.defineProperty(gexf, 'version', {
  value: '0.2.3'
});

gexf.parse = function(string) {
  var p = new DOMParser();
  var xml = p.parseFromString(string, 'application/xml');
  return parser.parse(xml);
}

gexf.create = function(params) {

  // Forcing implementation
  return writer.create.call(writer, extend(
    {
      implementation: DOMImplementation.prototype,
      serializer: XMLSerializer
    },
    params
  ));
}

module.exports = gexf;
