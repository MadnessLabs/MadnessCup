/// <reference path="../tsd/tsd.d.ts"/>

declare var ionic;

module MadnessCup {
    'use strict';

    class AppRunner {
        constructor(
            $ionicPlatform, 
            $cordovaKeyboard, 
            $cordovaSplashscreen, 
            $rootScope, 
            enjin, 
            $state, 
            $ionicLoading, 
            $ionicSideMenuDelegate,
            $window,
            $cordovaInAppBrowser,
            $http,
            Session
        ) {

            $ionicPlatform.ready(function() {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }

                $rootScope.openMap = function(marker) {
                    var text = encodeURIComponent(marker);
                    if (window.cordova) {
                        if (ionic.Platform.isIOS()) {
                            console.log('Opeing in Google Maps on iOS');
                            window.location.href = 'maps://?q=' + text;
                        } else {
                            console.log('Opeing in Google Maps on a good OS');
                            window.open('geo:0,0?q=' + text, '_system', 'location=no');
                        }
                    } else {
                        window.open('https://maps.google.com?q=' + text, '_');
                    }
                };

                if (!enjin.session && localStorage.getItem('enjin_session')) {
                    Session.get();
                }

                $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
                    Session.check(event, toState, toParams, fromState, fromParams);
                }.bind(this));

                $rootScope.$on('loading:show', function() {
                    $ionicLoading.show({ template: '<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner>' });
                });

                $rootScope.$on('loading:hide', function() {
                    $ionicLoading.hide();
                });

                $rootScope.logout = function() {
                    Session.destroy();
                    $state.go('login');
                };

            });
        }
    }
    angular.module('MadnessCup').run(AppRunner);
}