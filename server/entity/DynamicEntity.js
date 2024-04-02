import { Vector2 } from '../math/Vector2.js';
import { Action } from './action/Action.js';
import { Entity } from './Entity.js';

export class DynamicEntity extends Entity {
	velocity = new Vector2(0, 0);
	vectors = [];
	speedMult = 1;
	angle = 0;

	constructor(datas) {
		super(datas);
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
		if (this.velocity.distance() != 0) this.angle = -this.velocity.angle();
		super.update();
	}

	apply_impulse_vector(vector) {
		this.vectors.push(vector);
	}

	apply_vector_once(vector) {
		this.pos.add(vector);
	}
}
