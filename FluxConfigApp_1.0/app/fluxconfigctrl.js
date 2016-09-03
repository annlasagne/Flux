app.controller('fluxConfigCtrl', ['$scope','dataFactory', 'modalFactory', 'treeFactory', '$sessionStorage', function ($scope, dataFactory, modalFactory, treeFactory, $sessionStorage) {
	
	if (!$sessionStorage.gates) {
		$sessionStorage.gates = {};
		$sessionStorage.gates.testList = [];
		$sessionStorage.gates.reqFile = [];
		$sessionStorage.gates.getFilename = "";
	}
	
	console.dir ($sessionStorage.gates.testList);
		
	$scope.testList = $sessionStorage.gates.testList;
	$scope.reqFile = $sessionStorage.gates.reqFile;
	$scope.getFilename = $sessionStorage.gates.getFilename;
	
    $scope.allFiles=[];
	$scope.items=[];
	$scope.readdetail = false;
	$scope.addedit = false;
	$scope.editmode = false;
	$scope.selectedRow = null; 
	$scope.submitted = false;
	$scope.hasError = false;
	$scope.testDetail= {};
	$scope.testTypes = ['T', 'O', 'A', 'RO', 'TIA'];
	$scope.functionTypes = ['J', 'P', 'G', 'W', 'M', 'E', 'TA', 'L', 'SIAT', 'SIAF'];
	$scope.theadMargin = {};
	$scope.scrollBarWidth = "0px";
	$scope.treedata = {};

	$scope.setScrollBarWidth = function () {
		$scope.scrollBarWidth = "0px"
		if ($scope.testList.length > 4) $scope.scrollBarWidth = "20px";
	}

	$scope.show = function(fieldname) {
		switch (fieldname) {
			case 'item':
				if ($scope.testDetail.type !== 'W' &&
					$scope.testDetail.type !== 'E' &&
					$scope.testDetail.type !== 'TA' &&
					$scope.testDetail.type !== 'L') {
					return true ;
					}
				break;
			case 'operator': 
				if ($scope.testDetail.type == 'T' ||
					$scope.testDetail.type == 'O' || 
					$scope.testDetail.type == 'A' || 
					$scope.testDetail.type == 'TA' ||
					$scope.testDetail.type =='RO' || 
					$scope.testDetail.type =='TIA') {
					return true ;
					}
				break;
			case 'attrib':
				if ($scope.testDetail.type == 'TIA' || 
					$scope.testDetail.type == 'SIAT'|| 
					$scope.testDetail.type == 'SIAF') {
					return true ;
					}
				break;
			case 'tochange':
			case 'target':
				if ($scope.testDetail.type == 'E') {
					return true ;
					}	
				break;
			case 'jumploc':
				if ($scope.testDetail.type == 'J' ||
					$scope.testDetail.type == 'TA' ||
					$scope.testDetail.type == 'M' ) {
					return true ;
					}
				break;
			default:
				return false;	
		}
	};
	
    $scope.clearAll = function() {
		modalFactory.confirm('Confirm Clear Screen', 'Are you sure you want to clear screen?')
		.result.then(function () {
			$sessionStorage.gates.reqFile = [];
			$scope.reqFile = $sessionStorage.gates.reqFile;
			$sessionStorage.gates.getFilename = "";
			$scope.getFilename = $sessionStorage.gates.getFilename;
			$sessionStorage.gates.testList = [];
			$scope.testList = $sessionStorage.gates.testList;
			$scope.readdetail = false;
			$scope.addedit = false;
			$scope.editmode = false;
			$scope.scrollBarWidth = "0px";
			$scope.testDetail = {};
		}, function () {
			console.log ("clear dismissed");
		});
	};
	
	$scope.highlightRow = function(index){
		$scope.selectedRow = index;
	}
		
	$scope.selectTest = function(selected) {
		$scope.testDetail = angular.copy(selected);
		$scope.readdetail = true;		
	};
	
	$scope.addNew = function() {
		$scope.testDetail = {};
		$scope.readdetail = false;
		$scope.addedit = true;
		$scope.editmode = false;
		$scope.highlightRow(-1);
	};
	
	$scope.editTest = function(index) {
		$scope.editmode = true;
		$scope.readdetail = false;
		$scope.addedit = true;			
	};
	
	$scope.treeView = function() {
		if ($scope.testList.length > 0) {
		console.log("call to build tree : ");console.log($scope.testList); 
			$scope.treedata = treeFactory.buildTree($scope.testList);  
			console.log("treedata returned : ");console.log(JSON.stringify($scope.treedata));	 
			var filename = $scope.getFilename || "TestTree"
			console.log("calling tree stuff with: " + JSON.stringify($scope.treedata));
			modalFactory.tree(filename, $scope.treedata);
		};
	};

	$scope.deleteLine = function(selected) {
		if ($scope.selectedRow >= 0 && $scope.selectedRow !== null) {
			modalFactory.confirm('Confirm Delete', 'Are you sure you want to delete this line?')
			.result.then(function () {
				var i = (($scope.testList.length - 1) - $scope.selectedRow);
				$scope.testList.splice(i, 1);
				for(i; i < $scope.testList.length; i++) {	
					$scope.testList[i].id = (i+1);
				}	
				$scope.setScrollBarWidth();
				$scope.highlightRow(-1);
			}, function () {
			});		
			$scope.readdetail=false;
			$scope.testDetail={};
			}
	};
	
	
	$scope.addUpdateTest = function() {
		$scope.submitted = true;
		$scope.detailForm.testname.$invalid = false;
		$scope.detailForm.passtext.$invalid = false;			
		
		if (!$scope.testDetail.name) {
			$scope.detailForm.testname.$invalid = true;	
		}
		if ($scope.testDetail.type == 'W' && !$scope.testDetail.passtext) {
			$scope.detailForm.passtext.$invalid = true;	
		}

	// Add New Test
		if (!$scope.detailForm.testname.$invalid && !$scope.detailForm.passtext.$invalid) {	
			if (!$scope.editmode) {
				$scope.testList.push($scope.testDetail);
				for(var i = 0; i < $scope.testList.length; i++) {	
					$scope.testList[i].id = (i+1);
					$scope.setScrollBarWidth();
				}											
	//Update Existing Test					
			} else {
				for(var i = 0; i < $scope.testList.length; i++) {
					if($scope.testList[i].id == $scope.testDetail.id) {
						$scope.testList[i] = $scope.testDetail;
					break;
					}
				}
			}
			
			$scope.testDetail = {};
			$scope.readdetail = false; 
			$scope.editmode = false;
			$scope.addedit = false;
			$scope.submitted = false;
		}
	};
	
	$scope.moveUp = function() { 
		if ($scope.selectedRow > 0) { 
			var i = (($scope.testList.length - 1) - $scope.selectedRow);
			$scope.temp = angular.copy($scope.testList[(i + 1)]);
			$scope.testList[(i + 1)] = angular.copy($scope.testList[i]);
			$scope.testList[i] = angular.copy($scope.temp);
			$scope.tempid = $scope.testList[i].id;
			$scope.testList[i].id = $scope.testList[i + 1].id;
			$scope.testList[i + 1].id = $scope.tempid;	
			$scope.selectedRow -= 1;			
		} 
	};
	
	$scope.moveDown = function() { 
		if ($scope.selectedRow < ($scope.testList.length - 1)) {  
			var i = (($scope.testList.length - 1) - $scope.selectedRow);		
			$scope.temp = angular.copy($scope.testList[(i - 1)]);
			$scope.testList[(i - 1)] = angular.copy($scope.testList[i]);
			$scope.testList[i] = angular.copy($scope.temp);
			$scope.tempid = $scope.testList[i].id;
			$scope.testList[i].id = $scope.testList[i - 1].id;
			$scope.testList[i - 1].id = $scope.tempid;	
			$scope.selectedRow += 1;
		} 
	};

	$scope.loadGate = function() {
		getConfigFiles();
	};
	
	$scope.saveGate = function() {
		if ($scope.testList.length > 0) {
			if ($scope.getFilename == "") {
				$scope.saveGateAs();
			} else 
			{ return dataFactory.updateConfigFile($scope.getFilename, $scope.testList)
				.then(function (data) {
					$scope.reqFile = $scope.testList;	
					modalFactory.notify('Success', 'File saved to database');
				}, function (error) {
					modalFactory.error('Error', error);	
				});
			}
		}
	};
	
	$scope.saveGateAs = function() {
		if ($scope.testList.length > 0) {
			$scope.filename = $scope.getFilename
			return modalFactory.save('Save File As', 'Select a name for this gate file:', $scope.filename)
						.result.then(function (filename) {
							$scope.filename = filename;
							return dataFactory.updateConfigFile($scope.filename, $scope.testList)
								.then(function (data) {
									$scope.reqFile = $scope.testList;
									$scope.getFilename = $scope.filename;
									modalFactory.notify('Success', 'File saved to database');
								}, function (error) {
									modalFactory.error('Error', error);		
								});
						}
						, function () {
							console.log ("file chooser dismissed, no filename given");
						})
		}
	};
	
	$scope.discardChanges = function() {		
		modalFactory.confirm('Confirm Discard', 'Are you sure you want to discard all your changes?')
		.result.then(function () {
			$scope.readdetail=false;
			$scope.testDetail={};
			$scope.testList = angular.copy($scope.reqFile);
			$sessionStorage.gates.testList = $scope.testList;
			$scope.setScrollBarWidth();
		}, function () {
			console.log ("discard dismissed");
		});
	
	};
	
	function getConfigFiles() {
        return dataFactory.getConfigFiles()
			.then(function (data) {
				var selectFilePromise = selectFile(data);
				return selectFilePromise;
				}, function (error) {
						modalFactory.error('Error', error);
				})
	}
					
	
	function selectFile(filelist) {
		$scope.items = angular.copy(filelist);
		modalFactory.chooseFile('Flux Config Files', 'Select a gate file to load', $scope.items)
			.result.then(function (selectedItem) {
				var getFilePromise = getFilename(selectedItem);
				return getFilePromise;
				}, function () {
				console.log ("file chooser dismissed");
				});
	}
	
		
	function getFilename(filename) {
        dataFactory.getFilename(filename)
			.then(function (data) {
				$sessionStorage.gates.reqFile = data;
				$scope.reqFile = $sessionStorage.gates.reqFile;
				$sessionStorage.gates.testList = angular.copy($scope.reqFile);
				$scope.testList = $sessionStorage.gates.testList;        
				$sessionStorage.gates.getFilename = filename;
				$scope.getFilename = $sessionStorage.gates.getFilename;
				$scope.setScrollBarWidth();
            }, function (error) {
                modalFactory.error('Error', error);
            });
    }
	
}]);