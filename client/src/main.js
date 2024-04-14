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
import $ from 'jquery';

const routes = [
	{
		path: '/main-menu',
		view: new MainMenuView($('.main-menu')),
	},
	{
		path: '/waiting-room',
		view: new WaitingRoomView($('.waiting-room')),
	},
	{
		path: '/main-game',
		view: new MainGameView($('.main-game')),
	},
	{
		path: '/end-screen',
		view: new EndScreenView($('.end-screen')),
	},
	{
		path: '/scores',
		view: new ScoresView($('.scores')),
	},
	{
		path: '/credits',
		view: new CreditsView($('.credits')),
	},
	{
		path: '/login',
		view: new LoginView($('.login')),
	},
];

Router.routes = routes;

const alreadyConnected = sessionStorage.getItem('nickname') != undefined;
Router.navigate(alreadyConnected ? '/main-menu' : '/login');

const canvas = document.querySelector('.canvas');
Renderer.set_canvas(canvas);
MouseControls.init(canvas);
