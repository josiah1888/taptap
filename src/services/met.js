(function() {

    'use strict';

    angular
        .module('taptap')
        .factory('metService', metService);

    metService.$inject = ['$interval', 'staffService', 'playService', 'feedbackService', 'evaluatorService'];

    function metService($interval, staffService, playService, feedbackService, evaluatorService) {
        var metService = {
            startPlayer: _startPlayer,
            stopPlayer: function() {
            },
            startComputer: _startComputer,
            stopComputer: function() {
            },
            currentBeat: '',
            length: 0,
            min: 25,
            max: 120,
            tempo: 55,
            countOff: 4, // in quarter notes
            shouldPlayMet: true
        };

        return metService;

        function getSixteenth() {
            return 15 / (metService.tempo / 1000);
        }

        var player;

        function Player() {
            var isStarted = false;
            var counter;

            this.start = function() {
                if (!isStarted) {
                    isStarted = true;
                    evaluatorService.evaluation.show = false;
                    counter = (metService.countOff) * -4;
                    staffService.clear('player');
                    playMet(counter);

                    var interval = $interval(function() {
                        if (counter < 0) {
                            playMet(counter);
                            if (counter % 4 === 0) {
                                feedbackService.setCountOff(counter / -4);
                                metService.currentBeat = null;
                            }
                        } else {
                            feedbackService.setCountOff(0);
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
                                metService.stopPlayer();
                            }

                        }
                        counter++;
                    }, getSixteenth() / 2);

                    metService.stopPlayer = function() {
                        $interval.cancel(interval);
                        feedbackService.clear();
                        evaluatorService.evaluate();
                        player = undefined;
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
            feedbackService.computerIsPlaying = true;
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
                    feedbackService.showFeedback(beats[counter]);

                    if (counter === (metService.length - 1)) {
                        staffService.end('computer');
                        metService.stopComputer();
                    }

                    counter++;
                }, getSixteenth());

                metService.stopComputer = function() {
                    $interval.cancel(interval);
                    feedbackService.computerIsPlaying = false;
                    feedbackService.clear();
                    computer = undefined;
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

        function playMet(i) {
            if (metService.shouldPlayMet && (i % 4 === 0)) {
                playService.playBeat('csharp');
                feedbackService.showFeedback('csharp');
            }
        }
    }
}());
