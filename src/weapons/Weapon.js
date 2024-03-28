import { ProjectileEntity } from '../entity/ProjectileEntity.js';

export class Weapon {
	constructor(datas) {
		this.type = datas.type;
		this.maxCooldown = datas.cooldown;
		this.cooldown = 0;
		this.bullet = datas.bullet;
		this.bullet.cooldown = this.maxCooldown;
		if (datas.owner) this.bullet.owner = datas.owner;
	}

	shoot() {
		if (this.cooldown <= 0) {
			this.cooldown = this.maxCooldown;
			return new ProjectileEntity(this.bullet);
		}
	}

	update() {
		this.cooldown -= 1;
	}
}
