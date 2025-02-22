/// <reference path="../../tsd/tsd.d.ts"/>

angular.module('MadnessCup').directive('textEditor', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {

            function read() {
                ngModel.$setViewValue(element.html());
            }

            ngModel.$render = function() {
                element.html(ngModel.$viewValue || '');
            };

            element.bind('blur keyup change', function() {
                scope.$apply(read);
            });
        }
    };
});