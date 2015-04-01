(function() {
    'use strict';

    var app = angular.module('taptap');

    app.factory('gameStaffService', ['playService', function(playService) {
        var gameStaffService = {
            add: _addToStaff,
            advance: _advanceStaff,
            end: _end,
            clear: _clear,
            staff: {
                border: [],
                high: [],
                mid: [],
                low: [],
                compiled: [],
                length: 0
            }
        };

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
            splitBars();
            pushToStaff();
        }

        function splitBars() {
            if ((staffService.staff.compiled.length) % 16 === 0) {
                pushToStaff('bar-line');
            } else if ((staffService.staff.compiled.length) % 4 === 0) {
                pushToStaff('space');
            }
        }

        function _end() {
            pushToStaff('bar-line');
        }

        function pushToStaff(beat) {
            if (typeof beat === 'undefined') {
                staffService.staff.compiled.push(0);
                beat = 'off';
            }
            staffService.staff.border.push(beat);
            staffService.staff.high.push(beat);
            staffService.staff.mid.push(beat);
            staffService.staff.low.push(beat);
        }

        function _clear() {
            staffService.staff.border = [];
            staffService.staff.high = [];
            staffService.staff.mid = [];
            staffService.staff.low = [];
            staffService.staff.compiled = [];
            staffService.staff.length = 0;
        }

        //$scope.$watch(
        //    function() {
        //        return staffService.staff.border;
        //    },
        //    function() {
        //        staffService.staff.length = staffService.staff.border.length;
        //    }
        //);

        return staffService;
    }]);
})();
