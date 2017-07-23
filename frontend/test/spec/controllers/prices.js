'use strict';

describe('Controller: PricesCtrl', function () {

  // load the controller's module
  beforeEach(module('nodeAngularAppApp'));

  var PricesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PricesCtrl = $controller('PricesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PricesCtrl.awesomeThings.length).toBe(3);
  });
});
