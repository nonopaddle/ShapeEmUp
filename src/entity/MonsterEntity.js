import { LivingEntity } from './LivingEntity.js';
import { player } from '../main.js';
import { Action } from './action/Action.js';

export class MonsterEntity extends LivingEntity {
	constructor(datas, pl) {
		super(datas);
		if (pl) {
			this.playerAggro = pl;
		} else {
			this.playerAggro = player;
		}
		this.hitbox.addLayer('monster');
		this.hitbox.addMask(
			'player',
			new Action('hurtplayer', (source, target) => {
				target.hurt(1);
			})
		);
	}

	update() {
		super.update();
		this.is_moving();
		//this.attack();
	}

	is_moving() {
		this.speedV.setX(this.playerAggro.pos.x - this.pos.x);
		this.speedV.setY(this.playerAggro.pos.y - this.pos.y);
		this.speedV.normalize();
	}

	attack() {
		if (
			this.pos.x >= this.playerAggro.pos.x - this.playerAggro.size.x &&
			this.pos.x <= this.playerAggro.pos.x + this.playerAggro.size.x &&
			this.pos.y >= this.playerAggro.pos.y - this.playerAggro.size.y &&
			this.pos.y <= this.playerAggro.pos.y + this.playerAggro.size.y
		) {
			this.playerAggro.hurt(1);
		}
	}
}
