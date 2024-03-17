import { View } from './View.js';
import { avatarsList } from '../rendering/AvatarList.js';

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
			canvas.width = this.#buttonsize.x;
			canvas.height = this.#buttonsize.y;
			const ctx = canvas.getContext('2d');
			avatar.draw(ctx, { x: canvas.width / 2, y: canvas.height / 2 }, 2);
		});
	}

	mouseEnterEventHandler(event) {
		event.preventDefault();
		const canvas = event.currentTarget;
	}
	mouseLeaveEventHandler(event) {
		event.preventDefault();
		const canvas = event.currentTarget;
	}
	mouseDownEventHandler(event) {
		event.preventDefault();
		const canvas = event.currentTarget;
	}
}
