import Connection from "../Connection.js";

export class MouseControls {
	static canvas;

	static #coords = { x: 0, y: 0 };
	static #controls = {
		left: false,
		middle: false,
		right: false,
	};

	static #controlsHandler = {
		set(target, prop, value) {
			target[prop] = value;
			Connection.socket.emit('MouseControlsEvent', target);
			return true;
		}
	}
	static #coordsHandler = {
		set(target, prop, value) {
			target[prop] = value;
			Connection.socket.emit('MouseCoordsEvent', target);
			return true;
		}
	}

	static proxyControls = new Proxy(this.#controls, this.#controlsHandler);
	static proxyCoords = new Proxy(this.#coords, this.#coordsHandler);
	

	static init(canvas) {
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
			this.proxyCoords.x =
				e.clientX - this.canvas.getBoundingClientRect().left;
			this.proxyCoords.y =
				e.clientY - this.canvas.getBoundingClientRect().top;
		});
	}

	static button_pressed_event(event) {
		switch (event.button) {
			case 0:
				this.proxyControls.left = true;
				break;
			case 1:
				this.proxyControls.middle = true;
				break;
			case 2:
				this.proxyControls.right = true;
				break;
			default:
				break;
		}
	}

	static button_released_event(event) {
		switch (event.button) {
			case 0:
				this.proxyControls.left = false;
				break;
			case 1:
				this.proxyControls.middle = false;
				break;
			case 2:
				this.proxyControls.right = false;
				break;
			default:
				break;
		}
	}
}
