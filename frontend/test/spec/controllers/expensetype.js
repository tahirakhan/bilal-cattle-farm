'use strict';

describe('Controller: ExpensetypeCtrl', function () {

  // load the controller's module
  beforeEach(module('nodeAngularAppApp'));

  var ExpensetypeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ExpensetypeCtrl = $controller('ExpensetypeCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ExpensetypeCtrl.awesomeThings.length).toBe(3);
  });
});
