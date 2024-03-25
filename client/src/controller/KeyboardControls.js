export class KeyBoardControls {
	static keymap = { z: false, q: false, s: false, d: false, space: false };

	static {
		window.addEventListener(
			'keydown',
			KeyBoardControls.keydownEventHandler.bind(this)
		);
		window.addEventListener(
			'keyup',
			KeyBoardControls.keyupEventHandler.bind(this)
		);
	}

	static keydownEventHandler(event) {
		switch (event.key) {
			case 'z':
				KeyBoardControls.keymap.z = true;
				break;
			case 'q':
				KeyBoardControls.keymap.q = true;
				break;
			case 's':
				KeyBoardControls.keymap.s = true;
				break;
			case 'd':
				KeyBoardControls.keymap.d = true;
				break;
			case ' ':
				KeyBoardControls.keymap.space = true;
				break;
			default:
				break;
		}
	}

	static keyupEventHandler(event) {
		switch (event.key) {
			case 'z':
				KeyBoardControls.keymap.z = false;
				break;
			case 'q':
				KeyBoardControls.keymap.q = false;
				break;
			case 's':
				KeyBoardControls.keymap.s = false;
				break;
			case 'd':
				KeyBoardControls.keymap.d = false;
				break;
			case ' ':
				KeyBoardControls.keymap.space = false;
				break;
			default:
				break;
		}
	}
}
