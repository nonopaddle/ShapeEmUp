import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { DynamicEntity } from './DynamicEntity.js';

describe('Dynamic entity tests', () => {
	it('can move', () => {
		const datas = {
			pos: { x: 25, y: 25 },
			size: { x: 40, y: 40 },
		};
		const de = new DynamicEntity(datas);
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
