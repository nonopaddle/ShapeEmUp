import gameArea from '../GameArea.js';
import { Vector2 } from '../math/Vector2.js';
import { LivingEntity } from './LivingEntity.js';
import { SpawnerEntity } from './SpawnerEntity.js';
//import { player } from '../main.js';
import { Action } from './action/Action.js';

export class MonsterEntity extends LivingEntity {
	constructor(datas, pl) {
		super(datas);
		this.type = 'monster';
		this.playerAggro = pl;
		this.hitbox.addLayer('monster');
		this.hitbox.addMask(
			'player',
			new Action('hurtplayer', (source, target) => {
				target.hurt(1);
			})
		);
		this.name = 'monster';
	}

	update() {
		this.move();
		super.update();
	}

	move() {
		if (this.playerAggro == undefined) {
			if (gameArea.no_players_left()) return;
			this.playerAggro =
				gameArea.get_players()[
					Math.floor(Math.random() * gameArea.get_players().length)
				];
		}
		const direction = this.pos
			.to(this.playerAggro.pos)
			.normalize()
			.multiply(this.speedMult);
		this.apply_vector_once(direction);
	}

	die() {
		super.die();
		SpawnerEntity.monsterNb -= 1;
	}
}
