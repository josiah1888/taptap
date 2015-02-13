(function() {
    'use strict';

    var app = angular.module('taptap');

    app.controller('Play', ['$scope', '$interval', '$sce', function($scope, $interval, $sce) {
        var vm = this;

        // #region declarations
        vm.tempo = 60;
        var s = 15 / (vm.tempo / 1000);
        vm.staff = {
            border: [],
            high: [],
            mid: [],
            low: [],
            compiled: [],
            length: 0
        };

        $scope.$watch(
            function() {
                return vm.staff.border;
            },
            function() {
                vm.staff.length = vm.staff.border.length;
            }
        );

        vm.staff.clear = function() {
            vm.staff.border = [];
            vm.staff.high = [];
            vm.staff.mid = [];
            vm.staff.low = [];
            vm.staff.compiled = [];
            vm.staff.length = 0;
        };

        vm.audioFileNames = [
            {
                fileName: 'bell',
                prefferedName: 'Bell'
            },
            {
                fileName: 'csharp',
                prefferedName: 'C#'
            },
            {
                fileName: 'metdownbeat',
                prefferedName: 'Met Upbeat'
            },
            {
                fileName: 'metupbeat',
                prefferedName: 'Met Downbeat'
            }
        ];

        var keyCodeMap = {
            38: 'up',
            40: 'down',
            37: 'left',
            39: 'right',
            32: 'space',
            13: 'enter',
            70: 'f',
            71: 'g',
            72: 'h',
            74: 'j'
        };

        var offIcon = '<i class="glyphicon glyphicon-asterisk off"></i>';
        var onIcon = '<i class="glyphicon glyphicon-asterisk on"></i>';

        $scope.trustedOff = $sce.trustAsHtml(offIcon);
        // #endregion 

        var showBeat = function(beat) {
            vm.staff.border = vm.staff.border + '-';
            vm.staff.high = vm.staff.high + '-';
            vm.staff.mid = vm.staff.mid + '-';
            vm.staff.low = vm.staff.low + '-';

            if (beat === 'metdownbeat') {
                vm.staff.low = vm.staff.low.substr(0, vm.staff.border.length - 1) + 'x';
            } else if (beat === 'metupbeat') {
                vm.staff.high = vm.staff.high.substr(0, vm.staff.border.length - 1) + 'o';

            } else if (beat === 'csharp') {

            } else if (beat === 'bell') {

            }
        };

        vm.keyPress = function($event) {
            var key = keyCodeMap[$event.keyCode];
            var beat;

            if ((key === 'down') || (key === 'f') || (key === 'j')) {
                beat = 'metdownbeat';
            } else if ((key === 'up') || (key === 'g') || (key === 'h')) {
                beat = 'metupbeat';
            } else if (key === 'space') {
                beat = 'csharp';
            } else if (key === 'enter') {
                beat = 'bell';
            }

            if (typeof beat !== 'undefined') {
                vm.play(beat);
                currentBeat = beat;

                if (!isStarted) {
                    vm.startTest();
                }
            }
        };

        vm.play = function(beat) {
            beat = document.getElementById(beat);
            if (beat.ended === false) {
                beat.pause();
                beat.currentTime = 0;
            }
            beat.play();
        };

        var currentBeat;
        var stop;
        var isStarted = false;
        vm.startTest = function() {
            var i = 0;
            vm.staff.clear();

            var start = $interval(function() {
                if (currentBeat === 'metdownbeat') {
                    vm.staff.low = vm.addToStaff(vm.staff.low);
                } else if (currentBeat === 'metupbeat') {
                    vm.staff.high = vm.addToStaff(vm.staff.high);
                } else {
                    vm.addToStaff();
                }
                splitBars();
                currentBeat = undefined;
                ++i;
                if (i === 16) {
                    isStarted = false;
                } else {
                    isStarted = true;
                }

            }, s, 16);
            stop = function() {
                $interval.cancel(start);
            };
        };
        vm.advanceStaff = function() {
            vm.staff.border.push('off');
            vm.staff.high.push('off');
            vm.staff.mid.push('off');
            vm.staff.low.push('off');
            vm.staff.compiled.push('off');
        };

        vm.addToStaff = function(line) {
            vm.advanceStaff();
            if (typeof line === 'undefined') {
                return;
            } else {
                vm.staff.compiled.pop();
                vm.staff.compiled.push(1);
                line.pop();
                line.push('on');
                return line;
            }
        };

        var splitBars = function() {
            
            if ((vm.staff.compiled.length) % 16 === 0) {
                vm.staff.border.push('bar-line');
                vm.staff.high.push('bar-line');
                vm.staff.mid.push('bar-line');
                vm.staff.low.push('bar-line');
            } else if ((vm.staff.compiled.length) % 4 === 0) {
                vm.staff.border.push('space');
                vm.staff.high.push('space');
                vm.staff.mid.push('space');
                vm.staff.low.push('space');
            }
        };

        vm.test = '';
        vm.left = {};
        vm.right = {};
        vm.left.tap = function() {
            var beat = 'metupbeat';
            if (typeof beat !== 'undefined') {
                vm.play(beat);
                currentBeat = beat;

                if (!isStarted) {
                    vm.startTest();
                }
            }
        };
        vm.right.tap = function() {
            var beat = 'metdownbeat';
            if (typeof beat !== 'undefined') {
                vm.play(beat);
                currentBeat = beat;

                if (!isStarted) {
                    vm.startTest();
                }
            }
        };
    }]);
})();