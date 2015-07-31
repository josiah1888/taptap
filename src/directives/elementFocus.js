(function() {
    'use strict';

    angular
        .module('taptap')
        .directive('elementFocus', elementFocus);

    elementFocus.$inject = ['focus'];

    function elementFocus(focus) {
        return function(scope, element, attr) {
            element.on(attr.elementFocus, function() {
                focus(attr.elementFocusId);
            });

            scope.$on('$destroy', function() {
                element.off(attr.elementFocus);
            });
        };
    }
}());
