import { Router } from './Router.js';
import { View } from './View.js';
import $ from 'jquery';

export class LoginView extends View {
	constructor(element) {
		super(element);
		this.input = $('.login-nickname-input', this.element);
		this.loginButton = $('.login-button', this.element).attr('disabled', true);
		this.#toggleButton();
		this.input.on('input', event => {
			event.preventDefault();
			this.#toggleButton();
		});
		this.input.on('keypress', event => {
			if (event.key === 'Enter') {
				event.preventDefault();
				this.#connect();
			}
		});
		this.loginButton.off('click').on('click', event => {
			event.preventDefault();
			this.#connect();
		});
	}

	#connect() {
		if (!this.loginButton.hasClass('login-active')) return;
		sessionStorage.setItem('nickname', this.input.val());
		Router.navigate('/main-menu');
	}

	#toggleButton() {
		if (this.input.val().length == 0) {
			this.loginButton.removeClass('login-active');
		} else {
			this.loginButton.addClass('login-active');
		}
	}
}
