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
            protected $filter
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
            this.tournaments.$add(this.tournament).then(function(){
                this.tournament = {};
                this.formOpen = false;
            }.bind(this));
        }
    }

    angular.module('MadnessCup')
           .controller('MadnessCup.AdminController', AdminController);
}