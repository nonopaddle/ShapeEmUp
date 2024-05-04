import { lerp } from '../../../../server/math/MathUtils.js';
import Connection from '../../Connection.js';
import { MouseControls } from '../../controller/MouseControls.js';
import { avatarsList, bulletsList, monsters, weapons } from './textures.js';

export class Renderer {
	static #entities = {
		players: [],
		bullets: [],
		weapons: [],
		monsters: [],
	};
	static debugBackground = {
		cellRadius: 100,
		nbCol: 100,
		nbRow: 50,
	};
	static time;
	static playersScore = [];
	static cameraOffset = { x: 0, y: 0 };
	static gameSize = { x: 0, y: 0 };
	static zoom = { val: 1, level: 1, min: 0.5, max: 2, step: 0.9 };
	static canvas;
	static context;
	static #reqAnim;

	static set_canvas(canvas) {
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
		const canvasResizeObserver = new ResizeObserver(resampleCanvas.bind(this));
		canvasResizeObserver.observe(this.canvas);
		function resampleCanvas() {
			this.canvas.height = window.innerHeight;
			this.canvas.width = window.innerWidth;
		}
	}

	static start_rendering() {
		if (this.context == undefined) throw new Error('context is null !');
		/*Connection.socket.emit('MouseCoordsEvent', {
			x: MouseControls.proxyCoords.x + Renderer.cameraOffset.x,
			y: MouseControls.proxyCoords.y + Renderer.cameraOffset.y,
		});*/
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

	static incrementZoom() {
		if (this.zoom.level < this.zoom.max) this.zoom.level /= this.zoom.step;
	}
	static decrementZoom() {
		if (this.zoom.level > this.zoom.min) this.zoom.level *= this.zoom.step;
	}

	static #renderWithCameraView(drawFunc) {
		this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
		this.zoom.val = lerp(this.zoom.val, this.zoom.level, 0.2);
		this.context.scale(this.zoom.val, this.zoom.val);
		this.context.translate(-this.cameraOffset.x, -this.cameraOffset.y);

		drawFunc();

		this.context.translate(this.cameraOffset.x, this.cameraOffset.y);
		this.context.scale(1 / this.zoom.val, 1 / this.zoom.val);

		Object.values(avatarsList)
			.filter(avatar => avatar.owner == sessionStorage.getItem('nickname'))
			.map(avatar => (this.context.strokeStyle = avatar.color));

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

		this.context.translate(-this.canvas.width / 2, -this.canvas.height / 2);
	}

	static #renderEnvironment() {
		this.#renderWithCameraView(() => {
			this.#renderBackground();
			this.#renderEntities();
			this.#renderBoundaries();
			this.#debugRenderOrigin();
		});
	}

	static #renderBackground() {
		this.#debugRenderBackground();
	}

	static #debugRenderBackground() {
		const o_x =
				Math.round(this.canvas.width / 100) * 100 +
				this.debugBackground.cellRadius,
			o_y =
				Math.round(this.canvas.height / 100) * 100 +
				this.debugBackground.cellRadius;
		for (let i = 0; i < this.debugBackground.nbCol; i++) {
			for (let j = 0; j < this.debugBackground.nbRow; j++) {
				if ((i % 2 != 0) ^ (j % 2 == 0)) {
					this.context.fillStyle = '#f8f9fa';
				} else {
					this.context.fillStyle = '#e9ecef';
				}
				this.context.fillRect(
					-(o_x * (this.zoom.max + 1)) / 2 +
						i * this.debugBackground.cellRadius,
					-(o_y * (this.zoom.max + 1)) / 2 +
						j * this.debugBackground.cellRadius,
					this.debugBackground.cellRadius,
					this.debugBackground.cellRadius
				);
			}
		}
	}

	static #debugRenderOrigin() {
		this.context.fillStyle = 'red';
		this.context.fillRect(-10, -10, 20, 20);
	}

	static #renderEntities() {
		this.#entities.players.forEach(player => {
			Object.values(avatarsList)
				.filter(avatar => avatar.owner == player.name)
				.map(avatar => {
					avatar.draw(
						this.context,
						{
							x: player.origin.x,
							y: player.origin.y,
						},
						player.radius,
						-player.angle,
						player.maxHP,
						player.HP,
						player.stats
					);
				});
		});
		this.#entities.bullets.forEach(bullet => {
			bulletsList[bullet.name].draw(
				this.context,
				{
					x: bullet.origin.x,
					y: bullet.origin.y,
				},
				bullet.radius,
				Object.values(avatarsList)
					.filter(avatar => avatar.owner == bullet.owner)
					.map(avatar => avatar.color)
			);
		});
		this.#entities.weapons.forEach(weapon => {
			weapons[weapon.name].draw(
				this.context,
				{
					x: weapon.origin.x,
					y: weapon.origin.y,
				},
				weapon.radius
			);
		});
		this.#entities.monsters.forEach(monster => {
			monsters[monster.name].draw(
				this.context,
				{
					x: monster.origin.x,
					y: monster.origin.y,
				},
				monster.radius,
				monster.maxHP,
				monster.HP
			);
		});
	}

	static #renderBoundaries() {
		this.context.strokeStyle = 'blue';
		this.context.lineWidth = 4;
		this.context.beginPath();
		this.context.moveTo(0, 0);
		this.context.lineTo(this.gameSize.x, 0);
		this.context.lineTo(this.gameSize.x, this.gameSize.y);
		this.context.lineTo(0, this.gameSize.y);
		this.context.lineTo(0, 0);
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
			this.gameSize = gameSize;
		});
		Connection.socket.on('update-entities', entities => {
			this.#entities.bullets = [];
			this.#entities.monsters = [];
			this.#entities.players = [];
			this.#entities.weapons = [];
			entities.forEach(entity => {
				switch (entity.type) {
					case 'player':
						this.#entities.players.push(entity);
						break;
					case 'bullet':
						this.#entities.bullets.push(entity);
						break;
					case 'weapon':
						this.#entities.weapons.push(entity);
						break;
					case 'monster':
						this.#entities.monsters.push(entity);
						break;
					default:
						break;
				}
			});
			this.#entities.players
				.filter(entity => entity.name == sessionStorage.getItem('nickname'))
				.map(player => {
					if (this.cameraOffset == undefined) {
						this.cameraOffset = {
							x: player.origin.x - this.canvas.width / 2,
							y: player.origin.y - this.canvas.height / 2,
						};
					} else {
						this.cameraOffset.x = lerp(
							this.cameraOffset.x,
							player.origin.x,
							0.3
						);
						this.cameraOffset.y = lerp(
							this.cameraOffset.y,
							player.origin.y,
							0.3
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
