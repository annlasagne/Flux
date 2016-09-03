	app.factory('modalFactory', ['$modal', function($modal) {

	var modalFactory = {};
	
	modalFactory.confirm = function (header, msg) {
        return $modal.open({
            templateUrl: 'modalConfirmTemplate.html',
            controller: 'ModalConfirmCtrl',
            resolve: {
                header: function () {
                    return angular.copy(header);
                },
                msg: function () {
                    return angular.copy(msg);
                }
            }
        }); 
    };
	
	modalFactory.notify = function (header, msg) {
        return $modal.open({
            templateUrl: 'modalNotifyTemplate.html',
            controller: 'ModalNotifyCtrl',
            resolve: {
                header: function () {
                    return angular.copy(header);
                },
                msg: function () {
                    return angular.copy(msg);
                }
            }
        }); 
    };
	
	modalFactory.error = function (header, msg) {
        return $modal.open({
            templateUrl: 'modalErrorTemplate.html',
            controller: 'ModalErrorCtrl',
            resolve: {
                header: function () {
                    return angular.copy(header);
                },
                msg: function () {
                    return angular.copy(msg);
                }
            }
        }); 
    };
	modalFactory.chooseFile = function (header, msg, items) {
		
        return $modal.open({
            templateUrl: 'modalFileTemplate.html',
            controller: 'ModalFileCtrl',
            resolve: {
                header: function () {
                    return angular.copy(header);
                },
                msg: function () {
                    return angular.copy(msg);
                },
				items: function () {
					return items;
				}
            }
        }); 
    };
	
	modalFactory.save = function (header, msg, filename) {
        return $modal.open({
            templateUrl: 'modalSaveTemplate.html',
            controller: 'ModalSaveCtrl',
            resolve: {
                header: function () {
                    return angular.copy(header);
                },
                msg: function () {
                    return angular.copy(msg);
                },
				filename: function () {
					return filename;
				}
            }
        }); 
    };
	
	modalFactory.tree = function (filename, treedata) {
		console.log("modal tree factory");
        return $modal.open({
            templateUrl: 'modalTreeTemplate.html',
            controller: 'ModalTreeCtrl',
            resolve: {
                filename: function () {
                    return angular.copy(filename);
                },
				treedata: function () {
                    return angular.copy(treedata);
                }
            }
        }); 
    };
    
    return modalFactory;
	}]);