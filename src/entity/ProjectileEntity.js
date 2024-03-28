import { DynamicEntity } from './DynamicEntity.js';
import gameArea from '../GameArea.js';
import { Action } from './action/Action.js';
import { Vector2 } from '../math/Vector2.js';

export class ProjectileEntity extends DynamicEntity {
	entityShot = [];

	constructor(datas) {
		super(datas);
		this.damage = datas.damage;
		this.owner = datas.owner;
		this.penetration = datas.penetration;
		this.angle = new Vector2(0, 0);
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
		this.move();
		super.update();
	}

	setAngle(x, y) {
		this.angle.x = x;
		this.angle.y = y;
	}

	move() {
		const v = new Vector2(this.angle.x, this.angle.y);
		this.apply_impulse_vector(v.limit_distance(this.speedMult / 5));
		this.speedMult = 1;
	}

	die() {
		gameArea.entities.forEach((entity, index) => {
			if (entity === this) {
				gameArea.entities.splice(index, 1);
			}
		});
	}
}
