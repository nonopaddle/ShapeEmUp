export class MouseControls {
	static canvas;

	static controls = {
		left: false,
		middle: false,
		right: false,
		current_coords: { x: 0, y: 0 },
	};

	static set_canvas(canvas) {
		this.canvas = canvas;
		this.canvas.addEventListener('contextmenu', e => e.preventDefault());
		this.canvas.addEventListener(
			'mousedown',
			this.button_pressed_event.bind(this)
		);
		this.canvas.addEventListener(
			'mouseup',
			this.button_released_event.bind(this)
		);
		this.canvas.addEventListener('mousemove', e => {
			this.controls.current_coords.x =
				e.clientX - this.canvas.getBoundingClientRect().left;
			this.controls.current_coords.y =
				e.clientY - this.canvas.getBoundingClientRect().top;
		});
	}

	static button_pressed_event(event) {
		switch (event.button) {
			case 0:
				this.controls.left = true;
				break;
			case 1:
				this.controls.middle = true;
				break;
			case 2:
				this.controls.right = true;
				break;
			default:
				break;
		}
	}

	static button_released_event(event) {
		switch (event.button) {
			case 0:
				this.controls.left = false;
				break;
			case 1:
				this.controls.middle = false;
				break;
			case 2:
				this.controls.right = false;
				break;
			default:
				break;
		}
	}
}
