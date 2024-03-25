import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Entity } from './Entity.js';
import { error } from 'node:console';

describe('Entity tests', () => {
	const d0 = {
		pos: { x: 120, y: 130 },
		size: { x: 10, y: 40 },
	};
	const d1 = {
		pos: { x: -120, y: 130 },
		size: { x: 10, y: 40 },
	};
	const d2 = {
		pos: { x: 120, y: -130 },
		size: { x: 10, y: 40 },
	};
	const d3 = {
		pos: { x: 120, y: 130 },
		size: { x: -10, y: 40 },
	};
	const d4 = {
		pos: { x: 120, y: 130 },
		size: { x: 10, y: -40 },
	};
	it('must create entities with positive non null values only', () => {
		assert.doesNotThrow(() => new Entity(d0), error);

		assert.throws(() => new Entity(d1), /La valeur de x est négative !/);

		assert.throws(() => new Entity(d2), /La valeur de y est négative !/);

		assert.throws(() => new Entity(d3), /La valeur de width est négative !/);

		assert.throws(() => new Entity(d4), /La valeur de height est négative !/);
	});
});
