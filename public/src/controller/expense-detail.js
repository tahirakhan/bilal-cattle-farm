'use strict';

/**
 * @ngdoc function
 * @name app.controller:ExpenseDetailCtrl
 * @description
 * # ExpenseDetailCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('ExpenseDetailCtrl',['$scope','API_URL','$http','authToken','alert','$state','$stateParams','FEED_PURCHASE','ANIMAL_PURCHASE', function($scope,API_URL,$http,authToken,alert,$state,$stateParams,FEED_PURCHASE,ANIMAL_PURCHASE) {

    $scope.expenseId = $stateParams.ID;
    $scope.FEED_PURCHASE = FEED_PURCHASE;
    $scope.ANIMAL_PURCHASE = ANIMAL_PURCHASE;

    $scope.createExpense = function() {
        $http.post(API_URL+ 'api/company/'+authToken.getUser().companyId+'/expense',{
            expenseDescription:$scope.expenseDescription,
            companyId:authToken.getUser().companyId,
            expenseDate : Date.now,
            expenseTotal : 0
        }).then(function(res){
            
            $scope.expenseId = res.data.expenseId;
            $scope.createExpenseDetail();
          });

    };

    $scope.createExpenseDetail = function (){
        var data = {
            companyId:authToken.getUser().companyId,    
            
            expenseDescription:$scope.expenseDescription,
            productId : $scope.productId == undefined ? '' : $scope.productId,
            animalId : $scope.animalId == undefined ? '' : $scope.animalId,
            expenseId : $scope.expenseId,
            expenseTypeId : $scope.expenseTypeId,
            quantity : $scope.quantity,
            amount : $scope.amount,
            total : $scope.total
        };

      if($scope._id == null){ 
        $http.post(API_URL+ 'api/company/'+authToken.getUser().companyId+'/expense-detail',data).then(function(res){
            
            
            
            
            $scope.createSubEntities();
            
            
            
            alert('success','Added','New Expense Added');            
            $scope._id = null;
            $state.go($state.current, {ID:$scope.expenseId}, {reload: true});

          });
      }
      else{
        $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/expense-detail/'+$scope._id).then(function(res){

        res.data.expenseDescription=$scope.expenseDescription;
        res.data.productId = $scope.productId == undefined ? '' : $scope.productId;
        res.data.animalId = $scope.animalId == undefined ? '' : $scope.animalId;
        res.data.expenseId = $scope.expenseId;
        res.data.expenseTypeId = $scope.expenseTypeId;
        res.data.quantity = $scope.quantity;
        res.data.amount = $scope.amount;
        res.data.total = $scope.total;

            $http.put(API_URL+ 'api/company/'+authToken.getUser().companyId+'/expense-detail/'+res.data._id,res.data).then(function(e){
                alert('success','Updated','New Expense Added');
                $scope._id = null;
                $state.go($state.current, {ID:$scope.expenseId}, {reload: true});
            });
        });
      }

    }
    $scope.addNewExpenseDetail = function(){

        if($scope.expenseId == ""){
            $scope.createExpense();
        }
        else {
            $scope.createExpenseDetail();
        }
 

      
    },

    $scope.createSubEntities = function(){
        if($scope.expenseTypeId === ANIMAL_PURCHASE){
        // Add New entry in animal

        $scope.animal.purchaseDate = Date.now;
        $scope.animal.purchasePrice = $scope.amount
        $scope.animal.currentPrice = $scope.amount

        }
        if($scope.expenseTypeId === FEED_PURCHASE){
        // Add or update stock

        }
    }
    $scope.toggleActive = function(id,active){
      $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/expense-detail/'+id).then(function(res){
          res.data.active = !active;
            $http.put(API_URL+ 'api/company/'+authToken.getUser().companyId+'/expense-detail/'+res.data._id,res.data).then(function(e){
                alert('success','State Changed','Active/InActive');
                $scope._id = null;
                $state.go($state.current, {}, {reload: true});
            });
        });
    },
    $scope.edit = function(val){
      $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/expense-detail/'+val).then(function(res){
        $scope.expenseDescription = res.data.expenseDescription;
        $scope.productId = res.data.productId;
        $scope.animalId = res.data.animalId;
        $scope.expenseId = res.data.expenseId;
        $scope.expenseTypeId = res.data.expenseTypeId;
        $scope.quantity = res.data.quantity;
        $scope.amount = res.data.amount;
        $scope.total = res.data.total;

        $scope._id = res.data._id;
      });
    },
    $scope.delete = function(val){
      $http.delete(API_URL+ 'api/company/'+authToken.getUser().companyId+'/expense-detail/'+val).then(function(res){
          alert('success','Deleted','Expense Deleted');
          $state.go($state.current, {}, {reload: true});
      });
      
    },
    $scope.tbOptions = {
          data : [],
          sAjaxSource: API_URL+'api/company/'+authToken.getUser().companyId+'/expense-detail/expense/'+$scope.expenseId,

          aoColumns: [
            { mData: 'selected' },
            { mData: 'expenseDescription' },
            { mData: 'productId' },
            { mData: 'animalId' },
            { mData: 'expenseTypeId' },
            { mData: 'quantity' },
            { mData: 'amount' },
            { mData: 'total' },
            { mData: 'active' },
            { mData: '_id' },
            { mData: '_id' }
          ],
        aoColumnDefs: [
            {
                aTargets: [0],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    tbAction += '<input type="checkbox" ng-model="data.selected" />';
                   return tbAction;
                }  
            },

            {
                aTargets: [8],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    if(!full.active)
                      tbAction += '<a onClick="angular.element(document.getElementById(\'ExpenseDetailCtrl\')).scope().toggleActive(\''+full._id+'\','+full.active+')" ><i class="fa fa-thumbs-down"></i></button>';
                     else
                      tbAction += '<a onClick="angular.element(document.getElementById(\'ExpenseDetailCtrl\')).scope().toggleActive(\''+full._id+'\','+full.active+')" ><i class="fa fa-thumbs-up"></i></button>'; 
                    return tbAction;
                }  
            },
            {
                aTargets: [9],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    tbAction += '<a onClick="angular.element(document.getElementById(\'ExpenseDetailCtrl\')).scope().edit(\''+full._id+'\')" ><i class="fa fa-pencil"></i></button>';
                   return tbAction;
                }  
            },

            {
                aTargets: [10],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    tbAction += '<a onClick="angular.element(document.getElementById(\'ExpenseDetailCtrl\')).scope().delete(\''+full._id+'\')" ><i class="fa fa-times"></i></button>';
                   return tbAction;
                }  
            }
        ]
        }
   }]);