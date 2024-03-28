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
}
