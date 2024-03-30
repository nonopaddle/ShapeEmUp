import Connection from '../../Connection.js';
import { avatarsList, npcList } from './textures.js';

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
		Connection.socket.emit('getEntities-from-client');
	}

	static initConnectionToRenderer() {
		Connection.socket.on('getEntities-from-server', entities => {
			this.clear();
			entities.forEach(entity => {
				if (entity.name == undefined) return;
				if (entity.is_player) {
					const avatar = avatarsList.filter(
						avatar => avatar.owner == entity.name
					)[0];
					avatar.draw(this.context, entity.origin, entity.radius);
				} else {
					const npc = npcList.filter(npc => npc.owner == entity.name)[0];
					npc.draw(this.context, entity.origin, entity.radius);
				}
			});
		});
	}
}
