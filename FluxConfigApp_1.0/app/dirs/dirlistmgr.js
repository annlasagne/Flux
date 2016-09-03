app.directive('dirlistmgr', function () {
	return {
		restrict: "E",
		
		scope: {
			datasource: '=',
			readdetail: '=',
			directions: '='
		},
		templateUrl: 'app/partials/dirlist.html',				   
		
		link: function (scope, element, attrs) {
		scope.$watch('datasource', function(newValue, oldValue){
            if(angular.isDefined(newValue)){ 
				console.log('readdetail ' + scope.readdetail);
				console.log('datasource: ' + JSON.stringify(scope.datasource));
				scope.setDir = function(dir) {
					console.log("set direction " + dir);
					scope.newdir = dir;
					console.log("newdir" + scope.newdir);
				};
				scope.addDir = function(newdir, newtok, newinact) {
					if (newdir) {
						console.log(newdir + " " + newtok + " " + newinact);
						scope.datasource.push({
									direction: newdir, dir_token: newtok         
								});
						if (newinact == true ) {
							scope.datasource[scope.datasource.length - 1].directionInActive = true;
							scope.newinact = false;
						}
						console.log(scope.datasource);
						scope.newdir = "";
						scope.newtok = "";
					}
				};
				
				scope.remove = function (dir) {
					var i = scope.datasource.indexOf(dir);
					console.log('remove, i = ' + i);
					scope.datasource.splice(i,1);
					console.log(JSON.stringify(scope.datasource));
				}
			}
		});
		}
	}
});