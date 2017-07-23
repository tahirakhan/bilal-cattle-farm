'use strict';

describe('Controller: DairypaymentCtrl', function () {

  // load the controller's module
  beforeEach(module('nodeAngularAppApp'));

  var DairypaymentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DairypaymentCtrl = $controller('DairypaymentCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DairypaymentCtrl.awesomeThings.length).toBe(3);
  });
});
