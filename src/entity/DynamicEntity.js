import { Entity } from './entity/Entity.js';

export class DynamicEntity extends Entity {
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.speedX = 0;
        this.speedY = 0;
    }

    move() {
        this.pos.x += this.speedX;
        this.pos.y += this.speedY;
		if (this.pos.x <= 0) throw new Error('L\'entité dynamique ne peut pas se déplacer dans des x négatifs !');
		if (this.pos.y <= 0) throw new Error('L\'entité dynamique ne peut pas se déplacer dans des y négatifs !');
    }

    setSpeed(speedX, speedY) {
        this.speedX = speedX;
        this.speedY = speedY;
    }
}