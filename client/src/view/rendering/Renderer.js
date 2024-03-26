import Connection from '../../Connection.js';
import { avatarsList } from './textures.js';

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
		this.clear();
		this.#renderEntities(this.context);
		this.#reqAnim = requestAnimationFrame(this.start_rendering.bind(this));
	}

	static stop_rendering() {
		window.cancelAnimationFrame(this.#reqAnim);
		console.log('stopped rendering');
	}
	static clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	static #renderEntities(ctx) {
		Connection.socket.emit('getEntities-from-client');

		Connection.socket.on('getEntities-from-server', entities => {
			console.log(entities);
			entities.forEach(entity => {
				if (entity.name == undefined) return;
				const avatar = avatarsList.filter(
					avatar => avatar.owner == entity.name
				)[0];
				if (avatar != null) avatar.draw(ctx, entity.origin, 1);
			});
		});
	}
}
