/// <reference path="../../tsd/tsd.d.ts"/>
module MadnessCup {
    'use strict';

    class LoginController {
		ref: any;
        playerUrl: string;

        constructor(
            protected enjin,
            protected $firebaseObject,
            protected $firebaseArray,
            protected $state,
            protected Session
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
                    player.id = data.auth.uid;
                    this.Session.set(player);
                    this.$state.go('home');
                } else {
                    var playersRef = new Firebase(this.playerUrl);
                    var players = this.$firebaseArray(playersRef);
                    var newPlayer = {
                        id: '',
                        name: '',
                        avatar: '',
                        profile: ''
                    };
                    switch (data.provider) {
                        case 'google':
                            newPlayer.id = data.auth.uid;
                            newPlayer.name = data.google.displayName;
                            newPlayer.avatar = data.google.profileImageURL;
                            newPlayer.profile = data.google.cachedUserProfile.link;
                            break;
                        case 'facebook':
                            newPlayer.id = data.auth.uid;
                            newPlayer.name = data.facebook.displayName;
                            newPlayer.avatar = data.facebook.profileImageURL;
                            newPlayer.profile = data.facebook.cachedUserProfile.link;
                            break;
                        default:
                            return false;
                    }
                    
                    playersRef.child(data.auth.uid).set(newPlayer, function(){
                        this.Session.set(newPlayer);
                        this.$stage.go('home');
                    }.bind(this));                
                }
            }.bind(this))
            .catch(function(error){
                console.log(error);
            });
        }
    }

    angular.module('MadnessCup').controller('MadnessCup.LoginController', LoginController);
}