/// <reference path="../tsd/tsd.d.ts"/>
module MadnessCup {
    'use strict';

    class MadnessCupRouter {
        constructor($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('login', {'url':'/login', 
'templateUrl':'html/page/login.html', 
'controller':'MadnessCup.LoginController as ctrl'});

            $urlRouterProvider.otherwise(function($injector, $location) {
                var $state = $injector.get('$state');
                $state.go('login');
            });
        }
    }

    angular.module('MadnessCup')
           .config(MadnessCupRouter);
}