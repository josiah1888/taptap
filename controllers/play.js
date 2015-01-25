(function() {
    'use strict';

    var app = angular.module('taptap');

    app.controller('Play', ['$scope', '$interval', function($scope, $interval) {
        var vm = this;
        vm.tempo = 120;
        var s = 15 / (vm.tempo / 1000);
        vm.staff = {
            border: '',
            high: '',
            mid: '',
            low: '',
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

            if (typeof beat !== undefined) {
                vm.play(beat);
                //showBeat(beat);
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
            vm.staff = {
                border: '',
                high: '',
                mid: '',
                low: '',
            };
            var start = $interval(function() {
                vm.staff.border = vm.staff.border + '-';
                vm.staff.high = vm.staff.high + '-';
                vm.staff.mid = vm.staff.mid + '-';
                vm.staff.low = vm.staff.low + '-';

                if (currentBeat === 'csharp') {

                } else if (currentBeat === 'metdownbeat') {
                    vm.staff.low = vm.staff.low.substr(0, vm.staff.border.length - 1) + 'x';
                } else if (currentBeat === 'metupbeat') {
                    vm.staff.high = vm.staff.high.substr(0, vm.staff.border.length - 1) + 'o';
                }
                currentBeat = undefined;
                ++i;
                if (i === 32) {
                    isStarted = false;
                } else {
                    isStarted = true;
                }
                
            }, s, 32);
            stop = function() {
                $interval.cancel(start);
            };
        };

    }]);
})();