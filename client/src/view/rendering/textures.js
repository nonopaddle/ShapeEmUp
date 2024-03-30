export const avatarsList = {
	square: {
		color: 'lightblue',
		owner: null,
		draw: (ctx, origin, scale) => {
			const radius = scale;
			ctx.fillStyle = avatarsList.square.color;
			ctx.beginPath();
			ctx.fillRect(
				origin.x - radius,
				origin.y - radius,
				radius * 2,
				radius * 2
			);
			ctx.closePath();
		},
	},
	circle: {
		color: 'lightgreen',
		owner: null,
		draw: (ctx, origin, scale) => {
			const radius = scale;
			ctx.fillStyle = avatarsList.circle.color;
			ctx.beginPath();
			ctx.arc(origin.x, origin.y, radius, 0, Math.PI * 2);
			ctx.fill();
			ctx.closePath();
		},
	},
	triangle: {
		color: 'gold',
		owner: null,
		nbSides: 3,
		draw: (ctx, origin, scale) => {
			const radius = scale;
			const angle = (2 * Math.PI) / avatarsList.triangle.nbSides;
			ctx.fillStyle = avatarsList.triangle.color;
			ctx.save();
			ctx.beginPath();
			ctx.translate(origin.x, origin.y);
			ctx.rotate(-Math.PI / 2);
			ctx.moveTo(radius, 0);
			for (let i = 1; i <= avatarsList.triangle.nbSides + 1; i++) {
				ctx.lineTo(radius * Math.cos(i * angle), radius * Math.sin(i * angle));
			}
			ctx.rotate(Math.PI / 2);
			ctx.resetTransform();
			ctx.fill();
			ctx.closePath();
			ctx.save();
		},
	},
	pentagon: {
		color: 'lightpink',
		owner: null,
		nbSides: 5,
		draw: (ctx, origin, scale) => {
			const radius = scale;
			const angle = (2 * Math.PI) / avatarsList.pentagon.nbSides;
			ctx.fillStyle = avatarsList.pentagon.color;
			ctx.save();
			ctx.beginPath();
			ctx.translate(origin.x, origin.y);
			ctx.rotate(-Math.PI / 2);
			ctx.moveTo(radius, 0);
			for (let i = 1; i <= avatarsList.pentagon.nbSides + 1; i++) {
				ctx.lineTo(radius * Math.cos(i * angle), radius * Math.sin(i * angle));
			}
			ctx.rotate(Math.PI / 2);
			ctx.resetTransform();
			ctx.fill();
			ctx.closePath();
			ctx.save();
		},
	},
};

export const weapons = {
	color: 'white',
	gun: {
		nbSides: 6,
		draw: (ctx, origin, scale) => {
			const radius = scale;
			const angle = (2 * Math.PI) / weapons.gun.nbSides;
			ctx.strokeStyle = weapons.color;
			ctx.lineWidth = 0.2 * scale;
			ctx.save();
			ctx.beginPath();
			ctx.translate(origin.x, origin.y);
			ctx.rotate(-Math.PI / 2);
			ctx.moveTo(radius, 0);
			for (let i = 1; i <= weapons.gun.nbSides + 1; i++) {
				ctx.lineTo(radius * Math.cos(i * angle), radius * Math.sin(i * angle));
			}
			ctx.rotate(Math.PI / 2);
			ctx.resetTransform();
			ctx.stroke();
			ctx.closePath();
			ctx.save();
		},
	},
	bigGun: {
		nbSides: 8,
		draw: (ctx, origin, scale) => {
			const radius = scale;
			const angle = (2 * Math.PI) / weapons.bigGun.nbSides;
			ctx.strokeStyle = weapons.color;
			ctx.lineWidth = 0.2 * scale;
			ctx.save();
			ctx.beginPath();
			ctx.translate(origin.x, origin.y);
			ctx.rotate(-Math.PI / 2);
			ctx.moveTo(radius, 0);
			for (let i = 1; i <= weapons.bigGun.nbSides + 1; i++) {
				ctx.lineTo(radius * Math.cos(i * angle), radius * Math.sin(i * angle));
			}
			ctx.rotate(Math.PI / 2);
			ctx.resetTransform();
			ctx.stroke();
			ctx.closePath();
			ctx.save();
		},
	},
	zone: {
		draw: (ctx, origin, scale) => {
			const radius = scale;
			ctx.strokeStyle = weapons.color;
			ctx.lineWidth = 0.2 * scale;
			ctx.beginPath();
			ctx.arc(origin.x, origin.y, radius, 0, Math.PI * 2);
			ctx.stroke();
			ctx.closePath();
		},
	},
	laser: {
		nbSides: 3,
		draw: (ctx, origin, scale) => {
			const radius = scale;
			const angle = (2 * Math.PI) / weapons.laser.nbSides;
			ctx.strokeStyle = weapons.color;
			ctx.lineWidth = 0.2 * scale;
			ctx.save();
			ctx.beginPath();
			ctx.translate(origin.x, origin.y);
			ctx.rotate(-Math.PI / 2);
			ctx.moveTo(radius, 0);
			for (let i = 1; i <= weapons.laser.nbSides + 1; i++) {
				ctx.lineTo(radius * Math.cos(i * angle), radius * Math.sin(i * angle));
			}
			ctx.rotate(Math.PI / 2);
			ctx.resetTransform();
			ctx.stroke();
			ctx.closePath();
			ctx.save();
		},
	},
};

export const bulletsList = {
	gun_bullet: {
		draw: (ctx, origin, scale, color) => {
			const radius = scale;
			const angle = (2 * Math.PI) / weapons.gun.nbSides;
			ctx.fillStyle = color;
			ctx.lineWidth = 0.1 * scale;
			ctx.save();
			ctx.beginPath();
			ctx.translate(origin.x, origin.y);
			ctx.moveTo(radius, 0);
			for (let i = 1; i <= weapons.gun.nbSides; i++) {
				ctx.lineTo(radius * Math.cos(i * angle), radius * Math.sin(i * angle));
			}
			ctx.resetTransform();
			ctx.fill();
			ctx.closePath();
			ctx.save();
		},
	},
	bigGun_bullet: {
		draw: (ctx, origin, scale, color) => {
			const radius = scale;
			const angle = (2 * Math.PI) / weapons.bigGun.nbSides;
			ctx.fillStyle = color;
			ctx.lineWidth = 0.1 * scale;
			ctx.save();
			ctx.beginPath();
			ctx.translate(origin.x, origin.y);
			ctx.moveTo(radius, 0);
			for (let i = 1; i <= weapons.bigGun.nbSides; i++) {
				ctx.lineTo(radius * Math.cos(i * angle), radius * Math.sin(i * angle));
			}
			ctx.resetTransform();
			ctx.fill();
			ctx.closePath();
			ctx.save();
		},
	},
	zone_bullet: {
		draw: (ctx, origin, scale, color) => {
			const radius = scale;
			ctx.strokeStyle = color;
			ctx.lineWidth = 0.04 * scale;
			ctx.save();
			ctx.beginPath();
			ctx.arc(origin.x, origin.y, radius, 0, Math.PI * 2);
			ctx.stroke();
			ctx.resetTransform();
			ctx.closePath();
			ctx.save();
		},
	},
	laser_bullet: {
		draw: (ctx, origin, scale, color) => {
			const radius = scale;
			const angle = (2 * Math.PI) / weapons.laser.nbSides;
			ctx.fillStyle = color;
			ctx.lineWidth = 0.1 * scale;
			ctx.save();
			ctx.beginPath();
			ctx.translate(origin.x, origin.y);
			ctx.moveTo(radius, 0);
			for (let i = 1; i <= weapons.laser.nbSides; i++) {
				ctx.lineTo(radius * Math.cos(i * angle), radius * Math.sin(i * angle));
			}
			ctx.resetTransform();
			ctx.fill();
			ctx.closePath();
			ctx.save();
		},
	},
};
