import Connection from '../../Connection.js';
import { Router } from './Router.js';
import { View } from './View.js';
import $ from 'jquery';

export class MainGameView extends View {
	constructor(element) {
		super(element);
	}

	static initConnectionToEndScreen() {
		Connection.socket.on('game-end', scores => {
			const score = scores
				.filter(score => score.name == sessionStorage.getItem('nickname'))
				.map(score => score.pts);
			$('.score').html(`Votre score est de ${score}`);
			Router.navigate('/end-screen');
		});
	}
}
