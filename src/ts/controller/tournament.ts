/// <reference path="../../tsd/tsd.d.ts"/>
module MadnessCup {
    'use strict';

    class TournamentController {
        tournament: any;
        tournamentRef: any;

        constructor(
            $stateParams,
            enjin,
            $firebaseObject,
            protected $scope
        ) {
            // ON LOAD
            this.tournamentRef = new Firebase(enjin.db.firebase.host + 'tournament/' + $stateParams.id);
            $firebaseObject(this.tournamentRef).$loaded().then(function(data) {
                this.tournament = data;

                this.addPlayer(enjin.session);
            }.bind(this)); 
        }

        addPlayer(player) {
            console.log(this.tournament);
            if (typeof this.tournament.players === 'undefined') {
                this.tournament.players = [];
            }
            if (typeof this.tournament.players[player.id] === 'undefined') {
                this.tournament.players[player.id] = player;
                this.tournamentRef.child('players').set(this.tournament.players, function() {
                    alert('You have been added!');
                });
            } else {
                alert('You are already added!');
            }
        }

        removePlayer() {
            // Remove player
        }
    }

    angular.module('MadnessCup')
           .controller('MadnessCup.TournamentController', TournamentController);
}