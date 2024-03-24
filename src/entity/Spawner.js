import { Entity } from './Entity.js';
import { Monster } from './Monster.js';
import { Vector2 } from '../math/Vector2.js';
import gameArea from '../GameArea.js';
import { randInt } from '../math/MathUtils.js';
import { difficulty } from '../Difficulty.js';

export class Spawner extends Entity {
	static monsterNb = 0;
	static maxMonster = 25;

	constructor(datas) {
		super(datas);
		this.size = new Vector2(10, 10);
		this.spawnCooldown = randInt(75, 200);
	}

	render(ctx) {
		this.hitbox.render(ctx);
	}

	update() {
		this.hitbox.update();
		if (Spawner.monsterNb < Spawner.maxMonster) {
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
			size: { x: 20 * (randMult / 1.5), y: 20 * (randMult / 1.5) },
			default_hp: 25 * randMult,
			speedMult: 10 - randMult,
			damage: 5,
			color: 'red',
			difficulty: difficulty.normal,
		};
		gameArea.add_entity(new Monster(datas));
		Spawner.monsterNb += 1;
	}
}
