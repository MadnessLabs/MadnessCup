/// <reference path="../../tsd/tsd.d.ts"/>

angular.module('MadnessCup').directive('countdown', function() {
    return {
        restrict: 'EA',
        templateUrl: 'html/directive/countdown.html',
        link: function(scope, element, attrs) {
            //alert('I loaded');
        }
    };
});