import gameArea from './GameArea.js';
import { MouseControls } from './controller/MouseControls.js';
import { MonsterEntity } from './entity/MonsterEntity.js';
import { PlayerEntity } from './entity/PlayerEntity.js';
import { randInt } from './math/MathUtils.js';
import { Renderer } from './view/Renderer.js';

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

const canvas = document.querySelector('.canvas');
//export const gameArea = new GameArea(document);
//export const gameArea = GameArea;
Renderer.set_canvas(canvas);
MouseControls.set_canvas(canvas);

const d1 = {
	pos: { x: 200, y: 300 },
	size: { x: 100, y: 100 },
	default_hp: 1,
	color: 'yellow',
};

export const player = new PlayerEntity(d1);

gameArea.add_entity(player);
//gameArea.add_entity(new MonsterEntity(d2));
//gameArea.add_entity(new MonsterEntity(d3));

for (let i = 0; i < 25; i++) {
	gameArea.add_entity(
		new MonsterEntity({
			pos: { x: randInt(400, 1920), y: randInt(0, 1080) },
			size: { x: 25, y: 25 },
			default_hp: 1,
			speedMult: randInt(1, 3),
			color: 'red',
		})
	);
}

Renderer.render();
gameArea.start();
