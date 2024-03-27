import { LivingEntity } from './LivingEntity.js';
//import { KeyBoardControls } from '../../client/src/controller/KeyboardControls.js';
//import { MouseControls } from '../../client/src/controller/MouseControls.js';
//import { ProjectileEntity } from './ProjectileEntity.js';
//import gameArea from '../GameArea.js';
import { Vector2 } from '../math/Vector2.js';

export class PlayerEntity extends LivingEntity {
	input = new Vector2(0, 0);
	constructor(datas, socket) {
		super(datas);
		this.player_speed = 10;
		this.cooldown = 0;

		this.shootDirection = new Vector2(0, 0);
		this.hitbox.addLayer('player');

		this.socket = socket;
		if (this.socket != undefined) {
			this.socket.on('disconnect', () => {
				console.log(`${this.nickname} s'est déconnecté(e)`);
				this.die();
			});

			this.socket.on('keyboardEvent', keyboardEvent => {
				this.input = new Vector2(0, 0);
				this.input.x = -(keyboardEvent.q - keyboardEvent.d);
				this.input.y = -(keyboardEvent.z - keyboardEvent.s);
			});
		}
	}

	update() {
		super.update();
		//this.is_shooting();
		this.cooldown -= 1;
		if (this.HP <= 0) {
			this.die();
		}
	}

	move() {
		this.speedV.setX(this.input.x);
		this.speedV.setY(this.input.y);
		this.speedV.normalize();
		this.speedV.multiplyScalar(10);
		this.pos.x += this.speedV.x;
		this.pos.y += this.speedV.y;
	}
	/*
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
	*/
}
