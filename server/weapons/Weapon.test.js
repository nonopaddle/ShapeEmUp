import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Weapon } from './Weapon.js';
import { weaponList } from './WeaponList.js';

describe('Weapon tests', () => {
	it('shoots a bullet', () => {
		const w = new Weapon(weaponList.gun);
		w.bullet.pos = { x: 0, y: 0 };
		assert.notStrictEqual(w.shoot(), undefined);
	});
});
