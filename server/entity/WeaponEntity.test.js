import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { PlayerEntity } from './PlayerEntity.js';
import { WeaponEntity } from './WeaponEntity.js';
import { weaponList } from '../weapons/WeaponList.js';
import gameArea from '../GameArea.js';

// à finir quand le côté serveur sera opérationnel

describe('Weapon entity tests', () => {
	it('gives the player a weapon', () => {
		const PDatas = {
			pos: { x: 0, y: 0 },
			radius: 1 / 2,
		};
		const pt = new PlayerEntity(PDatas);
		const we = new WeaponEntity(0, 0, weaponList.gun);
		gameArea.add_entity(pt);
		gameArea.add_entity(we);
		pt.update();
		compareWeapons(pt.weapons.active1, weaponList.gun);
	});

	it('gives the player weapons to the correct slots', () => {
		const PDatas = {
			pos: { x: 0, y: 0 },
			radius: 1 / 2,
		};
		const pt = new PlayerEntity(PDatas);
		const weA1 = new WeaponEntity(0, 0, weaponList.bigGun);
		const weA2 = new WeaponEntity(0, 0, weaponList.gun);
		const weP = new WeaponEntity(0, 0, weaponList.zone);
		const weU = new WeaponEntity(0, 0, weaponList.laser);
		gameArea.add_entity(weA1);
		gameArea.add_entity(weA2);
		gameArea.add_entity(weP);
		gameArea.add_entity(weU);
		pt.update();
		pt.update();
		compareWeapons(pt.weapons.active1, weaponList.bigGun);
		compareWeapons(pt.weapons.active2, weaponList.gun);
		compareWeapons(pt.weapons.passive, weaponList.zone);
		compareWeapons(pt.weapons.ultimate, weaponList.laser);
	});
});

function compareWeapons(w1, w2) {
	assert.strictEqual(w1.type, w2.type);
	assert.strictEqual(w1.maxCooldown, w2.cooldown);
	const b1 = w1.bullet,
		b2 = w2.bullet;
	assert.strictEqual(b1.radius, b2.radius);
	assert.strictEqual(b1.speedMult, b2.speedMult);
	assert.strictEqual(b1.friendly, b2.friendly);
	assert.strictEqual(b1.damage, b2.damage);
	assert.strictEqual(b1.penetration, b2.penetration);
	assert.strictEqual(b1.ttl, b2.ttl);
}
