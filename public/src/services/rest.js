app.service ("$rest", function ($http, $q, $location, $rootScope, authKey, $state){

    var host = $location.host ();
    
    
    /* Tahir Bhai here you can set the production service base URL */
    var baseURL = "http://localhost:9000/";

    if (host.indexOf("localhost") != -1) {
        /* Here you can set the localhost services URL */
        baseURL = "http://localhost:9000/";
    } else if (host.indexOf("staging") != -1) {
        /* Here you can set staging services URL */
        baseURL = "http://localhost:9000/";
    }

    function call (route, options){

		var request = $http ({
			method: ((options && options.method) ? options.method : "GET"),
			url: baseURL + ((route) ? route : null),
			headers: ((options && options.headers) ? options.headers : null),
			data: ((options && options.data) ? options.data : null)
		});
        
		return (request.then (success, fail));
	}

    function fail (response){
        return ($q.reject (response.data));
    }

    function success (response){
        return (response.data);
    }

    return {
        call: call,
    };
});
