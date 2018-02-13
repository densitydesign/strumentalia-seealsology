[![Build Status](https://travis-ci.org/Yomguithereal/gexf.svg)](https://travis-ci.org/Yomguithereal/gexf)

# GEXF JavaScript Library

## Description
This gexf library is designed to parse and write [gexf](http://gexf.net/format/) files. It can be used either client-side or with node.

It was originally developed to be used with [sigma](https://github.com/jacomyal/sigma.js) and can be compiled as a [sigma plugin](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.parsers.gexf).

## Summary

* [Usage](#usage)
  * [Client-side](#client-side)
  * [Node.js](#nodejs)
* [Build](#build)
* [Output data](#output-data)
* [Writer](#writer)

## Usage

### Client-side
The gexf can either be used to fetch and parse the .gexf file or just to parse it if you want to fetch it by your own means. The parser adds a `gexf` variable to your global scope so you can use it.

**Fetching and parsing**
```js
// Synchronously fetch the gexf file and parse it
var graph = gexf.fetch('/url/to/file.gexf');

// Asynchronously fetch the gexf file and parse it
gexf.fetch('/url/to/file.gexf', function(graph) {
  console.log(graph);
});
```

**Parsing only**

If you want to fetch the gexf yourself, you can still parse the graph by providing a javascript DOM object to the parser (an ajax XML response or a parsed string, for instance).
```js
// Converting a string to a DOM object
var gexf_dom = new DOMParser().parseFromString(gexf_string, "application/xml");

// Parsing the gexf
var graph = gexf.parse(gexf_dom);
```

**Writing**

For more precisions, refer to the [writer](#writer) section of the current documentation.

```js
var myGexf = gexf.create([params]);
```

###Node.js

**Installation**
```
# For the latest released version
npm install gexf

# For the development version
npm install git+https://github.com/Yomguithereal/gexf.git
```

**Parsing**
```js
var fs = require('fs'),
    gexf = require('gexf');

// Reading your gexf file
var gexf_file = fs.readFileSync('/path/to/your.gexf', 'utf-8');

// Parsing it
var graph = gexf.parse(gexf_file);
```

**Writing**

For more precisions, refer to the [writer](#writer) section of the current documentation.

```js
var gexf = require('gexf');

var myGexf = gexf.create([params]);
```

## Build
If you want to build the minified client version, clone this repo and launch the build task.

```bash
git clone git@github.com:Yomguithereal/gexf.git
cd gexf
npm install
gulp build
```

## Output Data
The following example shows what the parser is able to output given a gexf file.

```js
{
  version: "1.0.1",
  meta: {
    creator: "Yomguithereal",
    lastmodifieddate: "2010-05-29+01:27",
    title: "A random graph"
  },
  defaultEdgeType: "directed",
  model: [
    {
      id: "authority",
      type: "float",
      title: "Authority"
    },
    {
      id: "name",
      type: "string",
      title: "Author's name"
    }
  ],
  nodes: [
    {
      id: "0",
      label: "Myriel",
      attributes: {
        authority: 10.43,
        name: "Myriel Dafault"
      },
      viz: {
        color: "rgb(216,72,45)",
        size: 22.4,
        position: {
          x: 234,
          y: 23,
          z: 0
        }
      }
    },
    {
      id: "1",
      label: "Jean",
      attributes: {
        authority: 2.43,
        name: "Jean Daguerre"
      },
      viz: {
        color: "rgb(255,72,45)",
        size: 21.4,
        position: {
          x: 34,
          y: 23,
          z: 0
        }
      }
    }
  ],
  edges: [
    {
      id: "0",
      source: "0",
      target: "1",
      type: "directed",
      weight: 1,
      viz: {
        shape: "dotted"
      }
    }
  ]
}
```

## Writer

Note that the data format expected by the writer is exactly the same as the one outputted by the parser.

This means that theoritically - i.e. "if I did my job correctly" - you can give the result graph from parsing a gexf file and give it to the writer to create an identical file.

### Instantiation

To create a writer instance, just do the following:

```js
var myGexf = gexf.create([params]);
```

*Parameters*

Possible parameters are:

* **meta** *?object*: an object of metadata for the graph.
* **defaultEdgeType** *?string* [`'undirected'`]: default edge type.
* **encoding** *?string* [`'UTF-8'`]: encoding of the XML file.
* **mode** *?string*: mode of the graph. `static` or `dynamic` for instance.
* **models** *?object*: an object containing the models of the nodes and/or edges.
  * **node** *?array*: array of node possible attributes. see [output data](#output-data) for precisions.
  * **edge** *?array*: array of edge possible attributes. see [output data](#output-data) for precisions.
* **nodes** *?array*: array of nodes to pass at instantiation time.
* **edges** *?array*: array of edges to pass at instantiation time.
* **implementation** *?DOMImplementation*: the DOM implementation to build the XML document. Will take the browser's one by default of xmldom's one in node.
* **serializer** *?XMLSerializer*: the XMLSerializer class to serialize the XML document. Will default to the browser's one or xmldom's one in node.
* **namespace** *?string* [`'http://www.gexf.net/1.2draft'`]: gexf XML namespace to use.
* **vizNamespace** *?string* [`'http:///www.gexf.net/1.2draft/viz'`]: gexf viz XML namespace to use.
* **version** *?string* [`'1.2'`]: version of gexf to produce.

### Methods

*addNode*

Adding a single node to the gexf document.

```js
myGexf.addNode({
  id: 'n01',
  label: 'myFirstNode',
  attributes: {
    name: 'John',
    surname: 'Silver'
  },
  viz: {
    color: 'rgb(255, 234, 45)'
  }
});
```

*addEdge*

Adding a single edge to the gexf document.

```js
myGexf.addEdge({
  id: 'e01',
  source: 'n01',
  target: 'n02',
  attributes: {
    predicate: 'LIKES'
  },
  viz: {
    thickness: 34
  }
});
```

*setMeta*

Same as passing a `meta` parameter at instantiation.

*setNodeModel*

Same as passing a `models.node` parameter at instantiation.

*setEdgeModel*

Same as passing a `models.edge` parameter at instantiation.

*addNodeAttribute*

Add a single node attribute definition to the node model.

*addEdgeAttribute*

Add a single edge attribute definition to the edge model.

*serialize*

Produce the string representation of the gexf document.

### Retrieving the gexf

```js
// As a document
var doc = myGexf.document;

// As a string
var string = myGexf.serialize();
```

## Contribution
Please feel free to contribute. To set up the dev environment you should have **nodejs**, **npm** and **gulp** installed.

```bash
git clone git@github.com:Yomguithereal/gexf.git
cd gexf
npm install
```

Be sure to add relevant unit tests and pass the linter before submitting any change to the library.

```bash
npm test
```
