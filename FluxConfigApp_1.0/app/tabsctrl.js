app.controller('tabsCtrl', ['$scope', '$location', '$sessionStorage', function ($scope, $location, $sessionStorage) {

$scope.tabs = [
	{ link : '#/home', label : 'Home' },
	{ link : '#/logicGates', label : 'Logic Gates' },
    	{ link : '#/locations', label : 'Locations' },	
	{ link : '#/items', label : 'Items' },
	{ link : '#/keywords', label : 'Keywords' }
];
	
  $scope.selectedTab = $scope.tabs[0];    
  
  $scope.setSelectedTab = function(tab) {
    $scope.selectedTab = tab;
  };
  
  $scope.tabClass = function(tab) {
    if ($scope.selectedTab == tab) {
      return "active";
    } else {
      return "";
    }
  }
  
  switch ($location.path()) {
	     case '/home':
                $scope.selectedTab = $scope.tabs[0];
                break;

            case '/logicGates':
                $scope.selectedTab = $scope.tabs[1];
                break;

            case '/locations':
                $scope.selectedTab = $scope.tabs[2];
                break;

            case '/items':
                $scope.selectedTab = $scope.tabs[3];
                break;
			
			case '/keywords':
                $scope.selectedTab = $scope.tabs[4];
                break;

            default:
                $scope.selectedTab = $scope.tabs[0];
                break;
        };
}]);

