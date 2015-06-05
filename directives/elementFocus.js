(function() {
    'use strict';

    var app = angular.module('taptap');

    app.directive('elementFocus', ['focus', function(focus) {
        return function(scope, element, attr) {
            element.on(attr.elementFocus, function() {
                focus(attr.elementFocusId);
            });

            scope.$on('$destroy', function() {
                element.off(attr.elementFocus);
            });
        }
    }]);
}());