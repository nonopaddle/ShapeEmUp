import http from 'http';
import express from 'express';
import addWebpackMiddleware from './middlewares/addWebpackMiddleware.js';
import { Server as IOServer } from 'socket.io';
import gameArea from './GameArea.js';

const app = express();
const httpServer = http.createServer(app);

let port = process.env.PORT;
if (port == undefined) port = 8000;
httpServer.listen(port, () => {
	console.log(`Server running at http://localhost:${port}/`);
});

addWebpackMiddleware(app);

app.use(express.static('client/public'));

const players = [];
const maxPlayers = 4;

const io = new IOServer(httpServer);
io.on('connection', socket => {
	if (players.length == maxPlayers) {
		socket.disconnect();
		return;
	}

	const datas = socket.handshake.query;
	if (players.filter(player => player == datas.nickname).length != 0) {
		socket.disconnect();
		return;
	}

	players.push(datas.nickname);

	socket.on('disconnect', () => {
		players.removeIf(player => player == datas.nickname);
		gameArea
			.get_players()
			.removeIf(player => player.nickname == datas.nickname);
		console.log(`${datas.nickname} s'est déconnectée`);
		console.log(players);
	});

	console.log(`${datas.nickname} s'est connectée`);
	console.log(players);
});

Array.prototype.removeIf = function (callback) {
	var i = this.length;
	while (i--) {
		if (callback(this[i], i)) {
			this.splice(i, 1);
		}
	}
};
