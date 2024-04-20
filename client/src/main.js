import { MouseControls } from './controller/MouseControls.js';
import { MainMenuView } from './view/views/MainMenuView.js';
import { WaitingRoomView } from './view/views/WaitingRoomView.js';
import { Renderer } from './view/rendering/Renderer.js';
import { Router } from './view/views/Router.js';
import { EndScreenView } from './view/views/EndScreenView.js';
import { ScoresView } from './view/views/ScoresView.js';
import { CreditsView } from './view/views/CreditsView.js';
import { MainGameView } from './view/views/MainGameView.js';
import { LoginView } from './view/views/LoginView.js';

const routes = [
	{
		path: '/main-menu',
		view: new MainMenuView(document.querySelector('.main-menu')),
	},
	{
		path: '/waiting-room',
		view: new WaitingRoomView(document.querySelector('.waiting-room')),
	},
	{
		path: '/main-game',
		view: new MainGameView(document.querySelector('.main-game')),
	},
	{
		path: '/end-screen',
		view: new EndScreenView(document.querySelector('.end-screen')),
	},
	{
		path: '/scores',
		view: new ScoresView(document.querySelector('.scores')),
	},
	{
		path: '/credits',
		view: new CreditsView(document.querySelector('.credits')),
	},
	{
		path: '/login',
		view: new LoginView(document.querySelector('.login')),
	},
];

Router.routes = routes;

const alreadyConnected = sessionStorage.getItem('nickname') != undefined;
Router.navigate(alreadyConnected ? '/scores' : '/login');

const canvas = document.querySelector('.canvas');
Renderer.set_canvas(canvas);
MouseControls.init(canvas);
