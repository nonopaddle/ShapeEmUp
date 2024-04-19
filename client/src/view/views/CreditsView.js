import { Router } from './Router.js';
import { View } from './View.js';

export class CreditsView extends View {
	constructor(element) {
		super(element);
		const home_button = this.element.querySelector('.home');
		home_button.addEventListener('click', e => {
			e.preventDefault();
			Router.navigate('/main-menu');
		});
	}
}
