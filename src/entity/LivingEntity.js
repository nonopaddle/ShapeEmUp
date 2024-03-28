import { DynamicEntity } from './DynamicEntity.js';
import gameArea from '../GameArea.js';

export class LivingEntity extends DynamicEntity {
	constructor(datas) {
		super(datas);
		this.maxHP = datas.default_hp;
		this.HP = this.maxHP;
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
		if (this.HP > 0) {
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
		}
		super.render(ctx);
	}

	hurt(damages) {
		this.HP -= damages;
		return this.HP <= 0;
	}

	die() {
		gameArea.entities.forEach((entity, index) => {
			if (entity === this) {
				gameArea.entities.splice(index, 1);
			}
		});
	}
}
