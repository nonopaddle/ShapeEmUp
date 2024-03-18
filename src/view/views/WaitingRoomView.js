import { View } from './View.js';
import { avatarsList } from '../rendering/AvatarList.js';
import gameArea from '../../GameArea.js';
import { PlayerEntity } from '../../entity/PlayerEntity.js';

export class WaitingRoomView extends View {
	#buttonsize = { x: 200, y: 200 };
	constructor(element) {
		super(element);
		const avatarListContainer = this.element.querySelector('.avatars_list');
		avatarsList.forEach(avatar => {
			avatarListContainer.innerHTML += `<canvas class="${avatar.label}">`;
		});
		avatarsList.forEach(avatar => {
			const canvas = avatarListContainer.querySelector(`.${avatar.label}`);
			canvas.addEventListener('click', this.selection.bind(this));
			canvas.width = this.#buttonsize.x;
			canvas.height = this.#buttonsize.y;
			const ctx = canvas.getContext('2d');
			avatar.draw(ctx, { x: canvas.width / 2, y: canvas.height / 2 }, 2);
		});

		const launchButton = this.element.querySelector('.launch');
		launchButton.addEventListener('click', event => {
			event.preventDefault();
			const d1 = {
				pos: { x: 100, y: 200 },
				size: { x: 10, y: 20 },
				nickname: sessionStorage.getItem('nickname'),
			};
			const player = new PlayerEntity(d1);
			gameArea.add_entity(player);
			console.log(avatarsList);
		});
	}

	selection(event) {
		event.preventDefault();
		const canvas = event.currentTarget;

		this.element
			.querySelectorAll('canvas')
			.forEach(canvas => canvas.classList.remove('selected'));
		avatarsList.forEach(avatar => (avatar.selectedBy = null));

		if (canvas.classList.length == 2) return;

		canvas.classList.add('selected');
		const avatar = avatarsList.filter(
			avatar => avatar.label == canvas.classList[0]
		)[0];
		avatar.selectedBy = sessionStorage.getItem('nickname');

		console.log(avatar);
	}
}
