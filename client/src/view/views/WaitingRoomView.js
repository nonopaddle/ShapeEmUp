import { View } from './View.js';
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
		Object.keys(avatarsList).forEach(avatarName => {
			avatarListContainer.innerHTML += `
				<div class="bg-midnightgreen w-1/6 h-full relative top-1/4 cursor-pointer">
					<div class="bg-tiffanyblue w-full h-1/6 -translate-y-1/2" style="clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);"></div>
					<canvas class="${avatarName} absolute left-1/2 -translate-x-1/2 -translate-y-[130%]"></canvas>
					<div class="bg-richblack w-1/2 h-full absolute -translate-y-[16.66667%]" style="clip-path: polygon(0% 0%, 100% 8.5%, 100% 100%, 0% 100%);">
				</div>
				`;
		});

		Object.entries(avatarsList).forEach(avatar => {
			const [avatarName, datas] = avatar;
			const canvas = avatarListContainer.querySelector(`.${avatarName}`);

			canvas.parentElement.addEventListener('click', event => {
				event.preventDefault();
				Connection.socket.emit('selection avatar', {
					avatar: avatarName,
					playerNickname: sessionStorage.getItem('nickname'),
				});
			});

			canvas.width = this.#buttonsize.x;
			canvas.height = this.#buttonsize.y;
			const ctx = canvas.getContext('2d');
			datas.draw(
				ctx,
				{ x: canvas.width / 2, y: canvas.height / 2 },
				50,
				-Math.PI / 2,
				0,
				0,
				{ xp: { amount: 0, toLevelUp: 0 }, level: 0 }
			);
		});

		const openGameCustomButton =
			this.element.querySelector('.open-game-custom');
		const gameCustomWindow = this.element.querySelector('.game-custom-window');

		const closeGameCustomWindow = e => {
			if (e.key == 'Escape' || e.type == 'click') {
				gameCustomWindow.classList.add('hidden');
				document.removeEventListener('keydown', closeGameCustomWindow);
			}
		};
		openGameCustomButton.addEventListener('click', e => {
			e.preventDefault();
			gameCustomWindow.classList.remove('hidden');
			document.addEventListener('keydown', closeGameCustomWindow);
		});

		gameCustomWindow.addEventListener('click', e => {
			if (e.target != gameCustomWindow) return;
			e.preventDefault();
			closeGameCustomWindow(e);
		});

		const launchButton = this.element.querySelector('.launch');
		launchButton.addEventListener('click', event => {
			event.preventDefault();
			Connection.socket.emit('launch');
		});

		const disconnectButton = this.element.querySelector('.disconnect');
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
			const currentUser = sessionStorage.getItem('nickname');
			Object.entries(avatarsAssociations).forEach(association => {
				const [avatarLabel, playerNickname] = association;
				avatarsList[avatarLabel].owner = playerNickname;
				const canvas = document.querySelector(`.avatars-list .${avatarLabel}`);
				canvas.classList.remove('selected-by-other');
				canvas.classList.remove('selected-by-me');
				if (playerNickname == currentUser) {
					canvas.classList.add('selected-by-me');
				} else if (playerNickname != null) {
					canvas.classList.add('selected-by-other');
				}
			});
		});

		Connection.socket.on(
			'getDifficulties-from-server',
			(difficulties, defaultDifficulty) => {
				const difficultySlider = document.querySelector('.difficulty');
				const nbDifficulties = Object.entries(difficulties).length;
				const beamHeight = `${(100 * (nbDifficulties - 1)) / nbDifficulties}%`;
				let i = 0;
				difficultySlider.innerHTML = `
					<form
						class="
							difficulty-slider
							relative
							w-50px
							h-full
							flex
							flex-col
							content-stretch
							h-100%
							before:content-[' ']
							before:absolute
							before:w-2
							before:h-[66.66666666666667%]
							before:top-1/2
							before:left-1/2
							before:-translate-x-1/2
							before:-translate-y-1/2
							before:bg-vanilla
						">
							${Object.keys(difficulties).map(
								difficulty => `
										<input
											type="radio"
											name="difficulty"
											id="${difficulty}"
											value="${difficulty}" ${difficulty == defaultDifficulty ? 'checked' : ''}
											class="
												box-border
												flex-1
												cursor-pointer
												hidden"
										>
										<label
											for="${difficulty}"
											class="
												box-border
												flex-1
												cursor-pointer
												inline-block
												relative
												w-1/5
												h-full
												left-1/2
												-translate-x-1/2
												
												after:content-[' ']
												after:absolute
												after:left-1/2
												after:top-1/2
												after:pt-[10px]
												after:-translate-x-1/2
												after:-translate-y-1/2
												after:w-[30px]
												after:h-[30px]
												after:bg-vanilla
												after:rounded-[50%]
												after:pointer-events-none
												after:z-[1]
												after:cursor-pointer
												after:transition-all
												after:delay-[0.15s]
												after:ease-in-out
											">
										</label>
									`
							)}
					</form>
				`;
				const difficultyOptions = difficultySlider.querySelectorAll('input');
				difficultyOptions.forEach(difficulty =>
					difficulty.addEventListener('input', event => {
						Connection.socket.emit('difficulty change', event.target.value);
					})
				);

				Connection.socket.on('difficulty update', difficultyValue => {
					difficultyOptions.forEach(difficulty => {
						difficulty.checked = difficulty.id == difficultyValue;
					});
				});
			}
		);
	}
}
