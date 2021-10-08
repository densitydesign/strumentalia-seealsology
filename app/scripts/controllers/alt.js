//TODO:
// - handle redirects (example https://en.wikipedia.org/wiki/Bangladesh_National_Party to https://en.wikipedia.org/wiki/Bangladesh_Nationalist_Party )
// - button to hide leaves nodes

'use strict';

angular.module('wikiDiverApp')
    .controller('AltCtrl', function ($scope, $http, $log, $timeout, $interval, $window) {

        var languages = {
          en: {
            name: 'english',
            seeAlso: ['See also'],
            stopWords: [
              'list of',
              'index of',
              'categories of',
              'portal',
              'disambiguation',
              'outline of'
            ]
          },
          fr: {
            name: 'french',
            seeAlso: ['Voir aussi', 'Articles connexes'],
            stopWords: [
              'liste d',
              'index d',
              'catégories d',
              'portail',
              'désambiguïsation',
              'résumé d',
              'Catégorie:',
              'Fichier:'
            ]
          },
          es: {
            name: 'spanish',
            seeAlso: ['Véase también'],
            stopWords: [
              'Ayuda:',
              'Anexo:'
            ]
          },
          it: {
            name: 'italian',
            seeAlso: ['Voci correlate', 'Vedi anche'],
            stopWords: [
              'Portale:',
              'Categoria:'
            ]
          },
          de: {
            name: 'german',
            seeAlso: ['Siehe auch'],
            stopWords: [
              'Liste von',
              'Liste der',
              'Portal',
              'Begriffsklärung',
              'Kategorie:',
              'Diskussion:',
              'Datei:'
            ]
          },
          ta: {
            name: 'tamil',
            seeAlso: ['மேலும் பார்க்க', 'மேலும் பார்க்கவும்', 'மேலும் காண்க'],
            stopWords: [
              'பட்டியல்',
              'வலைவாசல்',
              'பக்கவழிமாற்றுப் பக்கம்',
            ]
          },
          et: {
            name: 'estonian',
            seeAlso: ['Vaata ka'],
            stopWords: [
              'loend',
              'täpsustus',
              'Portaal:',
              'Kategooria:',
              'Arutelu:',
              'Fail:'
            ]
          },
          pt: {
            name: 'portuguese',
            seeAlso: ['Ver também'],
            stopWords: [
              'lista d',
              'Categoria:',
              'Portal:',
              'desambiguação',
              'resumo d',
              'File:'
            ]
          },
          pl: {
            name: 'polish',
            seeAlso: ['Zobacz też'],
            stopWords: [
                'przypisy',
                'kategoria',
                'dyskusja',
                'linki zewnętrzne',
                'pomoc'
            ]
          },
          da: {
            name: 'danish',
            seeAlso: ['Se også'],
            stopWords: [
              'liste af',
              'Kategori:',
              'Portal:',
              'Fil:'
            ]
          }
        };
        $scope.supportedLanguages = Object.keys(languages).map(function(l){ return languages[l].name; }).sort().join(', ');

        $scope.stopWords = [
          'Wikipedia:',
          'Category:',
          'File:',
          'Help:',
          'Talk:',
          'Template:',
          'wikisource:',
          'Commons:'
        ];

        $scope.query = '';
        $scope.depth = 2;
        $scope.getParents = false;
        $scope.getAllLinks = false;
        $scope.maxQueries = 5;
        $scope.cacheHours = 24;
        $scope.network = undefined;
        $scope.layout = undefined;
        $scope.sigma = undefined;
        $scope.started = false;
        $scope.colors = ['#de2d26', '#fc9272', '#081d58','#253494','#225ea8','#1d91c0','#41b6c4','#7fcdbb','#c7e9b4','#edf8b1','#ffffd9'];

        $scope.example = 'https://en.wikipedia.org/wiki/Data_visualization\nhttps://en.wikipedia.org/wiki/Digital_humanities';
        $scope.setExample = function(){
            $scope.query = $scope.example;
            $scope.depth = 3;
            $scope.getParents = false;
        };

        $scope.osSpecialClick = (~$window.navigator.userAgent.toLowerCase().search(/\bmac\s*os/i) ? 'Cmd' : 'Ctrl');
        $scope.init = function(){
            $('#edges, .stopped ul, .notFound ul, #warning').empty();
            $scope.lang = '';
            $scope.alert = false;
            $scope.stopped = false;
            $scope.notFound = [];
            $scope.stoppedPages = [];
            $scope.parentsPending = 0;
            $scope.pending = 0;
            $scope.resolved = 0;
            $scope.queue = [];
            $scope.edgesQueue = [];
            $scope.running = 0;
        };
        $scope.init();

        $scope.cacheLinks = {};
        var yest = Math.floor(new Date() / 1000) - $scope.cacheHours * 3600;
        try {
            Object.keys(localStorage).forEach(function(k){
                if (k.indexOf('seeAlsology-update-') !== 0) return;
                var p = k.replace('seeAlsology-update-', 'seeAlsology-'),
                    u = p.replace('seeAlsology-', '');
                if (parseInt(localStorage.getItem(k)) < yest){
                    localStorage.removeItem(k);
                    localStorage.removeItem(p);
                } else $scope.cacheLinks[u] = localStorage.getItem(p).split('|');
            });
        } catch(e){}
        $scope.cacheLinksEmpty = !Object.keys($scope.cacheLinks).length;

        function cache(pageLink, links){
            var prefixedPage = ($scope.getAllLinks ? "ALL-" : "") + pageLink;
            links = links || [];
            $scope.cacheLinks[prefixedPage] = links;
            $scope.cacheLinksEmpty = false;
            try {
                localStorage.setItem('seeAlsology-' + prefixedPage, links.join('|'));
                localStorage.setItem('seeAlsology-update-' + prefixedPage, Math.floor(new Date() / 1000));
            } catch(e){}
        }

        $scope.clearCache = function(){
            Object.keys(localStorage).forEach(function(k){
                localStorage.removeItem(k);
            });
            $scope.cacheLinks = {};
            $scope.cacheLinksEmpty = true;
        };

        $scope.toggleParents = function(){
            if ($scope.working()) return;
            $scope.getParents = !$scope.getParents;
        };

        $scope.toggleAllLinks = function(){
            if ($scope.working()) return;
            $scope.getAllLinks = !$scope.getAllLinks;
        };

        $scope.startCrawl = function(){
            $log.debug('starting crawling for', $scope.query.split('\n').length, 'pages');
            $scope.init();
            $scope.started = true
            $scope.doneParents = {};
            $scope.edgesIndex = {};

            // Validate inputs before starting process
            if ($scope.validate()) {

                $scope.stopLayout();
                if ($scope.sigma) $scope.sigma.kill();
                $scope.network = new Graph({type: 'directed', allowSelfLoops: false});

                // Scroll down to viz
                $timeout(function(){
                    $scope.initSigma();
                    $window.scrollTo(0, document.getElementById('crawl-button').offsetTop - 12);
                }, 750);

                // Start crawl on pages from query
                $timeout(function(){
                    $scope.validPages.forEach(function(e){
                        getRelatives(e, 0, true);
                    });
                }, 200);
            }


        };


        $scope.stopLayout = function(){
            if ($scope.layout) $scope.layout.kill()
        }

        $scope.startLayout = function(){
            $scope.stopLayout();
            $scope.layout = new ForceAtlas2Layout($scope.network, {
              settings: {
                barnesHutOptimize: $scope.network.order >= 1000,
                strongGravityMode: true,
                gravity: 0.1,
                scalingRatio: 10,
                slowDown: 15
              }
            }).start();
        }

        // These functions will be initialized at Sigma creation
        $scope.zoomIn = function(){}
        $scope.zoomOut = function(){}
        $scope.resetCamera = function(){}

        $scope.$on("$destroy", function(){
            $scope.layout.kill()
        })

        $scope.initSigma = function(){

            var container = document.getElementById('sigma');
            if (!container) return;

            $scope.sigma = new Sigma.Sigma($scope.network, container, {
              labelRenderedSizeThreshold: -Infinity,
              labelDensity: 0.1,
              labelGridCellSize: 150
            })

            // Zoom buttons
            $scope.zoomIn = function(){
              var camera = $scope.sigma.getCamera()
              camera.animatedZoom()
            }

            $scope.zoomOut = function(){
              var camera = $scope.sigma.getCamera()
              camera.animatedUnzoom()
            }

            $scope.resetCamera = function(){
              var camera = $scope.sigma.getCamera()
              camera.animate({ratio: 1, x: 0.5, y: 0.5})
            }

            // Links to wikipages on click graph nodes
            $scope.sigma.on('clickNode', function(e, a, b, c, d){
              console.log("CLICK", e)
              $timeout(function(){
                var link = wikiLink($scope.network.getNodeAttribute(e.node, 'label'));
                if (!e.captor.ctrlKey && !e.captor.metaKey)
                    return $window.open(link, '_blank');
                // add seed when double click ongraph nodes
                if ($scope.network.getNodeAttribute(e.node, 'seed')) return;
                var link = wikiLink($scope.network.getNodeAttribute(e.node, 'label'));
                $scope.query += '\n' + link;
                $scope.network.setNodeAttribute(e.node, 'seed', true)
                $scope.network.setNodeAttribute(e.node, 'color', $scope.colors[0])
                $scope.stopped = false;
                getRelatives(link, 0, true);
              }, 10);
            });

            // Draw sigma legend
            $('.sigma-legend').empty();
            $scope.colors.slice(0, $scope.depth+3)
              .forEach(function(c, i){
                $('.sigma-legend').append(
                  '<span>' +
                     '<div style="background-color: ' + c + '"></div>' +
                    '&nbsp;&nbsp;' + (i ? 'level ' + (i-2) : 'seeds') +
                  '</span>'
                );
              });

            $timeout(function() { $scope.startLayout(true); }, 250);
        };

        $scope.validate = function(){
            if ($scope.alert && $scope.alert.indexOf('collecting') !== 0)
                $scope.alert = false;
            $scope.missingLang = false;

            // Check query
            if (!$scope.query.trim()){
                checkParentsDepth();
                if (!$scope.alert)
                    $scope.alert = 'please enter at least one wikipedia page';
                return false;
            }

            var regex = /https?:\/\/([a-z]+)\.wikipedia\.org\/wiki\/.+/i,
                testUrl = null,
                listOfPages = $scope.query.split('\n'),
                lang = '',
                langs = [],
                errors = [];

            // check for integrity
            $scope.validPages = listOfPages.filter(function(d) {
                if (!d.trim()) return false;
                testUrl = d.match(regex);
                if (!testUrl) {
                    errors.push(d);
                    return false;
                }
                lang = testUrl[1].toLowerCase();
                if (langs.indexOf(lang) === -1)
                    langs.push(lang);
                return true;
            });

            if (errors.length)
                $scope.alert = 'these are not valid wikipedia pages: ' + errors.join(' &nbsp;&nbsp;&nbsp; ');
            else if (langs.length > 1)
                $scope.alert = 'please enter wikipedia pages from the same language (you gave pages from ' + langs.join(', ') + ')';
            else if (!languages[lang]) {
                $scope.missingLang = true;
                $scope.alert = lang + ' language is not supported yet, we do not know which section to look for as a "See also", neither which default stop-words to apply.';
            } else {
                checkParentsDepth();
                $scope.lang = langs[0];
                var curSW = $scope.stopWords.map(function(s){ return s.text; });
                languages[lang].stopWords.forEach(function(s){
                    if (curSW.indexOf(s) === -1)
                        $scope.stopWords.push({text: s});
                });
                return true;
            }
            return false;
        };

        function checkParentsDepth(){
            if ($scope.getParents && $scope.depth > 2)
                $scope.alert = 'collecting parent links when crawling at a high depth can take a very long time';
            else $scope.alert = false;
        }

        $scope.$watchCollection('query', function(newV, oldV){
            if (newV !== oldV) $scope.validate();
        });
        $scope.$watchCollection('[getParents, depth]', function(newV, oldV){
            if (newV === oldV || ($scope.alert && $scope.alert.indexOf('collecting') !== 0)) return;
            checkParentsDepth();
        });

        function linkToTitle(t){
            return decodeURIComponent(t).replace(/_/g, ' ');
        }
        function titleToLink(t){
            return encodeURIComponent(t.replace(/ /g, '_'));
        }
        function wikiLink(t){
            return 'https://' + $scope.lang + '.wikipedia.org/wiki/' + titleToLink(t);
        }
        function discreetLink(t){
            return '<a class="discreet" target="_blank" href="' + wikiLink(t) + '">' + t + '</a>';
        }

        // Filter links to pages matching stopWords
        function filterStopWords(links){
            return links.map(function(l){
                return l.replace(/#.*$/, '');
            }).filter(function(l){
                if ($scope.stopWords.some(function(s){
                    return l.toLowerCase().indexOf(s.text.toLowerCase()) !== -1;
                })) {
                    if ($scope.stoppedPages.indexOf(l) === -1){
                        $scope.stoppedPages.push(l);
                        $('.stopped ul').append('<li>' + discreetLink(l) + '</li>');
                    }
                    return false;
                } else return !!l.trim();
            });
        }

        // Declare when page not found or section "SeeAlso" misses
        function notFound(pageLink, updateResolved){
            cache(pageLink, ['#NOT-FOUND#']);
            var title = linkToTitle(pageLink);
            if ($scope.notFound.indexOf(title) === -1 && updateResolved){
                $scope.notFound.push(title);
                $('.notFound ul').append('<li>' + discreetLink(title) + '</li>');
            }
            if (updateResolved) $scope.resolved++;
            else if ($scope.parentsPending)
                $scope.parentsPending--;
            if ($scope.running)
                $scope.running--;
        }

        // Parse a page's SeeAlso section from API
        function parseAPISection(section, i, pageLink, updateResolved, callback, retries){
            if (retries === undefined) retries = 3;
            if (i){
                if (updateResolved)
                    $scope.pending++;
                else $scope.parentsPending++;
            }
            $http.jsonp('//' + $scope.lang + '.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&titles='+ pageLink +'&rvprop=content&rvsection='+ section.index +'&redirects&callback=JSON_CALLBACK')
            .success(function(linksData){
                if (!linksData.query) return notFound(pageLink, updateResolved);
                // Collect links from the section content
                var o = linksData.query.pages[Object.keys(linksData.query.pages)[0]].revisions[0]['*'],
                    linksRegex = /\[\[(.*?)\]\]/g,
                    matches = linksRegex.exec(o),
                    links = [];
                while (matches){
                    links.push(matches[1].split('|')[0]);
                    matches = linksRegex.exec(o);
                }
                cache(pageLink, links);
                $timeout(function(){ callback(filterStopWords(links)); }, 10);
            }).error(function(dta, status, hdrs, cfg){
                if (retries == 0) {
                    $log.error('Could not get content of SeeAlso section from API for', pageLink, 'with status', status, cfg.url, dta, hdrs, cfg);
                    notFound(pageLink, updateResolved);
                } else $timeout(function(){
                    parseAPISection(section, i, pageLink, updateResolved, callback, retries-1);
                }, 250);
            });
        }

        // Grab a page's SeeAlso links
        function downloadPageSeeAlsoLinks(pageLink, callback, updateResolved, retries){
            if (retries === undefined) retries = 3;
            // Use existing cache
            var prefixedPage = ($scope.getAllLinks ? "ALL-" : "") + pageLink;
            if ($scope.cacheLinks[prefixedPage]) {
                if ($scope.cacheLinks[prefixedPage][0] === '#NOT-FOUND#')
                    notFound(pageLink, updateResolved);
                else $timeout(function() { callback(filterStopWords($scope.cacheLinks[prefixedPage])); }, 10);

            // or find the page's SeeAlso section from API
            } else $http.jsonp('//' + $scope.lang + '.wikipedia.org/w/api.php?action=parse&page=' + pageLink + '&prop=sections&format=json&redirects&callback=JSON_CALLBACK')
            .success(function(data){
                if (!data.parse) return notFound(pageLink, updateResolved);

                var sections = data.parse.sections.filter(function(s){
                    return languages[$scope.lang].seeAlso.map(function(s){
                        return s.toLowerCase();
                    }).indexOf(s.line.toLowerCase()) !== -1;
                });
                if (!sections.length) return notFound(pageLink, updateResolved);

                sections.forEach(function(section, i){
                    parseAPISection(section, i, pageLink, updateResolved, callback);
                });
            }).error(function(dta, status, hdrs, cfg){
                if (retries == 0) {
                    $log.error('Could not get sections from API for', pageLink, 'with status', status, cfg.url, dta, hdrs, cfg);
                    notFound(pageLink, updateResolved);
                } else $timeout(function(){
                    downloadPageSeeAlsoLinks(pageLink, callback, updateResolved, retries-1);
                }, 250);
            });
        }

        // Grab a page's wiki links
        function downloadPageAllLinks(pageLink, callback, updateResolved, retries){
            if (retries === undefined) retries = 3;
            var cachePage = $scope.cacheLinks["ALL-" + pageLink];
            // Use existing cache
            if (cachePage) {
                if (cachePage[0] === '#NOT-FOUND#')
                    notFound(pageLink, updateResolved);
                else $timeout(function() { callback(filterStopWords(cachePage)); }, 10);

            // or find the page's SeeAlso section from API
            } else $http.jsonp('//' + $scope.lang + '.wikipedia.org/w/api.php?action=parse&page=' + pageLink + '&prop=links&format=json&redirects&callback=JSON_CALLBACK')
            .success(function(data){
                if (!data.parse) return notFound(pageLink, updateResolved);

                var links = data.parse.links.map(function(l){ return l['*']; });
                if (!links.length) return notFound(pageLink, updateResolved);
                cache(pageLink, links);
                $timeout(function(){ callback(filterStopWords(links)); }, 10);
            }).error(function(dta, status, hdrs, cfg){
                if (retries == 0) {
                    $log.error('Could not get links from API for', pageLink, 'with status', status, cfg.url);
                    notFound(pageLink, updateResolved);
                } else $timeout(function(){
                    downloadPageAllLinks(pageLink, callback, updateResolved, retries-1);
                }, 250);
            });
        }

        // Add a page to the corpus
        function addNode(pageName, level, seed, parentNode){
            var pageId = pageName.toLowerCase();
            if (parentNode) parentNode = parentNode.toLowerCase();
            var existingNode = $scope.network.hasNode(pageId),
                existingParent = $scope.network.hasNode(parentNode),
                isSeed = (existingNode && $scope.network.getNodeAttribute(pageId, 'seed')) || !!seed;
            if (existingNode){
                $scope.network.setNodeAttribute(pageId, 'level', Math.min(level, $scope.network.getNodeAttribute(pageId, 'level')));
                $scope.network.setNodeAttribute(pageId, 'seed', isSeed);
                $scope.network.setNodeAttribute(pageId, 'color', $scope.colors[isSeed ? 0 : $scope.network.getNodeAttribute(pageId, 'level')+2]);
            } else {
              var x, y, distance;
              if (!$scope.sigma) {
                x = Math.random();
                y = Math.random();
              } else {
                var x1 = $scope.sigma.nodeExtent.x[0],
                    x2 = $scope.sigma.nodeExtent.x[1],
                    y1 = $scope.sigma.nodeExtent.y[0],
                    y2 = $scope.sigma.nodeExtent.y[1],
                    extentX = x2 - x1 || 1,
                    extentY = y2 - y1 || 1,
                    extent = Math.max(extentX, extentY);
                if (existingParent && $scope.network.order > 2) {
                  x = $scope.network.getNodeAttribute(parentNode, 'x');
                  y = $scope.network.getNodeAttribute(parentNode, 'y');
                  distance = 0.1;
                } else {
                  x = x1 + extentX / 2;
                  y = y1 + extentY / 2;
                  distance = seed ? 0.1 : 0.75;
                }
                x = x + (Math.random() - 0.5) * extent * distance;
                y = y + (Math.random() - 0.5) * extent * distance;
              }
              $scope.network.addNode(pageId, {
                label: pageName,
                x: x,
                y: y,
                size: 1,
                level: level,
                seed: !!seed,
                color: $scope.colors[seed ? 0 : level+2]
              });
            }
            if ($scope.network.order == 1000)
              $scope.startLayout();
        }

        // Add a SeeAlso link between two pages to the corpus
        function addEdge(source, target, ind){
            addNode(source, ind-1, false, target);
            addNode(target, ind, false, source);

            var sourceId = source.toLowerCase(),
                targetId = target.toLowerCase(),
                edgeId = sourceId + '->' + targetId;
            if (sourceId === targetId || $scope.edgesIndex[edgeId]) return;
            $('#edges').append('<tr>' +
                '<td>' + discreetLink(source) + '</td>' +
                '<td>' + discreetLink(target) + '</td>' +
                '<td>' + ind + '</td>' +
            '</tr>');
            $scope.edgesIndex[edgeId] = true;
            $scope.network.addEdgeWithKey(edgeId, sourceId, targetId, {
                index: ind,
                color: '#ccc'
            });
            $scope.network.setNodeAttribute(sourceId, 'size', Math.min(3, Math.sqrt($scope.network.degree(sourceId))));
            $scope.network.setNodeAttribute(targetId, 'size', Math.min(3, Math.sqrt($scope.network.degree(targetId))));
        }

        function depileEdgesQueue(){
            if (!$scope.edgesQueue.length) return;
            $scope.edgesQueue.forEach(function(e){
                addEdge(e.source, e.target, e.level);
            });
            $scope.edgesQueue = [];
        }

        // Add a page to the corpus and find its parents and sons
        function getRelatives(page, ind, seed){
            if ($scope.stopped) return;
            $scope.pending++;
            var link = '',
                rgx = /wiki\/(.+?)(?:#.*)?$/g;
            if (seed){
                link = rgx.exec(page)[1];
                addNode(linkToTitle(link), 0, seed);
            } else link = titleToLink(page);
            $scope.queue.unshift({
                method: getSons,
                type: 'sons',
                args: [link, ind]
            });
            if ($scope.getParents) $timeout(function(){
                getParents(link, ind, seed);
            }, 10);
        }

        // Get a page's sons
        function getSons(page, ind){
            ($scope.getAllLinks ? downloadPageAllLinks : downloadPageSeeAlsoLinks)(page, function(links){
                links.forEach(function(d){
                    $scope.edgesQueue.push({
                        source: linkToTitle(page),
                        target: (~d.indexOf('_') ? linkToTitle(d) : d),
                        level: ind+1
                    });
                    if (ind+1 < $scope.depth)
                        getRelatives(d, ind+1);
                });
                $scope.resolved++;
                if ($scope.running)
                    $scope.running--;
            }, true);
        }

        // Get a page's parents
        function getParents(page, ind, seed){
            if ($scope.doneParents[page]) return;
            $scope.doneParents[page] = true;

            // Get backlinks to the page from the API
            $http.jsonp('//' + $scope.lang + '.wikipedia.org/w/api.php?action=query&bltitle=' + page + '&blnamespace=0&list=backlinks&blredirect&blfilterredir=nonredirects&bllimit=250&format=json&callback=JSON_CALLBACK')
            .success(function(data){
                if(!data.query || !data.query.backlinks) return;

                filterStopWords(data.query.backlinks.map(function(l){
                    return l.title;
                })).forEach(function(parentPage){
                    if ($scope.stopped) return;
                    var parentLink = titleToLink(parentPage);
                    $scope.parentsPending++;
                    var prefixedParent = ($scope.getAllLinks ? "ALL-" : "") + parentLink;
                    if ($scope.cacheLinks[prefixedParent]){
                        if ($scope.cacheLinks[prefixedParent][0] !== '#NOT-FOUND#')
                            validateParentFromLinks(page, parentLink, ind, $scope.cacheLinks[prefixedParent]);
                        if ($scope.parentsPending)
                            $scope.parentsPending--;
                    } else {
                        $scope.queue[seed ? 'unshift' : 'push']({
                            method: $scope.getAllLinks ? downloadPageAllLinks : downloadPageSeeAlsoLinks,
                            type: 'parent',
                            args: [parentLink, function(links){
                                validateParentFromLinks(page, parentLink, ind, links);
                                if ($scope.running)
                                    $scope.running--;
                                if ($scope.parentsPending)
                                    $scope.parentsPending--;
                            }]
                        });
                    }
                });
            }).error(function(dta, status, hdrs, cfg){
                $log.error('Could not get backlinks from API for', 'with status', status, cfg.url, dta, hdrs, cfg);
            });
        }

        // Keep only parent links present in links extracted from the parent
        function validateParentFromLinks(page, parentLink, ind, links){
            var name = linkToTitle(page),
                check = name.toLowerCase();
            if (links.some(function(l){ return (l.toLowerCase() === check); })){
                $scope.edgesQueue.push({
                    source: linkToTitle(parentLink),
                    target: name,
                    level: ind
                });
            }
        }


        $scope.downloadJSON = function(){
            var json = angular.toJson($scope.network.export());
            var blob = new Blob([json], {type: 'data:text/json;charset=utf-8' });
            saveAs(blob, 'seealsology-data.json');
        };

        $scope.downloadCSV = function(){
            var csvtxt = 'source\ttarget\tdepth\n';
            $scope.network.forEachEdge(function(e, attrs, source, target){
                csvtxt += (source + '\t' + target + '\t' + attrs.index + '\n');
            });
            var blob = new Blob([csvtxt], { type: 'data:text/csv;charset=utf-8' });
            saveAs(blob, 'seealsology-data.tsv');
        };

        $scope.downloadGEXF = function() {
          if ($scope.network) {
            var blob = new Blob(
              [gexf.write($scope.network, {
                formatNode: function(key, attributes) {
                  return {
                    label: attributes.label,
                    attributes: ['level', 'seed'],
                    viz: {
                      color: attributes.color,
                      size: attributes.size,
                      x: attributes.x,
                      y: attributes.y
                    }
                  };
                }
              })],
              {'type':'text/gexf+xml;charset=utf-8'}
            );
            saveAs(blob, 'seealsology-data.gexf', true);
          }
        }

        // Empty queue when free slots
        $interval(function(){
            depileEdgesQueue();
            while (!$scope.stopped && $scope.queue.length > 0 && $scope.running < $scope.maxQueries){
                var task = $scope.queue.shift();
                $scope.running++;
                task.method.apply(null, task.args);
            }
        }, 100);

        $scope.clearQueue = function(){
            $scope.stopped = true;
            $scope.queue.forEach(function(d){
                if (d.type === 'sons')
                    $scope.pending--;
                else if ($scope.parentsPending)
                    $scope.parentsPending--;
            });
            $scope.queue = [];
        };

        $scope.working = function(){
            return $scope.queue.length + $scope.running + $scope.parentsPending + $scope.pending - $scope.resolved + $scope.edgesQueue.length;
        };

        // Stop spatialization when crawl over
        $scope.$watch(
            $scope.working,
            function(n, o){
                if (!n && n !== o) $timeout(function(){
                    if ($scope.working() || !$scope.layout)
                        return;
                    if (!Object.keys($scope.edgesIndex).length)
                        $('#warning').append('<div class="col-md-12"><div class="alert alert-danger">Warning: no result found from these seeds.</div></div>');
                    $scope.startLayout();
                    $timeout($scope.stopLayout, 2500 + parseInt(Math.sqrt(10 * $scope.network.order) * 200));
                    $scope.stopped = false;
                }, 500);
            }
        );

        // Debug
        //$interval(function(){ $log.debug('Queue:', $scope.queue.length, 'Running:', $scope.running, 'Resolved:', $scope.resolved, 'Pending:', $scope.pending, 'ParentsPending:', $scope.parentsPending); }, 1000);

    });


