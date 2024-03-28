import gameArea from '../GameArea.js';
import { DynamicEntity } from './DynamicEntity.js';

export class LivingEntity extends DynamicEntity {
	constructor(datas) {
		super(datas);
		this.HP = datas.default_hp;
		this.maxHP = datas.default_hp;
	}

	update() {
		super.update();
		if (this.HP <= 0) {
			this.die();
		}
	}

	render(ctx) {
		ctx.fillStyle = 'black';
		ctx.fillRect(
			this.pos.x - this.size.x / 2,
			this.pos.y + this.size.y / 2 + 7.5,
			this.size.x,
			5
		);
		ctx.strokeRect(
			this.pos.x - this.size.x / 2,
			this.pos.y + this.size.y / 2 + 7.5,
			this.size.x,
			5
		);
		ctx.fillStyle = 'red';
		ctx.fillRect(
			this.pos.x - this.size.x / 2,
			this.pos.y + this.size.y / 2 + 7.5,
			this.size.x * (this.HP / this.maxHP),
			5
		);
		ctx.strokeRect(
			this.pos.x - this.size.x / 2,
			this.pos.y + this.size.y / 2 + 7.5,
			this.size.x * (this.HP / this.maxHP),
			5
		);
		super.render(ctx);
	}

	hurt(damages) {
		this.HP -= damages;
	}

	die() {
		gameArea.entities.forEach((entity, index) => {
			if (entity === this) {
				gameArea.entities.splice(index, 1);
			}
		});
	}
}
