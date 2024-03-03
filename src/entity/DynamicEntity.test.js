import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { DynamicEntity } from './DynamicEntity.js';

describe('Dynamic entity tests', () => {
	it('can move', () => {
		const de = new DynamicEntity(25, 25, 40, 40);
		assert.strictEqual(25, de.pos.x);
		assert.strictEqual(25, de.pos.y);
		const randX = Math.random() * 100,
			randY = Math.random() * 100;
		de.setSpeed(randX, randY);
		de.move();
		assert.strictEqual(25 + randX, de.pos.x);
		assert.strictEqual(25 + randY, de.pos.y);
	});
});
