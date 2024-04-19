import Connection from '../../Connection.js';
import { Router } from './Router.js';
import { View } from './View.js';

export class MainGameView extends View {
	constructor(element) {
		super(element);
		const play_button = this.element.querySelector('.playButton');
	}

	static initConnectionToEndScreen() {
		Connection.socket.on('game-end', scores => {
			const score = scores
				.filter(score => score.name == sessionStorage.getItem('nickname'))
				.map(score => score.pts);
			console.log(scores);
			const scoreText = document.querySelector('.score');
			scoreText.innerHTML = `Votre score est de ${score}`;
			Router.navigate('/end-screen');
		});
	}
}
