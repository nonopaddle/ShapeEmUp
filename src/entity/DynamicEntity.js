import { Entity } from './Entity.js';
import { Vector2 } from '../math/Vector2.js';

export class DynamicEntity extends Entity {
	constructor(datas) {
		super(datas);
		this.speedV = new Vector2(0, 0);
		this.damage = datas.damage;
		if (datas.speedMult) {
			this.speedMult = datas.speedMult;
		} else {
			this.speedMult = 1;
		}
	}

	update() {
		super.update();
		this.move();
	}

	move() {
		this.speedV.normalize();
		this.speedV.multiplyScalar(this.speedMult);
		this.pos.x += this.speedV.x;
		this.pos.y += this.speedV.y;
		/*
		if (this.pos.x <= 0) {
			throw new Error(
				"L'entité dynamique ne peut pas se déplacer dans des x négatifs !"
			);
		}
		if (this.pos.y <= 0) {
			throw new Error(
				"L'entité dynamique ne peut pas se déplacer dans des y négatifs !"
			);
		}
		*/
	}

	setSpeed(speedX, speedY) {
		this.speedV.set(speedX, speedY);
	}
}
