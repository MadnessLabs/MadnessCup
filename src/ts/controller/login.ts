/// <reference path="../../tsd/tsd.d.ts"/>
module MadnessCup {
    'use strict';

    class LoginController {
		username: string;
        password: string;

        constructor(
            protected $state, 
            protected enjin
        ) {
            //On Load
        }

        login() {
            var ref = new Firebase(this.enjin.db.firebase.host);
            ref.authWithOAuthPopup('facebook', function(error, authData) {
                if (error) {
                    console.log('Login Failed!', error);
                } else {
                    console.log('Authenticated successfully with payload:', authData);
                }
            });
	    }
    }

    angular.module('MadnessCup').controller('MadnessCup.LoginController', LoginController);
}