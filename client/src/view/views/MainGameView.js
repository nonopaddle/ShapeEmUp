import Connection from '../../Connection.js';
import { Router } from './Router.js';
import { View } from './View.js';

export class MainGameView extends View {
	constructor(element) {
		super(element);
	}

	static initConnectionToEndScreen() {
		Connection.socket.on('game-end', () => {
			Router.navigate('/end-screen');
		});
	}
}
