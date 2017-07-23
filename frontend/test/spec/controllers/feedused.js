'use strict';

describe('Controller: FeedusedCtrl', function () {

  // load the controller's module
  beforeEach(module('nodeAngularAppApp'));

  var FeedusedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FeedusedCtrl = $controller('FeedusedCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FeedusedCtrl.awesomeThings.length).toBe(3);
  });
});
