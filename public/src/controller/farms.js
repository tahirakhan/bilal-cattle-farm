'use strict';

/**
 * @ngdoc function
 * @name app.controller:FarmsCtrl
 * @description
 * # FarmsCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('FarmsCtrl',['$scope','API_URL','$http','authToken','alert','$state', function($scope,API_URL,$http,authToken,alert,$state) {

    
    $scope.addNewFarm = function(){
      var data = {companyId:authToken.getUser().companyId,farmName:$scope.farmName};
      if($scope._id == null){ 
        $http.post(API_URL+ 'api/company/'+authToken.getUser().companyId+'/farm',data).then(function(res){
            alert('success','Added','New Farm Added');
            $scope._id = null;
            $state.go($state.current, {}, {reload: true});

          });
      }
      else{
        $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/farm/'+$scope._id).then(function(res){
          res.data.farmName = $scope.farmName;
            $http.put(API_URL+ 'api/company/'+authToken.getUser().companyId+'/farm/'+res.data._id,res.data).then(function(e){
                alert('success','Updated','New Farm Added');
                $scope._id = null;
                $state.go($state.current, {}, {reload: true});
            });
        });
      }
    },
    $scope.toggleActive = function(id,active){
      $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/farm/'+id).then(function(res){
          res.data.active = !active;
            $http.put(API_URL+ 'api/company/'+authToken.getUser().companyId+'/farm/'+res.data._id,res.data).then(function(e){
                alert('success','State Changed','Active/InActive');
                $scope._id = null;
                $state.go($state.current, {}, {reload: true});
            });
        });
    },
    $scope.edit = function(val){
      $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/farm/'+val).then(function(res){
          $scope.farmName = res.data.farmName;
          $scope._id = res.data._id;
      });
    },
    $scope.delete = function(val){
      $http.delete(API_URL+ 'api/company/'+authToken.getUser().companyId+'/farm/'+val).then(function(res){
          alert('success','Deleted','Farm Deleted');
          $state.go($state.current, {}, {reload: true});
      });
      
    },
    $scope.tbOptions = {
          data : [],
          sAjaxSource: API_URL+'api/company/'+authToken.getUser().companyId+'/farm',

          aoColumns: [
            { mData: 'selected' },
            { mData: 'farmName' },
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
                      tbAction += '<a onClick="angular.element(document.getElementById(\'FarmsCtrl\')).scope().toggleActive(\''+full._id+'\','+full.active+')" ><i class="fa fa-thumbs-down"></i></button>';
                     else
                      tbAction += '<a onClick="angular.element(document.getElementById(\'FarmsCtrl\')).scope().toggleActive(\''+full._id+'\','+full.active+')" ><i class="fa fa-thumbs-up"></i></button>'; 
                    return tbAction;
                }  
            },
            {
                aTargets: [3],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    tbAction += '<a onClick="angular.element(document.getElementById(\'FarmsCtrl\')).scope().edit(\''+full._id+'\')" ><i class="fa fa-pencil"></i></button>';
                   return tbAction;
                }  
            },

            {
                aTargets: [4],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    tbAction += '<a onClick="angular.element(document.getElementById(\'FarmsCtrl\')).scope().delete(\''+full._id+'\')" ><i class="fa fa-times"></i></button>';
                   return tbAction;
                }  
            }
        ]
        }
   }]);