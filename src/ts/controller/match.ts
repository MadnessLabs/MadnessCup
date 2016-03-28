/// <reference path="../../tsd/tsd.d.ts"/>
module MadnessCup {
    'use strict';

    class MatchController {
        maps: any;
        offset: number;
        counter: number;
        finalOffset: number;
        radius: number;
        matchup: any;
        modal: any;
        characters: any;
        player: string;
        characterSearch: string;
        match: number;

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
                
                if (!this.matchup.matches) {
                    this.matchup.matches = { 
                        1: {
                            banned: []
                        } 
                    };
                    this.match = 1;
                }// else { Go to newest match }

                this.match = 1;

                if (!this.matchup.matches[this.match].banned) {
                    this.matchup.matches[this.match].banned = [];
                }
                
            }.bind(this));

            // this.countDown(10, function() {
            //     //alert('Im done counting');
            // });
        }

        mapBackground(map) {
            return { backgroundImage: 'url(../img/stage/' + map + ')' };
        }

        banMap(index) {
            if (this.matchup.matches[this.match].banned.indexOf(index) === -1) {
                // This this the first match
                if (this.match === 1) {
                    // Ban Rotation
                    // Banned Maps < 6  HINT: .length
                    if (this.matchup.matches[this.match].banned.length < 5) {
                        this.matchup.matches[this.match].banned.push(index);
                        this.matchup.$save();
                        if (this.matchup.matches[this.match].banned.length === 5) {
                            // Find map that's not banned
                            // Set it to this.map
                            angular.forEach(this.maps, function(value, key) {
                                if (this.matchup.matches[this.match].banned.indexOf(key) === -1) {
                                    this.matchup.matches[this.match].map = value;
                                    this.matchup.$save();
                                }
                            }.bind(this));
                        }
                    }
                } else {
                    // Ban 1 Map and Looser Picks
                }   
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

        playerAvatar(avatar, player) {
            var playerAvatar = this.Player.avatar(avatar);
            if (this.matchup && this.matchup.matches[this.match][player]) {
                playerAvatar = this.Player.character('img/character/' + this.matchup.matches[this.match][player].image);
            }
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
            //this.matchup[this.player].avatar = 'img/character/' + character.image;
            this.matchup.matches[this.match][this.player] = character;
            this.closeModal();
            this.characterSearch = '';
            this.matchup.$save();
        }

        selectedStageBackground() {
            var background = null;
            if (this.matchup && this.matchup.matches[this.match].map) {
                background = { backgroundImage: 'url(img/stage/' + this.matchup.matches[this.match].map + ')' };
            }
            return background;
        }
    }

    angular.module('MadnessCup')
           .controller('MadnessCup.MatchController', MatchController);
}