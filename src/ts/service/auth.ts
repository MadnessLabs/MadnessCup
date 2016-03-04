/// <reference path="../../tsd/tsd.d.ts"/>
module MadnessCup {
    class AuthService {

        pause: boolean;

        constructor(
            protected enjin,
            protected $state,
            protected $rootScope,
            protected Rest,
            protected $ionicHistory
        ) {
            this.setSession();
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                this.check(event, toState, toParams, fromState, fromParams);
            }.bind(this));
        }

        setSession() {
            if (!this.enjin.session && localStorage.getItem('enjin_session')) {
                this.enjin.session = this.$rootScope.session = JSON.parse(localStorage.getItem('enjin_session'));
                this.Rest.get(this.enjin.db.api.host + 'user/' + this.enjin.session.user_id, false, true).then(function(res){
                    this.update(res.data);
                }.bind(this));
            }
        }

        check(event, toState, toParams, fromState, fromParams) {
            if (toState && toState.name !== fromState.name) {
                if (toState.name === 'login') {
                    if (this.enjin.session) {
                        event.preventDefault();
                        this.$state.go('jobs');
                    }
                } else {
                    if (!this.enjin.session && toState.name !== 'register') {
                        event.preventDefault();
                        this.$state.go('login');
                    }
                }
            }
        }

        login(url, params, callback) {
            this.Rest.post(url, params).then(function(res) {
                if (res.success === true) {
                    this.update(res.data);
                    if (typeof callback === 'function') {
                        callback(res);
                    } else {
                        console.log('Third parameter must be a callback function!');
                    }
                } else {
                    alert(res.data);
                }
            }.bind(this));
        }

        logout() {
            if (confirm('Are you sure you wish to log out?')) {
                delete this.enjin.session;
                delete this.$rootScope.session;
                localStorage.clear();
                this.$state.go('login');
            }
        }

        update(user) {
            this.enjin.session = this.$rootScope.session = user;
            localStorage.setItem('enjin_session', JSON.stringify(this.enjin.session));
            this.$ionicHistory.clearCache();
        }
    }

    angular.module('MadnessCup').service('Auth', AuthService);
}