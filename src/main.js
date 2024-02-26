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

document.querySelector('.playButton').addEventListener('click', () => displayGame());
document.querySelector('.optionsButton').addEventListener('click', () => displayOptions());
document.querySelector('.creditsButton').addEventListener('click', () => displayCredits());

function displayOptions(){
    document.querySelector('.menu').innerHTML = optionsMenu;
    const retourButton = document.querySelector('.retour');
    retourButton.addEventListener('click', () => displayMenu());
}

function displayCredits(){
    document.querySelector('.menu').innerHTML = creditsMenu;
    const retourButton = document.querySelector('.retour');
    retourButton.addEventListener('click', () => displayMenu());
}

function displayMenu(){
    document.querySelector('.menu').innerHTML = mainMenu;
    document.querySelector('.playButton').addEventListener('click', () => displayGame());
    document.querySelector('.optionsButton').addEventListener('click', () => displayOptions());
    document.querySelector('.creditsButton').addEventListener('click', () => displayCredits());
}

function displayGame(){
    document.querySelector('body').innerHTML = gameCanvas;
}