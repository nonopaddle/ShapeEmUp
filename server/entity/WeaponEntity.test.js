import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { PlayerEntity } from './PlayerEntity.js';
import { WeaponEntity } from './WeaponEntity.js';
import { weaponList } from '../weapons/WeaponList.js';

// à finir quand le côté serveur sera opérationnel

describe('Weapon entity tests', () => {
	it('gives the player a weapon', () => {
		const PDatas = {
			pos: { x: 0, y: 0 },
			size: { x: 1, y: 1 },
		};
		const pt = new PlayerEntity(PDatas);
		const we = new WeaponEntity(0, 0, weaponList.gun);
		pt.update();
		assert.strictEqual(pt.weapons.active1, weaponList.gun);
	});

	it('gives the player weapons to the correct slots', () => {
		const PDatas = {
			pos: { x: 0, y: 0 },
			size: { x: 1, y: 1 },
		};
		const pt = new PlayerEntity(PDatas);
		const weA1 = new WeaponEntity(0, 0, weaponList.bigGun);
		const weA2 = new WeaponEntity(0, 0, weaponList.gun);
		const weP = new WeaponEntity(0, 0, weaponList.zone);
		const weU = new WeaponEntity(0, 0, weaponList.laser);
		pt.update();
		assert.strictEqual(pt.weapons.active1, weaponList.bigGun);
		assert.strictEqual(pt.weapons.active2, weaponList.gun);
		assert.strictEqual(pt.weapons.passive, weaponList.zone);
		assert.strictEqual(pt.weapons.ultimate, weaponList.laser);
	});
});
