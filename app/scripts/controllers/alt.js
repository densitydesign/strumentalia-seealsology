'use strict';

angular.module('wikiDiverApp')
    .controller('AltCtrl', function ($scope, $http, $log, $timeout, $interval, $window) {

        // seeAlso section names for a language should be given as lowercase
        var languages = {
          en: {
            name: 'english',
            seeAlso: ['see also'],
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
            seeAlso: ['voir aussi', 'Articles connexes'],
            stopWords: [
              'liste d',
              'index d',
              'catégories d',
              'portail',
              'désambiguation',
              'résumé d',
              'Catégorie:',
              'Fichier:'
            ]
          },
          it: {
            name: 'italian',
            seeAlso: ['Voci correlate', 'Vedi anche'],
            stopWords: [
              'Portale:',
              'Categoria:'
            ]
          }
        };
        $scope.supportedLanguages = Object.keys(languages).map(function(l){ return languages[l].name; }).join(', ');

        $scope.stopWords = [
          'Wikipedia:',
          'Category:',
          'File:',
          'wikisource:',
          'Commons:'
        ];

        $scope.query = '';//http://en.wikipedia.org/wiki/God\nhttp://en.wikipedia.org/wiki/Devil\n';
        $scope.depth = 2;
        $scope.getParents = true;
        $scope.maxQueries = 10;
        $scope.cacheHours = 24;
        $scope.sigma = undefined;
        $scope.colors = ['#de2d26', '#fc9272', '#081d58','#253494','#225ea8','#1d91c0','#41b6c4','#7fcdbb','#c7e9b4','#edf8b1','#ffffd9'];

        $scope.init = function(){
            $scope.lang = '';
            $scope.alert = false;
            $scope.stopped = false;
            $scope.notFound = [];
            $scope.stoppedPages = [];
            $scope.nodes = [];
            $scope.edges = [];
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
            links = links || [];
            $scope.cacheLinks[pageLink] = links;
            $scope.cacheLinksEmpty = false;
            try {
                localStorage.setItem('seeAlsology-' + pageLink, links.join('|'));
                localStorage.setItem('seeAlsology-update-' + pageLink, Math.floor(new Date() / 1000));
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
            $scope.getParents = !$scope.getParents;
        };

        $scope.startCrawl = function(){
            $log.debug('starting crawling for', $scope.query.split('\n').length, 'pages');
            $scope.init();
            $scope.doneParents = {};
            $scope.edgesIndex = {};

            // Clear and init graph
            if ($scope.sigma) $scope.sigma.kill();
            $scope.sigma = new sigma({
                container: 'sigma',
                settings: {
                    labelThreshold: 5,
                    singleHover: true,
                    minNodeSize: 2
                }
            }).configForceAtlas2({
                adjustSizes: true,
                scalingRatio: 10,
                strongGravityMode: true,
                gravity: 0.1,
                slowDown: 15
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


            // Links to wikipages on click graph nodes
            $scope.sigma.bind('clickNode', function(e) {
                $window.open($scope.wikiLink(e.data.node.id), '_blank');
            });

            // Validate inputs before starting process
            if ($scope.validate()) {
                // Scroll down to viz
                $timeout(function(){
                    $window.scrollTo(0, document.getElementById('crawl-button').offsetTop - 12);
                }, 50);

                // Start crawl on pages from query
                $timeout(function(){
                    $scope.validPages.forEach(function(e){
                        getRelatives(e, 0, true);
                    });
                }, 10);
            }
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
                $scope.alert = lang + ' language is not supported yet, we do not know which section to look for as a "See Also", neither which default stopWords to apply.';
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
        $scope.wikiLink = function(t){
            return 'http://' + $scope.lang + '.wikipedia.org/wiki/' + titleToLink(t);
        };

        // Filter links to pages matching stopWords
        function filterStopWords(links){
            return links.map(function(l){
                return l.replace(/#.*$/, '');
            }).filter(function(l){
                if ($scope.stopWords.some(function(s){
                    return l.toLowerCase().indexOf(s.text.toLowerCase()) !== -1;
                })) {
                    if ($scope.stoppedPages.indexOf(l) === -1)
                        $scope.stoppedPages.push(l);
                    return false;
                } else return !!l.trim();
            });
        }

        // Declare when page not found or section "SeeAlso" misses
        function notFound(pageLink, updateResolved){
            cache(pageLink, ['#NOT-FOUND#']);
            if ($scope.notFound.indexOf(linkToTitle(pageLink)) === -1 && updateResolved)
                $scope.notFound.push(linkToTitle(pageLink));
            if (updateResolved) $scope.resolved++;
            else if ($scope.parentsPending)
                $scope.parentsPending--;
            if ($scope.running)
                $scope.running--;
        }

        // Grab a page's SeeAlso links
        function downloadPageSeeAlsoLinks(pageLink, callback, updateResolved){
            // Use existing cache
            if ($scope.cacheLinks[pageLink]) {
                if ($scope.cacheLinks[pageLink][0] === '#NOT-FOUND#')
                    notFound(pageLink, updateResolved);
                else callback(filterStopWords($scope.cacheLinks[pageLink]));

            // or find the page's SeeAlso section from API
            } else $http.jsonp('http://' + $scope.lang + '.wikipedia.org/w/api.php?action=parse&page=' + pageLink + '&prop=sections&format=json&redirects&callback=JSON_CALLBACK')
            .success(function(data){
                if (!data.parse) return notFound(pageLink, updateResolved);

                var sections = data.parse.sections.filter(function(s){
                    return languages[$scope.lang].seeAlso.indexOf(s.line.toLowerCase()) !== -1;
                });
                if (!sections.length) return notFound(pageLink, updateResolved);

                // Grab page's SeeAlso section from API
                sections.forEach(function(section, i){
                    if (i){
                        if (updateResolved)
                            $scope.pending++;
                        else $scope.parentsPending++;
                    }
                    $http.jsonp('http://' + $scope.lang + '.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&titles='+ pageLink +'&rvprop=content&rvsection='+ section.index +'&redirects&callback=JSON_CALLBACK')
                    .success(function(linksData){
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
                        callback(filterStopWords(links));
                    }).error(function(e){
                        $log.error('Could not get content of SeeAlso section from API for', pageLink, e);
                        notFound(pageLink, updateResolved);
                    });
                });
            }).error(function(e){
                $log.error('Could not get sections from API for', pageLink, e);
                notFound(pageLink, updateResolved);
            });
        }

        // Add a page to the corpus
        function addNode(pageName, level, seed){
            var existingNode = $scope.nodes.filter(function(e){
                return e.name === pageName;
            });
            if (existingNode.length)
                existingNode[0].level = Math.min(level, existingNode[0].level);
            else {
                $scope.nodes.push({
                    name: pageName,
                    level: level,
                    seed: !!seed
                });
                $scope.sigma.graph.addNode({
                    id: pageName,
                    label: pageName,
                    x: Math.random(),
                    y: Math.random(),
                    size: 1,
                    level: level,
                    seed: !!seed,
                    color: $scope.colors[seed ? 0 : level+2]
                });
            }
        }

        // Add a SeeAlso link between two pages to the corpus
        function addEdge(source, target, ind){
            addNode(source, ind-1);
            addNode(target, ind);

            var edgeId = source + '->' + target;
            if ($scope.edgesIndex[edgeId]) return;
            $scope.edgesIndex[edgeId] = true;
            $scope.edges.push({source: source, target: target, index: ind});

            $scope.sigma.graph.addEdge({
                id: edgeId,
                source: source,
                target: target,
                color: '#ccc'
            });
            $scope.sigma.graph.nodes(source).size = $scope.sigma.graph.degree(source);
            $scope.sigma.graph.nodes(target).size = $scope.sigma.graph.degree(target);
        }

        function depileEdgesQueue(){
            if (!$scope.edgesQueue.length) return;
            $scope.sigma.killForceAtlas2();
            $scope.edgesQueue.forEach(function(e){
                addEdge(e.source, e.target, e.level);
            });
            $scope.edgesQueue = [];
            $scope.sigma.startForceAtlas2();
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
            downloadPageSeeAlsoLinks(page, function(links){
                links.forEach(function(d){
                    $scope.edgesQueue.push({
                        source: linkToTitle(page),
                        target: linkToTitle(d),
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
            $http.jsonp('http://' + $scope.lang + '.wikipedia.org/w/api.php?action=query&bltitle=' + page + '&blnamespace=0&list=backlinks&blredirect&blfilterredir=nonredirects&bllimit=250&format=json&callback=JSON_CALLBACK')
            .success(function(data){
                if(!data.query || !data.query.backlinks) return;

                filterStopWords(data.query.backlinks.map(function(l){
                    return l.title;
                })).forEach(function(parentPage){
                    if ($scope.stopped) return;
                    var parentLink = titleToLink(parentPage);
                    $scope.parentsPending++;
                    if ($scope.cacheLinks[parentLink]){
                        if ($scope.cacheLinks[parentLink][0] !== '#NOT-FOUND#')
                            validateParentFromLinks(page, parentLink, ind, $scope.cacheLinks[parentLink]);
                        if ($scope.parentsPending)
                            $scope.parentsPending--;
                    } else {
                        $scope.queue[seed ? 'unshift' : 'push']({
                            method: downloadPageSeeAlsoLinks,
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
            }).error(function(e){
                $log.error('Could not get backlinks from API for', page, e);
            });
        }

        // Keep only parent links coming from SeeAlso sections
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
            var json = angular.toJson({nodes:$scope.nodes,edges:$scope.edges});
            var blob = new Blob([json], {type: 'data:text/json;charset=utf-8' });
            saveAs(blob, 'seealsology-data.json');
        };

        $scope.downloadCSV = function(){

            var csvtxt = 'source\ttarget\tdepth\n';
            $scope.edges.forEach(function(e){
                csvtxt+=(e.source+'\t'+ e.target+'\t'+e.index+'\n');
            });
            var blob = new Blob([csvtxt], { type: 'data:text/csv;charset=utf-8' });
            saveAs(blob, 'seealsology-data.tsv');
        };

        $scope.downloadGEXF = function(){
            var gexfDoc = gexf.create({defaultEdgeType: 'directed'});

            gexfDoc.addNodeAttribute({id: 'level', title: 'Level', type: 'integer'});
            gexfDoc.addNodeAttribute({id: 'seed', title: 'Seed', type: 'boolean'});

            $scope.sigma.graph.nodes().forEach(function(n){
                gexfDoc.addNode({
                    id: n.label,
                    label: n.label,
                    attributes: {
                        level: n.level,
                        seed: n.seed
                    },
                    viz: {
                        color: n.color,
                        size: $scope.sigma.graph.degree(n.label),
                        position: {
                            x: n['read_cam0:x'],
                            y: -n['read_cam0:y']
                        }
                    }
                });
            });

            $scope.sigma.graph.edges().forEach(function(e){
                gexfDoc.addEdge({source: e.source, target: e.target});
            });

            var blob = new Blob([gexfDoc.serialize()], { type: 'data:application/xml+gexf;charset=utf-8' });
            saveAs(blob, 'seealsology-data.gexf');
        };

        // Empty queue when free slots
        $interval(function(){
            depileEdgesQueue();
            while (!$scope.stopped && $scope.queue.length > 0 && $scope.running < $scope.maxQueries){
                var task = $scope.queue.shift();
                $scope.running++;
                task.method.apply(null, task.args);
            }
        }, 200);

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
                    if ($scope.working() || !$scope.sigma)
                        return;
                    $scope.sigma.stopForceAtlas2();
                }, 1500 + parseInt(Math.sqrt(10 * $scope.nodes.length) * 200));
            }
        );

        // Zoom buttons
        $scope.zoomSigma = function(positiveZoom){
            var cam = $scope.sigma.cameras[0];
            sigma.misc.animation.camera(
                cam,
                { ratio: cam.ratio * (positiveZoom ? 1/1.5 : 1.5) },
                { duration: 150 }
            );
        };
        $scope.recenterSigma = function(){
            sigma.misc.animation.camera(
                $scope.sigma.cameras[0],
                {x: 0, y: 0, angle: 0, ratio: 1},
                { duration: 150 }
            );
        };


        // Debug
        //$interval(function(){ $log.debug('Queue:', $scope.queue.length, 'Running:', $scope.running, 'Resolved:', $scope.resolved, 'Pending:', $scope.pending, 'ParentsPending:', $scope.parentsPending); }, 1000);

/* TODO
    - append seeds afterwards
    - handle long tables
*/

    });


