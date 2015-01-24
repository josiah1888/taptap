(function() {
    'use strict';

    var app = angular.module('taptap');

    app.controller('Home', [function() {
        var vm = this;

        var version = '0.2';
        vm.title = 'Tap Tap ' + version;

    }]);
})();