import { DynamicEntity } from './DynamicEntity.js';
import GameArea from '../GameArea.js';

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
		GameArea.entities.forEach((entity, index) => {
			if (entity === this) {
				GameArea.entities.splice(index, 1);
			}
		});
	}
}
