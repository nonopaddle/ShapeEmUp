import { MouseControls } from './controller/MouseControls.js';
import { difficulty } from './Difficulty.js';
import { PlayerEntity } from './entity/PlayerEntity.js';
import { SpawnerEntity } from './entity/SpawnerEntity.js';
import { MainMenuView } from './view/views/MainMenuView.js';
import { PlayMenuView } from './view/views/PlayMenuView.js';
import { WaitingRoomView } from './view/views/WaitingRoomView.js';
import { Renderer } from './view/rendering/Renderer.js';
import { Router } from './view/views/Router.js';
import { ScoresView } from './view/views/ScoresView.js';
import { CreditsView } from './view/views/CreditsView.js';
import { MainGameView } from './view/views/MainGameView.js';
import { LoginView } from './view/views/LoginView.js';
import { PlayerEntity } from './entity/PlayerEntity.js';
import { MonsterEntity } from './entity/MonsterEntity.js';
import gameArea from './GameArea.js';
import { randInt } from './math/MathUtils.js';
import { Renderer } from './view/Renderer.js';
import { WeaponEntity } from './entity/WeaponEntity.js';
import { weaponList } from './weapons/WeaponList.js';

const mainMenu = `<div class="menu">
    <button class="playButton">Jouer</button>
    <button class="optionsButton">Options</button>
    <button class="creditsButton">Crédits</button>
</div>`;
const optionsMenu = `<div class="menu">
    <h3>Options</h3>
    <button class="retour">Menu principal</button>
</div>`;
const creditsMenu = `<div class="menu">
    <h3>Crédits</h3>
    <button class="retour">Menu principal</button>
</div>`;

const gameCanvas = `<canvas id="gameCanvas" width="800" height="600"></canvas>`;

document
	.querySelector('.playButton')
	.addEventListener('click', () => displayGame());
document
	.querySelector('.optionsButton')
	.addEventListener('click', () => displayOptions());
document
	.querySelector('.creditsButton')
	.addEventListener('click', () => displayCredits());

function displayOptions() {
	document.querySelector('.menu').innerHTML = optionsMenu;
	const retourButton = document.querySelector('.retour');
	retourButton.addEventListener('click', () => displayMenu());
}

function displayCredits() {
	document.querySelector('.menu').innerHTML = creditsMenu;
	const retourButton = document.querySelector('.retour');
	retourButton.addEventListener('click', () => displayMenu());
}

function displayMenu() {
	document.querySelector('.menu').innerHTML = mainMenu;
	document
		.querySelector('.playButton')
		.addEventListener('click', () => displayGame());
	document
		.querySelector('.optionsButton')
		.addEventListener('click', () => displayOptions());
	document
		.querySelector('.creditsButton')
		.addEventListener('click', () => displayCredits());
}

function displayGame() {
	document.querySelector('body').innerHTML = gameCanvas;
}

sessionStorage.setItem('nickname', 'nono');
const loginView = new LoginView(document.querySelector('.login'));
const mainMenuView = new MainMenuView(document.querySelector('.main-menu'));
const playMenuView = new PlayMenuView(document.querySelector('.play-menu'));
const waitingRoomView = new WaitingRoomView(
	document.querySelector('.waiting-room')
);
const mainGameView = new MainGameView(document.querySelector('.main-game'));
const scoresView = new ScoresView(document.querySelector('.scores'));
const creditsView = new CreditsView(document.querySelector('.credits'));
const routes = [
	{ path: '/login', view: loginView },
	{ path: '/main-menu', view: mainMenuView },
	{ path: '/play-menu', view: playMenuView },
	{ path: '/waiting-room', view: waitingRoomView },
	{ path: '/main-game', view: mainGameView },
	{ path: '/scores', view: scoresView },
	{ path: '/credits', view: creditsView },
];

Router.routes = routes;
Router.navigate('/login');

const canvas = document.querySelector('.canvas');
//export const gameArea = new GameArea(document);
//export const gameArea = GameArea;
Renderer.set_canvas(canvas);
MouseControls.set_canvas(canvas);

const playerD = {
	pos: { x: 900, y: 450 },
	size: { x: 100, y: 100 },
	default_hp: 500,
	color: 'yellow',
};

export const player = new PlayerEntity(playerD);

gameArea.add_entity(player);

gameArea.add_entity(new WeaponEntity(750, 450, weaponList.gun));
gameArea.add_entity(new WeaponEntity(650, 450, weaponList.bigGun));
gameArea.add_entity(new WeaponEntity(550, 450, weaponList.laser));
gameArea.add_entity(new WeaponEntity(450, 450, weaponList.zone));

gameArea.add_entity(
	new SpawnerEntity({
		pos: { x: 25, y: 25 },
		size: { x: 10, y: 10 },
		default_hp: 50,
		speedMult: randInt(1, 3),
		damage: 5,
		color: 'red',
		difficulty: difficulty.hard,
	})
);
gameArea.add_entity(
	new SpawnerEntity({
		pos: { x: 1890, y: 25 },
		size: { x: 10, y: 10 },
		default_hp: 50,
		speedMult: randInt(1, 3),
		damage: 5,
		color: 'red',
		difficulty: difficulty.hard,
	})
);
gameArea.add_entity(
	new SpawnerEntity({
		pos: { x: 25, y: 940 },
		size: { x: 10, y: 10 },
		default_hp: 50,
		speedMult: randInt(1, 3),
		damage: 5,
		color: 'red',
		difficulty: difficulty.hard,
	})
);
gameArea.add_entity(
	new SpawnerEntity({
		pos: { x: 1890, y: 940 },
		size: { x: 10, y: 10 },
		default_hp: 50,
		speedMult: randInt(1, 3),
		damage: 5,
		color: 'red',
		difficulty: difficulty.hard,
	})
);

Renderer.start_rendering();
gameArea.start_loop();
