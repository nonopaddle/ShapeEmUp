import { Vector2 } from '../math/Vector2.js';
import { CircleHitbox } from './hitbox/CircleHitbox.js';

export class Entity {
	constructor(datas) {
		//if (datas.pos.x <= 0) throw new Error('La valeur de x est négative !');
		//if (datas.pos.y <= 0) throw new Error('La valeur de y est négative !');
		if (datas.size.x <= 0) throw new Error('La valeur de width est négative !');
		if (datas.size.y <= 0)
			throw new Error('La valeur de height est négative !');
		this.pos = new Vector2(datas.pos.x, datas.pos.y);
		this.size = new Vector2(datas.size.x, datas.size.y);
		this.color = datas.color;
		this.hitbox = new CircleHitbox(this, this.pos, datas.size.x / 2);
	}

	render(ctx) {
		ctx.fillStyle = this.color;
		ctx.lineWidth = 2;
		ctx.fillRect(
			this.pos.x - this.size.x / 2,
			this.pos.y - this.size.y / 2,
			this.size.x,
			this.size.y
		);
		ctx.strokeRect(
			this.pos.x - this.size.x / 2,
			this.pos.y - this.size.y / 2,
			this.size.x,
			this.size.y
		);
		this.hitbox.render(ctx);
	}

	update() {
		this.hitbox.update();
	}
}
