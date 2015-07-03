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
