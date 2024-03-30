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

	it('limits the distance of the vector', () => {
		const v1 = new Vector2(5, 0);
		const v2 = v1.limit_distance(2);
		assert.strictEqual(v2.x, 2);
	});

	it('checks if two vectors are equals', () => {
		const v1 = new Vector2(1, 2);
		const v2 = new Vector2(1, 2);
		const v3 = new Vector2(2, 4);
		assert.strictEqual(v1.same(v2), true);
		assert.strictEqual(v1.same(v3), false);
	});

	it('creates a new vector from two others', () => {
		const v1 = new Vector2(2, 3);
		const v2 = new Vector2(4, 6);
		const v1_to_v2 = v1.to(v2);
		const v2_to_v1 = v2.to(v1);
		const v1_to_v1 = v1.to(v1);

		assert.strictEqual(2, v1_to_v2.x);
		assert.strictEqual(3, v1_to_v2.y);

		assert.strictEqual(-2, v2_to_v1.x);
		assert.strictEqual(-3, v2_to_v1.y);

		assert.strictEqual(0, v1_to_v1.x);
		assert.strictEqual(0, v1_to_v1.y);
	});
});
