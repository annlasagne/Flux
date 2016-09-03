app.directive('sublistmgr', function () {
	return {
		restrict: "E",
		
		scope: {
			datasource: '=',
			readdetail: '='
		},
		templateUrl: 'app/partials/attrlist.html',				   
		
		link: function (scope, element, attrs) {
		console.log('sublistmgr link function');
		scope.$watch('datasource', function(newValue, oldValue){
            if(angular.isDefined(newValue)){ 
				console.log('readdetail ' + scope.readdetail);
				console.log('datasource: ' + JSON.stringify(scope.datasource));
				scope.addAttr = function(name, state) {
					if (name) {
						if (!state) state = false;
						console.log(name + " " + state);
						scope.datasource.push({
									name: name, state: state              
								});
						console.log(scope.datasource);
						scope.newname = "";
						scope.newstate = false;
					}
				};
				
				scope.remove = function (attr) {
					var i = scope.datasource.indexOf(attr);
					console.log('remove, i = ' + i);
					scope.datasource.splice(i,1);
					console.log(JSON.stringify(scope.datasource));
				}
			}
		});
             //   console.dir(element);
			//	$compile(element.contents())(scope);
		}
	}
});