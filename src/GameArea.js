class GameArea {
	entities = [];

	add_entity(entity) {
		this.entities.push(entity);
	}

	start() {
		setInterval(this.tick_event.bind(this), 1000 / 60);
	}

	tick_event() {
		this.entities.forEach(entity => entity.update());
		//console.log('tick');
	}
}

export default new GameArea();
