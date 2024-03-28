import { PlayerEntity } from './entity/PlayerEntity.js';

class GameArea {
	difficulty = 1;
	entities = [];
	delta = 20 / 1000;
	friction = 60;
	#main_loop;

	add_entity(entity) {
		this.entities.push(entity);
	}

	start_loop() {
		this.#main_loop = setInterval(
			this.tick_event.bind(this),
			this.delta * 1000
		);
		console.log('loop started');
	}

	stop_loop() {
		clearInterval(this.#main_loop);
		console.log('loop stopped');
	}

	tick_event() {
		this.entities.forEach(entity => entity.update());
	}

	get_players() {
		const players = this.entities.filter(
			entity => entity instanceof PlayerEntity
		);
		return players;
	}
}

export default new GameArea();
