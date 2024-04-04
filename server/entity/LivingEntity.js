import gameArea from '../GameArea.js';
import { Vector2 } from '../math/Vector2.js';
import { DynamicEntity } from './DynamicEntity.js';

export class LivingEntity extends DynamicEntity {
	knockback = new Vector2(0, 0);
	knockback_friction = 200;
	constructor(datas) {
		super(datas);
		this.maxHP = datas.default_hp;
		this.HP = this.maxHP;
	}

	update() {
		this.knockback_decrease(gameArea.delta, gameArea.friction);
		this.apply_impulse_vector(this.knockback);
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

	knockback_decrease(delta, friction) {
		if (this.knockback.distance() > delta * this.knockback_friction) {
			this.knockback.substract(
				this.knockback.normalize().multiply(delta * this.knockback_friction)
			);
		} else {
			this.knockback = new Vector2(0, 0);
		}
	}
}
