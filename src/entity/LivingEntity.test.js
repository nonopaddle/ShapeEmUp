import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { LivingEntity } from './LivingEntity.js';

describe('LivingEntity tests', () => {
	it('has HPs', () => {
		const datas = {
			pos: { x: 25, y: 25 },
			size: { x: 40, y: 40 },
			default_hp: 100,
		};
		const le = new LivingEntity(datas);
		assert.strictEqual(100, le.HP);
	});

	it('can be hurt', () => {
		const datas = {
			pos: { x: 25, y: 25 },
			size: { x: 40, y: 40 },
			default_hp: 100,
		};
		const le = new LivingEntity(datas);
		le.hurt(15);
		assert.strictEqual(85, le.HP);
	});
});
