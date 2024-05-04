import gameArea from '../GameArea.js';
import { lerp } from '../math/MathUtils.js';
import { Vector2 } from '../math/Vector2.js';
import { DynamicEntity } from './DynamicEntity.js';

export class LivingEntity extends DynamicEntity {
	knockback = Vector2.ZERO;
	knockback_friction = 0.15;
	constructor(datas) {
		super(datas);
		this.maxHP = datas.default_hp;
		this.HP = this.maxHP;
	}

	update() {
		this.apply_impulse_vector(this.knockback);
		this.knockback = Vector2.lerp(
			this.knockback,
			Vector2.ZERO,
			this.knockback_friction
		);
		super.update();
		if (this.HP <= 0) {
			this.die();
		}
	}

	hurt(damages) {
		this.HP -= damages;
		return this.HP <= 0;
	}

	die() {
		gameArea.entities.forEach((entity, index) => {
			if (entity === this) {
				gameArea.entities.splice(index, 1);
			}
		});
	}
}
