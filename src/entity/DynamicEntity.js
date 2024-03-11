import { Entity } from './Entity.js';

export class DynamicEntity extends Entity {
	speed = { x: 0, y: 0 };

	constructor(datas) {
		super(datas);
		this.speed.x = datas.speed.x;
		this.speed.y = datas.speed.y;
	}

	move() {
		this.pos.x += this.speed.x;
		this.pos.y += this.speed.y;
		/*
		if (this.pos.x <= 0)
			throw new Error(
				"L'entité dynamique ne peut pas se déplacer dans des x négatifs !"
			);
		if (this.pos.y <= 0)
			throw new Error(
				"L'entité dynamique ne peut pas se déplacer dans des y négatifs !"
			);
		*/
	}

	setSpeed(speedX, speedY) {
		this.speed.x = speedX;
		this.speed.y = speedY;
	}

	update() {
		super.update();
		if (this.speed.x != 0 || this.speed.y != 0) {
			this.move();
		}
	}
}
