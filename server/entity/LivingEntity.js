import gameArea from '../GameArea.js';
import { DynamicEntity } from './DynamicEntity.js';

export class LivingEntity extends DynamicEntity {
	constructor(datas) {
		super(datas);
		this.maxHP = datas.default_hp;
		this.HP = this.maxHP;
	}

	update() {
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
