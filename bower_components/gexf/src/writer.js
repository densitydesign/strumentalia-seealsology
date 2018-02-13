;(function(document, undefined) {
  'use strict';

  /**
   * GEXF Writer
   * ============
   *
   * Author: PLIQUE Guillaume (Yomguithereal)
   * URL: https://github.com/Yomguithereal/gexf-parser
   * Version: 0.2.3
   */

  /**
   * Constants
   */
  var TYPES = [
    'integer',
    'long',
    'double',
    'float',
    'boolean',
    'liststring',
    'string',
    'anyURI'
  ];

  /**
   * Helpers
   */
  function cast(type, value) {

    switch (type) {
      case 'boolean':
      case 'integer':
      case 'long':
      case 'float':
      case 'double':
        return '' + value;

      case 'liststring':
        if (value instanceof Array)
          return value.join('|');
    }

    if (typeof value === 'object')
      throw Error('gexf.writer.cast: trying to cast an object to a string.');

    return value;
  }

  function parseColor(val) {
    var result = [0, 0, 0];

    if (val.match(/^#/)) {
      val = (val || '').replace(/^#/, '');
      result = (val.length === 3) ?
        [
          parseInt(val.charAt(0) + val.charAt(0), 16),
          parseInt(val.charAt(1) + val.charAt(1), 16),
          parseInt(val.charAt(2) + val.charAt(2), 16)
        ] :
        [
          parseInt(val.charAt(0) + val.charAt(1), 16),
          parseInt(val.charAt(2) + val.charAt(3), 16),
          parseInt(val.charAt(4) + val.charAt(5), 16)
        ];
    } else if (val.match(/^ *rgba? *\(/)) {
      val = val.match(
        /^ *rgba? *\( *([0-9]*) *, *([0-9]*) *, *([0-9]*) *(,.*)?\) *$/
      );
      result = [
        +val[1],
        +val[2],
        +val[3]
      ];

      if (val[4])
        result.push(+val[4].replace(', ', ''));
    }

    return result;
  }


  /**
   * Main object
   */
  function Gexf(params) {
    params = params || {};

    var implementation = params.implementation || document.implementation;

    // Serializer?
    this.serializer = params.serializer ?
      new params.serializer() :
      new XMLSerializer();

    // Creating document
    this.document = implementation.createDocument(
      'http://www.gexf.net/1.2draft',
      'gexf',
      null
    );
    this.root = this.document.documentElement;

    // Assigning namespaces
    // TODO: version here also
    this.xmlns = params.namespace || 'http://www.gexf.net/1.2draft';
    this.vizXmlns = params.vizNamespace || 'http:///www.gexf.net/1.2draft/viz';
    this.root.setAttribute('xmlns',
      this.xmlns);
    this.root.setAttribute('xmlns:xsi',
      'http://www.w3.org/2001/XMLSchema-instance');
    this.root.setAttribute('xsi:schemaLocation',
      'http://www.gexf.net/1.2draft http://www.gexf.net/1.2draft/gexf.xsd');

    this.hasViz = false;

    // Version
    this.root.setAttribute('version', params.version || '1.2');

    // Encoding
    this.encoding = params.encoding || 'UTF-8';

    // Metas
    if (params.meta)
      this.setMeta(params.meta);

    // Graph
    this.graph = this.createElement('graph', {
      defaultedgetype: params.defaultEdgeType || 'undirected',
      mode: params.mode
    });
    this.root.appendChild(this.graph);

    // Model
    this.models = {
      node: {},
      edge: {}
    };

    this.nodeAttributes = null;
    this.edgeAttributes = null;

    if (params.models && params.models.node)
      this.setNodeModel(params.models.node);
    if (params.models && params.models.edge)
      this.setEdgeModel(params.models.edge);

    // Nodes & Edges
    this.nodes = this.createElement('nodes');
    this.edges = this.createElement('edges');

    this.graph.appendChild(this.nodes);
    this.graph.appendChild(this.edges);

    var i,
        l;

    if (params.nodes) {
      for (i = 0, l = params.nodes.length; i < l; i++)
        this.addNode(params.nodes[i]);
    }

    if (params.edges) {
      for (i = 0, l = params.edges.length; i < l; i++)
        this.addEdge(params.edges[i]);
    }
  }

  /**
   * Prototype
   */
  Gexf.prototype.createElement = function(tag, value, attributes) {
    if (!tag)
      throw Error('gexf.writer.createElement: wrong arguments.');

    if (typeof value === 'object') {
      attributes = value;
      value = null;
    }

    var node = this.document.createElement(tag);

    if (value) {
      var text = this.document.createTextNode(value);
      node.appendChild(text);
    }

    if (attributes)
      for (var k in attributes)
        if (typeof attributes[k] !== 'undefined' && attributes[k] !== null)
          node.setAttribute(k, attributes[k]);

    return node;
  };

  Gexf.prototype.setMeta = function(o) {
    o = o || {};

    var meta = this.document.createElement('meta'),
        m,
        n,
        t;

    for (m in o) {
      if (m === 'lastmodifieddate') {
        meta.setAttribute('lastmodifieddate', o[m]);
      }
      else {
        meta.appendChild(this.createElement(m, o[m]));
      }
    }

    // Appending meta to document
    this.root.appendChild(meta);

    return this;
  };

  Gexf.prototype.setModel = function(cls, model) {
    model = model || [];

    if (cls !== 'node' && cls !== 'edge')
      throw Error('gexf.writer.setModel: wrong model cls "' + cls + '"');

    if (!(model instanceof Array))
      throw Error('gexf.writer.setModel: model is not a valid array.');

    // Reset model
    this.models[cls] = {};

    // Adding the attributes
    var attributes = this.createElement('attributes', {class: cls});

    // Checking whether the model is to be reset
    var prop = cls + 'Attributes';

    if (this[prop])
      this.graph.removeChild(this[prop]);

    this[prop] = attributes;

    this.graph.insertBefore(attributes, this.nodes || this.edges);

    // Creating attribute nodes
    var i,
        l;

    for (i = 0, l = model.length; i < l; i++)
      this.addAttribute(cls, model[i]);

    return this;
  };

  Gexf.prototype.setNodeModel = function(model) {
    return this.setModel('node', model);
  };

  Gexf.prototype.setEdgeModel = function(model) {
    return this.setModel('edge', model);
  };

  Gexf.prototype.addAttribute = function(cls, def) {

    if (cls !== 'node' && cls !== 'edge')
      throw Error('gexf.writer.addAttribute: wrong model cls "' + cls + '"');

    if (!def)
      throw Error('gexf.writer.addAttribute: wrong arguments.');

    if (!this[cls + 'Attributes'])
      return this.setModel(cls, [def]);

    var type = def.type || 'string';

    if (!~TYPES.indexOf(type))
      throw Error('gexf.writer.addAttribute: unknown attribute type "' + type + '"');

    // Adding to model
    this.models[cls][def.id] = def;

    var attribute = this.createElement('attribute', {
      id: def.id,
      title: def.title,
      type: type
    });

    // Default value?
    if (typeof def.defaultValue !== 'undefined') {
      var defaultValue = this.createElement('default', def.defaultValue);
      attribute.appendChild(defaultValue);
    }

    this[cls + 'Attributes'].appendChild(attribute);
    return this;
  };

  Gexf.prototype.addNodeAttribute = function(def) {
    return this.addAttribute('node', def);
  };

  Gexf.prototype.addEdgeAttribute = function(def) {
    return this.addAttribute('edge', def);
  };

  Gexf.prototype.addNode = function(n) {
    var k,
        a,
        m;

    if (typeof n.id === 'undefined' || n.id === null)
      throw Error('gexf.writer.addNode: inexistent id.');

    // Creating element
    var node = this.createElement('node', {
      id: n.id,
      label: n.label
    });

    // Attributes
    if (n.attributes && Object.keys(n.attributes).length > 0) {
      var attvalues = this.createElement('attvalues');

      for (k in n.attributes || {}) {
        a = n.attributes[k];
        m = this.models.node[k];

        if (!m)
          throw Error('gexf.writer.addNode: property "' + k + '" not registered in node model.');

        var attvalue = this.createElement('attvalue', {
          'for': m.id,
          value: cast(m.type, a)
        });

        attvalues.appendChild(attvalue);
      }

      node.appendChild(attvalues);
    }

    // Viz
    if (n.viz) {

      if (!this.hasViz) {
        this.hasViz = true;
        this.root.setAttribute('xmlns:viz', this.vizXmlns);
      }

      if (n.viz.color) {
        var rgba = parseColor(n.viz.color);

        var color = this.createElement('viz:color', {
          r: rgba[0],
          g: rgba[1],
          b: rgba[2],
          a: rgba[3]
        });

        node.appendChild(color);
      }

      if (n.viz.position) {
        var position = this.createElement('viz:position', {
          x: n.viz.position.x,
          y: n.viz.position.y,
          z: n.viz.position.z
        });

        node.appendChild(position);
      }

      if (n.viz.size) {
        var size = this.createElement('viz:size', {
          value: n.viz.size
        });

        node.appendChild(size);
      }

      if (n.viz.shape) {
        var shape = this.createElement('viz:shape', {
          value: n.viz.shape
        });

        node.appendChild(shape);
      }
    }

    // Appending node
    this.nodes.appendChild(node);
    return this;
  };

  Gexf.prototype.addEdge = function(e) {
    var k,
        a,
        m;

    // Creating element
    var edge = this.createElement('edge', {
      id: e.id,
      label: e.label,
      weigth: e.weight,
      type: e.type,
      source: e.source,
      target: e.target
    });

    // Attributes
    if (e.attributes && Object.keys(e.attributes).length > 0) {
      var attvalues = this.createElement('attvalues');

      for (k in e.attributes || {}) {
        a = e.attributes[k];
        m = this.models.edge[k];

        if (!m)
          throw Error('gexf.writer.addEdge: property "' + k + '" not registered in edge model.');

        var attvalue = this.createElement('attvalue', {
          'for': m.id,
          value: cast(m.type, a)
        });

        attvalues.appendChild(attvalue);
      }

      edge.appendChild(attvalues);
    }

    // Viz
    if (e.viz) {

      if (!this.hasViz) {
        this.hasViz = true;
        this.root.setAttribute('xmlns:viz', this.vizXmlns);
      }

      if (e.viz.color) {
        var rgba = parseColor(e.viz.color);

        var color = this.createElement('viz:color', {
          r: rgba[0],
          g: rgba[1],
          b: rgba[2],
          a: rgba[3]
        });

        edge.appendChild(color);
      }

      if (e.viz.shape) {
        var shape = this.createElement('viz:shape', {
          value: e.viz.shape
        });

        edge.appendChild(shape);
      }

      if (e.viz.thickness) {
        var thickness = this.createElement('viz:thickness', {
          value: e.viz.shape
        });

        edge.appendChild(thickness);
      }
    }

    // Appending edge
    this.edges.appendChild(edge);
    return this;
  };

  Gexf.prototype.serialize = function() {
    return '<?xml version="1.0" encoding="' + this.encoding +'"?>' +
      this.serializer.serializeToString(this.document);
  };

  /**
   * Public interface
   * -----------------
   */
  function create(params) {
    return new Gexf(params);
  }

  /**
   * Exporting
   * ----------
   */
  var gexf = {

    // Functions
    create: create,

    // Version
    version: '0.2.3'
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports)
      exports = module.exports = gexf;
    exports.gexf = gexf;
  }
  else if (typeof define === 'function' && define.amd) {
    define('gexf', [], function() {
      return gexf;
    });
  }
  else {

    if (typeof this.gexf !== 'undefined') {

      // Extending
      this.gexf.create = create;
    }
    else {

      // Creating
      this.gexf = gexf;
    }
  }

}).call(this, 'document' in this ? this.document : {});
