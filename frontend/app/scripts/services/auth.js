'use strict';

angular.module('nodeAngularAppApp')
  .service('auth', function ($http,API_URL,authToken,$q,$state) {
    
    var url = API_URL+ 'login';
     
    function authSuccessful(res){
        authToken.setToken(res.data.token);
        $state.go('main');
        return res;
    }
    
    function authFailure(err){
        return $q.reject(err);
    }
    this.login = function(email,password){
        
        return $http.post(API_URL+ 'login',  {email : email,password: password}).then(authSuccessful,authFailure);
    }
    
    this.register = function(email,password){
        
        return $http.post(API_URL+ 'register',  {email : email,password: password}).then(authSuccessful,authFailure);
    }
    
  });
