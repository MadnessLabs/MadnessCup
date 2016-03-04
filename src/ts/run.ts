/// <reference path="../tsd/tsd.d.ts"/>

declare var ionic;

module MadnessCup {
    'use strict';

    class AppRunner {
        constructor(
            $ionicPlatform, 
            $cordovaKeyboard, 
            $cordovaSplashscreen, 
            Auth, 
            $rootScope, 
            enjin, 
            $state, 
            $ionicLoading, 
            $ionicSideMenuDelegate,
            $window,
            $cordovaInAppBrowser,
            $http
        ) {

            $ionicPlatform.ready(function() {
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }

                if (window.cordova) {
                    $cordovaSplashscreen.hide();

                    $rootScope.$watch(function() {
                        return $cordovaKeyboard.isVisible();
                    }, function(value) {
                        $rootScope.keyboardOpen = value;
                    });
                }

                $rootScope.host = {
                    api: enjin.db.api.host.slice(0, -3),
                    url: enjin.url
                };

                $rootScope.logout = function() {
                    Auth.logout();
                };

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

                $rootScope.goBack = function() {
                    $window.history.back();
                };

                $rootScope.openLink = function(link) {
                    if (ionic.Platform.isAndroid()) {
                        $window.open(link, '_blank', 'location=yes');
                    } else {
                        var win = window.open(link, '_blank');
                        win.focus();
                    }
                };

                $rootScope.call = function(phone) {
                    document.location.href = 'tel:' + phone;
                };

                $rootScope.toggleMenu = function() {
                    $ionicSideMenuDelegate.toggleLeft();
                };

                $rootScope.$on('loading:show', function() {
                    $ionicLoading.show({ template: '<ion-spinner icon="ripple" class="spinner-positive"></ion-spinner>' });
                });

                $rootScope.$on('loading:hide', function() {
                    $ionicLoading.hide();
                });

            });
        }
    }
    angular.module('MadnessCup').run(AppRunner);
}