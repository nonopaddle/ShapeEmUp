export class Hitbox {
	layers = [];
	masks = {};

	constructor(owner, origin) {
		this.owner = owner;
		this.origin = origin;
	}

	update() {
		//this.origin = this.owner.pos;
	}

	addMask(layer, action) {
		if (this.masks[layer] == undefined) {
			this.masks[layer] = [];
		}
		this.masks[layer].push(action);
	}

	addLayer(layer) {
		this.layers.push(layer);
	}

	executeAction(layer, target) {
		this.masks[layer].forEach(action => {
			action.call(this.owner, target);
		});
	}

	render(ctx) {}
}
