import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import gameArea from './GameArea.js';
import { Entity } from './entity/Entity.js';

describe('GameArea tests', () => {
	it('should be able to add an entity', () => {
		const d1 = {
				pos: { x: 120, y: 130 },
				size: { x: 10, y: 40 },
			},
			d2 = {
				pos: { x: 10, y: 15 },
				size: { x: 10, y: 20 },
			};
		const e1 = new Entity(d1);
		const e2 = new Entity(d2);
		gameArea.add_entity(e1);
		assert.strictEqual(120, gameArea.entities[0].pos.x);
		assert.strictEqual(130, gameArea.entities[0].pos.y);
		assert.strictEqual(10, gameArea.entities[0].size.x);
		assert.strictEqual(40, gameArea.entities[0].size.y);

		gameArea.add_entity(e2);
		assert.strictEqual(10, gameArea.entities[1].pos.x);
		assert.strictEqual(15, gameArea.entities[1].pos.y);
		assert.strictEqual(10, gameArea.entities[1].size.x);
		assert.strictEqual(20, gameArea.entities[1].size.y);
	});
});
