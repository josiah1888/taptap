(function() {
    'use strict';
    angular
        .module('taptap')
        .directive('staff', staff);

    function staff() {
        return {
            restrict: 'E',
            templateUrl: 'directives/views/staff.html',
            require: 'ngModel',
            scope: {
                staff: '=ngModel'
            }
        };
    }
}());
