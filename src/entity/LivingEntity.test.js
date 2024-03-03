import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { LivingEntity } from './LivingEntity.js';

describe('LivingEntity tests', () => {
	it('has HPs', () => {
		const le = new LivingEntity(100, 25, 25, 40, 40, 'red');
		assert.strictEqual(100, le.HP);
	});
});
