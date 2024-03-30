import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { error } from 'node:console';
import { Entity } from './Entity.js';

describe('Entity tests', () => {
	const d0 = {
		pos: { x: 120, y: 130 },
		radius: 20,
	};
	const d3 = {
		pos: { x: 120, y: 130 },
		radius: 0,
	};
	const d4 = {
		pos: { x: 120, y: 130 },
		radius: -20,
	};
	it('must create entities with positive non null values only', () => {
		assert.doesNotThrow(() => new Entity(d0), error);

		assert.throws(() => new Entity(d3), /La valeur de radius est négative !/);

		assert.throws(() => new Entity(d4), /La valeur de radius est négative !/);
	});
});
