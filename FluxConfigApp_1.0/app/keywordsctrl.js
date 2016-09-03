app.controller('keywordsCtrl', ['$scope', 'dataFactory', 'modalFactory', '$sessionStorage',
  function ($scope, dataFactory, modalFactory, $sessionStorage) {
  
	console.log("keyword controller");
	
	if (!$sessionStorage.keywords) {
		$sessionStorage.keywords = {};
		$sessionStorage.keywords.keywordList = [];
		$sessionStorage.keywords.reqFile = [];		
	}

	console.dir ($sessionStorage.keywords.keywordList);
		
	$scope.keywordList = $sessionStorage.keywords.keywordList;
	$scope.reqFile = $sessionStorage.keywords.reqFile;
	
	$scope.readdetail = false;
	$scope.editmode = false;
	$scope.selectedRow = null; 
	$scope.submitted = false;
	$scope.hasError = false;
	$scope.keywordDetail= {};
	$scope.theadMargin = {};
	$scope.scrollBarWidth = "0px";	

	$scope.setScrollBarWidth = function () {
		$scope.scrollBarWidth = "0px"
		if ($scope.keywordList.length > 10) $scope.scrollBarWidth = "20px";
	}
	
	$scope.highlightRow = function(index){
		$scope.selectedRow = index;
	}
		
	$scope.selectItem = function(selected) {
		$scope.keywordDetail = angular.copy(selected);
		$scope.readdetail = true;		
	};
	
	$scope.addNew = function() {
		$scope.keywordDetail = {};
		$scope.readdetail = false;
		$scope.addedit = true;
		$scope.editmode = false;
		$scope.highlightRow(-1);
	};
	
	$scope.edit = function(index) {
		console.log("edit keyword" + index);
		$scope.editmode = true;
		$scope.readdetail = false;
		$scope.addedit = true;			
	};
	
	$scope.delete = function(selected) {
		if ($scope.selectedRow >= 0 && $scope.selectedRow !== null) {
			modalFactory.confirm('Confirm Delete', 'Are you sure you want to delete this line?')
			.result.then(function () {
				var i = ($scope.selectedRow - 1);
				$scope.keywordList.splice(i, 1);
				for(i=0; i < $scope.keywordList.length; i++) {	
					$scope.keywordList[i].ID = (i+1);
				}				
				$scope.setScrollBarWidth();
				$scope.highlightRow(-1);
			}, function () {
			});		
			$scope.readdetail=false;
			$scope.keywordDetail = {};
			}
	};
	
	$scope.clearAll = function() {
		modalFactory.confirm('Confirm Clear Screen', 'Are you sure you want to clear screen?')
		.result.then(function () {
			$sessionStorage.keywords.reqFile = [];
			$scope.reqFile = $sessionStorage.keywords.reqFile;
			$sessionStorage.keywords.keywordList = [];
			$scope.keywordList = $sessionStorage.keywords.keywordList;
			$scope.readdetail = false;
			$scope.addedit = false;
			$scope.editmode = false;
			$scope.scrollBarWidth = "0px";
			$scope.keywordDetail = {};
		}, function () {
			console.log ("clear dismissed");
		});
	};
	
	$scope.addUpdate = function() {
		console.log(" add update, data: " + $scope.keywordDetail);
		$scope.submitted = true;
		$scope.detailForm.token.$invalid = false;			
		
		if (!$scope.keywordDetail.token) {
			$scope.detailForm.token.$invalid = true;	
		}

	// Add New Test
		if (!$scope.detailForm.token.$invalid) {
			if (!$scope.editmode) {
				console.log("add new keyword");
				$scope.keywordDetail.ID = ($scope.keywordList.length + 1);
				$scope.keywordList.push($scope.keywordDetail);
				$scope.setScrollBarWidth();															
	//Update Existing Test					
			} else {
				console.log("update keyword");
				for(var i = 0; i < $scope.keywordList.length; i++) {
					if($scope.keywordList[i].ID == $scope.keywordDetail.ID) {
						$scope.keywordList[i] = $scope.keywordDetail;
					break;
					}
				}
			}
			
			$scope.keywordDetail = {};
			$scope.readdetail = false; 
			$scope.editmode = false;
			$scope.addedit = false;
			$scope.submitted = false;
			$scope.selectedRow = null;
		}
	};

	$scope.load = function() {
		getKeywords();
	};
	
	$scope.save = function() {
		if ($scope.keywordList.length > 0) {
			return dataFactory.updateKeywords($scope.keywordList)
				.then(function (data) {
					console.log("save success");
					$scope.reqFile = $scope.keywordList;	
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
			$scope.keywordDetail = {};
			$scope.keywordList = angular.copy($scope.reqFile);
			$sessionStorage.keywords.keywordList = $scope.keywordList;
			$scope.setScrollBarWidth();
		}, function () {
			console.log ("discard dismissed");
		});
	
	};
		
	function getKeywords() {
        dataFactory.getKeywords()
			.then(function (data) {
                $sessionStorage.keywords.reqFile = data;
				$scope.reqFile = $sessionStorage.keywords.reqFile;
				$sessionStorage.keywords.keywordList = angular.copy($scope.reqFile);
				$scope.keywordList = $sessionStorage.keywords.keywordList;
				$scope.setScrollBarWidth();
            }, function (error) {
                modalFactory.error('Error', error);
            });
    }
	
}]);