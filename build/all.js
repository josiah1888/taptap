(function() {
    'use strict';

    var app = angular.module('taptap', ['ngRoute', 'ngTouch']);

    app.config(function($routeProvider) {
        $routeProvider.when('/level/:level',
            {
                templateUrl: '/src/templates/level.html',
                controller: 'BasicLevel',
                controllerAs: 'level'
            });
        $routeProvider.otherwise(
            {
                redirectTo: '/level/1'
            });
    });
})();

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

(function() {
    'use strict';

    var app = angular.module('taptap');

    app.controller('Home', [function() {
        var vm = this;

        var version = '1.0';
        vm.title = 'Tap Tap ' + version;
    }]);
})();

(function() {
    'use strict';

    var app = angular.module('taptap');

    app.directive('elementFocus', ['focus', function(focus) {
        return function(scope, element, attr) {
            element.on(attr.elementFocus, function() {
                focus(attr.elementFocusId);
            });

            scope.$on('$destroy', function() {
                element.off(attr.elementFocus);
            });
        };
    }]);
}());

(function() {
    'use strict';
    var app = angular.module('taptap');

    app.directive('evaluator', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/src/directives/views/evaluator.html',
            require: 'ngModel',
            scope: {
                evaluation: '=ngModel'
            }
        };
    });
}());

(function() {
    'use strict';
    var app = angular.module('taptap');

    app.directive('staff', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/src/directives/views/staff.html',
            require: 'ngModel',
            scope: {
                staff: '=ngModel'
            }
        };
    });
}());

(function() {
    'use strict';

    var app = angular.module('taptap');

    app.factory('evaluatorService', ['staffService', function(staffService) {
        var evaluatorService = {
            evaluate: _evaluate,
            evaluation: {
                grade: 'sample grade here',
                show: false
            }
        };

        function _evaluate() {
            var playerStaff = staffService.playerStaff.compiled;
            var computerStaff = staffService.computerStaff.compiled;
            var points = 0;
            var totalPoints = 0;
            for (var i = 0; i < computerStaff.length; i++) {
                switch (computerStaff[i]) {
                    case 'high':
                    case 'mid':
                    case 'low':
                        totalPoints += 5;
                        if (playerStaff[i] === computerStaff[i]) {
                            points += 5;
                        }
                        break;
                    default:
                        totalPoints += 3;
                        if (playerStaff[i] === computerStaff[i]) {
                            points += 3;
                        }
                }
            }
            var grade = points + ' / ' + totalPoints + ' points';
            evaluatorService.evaluation.grade = grade;
            showEvaluation();
        }

        function showEvaluation() {
            evaluatorService.evaluation.show = true;
            setTimeout(function() {
                evaluatorService.evaluation.show = false;
            }, 5000);
        }

        return evaluatorService;
    }]);
}());

(function() {
    'use strict';

    var app = angular.module('taptap');

    app.factory('feedbackService', [function() {
        var feedbackService = {
            showFeedback: _showFeedback,
            computerIsPlaying: false,
            clear: _clear,
            leftButton: false,
            rightButton: false,
            met: false,
            length: 35,
            setCountOff: _setCountOff,
            countOff: {
                n: 0,
                show: false
            }
        };

        function _showFeedback(beat) {
            if (beat === 'metdownbeat') {
                feedbackService.leftButton = true;
                setTimeout(clearLeftFeedback, feedbackService.length);
            } else if (beat === 'metupbeat') {
                feedbackService.rightButton = true;
                setTimeout(clearRightFeedback, feedbackService.length);
            } else if (beat === 'csharp') {
                feedbackService.met = true;
                setTimeout(clearMetFeedback, feedbackService.length);
            }
        }

        function clearLeftFeedback() {
            feedbackService.leftButton = false;
        }

        function clearRightFeedback() {
            feedbackService.rightButton = false;
        }

        function clearMetFeedback() {
            feedbackService.met = false;
        }

        function _clear() {
            feedbackService.leftButton = false;
            feedbackService.rightButton = false;
            feedbackService.met = false;
        }

        function _setCountOff(n) {
            feedbackService.countOff.n = n;
            feedbackService.countOff.show = feedbackService.countOff.n !== 0;
        }

        return feedbackService;
    }]);
}());

(function() {
    'use strict';

    var app = angular.module('taptap');

    app.factory('focus', function($timeout, $window) {
        return function(id) {
            $timeout(function() {
                var element = $window.document.getElementById(id);
                if (element) {
                    element.focus();
                }
            });
        };
    });
}());

(function() {
    'use strict';

    var app = angular.module('taptap');

    app.factory('inputService', ['outputService', function(outputService) {
        var inputService = {
            input: _input,
            getBeat: _getBeat
        };

        function _input(input) {
            var beat = _getBeat(input);

            if (typeof beat !== 'undefined') {
                outputService.outputBeat(beat);
            }
        }

        function _getBeat(input) {
            var code = keyCodeMap[input.keyCode] || input;
            var beat;

            switch (code) {
                case 'down':
                case 'f':
                case 'k':
                case 'left':
                    beat = 'metdownbeat';
                    break;
                case 'up':
                case 'g':
                case 'h':
                case 'right':
                    beat = 'metupbeat';
                    break;
                case 'space':
                    beat = 'csharp';
                    break;
                case 'enter':
                    beat = 'bell';
                    break;
                default:
                    break;
            }

            return beat;
        }

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

        return inputService;
    }]);
})();

(function() {

    'use strict';

    var app = angular.module('taptap');

    app.factory('metService', ['$interval', 'staffService', 'playService', 'feedbackService', 'evaluatorService',
        function($interval, staffService, playService, feedbackService, evaluatorService) {
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

            return metService;
        }]);
})();

(function() {
    'use strict';

    var app = angular.module('taptap');

    app.factory('outputService', ['playService', 'metService', 'staffService', 'feedbackService',
        function(playService, metService, staffService, feedbackService) {
        var outputService = {
            outputBeat: _outputBeat,
            toStaff: _toStaff,
            start: _start,
            end: _end,
            feedback: {
                leftButton: false,
                rightButton: false,
                length: 0
            }
        };

        function _outputBeat(beat) {
            if (typeof beat !== 'undefined') {
                feedbackService.showFeedback(beat);
                playService.playBeat(beat);
                metService.currentBeat = beat;
                metService.startPlayer();
            }
        }

        function _toStaff(lines) {
            if (Array.isArray(lines)) {
                metService.startComputer(lines);
            } else {
                console.log('Not Array.');
            }
        }

        function _start() {
            staffService.clear();
        }

        function _end() {
            staffService.end();
        }

        return outputService;
    }]);
})();

(function() {
    'use strict';

    var app = angular.module('taptap');

    app.factory('playService', [function() {
        var playService = {
            playBeat: _playBeat
        };

        var audioPath = '/assets/';

        var beats = [
            { id: 'metdownbeat', src: 'metdownbeat.mp3' },
            { id: 'metupbeat', src: 'metupbeat.mp3' },
            { id: 'csharp', src: 'csharp.mp3' }
        ];

        function init() {
            /* jshint -W117 */
            if (!createjs.Sound.initializeDefaultPlugins()) {
                console.log('Uh Oh! Default plugins aren\'t working!');
            }

            createjs.Sound.registerSounds(beats, audioPath);
        }
        init();

        function _playBeat(beat) {
            /* jshint -W117 */
            var sound = createjs.Sound.play(beat);
            if (beat === 'csharp') {
                sound.volume = 1.0;
            } else {
                sound.volume = 0.6;
            }
        }

        return playService;
    }]);
})();

(function() {
    'use strict';

    var app = angular.module('taptap');

    app.factory('staffService', [function() {
        var staffService = {
            add: _add,
            advance: _advanceStaff,
            end: _end,
            clear: _clear,
            playerStaff: {
                border: [],
                high: [],
                mid: [],
                low: [],
                compiled: [],
                length: 0,
                name: 'player'
            },
            computerStaff: {
                border: [],
                high: [],
                mid: [],
                low: [],
                compiled: [],
                length: 0,
                name: 'computer'
            }
        };

        function _add(staff, line) {
            _advanceStaff(staff);
            if (typeof line === 'undefined') {
                return;
            } else {
                var staff = getStaff(staff);
                staff.compiled.pop();
                staff.compiled.push(line);

                switch (line) {
                    case 'high':
                        staff.high.pop();
                        staff.high.push('on');
                        break;
                    case 'mid':
                        staff.mid.pop();
                        staff.mid.push('on');
                        break;
                    case 'low':
                        staff.low.pop();
                        staff.low.push('on');
                        break;
                }

                return line;
            }
        }

        function _advanceStaff(staff) {
            splitBars(staff);
            pushToStaff(staff);
        }

        function getStaff(staff) {
            if (staff === 'player') {
                return staffService.playerStaff;
            } else if (staff === 'computer') {
                return staffService.computerStaff;
            } else {
                console.log('Unrecognized staff: ', staff);
            }
        }

        function splitBars(staff) {
            var staff = getStaff(staff);
            if ((staff.compiled.length) % 16 === 0) {
                pushToStaff(staff.name, 'bar-line');
            } else if ((staff.compiled.length) % 4 === 0) {
                pushToStaff(staff.name, 'space');
            }
        }

        function _end(staff) {
            pushToStaff(staff, 'bar-line');
        }

        function pushToStaff(staff, beat) {
            var staff = getStaff(staff);
            if (typeof beat === 'undefined') {
                staff.compiled.push(0);
                beat = 'off';
            }
            staff.border.push(beat);
            staff.high.push(beat);
            staff.mid.push(beat);
            staff.low.push(beat);
        }

        function _clear(staff) {
            var staff = getStaff(staff);
            staff.border = [];
            staff.high = [];
            staff.mid = [];
            staff.low = [];
            staff.compiled = [];
            staff.length = 0;
        }

        //$scope.$watch(
        //    function() {
        //        return staffService.staff.border;
        //    },
        //    function() {
        //        staffService.staff.length = staffService.staff.border.length;
        //    }
        //);

        return staffService;
    }]);
})();
