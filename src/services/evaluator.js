(function() {
    'use strict';

    var app = angular.module('taptap');

    app.factory('evaluatorService', ['staffService', function(staffService) {
        var evaluatorService = {
            evaluate: _evaluate,
            evaluation: {
                grade: 'sample grade here',
                show: false
            }
        };

        function _evaluate() {
            var playerStaff = staffService.playerStaff.compiled;
            var computerStaff = staffService.computerStaff.compiled;
            var points = 0;
            var totalPoints = 0;
            for (var i = 0; i < computerStaff.length; i++) {
                switch (computerStaff[i]) {
                    case 'high':
                    case 'mid':
                    case 'low':
                        totalPoints += 5;
                        if (playerStaff[i] === computerStaff[i]) {
                            points += 5;
                        }
                        break;
                    default:
                        totalPoints += 3;
                        if (playerStaff[i] === computerStaff[i]) {
                            points += 3;
                        }
                }
            }
            var grade = points + ' / ' + totalPoints + ' points';
            evaluatorService.evaluation.grade = grade;
            showEvaluation();
        }

        function showEvaluation() {
            evaluatorService.evaluation.show = true;
            setTimeout(function() {
                evaluatorService.evaluation.show = false;
            }, 5000);
        }

        return evaluatorService;
    }]);
}());
