'use strict';
angular.module('nodeAngularAppApp').config(function($urlRouterProvider,$stateProvider,$httpProvider) {
    
$urlRouterProvider.otherwise('/');     
  $stateProvider.state('main', {
    url: '/',
    templateUrl: '/views/main.html'
  })

  .state('register', {
    url: '/register',
    controller : 'RegisterCtrl',  
    templateUrl: '/views/register.html'
  })
    
.state('login', {
    url: '/login',
    controller : 'LoginCtrl',  
    templateUrl: '/views/login.html'
  })    

  .state('jobs', {
    url: '/jobs',
    controller : 'JobsCtrl',  
    templateUrl: '/views/jobs.html'
  })

  .state('logout', {
    url: '/logout',
    controller : 'LogoutCtrl'
  });
    
    $httpProvider.interceptors.push('authInterceptor');

})
.constant('API_URL','http://localhost:3000/');