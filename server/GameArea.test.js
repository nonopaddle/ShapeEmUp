import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Entity } from './entity/Entity.js';
import gameArea from './GameArea.js';
import { PlayerEntity } from './entity/PlayerEntity.js';
import { Vector2 } from './math/Vector2.js';

describe('GameArea tests', () => {
	it('should be able to add an entity', () => {
		const d1 = {
				pos: { x: 120, y: 130 },
				radius: 25,
			},
			d2 = {
				pos: { x: 10, y: 15 },
				radius: 15,
			};
		gameArea.add_entity(new Entity(d1));
		assert.strictEqual(120, gameArea.entities[0].pos.x);
		assert.strictEqual(130, gameArea.entities[0].pos.y);
		assert.strictEqual(25, gameArea.entities[0].radius);

		gameArea.add_entity(new Entity(d2));
		assert.strictEqual(10, gameArea.entities[1].pos.x);
		assert.strictEqual(15, gameArea.entities[1].pos.y);
		assert.strictEqual(15, gameArea.entities[1].radius);
	});
	it('must have playerproof boundaries', () => {
		const player = new PlayerEntity({
			pos: { x: 120, y: 130 },
			radius: 25,
		});
		gameArea.add_entity(player);
		assert.strictEqual(120, player.pos.x);
		assert.strictEqual(130, player.pos.y);

		player.apply_vector_once(new Vector2(-200, 0));
		player.update();
		assert.strictEqual(25, player.pos.x);
		assert.strictEqual(130, player.pos.y);

		player.apply_vector_once(new Vector2(0, -200));
		player.update();
		assert.strictEqual(25, player.pos.x);
		assert.strictEqual(25, player.pos.y);

		player.apply_vector_once(new Vector2(-200, -200));
		player.update();
		assert.strictEqual(25, player.pos.x);
		assert.strictEqual(25, player.pos.y);
	});
});
