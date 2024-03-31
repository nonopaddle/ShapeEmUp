import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { DynamicEntity } from './DynamicEntity.js';
import { Vector2 } from '../math/Vector2.js';

describe('Dynamic entity tests', () => {
	it('can move', () => {
		const datas = {
			pos: { x: 25, y: 25 },
			radius: 20,
		};
		const de = new DynamicEntity(datas);
		assert.strictEqual(de.pos.x, 25);
		assert.strictEqual(de.pos.y, 25);
		const randSpeed = new Vector2(
			Math.floor(Math.random(0, 99)),
			Math.floor(Math.random(0, 99))
		);
		const newSpeed = randSpeed.normalize().multiply(10);
		de.apply_impulse_vector(newSpeed);
		de.update();
		assert.strictEqual(de.pos.x, 25 + newSpeed.x);
		assert.strictEqual(de.pos.y, 25 + newSpeed.y);
	});

	it('has a direction', () => {
		const datas = {
			pos: { x: 25, y: 25 },
			radius: 20,
		};
		const de = new DynamicEntity(datas);
		de.update();
		assert.strictEqual(de.angle, 0);
		const up = new Vector2(0, -5),
			down = new Vector2(0, 5),
			left = new Vector2(-5, 0),
			right = new Vector2(5, 0);

		de.apply_impulse_vector(up);
		de.update();
		assert.strictEqual(de.angle, Math.PI / 2);

		de.apply_impulse_vector(left);
		de.update();
		assert.strictEqual(de.angle, -Math.PI);

		de.apply_impulse_vector(down);
		de.update();
		assert.strictEqual(de.angle, -Math.PI / 2);

		de.apply_impulse_vector(right);
		de.update();
		assert.strictEqual(de.angle, -0);
	});
});
