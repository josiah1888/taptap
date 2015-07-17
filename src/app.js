(function() {
    'use strict';

    angular
        .module('taptap', ['ngRoute', 'ngTouch'])
        .config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider.when('/level/:level',
            {
                templateUrl: 'templates/level.html',
                controller: 'BasicLevel',
                controllerAs: 'level'
            });
        $routeProvider.otherwise(
            {
                redirectTo: '/level/1'
            });
    }
})();