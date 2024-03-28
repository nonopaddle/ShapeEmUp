import { Vector2 } from '../math/Vector2.js';
import { Entity } from './Entity.js';

export class DynamicEntity extends Entity {
	vectors = [];

	constructor(datas) {
		super(datas);
		this.velocity = new Vector2(0, 0);
		if (datas.speedMult) {
			this.speedMult = datas.speedMult;
		} else {
			this.speedMult = 1;
		}
	}

	update() {
		this.velocity = Vector2.sum(this.vectors);
		this.vectors = [];
		this.pos.add(this.velocity);
		super.update();
	}

	apply_impulse_vector(vector) {
		this.vectors.push(vector);
	}

	apply_vector_once(vector) {
		this.pos.add(vector);
	}
}
