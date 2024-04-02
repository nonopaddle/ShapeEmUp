import Connection from '../../Connection.js';
import { View } from './View.js';

export class MainMenuView extends View {
	constructor(element) {
		super(element);
		this.element = element;
		const playButton = this.element.querySelector('.playButton');
		playButton.addEventListener('click', event => {
			event.preventDefault();
			Connection.connect();
		});
	}
}
