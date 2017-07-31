'use strict';

/**
 * @ngdoc function
 * @name app.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('UsersCtrl', function ($scope) {

    $scope.edit = function(val){
      console.log('id= '+val);
    },
    $scope.delete = function(val){
      console.log('id= '+val);
    },
    $scope.tbOptions = {
          data : [],
          sAjaxSource: 'api/user.json',
          aoColumns: [
            { mData: 'selected' },
            { mData: 'name' },
            { mData: 'email' },
            { mData: 'password' },
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
                aTargets: [5],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    tbAction += '<button type="button" ng-click="edit('+full._id+')"   ><i class="fa fa-pencil"></i></button>';
                   return tbAction;
                }  
            },

            {
                aTargets: [6],
                mRender: function (data, type, full) {
                    var tbAction = '';
                    tbAction += '<button type="button" ng-click="delete('+full._id+')" ><i class="fa fa-times"></i></button>';
                   return tbAction;
                }  
            }
        ]
        }
  });
