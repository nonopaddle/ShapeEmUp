import { DynamicEntity } from './DynamicEntity.js';

export class LivingEntity extends DynamicEntity {
	constructor(hp, x, y, width, height, color) {
		super(x, y, width, height, color);
		this.HP = hp;
	}
}
