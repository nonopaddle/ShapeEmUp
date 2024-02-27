import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { Entity } from './Entity.js';
import { error } from 'node:console';

describe('Entity tests', () => {
	it('must create entities with positive non null values only', () => {
		assert.doesNotThrow(() => new Entity(120, 130, 10, 40), error);

		assert.throws(
			() => new Entity(-120, 130, 10, 40),
			/La valeur de x est négative !/
		);

		assert.throws(
			() => new Entity(120, -130, 10, 40),
			/La valeur de y est négative !/
		);

		assert.throws(
			() => new Entity(120, 130, -10, 40),
			/La valeur de width est négative !/
		);

		assert.throws(
			() => new Entity(120, 130, 10, -40),
			/La valeur de height est négative !/
		);
	});
});
