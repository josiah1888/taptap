(function() {
    'use strict';

    var app = angular.module('taptap');

    app.factory('playService', [function() {
        var playService = {
            playBeat: _playBeat
        };

        var audioPath = '/audio/';

        var beats = [
            { id: 'metdownbeat', src: 'metdownbeat.mp3' },
            { id: 'metupbeat', src: 'metupbeat.mp3' },
            { id: 'csharp', src: 'csharp.mp3' },
            { id: 'bell', src: 'bell.ogg' }
        ];

        function _init() {
            if (!createjs.Sound.initializeDefaultPlugins()) {
                console.log('Uh Oh! Default plugins aren\'t working!');
            }

            createjs.Sound.registerSounds(beats, audioPath);
        }
        _init();

        function _playBeat(beat) {
            createjs.Sound.play(beat);
        }

        return playService;
    }]);
})();
