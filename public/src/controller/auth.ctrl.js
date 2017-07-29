app.controller('AuthController', ['$scope', '$rest', '$state', 'authKey', 'toaster', function($scope, $rest, $state, authKey, toaster) {
  
	// I just prepopulate the user object.. 
	// It will save the time to login again and again
	this.user = {
		email: 'tahir@vroozi.com',
		password: 'a',
	}
	// app.dashboard
	// console.log('This is auth controller');
	
	/* here you can check if user was already logged in then move toward the dashboard */
	if (authKey.get().loggedin) {
		$state.go("app.dashboard");
	}

	// Login
    this.signin = function(){
    	$rest.call("login", { data: this.user, method: 'POST' }).then(function(data){
        	// In case of success logged keep the data into authKey and redirect to dashboard
        	authKey.set({ user: data, loggedin: true });
        	toaster.success('Success', 'User Successfully Loggedin');
        	$state.go("app.dashboard");
        }, function(err){
        	// in case of failure clear the authKey Data
        	authKey.set();
        	toaster.error('Error', 'Error while loggedin user');
        });
    };

}]);