import { LivingEntity } from './LivingEntity.js';
//import { player } from '../main.js';
import { Action } from './action/Action.js';

export class MonsterEntity extends LivingEntity {
	constructor(datas, pl) {
		super(datas);
		this.type = 'monster';
		this.playerAggro = pl;
		this.knockback_speed = 50;
		this.hitbox.addLayer('monster');
		this.hitbox.addMask(
			'player',
			new Action('hurtplayer', (source, target) => {
				console.log('collision');
				target.hurt(1);
				target.knockback = source.pos
					.to(target.pos)
					.normalize()
					.multiply(this.knockback_speed);
			})
		);
		this.name = 'monster';
	}

	update() {
		this.move();
		super.update();
	}

	move() {
		if (this.playerAggro == undefined) return;
		const direction = this.pos
			.to(this.playerAggro.pos)
			.normalize()
			.multiply(this.speedMult);
		this.apply_vector_once(direction);
	}
}
