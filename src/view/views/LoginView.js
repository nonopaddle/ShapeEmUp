import { Router } from './Router.js';
import { View } from './View.js';

export class LoginView extends View {
	constructor(element) {
		super(element);
		const input = this.element.querySelector('.login-nickname-input');
		const loginButton = this.element.querySelector('.login-button');
		loginButton.disabled = true;
		input.addEventListener('input', event => {
			event.preventDefault();
			if (input.value.length == 0) {
				loginButton.classList.remove('login-active');
			} else {
				loginButton.classList.add('login-active');
			}
		});
		loginButton.addEventListener('click', event => {
			event.preventDefault();
			if (!loginButton.classList.contains('login-active')) return;
			sessionStorage.setItem('nickname', input);
			Router.navigate('/main-menu');
		});

		loginButton.addEventListener('mouseover', event => {
			event.preventDefault();
		});
	}
}
