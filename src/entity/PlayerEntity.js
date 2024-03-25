import { LivingEntity } from './LivingEntity.js';
import { KeyBoardControls } from '../controller/KeyboardControls.js';
import { MouseControls } from '../controller/MouseControls.js';
import { ProjectileEntity } from './ProjectileEntity.js';
import gameArea from '../GameArea.js';
import { Vector2 } from '../math/Vector2.js';

export class PlayerEntity extends LivingEntity {
	constructor(datas) {
		super(datas);
		this.player_speed = 10;
		this.cooldown = 0;
		this.nickname = datas.nickname;

		this.shootDirection = new Vector2(0, 0);
		this.hitbox.addLayer('player');
	}

	update() {
		super.update();
		this.is_shooting();
		this.cooldown -= 1;
		this.move(gameArea.delta, gameArea.friction);
	}

	#input_direction() {
		const i = new Vector2(0, 0);
		if (KeyBoardControls.keymap.z) i.y -= 1;
		if (KeyBoardControls.keymap.s) i.y += 1;
		if (KeyBoardControls.keymap.q) i.x -= 1;
		if (KeyBoardControls.keymap.d) i.x += 1;
		i.normalize();
		return i;
	}

	move(delta, friction) {
		const direction = this.#input_direction();
		if (direction.length() == 0) {
			if (this.speedV.length() > delta * friction) {
				this.speedV.sub(this.speedV.multiplyScalar(delta * friction));
			} else {
				this.speedV.set(0, 0);
			}
		} else {
			const i = direction.multiplyScalar(
				this.speedV.length() + this.player_speed
			);
			i.limit_distance(5 * this.speedMult);
			this.pos.add(i);
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
				damage: 5,
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
		const bullet = new ProjectileEntity(data);
		bullet.setSpeed(this.shootDirection.x, this.shootDirection.y);
		gameArea.entities.push(bullet);
		return bullet;
	}
}
