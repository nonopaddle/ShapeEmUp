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
}
