import $ from 'jquery';

export class Router {
	static #currentPage;
	static routes;
	static titleElement;
	static menuElement;
	static navigate(path) {
		if (path == null) return;
		if (path == this.#currentPage) return;
		this.routes.forEach(element => element.view.hide());
		const element = this.routes.find(element => element.path == path);
		element.view.show();
		this.#currentPage = path;
	}
}

export function handleMenuLinkClick(event) {
	event.preventDefault();
	Router.navigate($(event.target).attr('href'));
}
