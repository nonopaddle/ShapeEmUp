import { LivingEntity } from './LivingEntity.js';
import { KeyBoardControls } from '../controller/KeyboardControls.js';
import { MouseControls } from '../controller/MouseControls.js';
import gameArea from '../GameArea.js';
import { Vector2 } from '../math/Vector2.js';
import { Action } from './action/Action.js';
import { weaponType } from '../weapons/WeaponType.js';
import { weaponList } from '../weapons/WeaponList.js';
import { Weapon } from '../weapons/Weapon.js';

export class Player extends LivingEntity {
	weapons = {
		active1: weaponList.null,
		active2: weaponList.null,
		passive: weaponList.null,
		ultimate: weaponList.null,
	};

	constructor(datas) {
		super(datas);
		this.player_speed = 10;
		this.cooldown = 0;
		this.xp = 0;
		this.xpToLevelUp = 10;
		this.level = 1;
		this.shootDirection = new Vector2(0, 0);
		this.hitbox.addLayer('player');
		this.hitbox.addMask(
			'weapon',
			new Action('pickWeapon', (source, target) => {
				if (target.weapon.type == weaponType.active) {
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
					target.weapon.owner = source;
					source.weapons.passive = new Weapon(target.weapon);
					target.die();
				} else if (
					source.weapons.ultimate == weaponList.null &&
					target.weapon.type == weaponType.ultimate
				) {
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
		if (this.xp >= this.xpToLevelUp) {
			this.level += 1;
			this.xp -= this.xpToLevelUp;
			this.xpToLevelUp += 10;
		}
	}

	move() {
		const xSpeed = -(KeyBoardControls.keymap.q - KeyBoardControls.keymap.d);
		const ySpeed = -(KeyBoardControls.keymap.z - KeyBoardControls.keymap.s);
		this.speedV.setX(xSpeed);
		this.speedV.setY(ySpeed);
		this.speedV.normalize();
		this.speedV.multiplyScalar(10);
		this.pos.x += this.speedV.x;
		this.pos.y += this.speedV.y;
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
		this.shootDirection.setX(x);
		this.shootDirection.setY(y);
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
}
