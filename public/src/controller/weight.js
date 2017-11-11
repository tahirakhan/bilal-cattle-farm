'use strict';

/**
 * @ngdoc function
 * @name app.controller:WeightCtrl
 * @description
 * # WeightCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('WeightCtrl',['$scope','API_URL','$http','authToken','alert','$state', function($scope,API_URL,$http,authToken,alert,$state) {

    $scope.fetchAnimalDetails = function(){
       $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/animal/animal-id/'+$scope.animalId).then(function(animal){
         if(animal.data){
            $scope.currentPrice = animal.data.currentPrice;
            $scope.birthWeight = animal.data.birthWeight; 
         }
          else{
            $scope.currentPrice = '';
            $scope.birthWeight = '';
          }
          
       });
       $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/weight/animal-id/'+$scope.animalId).then(function(weight){
         if(weight.data){
            $scope.previousWeightDate = weight.data.date;
            $scope.previousWeight = weight.data.weight;
         }
          else{
            $scope.previousWeightDate = '';
            $scope.previousWeight = '';            
          }
       }); 
    }
    
    $scope.addNewWeight = function(){
      var data = {
        companyId:authToken.getUser().companyId,
        date:$scope.date,
        animalId:$scope.animalId,
        weight:$scope.weight,
        currentPrice:$scope.currentPrice,
        birthWeight:$scope.birthWeight,
        previousWeightDate:$scope.previousWeightDate,
        previousWeight:$scope.previousWeight 
      };
      if($scope._id == null){ 
        $http.post(API_URL+ 'api/company/'+authToken.getUser().companyId+'/weight',data).then(function(res){
            alert('success','Added','New Weight Added');
            $scope._id = null;
            $state.go($state.current, {}, {reload: true});

          });
      }
      else{
        $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/weight/'+$scope._id).then(function(res){
          res.data.animalId = $scope.animalId;
          res.data.date = $scope.date;
          res.data.weight = $scope.weight;
          res.data.currentPrice = $scope.currentPrice;
          res.data.birthWeight = $scope.birthWeight;
          res.data.previousWeightDate = $scope.previousWeightDate;
          res.data.previousWeight = $scope.previousWeight;

            $http.put(API_URL+ 'api/company/'+authToken.getUser().companyId+'/weight/'+res.data._id,res.data).then(function(e){
                alert('success','Updated','New Weight Added');
                $scope._id = null;
                $state.go($state.current, {}, {reload: true});
            });
        });
      }
    },
    $scope.toggleActive = function(id,active){
      $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/weight/'+id).then(function(res){
          res.data.active = !active;
            $http.put(API_URL+ 'api/company/'+authToken.getUser().companyId+'/weight/'+res.data._id,res.data).then(function(e){
                alert('success','State Changed','Active/InActive');
                $scope._id = null;
                $state.go($state.current, {}, {reload: true});
            });
        });
    },
    $scope.edit = function(val){
      $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/weight/'+val).then(function(res){
          $scope.animalId = res.data.animalId;
          $scope.date = res.data.date;
          $scope.weight = res.data.weight;
          $scope.currentPrice = res.data.currentPrice;
          $scope.birthWeight = res.data.birthWeight;
          $scope.previousWeightDate = res.data.previousWeightDate;
          $scope.previousWeight = res.data.previousWeight;      
          $scope._id = res.data._id;
      });
    },
    $scope.delete = function(val){
      $http.delete(API_URL+ 'api/company/'+authToken.getUser().companyId+'/weight/'+val).then(function(res){
          alert('success','Deleted','Weight Deleted');
          $state.go($state.current, {}, {reload: true});
      });
      
    },
    $scope.tbOptions = {
          data : [],
          sAjaxSource: API_URL+'api/company/'+authToken.getUser().companyId+'/weight',

          aoColumns: [
            { mData: 'selected' },
            { mData: 'animalId' },
            { mData: 'date' },
            { mData: 'weight' },
            { mData: 'currentPrice' },
            { mData: 'birthWeight' },
            { mData: 'previousWeightDate' },
            { mData: 'previousWeight' },
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
                      tbAction += '<a onClick="angular.element(document.getElementById(\'WeightCtrl\')).scope().toggleActive(\''+full._id+'\','+full.active+')" ><i class="fa fa-thumbs-down"></i></button>';
                     else
                      tbAction += '<a onClick="angular.element(document.getElementById(\'WeightCtrl\')).scope().toggleActive(\''+full._id+'\','+full.active+')" ><i class="fa fa-thumbs-up"></i></button>'; 
                    return tbAction;
                }  
            },
            {
                aTargets: [9],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    tbAction += '<a onClick="angular.element(document.getElementById(\'WeightCtrl\')).scope().edit(\''+full._id+'\')" ><i class="fa fa-pencil"></i></button>';
                   return tbAction;
                }  
            },

            {
                aTargets: [10],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    tbAction += '<a onClick="angular.element(document.getElementById(\'WeightCtrl\')).scope().delete(\''+full._id+'\')" ><i class="fa fa-times"></i></button>';
                   return tbAction;
                }  
            }
        ]
        }
   }]);