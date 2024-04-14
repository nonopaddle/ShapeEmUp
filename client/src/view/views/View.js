import { handleMenuLinkClick } from './Router.js';
import $ from 'jquery';

export class View {
	constructor(element) {
		this.element = element;
		$('a').on('click', event => {
			handleMenuLinkClick(event);
		});
	}

	show() {
		this.element.fadeIn();
	}

	hide() {
		this.element.fadeOut();
	}
}
