var app = angular.module('fluxConfigApp', ['ui.bootstrap', 'ngRoute', 'ngStorage']);
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.
	when('/home', {
        templateUrl: 'app/partials/home.html',
        controller: 'homeCtrl'
      }).
      when('/logicGates', {
        templateUrl: 'app/partials/logicGates.html',
        controller: 'fluxConfigCtrl'
      }).
      when('/locations', {
        templateUrl: 'app/partials/locations.html',
        controller: 'locationsCtrl'
      }).
	  when('/items', {
        templateUrl: 'app/partials/items.html',
        controller: 'itemsCtrl'
      }).
	  when('/keywords', {
        templateUrl: 'app/partials/keywords.html',
        controller: 'keywordsCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
	  
//	  $locationProvider.html5Mode(true);
  }]);
 
 