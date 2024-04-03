import Connection from '../../Connection.js';
import { avatarsList, bulletsList, monsters, weapons } from './textures.js';

export class Renderer {
	static #entities;
	static canvas;
	static context;
	static #reqAnim;

	static w_ratio;
	static h_ratio;

	static set_canvas(canvas) {
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
		/* const canvasResizeObserver = new ResizeObserver(resampleCanvas.bind(this));
		canvasResizeObserver.observe(this.canvas);
		function resampleCanvas() {
			this.canvas.width = this.canvas.clientWidth;
			this.canvas.height = this.canvas.clientHeight;
		} */
	}

	static start_rendering() {
		if (this.context == undefined) throw new Error('context is null !');
		this.clear();
		this.#renderEntities();
		this.#reqAnim = requestAnimationFrame(this.start_rendering.bind(this));
	}

	static stop_rendering() {
		window.cancelAnimationFrame(this.#reqAnim);
		console.log('stopped rendering');
	}
	static clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	static #renderEntities() {
		if (this.#entities != undefined)
			this.#entities.forEach(entity => {
				if (entity.name == undefined) return;
				switch (entity.type) {
					case 'player':
						const avatar = Object.values(avatarsList).filter(
							avatar => avatar.owner == entity.name
						)[0];
						avatar.draw(
							this.context,
							{ x: this.w_ratio, y: this.h_ratio },
							entity.origin,
							entity.radius,
							-entity.angle,
							entity.maxHP,
							entity.HP
						);
						break;
					case 'bullet':
						const bullet = bulletsList[entity.name];
						const color = Object.values(avatarsList).filter(
							avatar => avatar.owner == entity.owner
						)[0].color;
						bullet.draw(this.context, entity.origin, entity.radius, color);
						break;
					case 'weapon':
						const weapon = weapons[entity.name];
						weapon.draw(this.context, entity.origin, entity.radius);
						break;
					case 'monster':
						const monster = monsters[entity.name];
						monster.draw(
							this.context,
							entity.origin,
							entity.radius,
							entity.maxHP,
							entity.HP
						);
					default:
						break;
				}
			});
	}

	static initConnectionToRenderer() {
		Connection.socket.on('getGameSize-from-server', gameSize => {
			const maxWidth = window.innerWidth;
			const maxHeight = window.innerHeight;

			let window_ratio = maxWidth / maxHeight;
			let game_ratio = gameSize.x / gameSize.y;

			if (game_ratio >= 1) {
				if (window_ratio >= game_ratio) {
					this.canvas.height = maxHeight;
					this.canvas.width = maxWidth / game_ratio;
					this.w_ratio = this.canvas.width / gameSize.x;
					this.h_ratio = maxHeight / gameSize.y;
				} else {
					this.canvas.width = maxWidth;
					this.canvas.height = maxHeight / game_ratio;
					this.w_ratio = maxWidth / gameSize.x;
					this.h_ratio = this.canvas.height / gameSize.y;
				}
			} else {
				if (window_ratio < game_ratio) {
					this.canvas.width = maxWidth;
					this.canvas.height = maxHeight / game_ratio;
					this.w_ratio = maxWidth / gameSize.x;
					this.h_ratio = this.canvas.height / gameSize.y;
				} else {
					this.canvas.height = maxHeight;
					this.canvas.width = maxWidth / game_ratio;
					this.w_ratio = this.canvas.width / gameSize.x;
					this.h_ratio = maxHeight / gameSize.y;
				}
			}
		});

		Connection.socket.on('update-entities', entities => {
			this.#entities = entities;
		});
	}
}
