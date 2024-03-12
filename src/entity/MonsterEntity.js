import { LivingEntity } from './LivingEntity.js';
import { player } from '../main.js';

export class MonsterEntity extends LivingEntity {
	constructor(datas) {
		super(datas);
	}

	update() {
		super.update();
		this.is_moving();
		this.attack();
	}

	is_moving() {
		this.speedV.setX(player.pos.x - this.pos.x);
		this.speedV.setY(player.pos.y - this.pos.y);
		this.speedV.normalize();
	}

	attack() {
		if (
			this.pos.x >= player.pos.x - player.size.x &&
			this.pos.x <= player.pos.x + player.size.x &&
			this.pos.y >= player.pos.y - player.size.y &&
			this.pos.y <= player.pos.y + player.size.y
		) {
			player.hurt(1);
		}
	}
}
