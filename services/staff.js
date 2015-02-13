(function() {
    'use strict';

    var app = angular.module('taptap');

    app.factory('staffService', [function() {
        var staffService = {
            add: _addToStaff,
            advance: _advanceStaff,
            staff: {
                border: [],
                high: [],
                mid: [],
                low: [],
                compiled: [],
                length: 0
            }
        };

        var _staff = {
            border: [],
            high: [],
            mid: [],
            low: [],
            compiled: [],
            length: 0
        }

        function _addToStaff(line) {
            _advanceStaff();
            if (typeof line === 'undefined') {
                return;
            } else {
                staffService.staff.compiled.pop();
                staffService.staff.compiled.push(1);

                switch (line) {
                    case 'high':
                        staffService.staff.high.pop();
                        staffService.staff.high.push('on');
                        break;
                    case 'mid':
                        staffService.staff.mid.pop();
                        staffService.staff.mid.push('on');
                        break;
                    case 'low':
                        staffService.staff.low.pop();
                        staffService.staff.low.push('on');
                        break;
                }

                return line;
            }
        }

        function _advanceStaff() {
            staffService.staff.border.push('off');
            staffService.staff.high.push('off');
            staffService.staff.mid.push('off');
            staffService.staff.low.push('off');
            staffService.staff.compiled.push(0);
        }
        return staffService;
    }]);
})();