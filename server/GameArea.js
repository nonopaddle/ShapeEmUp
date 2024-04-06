import { difficulty } from './Difficulty.js';
import { players, io } from './index.js';

import { Vector2 } from './math/Vector2.js';

class GameArea {
	maxSize = new Vector2(3000, 1800);
	difficulty = difficulty.normal;
	score = 0;
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
		io.emit('game-end', this.score);
		clearInterval(this.#main_loop);
		this.score = 0;
		console.log('loop stopped');
	}

	tick_event() {
		let consolePlayers = '';
		players.forEach(player => {
			consolePlayers += player.handshake.query.nickname + ' ';
		});
		console.log('players: ' + consolePlayers);
		this.entities.forEach(entity => entity.update());
		this.time += this.delta;
		if (this.no_players_left() || this.time_is_up()) this.stop_loop();
		if (this.io != undefined) this.send_entitiesDatas();
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

	add_score(score) {
		this.score += this.difficulty * score;
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
