import { Vector2 } from '../math/Vector2.js';
import { Action } from './action/Action.js';
import { Entity } from './Entity.js';

export class DynamicEntity extends Entity {
	vectors = [];

	constructor(datas) {
		super(datas);
		this.velocity = new Vector2(0, 0);
		this.speedMult = 1;
		if (datas.speedMult) this.speedMult = datas.speedMult;
		this.damage = datas.damage;
		this.hitbox.addLayer('dynamicEntity');
		this.hitbox.addMask(
			'dynamicEntity',
			new Action('pickWeapon', (source, target) => {
				if (source !== target) {
					//
				}
			})
		);
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
