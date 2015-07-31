(function() {
    'use strict';

    angular
        .module('taptap')
        .factory('inputService', inputService);

    inputService.$inject = ['outputService'];

    function inputService(outputService) {
        var inputService = {
            input: _input,
            getBeat: _getBeat
        };

        return inputService;

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
    }
})();
