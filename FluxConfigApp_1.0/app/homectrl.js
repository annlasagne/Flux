app.controller('homeCtrl', ['$scope', 'dataFactory', 'modalFactory', '$localStorage', '$sessionStorage',
  function ($scope, dataFactory, modalFactory, $localStorage, $sessionStorage) {
  
	console.log("home controller");
	
	$scope.selectedcoll = "";
	
	if ($localStorage.collset) {
		$scope.selectedcoll = $localStorage.collset;
	}

	console.log('selcol at start: ' + $scope.selectedcoll);
	
	$scope.collectionList = [];
	getCollections();
	
	function listCollections(collections) {
		$scope.collectionList = angular.copy(collections);
		if ($scope.selectedcoll == "") {
				$scope.selectedcoll = $scope.collectionList[0];
		}
		console.log("collections processed: " + JSON.stringify($scope.collectionList));
	}
		
	 $scope.setSelected = function(collname) {	
		$scope.selectedcoll = collname;
		$localStorage.collset = $scope.selectedcoll;
		delete $sessionStorage.gates;
		delete $sessionStorage.locations;
		delete $sessionStorage.items;
		delete $sessionStorage.keywords;
	}
	
	$scope.addColl = function(newcoll) {
		console.log(" add collection " + newcoll);		
		if (newcoll) {
			console.log("contacting db...");
			return dataFactory.addCollection(newcoll)
				.then(function (data) {
					$scope.reqFile = $scope.testList;
					$scope.getFilename = $scope.filename;
					modalFactory.notify('Success', 'Collection added to database');
					getCollections();
				}, function (error) {
					modalFactory.error('Error', error);		
				});
		}
	}

	function getCollections() {
        dataFactory.getCollections()
			.then(function (data) {
				console.log("collections promise to return: " + data);
				listCollections(data);
			//	var collectionPromise = listCollections(data);
			//	return collectionPromise;				
            }, function (error) {
                modalFactory.error('Error', error);
            });
    }
	
}]);