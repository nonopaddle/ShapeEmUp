import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { DynamicEntity } from './DynamicEntity.js';
import { Vector2 } from '../math/Vector2.js';

describe('Dynamic entity tests', () => {
	it('can move', () => {
		const datas = {
			pos: { x: 25, y: 25 },
			size: { x: 40, y: 40 },
		};
		const de = new DynamicEntity(datas);
		assert.strictEqual(25, de.pos.x);
		assert.strictEqual(25, de.pos.y);
		const randSpeed = new Vector2(
			Math.floor(Math.random(0, 99)),
			Math.floor(Math.random(0, 99))
		);
		const newSpeed = randSpeed.normalize().multiply(10);
		de.apply_impulse_vector(newSpeed);
		de.update();
		assert.strictEqual(25 + newSpeed.x, de.pos.x);
		assert.strictEqual(25 + newSpeed.y, de.pos.y);
	});
});
