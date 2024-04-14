import { View } from './View.js';
import { avatarsList } from '../rendering/textures.js';
import Connection from '../../Connection.js';
import { Router, handleMenuLinkClick } from './Router.js';
import { Renderer } from '../rendering/Renderer.js';
import { KeyBoardControls } from '../../controller/KeyboardControls.js';
import $ from 'jquery';
import 'jcanvas';

export class WaitingRoomView extends View {
	#buttonsize = { x: 200, y: 200 };
	constructor(element) {
		super(element);
		const avatarListContainer = document.querySelector('.avatars-list');
		Object.keys(avatarsList).forEach(avatarName => {
			avatarListContainer.innerHTML += `<canvas class="${avatarName}">`;
		});

		Object.entries(avatarsList).forEach(avatar => {
			const [avatarName, datas] = avatar;
			const canvas = avatarListContainer.querySelector(`.${avatarName}`);
			canvas.width = this.#buttonsize.x;
			canvas.height = this.#buttonsize.y;
			canvas.addEventListener('click', event => {
				event.preventDefault();
				Connection.socket.emit('selection avatar', {
					avatar: avatarName,
					playerNickname: sessionStorage.getItem('nickname'),
				});
			});

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

		$('.launch', this.element)
			.off('click', handleMenuLinkClick)
			.on('click', event => {
				event.preventDefault();
				Connection.socket.emit('launch');
			});

		$('.disconnect', this.element)
			.off('click', handleMenuLinkClick)
			.on('click', event => {
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
				const canvas = $(`.avatars-list .${avatarLabel}`)
					.removeClass('selected-by-other')
					.removeClass('selected-by-me');
				if (playerNickname == currentUser) {
					canvas.addClass('selected-by-me');
				} else if (playerNickname != undefined) {
					canvas.addClass('selected-by-other');
				}
			});
		});

		Connection.socket.on(
			'getDifficulties-from-server',
			(difficulties, defaultDifficulty) => {
				let i = 0;
				const difficultySlider = $('.difficulty').html(`
					<h2 class="difficultyDisplay">${defaultDifficulty}</h2>
					<form class="difficulty-slider">
						<div >
							${Object.keys(difficulties).map(
								difficulty => `
										<input type="radio" name="difficulty" id="${difficulty}" value="${difficulty}" ${difficulty == defaultDifficulty ? 'checked' : ''}>
									`
							)}
						</div>
					</form>
				`);
				const difficultyOptions = $('input', difficultySlider).on(
					'input',
					event =>
						Connection.socket.emit('difficulty change', event.target.value)
				);

				Connection.socket.on('difficulty update', difficultyValue => {
					difficultyOptions.prop('checked');
					difficultyOptions.each(function () {
						this.checked = this.id == difficultyValue;
					});
					$('.difficultyDisplay', difficultySlider).html(difficultyValue);
				});
			}
		);
	}
}
