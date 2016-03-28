/// <reference path="../tsd/tsd.d.ts"/>
module MadnessCup {
    'use strict';

    class MadnessCupRouter {
        constructor($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('login', {'url':'/login', 
'templateUrl':'html/page/login.html', 
'controller':'MadnessCup.LoginController as ctrl'})
				.state('round', {'url':'/tournament/:id/round/:round', 
'templateUrl':'html/page/round.html', 
'controller':'MadnessCup.RoundController as ctrl'})
				.state('admin', {'url':'/admin', 
'templateUrl':'html/page/admin.html', 
'controller':'MadnessCup.AdminController as ctrl'})
				.state('home', {'url':'/home', 
'templateUrl':'html/page/home.html', 
'controller':'MadnessCup.HomeController as ctrl'})
				.state('tournament', {'url':'/tournament/:id', 
'templateUrl':'html/page/tournament.html', 
'controller':'MadnessCup.TournamentController as ctrl'})
				.state('match', {'url':'/tournament/:id/round/:round/matchup/:matchup', 
'templateUrl':'html/page/match.html', 
'controller':'MadnessCup.MatchController as ctrl'});

            $urlRouterProvider.otherwise(function($injector, $location) {
                var $state = $injector.get('$state');
                $state.go('login');
            });
        }
    }

    angular.module('MadnessCup')
           .config(MadnessCupRouter);
}