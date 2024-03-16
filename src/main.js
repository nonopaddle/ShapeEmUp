import gameArea from './GameArea.js';
import { MouseControls } from './controller/MouseControls.js';
import { PlayerEntity } from './entity/PlayerEntity.js';
import { MainMenuView } from './view/MainMenuView.js';
import { PlayMenuView } from './view/PlayMenuView.js';
import { WaitingRoomView } from './view/WaitingRoomView.js';
import { Renderer } from './view/Renderer.js';
import { Router } from './view/Router.js';
import { ScoresView } from './view/ScoresView.js';
import { CreditsView } from './view/CreditsView.js';
import { MainGameView } from './view/MainGameView.js';

const mainMenuView = new MainMenuView(document.querySelector('.main_menu'));
const playMenuView = new PlayMenuView(document.querySelector('.play_menu'));
const waitingRoomView = new WaitingRoomView(
	document.querySelector('.waiting_room')
);
const mainGameView = new MainGameView(document.querySelector('.main_game'));
const scoresView = new ScoresView(document.querySelector('.scores'));
const creditsView = new CreditsView(document.querySelector('.credits'));
const routes = [
	{ path: '/main_menu', view: mainMenuView },
	{ path: '/play_menu', view: playMenuView },
	{ path: '/waiting_room', view: waitingRoomView },
	{ path: '/main_game', view: mainGameView },
	{ path: '/scores', view: scoresView },
	{ path: '/credits', view: creditsView },
];

Router.routes = routes;
Router.navigate('/main_menu');

const canvas = document.querySelector('.canvas');
//export const gameArea = new GameArea(document);
//export const gameArea = GameArea;
Renderer.set_canvas(canvas);
MouseControls.set_canvas(canvas);

const d1 = {
		pos: { x: 100, y: 200 },
		size: { x: 10, y: 20 },
		speed: { x: 0, y: 0 },
		color: 'red',
	},
	d2 = {
		pos: { x: 200, y: 300 },
		size: { x: 100, y: 100 },
		speed: { x: 0, y: 0 },
		color: 'yellow',
	};

export const player = new PlayerEntity(d2);

gameArea.add_entity(player);
