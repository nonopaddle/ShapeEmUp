import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { MonsterEntity } from './MonsterEntity.js';
import { PlayerEntity } from './PlayerEntity.js';

describe('Dynamic entity tests', () => {
	it('can go toward player', () => {
		const PDatas = {
			pos: { x: 0, y: 0 },
			size: { x: 1, y: 1 },
		};
		const MDatas = {
			pos: { x: 2, y: 2 },
			size: { x: 1, y: 1 },
		};
		const pe = new PlayerEntity(PDatas);
		const me = new MonsterEntity(MDatas, pe);
		me.move();
		assert.strictEqual(me.pos.x, 1);
		assert.strictEqual(me.pos.y, 1);
	});
});
