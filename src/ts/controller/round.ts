/// <reference path="../../tsd/tsd.d.ts"/>
module MadnessCup {
    'use strict';

    class RoundController {
        tournament: any;
        tournamentRef: any;
        round: number;

        constructor(
            $stateParams,
            enjin,
            $firebaseObject,
            protected $scope,
            protected $state
        ) {
            // ON LOAD    
            this.round = $stateParams.round;   
            this.tournamentRef = new Firebase(enjin.db.firebase.host + 'tournament/' + $stateParams.id);
            $firebaseObject(this.tournamentRef).$loaded().then(function(data) {
                this.tournament = data;
            }.bind(this));
        }

        playerAvatar(avatar) {
            return { 
                backgroundImage: 'url(' + avatar + ')', 
                backgroundPosition: 'center', 
                padding: 0,
                backgroundSize: 'cover'
            };
        }

        selectedStage(versus) {
            return 'Final Destination';
        }

        selectedStageBackground(versus) {
            return { backgroundImage: 'url(img/stage/final_destination.jpg)' };
        } 
    }

    angular.module('MadnessCup')
           .controller('MadnessCup.RoundController', RoundController);
}