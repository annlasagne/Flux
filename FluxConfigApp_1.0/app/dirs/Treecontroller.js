app.controller('treecontroller', ['$scope', 'modalFactory', function ($scope, modalFactory ) {
	
	listTest = $scope.testList.reverse();       
	var treeObject = createTree();
	var $scope.treeTemplate = object2html(treeObject);
	console.log("tree template returned: " + $scope.treeTemplate);
		
	function createTree() {		
		var Tree = {};																																																																;
		Tree = processNode(Tree, listTest[0]);
		console.log("END TREE!!!: " + JSON.stringify(Tree));	
		
		function processNode(tree, test) {  

			if (test.passcond) {
				for (var j=0; j < listTest.length; j++) {
					if (listTest[j].name == test.passcond) { //match found
						if (!listTest[j].passcond && !listTest[j].failcond){ 
							var node = createNode(test.name, "pass", listTest[j].name);
							if (Object.getOwnPropertyNames(tree).length == 0) {
								tree = node;
							} else {
								addKey(tree, node);
							}
						} else { // RECURSION LOOP	
							var node = createNode(test.name, "pass", {});
							if (Object.getOwnPropertyNames(tree).length == 0) {
								tree = node;
							} else {
								addKey(tree, node);
							}
							processNode(tree, listTest[j]);						
						}
					}
				}
			} else {
				var node = createNode(test.name, "pass", "none");
				if (Object.getOwnPropertyNames(tree).length == 0) {
					tree = node;
				} else {
					addKey(tree, node);
				}
			}
			
			if (test.failcond) {
				for (var j=0; j < listTest.length; j++) {
					if (listTest[j].name == test.failcond) { 
						if (!listTest[j].passcond && !listTest[j].failcond){ 
							insertFailKey(tree, test.name, listTest[j].name);			
						} else { 
							insertFailKey(tree, test.name, {});
							processNode(tree, listTest[j]);						
						}
					}
				}
			} else {
				insertFailKey(tree, test.name, "none");
			}
			return tree;
		}

		function addKey(testtree, newkey) {
			console.log("addKey");
			console.log("tree is " + JSON.stringify(testtree));
			var prop;
			for (prop in testtree) {
				if (Object.getOwnPropertyNames(testtree[prop]).length == 0) { 
					testtree[prop] = newkey;
					break;
					
				} else if ( typeof testtree[prop] === "object"){  
					(addKey(testtree[prop], newkey));
				} 
			}
			return testtree;
		};

		function insertFailKey(testtree, testname, newkey) {
			var prop;
			for (prop in testtree) {
				if (prop == testname) {
					testtree[prop]["fail"] = newkey;
					break;
				}
				if (Object.getOwnPropertyNames(testtree[prop]).length == 0) { 
					console.log("fail test not found in object - ERROR");
					break;
				} else if ( typeof testtree[prop] === "object"){  
					(insertFailKey(testtree[prop], testname, newkey));
				} 
			}
			return testtree;
		};		
			
		function createNode(testname, prop, val) {
			var node = {};
			node[testname] = {};
			node[testname][prop] = val;
			return node;
		};

	} // end of treeobject creation function		  

	function object2html(treeObject) {
		var i;
		var treehtml = document.createElement('ul'); 
		var li;
		
		for(i in treeObject) {
			li = treehtml.appendChild(document.createElement('li')); //new <li> tag
			li.appendChild(document.createTextNode(i + ': ')); 			//  add list item text
			if( typeof treeObject[i] === "object") li.appendChild(object2html(treeObject[i]));  //start new nested list
			else li.firstChild.nodeValue += treeObject[i];
		}
		console.log("treehtml: " + treehtml);
		treehtml.className = "tree";
		return treehtml;
	};
}]);