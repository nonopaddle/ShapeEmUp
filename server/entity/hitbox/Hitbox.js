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

	addMask(layer, ...action) {
		if (this.masks[layer] == undefined) {
			this.masks[layer] = [];
		}
		for (let i = 0; i < action.length; i++) {
			this.masks[layer].push(action[i]);
		}
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
