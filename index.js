(function() {
    'use strict';

    var app = angular.module('taptap', ['ngRoute']);

    app.controller('Home', [function() {
        var vm = this;

        var version = '0.1';
        vm.title = 'Tap Tap ' + version;

    }]);

    app.controller('GetStarted', [function() {
        var vm = this;

        vm.getStarted = function() {

        }
    }]);

    app.controller('Demo', ['$scope', '$interval', function($scope, $interval) {
        var vm = this;
        vm.tempo = 120
        var q = 60 / (vm.tempo / 1000), e = 30 / (vm.tempo / 1000), s = 15 / (vm.tempo / 1000);
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
        ]
        vm.play = function(track) {
            track = document.getElementById(track);
            if (track.ended == false) {
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
        }

        $scope.$on('$destroy', function() {
            vm.stopLoop();
        })

        vm.demo1 = function(track) {
            vm.playRiff(track, 'xxxxx-x-xxxxx-x-x-x-x-x-x-------');
        }

        vm.playRiff = function(track, riff) {
            var i = 0;
            var start = $interval(function() {
                if (riff[i] == 'x') {
                    vm.play(track);
                }
                ++i;
            }, s, riff.length);
            stop = function() {
                $interval.cancel(start);
            };
        }
    }]);
})();



