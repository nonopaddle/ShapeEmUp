export class Vector2 {
	x;
	y;

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	distance() {
		return Math.sqrt(this.x ** 2 + this.y ** 2);
	}

	distanceTo(v) {
		return Math.sqrt((this.x - v.x) ** 2 + (this.y - v.y) ** 2);
	}

	normalize() {
		let distance = this.distance();
		if (distance == 0) return new Vector2(0, 0);
		return this.divide(distance);
	}

	multiply(k) {
		return new Vector2(this.x * k, this.y * k);
	}

	divide(k) {
		return this.multiply(1 / k);
	}

	add(v) {
		this.x += v.x;
		this.y += v.y;
	}

	static sum(vectors) {
		let x = 0,
			y = 0;
		vectors.forEach(vector => {
			x += vector.x;
			y += vector.y;
		});
		return new Vector2(x, y);
	}

	substract(v) {
		this.x -= v.x;
		this.y -= v.y;
	}

	limit_distance(max) {
		if (this.distance() <= max) return this;
		return this.normalize().multiply(max);
	}
	same(v) {
		return this.x == v.x && this.y == v.y;
	}

	toString() {
		return `[${this.x} ${this.y}]`;
	}

	angle() {
		return Math.atan2(this.y, this.x);
	}

	to(v) {
		return new Vector2(v.x - this.x, v.y - this.y);
	}
}
