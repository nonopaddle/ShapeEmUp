import { LivingEntity } from "./LivingEntity.js";
import { KeyBoardControls } from "../controller/KeyboardControls.js";
import { MouseControls } from "../controller/MouseControls.js";
import { DynamicEntity } from "./DynamicEntity.js";
import gameArea from "../GameArea.js";

export class PlayerEntity extends LivingEntity {
	constructor(datas) {
		super(datas);
		this.player_speed = 10;
		this.cooldown = 0;
	}

	update() {
		super.update();
		this.is_moving();
		this.is_shooting();
		this.cooldown -= 1;
	}

	is_moving() {
		if (KeyBoardControls.keymap.z) {
			this.speedV.setY(-1);
		} else if (KeyBoardControls.keymap.s) {
			this.speedV.setY(1);
		} else {
			this.speedV.setY(0);
		}
		if (KeyBoardControls.keymap.q) {
			this.speedV.setX(-1);
		} else if (KeyBoardControls.keymap.d) {
			this.speedV.setX(1);
		} else {
			this.speedV.setX(0);
		}
		this.speedV.normalize();
		this.pos.x += this.speedV.x;
		this.pos.y += this.speedV.y;
	}

	is_shooting() {
		if (MouseControls.controls.left && this.cooldown <= 0) {
			const bullet = new DynamicEntity({
				pos: {
					x: this.pos.x,
					y: this.pos.y,
				},
				size: { x: 10, y: 10 },
				color: 'blue',
			});
			bullet.setSpeed(
				-(this.pos.x  - MouseControls.controls.current_coords.x),
				-(this.pos.y  - MouseControls.controls.current_coords.y)
				);
			gameArea.entities.push(bullet);
			this.cooldown = 20;
		}
	}
}
