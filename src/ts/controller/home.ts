/// <reference path="../../tsd/tsd.d.ts"/>
module MadnessCup {
    'use strict';

    class HomeController {
        tournaments: any;
        tournament: any;
        tournamentPopover: any;
        modal: any;

        constructor(
            enjin,
            $firebaseArray,
            $ionicPopover,
            protected $ionicModal,
            protected $scope
        ) {
            // ON LOAD
            this.tournaments = $firebaseArray(new Firebase(enjin.db.firebase.host + 'tournament')); 
            $ionicPopover.fromTemplateUrl('html/popover/tournament.html', {
                'backdropClickToClose': true,
                scope: $scope
            }).then(function(popover) {
                this.tournamentPopover = popover;
            }.bind(this)); 
        }

        openMenu($event, tournament) {
            this.tournament = tournament;
            this.tournamentPopover.show($event);
        }

        closeMenu() {
            this.tournamentPopover.hide();
        }

        closeModal() {
            this.modal.hide();
            this.modal.remove();
        }

        rules() {
            this.closeMenu();
            this.$ionicModal.fromTemplateUrl('html/modal/rules.html', {
                scope: this.$scope,
                animation: 'slide-in-up',
                backdropClickToClose: true
            }).then(function(modal) {
                this.modal = modal;
                this.modal.show();
            }.bind(this));
        }
    }

    angular.module('MadnessCup')
           .controller('MadnessCup.HomeController', HomeController);
}