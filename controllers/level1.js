(function() {
    'use strict';

    var app = angular.module('taptap');

    app.controller('Level1', ['playService', 'staffService', 'metService', 'inputService',
        function(playService, staffService, metService, inputService) {
            var vm = this;

            vm.playerStaff = staffService.staff;
            vm.input = inputService.input;
            vm.met = metService.met ? 'Met On' : 'Met Off';
            vm.toggleMet = function() {
                metService.met = !metService.met;
                vm.met = metService.met ? 'Met On' : 'Met Off';
            };

            metService.length = 16;

            vm.feedback = inputService.feedback;
        }]);
})();
