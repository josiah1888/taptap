(function() {
    'use strict';

    var app = angular.module('taptap');

    app.controller('Home', [function() {
        var vm = this;

        var version = '1.0';
        vm.title = 'Tap Tap ' + version;
    }]);
})();
