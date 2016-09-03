app.controller('ModalConfirmCtrl', ['$scope', '$modalInstance', 'header', 'msg', 
						function ($scope, $modalInstance, header, msg) {

	$scope.header = header;
	$scope.msg = msg;
	
    $scope.no = function () {
        $modalInstance.dismiss('no');
    }; 
 
    $scope.yes = function () {
        $modalInstance.close('yes');
    }; 
}]);
app.controller('ModalErrorCtrl', ['$scope', '$modalInstance', 'header', 'msg', 
						function ($scope, $modalInstance, header, msg) {

	$scope.header = header;
	$scope.msg = msg;
	
    $scope.close = function(){
		$modalInstance.close();
		$scope.$destroy();
	}; 
}]);
app.controller('ModalFileCtrl', ['$scope', '$modalInstance', 'header', 'msg', 'items',
						function ($scope, $modalInstance, header, msg, items) {

	$scope.header = header;
	$scope.msg = msg;
	$scope.items = items;
	$scope.selected = {
		item: $scope.items[-1]
	};	
	
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }; 
 
    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    }; 
}]);
app.controller('ModalNotifyCtrl', ['$scope', '$modalInstance', 'header', 'msg', 
						function ($scope, $modalInstance, header, msg) {

	$scope.header = header;
	$scope.msg = msg;
	
	
    $scope.close = function(){
		$modalInstance.close();
		$scope.$destroy();
	}; 	
}]);
app.controller('ModalSaveCtrl', ['$scope', '$modalInstance', 'header', 'msg', 'filename',
						function ($scope, $modalInstance, header, msg, filename) {

	$scope.header = header;
	$scope.msg = msg;
	$scope.filename = filename;
	
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    }; 
 
    $scope.ok = function () {
        $modalInstance.close($scope.filename);
    }; 
}]);
app.controller('ModalTreeCtrl', ['$scope', '$modalInstance', 'filename', 'treedata',
						function ($scope, $modalInstance, filename, treedata) {
	console.log("modal ctrl, tree data: " + JSON.stringify(treedata));
	$scope.filename = filename;
	$scope.treedata = treedata;
		
    $scope.close = function(){
		$modalInstance.close();
		$scope.$destroy();
	}; 	
}]);