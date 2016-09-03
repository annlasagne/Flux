app.controller('locationsCtrl', ['$scope', 'dataFactory', 'modalFactory', '$sessionStorage', 
  function ($scope, dataFactory, modalFactory, $sessionStorage) {
	console.log("location controller");
	
	if (!$sessionStorage.locations) {
		$sessionStorage.locations = {};
		$sessionStorage.locations.locationList = [];
		$sessionStorage.locations.reqFile = [];		
	}

	console.dir ($sessionStorage.locations.locationList);
		
	$scope.locationList = $sessionStorage.locations.locationList;
	$scope.reqFile = $sessionStorage.locations.reqFile;
	
	$scope.locationDetail = {}; 
	$scope.locationDetail.directionList = []; 
	$scope.readdetail = false;
	$scope.editmode = false;
	$scope.selectedRow = null; 
	$scope.submitted = false;
	$scope.hasError = false;
	$scope.theadMargin = {};
	$scope.scrollBarWidth = "0px";
	$scope.directions = ["NORTH", "SOUTH", "EAST", "WEST", "NORTHWEST", "NORTHEAST", "SOUTHWEST", "SOUTHEAST"];
	

	$scope.setScrollBarWidth = function () {
		$scope.scrollBarWidth = "0px"
		if ($scope.locationList.length > 10) $scope.scrollBarWidth = "20px";
	}
	
	$scope.highlightRow = function(index){
		$scope.selectedRow = index;
	}
		
	$scope.selectItem = function(selected) {
		$scope.locationDetail = angular.copy(selected);
		$scope.readdetail = true;		
	};
	
	$scope.addNew = function() {
		$scope.locationDetail = {};
		$scope.locationDetail.directionList = [];
		$scope.readdetail = false;
		$scope.addedit = true;
		$scope.editmode = false;
		$scope.highlightRow(-1);
	};
	
	$scope.edit = function(index) {
		console.log("edit location" + index);
		$scope.editmode = true;
		$scope.readdetail = false;
		$scope.addedit = true;			
	};
	
	$scope.delete = function(selected) {
		if ($scope.selectedRow >= 0 && $scope.selectedRow !== null) {
			modalFactory.confirm('Confirm Delete', 'Are you sure you want to delete this line?')
			.result.then(function () {
				var i = ($scope.selectedRow - 1);
				$scope.locationList.splice(i, 1);
				for(i=0; i < $scope.locationList.length; i++) {	
					$scope.locationList[i].ID = (i+1);
				}				
				$scope.setScrollBarWidth();
				$scope.highlightRow(-1);
			}, function () {
			});		
			$scope.readdetail=false;
			$scope.locationDetail = {};
			$scope.locationDetail.directionList = [];
			}
	};
	
	$scope.clearAll = function() {
		modalFactory.confirm('Confirm Clear Screen', 'Are you sure you want to clear screen?')
		.result.then(function () {
			$sessionStorage.locations.reqFile = [];
			$scope.reqFile = $sessionStorage.locations.reqFile;
			$sessionStorage.locations.locationList = [];
			$scope.locationList = $sessionStorage.locations.locationList;
			$scope.readdetail = false;
			$scope.addedit = false;
			$scope.editmode = false;
			$scope.scrollBarWidth = "0px";
			$scope.locationDetail = {};
		}, function () {
			console.log ("clear dismissed");
		});
	};
	
	$scope.addUpdate = function() {
		console.log(" add update, data: " + $scope.locationDetail);
		$scope.submitted = true;
		$scope.detailForm.token.$invalid = false;			
		
		if (!$scope.locationDetail.token) {
			$scope.detailForm.token.$invalid = true;	
		}

	// Add New Test
		if (!$scope.detailForm.token.$invalid) {
		
			if (!$scope.editmode) {
				console.log("add new location");
				$scope.locationDetail.ID = ($scope.locationList.length + 1);
				$scope.locationList.push($scope.locationDetail);
				$scope.setScrollBarWidth();															
	//Update Existing Test					
			} else {
				console.log("update location");
				for(var i = 0; i < $scope.locationList.length; i++) {
					if($scope.locationList[i].ID == $scope.locationDetail.ID) {
						$scope.locationList[i] = $scope.locationDetail;
					break;
					}
				}
			}
			
			$scope.locationDetail = {};
			$scope.locationDetail.directionList = [];
			$scope.readdetail = false; 
			$scope.editmode = false;
			$scope.addedit = false;
			$scope.submitted = false;
			$scope.selectedRow = null;
		}
	};

	$scope.load = function() {
		getLocations();
	};
	
	$scope.save = function() {
		if ($scope.locationList.length > 0) {
			return dataFactory.updateLocations($scope.locationList)
				.then(function (data) {
					console.log("save success");
					$scope.reqFile = $scope.locationList;	
					modalFactory.notify('Success  - database updated', data);
				}, function (error) {
					modalFactory.error('Error', error);	
				});
			}
	};
	
	$scope.discardChanges = function() {		
		modalFactory.confirm('Confirm Discard', 'Are you sure you want to discard all your changes?')
		.result.then(function () {
			$scope.readdetail = false;
			$scope.locationDetail = {};
			$scope.locationDetail.directionList = [];
			$scope.locationList = angular.copy($scope.reqFile);
			$sessionStorage.locations.locationList = $scope.locationList;
			$scope.setScrollBarWidth();
		}, function () {
			console.log ("discard dismissed");
		});
	
	};
		
	function getLocations() {
        dataFactory.getLocations()
			.then(function (data) {
                $sessionStorage.locations.reqFile = data;
				$scope.reqFile = $sessionStorage.locations.reqFile;
				$sessionStorage.locations.locationList = angular.copy($scope.reqFile);
				$scope.locationList = $sessionStorage.locations.locationList;
				$scope.setScrollBarWidth();
            }, function (error) {
                modalFactory.error('Error', error);
            });
    }
	
}]);