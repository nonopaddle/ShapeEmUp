import Connection from '../../Connection.js';
import { View } from './View.js';
import $ from 'jquery';

export class EndScreenView extends View {
	constructor(element) {
		super(element);
	}

	static initEndScreen() {
		$('.endButton', this.element)
			.off('click')
			.on('click', event => {
				event.preventDefault();
				Connection.disconnect();
			});
	}
}
