'use strict';

/**
 * @ngdoc function
 * @name app.controller:ExpensetypeCtrl
 * @description
 * # ExpensetypeCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('ExpenseTypeCtrl',['$scope','API_URL','$http','authToken','alert','$state', function($scope,API_URL,$http,authToken,alert,$state) {

    
    $scope.addNewExpenseType = function(){
      var data = {companyId:authToken.getUser().companyId,expenseTypeName:$scope.expenseTypeName};
      if($scope._id == null){ 
        $http.post(API_URL+ 'api/company/'+authToken.getUser().companyId+'/expense-type',data).then(function(res){
            alert('success','Added','New ExpenseType Added');
            $scope._id = null;
            $state.go($state.current, {}, {reload: true});

          });
      }
      else{
        $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/expense-type/'+$scope._id).then(function(res){
          res.data.expenseTypeName = $scope.expenseTypeName;
            $http.put(API_URL+ 'api/company/'+authToken.getUser().companyId+'/expense-type/'+res.data._id,res.data).then(function(e){
                alert('success','Updated','New ExpenseType Added');
                $scope._id = null;
                $state.go($state.current, {}, {reload: true});
            });
        });
      }
    },
    $scope.toggleActive = function(id,active){
      $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/expense-type/'+id).then(function(res){
          res.data.active = !active;
            $http.put(API_URL+ 'api/company/'+authToken.getUser().companyId+'/expense-type/'+res.data._id,res.data).then(function(e){
                alert('success','State Changed','Active/InActive');
                $scope._id = null;
                $state.go($state.current, {}, {reload: true});
            });
        });
    },
    $scope.edit = function(val){
      $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/expense-type/'+val).then(function(res){
          $scope.expenseTypeName = res.data.expenseTypeName;
          $scope._id = res.data._id;
      });
    },
    $scope.delete = function(val){
      $http.delete(API_URL+ 'api/company/'+authToken.getUser().companyId+'/expense-type/'+val).then(function(res){
          alert('success','Deleted','ExpenseType Deleted');
          $state.go($state.current, {}, {reload: true});
      });
      
    },
    $scope.tbOptions = {
          data : [],
          sAjaxSource: API_URL+'api/company/'+authToken.getUser().companyId+'/expense-type',

          aoColumns: [
            { mData: 'selected' },
            { mData: 'expenseTypeName' },
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
                aTargets: [2],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    if(!full.active)
                      tbAction += '<a onClick="angular.element(document.getElementById(\'ExpenseTypeCtrl\')).scope().toggleActive(\''+full._id+'\','+full.active+')" ><i class="fa fa-thumbs-down"></i></button>';
                     else
                      tbAction += '<a onClick="angular.element(document.getElementById(\'ExpenseTypeCtrl\')).scope().toggleActive(\''+full._id+'\','+full.active+')" ><i class="fa fa-thumbs-up"></i></button>'; 
                    return tbAction;
                }  
            },
            {
                aTargets: [3],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    tbAction += '<a onClick="angular.element(document.getElementById(\'ExpenseTypeCtrl\')).scope().edit(\''+full._id+'\')" ><i class="fa fa-pencil"></i></button>';
                   return tbAction;
                }  
            },

            {
                aTargets: [4],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    tbAction += '<a onClick="angular.element(document.getElementById(\'ExpenseTypeCtrl\')).scope().delete(\''+full._id+'\')" ><i class="fa fa-times"></i></button>';
                   return tbAction;
                }  
            }
        ]
        }
   }]);