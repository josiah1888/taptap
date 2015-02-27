(function() {
    'use strict';

    var app = angular.module('taptap');

    app.controller('Play', ['$scope', 'playService', 'staffService', 'metService', 'inputService',
        function($scope, playService, staffService, metService, inputService) {
            var vm = this;

            vm.staff = staffService.staff;
            vm.input = inputService.input;
            vm.met = metService.met ? 'Met On' : 'Met Off';
            vm.toggleMet = function() {
                metService.met = !metService.met;
                vm.met = metService.met ? 'Met On' : 'Met Off';
            };

        }]);
})();
