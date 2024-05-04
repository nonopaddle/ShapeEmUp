import { io } from 'socket.io-client';
import { Router } from './view/views/Router.js';
import { WaitingRoomView } from './view/views/WaitingRoomView.js';
import { Renderer } from './view/rendering/Renderer.js';
import { MainGameView } from './view/views/MainGameView.js';
import { EndScreenView } from './view/views/EndScreenView.js';

export default class Connection {
	static socket;

	static connect() {
		this.socket = io({
			query: {
				nickname: sessionStorage.getItem('nickname'),
			},
			reconnection: false,
		});
		this.socket.on('disconnect', () => {
			Router.navigate('/main-menu');
		});
		Renderer.initConnectionToRenderer();
		WaitingRoomView.initConnectionToWaitingRoom();
		MainGameView.initConnectionToEndScreen();
		EndScreenView.initEndScreen();
	}

	static disconnect() {
		this.socket.disconnect();
		this.socket = null;
	}
}
