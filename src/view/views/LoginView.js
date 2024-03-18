import { Router } from './Router.js';
import { View } from './View.js';

export class LoginView extends View {
	constructor(element) {
		super(element);
		const input = this.element.querySelector('.nickname_input');
		const loginButton = this.element.querySelector('.identify');
		loginButton.disabled = true;
		input.addEventListener('input', event => {
			event.preventDefault();
			loginButton.disabled = input.value.length == 0;
		});
		loginButton.addEventListener('click', event => {
			event.preventDefault();
			sessionStorage.setItem('nickname', input);
			Router.navigate('/main_menu');
		});
	}
}
