export class Entity {
	constructor(x, y, width, height, color) {
		if (x <= 0) throw new Error('La valeur de x est négative !');
		if (y <= 0) throw new Error('La valeur de y est négative !');
		if (width <= 0) throw new Error('La valeur de width est négative !');
		if (height <= 0) throw new Error('La valeur de height est négative !');
		this.pos = { x: x, y: y };
		this.size = { x: width, y: height };
		this.color = color;
	}

	render(ctx) {
		ctx.fillStyle = this.color;
		ctx.lineWidth = 2;
		ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
		ctx.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
	}
}
