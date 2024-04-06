import { View } from './View.js';

export class ScoresView extends View {
	constructor(element) {
		super(element);
		fetch('/scores')
			.then(response => response.json())
			.then(scores => {
				const tableContent = this.element.querySelector('.scores-tab tbody');
				scores.forEach(score => {
					tableContent.innerHTML += `
                        <tr>
                            <td>${score.name}</td>
                            <td>${score.pts} pts</td>
                        </tr>
                    `;
				});
			});
	}
}
