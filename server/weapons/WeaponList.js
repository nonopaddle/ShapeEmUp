import { weaponType } from './WeaponType.js';

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
			damage: 25,
			penetration: 0,
			color: 'orange',
			ttl: 30,
		},
	},
	// Passive weapons
	zone: {
		type: weaponType.passive,
		cooldown: 0,
		bullet: {
			size: { x: 500, y: 500 },
			speedMult: 0,
			friendly: true,
			damage: 0.25,
			penetration: -1,
			color: 'gray',
			ttl: 2,
			renderTexture: false,
		},
	},
	// Ultimate weapons
	laser: {
		type: weaponType.ultimate,
		cooldown: 1,
		bullet: {
			size: { x: 30, y: 10 },
			speedMult: 50,
			friendly: true,
			damage: 1,
			penetration: -1,
			color: 'green',
			ttl: 30,
		},
	},
};
