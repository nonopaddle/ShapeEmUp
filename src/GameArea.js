class GameArea {
	entities = [];
	#main_loop;

	add_entity(entity) {
		this.entities.push(entity);
	}

	start_loop() {
		this.#main_loop = setInterval(this.tick_event.bind(this), 1000 / 60);
		console.log('loop started');
	}

	stop_loop() {
		clearInterval(this.#main_loop);
		console.log('loop stopped');
	}

	tick_event() {
		this.entities.forEach(entity => entity.update());
	}
}

export default new GameArea();
