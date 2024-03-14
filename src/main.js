import gameArea from './GameArea.js';
import { MouseControls } from './controller/MouseControls.js';
import { PlayerEntity } from './entity/PlayerEntity.js';
import { MainMenuView } from './view/MainMenuView.js';
import { PlayMenuView } from './view/PlayMenuView.js';
import { CustomisationView } from './view/CustomisationView.js'
import { WaitingRoomView } from './view/WaitingRoomView.js'
import { Renderer } from './view/Renderer.js';
import { Router } from './view/Router.js';


const mainMenuView = new MainMenuView(document.querySelector('.main_menu'));
const playMenuView = new PlayMenuView(document.querySelector('.play_menu'));
const customisationView = new CustomisationView(document.querySelector('.waiting_room'));
const waitingRoomView = new WaitingRoomView(document.querySelector('.waiting_room'));
const mainGameView = new WaitingRoomView(document.querySelector('.main_game'));
const routes = [
	{ path: '/main_menu', view: mainMenuView},
	{ path: '/play_menu', view: playMenuView},
	{ path: '/waiting_room', view: waitingRoomView},
	{ path: '/customisation', view: customisationView},
	{ path: '/main_game', view: mainGameView},
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

Renderer.render();
gameArea.start();
