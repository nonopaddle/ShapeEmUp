export class GameArea {
	entities = [];
	constructor() {}

	add_entity(entity) {
		this.entities.push(entity);
	}

	start() {
		setInterval(this.tick_event.bind(this), 1000 / 60);
	}

	tick_event() {
		console.log('tick');
	}
}
