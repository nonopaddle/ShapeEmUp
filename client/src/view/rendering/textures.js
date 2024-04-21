function hpDisplay(ctx, radius, maxHP, HP) {
	const hpDisplayWidth = radius * 2 * 1.5 * (HP / maxHP);
	if (hpDisplayWidth <= 0) return;
	ctx.fillRect(-radius * 1.5, radius * 1.5, hpDisplayWidth, radius * 2 * 0.15);
}

function xpDisplay(ctx, radius, xp, level) {
	const xpDisplayWidth = radius * 2 * 1.5 * (xp.amount / xp.toLevelUp);
	if (xpDisplayWidth < 0) return;
	ctx.fillRect(
		-radius * 1.5,
		radius * 1.5 + radius * 2 * 0.15,
		xpDisplayWidth,
		radius * 2 * 0.15
	);
	ctx.fillText(level, -radius * 2.5, radius * 2 + radius * 2 * 0.15);
}

export const avatarsList = {
	square: {
		color: '#ef476f',
		owner: null,
		draw: (ctx, origin, radius, angle, maxHP, HP, stats) => {
			ctx.fillStyle = avatarsList.square.color;
			ctx.beginPath();

			ctx.translate(origin.x, origin.y);
			ctx.rotate(angle);
			ctx.fillRect(-radius, -radius, radius * 2, radius * 2);
			ctx.rotate(-angle);

			hpDisplay(ctx, radius, maxHP, HP);
			xpDisplay(ctx, radius, stats.xp, stats.level);
			ctx.translate(-origin.x, -origin.y);
			ctx.closePath();
		},
	},
	circle: {
		color: '#ffd166',
		owner: null,
		draw: (ctx, origin, radius, angle, maxHP, HP, stats) => {
			ctx.fillStyle = avatarsList.circle.color;
			ctx.beginPath();

			ctx.translate(origin.x, origin.y);
			ctx.arc(0, 0, radius, 0, Math.PI * 2);
			ctx.fill();

			hpDisplay(ctx, radius, maxHP, HP);
			xpDisplay(ctx, radius, stats.xp, stats.level);
			ctx.translate(-origin.x, -origin.y);
			ctx.closePath();
		},
	},
	triangle: {
		color: '#06d6a0',
		owner: null,
		nbSides: 3,
		draw: (ctx, origin, radius, angle, maxHP, HP, stats) => {
			ctx.fillStyle = avatarsList.triangle.color;
			ctx.beginPath();

			ctx.translate(origin.x, origin.y + 15);

			ctx.rotate(angle);
			ctx.moveTo(radius * 1.3, 0);
			for (let i = 0; i < avatarsList.triangle.nbSides; i++) {
				// calculate the rotation
				const rotation = ((Math.PI * 2) / avatarsList.triangle.nbSides) * i;

				// for the first point move to
				if (i === 0) {
					ctx.moveTo(
						radius * 1.3 * Math.cos(rotation),
						radius * 1.3 * Math.sin(rotation)
					);
				} else {
					// for the rest draw a line
					ctx.lineTo(
						radius * 1.3 * Math.cos(rotation),
						radius * 1.3 * Math.sin(rotation)
					);
				}
			}
			ctx.rotate(-angle);
			ctx.fill();

			hpDisplay(ctx, radius, maxHP, HP);
			xpDisplay(ctx, radius, stats.xp, stats.level);
			ctx.translate(-origin.x, -origin.y - 15);
			ctx.closePath();
		},
	},
	pentagon: {
		color: '#118ab2',
		owner: null,
		nbSides: 5,
		draw: (ctx, origin, radius, angle, maxHP, HP, stats) => {
			ctx.fillStyle = avatarsList.pentagon.color;
			ctx.beginPath();

			ctx.translate(origin.x, origin.y);

			ctx.rotate(angle);
			ctx.moveTo(radius * 1.3, 0);
			for (let i = 0; i < avatarsList.pentagon.nbSides; i++) {
				// calculate the rotation
				const rotation = ((Math.PI * 2) / avatarsList.pentagon.nbSides) * i;

				// for the first point move to
				if (i === 0) {
					ctx.moveTo(
						radius * 1.3 * Math.cos(rotation),
						radius * 1.3 * Math.sin(rotation)
					);
				} else {
					// for the rest draw a line
					ctx.lineTo(
						radius * 1.3 * Math.cos(rotation),
						radius * 1.3 * Math.sin(rotation)
					);
				}
			}
			ctx.rotate(-angle);
			ctx.fill();

			hpDisplay(ctx, radius, maxHP, HP);
			xpDisplay(ctx, radius, stats.xp, stats.level);
			ctx.translate(-origin.x, -origin.y);
			ctx.closePath();
		},
	},
};

export const weapons = {
	color: 'white',
	gun: {
		nbSides: 6,
		draw: (ctx, origin, radius) => {
			const alpha = (2 * Math.PI) / weapons.gun.nbSides;
			ctx.strokeStyle = weapons.color;
			ctx.lineWidth = 0.2 * radius;
			ctx.beginPath();
			ctx.translate(origin.x, origin.y);
			ctx.rotate(-Math.PI / 2);
			ctx.moveTo(radius, 0);
			for (let i = 1; i <= weapons.gun.nbSides + 1; i++) {
				ctx.lineTo(radius * Math.cos(i * alpha), radius * Math.sin(i * alpha));
			}
			ctx.rotate(Math.PI / 2);
			ctx.stroke();
			ctx.translate(-origin.x, -origin.y);
			ctx.closePath();
		},
	},
	bigGun: {
		nbSides: 8,
		draw: (ctx, origin, radius) => {
			const angle = (2 * Math.PI) / weapons.bigGun.nbSides;
			ctx.strokeStyle = weapons.color;
			ctx.lineWidth = 0.2 * radius;

			ctx.beginPath();
			ctx.translate(origin.x, origin.y);
			ctx.rotate(-Math.PI / 2);
			ctx.moveTo(radius, 0);
			for (let i = 1; i <= weapons.bigGun.nbSides + 1; i++) {
				ctx.lineTo(radius * Math.cos(i * angle), radius * Math.sin(i * angle));
			}
			ctx.rotate(Math.PI / 2);
			ctx.stroke();
			ctx.translate(-origin.x, -origin.y);
			ctx.closePath();
		},
	},
	zone: {
		draw: (ctx, origin, radius) => {
			ctx.strokeStyle = weapons.color;
			ctx.lineWidth = 0.2 * radius;

			ctx.beginPath();
			ctx.translate(origin.x, origin.y);
			ctx.arc(0, 0, radius, 0, Math.PI * 2);
			ctx.stroke();
			ctx.translate(-origin.x, -origin.y);
			ctx.closePath();
		},
	},
	laser: {
		nbSides: 3,
		draw: (ctx, origin, radius) => {
			const angle = (2 * Math.PI) / weapons.laser.nbSides;
			ctx.strokeStyle = weapons.color;
			ctx.lineWidth = 0.2 * radius;

			ctx.beginPath();
			ctx.translate(origin.x, origin.y);
			ctx.rotate(-Math.PI / 2);
			ctx.moveTo(radius, 0);
			for (let i = 1; i <= weapons.laser.nbSides + 1; i++) {
				ctx.lineTo(radius * Math.cos(i * angle), radius * Math.sin(i * angle));
			}
			ctx.rotate(Math.PI / 2);
			ctx.stroke();
			ctx.translate(-origin.x, -origin.y);
			ctx.closePath();
		},
	},
	superZone: {
		draw: (ctx, origin, radius) => {
			ctx.strokeStyle = weapons.color;
			ctx.lineWidth = 0.2 * radius;

			ctx.beginPath();
			ctx.translate(origin.x, origin.y);
			ctx.arc(0, 0, radius, 0, Math.PI * 2);
			ctx.stroke();
			ctx.translate(-origin.x, -origin.y);
			ctx.closePath();
		},
	},
};

export const bulletsList = {
	gun_bullet: {
		draw: (ctx, origin, radius, color) => {
			const angle = (2 * Math.PI) / weapons.gun.nbSides;
			ctx.fillStyle = color;
			ctx.lineWidth = 0.1 * radius;

			ctx.beginPath();

			ctx.translate(origin.x, origin.y);
			ctx.moveTo(radius, 0);
			for (let i = 1; i <= weapons.gun.nbSides; i++) {
				ctx.lineTo(radius * Math.cos(i * angle), radius * Math.sin(i * angle));
			}
			ctx.fill();
			ctx.translate(-origin.x, -origin.y);
			ctx.closePath();
		},
	},
	bigGun_bullet: {
		draw: (ctx, origin, radius, color) => {
			const angle = (2 * Math.PI) / weapons.bigGun.nbSides;
			ctx.fillStyle = color;
			ctx.lineWidth = 0.1 * radius;

			ctx.beginPath();

			ctx.translate(origin.x, origin.y);
			ctx.moveTo(radius, 0);
			for (let i = 1; i <= weapons.bigGun.nbSides; i++) {
				ctx.lineTo(radius * Math.cos(i * angle), radius * Math.sin(i * angle));
			}
			ctx.fill();
			ctx.translate(-origin.x, -origin.y);
			ctx.closePath();
		},
	},
	zone_bullet: {
		draw: (ctx, origin, radius, color) => {
			ctx.strokeStyle = color;
			ctx.lineWidth = 0.04 * radius;

			ctx.beginPath();
			ctx.translate(origin.x, origin.y);
			ctx.arc(0, 0, radius, 0, Math.PI * 2);
			ctx.stroke();
			ctx.translate(-origin.x, -origin.y);
			ctx.closePath();
		},
	},
	laser_bullet: {
		draw: (ctx, origin, radius, color) => {
			const angle = (2 * Math.PI) / weapons.laser.nbSides;
			ctx.fillStyle = color;
			ctx.lineWidth = 0.1 * radius;

			ctx.beginPath();

			ctx.translate(origin.x, origin.y);
			ctx.moveTo(radius, 0);
			for (let i = 1; i <= weapons.laser.nbSides; i++) {
				ctx.lineTo(radius * Math.cos(i * angle), radius * Math.sin(i * angle));
			}
			ctx.fill();
			ctx.translate(-origin.x, -origin.y);
			ctx.closePath();
		},
	},
	superZone_bullet: {
		draw: (ctx, origin, radius, color) => {
			ctx.strokeStyle = color;
			ctx.lineWidth = 0.04 * radius;

			ctx.beginPath();
			ctx.translate(origin.x, origin.y);

			ctx.arc(origin.x, origin.y, radius, 0, Math.PI * 2);
			ctx.stroke();
			ctx.translate(-origin.x, -origin.y);
			ctx.closePath();
		},
	},
};

export const monsters = {
	color: 'orangered',
	monster: {
		draw: (ctx, origin, radius, maxHP, HP, stats) => {
			ctx.fillStyle = monsters.color;
			ctx.beginPath();

			ctx.translate(origin.x, origin.y);
			ctx.fillRect(-radius, -radius, radius * 2, radius * 2);
			hpDisplay(ctx, radius, maxHP, HP);
			ctx.translate(-origin.x, -origin.y);
			ctx.closePath();
		},
	},
};
