import { DynamicEntity } from './DynamicEntity.js';
import gameArea from '../GameArea.js';
import { Action } from './action/Action.js';

export class ProjectileEntity extends DynamicEntity {
	entityShot = [];

	constructor(datas) {
		super(datas);
		this.damage = datas.damage;
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
	}

	update() {
		super.update();
		//this.is_hitting();
	}

	is_hitting() {
		gameArea.entities.forEach(entity => {
			if (
				entity != this &&
				entity != this.owner &&
				this.pos.x >= entity.pos.x - entity.size.x &&
				this.pos.x <= entity.pos.x + entity.size.x &&
				this.pos.y >= entity.pos.y - entity.size.y &&
				this.pos.y <= entity.pos.y + entity.size.y &&
				!this.entityShot.includes(entity)
			) {
				entity.hurt(this.damage);
				if (this.penetration != 0) {
					this.penetration -= 1;
					this.entityShot.push(entity);
				} else {
					this.die();
				}
			}
		});
	}

	die() {
		gameArea.entities.forEach((entity, index) => {
			if (entity === this) {
				gameArea.entities.splice(index, 1);
			}
		});
	}
}
