import http from 'http';
import express from 'express';
import addWebpackMiddleware from './middlewares/addWebpackMiddleware.js';
import { Server as IOServer } from 'socket.io';
import gameArea from './GameArea.js';
import { PlayerEntity } from './entity/PlayerEntity.js';

const app = express();
const httpServer = http.createServer(app);

function gracefulShutdown() {
	console.log('Shutting down gracefully...');

	httpServer.close(() => {
		console.log('Server closed.');

		// Close any other connections or resources here

		process.exit(0);
	});

	// Force close the server after 5 seconds
	setTimeout(() => {
		console.error(
			'Could not close connections in time, forcefully shutting down'
		);
		process.exit(1);
	}, 5000);
}

process.on('uncaughtException', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

let port = process.env.PORT;
if (port == undefined) port = 8000;
httpServer.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});

addWebpackMiddleware(app);

app.use(express.static('client/public'));

const players = [];
const maxPlayers = 4;

const avatarsAssociation = {
	blue_square: null,
	green_circle: null,
	orange_triangle: null,
	red_pentagon: null,
};

const io = new IOServer(httpServer);
io.on('connection', socket => {
	socket.emit('avatar selection update', avatarsAssociation);
	if (players.length == maxPlayers) {
		socket.disconnect();
		return;
	}

	const datas = socket.handshake.query;
	if (players.filter(player => player == datas.nickname).length != 0) {
		socket.disconnect();
		return;
	}

	players.push(socket);
	console.log(`${datas.nickname} s'est connectée`);
	console.log(players);

	socket.on('disconnect', () => {
		players.removeIf(
			socket => socket.handshake.query.nickname == datas.nickname
		);
		gameArea
			.get_players()
			.removeIf(player => player.nickname == datas.nickname);
		Object.entries(avatarsAssociation).forEach(association => {
			const [avatarLabel, player] = association;
			if (player == datas.nickname) avatarsAssociation[avatarLabel] = null;
		});
		io.emit('avatar selection update', avatarsAssociation);
		console.log(`${datas.nickname} s'est déconnectée`);
		console.log(players);
		if(players.length == 0) gameArea.stop_loop();
	});

	socket.on('difficulty change', newDifficulty => {
		gameArea.difficulty = newDifficulty;
		io.emit('difficulty update', gameArea.difficulty);
	})

	socket.on('launch', () => {
		if (
			players.length !=
			Object.values(avatarsAssociation).filter(nickname => nickname != null)
				.length
		) {
			console.log('Not everyone has an avatar');
			socket.emit('launch fail');
			return;
		}
		const hasFailed = init();
		if (hasFailed) {
			console.log('launch fail');
			socket.emit('launch fail');
		} else {
			console.log('launch success');
			io.emit('launch success');
		}
	});

	socket.on('getEntities-from-client', () => {
		const datas = gameArea.entities.map(entity => {
			return {
				origin: { x: entity.pos.x, y: entity.pos.y },
				name: entity.name,
			};
		});
		//console.log(datas);
		socket.emit('getEntities-from-server', datas);
	});

	socket.on('selection avatar', datas => {
		const { avatar, playerNickname } = datas;
		console.log(`${playerNickname} a selectionné l'avatar ${avatar}`);
		if (avatarsAssociation[avatar] == null) {
			Object.entries(avatarsAssociation).forEach(association => {
				const [avatarLabel, player] = association;
				if (player == playerNickname) avatarsAssociation[avatarLabel] = null;
			});
			avatarsAssociation[avatar] = playerNickname;
		}
		io.emit('avatar selection update', avatarsAssociation);
	});
});

Array.prototype.removeIf = function (callback) {
	let i = this.length;
	while (i--) {
		if (callback(this[i], i)) {
			this.splice(i, 1);
		}
	}
};

function init() {
	console.log('initializing game ...');
	players.forEach(socket => {
		const player = new PlayerEntity(
			{
				pos: { x: 200, y: 200 },
				size: { x: 100, y: 100 },
				name: socket.handshake.query.nickname,
			},
			socket
		);
		console.log(player);
		gameArea.add_entity(player);
	});
	gameArea.start_loop();
	return false;
}
