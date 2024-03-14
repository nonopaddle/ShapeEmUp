import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { MonsterEntity } from './MonsterEntity.js';
import { PlayerEntity } from './PlayerEntity.js';

describe('Projectile entity tests', () => {
	it('hurt ennemies', () => {
		const PDatas = {
			pos: { x: 0, y: 0 },
			size: { x: 1, y: 1 },
		};
		const MDatas = {
			pos: { x: 2, y: 0 },
			size: { x: 1, y: 1 },
		};
		const pe = new PlayerEntity(PDatas);
		const me = new MonsterEntity(MDatas, pe);
	});
});
