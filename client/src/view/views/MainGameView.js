import { Renderer } from '../rendering/Renderer.js';
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
		Renderer.stop_rendering();
	}
}
