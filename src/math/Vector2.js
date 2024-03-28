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
}
