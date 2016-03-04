/// <reference path="../../tsd/tsd.d.ts"/>
module MadnessCup {
    'use strict';

    class LoginController {
		username: string;
        password: string;

        constructor(
            protected Auth,
            protected $state, 
            protected enjin
        ) {
            //On Load
        }

        login(form) {
			var ctrl = this;
            if (form.$valid) {
                this.Auth.login(
                    this.enjin.db.api.host + 'login',
                    {
                        username: this.username,
                        password: this.password
                    },
                    function(res) {
                        this.$state.go('jobs');   
                    }.bind(this)
                );
            } else {
                alert('Please enter in a valid E-mail and password.');
            }
        }
    }

    angular.module('MadnessCup').controller('MadnessCup.LoginController', LoginController);
}