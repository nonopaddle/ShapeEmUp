import { weaponType } from './WeaponType.js';

export const weaponList = {
	null: -1,
	// Active weapons
	gun: {
		type: weaponType.active,
		cooldown: 15,
		bullet: {
			radius: 5,
			speedMult: 25,
			friendly: true,
			damage: 10,
			penetration: 1,
			ttl: 2000,
			texture: 'gun-bullet',
		},
		texture: 'gun',
	},
	bigGun: {
		type: weaponType.active,
		cooldown: 50,
		bullet: {
			radius: 12.5,
			speedMult: 10,
			friendly: true,
			damage: 25,
			penetration: 0,
			ttl: 30,
		},
	},
	// Passive weapons
	zone: {
		type: weaponType.passive,
		cooldown: 0,
		bullet: {
			radius: 250,
			speedMult: 0,
			friendly: true,
			damage: 0.25,
			penetration: -1,
			ttl: 2,
			renderTexture: false,
		},
	},
	// Ultimate weapons
	laser: {
		type: weaponType.ultimate,
		cooldown: 1,
		bullet: {
			radius: 20,
			speedMult: 50,
			friendly: true,
			damage: 1,
			penetration: -1,
			ttl: 30,
		},
	},
};
