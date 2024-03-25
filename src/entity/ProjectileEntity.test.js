import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { MonsterEntity } from './MonsterEntity.js';
import { PlayerEntity } from './PlayerEntity.js';

// à finir quand le côté serveur sera opérationnel

describe('Projectile entity tests', () => {
	it('hurt ennemies', () => {
		const PDatas = {
			pos: { x: 0, y: 0 },
			size: { x: 1, y: 1 },
		};
		const MDatas = {
			pos: { x: 2, y: 0 },
			size: { x: 1, y: 1 },
			default_hp: 10,
		};
		const pt = new PlayerEntity(PDatas);
		const me = new MonsterEntity(MDatas, pt);
		pt.updateDirection(1, 0);
		const bullet = pt.shoot();
		assert.strictEqual(me.HP, 10);
		bullet.update();
		assert.strictEqual(me.HP, 8);
		bullet.update();
		assert.strictEqual(me.HP, 8);
	});
});
