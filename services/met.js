(function() {

    'use strict';

    var app = angular.module('taptap');

    app.factory('metService', ['$interval', 'staffService', 'playService', 'feedbackService', 'evaluatorService',
        function($interval, staffService, playService, feedbackService, evaluatorService) {
            var metService = {
                startPlayer: _startPlayer,
                startComputer: _startComputer,
                currentBeat: '',
                length: 0,
                min: 25,
                max: 120,
                tempo: 45,
                countOff: 4, // in quarter notes
                shouldPlayMet: true
            };

            function getSixteenth() {
                return 15 / (metService.tempo / 1000);
            }

            var player;
            function Player() {
                var isStarted = false;
                var stop;
                var counter;

                this.start = function() {
                    if (!isStarted) {
                        isStarted = true;
                        counter = (metService.countOff) * -4;
                        staffService.clear('player');
                        tryPlayMet(counter);

                        var interval = $interval(function() {
                            if (counter < 0) {
                                tryPlayMet(counter);
                                if (counter % 4 === 0) {
                                    feedbackService.setCountOff(counter / -4);

                                }
                            } else {
                                feedbackService.setCountOff(0);
                                if ((counter % 2) === 0) {
                                    tryPlayMet(counter);

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

                            }
                            counter++;
                        }, getSixteenth() / 2);

                        stop = function() {
                            if (!$interval.cancel(interval)) {
                                console.log('Interval failed to cancel.');
                            }

                            evaluatorService.evaluate();
                        };

                        return isStarted;
                    }
                };
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
                        tryPlayMet(counter * 2);

                        if (beats[counter] === 'metdownbeat') {
                            staffService.add('computer', 'low');
                        } else if (beats[counter] === 'metupbeat') {
                            staffService.add('computer', 'high');
                        } else {
                            staffService.add('computer');
                        }

                        playService.playBeat(beats[counter]);
                        feedbackService.showFeedback(beats[counter]);

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
                        feedbackService.clear();
                    };
                };
            }
            function _startComputer(beats) {
                if (typeof computer === 'undefined') {
                    computer = new Computer(beats);
                }
                staffService.clear('computer');
                computer.start();
            }

            function tryPlayMet(i) {
                if (metService.shouldPlayMet && (i % 4 === 0)) {
                    playMet();
                }
            }

            function playMet() {
                playService.playBeat('csharp');
            }

            return metService;
        }]);
})();
