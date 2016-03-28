/// <reference path="../../tsd/angularjs/angular.d.ts"/>

module MadnessCup {
	class PlayerService {

		constructor() {
            // On Load
		}

        avatar(avatar) {
            return {
                backgroundImage: 'url(' + avatar + ')',
                backgroundPosition: 'center',
                padding: 0,
                backgroundSize: 'cover'
            };
        }

        character(avatar) {
            return {
                backgroundImage: 'url(' + avatar + ')',
                backgroundPosition: 'center',
                padding: 10,
                backgroundSize: 'cover'
            };
        }
	}

	angular.module('MadnessCup').service('Player', PlayerService);
}