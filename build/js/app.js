(function() {
    'use strict';

    var app = angular.module('taptap', ['ngRoute', 'ngTouch']);

    app.config(function($routeProvider) {
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
    });
})();
