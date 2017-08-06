'use strict';

/**
 * @ngdoc function
 * @name app.controller:BillcycleCtrl
 * @description
 * # BillcycleCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('BillCycleCtrl',['$scope','API_URL','$http','authToken','alert','$state', function($scope,API_URL,$http,authToken,alert,$state) {

    
    $scope.addNewBillCycle = function(){
      var data = {
          companyId:authToken.getUser().companyId,
          billCycleName:$scope.billCycleName,
          billCycleDescription:$scope.billCycleDescription,
          billCycleDays:$scope.billCycleDays
        };
      if($scope._id == null){ 
        $http.post(API_URL+ 'api/company/'+authToken.getUser().companyId+'/bill-cycle',data).then(function(res){
            alert('success','Added','New BillCycle Added');
            $scope._id = null;
            $state.go($state.current, {}, {reload: true});

          });
      }
      else{
        $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/bill-cycle/'+$scope._id).then(function(res){
          res.data.billCycleName = $scope.billCycleName;
          res.data.billCycleDescription = $scope.billCycleDescription;
          res.data.billCycleDays = $scope.billCycleDays;
          
            $http.put(API_URL+ 'api/company/'+authToken.getUser().companyId+'/bill-cycle/'+res.data._id,res.data).then(function(e){
                alert('success','Updated','New BillCycle Added');
                $scope._id = null;
                $state.go($state.current, {}, {reload: true});
            });
        });
      }
    },
    $scope.toggleActive = function(id,active){
      $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/bill-cycle/'+id).then(function(res){
          res.data.active = !active;
            $http.put(API_URL+ 'api/company/'+authToken.getUser().companyId+'/bill-cycle/'+res.data._id,res.data).then(function(e){
                alert('success','State Changed','Active/InActive');
                $scope._id = null;
                $state.go($state.current, {}, {reload: true});
            });
        });
    },
    $scope.edit = function(val){
      $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/bill-cycle/'+val).then(function(res){
          $scope.billCycleName = res.data.billCycleName;
          $scope.billCycleDescription = res.data.billCycleDescription;
          $scope.billCycleDays = res.data.billCycleDays;
          $scope._id = res.data._id;
      });
    },
    $scope.delete = function(val){
      $http.delete(API_URL+ 'api/company/'+authToken.getUser().companyId+'/bill-cycle/'+val).then(function(res){
          alert('success','Deleted','BillCycle Deleted');
          $state.go($state.current, {}, {reload: true});
      });
      
    },
    $scope.tbOptions = {
          data : [],
          sAjaxSource: API_URL+'api/company/'+authToken.getUser().companyId+'/bill-cycle',

          aoColumns: [
            { mData: 'selected' },
            { mData: 'billCycleName' },
            { mData: 'billCycleDescription' },
            { mData: 'billCycleDays' },
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
                aTargets: [4],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    if(!full.active)
                      tbAction += '<a onClick="angular.element(document.getElementById(\'BillCycleCtrl\')).scope().toggleActive(\''+full._id+'\','+full.active+')" ><i class="fa fa-thumbs-down"></i></button>';
                     else
                      tbAction += '<a onClick="angular.element(document.getElementById(\'BillCycleCtrl\')).scope().toggleActive(\''+full._id+'\','+full.active+')" ><i class="fa fa-thumbs-up"></i></button>'; 
                    return tbAction;
                }  
            },
            {
                aTargets: [5],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    tbAction += '<a onClick="angular.element(document.getElementById(\'BillCycleCtrl\')).scope().edit(\''+full._id+'\')" ><i class="fa fa-pencil"></i></button>';
                   return tbAction;
                }  
            },

            {
                aTargets: [6],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    tbAction += '<a onClick="angular.element(document.getElementById(\'BillCycleCtrl\')).scope().delete(\''+full._id+'\')" ><i class="fa fa-times"></i></button>';
                   return tbAction;
                }  
            }
        ]
        }
   }]);