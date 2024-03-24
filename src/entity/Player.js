import { LivingEntity } from './LivingEntity.js';
import { KeyBoardControls } from '../controller/KeyboardControls.js';
import { MouseControls } from '../controller/MouseControls.js';
import { Projectile } from './Projectile.js';
import gameArea from '../GameArea.js';
import { Vector2 } from '../math/Vector2.js';
import { Action } from './action/Action.js';
import { weaponType } from '../WeaponType.js';

export class Player extends LivingEntity {
	weapons = { active1: null, active2: null, ultimate: null, passive: null };
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
				if (target.type == weaponType.active) {
					if (source.weapons.active1 == null) {
						source.weapons.active1 = target;
						target.die();
					} else if (source.weapons.active2 == null) {
						source.weapons.active2 = target;
						target.die();
					}
				} else if (target.type == weaponType.ultimate) {
					source.weapons.ultimate = target;
					target.die();
				} else if (target.type == weaponType.passive) {
					source.weapons.passive = target;
					target.die();
				}
			})
		);
	}

	update() {
		super.update();
		this.is_shooting();
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
		let data;
		if (bool == 0) {
			data = {
				pos: {
					x: this.pos.x,
					y: this.pos.y,
				},
				size: { x: 10, y: 10 },
				speedMult: 25,
				friendly: true,
				owner: this,
				damage: 10,
				penetration: 1,
				color: 'blue',
				ttl: 2000,
			};
			this.cooldown = 20;
		} else if (bool == 1) {
			data = {
				pos: {
					x: this.pos.x,
					y: this.pos.y,
				},
				size: { x: 25, y: 25 },
				speedMult: 10,
				friendly: true,
				owner: this,
				damage: 25,
				penetration: 0,
				color: 'orange',
				ttl: 30,
			};
			this.cooldown = 50;
		} else if (bool == 2) {
			data = {
				pos: {
					x: this.pos.x,
					y: this.pos.y,
				},
				size: { x: 30, y: 10 },
				speedMult: 50,
				friendly: true,
				owner: this,
				damage: 1,
				penetration: -1,
				color: 'green',
				ttl: 30,
			};
			this.cooldown = 2;
		}
		const bullet = new Projectile(data);
		bullet.setSpeed(this.shootDirection.x, this.shootDirection.y);
		gameArea.entities.push(bullet);
		return bullet;
	}

	render(ctx) {
		super.render(ctx);
		ctx.fillText(this.level, this.pos.x - 5, this.pos.y);
		ctx.fillText(this.xp, this.pos.x - 5, this.pos.y + 20);
	}
}
