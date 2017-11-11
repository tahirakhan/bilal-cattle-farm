'use strict';

/**
 * @ngdoc function
 * @name app.controller:DairyrecordCtrl
 * @description
 * # DairyrecordCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('DairyRecordCtrl',['$scope','API_URL','$http','authToken','alert','$state', function($scope,API_URL,$http,authToken,alert,$state) {

    
    $scope.addNewDairyRecord = function(){
      var data = {companyId:authToken.getUser().companyId,
        animalId:$scope.animalId,
        date:$scope.date,
        weight:$scope.weight
        
      };
      if($scope._id == null){ 
        $http.post(API_URL+ 'api/company/'+authToken.getUser().companyId+'/dairy-record',data).then(function(res){
            alert('success','Added','New Dairy Record Added',100);
            $scope._id = null;
            $state.go($state.current, {}, {reload: true});

          });
      }
      else{
        $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/dairy-record/'+$scope._id).then(function(res){
          res.data.animalId = $scope.animalId;
          res.data.date = $scope.date;
          res.data.weight = $scope.weight;
            $http.put(API_URL+ 'api/company/'+authToken.getUser().companyId+'/dairy-record/'+res.data._id,res.data).then(function(e){
                alert('success','Updated','Dairy Record updated',100);
                $scope._id = null;
                $state.go($state.current, {}, {reload: true});
            });
        });
      }
    },
    $scope.toggleActive = function(id,active){
      $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/dairy-record/'+id).then(function(res){
          res.data.active = !active;
            $http.put(API_URL+ 'api/company/'+authToken.getUser().companyId+'/dairy-record/'+res.data._id,res.data).then(function(e){
                alert('success','State Changed','Active/InActive');
                $scope._id = null;
                $state.go($state.current, {}, {reload: true});
            });
        });
    },
    $scope.edit = function(val){
      $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/dairy-record/'+val).then(function(res){
          $scope.animalId = res.data.animalId;
          $scope.date = res.data.date;
          $scope.weight = res.data.weight;

          $scope._id = res.data._id;
      });
    },
    $scope.delete = function(val){
      $http.delete(API_URL+ 'api/company/'+authToken.getUser().companyId+'/dairy-record/'+val).then(function(res){
          alert('success','Deleted','Dairy Record Deleted');
          $state.go($state.current, {}, {reload: true});
      });
      
    },
    $scope.tbOptions = {
          data : [],
          sAjaxSource: API_URL+'api/company/'+authToken.getUser().companyId+'/dairy-record',

          aoColumns: [
            { mData: 'selected' },
            { mData: 'animalId' },
            { mData: 'date' },
            { mData: 'weight' },
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
                      tbAction += '<a onClick="angular.element(document.getElementById(\'DairyRecordCtrl\')).scope().toggleActive(\''+full._id+'\','+full.active+')" ><i class="fa fa-thumbs-down"></i></button>';
                     else
                      tbAction += '<a onClick="angular.element(document.getElementById(\'DairyRecordCtrl\')).scope().toggleActive(\''+full._id+'\','+full.active+')" ><i class="fa fa-thumbs-up"></i></button>'; 
                    return tbAction;
                }  
            },
            {
                aTargets: [5],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    tbAction += '<a onClick="angular.element(document.getElementById(\'DairyRecordCtrl\')).scope().edit(\''+full._id+'\')" ><i class="fa fa-pencil"></i></button>';
                   return tbAction;
                }  
            },

            {
                aTargets: [6],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    tbAction += '<a onClick="angular.element(document.getElementById(\'DairyRecordCtrl\')).scope().delete(\''+full._id+'\')" ><i class="fa fa-times"></i></button>';
                   return tbAction;
                }  
            }
        ]
        }
   }]);