import { Entity } from './Entity.js';
import gameArea from '../GameArea.js';

export class WeaponEntity extends Entity {
	constructor(x, y, weapon) {
		super({
			pos: { x: x, y: y },
			radius: 20,
		});
		this.type = 'weapon';
		this.weapon = Object.assign({}, weapon);
		this.hitbox.addLayer('weapon');
		this.name = weapon.texture;
		this.ttl = 500;
	}

	update() {
		this.hitbox.update();
		this.ttl -= 1;
		if (this.ttl <= 0) {
			this.die();
		}
	}

	die() {
		gameArea.entities.forEach((entity, index) => {
			if (entity === this) {
				gameArea.entities.splice(index, 1);
			}
		});
	}
}
