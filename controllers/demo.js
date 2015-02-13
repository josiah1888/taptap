(function() {
    'use strict';

    var app = angular.module('taptap');

    app.controller('Demo', ['$scope', '$interval', function($scope, $interval) {
        var vm = this;
        vm.tempo = 120;
        var q = 60 / (vm.tempo / 1000), e = 30 / (vm.tempo / 1000), s = 15 / (vm.tempo / 1000);
        vm.staffBorder = '';
        vm.staffHigh = '';
        vm.staffMid = '';
        vm.staffLow = '';

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
        vm.play = function(track) {
            track = document.getElementById(track);
            if (track.ended === false) {
                track.pause();
                track.currentTime = 0;
            }
            track.play();
        };

        var stop;
        vm.loop = function(track, interval, x) {
            var start = $interval(function() {
                vm.play(track);
            }, interval, x);
            stop = function() {
                $interval.cancel(start);
            };
            vm.play(track); // for the initial play
        };

        vm.stopLoop = function() {
            if (!angular.isDefined(stop)) return;
            stop();
        };

        $scope.$on('$destroy', function() {
            vm.stopLoop();
        });

        vm.demos = [
            function() {
                vm.playRiff('xxxxx_x_xxxxx_x_x_x_x_x_x_______');
            },
            function() {
                vm.playRiff('x__xx__xx_x_x___x__xx__xxx_x_xx_');
            },
            function() {
                vm.playRiff('x_x___x_x_x___x_xx__xx_x_xxxx___');
            },
            function() {
                vm.playRiff('x__xo__xx_x_o___x__xoo_oxx_xo_o_');
            }
        ];

        vm.playRiff = function(riff) {
            var i = 0;
            vm.staffBorder = '';
            vm.staffHigh = '';
            vm.staffMid = '';
            vm.staffLow = '';

            var start = $interval(function() {
                vm.staffBorder = vm.staffBorder + '-';
                vm.staffHigh = vm.staffHigh + '-';
                vm.staffMid = vm.staffMid + '-';
                vm.staffLow = vm.staffLow + '-';
                if (riff[i] === '-') {
                    vm.play('csharp');
                }
                else if (riff[i] === 'x') {
                    vm.play('metdownbeat');
                    vm.staffLow = vm.staffLow.substr(0, i) + riff[i];
                }
                else if (riff[i] === 'o') {
                    vm.play('metupbeat');
                    vm.staffHigh = vm.staffHigh.substr(0, i) + riff[i];
                }
                ++i;
            }, s, riff.length);
            stop = function() {
                $interval.cancel(start);
            };
        };
    }]);
})();