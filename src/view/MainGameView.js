import gameArea from '../GameArea.js';
import { Renderer } from './Renderer.js';
import { View } from './View.js';

export class MainGameView extends View {
	constructor(element) {
		super(element);
	}

	show() {
		super.show();
		gameArea.start_loop();
		Renderer.start_rendering();
	}

	hide() {
		super.hide();
		gameArea.stop_loop();
		Renderer.stop_rendering();
	}
}
