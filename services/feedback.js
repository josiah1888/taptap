(function() {
    'use strict';

    var app = angular.module('taptap');

    app.factory('feedbackService', [function() {
        var feedbackService = {
            showFeedback: _showFeedback,
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
