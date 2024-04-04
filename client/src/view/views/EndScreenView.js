import Connection from '../../Connection.js';
import { View } from './View.js';

export class EndScreenView extends View {
	constructor(element) {
		super(element);
	}

	static initEndButtonDisconnection() {
		const endButton = document.querySelector('.endButton');
		endButton.addEventListener('click', () => {
			Connection.disconnect();
		});
	}
}
