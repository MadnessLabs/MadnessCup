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
            protected $scope,
            protected $state
        ) {
            // ON LOAD
            this.tournamentRef = new Firebase(enjin.db.firebase.host + 'tournament/' + $stateParams.id);
            $firebaseObject(this.tournamentRef).$loaded().then(function(data) {
                this.tournament = data;

                this.addPlayer(enjin.session);
            }.bind(this)); 
        }

        addPlayer(player) {
            if (typeof this.tournament.players === 'undefined') {
                this.tournament.players = [];
            }
            if (typeof this.tournament.players[player.id] === 'undefined') {
                this.tournament.players[player.id] = player;
                this.tournamentRef.child('players').set(this.tournament.players, function() {
                    console.log('Welcome to the Tourney!');
                });
            }

            var unwatch = this.tournament.$watch(function() {
                if (this.tournament.started) {
                    this.$state.go('round', {id: this.tournament.$id, round: 1});
                    unwatch();
                }
            }.bind(this));
        }

        removePlayer() {
            // Remove player
        }
    }

    angular.module('MadnessCup')
           .controller('MadnessCup.TournamentController', TournamentController);
}