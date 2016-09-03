app.directive('sublistmgr', function () {
	return {
		restrict: "E",
		replace: true,
		scope: {
			datasource: '=',
			readdetail: '@'
		},
		templateUrl: 'app/partials/attrlist.html',				   
		controller: function ($scope) {
			console.log('attrdir controller');
			$scope.addAttr = function(name, state) {
				console.log(name + " " + state);
				$scope.itemDetail.attributeList.push({
							name: name, state: state              
						});
				console.log($scope.itemDetail.attributeList);
				$scope.newname = "";
				$scope.newstate = false;
			};
			
			$scope.remove = function (attr) {
				var i = $scope.itemDetail.attributeList.indexOf(attr);
				console.log('remove, i = ' + i);
				$scope.itemDetail.attributeList.splice(i,1);
				console.log(JSON.stringify($scope.itemDetail.attributeList));
			};
        },
		
		link: function (scope, element, attrs) {
                console.dir(element);
				$compile(element.contents())(scope);
			}
		}
	}
});