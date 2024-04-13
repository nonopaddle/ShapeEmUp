import { lerp } from '../../../../server/math/MathUtils.js';
import Connection from '../../Connection.js';
import { MouseControls } from '../../controller/MouseControls.js';
import { avatarsList, bulletsList, monsters, weapons } from './textures.js';

export class Renderer {
	static #entities;
	static time;
	static playersScore = [];
	static cameraOffset = undefined;
	static canvas;
	static context;
	static #reqAnim;

	static set_canvas(canvas) {
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
		const canvasResizeObserver = new ResizeObserver(resampleCanvas.bind(this));
		canvasResizeObserver.observe(this.canvas);
		function resampleCanvas() {
			this.canvas.width = this.canvas.clientWidth;
			this.canvas.height = this.canvas.clientHeight;
		}
	}

	static start_rendering() {
		if (this.context == undefined) throw new Error('context is null !');
		this.clear();
		this.#renderEnvironment();
		this.#renderTime();
		this.#renderPlayersScore();

		this.#reqAnim = requestAnimationFrame(this.start_rendering.bind(this));
	}

	static stop_rendering() {
		window.cancelAnimationFrame(this.#reqAnim);
	}

	static clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
	static #renderEnvironment() {
		if (this.cameraOffset == undefined) return;

		this.#renderBackground();
		this.#renderEntities();
	}

	static #renderBackground() {
		this.#renderDebugBackground();
	}

	static #renderDebugBackground() {
		this.context.fillStyle = 'lightgrey';
		const cellSize = 100;
		const nbCol = 100;
		const nbRow = 50;
		for (let i = 0; i < nbCol; i++) {
			for (let j = 0; j < nbRow; j++) {
				if ((i % 2 != 0) ^ (j % 2 == 0))
					this.context.fillRect(
						-this.cameraOffset.x - this.canvas.width / 2 + i * cellSize,
						-this.cameraOffset.y - this.canvas.height / 2 + j * cellSize,
						cellSize,
						cellSize
					);
			}
		}
	}

	static #renderEntities() {
		if (this.#entities != undefined)
			this.#entities.forEach(entity => {
				if (entity.name == undefined) return;
				switch (entity.type) {
					case 'player':
						Object.values(avatarsList)
							.filter(avatar => avatar.owner == entity.name)
							.map(avatar => {
								avatar.draw(
									this.context,
									{
										x: entity.origin.x - this.cameraOffset.x,
										y: entity.origin.y - this.cameraOffset.y,
									},
									entity.radius,
									-entity.angle,
									entity.maxHP,
									entity.HP,
									entity.stats
								);
							});
						break;
					case 'bullet':
						bulletsList[entity.name].draw(
							this.context,
							{
								x: entity.origin.x - this.cameraOffset.x,
								y: entity.origin.y - this.cameraOffset.y,
							},
							entity.radius,
							Object.values(avatarsList)
								.filter(avatar => avatar.owner == entity.owner)
								.map(avatar => avatar.color)
						);
						break;
					case 'weapon':
						weapons[entity.name].draw(
							this.context,
							{
								x: entity.origin.x - this.cameraOffset.x,
								y: entity.origin.y - this.cameraOffset.y,
							},
							entity.radius
						);
						break;
					case 'monster':
						monsters[entity.name].draw(
							this.context,
							{
								x: entity.origin.x - this.cameraOffset.x,
								y: entity.origin.y - this.cameraOffset.y,
							},
							entity.radius,
							entity.maxHP,
							entity.HP
						);
						break;
					default:
						break;
				}
			});
		this.context.beginPath();
		this.context.arc(
			MouseControls.proxyCoords.x,
			MouseControls.proxyCoords.y,
			10,
			0,
			Math.PI * 2
		);
		this.context.closePath();
		this.context.stroke();
	}

	static #renderTime() {
		this.context.font = '30px Arial';
		this.context.fillStyle = 'white';
		const sec = Math.floor(this.time) % 60;
		this.context.fillText(
			`${Math.floor(Math.floor(this.time) / 60)}:${sec < 10 ? `0${sec}` : sec}`,
			50,
			100
		);
	}

	static #renderPlayersScore() {
		this.context.font = '30px Arial';
		this.context.fillStyle = 'white';
		let txt = ``;
		this.playersScore.forEach(player => {
			txt += `${player.name}: ${player.pts} `;
		});
		this.context.fillText(txt, 50, 50);
	}

	static initConnectionToRenderer() {
		Connection.socket.on('getGameSize-from-server', gameSize => {
			this.canvas.height = window.innerHeight;
			this.canvas.width = window.innerWidth;
			/*const maxWidth = window.innerWidth;
			const maxHeight = window.innerHeight;

			let window_ratio = maxWidth / maxHeight;
			let game_ratio = gameSize.x / gameSize.y;

			if (window_ratio >= game_ratio) {
				this.canvas.height = maxHeight;
				this.canvas.width = maxHeight * game_ratio;
			} else {
				this.canvas.height = maxWidth / game_ratio;
				this.canvas.width = maxWidth;
			}

			this.w_ratio = this.canvas.width / gameSize.x;
			this.h_ratio = this.canvas.height / gameSize.y;*/
		});
		Connection.socket.on('update-entities', entities => {
			this.#entities = entities;
			entities
				.filter(
					entity =>
						entity.type == 'player' &&
						entity.name == sessionStorage.getItem('nickname')
				)
				.map(entity => {
					if (this.cameraOffset == undefined) {
						this.cameraOffset = {
							x: entity.origin.x - this.canvas.width / 2,
							y: entity.origin.y - this.canvas.height / 2,
						};
					} else {
						this.cameraOffset.x = lerp(
							this.cameraOffset.x,
							entity.origin.x - this.canvas.width / 2,
							0.2
						);
						this.cameraOffset.y = lerp(
							this.cameraOffset.y,
							entity.origin.y - this.canvas.height / 2,
							0.2
						);
					}
				});
		});
		Connection.socket.on('getTime-from-server', time => {
			this.time = time;
		});
		Connection.socket.on('getPlayersScore-from-server', scoreTab => {
			this.playersScore = [];
			scoreTab.forEach(score => {
				this.playersScore.push(score);
			});
		});
	}
}
