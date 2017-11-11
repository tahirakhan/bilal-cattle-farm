'use strict';

/**
 * @ngdoc function
 * @name app.controller:AnimalsCtrl
 * @description
 * # AnimalsCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('AnimalsCtrl',['$scope','API_URL','$http','authToken','alert','$state', function($scope,API_URL,$http,authToken,alert,$state) {

    
    $scope.addNewAnimal = function(){
      var data = {
          companyId:authToken.getUser().companyId,
          purchaseDate:$scope.purchaseDate,
          birthDate:$scope.birthDate,
          birthWeight:$scope.birthWeight,
          currentWeight:$scope.currentWeight,
          farmId:$scope.farmId,
          tagId:$scope.tagId,
          breed:$scope.breed,
          purchasePrice:$scope.purchasePrice,
          currentPrice:$scope.currentPrice

        };
      if($scope._id == null){ 
        $http.post(API_URL+ 'api/company/'+authToken.getUser().companyId+'/animal',data).then(function(res){
            alert('success','Added','New Animal Added');
            $scope._id = null;
            $state.go($state.current, {}, {reload: true});

          });
      }
      else{
        $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/animal/'+$scope._id).then(function(res){
          res.data.purchaseDate = $scope.purchaseDate;
          res.data.birthDate = $scope.birthDate;
          res.data.birthWeight = $scope.birthWeight;
          res.data.currentWeight = $scope.currentWeight;
          res.data.farmId = $scope.farmId;
          res.data.tagId = $scope.tagId;
          res.data.breed = $scope.breed;
          res.data.purchasePrice = $scope.purchasePrice;
          res.data.currentPrice = $scope.currentPrice;
          
            $http.put(API_URL+ 'api/company/'+authToken.getUser().companyId+'/animal/'+res.data._id,res.data).then(function(e){
                alert('success','Updated','New Animal Added');
                $scope._id = null;
                $state.go($state.current, {}, {reload: true});
            });
        });
      }
    },
    $scope.toggleActive = function(id,active){
      $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/animal/'+id).then(function(res){
          res.data.active = !active;
            $http.put(API_URL+ 'api/company/'+authToken.getUser().companyId+'/animal/'+res.data._id,res.data).then(function(e){
                alert('success','State Changed','Active/InActive');
                $scope._id = null;
                $state.go($state.current, {}, {reload: true});
            });
        });
    },
    $scope.edit = function(val){
      $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/animal/'+val).then(function(res){
          $scope.purchaseDate = res.data.purchaseDate;
          $scope.birthDate = res.data.birthDate;
          $scope.birthWeight = res.data.birthWeight;
          $scope.currentWeight = res.data.currentWeight;
          $scope.farmId = res.data.farmId;
          $scope.tagId = res.data.tagId;
          $scope.breed = res.data.breed;
          $scope.purchasePrice = res.data.purchasePrice;
          $scope.currentPrice = res.data.currentPrice;
          $scope._id = res.data._id;
      });
    },
    $scope.delete = function(val){
      $http.delete(API_URL+ 'api/company/'+authToken.getUser().companyId+'/animal/'+val).then(function(res){
          alert('success','Deleted','Animal Deleted');
          $state.go($state.current, {}, {reload: true});
      });
      
    },
    $scope.tbOptions = {
          data : [],
          sAjaxSource: API_URL+'api/company/'+authToken.getUser().companyId+'/animal',

          aoColumns: [
            { mData: 'selected' },
            { mData: 'animalId' },
            { mData: 'purchaseDate' },
            { mData: 'birthDate' },
            { mData: 'birthWeight' },
            { mData: 'currentWeight' },
            { mData: 'farmId' },
            { mData: 'tagId' },
            { mData: 'breed' },
            { mData: 'purchasePrice' },
            { mData: 'currentPrice' },

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
                aTargets: [11],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    if(!full.active)
                      tbAction += '<a onClick="angular.element(document.getElementById(\'AnimalsCtrl\')).scope().toggleActive(\''+full._id+'\','+full.active+')" ><i class="fa fa-thumbs-down"></i></button>';
                     else
                      tbAction += '<a onClick="angular.element(document.getElementById(\'AnimalsCtrl\')).scope().toggleActive(\''+full._id+'\','+full.active+')" ><i class="fa fa-thumbs-up"></i></button>'; 
                    return tbAction;
                }  
            },
            {
                aTargets: [12],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    tbAction += '<a onClick="angular.element(document.getElementById(\'AnimalsCtrl\')).scope().edit(\''+full._id+'\')" ><i class="fa fa-pencil"></i></button>';
                   return tbAction;
                }  
            },

            {
                aTargets: [13],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    tbAction += '<a onClick="angular.element(document.getElementById(\'AnimalsCtrl\')).scope().delete(\''+full._id+'\')" ><i class="fa fa-times"></i></button>';
                   return tbAction;
                }  
            }
        ]
        }
   }]);
