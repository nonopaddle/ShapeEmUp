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
		this.shootDirection = new Vector2(0, 0);
		this.hitbox.addLayer('player');
	}

	update() {
		super.update();
		this.is_shooting();
		this.cooldown -= 1;
		if (this.HP <= 0) {
			this.die();
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
		if (MouseControls.controls.left && this.cooldown <= 0) {
			this.shoot();
		}
	}

	updateDirection(x, y) {
		this.shootDirection.setX(x);
		this.shootDirection.setY(y);
	}

	shoot() {
		const bullet = new ProjectileEntity({
			pos: {
				x: this.pos.x,
				y: this.pos.y,
			},
			size: { x: 10, y: 10 },
			speedMult: 25,
			friendly: true,
			owner: this,
			damage: 2,
			penetration: -1,
			color: 'blue',
		});
		bullet.setSpeed(this.shootDirection.x, this.shootDirection.y);
		gameArea.entities.push(bullet);
		this.cooldown = 20;
		return bullet;
	}
}
