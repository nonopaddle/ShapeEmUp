import { Vector2 } from '../math/Vector2.js';
import { CircleHitbox } from './hitbox/CircleHitbox.js';

export class Entity {
	owner = { name: undefined };
	constructor(datas) {
		if (datas.radius <= 0)
			throw new Error('La valeur de radius est négative !');
		this.pos = new Vector2(datas.pos.x, datas.pos.y);
		this.radius = datas.radius;
		this.hitbox = new CircleHitbox(this, this.pos, this.radius);
		this.name = datas.name;
	}

	update() {
		this.hitbox.update();
	}

	move() {}
}
