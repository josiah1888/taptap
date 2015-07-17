(function() {
    'use strict';

    angular
        .module('taptap')
        .factory('focus', factory);

    factory.$inject = ['$timeout', '$window'];
    function factory($timeout, $window) {
        return function (id) {
            $timeout(function () {
                var element = $window.document.getElementById(id);
                if (element) {
                    element.focus();
                }
            });
        };
    }
}());
