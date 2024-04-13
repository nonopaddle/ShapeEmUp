import gameArea from '../GameArea.js';
import { LivingEntity } from './LivingEntity.js';
import { SpawnerEntity } from './SpawnerEntity.js';
import { Action } from './action/Action.js';

export class MonsterEntity extends LivingEntity {
	static monsterNb = 0;
	type = 'monster';
	name = 'monster';
	knockback_speed = 20;

	constructor(datas, pl) {
		super(datas);
		// Set up the ID
		this.id = MonsterEntity.monsterNb;
		MonsterEntity.monsterNb += 1;

		// Set up the variables based on difficulty
		this.speedMult *= datas.difficulty.speed;
		this.damages = datas.damages * datas.difficulty.damages;
		this.xp = datas.xp * datas.difficulty.xp_bonus;
		console.log(this.xp);

		this.hitbox.addLayer('monster');
		this.hitbox.addMask(
			'player',
			new Action('hurtplayer', (source, target) => {
				if (target.hurt(source.damages)) {
					this.target_new_player();
				}
				target.knockback = source.pos
					.to(target.pos)
					.normalize()
					.multiply(this.knockback_speed);
			})
		);
		// Set up the target
		this.playerAggro = pl;
	}

	update() {
		this.move();
		super.update();
	}

	move() {
		if (this.playerAggro.HP <= 0) {
			if (gameArea.no_players_left()) return;
			this.target_new_player();
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

	target_new_player() {
		this.playerAggro =
			gameArea.get_players()[
				Math.floor(Math.random() * gameArea.get_players().length)
			];
	}
}
