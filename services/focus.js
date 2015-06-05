(function() {
    'use strict';

    var app = angular.module('taptap');

    app.factory('focus', function($timeout, $window) {
        return function(id) {
            console.log(id);
            $timeout(function() {
                var element = $window.document.getElementById(id);
                if (element) {
                    element.focus();
                }
            });
        };
    });
}());