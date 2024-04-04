import { Vector2 } from './math/Vector2.js';

class GameArea {
	maxSize = new Vector2(3000, 1800);
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
		console.log('loop started');
	}

	stop_loop() {
		clearInterval(this.#main_loop);
		console.log('loop stopped');
	}

	tick_event() {
		console.log(this.entities.length);
		this.entities.forEach(entity => entity.update());
		if (this.io != undefined) this.send_entitiesDatas();
	}

	get_players() {
		const players = this.entities.filter(entity => entity.type == 'player');
		return players;
	}

	set_io(io) {
		this.io = io;
	}

	send_entitiesDatas() {
		const datas = this.entities.map(entity => {
			return {
				origin: { x: entity.pos.x, y: entity.pos.y },
				radius: entity.radius,
				angle: entity.angle,
				name: entity.name,
				type: entity.type,
				owner: entity.owner.name,
				maxHP: entity.maxHP,
				HP: entity.HP,
			};
		});
		this.io.emit('update-entities', datas);
	}
}

export default new GameArea();
