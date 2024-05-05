import Connection from '../../Connection.js';
import { MouseControls } from '../../controller/MouseControls.js';
import { Router } from './Router.js';
import { View } from './View.js';

export class MainGameView extends View {
	constructor(element) {
		super(element);
	}

	static initConnectionToEndScreen() {
		Connection.socket.on('game-end', scores => {
			MouseControls.off();
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
