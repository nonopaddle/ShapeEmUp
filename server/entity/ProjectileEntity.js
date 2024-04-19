import { DynamicEntity } from './DynamicEntity.js';
import gameArea from '../GameArea.js';
import { Action } from './action/Action.js';
import { Vector2 } from '../math/Vector2.js';
import { randomWeapon } from '../weapons/WeaponList.js';
import { WeaponEntity } from './WeaponEntity.js';
import { lerp } from '../math/MathUtils.js';

export class ProjectileEntity extends DynamicEntity {
	memory = new Map();
	type = 'bullet';
	trajectory = new Vector2(0, 0);

	constructor(datas) {
		super(datas);
		this.owner = datas.owner;
		this.damages = datas.damages;
		this.penetration = datas.penetration;
		this.knockback_speed = datas.knockback_speed;
		this.cooldown = 1;
		this.hitbox.addLayer('bullet');
		this.hitbox.addMask(
			'monster',
			new Action('monsterColision', (source, target) => {
				if (
					source.memory[target.id] == undefined ||
					source.memory[target.id] <= 0
				) {
					if (source.owner != undefined)
						target.knockback = source.owner.pos
							.to(target.pos)
							.normalize()
							.multiply(this.knockback_speed);
					if (target.hurt(source.damages)) {
						gameArea.add_score(source.owner.name, target.xp);
						source.owner.stats.xp.amount += target.xp;
						if (
							Math.random() * 100 <
							4 - (gameArea.difficulty.weapons.drop_rate - 1)
						) {
							gameArea.add_entity(
								new WeaponEntity(target.pos.x, target.pos.y, randomWeapon())
							);
						}
					}
					if (source.penetration < 0) return;
					if (source.penetration > 0) {
						source.penetration -= 1;
						source.memory[target.id] = source.cooldown;
						return;
					}
					source.die();
				}
			})
		);
		this.ttl = datas.ttl;
		this.name = datas.texture;
	}

	update() {
		if (this.ttl > 0) {
			this.ttl -= 1;
			if (this.ttl == 0) {
				this.die();
				return;
			}
		}
		this.memory.forEach((value, key) => {
			this.memory[key] -= 1;
		});
		this.move();
		super.update();
	}

	setAngle(x, y) {
		this.trajectory.x = x;
		this.trajectory.y = y;
	}

	move() {
		if (this.speedMult == -1) {
			this.pos.x = lerp(this.pos.x, this.owner.pos.x, 0.5);
			this.pos.y = lerp(this.pos.y, this.owner.pos.y, 0.5);
		} else {
			this.apply_impulse_vector(this.trajectory);
		}
	}

	die() {
		gameArea.entities.forEach((entity, index) => {
			if (entity === this) {
				gameArea.entities.splice(index, 1);
			}
		});
	}
}
