﻿(function() {
    'use strict';

    var app = angular.module('taptap');

    app.config(function($routeProvider) {
        $routeProvider.when('/',
            {
                templateUrl: 'templates/home.html',
                controller: 'Home',
                controllerAs: 'home'
            });
        $routeProvider.when('/demo',
            {
                templateUrl: 'templates/demo.html',
                controller: 'Demo',
                controllerAs: 'demo'
            });
        $routeProvider.when('/play',
            {
                templateUrl: 'templates/play.html',
                controller: 'Play',
                controllerAs: 'play'
            });
        $routeProvider.otherwise(
            {
                redirectTo: '/'
            });
    });
})();


