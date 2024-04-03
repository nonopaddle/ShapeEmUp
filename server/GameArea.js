class GameArea {
	difficulty = 1;
	entities = [];
	delta = 16 / 1000;
	friction = 400;
	#main_loop;

	add_entity(entity) {
		this.entities.push(entity);
	}

	start_loop() {
		this.#main_loop = setInterval(
			this.tick_event.bind(this),
			this.delta * 1000
		);
		this.time = 0;
		console.log('loop started');
	}

	stop_loop() {
		clearInterval(this.#main_loop);
		console.log('loop stopped');
	}

	tick_event() {
		console.log(this.entities.length);
		this.entities.forEach(entity => entity.update());
		if (this.no_players_left() || this.time_is_up()) this.stop_loop();
		this.time += this.delta;
		console.log(this.time);
	}

	get_players() {
		const players = this.entities.filter(entity => entity.type == 'player');
		return players;
	}

	no_players_left() {
		return this.get_players().length == 0;
	}

	time_is_up() {
		return this.time >= 60 * 5;
	}
}

export default new GameArea();
