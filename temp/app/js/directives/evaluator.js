(function() {
    'use strict';
    var app = angular.module('taptap');

    app.directive('evaluator', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'directives/views/evaluator.html',
            require: 'ngModel',
            scope: {
                evaluation: '=ngModel'
            }
        };
    });
}());
