import Connection from '../../Connection.js';
import { avatarsList, bulletsList, monsters, weapons } from './textures.js';

export class Renderer {
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
		this.#renderEntities();
		this.#renderTime();
		this.#reqAnim = requestAnimationFrame(this.start_rendering.bind(this));
	}

	static stop_rendering() {
		window.cancelAnimationFrame(this.#reqAnim);
	}

	static clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	static #renderEntities() {
		Connection.socket.emit('getEntities-from-client');
	}

	static #renderTime() {
		Connection.socket.emit('getTime-from-client');
	}

	static initConnectionToRenderer() {
		Connection.socket.on('getEntities-from-server', entities => {
			this.clear();
			entities.forEach(entity => {
				if (entity.name == undefined) return;
				switch (entity.type) {
					case 'player':
						const avatar = Object.values(avatarsList).filter(
							avatar => avatar.owner == entity.name
						)[0];
						avatar.draw(
							this.context,
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
		});
		Connection.socket.on('getTime-from-server', time => {
			this.context.font = '30px Arial';
			this.context.fillStyle = 'white';
			const sec = Math.floor(time) % 60;
			this.context.fillText(
				`${Math.floor(Math.floor(time) / 60)}:${sec < 10 ? `0${sec}` : sec}`,
				500,
				100
			);
		});
	}
}
