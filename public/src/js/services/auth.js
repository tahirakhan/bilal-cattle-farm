'use strict';

angular.module('app')
  .service('auth', function ($http,API_URL,authToken,$q,$state) {
    
    var url = API_URL+ 'login';
     
    function authSuccessful(res){
        authToken.setToken(res.data.token);
        authToken.setUser(res.data.user);
        $state.go('app.dashboard');
        return res;
    }
    
    function authFailure(err){
        return $q.reject(err);
    }
    this.login = function(email,password){
        
        return $http.post(API_URL+ 'login',  {email : email,password: password}).then(authSuccessful,authFailure);
    }
    
    this.register = function(companyName,name,email,password){
        
        return $http.post(API_URL+ 'register',  {companyName:companyName,name:name,email : email,password: password}).then(authSuccessful,authFailure);
    }
    
  });
