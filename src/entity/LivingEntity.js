import { DynamicEntity } from './DynamicEntity.js';
import { gameArea } from '../GameArea.js';

export class LivingEntity extends DynamicEntity {
	constructor(datas) {
		super(datas);
		this.HP = datas.default_hp;
	}

	update() {
		super.update();
		if (this.HP <= 0) {
			this.die();
		}
	}

	hurt(damages) {
		this.HP -= damages;
	}

	die() {
		gameArea.entities.forEach((entity, index) => {
			if (entity === this) {
				gameArea.entities.splice(index, 1);
			}
		});
	}
}
