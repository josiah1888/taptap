(function() {
    'use strict';

    var app = angular.module('taptap');

    app.controller('BasicLevel', ['$scope', '$routeParams', 'playService', 'staffService', 'metService', 'inputService', 'outputService', 'feedbackService', 'evaluatorService', 'focus',
        function($scope, $routeParams, playService, staffService, metService, inputService, outputService, feedbackService, evaluatorService, focus) {
            var vm = this;
            var lines = getLines($routeParams.level);

            focus('MainView');
            $scope.$on('$locationChangeStart', function() {
                metService.stopPlayer();
                metService.stopComputer();
                staffService.clear('player');
                staffService.clear('computer');
            });
            vm.playerStaff = staffService.playerStaff;
            vm.computerStaff = staffService.computerStaff;
            vm.input = inputService.input;
            vm.met = metService;
            vm.isMetOn = metService.shouldPlayMet;
            vm.toggleMet = function() {
                vm.isMetOn = metService.shouldPlayMet = !metService.shouldPlayMet;
            };
            vm.showComputer = function() {
                metService.startComputer(lines);
            };
            vm.showComputer();

            metService.length = lines.length;
            vm.feedback = feedbackService;
            vm.evaluation = evaluatorService.evaluation;
            vm.countOff = feedbackService.countOff;

            var _levels;
            vm.getLevels = function(i, levels) {
                if (typeof (_levels) === 'undefined') {
                    var i = i || 0;
                    var levels = levels || [];
                    if (getLines((++i).toString())) {
                        levels.push(i);
                        return vm.getLevels(i, levels);
                    } else {
                        _levels = levels;
                    }
                } else {
                    return _levels;
                }
            };
        }]);

    function getLines(level) {
        switch (level) {
            default:
                return null;
            case '1':
                return ['metupbeat', '', '', '',
                         'metdownbeat', '', '', '',
                         'metupbeat', '', '', '',
                         'metdownbeat', '', '', ''];
            case '2':
                return ['metupbeat', '', 'metdownbeat', '',
                        'metupbeat', '', 'metdownbeat', '',
                        'metdownbeat', '', 'metupbeat', '',
                        'metdownbeat', '', 'metupbeat', ''];
            case '3':
                return ['metupbeat', 'metupbeat', 'metdownbeat', 'metdownbeat',
                         'metupbeat', 'metupbeat', 'metdownbeat', 'metdownbeat',
                         'metdownbeat', 'metdownbeat', 'metupbeat', 'metupbeat',
                         'metdownbeat', 'metdownbeat', 'metupbeat', 'metupbeat'];
            case '4':
                return ['metupbeat', 'metupbeat', 'metupbeat', 'metdownbeat',
                         'metdownbeat', 'metdownbeat', 'metupbeat', '',
                         'metdownbeat', 'metdownbeat', '', 'metdownbeat',
                         'metdownbeat', 'metdownbeat', 'metupbeat', ''];
            case '5':
                return ['metdownbeat', '', 'metdownbeat', 'metdownbeat',
                        'metupbeat', 'metdownbeat', 'metdownbeat', '',
                        'metdownbeat', 'metdownbeat', '', 'metdownbeat',
                        'metupbeat', '', 'metupbeat', ''];
            case '6':
                return ['metdownbeat', 'metdownbeat', 'metdownbeat', '',
                        'metupbeat', '', '', 'metdownbeat',
                        'metdownbeat', 'metdownbeat', 'metdownbeat', '',
                        'metupbeat', '', 'metupbeat', ''];
            case '7':
                return ['metdownbeat', 'metdownbeat', '', 'metdownbeat',
                        'metupbeat', 'metdownbeat', 'metdownbeat', '',
                        'metdownbeat', 'metdownbeat', '', 'metdownbeat',
                        'metupbeat', '', 'metupbeat', ''];
            case '8':
                return ['metupbeat', 'metupbeat', '', '',
                        '', '', 'metdownbeat', 'metdownbeat',
                        'metupbeat', 'metupbeat', '', 'metupbeat',
                        'metdownbeat', 'metdownbeat', 'metdownbeat', ''];
            case '9':
                return ['metupbeat', '', '', 'metdownbeat',
                        '', 'metdownbeat', 'metdownbeat', '',
                        '', '', 'metdownbeat', 'metdownbeat',
                        'metupbeat', 'metupbeat', 'metupbeat', ''];
            case '10':
                return ['metdownbeat', '', 'metdownbeat', 'metdownbeat',
                        'metdownbeat', '', '', 'metupbeat',
                        '', 'metdownbeat', '', 'metupbeat',
                        'metupbeat', '', 'metupbeat', ''];
        }
    }
})();
