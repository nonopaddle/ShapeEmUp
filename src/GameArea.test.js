import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { GameArea } from './GameArea.js';
import { Entity } from './entity/Entity.js';

describe('GameArea tests', () => {
	it('should be able to add an entity', () => {
		const ga = new GameArea();
		ga.add_entity(new Entity(120, 130, 10, 40));
		assert.strictEqual(120, ga.entities[0].pos.x);
		assert.strictEqual(130, ga.entities[0].pos.y);
		assert.strictEqual(10, ga.entities[0].size.x);
		assert.strictEqual(40, ga.entities[0].size.y);

		ga.add_entity(new Entity(10, 15, 10, 20));
		assert.strictEqual(10, ga.entities[1].pos.x);
		assert.strictEqual(15, ga.entities[1].pos.y);
		assert.strictEqual(10, ga.entities[1].size.x);
		assert.strictEqual(20, ga.entities[1].size.y);
	});
});
