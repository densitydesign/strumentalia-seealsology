'use strict';

angular.module('wikiDiverApp')
    .controller('AltCtrl', function ($scope, $http, $q) {

        $scope.stopWords = [
            "list of",
            "index of",
            "categories of",
            "portal",
            "disambiguation",
            "outline of"
        ];

        $scope.query = "";
        $scope.regex = /en\.wikipedia\.org\/wiki\//g;
        $scope.depth = 2;
        $scope.qarr = [];
        $scope.res = [];
        $scope.notFound=[];
        $scope.stopped=[];
        $scope.download=false;
        

        $scope.update = function () {

            $scope.alert=false;
            $scope.download=false;
            $scope.notFound=[];
            $scope.stopped=[];
            $scope.res = [];

            if ($scope.query !== "") {
               
               $scope.qarr = $scope.query.split("\n");
               $scope.qarr.forEach(function (e, i) {
                    console.log("input",JSON.stringify(e));
                    var ret = getSons(e, 0, $scope.res);

                    if(ret===null) console.log("error");
                })
                $scope.download=true;
            }
            else $scope.alert=true;
        }

        var getSons = function (line, ind, rec) {

            var sons = [];
            var name = "";
            var rgx = /wiki\/(.+)/g;
            var index = null;

            if (ind == 0) {
                name = rgx.exec(line)[1];
            }

            else name = encodeURIComponent(line.name);


            $http.jsonp('http://en.wikipedia.org/w/api.php?action=parse&page=' + name + '&prop=sections&format=json' + '&callback=JSON_CALLBACK').success(function (data) {
                
                if(data.parse===null || !data.parse) return null

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
                    console.log("not found: ",name);
                    $scope.notFound.push(decodeURIComponent(name));
                    //$http.jsonp('http://en.wikipedia.org/w/api.php?action=parse&page=' + name + '&prop=links&format=json' + '&callback=JSON_CALLBACK').success(function (found) {
                    //    
                    //});
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
         var json = angular.toJson($scope.res);
        var blob = new Blob([json], { type: "data:text/json;charset=utf-8" });
        saveAs(blob, "data.json")
};

 $scope.downloadCSV = function() {

        var csvtxt = ["source\ttarget\tdepth"];
        csvtxt = appendLines(csvtxt,$scope.res);
        var blob = new Blob([csvtxt.join("\n")], { type: "data:text/csv;charset=utf-8" });
        saveAs(blob, "data.tsv")
       	

		function appendLines(txt,arr){

			
			arr.forEach(function(e,i){
				var name = e.name;
				
				e.sons.forEach(function(f,j) {
					var str=name+"\t"+f.name+"\t"+f.index;
					if(txt.indexOf(str)==-1) txt.push(str);
					if(f.sons && f.sons.length) {	
						txt = appendLines(txt,e.sons);
					}	
				})
			})
			return txt;
		}
	};
});


