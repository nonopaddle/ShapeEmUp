import { difficulties } from './Difficulty.js';
import fs from 'fs';
import { Vector2 } from './math/Vector2.js';

class GameArea {
	maxSize = new Vector2(3000, 1800);
	defaultDifficulty = 'normal';
	difficulty = difficulties[this.defaultDifficulty];
	scoreTab = [];
	entities = [];
	delta = 32 / 1000;
	friction = 0.1;
	gameStarted = false;
	#main_loop;

	// main loop
	t = 0;
	dt = 32 / 1000;
	currentTime;
	accumulator = 0;

	add_entity(entity) {
		if (entity.type == 'player') {
			this.scoreTab.push({ name: entity.name, pts: 0 });
		}
		this.entities.push(entity);
	}

	lastTick = Date.now();

	tick_event() {
		const newTime = Date.now();
		if (this.currentTime) {
			let frameTime = newTime - this.currentTime;
			if (frameTime > 0.25) frameTime = 0.25;
			this.accumulator += frameTime;

			while (this.accumulator >= this.dt) {
				console.log(this.accumulator, this.dt);
				this.entities.forEach(entity => entity.update(this.dt));
				this.t += this.dt;
				this.accumulator -= this.dt;
			}

			if (this.no_players_left() || this.time_is_up()) this.end();

			if (this.io != undefined) {
				this.send_entitiesDatas();
				this.send_current_time();
				this.send_players_score();
			}
		}
		this.currentTime = newTime;

		/*const now = Date.now();
		const dt = now - this.lastTick;
		this.lastTick = now;
		console.log(dt);
		this.entities.forEach(entity => entity.update());
		this.time += this.delta;
		if (this.no_players_left() || this.time_is_up()) this.end();
		if (this.io != undefined) {
			this.send_entitiesDatas();
			this.send_current_time();
			this.send_players_score();
		}*/
	}

	start_loop() {
		this.#main_loop = setInterval(
			this.tick_event.bind(this),
			this.delta * 1000
		);
		this.time = 0;
		this.gameStarted = true;
		console.log('loop started');
	}

	end() {
		this.stop_loop();
		this.gameStarted = false;
		fs.readFile('server/datas/scores.json', 'utf8', (err, data) => {
			if (err) {
				console.log(err);
			} else {
				const obj = JSON.parse(data);
				this.scoreTab.forEach(score => obj.push(score));
				const json = JSON.stringify(obj);
				fs.writeFile('server/datas/scores.json', json, 'utf8', () => {
					this.scoreTab = [];
					this.entities = [];
				});
			}
		});
		if (this.io != undefined) this.io.emit('game-end', this.scoreTab);
	}

	stop_loop() {
		clearInterval(this.#main_loop);
		console.log('loop stopped');
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

	add_score(name, value) {
		this.scoreTab
			.filter(score => score.name == name)
			.map(score => (score.pts += value));
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
				maxHP: entity.maxHP,
				HP: entity.HP,
				stats: entity.type == 'player' ? entity.stats : {},
				owner: entity.owner.name,
			};
		});
		this.io.emit('update-entities', datas);
	}

	send_current_time() {
		this.io.emit('getTime-from-server', this.time);
	}

	send_players_score() {
		this.io.emit('getPlayersScore-from-server', this.scoreTab);
	}
}

export default new GameArea();
