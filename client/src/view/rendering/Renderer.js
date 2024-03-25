import gameArea from '../../GameArea.js';
import { avatarsList } from './AvatarList.js';

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
		gameArea.entities.forEach(entity => entity.render(this.context));
		this.#renderPlayers(this.context);
		this.#reqAnim = requestAnimationFrame(this.start_rendering.bind(this));
	}

	static stop_rendering() {
		window.cancelAnimationFrame(this.#reqAnim);
		console.log('stopped rendering');
	}
	static clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	static #renderPlayers(ctx) {
		const players = gameArea.get_players();
		players.forEach(player => {
			if(player.nickname == null) return;
			const avatar = avatarsList.filter(avatar => avatar.selectedBy == player.nickname)[0];
			avatar.draw(ctx, player.pos, 1);
		});
	}
}
