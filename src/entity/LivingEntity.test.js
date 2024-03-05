import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { LivingEntity } from './LivingEntity.js';
import { GameArea } from '../GameArea.js';

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

	it("must disappear when it's hp reaches 0", () => {
		const datas = {
			pos: { x: 25, y: 25 },
			size: { x: 40, y: 40 },
			default_hp: 100,
		};
		const le = new LivingEntity(datas);

		const ga = new GameArea();
		ga.add_entity(le);

		assert.strictEqual(1, ga.entities.length);
		assert.strictEqual(le, ga.entities[0]);
		le.hurt(100);
		assert(!ga.entities.includes(le));
		assert.strictEqual(0, ga.entities.length);
	});
});
