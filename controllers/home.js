(function() {
    'use strict';

    var app = angular.module('taptap');

    app.controller('Home', [function() {
        var vm = this;

        var version = '0.3';
        vm.title = 'Tap Tap ' + version;

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
                play(beat);
                showBeat(beat);
            }
        };

        var play = function(beat) {
            beat = document.getElementById(beat);
            if (beat.ended === false) {
                beat.pause();
                beat.currentTime = 0;
            }
            beat.play();
        };

    }]);
})();