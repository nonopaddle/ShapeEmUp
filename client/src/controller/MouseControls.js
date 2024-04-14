import Connection from '../Connection.js';
import { Renderer } from '../view/rendering/Renderer.js';

export class MouseControls {
	static canvas;

	static delta = 60;

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
		},
	};
	static #coordsHandler = {
		set(target, prop, value) {
			target[prop] = value;
			Connection.socket.emit('MouseCoordsEvent', {
				x: target.x + Renderer.cameraOffset.x,
				y: target.y + Renderer.cameraOffset.y,
			});
			return true;
		},
	};

	static proxyControls = new Proxy(this.#controls, this.#controlsHandler);
	static proxyCoords = new Proxy(this.#coords, this.#coordsHandler);

	static init(canvas) {
		this.canvas = canvas;
		this.canvas.addEventListener('contextmenu', e => e.preventDefault());
		this.canvas.addEventListener(
			'mousedown',
			this.#button_pressed_event.bind(this)
		);
		this.canvas.addEventListener(
			'mouseup',
			this.#button_released_event.bind(this)
		);

		this.canvas.addEventListener('mousemove', e => {
			if (Renderer.cameraOffset == undefined) return;
			const rect = this.canvas.getBoundingClientRect();
			this.proxyCoords.x = e.clientX - rect.left - this.canvas.width / 2;
			this.proxyCoords.y = e.clientY - rect.top - this.canvas.height / 2;
		});

		let lastScroll = 0;
		window.addEventListener(
			'wheel',
			e => {
				if (e.deltaY < 0) {
					Renderer.incrementZoom();
				} else {
					Renderer.decrementZoom();
				}
			},
			false
		);
	}

	static #button_pressed_event(event) {
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

	static #button_released_event(event) {
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
