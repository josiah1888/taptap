(function() {
    'use strict';
    var app = angular.module('taptap');

    app.directive('staff', function() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/src/directives/views/staff.html',
            require: 'ngModel',
            scope: {
                staff: '=ngModel'
            }
        };
    });
}());
