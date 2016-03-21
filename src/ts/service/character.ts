/// <reference path="../../tsd/angularjs/angular.d.ts"/>

module MadnessCup {
	class CharacterService {

		constructor() {
            // On Load
		}

        all() {
            return [
                { name: 'Bayonetta', image: 'bayonetta.png' },
                { name: 'Bowser', image: 'bowser.png' },
                { name: 'Bowser Jr', image: 'bowser_jr.png' },
                { name: 'Captain Falcon', image: 'captain_falcon.png' },
                { name: 'Charizard', image: 'charizard.png' },
                { name: 'Cloud', image: 'cloud.png' },
                { name: 'Corrin', image: 'corrin.png' },
                { name: 'Dark Pit', image: 'dark_pit.png' },
                { name: 'Diddy Kong', image: 'diddy_kong.png' },
                { name: 'Donkey Kong', image: 'donkey_kong.png' },
                { name: 'Dr Mario', image: 'dr_mario.png' },
                { name: 'Duck Hunt', image: 'duck_hunt.png' },
                { name: 'Falco', image: 'falco.png' },
                { name: 'Fox', image: 'fox.png' },
                { name: 'Ganondorf', image: 'ganondorf.png' },
                { name: 'Greninja', image: 'greninja.png' },
                { name: 'Ike', image: 'ike.png' },
                { name: 'Jigglypuff', image: 'jigglypuff.png' },
                { name: 'King Dedede', image: 'king_dedede.png' },
                { name: 'Kirby', image: 'kirby.png' },
                { name: 'Link', image: 'link.png' },
                { name: 'Little Mac', image: 'little_mac.png' },
                { name: 'Lucario', image: 'lucario.png' },
                { name: 'Lucas', image: 'lucas.png' },
                { name: 'Lucina', image: 'lucina.png' },
                { name: 'Luigi', image: 'luigi.png' },
                { name: 'Mario', image: 'mario.png' },
                { name: 'Marth', image: 'marth.png' },
                { name: 'Mega Man', image: 'mega_man.png' },
                { name: 'Meta Knight', image: 'meta_knight.png' },
                { name: 'Mewtwo', image: 'mewtwo.png' },
                { name: 'Mii Fighters', image: 'mii_fighters.png' },
                { name: 'Mr Game and Watch', image: 'mr_game_and_watch.png' },
                { name: 'Ness', image: 'ness.png' },
                { name: 'Olimar', image: 'olimar.png' },
                { name: 'Pac-man', image: 'pac-man.png' },
                { name: 'Palutena', image: 'palutena.png' },
                { name: 'Peach', image: 'peach.png' },
                { name: 'Pikachu', image: 'pikachu.png' },
                { name: 'Pit', image: 'pit.png' },
                { name: 'Rob', image: 'rob.png' },
                { name: 'Robin', image: 'robin.png' },
                { name: 'Rosalina', image: 'rosalina.png' },
                { name: 'Roy', image: 'roy.png' },
                { name: 'Ryu', image: 'ryu.png' },
                { name: 'Samus', image: 'samus.png' },
                { name: 'Sheik', image: 'sheik.png' },
                { name: 'Shulk', image: 'shulk.png' },
                { name: 'Sonic', image: 'sonic.png' },
                { name: 'Toon Link', image: 'toon_link.png' },
                { name: 'Villager', image: 'villager.png' },
                { name: 'Wario', image: 'wario.png' },
                { name: 'Wii Fit Trainer', image: 'wii_fit_trainer.png' },
                { name: 'Yoshi', image: 'yoshi.png' },
                { name: 'Zelda', image: 'zelda.png' },
                { name: 'Zero Suit Samus', image: 'zero_suit_samus.png' }
            ];
        }
	}

	angular.module('MadnessCup').service('Character', CharacterService);
}