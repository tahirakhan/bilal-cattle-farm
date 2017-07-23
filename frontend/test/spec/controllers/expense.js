'use strict';

describe('Controller: ExpenseCtrl', function () {

  // load the controller's module
  beforeEach(module('nodeAngularAppApp'));

  var ExpenseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExpenseCtrl = $controller('ExpenseCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ExpenseCtrl.awesomeThings.length).toBe(3);
  });
});
