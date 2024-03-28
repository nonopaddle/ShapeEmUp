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
});
