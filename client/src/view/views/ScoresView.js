import { Router } from './Router.js';
import { View } from './View.js';

export class ScoresView extends View {
	constructor(element) {
		super(element);
		this.#updateTab();
		const home_button = this.element.querySelector('.home');
		home_button.addEventListener('click', e => {
			e.preventDefault();
			Router.navigate('/main-menu');
		});
	}

	#updateTab() {
		fetch('/scores')
			.then(response => response.json())
			.then(scores => {
				let html = '';
				scores
					.sort((a, b) => b.pts - a.pts)
					.slice(0, 10)
					.forEach(score => {
						html += `
                        <tr>
                            <td class="border-2 px-20 py-2">${score.name}</td>
                            <td class="border-2 px-20 py-2">${score.pts} pts</td>
                        </tr>
                    `;
					});
				this.element.querySelector('.scores-tab tbody').innerHTML = html;
			});
	}

	show() {
		this.#updateTab();
		super.show();
	}
}
