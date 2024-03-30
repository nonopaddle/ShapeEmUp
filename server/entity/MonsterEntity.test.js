import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { MonsterEntity } from './MonsterEntity.js';
import { PlayerEntity } from './PlayerEntity.js';

// à finir quand le côté serveur sera opérationnel

describe('Monster entity tests', () => {
	it('go toward player', () => {
		const PDatas = {
			pos: { x: 0, y: 0 },
			size: { x: 1, y: 1 },
		};
		const MDatas = {
			pos: { x: 2, y: 2 },
			size: { x: 1, y: 1 },
			level: 1,
		};
		const pt = new PlayerEntity(PDatas);
		const me = new MonsterEntity(MDatas, pt);
		me.update();
		assert.strictEqual(me.pos.x, 2 - Math.sqrt(2) / 2);
		assert.strictEqual(me.pos.y, 2 - Math.sqrt(2) / 2);
	});
});
