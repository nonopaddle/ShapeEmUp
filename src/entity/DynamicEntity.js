import { Entity } from './Entity.js';

export class DynamicEntity extends Entity {
	constructor(x, y, width, height, color) {
		super(x, y, width, height, color);
		this.speed = { x: x, y: y };
	}

	move() {
		this.pos.x += this.speed.x;
		this.pos.y += this.speed.y;
		if (this.pos.x <= 0)
			throw new Error(
				"L'entité dynamique ne peut pas se déplacer dans des x négatifs !"
			);
		if (this.pos.y <= 0)
			throw new Error(
				"L'entité dynamique ne peut pas se déplacer dans des y négatifs !"
			);
	}

	setSpeed(speedX, speedY) {
		this.speed.x = speedX;
		this.speed.y = speedY;
	}
}
