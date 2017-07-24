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
  })
  
  .state('company', {
    url: '/company',
    controller : 'CompanyCtrl',  
    templateUrl: '/views/company.html'
  })
  
  .state('farms', {
    url: '/farms',
    controller : 'FarmsCtrl',  
    templateUrl: '/views/farms.html'
  })
  
  .state('tags', {
    url: '/tags',
    controller : 'TagsCtrl',  
    templateUrl: '/views/tags.html'
  })
    
  .state('expense', {
    url: '/expense',
    controller : 'ExpenseCtrl',  
    templateUrl: '/views/expense.html'
  })
  
  .state('expense-type', {
    url: '/expenseType',
    controller : 'ExpenseTypeCtrl',  
    templateUrl: '/views/expenseType.html'
  })
  
  .state('products', {
    url: '/products',
    controller : 'ProductsCtrl',  
    templateUrl: '/views/products.html'
  })
  
  .state('animals', {
    url: '/animals',
    controller : 'AnimalsCtrl',  
    templateUrl: '/views/animals.html'
  })
  
  .state('bill-cycle', {
    url: '/billCycle',
    controller : 'BillCycleCtrl',  
    templateUrl: '/views/billCycle.html'
  })

  .state('customers', {
    url: '/customers',
    controller : 'CustomersCtrl',  
    templateUrl: '/views/customers.html'
  })

  .state('milk-delivery', {
    url: '/milkDelivery',
    controller : 'MilkDeliveryCtrl',  
    templateUrl: '/views/milkDelivery.html'
  })

  .state('dairy-payment', {
    url: '/dairyPayment',
    controller : 'DairyPaymentCtrl',  
    templateUrl: '/views/dairyPayment.html'
  })

  .state('weight', {
    url: '/weight',
    controller : 'WeightCtrl',  
    templateUrl: '/views/weight.html'
  })
  
  .state('stock', {
    url: '/stock',
    controller : 'StockCtrl',  
    templateUrl: '/views/stock.html'
  })
  .state('users', {
    url: '/users',
    controller : 'UsersCtrl',  
    templateUrl: '/views/users.html'
  })
  
  .state('feed-used', {
    url: '/feedUsed',
    controller : 'FeedUsedCtrl',  
    templateUrl: '/views/feedUsed.html'
  })
  
  .state('prices', {
    url: '/prices',
    controller : 'PricesCtrl',  
    templateUrl: '/views/prices.html'
  })
  
  .state('dairy-record', {
    url: '/dairyRecord',
    controller : 'DairyRecordCtrl',  
    templateUrl: '/views/dairyRecord.html'
  });
  
  
  
  
  
    
    $httpProvider.interceptors.push('authInterceptor');

})
.constant('API_URL','http://localhost:3000/');