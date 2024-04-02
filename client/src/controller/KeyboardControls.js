import Connection from '../Connection.js';

export class KeyBoardControls {
	static #keymap = { z: false, q: false, s: false, d: false, space: false };
	static proxyKeyMap;

	static startListening() {
		console.log('setting up keyboard controls');
		const handler = {
			set(target, prop, value) {
				target[prop] = value;
				Connection.socket.emit('keyboardEvent', target);
				return true;
			},
		};
		this.proxyKeyMap = new Proxy(this.#keymap, handler);

		window.addEventListener(
			'keydown',
			KeyBoardControls.keydownEventHandler.bind(this)
		);
		window.addEventListener(
			'keyup',
			KeyBoardControls.keyupEventHandler.bind(this)
		);
	}

	static stopListening() {
		this.proxyKeyMap = null;

		window.removeEventListener(
			'keydown',
			KeyBoardControls.keydownEventHandler.bind(this)
		);
		window.removeEventListener(
			'keyup',
			KeyBoardControls.keyupEventHandler.bind(this)
		);
	}

	static keydownEventHandler(event) {
		switch (event.key) {
			case 'z':
				if (!KeyBoardControls.proxyKeyMap.z)
					KeyBoardControls.proxyKeyMap.z = true;
				break;
			case 'q':
				if (!KeyBoardControls.proxyKeyMap.q)
					KeyBoardControls.proxyKeyMap.q = true;
				break;
			case 's':
				if (!KeyBoardControls.proxyKeyMap.s)
					KeyBoardControls.proxyKeyMap.s = true;
				break;
			case 'd':
				if (!KeyBoardControls.proxyKeyMap.d)
					KeyBoardControls.proxyKeyMap.d = true;
				break;
			case ' ':
				if (!KeyBoardControls.proxyKeyMap.space)
					KeyBoardControls.proxyKeyMap.space = true;
				break;
			default:
				break;
		}
	}

	static keyupEventHandler(event) {
		switch (event.key) {
			case 'z':
				if (KeyBoardControls.proxyKeyMap.z)
					KeyBoardControls.proxyKeyMap.z = false;
				break;
			case 'q':
				if (KeyBoardControls.proxyKeyMap.q)
					KeyBoardControls.proxyKeyMap.q = false;
				break;
			case 's':
				if (KeyBoardControls.proxyKeyMap.s)
					KeyBoardControls.proxyKeyMap.s = false;
				break;
			case 'd':
				if (KeyBoardControls.proxyKeyMap.d)
					KeyBoardControls.proxyKeyMap.d = false;
				break;
			case ' ':
				if (KeyBoardControls.proxyKeyMap.space)
					KeyBoardControls.proxyKeyMap.space = false;
				break;
			default:
				break;
		}
	}
}
