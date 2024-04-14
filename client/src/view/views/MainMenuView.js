import Connection from '../../Connection.js';
import { Router } from './Router.js';
import { View } from './View.js';
import $ from 'jquery';

export class MainMenuView extends View {
	constructor(element) {
		super(element);
		this.element = element;
		$('.playButton', this.element)
			.off('click')
			.on('click', event => {
				event.preventDefault();
				Connection.connect();
			});

		$('.logoutButton', this.element)
			.off('click')
			.on('click', event => {
				sessionStorage.removeItem('nickname');
				Router.navigate('/login');
			});
	}
}
