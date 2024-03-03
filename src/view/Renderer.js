import { myGameArea } from '../main.js';

export class Renderer {
	static canvas;
	static context;
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

	static render() {
		if (this.context == undefined) throw new Error('context is null !');
		this.clear();
		myGameArea.entities.forEach(entity => entity.render(this.context));
		requestAnimationFrame(this.render.bind(this));
	}

	static clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}
