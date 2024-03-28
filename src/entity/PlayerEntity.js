import { LivingEntity } from './LivingEntity.js';
import { KeyBoardControls } from '../controller/KeyboardControls.js';
import { MouseControls } from '../controller/MouseControls.js';
import gameArea from '../GameArea.js';
import { Vector2 } from '../math/Vector2.js';
import { Action } from './action/Action.js';
import { weaponType } from '../weapons/WeaponType.js';
import { weaponList } from '../weapons/WeaponList.js';
import { Weapon } from '../weapons/Weapon.js';

export class PlayerEntity extends LivingEntity {
	weapons = {
		active1: weaponList.null,
		active2: weaponList.null,
		passive: weaponList.null,
		ultimate: weaponList.null,
	};
	accel = 100;

	constructor(datas) {
		super(datas);
		this.player_speed = 10;
		this.move_vector = new Vector2(0, 0);
		this.cooldown = 0;
		this.xp = 0;
		this.xpToLevelUp = 10;
		this.level = 1;
		this.nickname = datas.nickname;

		this.shootDirection = new Vector2(0, 0);
		this.hitbox.addLayer('player');
		this.hitbox.addMask(
			'weapon',
			new Action('pickWeapon', (source, target) => {
				if (target.weapon.type == weaponType.active) {
					console.log('pick up active');
					if (source.weapons.active1 == weaponList.null) {
						target.weapon.owner = source;
						source.weapons.active1 = new Weapon(target.weapon);
						target.die();
					} else if (source.weapons.active2 == weaponList.null) {
						target.weapon.owner = source;
						source.weapons.active2 = new Weapon(target.weapon);
						target.die();
					}
				} else if (
					source.weapons.passive == weaponList.null &&
					target.weapon.type == weaponType.passive
				) {
					console.log('pick up passive');
					target.weapon.owner = source;
					source.weapons.passive = new Weapon(target.weapon);
					target.die();
				} else if (
					source.weapons.ultimate == weaponList.null &&
					target.weapon.type == weaponType.ultimate
				) {
					console.log('pick up ultimate');
					target.weapon.owner = source;
					source.weapons.ultimate = new Weapon(target.weapon);
					target.die();
				}
			})
		);
	}

	update() {
		super.update();
		Object.values(this.weapons).forEach(element => {
			if (element != weaponList.null) {
				element.update();
			}
		});
		this.is_shooting();
		this.shoot_passive();
		this.cooldown -= 1;
		this.move(gameArea.delta, gameArea.friction);
		this.apply_impulse_vector(this.move_vector);
		super.update();
		if (this.xp >= this.xpToLevelUp) {
			this.level += 1;
			this.xp -= this.xpToLevelUp;
			this.xpToLevelUp += 10;
		}
	}

	#input_direction() {
		const i = new Vector2(0, 0);
		if (KeyBoardControls.keymap.z && this.pos.y - this.size.y / 2 > 0) i.y -= 1;
		if (KeyBoardControls.keymap.s && this.pos.y + this.size.y / 2 < 1080)
			i.y += 1;
		if (KeyBoardControls.keymap.q && this.pos.x - this.size.x / 2 > 0) i.x -= 1;
		if (KeyBoardControls.keymap.d && this.pos.x + this.size.x / 2 < 1920)
			i.x += 1;
		return i.normalize();
	}

	move(delta, friction) {
		const direction = this.#input_direction();
		if (direction.distance() == 0) {
			if (this.move_vector.distance() > delta * friction) {
				this.move_vector.substract(
					this.move_vector.normalize().multiply(delta * friction)
				);
			} else {
				this.move_vector = new Vector2(0, 0);
			}
		} else {
			this.move_vector.add(direction.multiply(this.accel * delta));
			this.move_vector = this.move_vector.limit_distance(
				this.speedMult * this.player_speed
			);
		}
	}

	is_shooting() {
		this.updateDirection(
			-(this.pos.x - MouseControls.controls.current_coords.x),
			-(this.pos.y - MouseControls.controls.current_coords.y)
		);
		if (this.cooldown <= 0) {
			if (MouseControls.controls.left) {
				this.shoot(0);
			} else if (MouseControls.controls.right) {
				this.shoot(1);
			} else if (MouseControls.controls.middle) {
				this.shoot(2);
			}
		}
	}

	updateDirection(x, y) {
		this.shootDirection.x = x;
		this.shootDirection.y = y;
		this.shootDirection = this.shootDirection.normalize();
	}

	shoot(bool) {
		const w = [weaponList.null, weaponList.null, weaponList.null];
		if (bool == 0 && this.weapons.active1 != weaponList.null) {
			w[0] = this.weapons.active1;
		}
		if (bool == 1 && this.weapons.active2 != weaponList.null) {
			w[1] = this.weapons.active2;
		}
		if (bool == 2 && this.weapons.ultimate != weaponList.null) {
			w[2] = this.weapons.ultimate;
		}
		w.forEach(weapon => {
			if (weapon != weaponList.null) {
				weapon.bullet.pos = this.pos;
				const bullet = weapon.shoot();
				if (bullet != undefined) {
					bullet.setSpeed(this.shootDirection.x, this.shootDirection.y);
					gameArea.entities.push(bullet);
				}
			}
		});
	}

	shoot_passive() {
		if (this.weapons.passive != weaponList.null) {
			this.weapons.passive.bullet.pos = this.pos;
			const bullet = this.weapons.passive.shoot();
			if (bullet != undefined) {
				bullet.setSpeed(this.shootDirection.x, this.shootDirection.y);
				gameArea.entities.push(bullet);
			}
		}
	}

	render(ctx) {
		super.render(ctx);
		ctx.fillText(this.level, this.pos.x - 5, this.pos.y);
		ctx.fillText(this.xp, this.pos.x - 5, this.pos.y + 20);
	}

	is_player() {
		return true;
	}
}
