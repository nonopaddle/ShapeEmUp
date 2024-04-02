import { MouseControls } from './controller/MouseControls.js';
import { MainMenuView } from './view/views/MainMenuView.js';
import { WaitingRoomView } from './view/views/WaitingRoomView.js';
import { Renderer } from './view/rendering/Renderer.js';
import { Router } from './view/views/Router.js';
import { ScoresView } from './view/views/ScoresView.js';
import { CreditsView } from './view/views/CreditsView.js';
import { MainGameView } from './view/views/MainGameView.js';
import { LoginView } from './view/views/LoginView.js';

const loginView = new LoginView(document.querySelector('.login'));
const mainMenuView = new MainMenuView(document.querySelector('.main-menu'));
const waitingRoomView = new WaitingRoomView(
	document.querySelector('.waiting-room')
);
const mainGameView = new MainGameView(document.querySelector('.main-game'));
const scoresView = new ScoresView(document.querySelector('.scores'));
const creditsView = new CreditsView(document.querySelector('.credits'));
const routes = [
	{ path: '/login', view: loginView },
	{ path: '/main-menu', view: mainMenuView },
	{ path: '/waiting-room', view: waitingRoomView },
	{ path: '/main-game', view: mainGameView },
	{ path: '/scores', view: scoresView },
	{ path: '/credits', view: creditsView },
];

Router.routes = routes;
Router.navigate('/login');

const canvas = document.querySelector('.canvas');
Renderer.set_canvas(canvas);
MouseControls.init(canvas);
