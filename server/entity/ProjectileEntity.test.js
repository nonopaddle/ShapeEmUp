import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { MonsterEntity } from './MonsterEntity.js';
import { ProjectileEntity } from './ProjectileEntity.js';
import gameArea from '../GameArea.js';

// à finir quand le côté serveur sera opérationnel

describe('Projectile entity tests', () => {
	it('hurt ennemies', () => {
		const PDatas = {
			pos: { x: 2, y: 0 },
			size: { x: 1, y: 1 },
			speedMult: 0,
			friendly: true,
			damage: 2,
			penetration: -1,
			color: 'blue',
			ttl: 2000,
		};
		const MDatas = {
			pos: { x: 2, y: 0 },
			size: { x: 1, y: 1 },
			default_hp: 10,
		};
		const pt = new ProjectileEntity(PDatas);
		const me = new MonsterEntity(MDatas, pt);
		gameArea.add_entity(pt);
		gameArea.add_entity(me);
		assert.strictEqual(me.HP, 10);
		pt.update();
		assert.strictEqual(me.HP, 8);
		pt.update();
		assert.strictEqual(me.HP, 8);
	});
});
