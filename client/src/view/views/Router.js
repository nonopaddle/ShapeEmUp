export class Router {
	static routes;
	static titleElement;
	static menuElement;
	static navigate(path) {
		this.routes.forEach(element => element.view.hide());
		const element = this.routes.find(element => element.path == path);
		console.log(element);
		element.view.show();
	}

	static setMenuElement(element) {
		this.menuElement = element;
		// on écoute le clic sur tous les liens du menu
		const menuLinks = this.menuElement.querySelectorAll('a');
		menuLinks.forEach(link =>
			link.addEventListener('click', event => handleMenuLinkClick(event))
		);
	}
}

/* TP2 / C.3. Navigation en JS : le menu */
/**
 * Fonction déclenchée au clic sur les liens du menu
 * Permet de mettre à jour le titre de la page (.viewTitle)
 * et d'afficher la vue correspondante (.viewContent)
 * @param {Event} event
 */
export function handleMenuLinkClick(event) {
	event.preventDefault();

	/* C.3.3. Activer le lien cliqué*/
	const previousMenuLink = document.querySelector('.mainMenu a.active'),
		newMenuLink = event.currentTarget;
	previousMenuLink.classList.remove('active'); // on retire la classe "active" du précédent menu
	newMenuLink.classList.add('active'); // on ajoute la classe CSS "active" sur le nouveau lien

	/* C.3.4. Afficher la bonne vue 
	const linkHref = event.currentTarget.getAttribute('href');
	// console.log(linkHref);
	const cssClass = linkHref === '/' ? '.gameList' : linkHref.replace('/', '.');
	const previousView = document.querySelector('.viewContent .active'),
		newView = document.querySelector(`.viewContent ${cssClass}`);
	previousView.classList.remove('active');
	newView.classList.add('active');*/
	Router.navigate(event.target.getAttribute('href'));
}
