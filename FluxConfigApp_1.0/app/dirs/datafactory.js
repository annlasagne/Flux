	app.factory('dataFactory', ['$http', '$q', '$localStorage', function($http, $q, $localStorage) {

    var urlBase = 'http://82.20.25.252:8888/fluxapi';
	var dataFactory = {};
	var collset = "";
	
	dataFactory.getCollections = function () {
		console.log("GET all collections");
        return $http.get(urlBase + '/collections').then(
                function (results) {
                    return results.data;
                }, function(error) {
					if (error.status == 0) {
						var errormsg = "Server unavailable - cannot get collections";
					} else {
						var errormsg = ("Server access error: " + error.status + ", " + error.statusText);
					}
					return $q.reject(errormsg);
				});
    };
	
	dataFactory.addCollection = function(newcoll) {
		console.log("POST new collection: " + " data: " + newcoll);
        return $http.post(urlBase + '/collections', newcoll, 
			{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
				.then(function(results) {
					console.log("df add new collection success: " + results.data);
					return results.data;
				}, function(error) {
					if (error.status == 0) {
						var errormsg = "Server unavailable - cannot add collection";
					} else {
						var errormsg = ("Add collection error: " + error.status + ", " + error.statusText);
					}
					return $q.reject(errormsg);
				});
    };
	
    dataFactory.getConfigFiles = function () {
		collset = $localStorage.collset || 'Flux';
		console.log("GET all files, collset is : " + collset);
        return $http.get(urlBase + '/gates', {params: {"collset": collset}}).then(
                function (results) {
                    return results.data;
                }, function(error) {
					if (error.status == 0) {
						var errormsg = "Server unavailable - cannot get config files";
					} else {
						var errormsg = ("Server access error: " + error.status + ", " + error.statusText);
					}
					return $q.reject(errormsg);
				});
    };
  
    dataFactory.getFilename = function (filename) {
		collset = $localStorage.collset || 'Flux';
		console.log("GET filename: " + filename);
        return $http.get(urlBase + '/gatefile/' + filename, {params: {"collset": collset}}).then(
                function (results) {
					console.log("get results data: " + results.data);
                    return results.data;
                }, function(error) {
					if (error.status == 0) {
						var errormsg = "Server unavailable - cannot get selected file";
					} else {
						var errormsg = ("Get file esrror: " + error.status + ", " + error.statusText);
					}
					 return $q.reject(errormsg);
				});
    };

    
    dataFactory.updateConfigFile = function (filename, filedata) {
		collset = $localStorage.collset || 'Flux';
		console.log("POSTit: " + (urlBase + '/' + filename) + " data: " + filedata);
        return $http.post(urlBase + '/gatefile/' + filename, filedata, 
			{params: {"collset": collset}, headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
				.then(function(results) {
					console.log("df post success: " + results.data);
					return results.data;
				}, function(error) {
					if (error.status == 0) {
						var errormsg = "Server unavailable - cannot save file";
					} else {
						var errormsg = ("Save error: " + error.status + ", " + error.statusText);
					}
					return $q.reject(errormsg);
				});
    };

    dataFactory.deleteConfigFile = function (filename) {
		collset = $localStorage.collset || 'Flux';
        return $http.delete(urlBase + '/gatefile/' + filename, {params: {"collset": collset}}).then(
                function (results) {
                    return results.status;
                });
    };
	
	dataFactory.getItems = function () {
		collset = $localStorage.collset || 'Flux';
		console.log("GET items: ");
        return $http.get(urlBase + '/items', {params: {"collset": collset}}).then(
                function (results) {
					console.log("get results data: " + results.data);
                    return results.data;
                }, function(error) {
					if (error.status == 0) {
						var errormsg = "Server unavailable - cannot get items";
					} else {
						var errormsg = ("Get items error: " + error.status + ", " + error.statusText);
					}
					 return $q.reject(errormsg);
				});
    };
	
	dataFactory.updateItems = function (itemdata) {
		collset = $localStorage.collset || 'Flux';
		console.log("POSTit: " + " data: " + itemdata);
        return $http.post(urlBase + '/items', itemdata, 
			{params: {"collset": collset}, headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
				.then(function(results) {
					console.log("df post items success: " + results.data);
					return results.data;
				}, function(error) {
					if (error.status == 0) {
						var errormsg = "Server unavailable - cannot update items";
					} else {
						var errormsg = ("Save items error: " + error.status + ", " + error.statusText);
					}
					return $q.reject(errormsg);
				});
    };
	
	dataFactory.getLocations = function () {
		collset = $localStorage.collset || 'Flux';
		console.log("GET locations: ");
        return $http.get(urlBase + '/locations', {params: {"collset": collset}}).then(
                function (results) {
					console.log("get results data: " + results.data);
                    return results.data;
                }, function(error) {
					if (error.status == 0) {
						var errormsg = "Server unavailable - cannot get locations";
					} else {
						var errormsg = ("Get locations error: " + error.status + ", " + error.statusText);
					}
					 return $q.reject(errormsg);
				});
    };
	
	dataFactory.updateLocations = function (data) {
		collset = $localStorage.collset || 'Flux';
		console.log("POSTit: " + (urlBase + '/locations') + " data: " + data);
        return $http.post(urlBase + '/locations', data, 
			{params: {"collset": collset}, headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
				.then(function(results) {
					console.log("df post items success: " + results.data);
					return results.data;
				}, function(error) {
					if (error.status == 0) {
						var errormsg = "Server unavailable - cannot update locations";
					} else {
						var errormsg = ("Save locations error: " + error.status + ", " + error.statusText);
					}
					return $q.reject(errormsg);
				});
    };
	
	dataFactory.getKeywords = function () {
		collset = $localStorage.collset || 'Flux';
		console.log("GET keywords: ");
        return $http.get(urlBase + '/keywords', {params: {"collset": collset}}).then(
                function (results) {
					console.log("get results data: " + results.data);
                    return results.data;
                }, function(error) {
					if (error.status == 0) {
						var errormsg = "Server unavailable - cannot get keywords";
					} else {
						var errormsg = ("Get keywords error: " + error.status + ", " + error.statusText);
					}
					 return $q.reject(errormsg);
				});
    };
	
	dataFactory.updateKeywords = function (data) {
		collset = $localStorage.collset || 'Flux';
		console.log("POSTit: " + (urlBase + '/keywords') + " data: " + data);
        return $http.post(urlBase + '/keywords', data, 
			{params: {"collset": collset}, headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
				.then(function(results) {
					console.log("df post items success: " + results.data);
					return results.data;
				}, function(error) {
					if (error.status == 0) {
						var errormsg = "Server unavailable - cannot update keywords";
					} else {
						var errormsg = ("Save keywords error: " + error.status + ", " + error.statusText);
					}
					return $q.reject(errormsg);
				});
    };
	
    return dataFactory;
}]);
