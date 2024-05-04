import { Entity } from './Entity.js';
import { MonsterEntity } from './MonsterEntity.js';
import gameArea from '../GameArea.js';
import { randInt } from '../math/MathUtils.js';

export class SpawnerEntity extends Entity {
	nbMonsterPerSpawn = 4;

	constructor(datas) {
		super(datas);
		this.radius = 5;
		this.spawnCooldown = 0;
	}

	update() {
		this.hitbox.update();
		this.spawnCooldown -= 1;
		if (this.spawnCooldown <= 0) {
			this.spawn_monster();
			this.spawnCooldown = 100 + Math.random() * 400;
			this.nbMonsterPerSpawn =
				Math.floor(Math.random() * 2) + gameArea.difficulty.spawner.spawn_rate;
		}
	}

	spawn_monster() {
		for (let i = 0; i < this.nbMonsterPerSpawn; i++) {
			const randMult = randInt(1, 3);
			const datas = {
				pos: { x: this.pos.x, y: this.pos.y },
				radius: 20 * (randMult / 1.5),
				default_hp: 25 * randMult,
				speedMult: 400 - randMult,
				damages: 2,
				color: 'red',
				difficulty: gameArea.difficulty.monster,
				xp: 5,
			};
			const players = gameArea.get_players();
			const playerAgro = players[randInt(0, players.length - 1)];
			gameArea.add_entity(new MonsterEntity(datas, playerAgro));
		}
	}
}
