(function() {
    'use strict';
    angular
        .module('taptap')
        .directive('evaluator', evaluator);

    function evaluator() {
        return {
            restrict: 'E',
            templateUrl: 'directives/views/evaluator.html',
            require: 'ngModel',
            scope: {
                evaluation: '=ngModel'
            }
        };
    }
}());
