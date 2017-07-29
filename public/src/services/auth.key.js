app.factory ("authKey", ['$localStorage', '$location', function ($localStorage, $location){

	var host = $location.host ();
	var empty = {
		user: null,
		loggedin: false
	};

	if (host.indexOf("localhost") != -1){
		/*
		Tahir bhai here you can pre populate the user data and set loggedin true.. 
		It will save your time to login again and again on localhost
		 */
	}

	function set (values){
		if (values == null)
			$localStorage.bilalCattleFarmSessionData = empty;
		else
			$localStorage.bilalCattleFarmSessionData = values;
	}

	function setKey (key, value){
		var old = get ();
		old[key] = value;
		$localStorage.bilalCattleFarmSessionData = old;
	}

	function get (){
		if (angular.isDefined ($localStorage.bilalCattleFarmSessionData))
			return $localStorage.bilalCattleFarmSessionData;
		return empty;
	}

	return ({
		set: set,
		get: get,
		setKey: setKey
	});

}]);
