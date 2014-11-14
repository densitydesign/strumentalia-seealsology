'use strict';

describe('Controller: AltctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('wikiDiverApp'));

  var AltctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AltctrlCtrl = $controller('AltctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
