(function() {
    'use strict';

    var app = angular.module('taptap');

    app.factory('outputService', ['playService', 'metService', 'staffService',  function(playService, metService, staffService) {
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
                //showFeedback(beat);
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

        // not working currently. Would be cool if it worked.
        //function showFeedback(beat) {
        //    if (beat === 'metdownbeat') {
        //        inputService.feedback.leftButton = true;
        //    } else if (beat === 'metupbeat') {
        //        inputService.feedback.rightButton = true;
        //    }

        //    setTimeout(clearFeedback(), inputService.feedback.length);
        //}

        //function clearFeedback() {
        //    inputService.feedback.leftButton = false;
        //    inputService.feedback.rightButton = false;
        //}

        return outputService;
    }]);
})();
