'use strict';

angular.module('wikiDiverApp')
    .controller('AltCtrl', function ($scope, $http, $log, $timeout) {
        var regex = /en\.wikipedia\.org\/wiki\/.+/; // regex to match candidates

        $scope.stopWords = [
            "list of",
            "index of",
            "categories of",
            "portal",
            "disambiguation",
            "outline of",
            "Wikipedia:",
            "Category:",
            "File:",
            "wikisource:"
        ];

        $scope.query = "";//http://en.wikipedia.org/wiki/God\nhttp://en.wikipedia.org/wiki/Devil\n";

        $scope.depth = 2;
        $scope.qarr = [];
        $scope.res = [];
        $scope.notFound=[];
        $scope.stopped=[];
        $scope.edges=[];
        $scope.nodes=[];
        $scope.pending=0;
        $scope.resolved=0;
        $scope.cacheLinks={};

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        $scope.update = function () {
            $log.debug('starting crawling for', $scope.query.split('\n').length, 'pages')
            $scope.alert=false;
            $scope.download=false;
            $scope.notFound=[];
            $scope.stopped=[];
            $scope.nodes=[];
            $scope.edges=[];
            $scope.res = [];
            $scope.pending=0;
            $scope.resolved=0;

            if ($scope.query.trim() !== '') {
                var errors = [],
                    listOfPages = $scope.query.split('\n'),
                    validPages  = [];

                // check for integrity
                validPages = listOfPages.filter(function(d) {
                    if(d.trim() == '')
                        return false;

                    $log.info('checking', d, regex.test(d)? 'is a wikipedia page': 'is not a wiki page ...');

                    if(regex.test(d))
                        return d;
                    else
                        errors.push(d);
                });

                $log.debug('valid wikipedia pages:',validPages, '/', listOfPages, 'n. error pages:', errors.length);

                if(!errors.length) {
                    validPages.forEach(function (e, i) {
                        console.log("input", JSON.stringify(e));
                        $scope.pending++;
                        var ret = getRelatives(e, 0, $scope.res);

                        if (ret === null) console.log("error");
                    })
                    $scope.download = true;
                } else {
                    $log.error('Not valid wikipedia pages: ', errors);
                    $scope.alert = true;
                }
            } else {
                $log.error('Empty Query!')
                $scope.alert = true;
            }
        }

        function downloadPageSeeAlsoSection(pageName, section, callback){

            var id = pageName + "/" + section;
            if (!$scope.cacheLinks[id]){

              $http.jsonp('http://en.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&titles='+ pageName +'&rvprop=content&rvsection='+ section +'&redirects&callback=JSON_CALLBACK')
                .success(function(links){

                    var goodPages = [];
                    parseSection(links).forEach(function(d){
                        var skip = false;
                        $scope.stopWords.forEach(function(a,b){
                            if(d.toLowerCase().indexOf(a.text)>=0){
                                if($scope.stopped.indexOf(d)==-1) $scope.stopped.push(d);
                                skip = true;
                            }
                        })
                        if(!skip) goodPages.push(d);
                    })

                    $scope.cacheLinks[id] = goodPages;
                    callback(goodPages);
                });
            }
            else callback($scope.cacheLinks[id]);
        }

        function downloadPageSeeAlsoLinks(pageName, callback, updateResolved){

            $http.jsonp('http://en.wikipedia.org/w/api.php?action=parse&page=' + pageName + '&prop=sections&format=json&redirects&callback=JSON_CALLBACK')
              .success(function (data) {

                if(data.parse===null || !data.parse) return;

                var section = null;
                data.parse.sections.forEach(function(e){
                    if (e.line === "See also") section = e.index;
                })

                if (section !== null) downloadPageSeeAlsoSection(pageName, section, callback);
                else if($scope.notFound.indexOf(decodeURIComponent(pageName))==-1 && updateResolved) $scope.notFound.push(decodeURIComponent(pageName));

              })
              .finally(function(){
                if (updateResolved) $scope.resolved++;
              });
        }

        function addNode(pageName, level){
            var existingNode = $scope.nodes.filter(function(e){return e.name===pageName});
            if (!existingNode.length)
                $scope.nodes.push({
                  name: pageName,
                  level: level
                });
            else existingNode[0].level = Math.min(level, existingNode[0].level);
        }
 
        var getRelatives = function(line, ind, rec){

            var name = "";
            var rgx = /wiki\/(.+)/g;
            if (ind == 0) {
                name = rgx.exec(line)[1];
                $scope.nodes.push({name:decodeURIComponent(name).replace(/_/g, " "),level:0});
            } else name = encodeURIComponent(line.name);
            getSons(name, ind, rec);
            getParents(name, ind, rec);
        }

        var getSons = function (name, ind, rec) {

            var sons = [];

            downloadPageSeeAlsoLinks(name, function(links){

                links.forEach(function(d) {
                    addNode(d, ind+1);
                    $scope.edges.push({source: decodeURIComponent(name).replace(/_/g, " "), target: d, index: ind + 1});
                    sons.push({name: d, index: ind + 1});
                })

                if(ind == 0) {
                    var obj = {};
                    obj.name = decodeURIComponent(name).replace(/_/g, " ");
                    obj.index = ind;
                    obj.seed = true;
                    obj.sons = sons;
                    rec.push(obj);
                } else rec.sons = sons;

                if (ind + 1 < $scope.depth) {
                    $scope.pending += sons.length;
                    sons.forEach(function (m, y) {
                        m.sons = []
                        getRelatives(m, ind + 1, m);
                    })
                }
            }, true);
        }

        var getParents = function (name, ind, rec) {

            $http.jsonp('http://en.wikipedia.org/w/api.php?action=query&bltitle=' + name + '&blnamespace=0&list=backlinks&blredirect&blfilterredir=nonredirects&bllimit=250&format=json&callback=JSON_CALLBACK')
              .success(function(data){

                if(data.query===null || !data.query.backlinks) return null;

                data.query.backlinks.forEach(function(parentPage){
                    var parentName = parentPage.title;
                    downloadPageSeeAlsoLinks(parentName, function(links){
                        var found = false;
                        links.forEach(function(l){
                            if (l.toLowerCase() === decodeURIComponent(name).replace(/_/g, " ").toLowerCase())
                                found = true;
                        });
                        if (found){
                            addNode(parentName, ind-1);
                            $scope.edges.push({source: parentName, target: decodeURIComponent(name).replace(/_/g, " "), index: ind});
                        }
                    });
                });
              });
        }
                    
        var parseSection=function(obj) {
            var o = obj.query.pages[Object.keys(obj.query.pages)[0]].revisions[0]['*'];
            var regex = /\[\[(.*?)\]\]/g;

            var matches, output = [];
            while (matches = regex.exec(o)) {
                output.push(matches[1].split("|")[0]);
            }
            return output;

        }


        $scope.downloadJSON = function() {
            var json = angular.toJson({nodes:$scope.nodes,edges:$scope.edges});
            var blob = new Blob([json], { type: "data:text/json;charset=utf-8" });
            saveAs(blob, "data.json")
        };

        $scope.downloadCSV = function() {

            var csvtxt = "source\ttarget\tdepth\n";
            $scope.edges.forEach(function(e,i){
                csvtxt+=(e.source+"\t"+ e.target+"\t"+e.index+"\n");
            })
            var blob = new Blob([csvtxt], { type: "data:text/csv;charset=utf-8" });
            saveAs(blob, "data.tsv")
        };

        $scope.downloadGEXF = function() {
            var gexfDoc = gexf.create({defaultEdgeType: 'directed'});

            gexfDoc.addNodeAttribute({id: 'level', title: 'Level', type: 'integer'});
            gexfDoc.addNodeAttribute({id: 'seed', title: 'Seed', type: 'boolean'});

            $scope.nodes.forEach(function(n) {
                gexfDoc.addNode({
                    id: n.name,
                    label: n.name,
                    attributes: {
                        level: n.level,
                        seed: !!n.seed
                    }
                });
            });

            $scope.edges.forEach(function(e) {
                gexfDoc.addEdge({source: e.source, target: e.target});
            });

            var blob = new Blob([gexfDoc.serialize()], { type: "data:application/xml+gexf;charset=utf-8" });
            saveAs(blob, "data.gexf")
        };

        $scope.$watch("resolved",function(newValue,oldValue){
            $log.debug("resolved",newValue,"pending",$scope.pending);
        })
    });


