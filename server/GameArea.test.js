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
		const p1 = new PlayerEntity({
			pos: { x: 120, y: 130 },
			radius: 25,
		});
		gameArea.add_entity(p1);
		assert.strictEqual(120, p1.pos.x);
		assert.strictEqual(130, p1.pos.y);

		p1.apply_vector_once(new Vector2(-200, 0));
		p1.update();
		assert.strictEqual(25, p1.pos.x);
		assert.strictEqual(130, p1.pos.y);

		p1.apply_vector_once(new Vector2(0, -200));
		p1.update();
		assert.strictEqual(25, p1.pos.x);
		assert.strictEqual(25, p1.pos.y);

		p1.apply_vector_once(new Vector2(-200, -200));
		p1.update();
		assert.strictEqual(25, p1.pos.x);
		assert.strictEqual(25, p1.pos.y);

		const p2 = new PlayerEntity({
			pos: { x: gameArea.maxSize.x - 120, y: gameArea.maxSize.y - 130 },
			radius: 25,
		});
		gameArea.add_entity(p2);
		assert.strictEqual(gameArea.maxSize.x - 120, p2.pos.x);
		assert.strictEqual(gameArea.maxSize.y - 130, p2.pos.y);

		p2.apply_vector_once(new Vector2(200, 0));
		p2.update();
		assert.strictEqual(gameArea.maxSize.x - 25, p2.pos.x);
		assert.strictEqual(gameArea.maxSize.y - 130, p2.pos.y);

		p2.apply_vector_once(new Vector2(0, 200));
		p2.update();
		assert.strictEqual(gameArea.maxSize.x - 25, p2.pos.x);
		assert.strictEqual(gameArea.maxSize.y - 25, p2.pos.y);

		p2.apply_vector_once(new Vector2(200, 200));
		p2.update();
		assert.strictEqual(gameArea.maxSize.x - 25, p2.pos.x);
		assert.strictEqual(gameArea.maxSize.y - 25, p2.pos.y);
	});
});
