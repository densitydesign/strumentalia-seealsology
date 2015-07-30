# strumentalia-Seealsology

Seealsology is simple tool that allows you to explore in a quick and dirty way the semantic area related to any Wikipedia Page.
To make it simple, it extracts all the links in the "[See also](https://en.wikipedia.org/wiki/Wikipedia:Manual_of_Style/Layout#See_also_section)" section producing a graph. 
The tool works currently only for the following versions of Wikipedia: english, french, italian.
Adding other languages requires the identification of the various "See also" sections. Feel free to contribute identifying them and <a href="https://github.com/densitydesign/strumentalia-seealsology/blob/master/app/scripts/controllers/alt.js#L6-L42">proposing new languages via pull requests</a>!</p>

**Try it here: http://tools.medialab.sciences-po.fr/seealsology/**
**or here: http://labs.densitydesign.org/seealsology/**

![Seealsology v2](https://raw.githubusercontent.com/densitydesign/strumentalia-seealsology/master/preview.gif "Seealasology v2")


##Usage

Paste the full link to one or more english Wikipedia articles (one per line).

The "distance" value defines the number of iterations. With distance 1, you'll get the original pages and the ones contained in the "see also" section. 
Increasing the value, the tool will perform the same operation on each retrieved page.

The "Get parents" button makes the tool also look for pages whose "See also" sections contain links towards the pages explored and their children. Note this process is a lot more heavey-demanding for the browser which has to perform many requests to Wikipedia's API, use it with caution and avoid it when crawling at a distance higher than 2.

With the "stop words" field it is possible to define wich pages should be discarded. 
The software will look for each "stop word" in the article title, if there is a match the article will be discarded.

For sanity and performance reasons, results are cached in the browser's localStorage for 24 hours, allowing you to quickly regenerate a previous crawl or restart a canceled one. Click on the "Clear cache" button to reset cache if you feel like results are not in sync with Wikipedia pages.

##Output

While the data collection is performed, results will be displayed as a network graph and printed below as a list. Click on a page's name or node to open the Wikipedia page in another tab.
On the bottom right panel, errors and stopped pages will be printed.

If the crawl raises really too many pages and you cannot wait, you can stop it using the Stop button.

Alternatively, you can look for more connections by adding new seeds from the graph using Ctrl+click on a node.

A "Download" button will allow you to download the results.
Three formats are available:
* **TSV.** A tab-separated table, easily editable in Libreoffice, Google Sheets, Excel. In the table, each line represent a connection from the source article to one target article cited in the "see also" section. The table contains three columns. "Source" contains the analyzed articles. "Target" contains the collected ones. "Level" is the distance from the original node.
* **JSON.** The network described as object. It is compatible both with [D3.js](http://bl.ocks.org/mbostock/4062045) and [sigma.js](http://sigmajs.org/).
It contains two arrays of objects: the first one containing nodes, the second one containing edges. Each node and edge is defined as an object.
* **GEXF.** The network in [XML-compliant format](http://gexf.net/format/), easily importable in [Gephi](http://gephi.github.io/) or [Manylines](http://tools.medialab.sciences-po.fr/manylines), opensource tools for network visualization.

##Installation

First install nodeJs, then run from Seealsology's root directory:

```bash
npm install
sudo npm install -g bower
bower install
```

To serve a development instance:
```bash
grunt serve
```

Or to build a static instance for a production server:
```bash
grunt build
```
and serve the `dist` directory to whatever path you like with your favorite server software.
