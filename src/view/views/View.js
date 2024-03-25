import { Router } from './Router.js';

export class View {
	constructor(element) {
		this.element = element;
		const buttons = this.element.querySelectorAll('a');
		buttons.forEach(button => {
			button.addEventListener('click', e => {
				e.preventDefault();
				Router.navigate(e.currentTarget.getAttribute('href'));
			});
		});
	}

	show() {
		this.element.classList.add('active');
	}

	hide() {
		this.element.classList.remove('active');
	}
}
