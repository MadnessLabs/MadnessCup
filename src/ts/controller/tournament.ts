/// <reference path="../../tsd/tsd.d.ts"/>
module MadnessCup {
    'use strict';

    class TournamentController {
        tournament: any;

        constructor(
            $stateParams,
            enjin,
            $firebaseObject,
            protected $scope
        ) {
            // ON LOAD
            $firebaseObject(new Firebase(enjin.db.firebase.host + 'tournament/' + $stateParams.id)).$loaded().then(function(data) {
                this.tournament = data;

                this.addPlayer(enjin.session);
            }.bind(this)); 
        }

        addPlayer(player) {
            console.log(player);
        }
    }

    angular.module('MadnessCup')
           .controller('MadnessCup.TournamentController', TournamentController);
}