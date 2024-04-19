import Connection from '../../Connection.js';
import { Router } from './Router.js';
import { View } from './View.js';

export class MainMenuView extends View {
	constructor(element) {
		super(element);
		this.element = element;

		const play_button = this.element.querySelector('.playButton');
		const scores_button = this.element.querySelector('.scoresButton');
		const credits_button = this.element.querySelector('.creditsButton');
		const logout_button = this.element.querySelector('.logoutButton');

		play_button.addEventListener('click', e => {
			e.preventDefault();
			Connection.connect();
			Router.navigate('/waiting-room');
		});

		scores_button.addEventListener('click', e => {
			e.preventDefault();
			Router.navigate('/scores');
		});

		credits_button.addEventListener('click', e => {
			e.preventDefault();
			Router.navigate('/credits');
		});

		logout_button.addEventListener('click', e => {
			e.preventDefault();
			sessionStorage.removeItem('nickname');
			Router.navigate('/login');
		});
	}
}
