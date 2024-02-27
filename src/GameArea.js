export class GameArea {
	entities = [];
	constructor() {}

	setCanvas(canvas) {
		this.canvas = canvas;
		this.context = this.canvas.getContext('2d');
		const canvasResizeObserver = new ResizeObserver(resampleCanvas.bind(this));
		canvasResizeObserver.observe(this.canvas);
		function resampleCanvas() {
			this.canvas.width = this.canvas.clientWidth;
			this.canvas.height = this.canvas.clientHeight;
		}
		this.render();
	}

	add_entity(entity) {
		this.entities.push(entity);
	}

	render() {
		this.clear();
		this.context.strokeRect(
			2,
			2,
			this.canvas.width - 2,
			this.canvas.height - 2
		);
		requestAnimationFrame(this.render.bind(this));
	}

	clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	tick_event() {}
}
