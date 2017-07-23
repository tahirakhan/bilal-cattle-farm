'use strict';

describe('Controller: MilkdeliveryCtrl', function () {

  // load the controller's module
  beforeEach(module('nodeAngularAppApp'));

  var MilkdeliveryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MilkdeliveryCtrl = $controller('MilkdeliveryCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MilkdeliveryCtrl.awesomeThings.length).toBe(3);
  });
});
