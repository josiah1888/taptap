(function() {
    'use strict';

    var app = angular.module('taptap');

    app.factory('staffService', [function() {
        var staffService = {
            add: _add,
            advance: _advanceStaff,
            end: _end,
            clear: _clear,
            playerStaff: {
                border: [],
                high: [],
                mid: [],
                low: [],
                compiled: [],
                length: 0,
                name: 'player'
            },
            computerStaff: {
                border: [],
                high: [],
                mid: [],
                low: [],
                compiled: [],
                length: 0,
                name: 'computer'
            }
        };

        function _add(staff, line) {
            _advanceStaff(staff);
            if (typeof line === 'undefined') {
                return;
            } else {
                var staff = getStaff(staff);
                staff.compiled.pop();
                staff.compiled.push(line);

                switch (line) {
                    case 'high':
                        staff.high.pop();
                        staff.high.push('on');
                        break;
                    case 'mid':
                        staff.mid.pop();
                        staff.mid.push('on');
                        break;
                    case 'low':
                        staff.low.pop();
                        staff.low.push('on');
                        break;
                }

                return line;
            }
        }

        function _advanceStaff(staff) {
            splitBars(staff);
            pushToStaff(staff);
        }

        function getStaff(staff) {
            if (staff === 'player') {
                return staffService.playerStaff;
            } else if (staff === 'computer') {
                return staffService.computerStaff;
            } else {
                console.log('Unrecognized staff: ', staff);
            }
        }

        function splitBars(staff) {
            var staff = getStaff(staff);
            if ((staff.compiled.length) % 16 === 0) {
                pushToStaff(staff.name, 'bar-line');
            } else if ((staff.compiled.length) % 4 === 0) {
                pushToStaff(staff.name, 'space');
            }
        }

        function _end(staff) {
            pushToStaff(staff, 'bar-line');
        }

        function pushToStaff(staff, beat) {
            var staff = getStaff(staff);
            if (typeof beat === 'undefined') {
                staff.compiled.push(0);
                beat = 'off';
            }
            staff.border.push(beat);
            staff.high.push(beat);
            staff.mid.push(beat);
            staff.low.push(beat);
        }

        function _clear(staff) {
            var staff = getStaff(staff);
            staff.border = [];
            staff.high = [];
            staff.mid = [];
            staff.low = [];
            staff.compiled = [];
            staff.length = 0;
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
