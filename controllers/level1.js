(function() {
    'use strict';

    var app = angular.module('taptap');

    app.controller('Level1', ['playService', 'staffService', 'metService', 'inputService', 'outputService', 'feedbackService', 'evaluatorService',
        function(playService, staffService, metService, inputService, outputService, feedbackService, evaluatorService) {
            var vm = this;

            vm.playerStaff = staffService.playerStaff;
            vm.computerStaff = staffService.computerStaff;
            vm.input = inputService.input;
            vm.met = metService;
            vm.shouldPlayMet = metService.shouldPlayMet ? 'Met On' : 'Met Off';
            vm.toggleMet = function() {
                metService.met = !metService.met;
                vm.met = metService.met ? 'Met On' : 'Met Off';
            };

            var lines = [
                'metupbeat', 'metupbeat', 'metupbeat', 'metupbeat',
                'metdownbeat', 'metdownbeat', 'metdownbeat', 'metdownbeat',
                'metupbeat', 'metupbeat', 'metupbeat', 'metupbeat',
                'metdownbeat', 'metdownbeat', 'metdownbeat', 'metdownbeat',
            ];
            vm.showComputer = function() {
                metService.startComputer(lines);
            };
            metService.length = lines.length;

            vm.feedback = feedbackService;

            vm.evaluation = evaluatorService.evaluation;

            vm.countOff = feedbackService.countOff;
        }]);
})();
