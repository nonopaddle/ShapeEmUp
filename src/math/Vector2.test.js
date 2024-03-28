import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Vector2 } from './Vector2.js';

describe('Vector2 tests', () => {
	it('returns the distance', () => {
		const v = new Vector2(1, 1);
		assert.strictEqual(v.distance(), Math.sqrt(2));
	});

	it('normalizes the vector', () => {
		const v1 = new Vector2(3, 0);
		const v2 = v1.normalize();
		assert.strictEqual(v2.x, 1);
	});

	it('multiply the vector', () => {
		const v1 = new Vector2(1, 2);
		const v2 = v1.multiply(2);
		assert.strictEqual(v2.x, 2);
		assert.strictEqual(v2.y, 4);
	});

	it('divide the vector', () => {
		const v1 = new Vector2(2, 4);
		const v2 = v1.divide(2);
		assert.strictEqual(v2.x, 1);
		assert.strictEqual(v2.y, 2);
	});

	it('adds a vector to this vector', () => {
		const v1 = new Vector2(1, 0);
		const v2 = new Vector2(0, 2);
		v1.add(v2);
		assert.strictEqual(v1.x, 1);
		assert.strictEqual(v1.y, 2);
	});

	it('adds multiple vectors together', () => {
		const v1 = new Vector2(1, 0);
		const v2 = new Vector2(0, 2);
		const v3 = new Vector2(1, 1);
		const v4 = Vector2.sum([v1, v2, v3]);
		assert.strictEqual(v4.x, 2);
		assert.strictEqual(v4.y, 3);
	});

	it('substract a vector to this vector', () => {
		const v1 = new Vector2(3, 6);
		const v2 = new Vector2(1, 2);
		v1.substract(v2);
		assert.strictEqual(v1.x, 2);
		assert.strictEqual(v1.y, 4);
	});
});
