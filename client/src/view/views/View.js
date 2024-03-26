import { Router } from './Router.js';

export class View {
	constructor(element) {
		this.element = element;
		const buttons = this.element.querySelectorAll('a');
		buttons.forEach(button => {
			button.addEventListener('click', setNavigationToHref);
		});
	}

	show() {
		this.element.classList.add('active');
	}

	hide() {
		this.element.classList.remove('active');
	}
}

export function setNavigationToHref(event) {
	event.preventDefault();
	Router.navigate(event.currentTarget.getAttribute('href'));
}
