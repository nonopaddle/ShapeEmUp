import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { MonsterEntity } from './MonsterEntity.js';
import { ProjectileEntity } from './ProjectileEntity.js';
import gameArea from '../GameArea.js';
import { Vector2 } from '../math/Vector2.js';
import { PlayerEntity } from './PlayerEntity.js';
import { difficulties } from '../Difficulty.js';

// à finir quand le côté serveur sera opérationnel

describe('Projectile entity tests', () => {
	it('hurt ennemies', () => {
		const PDatas = {
			pos: { x: 2, y: 0 },
			radius: 1 / 2,
			speedMult: 0,
			friendly: true,
			damage: 2,
			penetration: 1,
			color: 'blue',
			ttl: 2000,
		};
		const MDatas = {
			pos: { x: 2, y: 0 },
			radius: 1 / 2,
			default_hp: 10,
			difficulty: difficulties.normal.monster,
		};
		const pt = new ProjectileEntity(PDatas);
		const me = new MonsterEntity(MDatas, pt);
		gameArea.add_entity(pt);
		gameArea.add_entity(me);
		assert.strictEqual(me.HP, 10);
		pt.update();
		assert.strictEqual(me.HP, 8);
		pt.update();
		assert.strictEqual(me.HP, 8);
	});

	it('gives knockback', () => {
		const player = new PlayerEntity({
			pos: { x: 0, y: 0 },
			radius: 25,
		});
		const projectile = new ProjectileEntity({
			pos: { x: 120, y: 120 },
			owner: player,
			radius: 1 / 2,
			speedMult: 0,
			friendly: true,
			damage: 2,
			knockback_speed: 10,
			penetration: -1,
			color: 'blue',
			ttl: 2000,
		});
		const monster = new MonsterEntity(
			{
				pos: { x: 120, y: 120 },
				radius: 1 / 2,
				default_hp: 10,
				difficulty: difficulties.normal.monster,
			},
			player
		);

		const expectedKnockback = player.pos
			.to(monster.pos)
			.normalize()
			.multiply(projectile.knockback_speed);

		gameArea.add_entity(player);
		gameArea.add_entity(projectile);
		gameArea.add_entity(monster);
		assert.equal(monster.knockback.x, 0);
		assert.equal(monster.knockback.y, 0);
		projectile.update();
		assert.equal(monster.knockback.x, expectedKnockback.x);
		assert.equal(monster.knockback.y, expectedKnockback.y);
	});
});
