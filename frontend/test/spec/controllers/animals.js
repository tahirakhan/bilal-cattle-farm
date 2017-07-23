'use strict';

describe('Controller: AnimalsCtrl', function () {

  // load the controller's module
  beforeEach(module('nodeAngularAppApp'));

  var AnimalsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AnimalsCtrl = $controller('AnimalsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AnimalsCtrl.awesomeThings.length).toBe(3);
  });
});
