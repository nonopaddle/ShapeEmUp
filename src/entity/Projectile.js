import { DynamicEntity } from './DynamicEntity.js';
import gameArea from '../GameArea.js';
import { Action } from './action/Action.js';

export class Projectile extends DynamicEntity {
	entityShot = [];

	constructor(datas) {
		super(datas);
		this.owner = datas.owner;
		this.penetration = datas.penetration;
		this.hitbox.addLayer('bullet');
		this.hitbox.addMask(
			'monster',
			new Action('monsterColision', (source, target) => {
				if (!source.entityShot.includes(target)) {
					target.hurt(source.damage);
					if (source.penetration != 0) {
						source.penetration -= 1;
						source.entityShot.push(target);
					} else {
						source.die();
					}
				}
			})
		);
		this.ttl = datas.ttl;
	}

	update() {
		this.ttl -= 1;
		if (this.ttl == 0) {
			this.die();
			return;
		}
		super.update();
	}

	die() {
		gameArea.entities.forEach((entity, index) => {
			if (entity === this) {
				gameArea.entities.splice(index, 1);
			}
		});
	}
}
