(function() {
    'use strict';

    var app = angular.module('taptap');

    app.controller('Level1', ['$scope', '$routeParams', 'playService', 'staffService', 'metService', 'inputService', 'outputService', 'feedbackService', 'evaluatorService',
        function($scope, $routeParams, playService, staffService, metService, inputService, outputService, feedbackService, evaluatorService) {
            var vm = this;
            var lines = getLines($routeParams.level);

            vm.playerStaff = staffService.playerStaff;
            vm.computerStaff = staffService.computerStaff;
            vm.input = inputService.input;
            vm.met = metService;
            vm.shouldPlayMet = metService.shouldPlayMet ? 'Met On' : 'Met Off';
            vm.toggleMet = function() {
                metService.shouldPlayMet = !metService.shouldPlayMet;
                vm.shouldPlayMet = metService.shouldPlayMet ? 'Met On' : 'Met Off';
            };
            vm.showComputer = function() {
                metService.startComputer(lines);
            };
            vm.showComputer();

            metService.length = lines.length;
            vm.feedback = feedbackService;
            vm.evaluation = evaluatorService.evaluation;
            vm.countOff = feedbackService.countOff;
        }]);

    function getLines(level) {
        switch (level) {
            default:
            case '1':
                return ['metupbeat', '', '', '',
                         'metdownbeat', '', '', '',
                         'metupbeat', '', '', '',
                         'metdownbeat', '', '', ''];
            case '2':
                return ['metupbeat', '', 'metdownbeat', '',
                        'metupbeat', '', 'metdownbeat', '',
                        'metdownbeat', '', 'metupbeat', '',
                        'metdownbeat', '', 'metupbeat', '', ];
            case '3':
                return ['metupbeat', 'metupbeat', 'metdownbeat', 'metdownbeat',
                         'metupbeat', 'metupbeat', 'metdownbeat', 'metdownbeat',
                         'metdownbeat', 'metdownbeat', 'metupbeat', 'metupbeat',
                         'metdownbeat', 'metdownbeat', 'metupbeat', 'metupbeat'];
            case '4':
                return ['metupbeat', 'metupbeat', 'metupbeat', 'metupbeat',
                         'metdownbeat', 'metdownbeat', 'metdownbeat', 'metdownbeat',
                         'metupbeat', 'metupbeat', 'metupbeat', 'metupbeat',
                         'metdownbeat', 'metdownbeat', 'metdownbeat', 'metdownbeat'];
                // repeats
            case '5':
                return ['metdownbeat', 'metdownbeat', '', 'metdownbeat',
                        'metupbeat', 'metdownbeat', 'metdownbeat', '',
                        'metdownbeat', 'metdownbeat', '', 'metdownbeat',
                        'metupbeat', '', 'metupbeat', '', ];
            case '6':
                return ['metdownbeat', 'metdownbeat', '', 'metdownbeat',
                        'metupbeat', 'metdownbeat', 'metdownbeat', '',
                        'metdownbeat', 'metdownbeat', '', 'metdownbeat',
                        'metupbeat', '', 'metupbeat', '', ];
            case '7':
                return ['metdownbeat', 'metdownbeat', '', 'metdownbeat',
                        'metupbeat', 'metdownbeat', 'metdownbeat', '',
                        'metdownbeat', 'metdownbeat', '', 'metdownbeat',
                        'metupbeat', '', 'metupbeat', '', ];
            case '8':
                return ['metdownbeat', 'metdownbeat', '', 'metdownbeat',
                        'metupbeat', 'metdownbeat', 'metdownbeat', '',
                        'metdownbeat', 'metdownbeat', '', 'metdownbeat',
                        'metupbeat', '', 'metupbeat', '', ];
            case '9':
                return ['metdownbeat', 'metdownbeat', '', 'metdownbeat',
                        'metupbeat', 'metdownbeat', 'metdownbeat', '',
                        'metdownbeat', 'metdownbeat', '', 'metdownbeat',
                        'metupbeat', '', 'metupbeat', '', ];
            case '10':
                return ['metdownbeat', 'metdownbeat', '', 'metdownbeat',
                        'metupbeat', 'metdownbeat', 'metdownbeat', '',
                        'metdownbeat', 'metdownbeat', '', 'metdownbeat',
                        'metupbeat', '', 'metupbeat', '', ];
        }
    }



})();
