export class Action {
	constructor(label, funct) {
		if (funct === null || typeof funct !== 'function') {
			throw new Error('funct doit être une fonction !');
		}
		if (funct.length !== 2) {
			throw new Error('La fonction doit avoir deux arguments !');
		}
		if (label === null || typeof label !== 'string' || label === '') {
			throw new Error(
				'Le label doit être une chaîne de caractères non nulle !'
			);
		}
		this.label = label;
		this.funct = funct;
	}

	call(source, target) {
		this.funct(source, target);
	}
}
