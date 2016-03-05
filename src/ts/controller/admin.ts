/// <reference path="../../tsd/tsd.d.ts"/>
module MadnessCup {
    'use strict';

    class AdminController {
        tournaments: any;
        tournament: any;
        formOpen: boolean;
        dateOpts: any;

        constructor(
            protected enjin,
            protected $firebaseObject,
            protected $firebaseArray,
            protected $filter,
            protected Brackets
        ) {
            // ON LOAD 
            this.tournament = {};
            this.dateOpts = {
                titleLabel: 'Title',
                callback: function(val) {
                    this.tournament.date = $filter('date')(val, 'dd-MM-yyyy');
                }.bind(this)
            }; 
            this.tournaments = $firebaseArray(new Firebase(enjin.db.firebase.host + 'tournament'));
        }

        addTournament() {
            this.tournament.started = false;
            this.tournaments.$add(this.tournament).then(function(){
                this.tournament = {};
                this.formOpen = false;
            }.bind(this));
        }

        startTournament(id) {
            var players = [];
            this.tournaments[id].started = true;
            angular.forEach(this.tournaments[id].players, function(player, i) {
                var name = player.name.split(' ');
                player.name_first = name[0];
                player.name_last = name[1];
                players.push(player);
            });
            this.tournaments[id].rounds = [];
            this.tournaments[id].rounds.push(this.Brackets.setup(players));
            this.tournaments.$save(id);
        }
    }

    angular.module('MadnessCup')
           .controller('MadnessCup.AdminController', AdminController);
}