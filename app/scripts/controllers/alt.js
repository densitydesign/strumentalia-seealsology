'use strict';

angular.module('wikiDiverApp')
    .controller('AltCtrl', function ($scope, $http, $log, $timeout, $interval) {
        var regex = /en\.wikipedia\.org\/wiki\/.+/; // regex to match candidates

        $scope.stopWords = [
            'list of',
            'index of',
            'categories of',
            'portal',
            'disambiguation',
            'outline of',
            'Wikipedia:',
            'Category:',
            'File:',
            'wikisource:'
        ];

        $scope.query = '';//http://en.wikipedia.org/wiki/God\nhttp://en.wikipedia.org/wiki/Devil\n';

        $scope.depth = 2;
        $scope.getParents = true;
        $scope.maxQueries = 15;

        $scope.init = function(){
            $scope.notFound = [];
            $scope.stopped = [];
            $scope.nodes = [];
            $scope.edges = [];
            $scope.pending = 0;
            $scope.resolved = 0;
            $scope.queue = [];
            $scope.running = 0;
        };
        $scope.init();

        $scope.update = function(){
            $log.debug('starting crawling for', $scope.query.split('\n').length, 'pages');
            $scope.alert = false;
            $scope.init();
            $scope.doneParents = {};
            $scope.cacheLinks = {};
            $scope.edgesIndex = {};

            if ($scope.query.trim() !== '') {
                var errors = [],
                    listOfPages = $scope.query.split('\n'),
                    validPages = [];

                // check for integrity
                validPages = listOfPages.filter(function(d) {
                    if (d.trim() === '') return false;

                    $log.info('checking', d, regex.test(d)? 'is a wikipedia page': 'is not a wiki page ...');

                    if (regex.test(d)) return d;
                    else errors.push(d);
                });

                $log.debug('valid wikipedia pages:',validPages, '/', listOfPages, 'n. error pages:', errors.length);

                if (!errors.length){
                    validPages.forEach(function(e){
                        console.log('input', JSON.stringify(e));
                        getRelatives(e, 0, true);
                    });
                } else {
                    $log.error('Not valid wikipedia pages: ', errors);
                    $scope.alert = true;
                }
            } else {
                $log.error('Empty Query!');
                $scope.alert = true;
            }
        };

        function downloadPageSeeAlsoSection(pageName, section, callback){
            var id = pageName + '/' + section;

            if (!$scope.cacheLinks[id]){
              $http.jsonp('http://en.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&titles='+ pageName +'&rvprop=content&rvsection='+ section +'&redirects&callback=JSON_CALLBACK')
                .success(function(links){
                    var goodPages = [];
                    parseSection(links).forEach(function(d){
                        var skip = false;
                        $scope.stopWords.forEach(function(a){
                            if (d.toLowerCase().indexOf(a.text) >= 0){
                                if ($scope.stopped.indexOf(d) === -1)
                                    $scope.stopped.push(d);
                                skip = true;
                            }
                        });
                        if (!skip) goodPages.push(d);
                    });

                    $scope.cacheLinks[id] = goodPages;
                    callback(goodPages);
                });
            }
            else callback($scope.cacheLinks[id]);
        }

        function downloadPageSeeAlsoLinks(pageName, callback, updateResolved){
            $http.jsonp('http://en.wikipedia.org/w/api.php?action=parse&page=' + pageName + '&prop=sections&format=json&redirects&callback=JSON_CALLBACK')
              .success(function(data){
                if(data.parse===null || !data.parse) return;

                var section = null;
                data.parse.sections.forEach(function(e){
                    if (e.line === 'See also') section = e.index;
                });

                if (section !== null)
                    downloadPageSeeAlsoSection(pageName, section, callback);
                else if ($scope.notFound.indexOf(decodeURIComponent(pageName)) === -1 && updateResolved)
                    $scope.notFound.push(decodeURIComponent(pageName));

              })
              .finally(function(){
                if (updateResolved) $scope.resolved++;
                $scope.running--;
              });
        }

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
        }

        function addEdge(source, target, ind){
            addNode(source, ind-1);
            addNode(target, ind);

            var edgeId = source + '->' + target;
            if ($scope.edgesIndex[edgeId]) return;
            $scope.edgesIndex[edgeId] = true;
            $scope.edges.push({source: source, target: target, index: ind});

        }

        function getRelatives(line, ind, seed){
            $scope.pending++;
            var name = '',
                rgx = /wiki\/(.+)/g;
            if (seed){
                name = rgx.exec(line)[1];
                addNode(decodeURIComponent(name).replace(/_/g, ' '), 0, seed);
            } else name = encodeURIComponent(line.name);
            $scope.queue.unshift({method: getSons, args: [name, ind]});
            if ($scope.getParents) getParents(name, ind);
        }

        function getSons(name, ind){
            var sons = [];

            downloadPageSeeAlsoLinks(name, function(links){
                links.forEach(function(d){
                    addEdge(decodeURIComponent(name).replace(/_/g, ' '), d, ind+1);
                    sons.push({name: d, index: ind+1});
                });

                if (ind+1 < $scope.depth){
                    sons.forEach(function(m){
                        getRelatives(m, ind + 1);
                    });
                }
            }, true);
        }

        function getParents(name, ind){
            if ($scope.doneParents[name]) return;
            $scope.doneParents[name] = true;

            $http.jsonp('http://en.wikipedia.org/w/api.php?action=query&bltitle=' + name + '&blnamespace=0&list=backlinks&blredirect&blfilterredir=nonredirects&bllimit=250&format=json&callback=JSON_CALLBACK')
              .success(function(data){
                if(data.query === null || !data.query.backlinks) return null;

                var links = data.query.backlinks.filter(function(l){
                    var keep = true;
                    $scope.stopWords.forEach(function(a){
                        if(l.title.toLowerCase().indexOf(a.text) >= 0){
                            if($scope.stopped.indexOf(l.title) === -1)
                                $scope.stopped.push(l.title);
                            keep = false;
                            return;
                        }
                    });
                    return keep;
                });
                links.forEach(function(parentPage){
                    $scope.queue.push({method: validateParent, args: [name, parentPage, ind]});
                });

              });
        }
                    
        function validateParent(pageName, parentPage, ind){
            var parentName = parentPage.title;

            downloadPageSeeAlsoLinks(parentName, function(links){
                var found = false;
                links.forEach(function(l){
                    if (l.toLowerCase() === decodeURIComponent(pageName).replace(/_/g, ' ').toLowerCase())
                        found = true;
                });

                if (found)
                    addEdge(parentName, decodeURIComponent(pageName).replace(/_/g, ' '), ind);
            });
        }

        function parseSection(obj){
            var o = obj.query.pages[Object.keys(obj.query.pages)[0]].revisions[0]['*'],
                regex = /\[\[(.*?)\]\]/g,
                matches = regex.exec(o),
                output = [];
            while (matches){
                output.push(matches[1].split('|')[0]);
                matches = regex.exec(o);
            }
            return output;
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

            $scope.nodes.forEach(function(n){
                gexfDoc.addNode({
                    id: n.name,
                    label: n.name,
                    attributes: {
                        level: n.level,
                        seed: n.seed
                    }
                });
            });

            $scope.edges.forEach(function(e){
                gexfDoc.addEdge({source: e.source, target: e.target});
            });

            var blob = new Blob([gexfDoc.serialize()], { type: 'data:application/xml+gexf;charset=utf-8' });
            saveAs(blob, 'seealsology-data.gexf');
        };

        $interval(function(){
            while ($scope.queue.length > 0 && $scope.running < $scope.maxQueries){
                var task = $scope.queue.shift();
                $scope.running++;
                task.method(task.args[0], task.args[1], task.args[2]);
            }
        }, 100);

        //$interval(function(){console.log('Queue:', $scope.queue.length, 'Running:', $scope.running, 'Resolved:', $scope.resolved, 'Pending:', $scope.pending)}, 5000);

    });


