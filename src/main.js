import gameArea from './GameArea.js';
import { MouseControls } from './controller/MouseControls.js';
import { PlayerEntity } from './entity/PlayerEntity.js';
import { MainMenuView } from './view/views/MainMenuView.js';
import { PlayMenuView } from './view/views/PlayMenuView.js';
import { WaitingRoomView } from './view/views/WaitingRoomView.js';
import { Renderer } from './view/rendering/Renderer.js';
import { Router } from './view/views/Router.js';
import { ScoresView } from './view/views/ScoresView.js';
import { CreditsView } from './view/views/CreditsView.js';
import { MainGameView } from './view/views/MainGameView.js';

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

export const userName = // récupère le nom de l'utilisateur
	// soit en sessionStorage
	sessionStorage.getItem('userName') ||
	// soit depuis la popup de prompt
	window.prompt('veuillez entrer votre nom', '');


const canvas = document.querySelector('.canvas');
//export const gameArea = new GameArea(document);
//export const gameArea = GameArea;
Renderer.set_canvas(canvas);
MouseControls.set_canvas(canvas);

