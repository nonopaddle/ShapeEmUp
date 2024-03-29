import { Entity } from './Entity.js';
import { Vector2 } from '../math/Vector2.js';
import gameArea from '../GameArea.js';

export class WeaponEntity extends Entity {
	static monsterNb = 0;
	static maxMonster = 25;

	constructor(x, y, weapon) {
		super({
			pos: { x: x, y: y },
			size: { x: 25, y: 25 },
			color: 'purple',
		});
		this.size = new Vector2(10, 10);
		this.weapon = weapon;
		this.hitbox.addLayer('weapon');
	}

	render(ctx) {
		ctx.fillStyle = this.color;
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2);
		ctx.lineTo(this.pos.x - this.size.x / 2, this.pos.y + this.size.y / 2);
		ctx.lineTo(this.pos.x, this.pos.y - this.size.y / 2);
		ctx.fill();
		/*
		ctx.fillRect(
			this.pos.x - this.size.x / 2,
			this.pos.y - this.size.y / 2,
			this.size.x,
			this.size.y
		);
		ctx.strokeRect(
			this.pos.x - this.size.x / 2,
			this.pos.y - this.size.y / 2,
			this.size.x,
			this.size.y
		);
        */
		this.hitbox.render(ctx);
	}

	update() {
		this.hitbox.update();
	}

	die() {
		gameArea.entities.forEach((entity, index) => {
			if (entity === this) {
				gameArea.entities.splice(index, 1);
			}
		});
	}
}
