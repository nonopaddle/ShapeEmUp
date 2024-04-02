import { Hitbox } from './Hitbox.js';
import gameArea from '../../GameArea.js';

export class CircleHitbox extends Hitbox {
	constructor(owner, origin, rayon) {
		super(owner, origin);
		this.rayon = rayon;
	}

	is_colliding_with_circle(hitbox) {
		const deltaD = this.origin.distanceTo(hitbox.origin);
		return deltaD < this.rayon + hitbox.rayon;
	}

	update() {
		super.update();
		gameArea.entities.forEach(entity => {
			if (entity == this.owner) return;
			const entityLayer = entity.hitbox.layers;
			const masks = Object.keys(this.masks);
			const inter = entityLayer.filter(layer => masks.includes(layer));
			if (inter.length == 0) return;
			if (!this.is_colliding_with_circle(entity.hitbox)) return;
			inter.forEach(layer => this.executeAction(layer, entity));
		});
	}

	render(ctx) {
		ctx.beginPath();
		ctx.fillStyle = 'black';
		ctx.lineWidth = 2;
		ctx.arc(this.origin.x, this.origin.y, this.rayon, 0, 2 * Math.PI);
		ctx.stroke();
	}
}
