/// <reference path="../../tsd/angularjs/angular.d.ts"/>

module MadnessCup {
	class BracketsService {

		constructor() {
            // On Load
		}

        isOdd(num) { return num % 2; }

        shuffle(array) {
            var m = array.length, t, i;
            while (m > 0) {
                i = Math.floor(Math.random() * m--);
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }
            return array;
        }

        setup(players) {
            players = this.shuffle(players);
            var matches = [];

            if (this.isOdd(players.length)) {
                var oddManOut = players.pop();
                console.log(players, oddManOut);
            }

            for (var i = 0; i < players.length; i++) {
                var currentIndex = i;
                if (this.isOdd(currentIndex)) {
                    var match = {
                        'p1': players[currentIndex],
                        'p2': players[currentIndex - 1]
                    };
                    matches.push(match);
                }
            }

            return matches;
        }
	}

	angular.module('MadnessCup').service('Brackets', BracketsService);
}