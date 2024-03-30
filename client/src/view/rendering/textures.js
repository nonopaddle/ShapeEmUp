export const avatarsList = [
	{
		label: 'blue_square',
		owner: null,
		draw: (ctx, origin, scale) => {
			const radius = scale;
			ctx.fillStyle = 'lightblue';
			ctx.strokeStyle = 'paleturquoise';
			ctx.lineWidth = 0.1 * scale;
			ctx.beginPath();
			ctx.fillRect(
				origin.x - radius,
				origin.y - radius,
				radius * 2,
				radius * 2
			);
			ctx.strokeRect(
				origin.x - radius,
				origin.y - radius,
				radius * 2,
				radius * 2
			);
			ctx.closePath();
		},
	},
	{
		label: 'green_circle',
		owner: null,
		draw: (ctx, origin, scale) => {
			const radius = scale;
			ctx.fillStyle = 'lightgreen';
			ctx.strokeStyle = 'palegreen';
			ctx.lineWidth = 0.1 * scale;
			ctx.beginPath();
			ctx.arc(origin.x, origin.y, radius, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
		},
	},
	{
		label: 'orange_triangle',
		owner: null,
		draw: (ctx, origin, scale) => {
			const radius = scale * 2;
			const h = radius * (Math.sqrt(3) / 2);
			ctx.fillStyle = 'gold';
			ctx.strokeStyle = 'khaki';
			ctx.lineWidth = 0.1 * scale;
			ctx.save();
			ctx.translate(origin.x, origin.y);
			ctx.beginPath();
			ctx.moveTo(0, -h / 2);
			ctx.lineTo(-radius / 2, h / 2);
			ctx.lineTo(radius / 2, h / 2);
			ctx.lineTo(0, -h / 2);
			ctx.fill();
			ctx.stroke();
			ctx.resetTransform();
			ctx.closePath();
			ctx.save();
		},
	},
	{
		label: 'red_pentagon',
		owner: null,
		draw: (ctx, origin, scale) => {
			const radius = scale;
			const angle = (2 * Math.PI) / 5;
			ctx.fillStyle = 'lightpink';
			ctx.strokeStyle = 'mistyrose';
			ctx.lineWidth = 0.1 * scale;
			ctx.save();
			ctx.beginPath();
			ctx.translate(origin.x, origin.y);
			ctx.rotate(-Math.PI / 2);
			ctx.moveTo(radius, 0);
			for (let i = 1; i <= 5; i++) {
				ctx.lineTo(radius * Math.cos(i * angle), radius * Math.sin(i * angle));
			}
			ctx.rotate(Math.PI / 2);
			ctx.resetTransform();
			ctx.fill();
			ctx.stroke();
			ctx.closePath();
			ctx.save();
		},
	},
];

export const npcList = [
	{
		owner: 'gun',
		draw: (ctx, origin, scale) => {
			const radius = scale;
			const angle = (2 * Math.PI) / 8;
			ctx.fillStyle = 'orange';
			ctx.strokeStyle = 'gold';
			ctx.lineWidth = 0.1 * scale;
			ctx.save();
			ctx.beginPath();
			ctx.translate(origin.x, origin.y);
			ctx.rotate(-Math.PI / 2);
			ctx.moveTo(radius, 0);
			for (let i = 1; i <= 8; i++) {
				ctx.lineTo(radius * Math.cos(i * angle), radius * Math.sin(i * angle));
			}
			ctx.rotate(Math.PI / 2);
			ctx.resetTransform();
			ctx.fill();
			ctx.stroke();
			ctx.closePath();
			ctx.save();
		},
	},
	{
		owner: 'gun-bullet',
		draw: (ctx, origin, scale) => {
			const radius = scale;
			const angle = (2 * Math.PI) / 8;
			ctx.fillStyle = 'gold';
			ctx.strokeStyle = 'orange';
			ctx.lineWidth = 0.1 * scale;
			ctx.save();
			ctx.beginPath();
			ctx.translate(origin.x, origin.y);
			ctx.moveTo(radius, 0);
			for (let i = 1; i <= 8; i++) {
				ctx.lineTo(radius * Math.cos(i * angle), radius * Math.sin(i * angle));
			}
			ctx.resetTransform();
			ctx.fill();
			ctx.stroke();
			ctx.closePath();
			ctx.save();
		},
	},
];
