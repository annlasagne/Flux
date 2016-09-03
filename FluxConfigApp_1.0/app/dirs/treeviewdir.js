app.directive('treeview', function () {
	return {
		restrict: "E",
		replace: true,
		scope: {
			treedata: '='
		},
		template: "<ul><node ng-repeat='node in treedata' node='node'></node></ul>"
	}
})

app.directive('node', function ($compile) {
	return {
		restrict: "E",
		replace: true,
		scope: {
			node: '='
		},
		template: "<li>{{node.tname}}</li>",
		link: function (scope, element, attrs) {
			if (angular.isArray(scope.node.children)) {
				element.append("<treeview treedata='node.children'></treeview>");
                console.dir(element);
				$compile(element.contents())(scope);
			}
		}
	}
})