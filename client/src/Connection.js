import { io } from 'socket.io-client';
import { Router } from './view/views/Router.js';

export default class Connection {
	static socket;

	static connect() {
		this.socket = io({
			query: {
				nickname: sessionStorage.getItem('nickname'),
			},
		});
		this.socket.on('disconnect', () => {
			Router.navigate('/main-menu');
		});
	}

	static disconnect() {
		this.socket.disconnect();
	}
}
