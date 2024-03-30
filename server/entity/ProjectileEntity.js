import { DynamicEntity } from './DynamicEntity.js';
import gameArea from '../GameArea.js';
import { Action } from './action/Action.js';
import { Vector2 } from '../math/Vector2.js';

export class ProjectileEntity extends DynamicEntity {
	entityShot = new Map();

	constructor(datas) {
		super(datas);
		this.owner = datas.owner;
		this.penetration = datas.penetration;
		this.angle = new Vector2(0, 0);
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
		if ('renderTexture' in datas) this.renderTexture = datas.renderTexture;
		else this.renderTexture = true;
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
		this.angle.x = x;
		this.angle.y = y;
	}

	move() {
		const v = new Vector2(this.angle.x, this.angle.y);
		this.apply_impulse_vector(v.multiply(this.speedMult));
	}

	die() {
		gameArea.entities.forEach((entity, index) => {
			if (entity === this) {
				gameArea.entities.splice(index, 1);
			}
		});
	}

	render(ctx) {
		if (this.renderTexture) {
			super.render(ctx);
		} else {
			this.hitbox.render(ctx);
		}
	}
}
