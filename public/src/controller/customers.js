'use strict';

/**
 * @ngdoc function
 * @name app.controller:CustomersCtrl
 * @description
 * # CustomersCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('CustomersCtrl',['$scope','API_URL','$http','authToken','alert','$state', function($scope,API_URL,$http,authToken,alert,$state) {

    
    $scope.addNewCustomer = function(){
      var data = {
          companyId:authToken.getUser().companyId,
          customerName:$scope.customerName,
          address:$scope.address,
          phone:$scope.phone,
          cnic:$scope.cnic,
          lastRate: $scope.lastRate,
          totalPaymentDue: $scope.totalPaymentDue
        };
      if($scope._id == null){ 
        $http.post(API_URL+ 'api/company/'+authToken.getUser().companyId+'/customer',data).then(function(res){
            alert('success','Added','New Customer Added');
            $scope._id = null;
            $state.go($state.current, {}, {reload: true});

          });
      }
      else{
        $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/customer/'+$scope._id).then(function(res){
          res.data.customerName = $scope.customerName;
          res.data.address = $scope.address;
          res.data.phone = $scope.phone;
          res.data.cnic = $scope.cnic;
          res.data.lastRate = $scope.lastRate;
          res.data.totalPaymentDue = $scope.totalPaymentDue;
          
            $http.put(API_URL+ 'api/company/'+authToken.getUser().companyId+'/customer/'+res.data._id,res.data).then(function(e){
                alert('success','Updated','New Customer Added');
                $scope._id = null;
                $state.go($state.current, {}, {reload: true});
            });
        });
      }
    },
    $scope.toggleActive = function(id,active){
      $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/customer/'+id).then(function(res){
          res.data.active = !active;
            $http.put(API_URL+ 'api/company/'+authToken.getUser().companyId+'/customer/'+res.data._id,res.data).then(function(e){
                alert('success','State Changed','Active/InActive');
                $scope._id = null;
                $state.go($state.current, {}, {reload: true});
            });
        });
    },
    $scope.edit = function(val){
      $http.get(API_URL+ 'api/company/'+authToken.getUser().companyId+'/customer/'+val).then(function(res){
          $scope.customerName = res.data.customerName;
          $scope.address = res.data.address;
          $scope.phone = res.data.phone;
          $scope.cnic = res.data.cnic;
          $scope.lastRate = res.data.lastRate;
          $scope.totalPaymentDue = res.data.totalPaymentDue;
          $scope._id = res.data._id;
      });
    },
    $scope.delete = function(val){
      $http.delete(API_URL+ 'api/company/'+authToken.getUser().companyId+'/customer/'+val).then(function(res){
          alert('success','Deleted','Customer Deleted');
          $state.go($state.current, {}, {reload: true});
      });
      
    },
    $scope.tbOptions = {
          data : [],
          sAjaxSource: API_URL+'api/company/'+authToken.getUser().companyId+'/customer',

          aoColumns: [
            { mData: 'selected' },
            { mData: 'customerName' },
            { mData: 'address' },
            { mData: 'phone' },
            { mData: 'cnic' },
            { mData: 'lastRate' },
            { mData: 'totalPaymentDue' },
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
                aTargets: [7],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    if(!full.active)
                      tbAction += '<a onClick="angular.element(document.getElementById(\'CustomersCtrl\')).scope().toggleActive(\''+full._id+'\','+full.active+')" ><i class="fa fa-thumbs-down"></i></button>';
                     else
                      tbAction += '<a onClick="angular.element(document.getElementById(\'CustomersCtrl\')).scope().toggleActive(\''+full._id+'\','+full.active+')" ><i class="fa fa-thumbs-up"></i></button>'; 
                    return tbAction;
                }  
            },
            {
                aTargets: [8],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    tbAction += '<a onClick="angular.element(document.getElementById(\'CustomersCtrl\')).scope().edit(\''+full._id+'\')" ><i class="fa fa-pencil"></i></button>';
                   return tbAction;
                }  
            },

            {
                aTargets: [9],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    tbAction += '<a onClick="angular.element(document.getElementById(\'CustomersCtrl\')).scope().delete(\''+full._id+'\')" ><i class="fa fa-times"></i></button>';
                   return tbAction;
                }  
            }
        ]
        }
   }]);
