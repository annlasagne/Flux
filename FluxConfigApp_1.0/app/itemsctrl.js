app.controller('itemsCtrl', ['$scope', 'dataFactory', 'modalFactory', '$sessionStorage',
  function ($scope, dataFactory, modalFactory, $sessionStorage) {
	
	if (!$sessionStorage.items) {
		$sessionStorage.items = {};
		$sessionStorage.items.itemList = [];
		$sessionStorage.items.reqFile = [];
	}
	
	console.dir ($sessionStorage.items.itemList);
		
	$scope.itemList = $sessionStorage.items.itemList;
	$scope.reqFile = $sessionStorage.items.reqFile;
	
	$scope.itemDetail = {};
	$scope.itemDetail.attributeList = []; 
	$scope.readdetail = false;
	$scope.editmode = false;
	$scope.selectedRow = null; 
	$scope.submitted = false;
	$scope.hasError = false;
	$scope.newname = "";
	$scope.newstate = false;
	$scope.theadMargin = {};
	$scope.scrollBarWidth = "0px";	

	$scope.setScrollBarWidth = function () {
		$scope.scrollBarWidth = "0px"
		if ($scope.itemList.length > 10) $scope.scrollBarWidth = "20px";
	}
	
	$scope.highlightRow = function(index){
		$scope.selectedRow = index;
	}
		
	$scope.selectItem = function(selected) {
		$scope.itemDetail = angular.copy(selected);
		$scope.readdetail = true;		
	};
	
	$scope.addNew = function() {
		$scope.itemDetail = {};
		$scope.itemDetail.attributeList = [];
		$scope.readdetail = false;
		$scope.addedit = true;
		$scope.editmode = false;
		$scope.highlightRow(-1);
	};
	
	$scope.edit = function(index) {
		console.log("edit item" + index);
		$scope.editmode = true;
		$scope.readdetail = false;
		$scope.addedit = true;			
	};
	
	$scope.delete = function(selected) {
		if ($scope.selectedRow >= 0 && $scope.selectedRow !== null) {
			modalFactory.confirm('Confirm Delete', 'Are you sure you want to delete this line?')
			.result.then(function () {
				var i = ($scope.selectedRow - 1);
				$scope.itemList.splice(i, 1);
				for(i=0; i < $scope.itemList.length; i++) {	
					$scope.itemList[i].ID = (i+1);
				}				
				$scope.setScrollBarWidth();
				$scope.highlightRow(-1);
			}, function () {
			});		
			$scope.readdetail=false;
			$scope.itemDetail = {};
			$scope.itemDetail.attributeList = [];
			}
	};
	
	$scope.clearAll = function() {
		modalFactory.confirm('Confirm Clear Screen', 'Are you sure you want to clear screen?')
		.result.then(function () {
			$sessionStorage.items.reqFile = [];
			$scope.reqFile = $sessionStorage.items.reqFile;
			$sessionStorage.items.itemList = [];
			$scope.itemList = $sessionStorage.items.itemList;
			$scope.readdetail = false;
			$scope.addedit = false;
			$scope.editmode = false;
			$scope.scrollBarWidth = "0px";
			$scope.itemDetail = {};
		}, function () {
			console.log ("clear dismissed");
		});
	};
	
	$scope.addUpdate = function() {
		console.log(" add update, data: " + $scope.itemDetail);
		$scope.submitted = true;
		$scope.detailForm.token.$invalid = false;			
		
		if (!$scope.itemDetail.token) {
			$scope.detailForm.token.$invalid = true;	
		}

	// Add New Test
		if (!$scope.detailForm.token.$invalid) {
			
			if (!$scope.editmode) {
				console.log("add new item");
				$scope.itemDetail.ID = ($scope.itemList.length + 1);
				$scope.itemList.push($scope.itemDetail);
				$scope.setScrollBarWidth();															
	//Update Existing Test					
			} else {
				console.log("update item");
				for(var i = 0; i < $scope.itemList.length; i++) {
					if($scope.itemList[i].ID == $scope.itemDetail.ID) {
						$scope.itemList[i] = $scope.itemDetail;
					break;
					}
				}
			}
			
			$scope.itemDetail = {};
			$scope.itemDetail.attributeList = [];
			$scope.readdetail = false; 
			$scope.editmode = false;
			$scope.addedit = false;
			$scope.submitted = false;
			$scope.selectedRow = null;
		}
	};

	$scope.load = function() {
		getItems();
	};
	
	$scope.save = function() {
		if ($scope.itemList.length > 0) {
			return dataFactory.updateItems($scope.itemList)
				.then(function (data) {
					console.log("save success");
					$scope.reqFile = $scope.itemList;	
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
			$scope.itemDetail = {};
			$scope.itemDetail.attributeList = [];
			$scope.itemList = angular.copy($scope.reqFile);
			$sessionStorage.items.itemList = $scope.itemList;
			$scope.setScrollBarWidth();
		}, function () {
			console.log ("discard dismissed");
		});
	
	};
		
	function getItems() {
        dataFactory.getItems()
			.then(function (data) {
				$sessionStorage.items.reqFile = data;
				$scope.reqFile = $sessionStorage.items.reqFile;
				$sessionStorage.items.itemList = angular.copy($scope.reqFile);
				$scope.itemList = $sessionStorage.items.itemList;
				$scope.setScrollBarWidth();
            }, function (error) {
                modalFactory.error('Error', error);
            });
    }
	
}]);