app.factory('treeFactory', [function($scope) {
	var treeFactory = {};
	
	treeFactory.buildTree = function(testList) {
	
		console.log("BUILD NEW TREE")
		var listTest = testList.slice(0)
		listTest.reverse(); 
		var treedata = createTree();
		return treedata;
				
		function createTree() {		
			var Tree = {};																																																																;
			Tree = processNode(Tree, listTest[0]);
			console.log("END TREE!!!: " + JSON.stringify(Tree));
			TreeArray =[];
			TreeArray.push(Tree)
			return TreeArray;
			
			function processNode(tree, test) {  
				console.log("process node start - tree: " + JSON.stringify(tree));
			if (test.passcond || test.failcond) {
				if (test.passcond) {
					console.log("PASS PROCESSING");
					for (var j=0; j < listTest.length; j++) {
						if (listTest[j].name == test.passcond) { //match found
							console.log("match found with " + JSON.stringify(listTest[j]));
							if (!listTest[j].passcond && !listTest[j].failcond){ 
								var node = createNode(test.name, listTest[j].name);
								tree = addNode(tree, node);
								// if (Object.getOwnPropertyNames(tree).length == 0) {
									// tree.push(node);
								// } else {
									// addKey(tree, node);
								// }
							} else { // RECURSION LOOP	
								var node = createNode(test.name, "");
								tree = addNode(tree, node);
								console.log("tree after return from add, before recursion : " + JSON.stringify(tree));
								processNode(tree, listTest[j]);						
							}
						}
					}
				} else {
					var node = createNode(test.name, "none");
					tree = addNode(tree, node);
					
				}
				var childnode = {};
				if (test.failcond) {
				console.log("FAIL PROCESSING");
					
					for (var j=0; j < listTest.length; j++) {
						if (listTest[j].name == test.failcond) {										
							console.log("match found with " + JSON.stringify(listTest[j]));
							if (!listTest[j].passcond && !listTest[j].failcond){ 
								childnode['tname'] =  listTest[j].name;		
								tree = insertFailKey(tree, test.name, childnode);			
							} else { 
								console.log("tree before recurseion : " + JSON.stringify(tree));
								processNode(tree, listTest[j]);						
							}
						}
					}
				} else {
					console.log("no fail code - set to none");
					childnode['tname'] =  "none";
					tree = insertFailKey(tree, test.name, childnode);
				}
			} else {
				var node = createNode(test.name);
				tree = addNode(tree, node);
			}
				return tree;
			}

			function addNode(testtree, newnode) {
				console.log("addNode: start tree: " + JSON.stringify(testtree));
					
				if (angular.isArray(testtree)) {
					console.log("found an array");
					switch (testtree.length) {
						case 0:
							console.log("EMPTY ARRAY _ PUSH NODE " + JSON.stringify(testtree));
							testtree.push(newnode);
							console.log("new node added to child array,  tree now " + JSON.stringify(testtree));
							return testtree;
							break;					
						case 1:
							if (testtree[0].hasOwnProperty('children')) {
								console.log("children array, length = 1, has children so recurse " + JSON.stringify(testtree));
								addNode(testtree[0]['children'], newnode);
							} else {
								testtree.push(newnode);
								console.log("children array, length = 1, no children so added test (2nd slot)" + JSON.stringify(testtree));
								return testtree;
							}				
								
							break;
						case 2:
							if (testtree[1].hasOwnProperty('children')) {
								console.log("children array, length = 2, has children so recurse " + JSON.stringify(testtree));
								addNode(testtree[1]['children'], newnode);
							} else {
								testtree.push(newnode);
								console.log("children array, length = 2, no children so added test (2nd slot)" + JSON.stringify(testtree));
								return testtree;
							}
							break;
						default:
							console.log("got to default in switch with test tree : " + 	JSON.stringify(testtree));
					}
				} else if (typeof testtree === 'object' && Object.keys(testtree).length == 0) { 
					testtree = newnode;
					console.log ("first test added ???? " + JSON.stringify(testtree));
					return testtree;
				} else if (typeof testtree === 'object' && !testtree.hasOwnProperty('children')) {
					console.log("error - non empty object has no children to add to" + JSON.stringify(testtree));
				} else { 
					console.log(" non-empty object - send in the children! : " + JSON.stringify(testtree));
					addNode(testtree['children'], newnode);
				}
				
				console.log("returning testtree: " + JSON.stringify(testtree));
				return testtree;
			};

			function insertFailKey(testtree, testname, failnode) {
					console.log(" insertfailKey:  " + testname + " with child test " + JSON.stringify(failnode));
					console.log("tree to search : " + JSON.stringify(testtree));
					
					if (testtree['tname'] == testname) {
						console.log("fail - found testname match " + JSON.stringify(testtree))
						if (testtree.hasOwnProperty('children') && testtree['children'].length > 0) {
							console.log("INSERT HERE! can i get to children? " + JSON.stringify(testtree['children']));
							testtree['children'].push(failnode);
							console.log("and now with fail added: " + JSON.stringify(testtree));
							return testtree;
						} else {
							console.log("ERROR - fond match but no children or empty array: ");
							return;
						}
					}
					//no match yet, keep going
					console.log("fail test search, testtree children?: " + testtree.hasOwnProperty('children'));

					if (testtree.hasOwnProperty('children') && testtree['children'].length > 0) {
						console.log("fail - recurse with 1st test: " + JSON.stringify(testtree['children'][0]));
						insertFailKey(testtree['children'][0], testname, failnode);
						if (testtree['children'].length > 1) { //if we got here we didn't get a match so try second test
							console.log("fail - recurse with 2nd test: " + JSON.stringify(testtree['children'][1]));
							insertFailKey(testtree['children'][1], testname, failnode);
						} else {
						
							console.log ("insert fail end of search no match found - why? " + JSON.stringify(testtree));
						}
					} else {
						console.log("ERROR - insert fail found emtpy array at " + JSON.stringify(testtree));
					}
					console.log("don't think I should be here!!");
					return testtree;
			};		
				
			function createNode(testname, val) {
				console.log("create node: " + testname + val);
				var node = {};
				node['tname'] = testname;		
				if (val!== undefined) {	
					node['children'] = [];
				
					if	(val !== "") {
						childnode = {};
						childnode['tname'] = val;
						
						node['children'][0] = (childnode);
					
					}
				}
				console.log("node created: " + JSON.stringify(node));
				return node;
			};
		
		} 
	}
	
	return treeFactory;
	
	}]);