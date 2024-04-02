import { Entity } from './Entity.js';
import { MonsterEntity } from './MonsterEntity.js';
import gameArea from '../GameArea.js';
import { randInt } from '../math/MathUtils.js';
import { difficulty } from '../Difficulty.js';

export class SpawnerEntity extends Entity {
	static monsterNb = 0;
	static maxMonster = 25;

	constructor(datas) {
		super(datas);
		this.radius = 5;
		this.spawnCooldown = randInt(75, 200);
	}

	render(ctx) {
		this.hitbox.render(ctx);
	}

	update() {
		this.hitbox.update();
		if (SpawnerEntity.monsterNb < SpawnerEntity.maxMonster) {
			this.spawnCooldown -= 1;
			if (this.spawnCooldown <= 0) {
				this.spawn_monster();
				this.spawnCooldown = randInt(75, 200);
			}
		}
	}

	spawn_monster() {
		const randMult = randInt(1, 3);
		const datas = {
			pos: { x: this.pos.x, y: this.pos.y },
			radius: 20 * (randMult / 1.5),
			default_hp: 25 * randMult,
			speedMult: 10 - randMult,
			damage: 5,
			color: 'red',
			difficulty: difficulty.normal,
		};
		const players = gameArea.get_players();
		const playerAgro = players[randInt(0, players.length - 1)];
		gameArea.add_entity(new MonsterEntity(datas, playerAgro));
		SpawnerEntity.monsterNb += 1;
	}
}
