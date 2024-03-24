import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Monster } from './Monster.js';
import { Player } from './Player.js';

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
		const pt = new Player(PDatas);
		const me = new Monster(MDatas, pt);
		pt.updateDirection(1, 0);
		const bullet = pt.shoot();
		assert.strictEqual(me.HP, 10);
		bullet.update();
		assert.strictEqual(me.HP, 8);
		bullet.update();
		assert.strictEqual(me.HP, 8);
	});
});
