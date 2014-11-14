'use strict';

angular.module('wikiDiverApp')
    .controller('AltCtrl', function ($scope, $http, $log) {
        var regex = /en\.wikipedia\.org\/wiki\/.+/; // regex to match candidates

        $('#tokenfield').tokenfield({
            autocomplete: {
                source: ['red', 'blue', 'green', 'yellow', 'violet', 'brown', 'purple', 'black', 'white'],
                delay: 100
            },
            showAutocompleteOnFocus: true
        });

        $scope.stopWords = [
            "list of",
            "index of",
            "categories of",
            "portal",
            "disambiguation",
            "outline of"
        ];

        $scope.query = "http://en.wikipedia.org/wiki/God\nhttp://en.wikipedia.org/wiki/Devil";
        
        $scope.depth = 2;
        $scope.qarr = [];
        $scope.res = [];
        $scope.notFound=[];
        $scope.stopped=[];
        $scope.edges=[];
        $scope.nodes=[];


        $scope.update = function () {
            $log.debug('starting crawling for', $scope.query.split('\n').length, 'pages')
            $scope.alert=false;
            $scope.download=false;
            $scope.notFound=[];
            $scope.stopped=[];
            $scope.edges=[];
            $scope.res = [];

            if ($scope.query.trim() !== '') {
                var errors = [],
                    listOfPages = $scope.query.split('\n'),
                    validPages  = [];

                // check for integrity
                validPages = listOfPages.filter(function(d) {
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
                        var ret = getSons(e, 0, $scope.res);

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


        var getSons = function (line, ind, rec) {

            var sons = [];
            var name = "";
            var rgx = /wiki\/(.+)/g;
            var index = null;

            if (ind == 0) {
                name = rgx.exec(line)[1];
                $scope.nodes.push(decodeURIComponent(name).replace(/_/g, " "));
            }

            else name = encodeURIComponent(line.name);

            $http.jsonp('http://en.wikipedia.org/w/api.php?action=parse&page=' + name + '&prop=sections&format=json' + '&callback=JSON_CALLBACK').success(function (data) {

                if(data.parse===null || !data.parse) return null;

                var p = data.parse;
                index = null;

                p.sections.forEach(function (e, i) {

                    if (e.line === "See also") {
                        index = e.index
                    }

                })

                if (index !== null) {
                    $http.jsonp('http://en.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&titles='+ name +'&rvprop=content&rvsection='+ index +'&callback=JSON_CALLBACK').success(function (links) {

                        var output = parseSection(links)

                        output.forEach(function (d, j) {
                            var found = false;
                            $scope.stopWords.forEach(function(a,b){
                                if(d.toLowerCase().indexOf(a)>=0) {
                                    $scope.stopped.push(d);
                                    found = true;
                                }
                            })


                            if(!found) {
                                if($scope.nodes.indexOf(d)==-1)  $scope.nodes.push(d);
                                $scope.edges.push({source:decodeURIComponent(name).replace(/_/g, " "),target:d,index:ind+1});
                                sons.push({name: d,index:ind+1});
                            }
                        })

                        if(ind ==0) {
                            var obj = {};
                            obj.name = decodeURIComponent(name).replace(/_/g, " ");
                            obj.index = ind;
                            obj.sons = sons;
                            rec.push(obj);
                        }

                        else {
                            rec.sons = sons;
                        }

                        if (ind + 1 < $scope.depth) {
                            sons.forEach(function (m, y) {
                                m.sons = []
                                getSons(m, ind + 1, m);
                            })
                        }
                    });
                }
                else {
                    $scope.notFound.push(decodeURIComponent(name));
                }
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
    });


