import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Action } from './Action.js';
import { error } from 'node:console';

describe('Action tests', () => {
	it('must have a correct label', () => {
		function functTwoArgs(source, target) {}
		assert.throws(
			() => new Action(null, functTwoArgs),
			/Le label doit être une chaîne de caractères non nulle !/
		);
		assert.throws(
			() => new Action({}, functTwoArgs),
			/Le label doit être une chaîne de caractères non nulle !/
		);
		assert.throws(
			() => new Action('', functTwoArgs),
			/Le label doit être une chaîne de caractères non nulle !/
		);
		assert.doesNotThrow(() => new Action('a', functTwoArgs), error);
	});

	it('must have a correct function', () => {
		function functNoArg() {}
		function functTwoArgs(source, target) {}
		assert.throws(
			() => new Action('a', null),
			/funct doit être une fonction !/
		);
		assert.throws(() => new Action('a', {}), /funct doit être une fonction !/);
		assert.throws(
			() => new Action('a', functNoArg),
			/La fonction doit avoir deux arguments !/
		);
		assert.doesNotThrow(() => new Action('a', functTwoArgs), error);
	});
});
