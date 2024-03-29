import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { Weapon } from './Weapon.js';
import { weaponList } from './WeaponList.js';

describe('Weapon tests', () => {
	it('shoots a bullet', () => {
		const w = new Weapon(weaponList.gun);
		const bullet = w.shoot();
		assert.strictEqual(bullet, weaponList.gun.bullet);
	});
});
