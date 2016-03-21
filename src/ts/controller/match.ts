/// <reference path="../../tsd/tsd.d.ts"/>
module MadnessCup {
    'use strict';

    class MatchController {
        maps: any;
        banned: any;
        offset: number;
        counter: number;
        finalOffset: number;
        radius: number;
        matchup: any;
        modal: any;
        characters: any;
        player: string;
        characterSearch: string;

        constructor(
            protected $interval,
            protected $timeout,
            protected enjin,
            protected $firebaseObject,
            protected $stateParams,
            protected Player,
            protected Character,
            protected $ionicModal,
            protected $scope
        ) {
            // ON LOAD       
            this.maps = [
                'battlefield.jpg', 
                'final_destination.jpg', 
                'lylat_cruise.png', 
                'smashville.jpg', 
                'dream_land.png', 
                'town_and_city.png'
            ];

            this.characters = Character.all();

            this.banned = [];

            var matchupUrl =
                this.enjin.db.firebase.host
                + 'tournament/'
                + $stateParams.id
                + '/rounds/'
                + ($stateParams.round - 1)
                + '/'
                + $stateParams.matchup;

            $firebaseObject(new Firebase(matchupUrl)).$loaded(function(res){
                this.matchup = res;
            }.bind(this));

            // this.countDown(10, function() {
            //     //alert('Im done counting');
            // });
        }

        mapBackground(map) {
            return { backgroundImage: 'url(../img/stage/' + map + ')' };
        }

        banMap(index) {
            if (this.banned.indexOf(index) === -1) {
                this.banned.push(index);
            }
        }

        thisFn() {
            // Run when countdown complete
        }

        countDown(time, callback) {
            this.radius = 50;
            this.counter = time;
            this.offset = 0;
            var timer = time + 1;
            this.finalOffset = 2 * Math.PI * this.radius;
            this.$interval(function() {
                this.offset += this.finalOffset / time;
                timer--;
                this.counter = timer;
                if (this.counter === 1) {
                    this.$timeout(function() {
                        this.counter = 0;
                        callback();
                    }.bind(this), 1000);
                }
            }.bind(this), 1000, time);
        }

        playerAvatar(avatar) {
            var playerAvatar = this.Player.avatar(avatar); 
            return playerAvatar;
        }

        closeModal() {
            this.modal.hide();
            this.modal.remove();
        }

        selectCharacter(player) {
            this.player = player;
            this.$ionicModal.fromTemplateUrl('html/modal/character.html', {
                scope: this.$scope,
                animation: 'slide-in-up',
                backdropClickToClose: true
            }).then(function(modal) {
                this.modal = modal;
                this.modal.show();
            }.bind(this));
        }
        setCharacter(character) {
            this.matchup[this.player].avatar = 'img/character/' + character.image;
            this.closeModal();
            this.characterSearch = '';
        }
    }

    angular.module('MadnessCup')
           .controller('MadnessCup.MatchController', MatchController);
}