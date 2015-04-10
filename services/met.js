(function() {

    'use strict';

    var app = angular.module('taptap');

    app.factory('metService', ['$interval', 'staffService', 'playService', function($interval, staffService, playService) {
        var metService = {
            startPlayer: _startPlayer,
            startComputer: _startComputer,
            currentBeat: '',
            length: 0,
            tempo: 40,
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

        var player;
        function Player() {
            var isStarted = false;
            var stop;
            var counter;

            this.start = function() {
                if (!isStarted) {
                    counter = 0;
                    isStarted = true;
                    staffService.clear('player');
                    playMet(counter);

                    var interval = $interval(function() {
                        if ((counter % 2) === 0) {
                            playMet(counter);

                        } else if ((counter - 1) % 2 === 0) {
                            if (metService.currentBeat === 'metdownbeat') {
                                staffService.add('player', 'low');
                            } else if (metService.currentBeat === 'metupbeat') {
                                staffService.add('player', 'high');
                            } else {
                                staffService.add('player');
                            }

                            metService.currentBeat = undefined;
                        }

                        if (counter === (metService.length * 2)) {
                            staffService.end('player');
                            isStarted = false;
                            stop();
                        }

                        counter++;
                    }, getSixteenth() / 2);

                    stop = function() {
                        if (!$interval.cancel(interval)) {
                            console.log('Interval failed to cancel.');
                        }
                    };
                }

                return isStarted;
            }
        }

        function _startPlayer() {
            if (typeof player === 'undefined') {
                player = new Player();
            }

            player.start();
        }


        var computer;
        function Computer(beats) {
            var counter;
            var stop;
            this.start = function() {
                counter = 0;
                var interval = $interval(function() {
                    playMet(counter * 2);

                    if (beats[counter] === 'metdownbeat') {
                        staffService.add('computer', 'low');
                    } else if (beats[counter] === 'metupbeat') {
                        staffService.add('computer', 'high');
                    } else {
                        staffService.add('computer');
                    }

                    playService.playBeat(beats[counter]);


                    if (counter === (metService.length - 1)) {
                        staffService.end('computer');
                        stop();
                    }

                    counter++;
                }, getSixteenth());

                stop = function() {
                    if (!$interval.cancel(interval)) {
                        console.log('Interval failed to cancel.');
                    }
                };
            }
        }
        function _startComputer(beats) {
            if (typeof computer === 'undefined') {
                computer = new Computer(beats);
            }
            staffService.clear('computer');
            computer.start();
        }

        function playMet(i) {
            if (metService.met && (i % 4 === 0)) {
                playService.playBeat('csharp');
            }
        }

        return metService;
    }]);
})();
