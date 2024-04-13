import { View } from './View.js';

export class ScoresView extends View {
	constructor(element) {
		super(element);
		this.#updateTab();
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
                            <td>${score.name}</td>
                            <td>${score.pts} pts</td>
                        </tr>
                    `;
					});
				this.element.querySelector('.scores-tab tbody').innerHTML = html;
			});
	}

	show() {
		super.show();
		this.#updateTab();
	}
}
