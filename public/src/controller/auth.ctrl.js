app.controller('AuthController', ['$scope', '$rest', '$state', 'authKey', 'toaster','auth','alert', function($scope, $rest, $state, authKey, toaster,auth,alert) {
  
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
    	 auth.login($scope.email, $scope.password)
       .then(
           function(res){
             alert('success','Welcome','Thanks for coming back, '+res.data.user.email+ '!');
             
           }, 
           function(err){
             alert('warning','Something went wrong :(', err.message);
           }
        );
        
    
	}
	
	$scope.signup = function(){
        
        auth.register($scope.email, $scope.password)
       .then(
           function(res){
             alert('success','Account Created!','Welcome, '+res.data.user.email+ '!');
           }, 
           function(err){
             alert('warning','Something went wrong :(', err.message);
           }
        );
        
    
    }
    

}]);