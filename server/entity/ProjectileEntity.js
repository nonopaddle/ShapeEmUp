import { DynamicEntity } from './DynamicEntity.js';
import gameArea from '../GameArea.js';
import { Action } from './action/Action.js';
import { Vector2 } from '../math/Vector2.js';

export class ProjectileEntity extends DynamicEntity {
	entityShot = new Map();

	constructor(datas) {
		super(datas);
		this.type = 'bullet';
		this.owner = datas.owner;
		this.penetration = datas.penetration;
		this.trajectory = new Vector2(0, 0);
		this.cooldown = 1;
		this.hitbox.addLayer('bullet');
		this.hitbox.addMask(
			'monster',
			new Action('monsterColision', (source, target) => {
				if (
					source.entityShot[target] == undefined ||
					source.entityShot[target] <= 0
				) {
					if (target.hurt(source.damage)) {
						source.owner.xp += target.difficulty;
					}
					if (source.penetration != 0) {
						source.penetration -= 1;
						source.entityShot[target] = source.cooldown;
					} else {
						source.die();
					}
				}
			})
		);
		this.ttl = datas.ttl;
		this.name = datas.texture;
	}

	update() {
		this.ttl -= 1;
		if (this.ttl == 0) {
			this.die();
			return;
		}
		this.entityShot.forEach((value, key) => {
			this.entityShot[key] -= 1;
		});
		this.move();
		super.update();
	}

	setAngle(x, y) {
		this.trajectory.x = x;
		this.trajectory.y = y;
	}

	move() {
		this.apply_impulse_vector(this.trajectory);
	}

	die() {
		gameArea.entities.forEach((entity, index) => {
			if (entity === this) {
				gameArea.entities.splice(index, 1);
			}
		});
	}
}
