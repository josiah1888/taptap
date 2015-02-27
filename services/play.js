(function() {
    'use strict';

    var app = angular.module('taptap');

    app.factory('playService', [function() {
        var playService = {
            playBeat: _playBeat
        };

        function _playBeat(beat) {
            beat = document.getElementById(beat);
            if (beat.ended === false) {
                beat.pause();
                beat.currentTime = 0;
            }
            beat.play();
        }
        return playService;
    }]);
})();
