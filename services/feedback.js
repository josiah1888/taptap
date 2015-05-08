(function() {
    'use strict';

    var app = angular.module('taptap');

    app.factory('feedbackService', [function() {
        var feedbackService = {
            showFeedback: _showFeedback,
            clear: _clear,
            leftButton: false,
            rightButton: false,
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
            }
        }

        function clearLeftFeedback() {
            feedbackService.leftButton = false;
        }

        function clearRightFeedback() {
            feedbackService.rightButton = false;
        }

        function _clear() {
            feedbackService.leftButton = false;
            feedbackService.rightButton = false;
        }

        function _setCountOff(n) {
            feedbackService.countOff.n = n;
            feedbackService.countOff.show = feedbackService.countOff.n !== 0;
            console.log('set. n: ' + n);
        }

        return feedbackService;
    }]);
}());
