/// <reference path="../../tsd/tsd.d.ts"/>
module MadnessCup {
    'use strict';

    class LoginController {
		ref: any;
        playerUrl: string;

        constructor(
            protected $state, 
            protected enjin,
            protected $firebaseObject,
            protected $firebaseArray,
            protected $rootScope
        ) {
            //On Load
            this.ref = new Firebase(this.enjin.db.firebase.host);
            this.playerUrl = this.enjin.db.firebase.host + 'player/';
        }

        loginFacebook() {
            this.ref.authWithOAuthPopup('facebook', function(error, authData) {
                if (error) {
                    console.log('Login Failed!', error);
                } else {
                    this.authenticate(authData);
                }
            }.bind(this));
	    }

        loginGoogle() {
            this.ref.authWithOAuthPopup('google', function(error, authData) {
                if (error) {
                    console.log('Login Failed!', error);
                } else {
                    this.authenticate(authData);
                }
            }.bind(this));
        }

        authenticate(data) {
            // if user is already registered
            var playerRef = new Firebase(this.playerUrl + data.auth.uid);
            this.$firebaseObject(playerRef).$loaded().then(function(player){
                if (player.name) {
                    this.startSession(player);
                } else {
                    var playersRef = new Firebase(this.playerUrl);
                    var players = this.$firebaseArray(playersRef);
                    var newPlayer = {
                        name: '',
                        avatar: '',
                        profile: ''
                    };
                    switch (data.provider) {
                        case 'google':
                            newPlayer.name = data.google.displayName;
                            newPlayer.avatar = data.google.profileImageURL;
                            newPlayer.profile = data.google.cachedUserProfile.link;
                            break;
                        case 'facebook':
                            newPlayer.name = data.facebook.displayName;
                            newPlayer.avatar = data.facebook.profileImageURL;
                            newPlayer.profile = data.facebook.cachedUserProfile.link;
                            break;
                        default:
                            return false;
                    }
                    
                    playersRef.child(data.auth.uid).set(newPlayer, function(){
                        this.startSession(newPlayer);
                    }.bind(this));                
                }
            }.bind(this))
            .catch(function(error){
                console.log(error);
            });
        }

        startSession(player) {
            this.enjin.session = this.$rootScope.session = {
                name: player.name,
                avatar: player.avatar,
                profile: player.profile
            };
            localStorage.setItem('enjin_session', JSON.stringify(this.enjin.session));
            this.$state.go('home');
        }
    }

    angular.module('MadnessCup').controller('MadnessCup.LoginController', LoginController);
}