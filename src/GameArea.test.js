import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { GameArea } from './GameArea.js';
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
		const ga = new GameArea();
		ga.add_entity(new Entity(d1));
		assert.strictEqual(120, ga.entities[0].pos.x);
		assert.strictEqual(130, ga.entities[0].pos.y);
		assert.strictEqual(10, ga.entities[0].size.x);
		assert.strictEqual(40, ga.entities[0].size.y);

		ga.add_entity(new Entity(d2));
		assert.strictEqual(10, ga.entities[1].pos.x);
		assert.strictEqual(15, ga.entities[1].pos.y);
		assert.strictEqual(10, ga.entities[1].size.x);
		assert.strictEqual(20, ga.entities[1].size.y);
	});
});
