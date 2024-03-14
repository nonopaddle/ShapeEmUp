import { Router } from './Router.js';
import { View } from './View.js';

export class MainMenuView extends View {
	constructor(element) {
        super(element);
        const buttons = this.element.querySelectorAll('.main_menu>a');
        buttons.forEach(button => {
            button.addEventListener('click', e => {
                e.preventDefault();
                Router.navigate(e.currentTarget.getAttribute("href"));
            });
        });
    }
}

