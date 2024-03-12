export class Entity {
	constructor(datas) {
		if (datas.pos.x <= 0) throw new Error('La valeur de x est négative !');
		if (datas.pos.y <= 0) throw new Error('La valeur de y est négative !');
		if (datas.size.x <= 0) throw new Error('La valeur de width est négative !');
		if (datas.size.y <= 0)
			throw new Error('La valeur de height est négative !');
		this.pos = datas.pos;
		this.size = datas.size;
		this.color = datas.color;
	}

	render(ctx) {
		ctx.fillStyle = this.color;
		ctx.lineWidth = 2;
		ctx.fillRect(this.pos.x-this.size.x/2, this.pos.y-this.size.y/2, this.size.x, this.size.y);
		ctx.strokeRect(this.pos.x-this.size.x/2, this.pos.y-this.size.y/2, this.size.x, this.size.y);
	}

	update(){}
}
