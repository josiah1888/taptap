﻿(function() {
    'use strict';

    var app = angular.module('taptap');

    app.factory('inputService', ['outputService', function(outputService) {
        var inputService = {
            input: _input,
            feedback: {
                leftButton: false,
                rightButton: false,
                length: 0
            }
        };

        function _input(input) {
            var beat = getBeat(input);

            if (typeof beat !== 'undefined') {
                outputService.outputBeat(beat);
            }
        }

        function getBeat(input) {
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
