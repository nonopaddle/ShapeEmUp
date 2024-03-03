import { DynamicEntity } from './DynamicEntity.js';

export class LivingEntity extends DynamicEntity {
	constructor(datas) {
		super(datas);
		this.HP = datas.default_hp;
	}
}
