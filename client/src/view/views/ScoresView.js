import { View } from './View.js';
import $ from 'jquery';

export class ScoresView extends View {
	constructor(element) {
		super(element);
		this.#updateTab();
	}

	#updateTab() {
		$.ajax('/scores').done(scores => {
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
			$('.scores-tab tbody', this.element).html(html);
		});
	}

	show() {
		super.show();
		this.#updateTab();
	}
}
