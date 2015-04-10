(function() {
    'use strict';

    var app = angular.module('taptap');

    app.controller('Play', ['playService', 'staffService', 'metService', 'inputService',
        function(playService, staffService, metService, inputService) {
            var vm = this;

            vm.staff = staffService.playerStaff;
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
