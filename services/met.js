(function() {

    'use strict';

    var app = angular.module('taptap');

    app.factory('metService', ['$interval', 'staffService', 'playService', function($interval, staffService, playService) {
        var metService = {
            start: _start,
            currentBeat: '',
            length: 0,
            tempo: 60,
            countOff: 0, // in quarter notes
            met: true
        };

        var _sixteenth;
        function getSixteenth() {
            if (typeof _sixteenth === 'undefined') {
                _sixteenth = 15 / (metService.tempo / 1000);
            }
            return _sixteenth;
        }

        var i;
        var stop;
        var isStarted = false;
        function _start() {
            if (!isStarted) {
                isStarted = true;
                staffService.clear();
                i = 0;
                playMet(i);

                var interval = $interval(function() {
                    if ((i % 2) === 0) {
                        playMet(i);

                    } else if ((i - 1) % 2 === 0) {
                        if (metService.currentBeat === 'metdownbeat') {
                            staffService.add('low');
                        } else if (metService.currentBeat === 'metupbeat') {
                            staffService.add('high');
                        } else {
                            staffService.add();
                        }

                        metService.currentBeat = undefined;
                    }

                    if (i === (metService.length * 2)) {
                        staffService.end();
                        isStarted = false;
                        stop();
                    }

                    i++;
                }, getSixteenth() / 2);
                stop = function() {
                    $interval.cancel(interval);
                };
            }
        }

        function playMet(i) {
            if (metService.met && (i % 4 === 0)) {
                playService.playBeat('csharp');
            }
        }

        return metService;
    }]);
})();
