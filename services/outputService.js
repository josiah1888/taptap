(function() {
    'use strict';

    var app = angular.module('taptap');

    app.factory('outputService', ['playService', 'metService', function(playService, metService) {
        var outputService = {
            outputBeat: _outputBeat,
            outputStaff: _outputStaff,
            feedback: {
                leftButton: false,
                rightButton: false,
                length: 0
            }
        };

        function _outputBeat(beat) {
            if (typeof beat !== 'undefined') {
                showFeedback(beat);
                playService.playBeat(beat);
                metService.currentBeat = beat;
                metService.startPlayer();
            }
        }

        // not working currently. Would be cool if it worked.
        function showFeedback(beat) {
            if (beat === 'metdownbeat') {
                inputService.feedback.leftButton = true;
            } else if (beat === 'metupbeat') {
                inputService.feedback.rightButton = true;
            }

            setTimeout(clearFeedback(), inputService.feedback.length);
        }

        function clearFeedback() {
            inputService.feedback.leftButton = false;
            inputService.feedback.rightButton = false;
        }

        return outputService;
    }]);
})();
