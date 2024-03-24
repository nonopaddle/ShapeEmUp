import { weaponType } from './WeaponType';

export const weaponList = {
	null: -1,
	// Active weapons
	gun: {
		type: weaponType.active,
		cooldown: 15,
		bullet: {
			size: { x: 10, y: 10 },
			speedMult: 25,
			friendly: true,
			owner: this,
			damage: 10,
			penetration: 1,
			color: 'blue',
			ttl: 2000,
		},
	},
	bigGun: {
		type: weaponType.active,
		cooldown: 50,
		bullet: {
			size: { x: 25, y: 25 },
			speedMult: 10,
			friendly: true,
			owner: this,
			damage: 25,
			penetration: 0,
			color: 'orange',
			ttl: 30,
		},
	},
	// Passive weapons
	//
	// Ultimate weapons
	laser: {
		type: weaponType.ultimate,
		cooldown: 1,
		bullet: {
			size: { x: 30, y: 10 },
			speedMult: 50,
			friendly: true,
			owner: this,
			damage: 1,
			penetration: -1,
			color: 'green',
			ttl: 30,
		},
	},
};
