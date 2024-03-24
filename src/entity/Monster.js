import { LivingEntity } from './LivingEntity.js';
import { player } from '../main.js';
import { Action } from './action/Action.js';
import { Spawner } from './Spawner.js';

export class Monster extends LivingEntity {
	constructor(datas, pl) {
		super(datas);
		if (pl) {
			this.playerAggro = pl;
		} else {
			this.playerAggro = player;
		}
		this.maxHP = this.maxHP * this.difficulty;
		this.HP = this.maxHP;
		this.damage = this.damage * this.difficulty;
		this.speedMult = this.speedMult * this.difficulty;
		this.hitCooldown = 0;
		this.hitbox.addLayer('monster');
		this.hitbox.addMask(
			'player',
			new Action('hurtplayer', (source, target) => {
				if (source.hitCooldown <= 0) {
					target.hurt(source.damage);
					source.hitCooldown = 10;
				}
			})
		);
	}

	update() {
		super.update();
		this.is_moving();
		this.hitCooldown -= 1;
	}

	is_moving() {
		this.speedV.setX(this.playerAggro.pos.x - this.pos.x);
		this.speedV.setY(this.playerAggro.pos.y - this.pos.y);
		this.speedV.normalize();
	}

	die() {
		super.die();
		Spawner.monsterNb -= 1;
	}
}
