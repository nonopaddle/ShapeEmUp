import { View, setNavigationToHref } from './View.js';
import { avatarsList } from '../rendering/textures.js';
import Connection from '../../Connection.js';
import { Router } from './Router.js';
import { Renderer } from '../rendering/Renderer.js';
import { KeyBoardControls } from '../../controller/KeyboardControls.js';

export class WaitingRoomView extends View {
	#buttonsize = { x: 200, y: 200 };
	constructor(element) {
		super(element);
		const avatarListContainer = this.element.querySelector('.avatars-list');
		avatarsList.forEach(avatar => {
			avatarListContainer.innerHTML += `<canvas class="${avatar.label}">`;
		});

		avatarsList.forEach(avatar => {
			const canvas = avatarListContainer.querySelector(`.${avatar.label}`);

			canvas.addEventListener('click', event => {
				event.preventDefault();
				Connection.socket.emit('selection avatar', {
					avatar: avatar.label,
					playerNickname: sessionStorage.getItem('nickname'),
				});
			});

			canvas.width = this.#buttonsize.x;
			canvas.height = this.#buttonsize.y;
			const ctx = canvas.getContext('2d');
			avatar.draw(ctx, { x: canvas.width / 2, y: canvas.height / 2 }, 2);
		});

		const difficultySlider = this.element.querySelector('.difficulty');
		const difficultyDisplay = this.element.querySelector('.difficulty-display');
		difficultySlider.addEventListener('input', event => {
			event.preventDefault();
			/*gameArea.difficulty = event.target.value;
			console.log(gameArea.difficulty);
			switch (gameArea.difficulty) {
				case '0':
					console.log('ha');
					difficultyDisplay.innerHTML = 'DIFFICULTY : EASY';
					break;
				case '1':
					difficultyDisplay.innerHTML = 'DIFFICULTY : NORMAL';
					break;
				case '2':
					difficultyDisplay.innerHTML = 'DIFFICULTY : HARD';
					break;
				default:
					break;
			}*/
		});

		const launchButton = this.element.querySelector('.launch');
		launchButton.removeEventListener('click', setNavigationToHref);
		launchButton.addEventListener('click', event => {
			event.preventDefault();
			Connection.socket.emit('launch');
		});

		const disconnectButton = this.element.querySelector('.disconnect');
		disconnectButton.removeEventListener('click', setNavigationToHref);
		disconnectButton.addEventListener('click', event => {
			event.preventDefault();
			Connection.disconnect();
		});
	}

	static initConnectionToWaitingRoom() {
		Connection.socket.on('launch fail', () => console.log('launch fail'));
		Connection.socket.on('launch success', () => {
			Router.navigate('/main-game');
			Renderer.start_rendering();
			KeyBoardControls.startListening();
			console.log('start rendering');
		});
		Connection.socket.on('avatar selection update', avatarsAssociations => {
			Object.entries(avatarsAssociations).forEach(association => {
				const [avatarLabel, playerNickname] = association;
				avatarsList
					.filter(avatar => avatar.label == avatarLabel)
					.map(avatar => (avatar.owner = playerNickname));
				const canvas = document.querySelector(`.avatars-list .${avatarLabel}`);
				canvas.classList.remove('selected-by-other');
				canvas.classList.remove('selected-by-me');
				if (playerNickname == sessionStorage.getItem('nickname')) {
					canvas.classList.add('selected-by-me');
				} else if (playerNickname != null) {
					canvas.classList.add('selected-by-other');
				}
			});
		});
	}
}
