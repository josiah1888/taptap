var app = angular.angular('taptap');

app.directive('staff', function() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'taptap/directives/views/staff.html',
        require: 'ngModel',
        scope: {
            staff: '=ngModel'
        }
    };
});