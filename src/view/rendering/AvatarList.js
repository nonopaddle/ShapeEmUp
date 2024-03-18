export const avatarsList = [
	{
		label: 'blue_square',
		draw: (ctx, origin, scale) => {
			const size = 50 * scale;
			ctx.fillStyle = 'lightblue';
			ctx.strokeStyle = 'paleturquoise';
			ctx.lineWidth = 4;
			ctx.beginPath();
			ctx.fillRect(origin.x - size / 2, origin.y - size / 2, size, size);
			ctx.strokeRect(origin.x - size / 2, origin.y - size / 2, size, size);
			ctx.closePath();
		},
		selectedBy: null
	},
	{
		label: 'green_circle',
		draw: (ctx, origin, scale) => {
			const radius = 25 * scale;
			ctx.fillStyle = 'lightgreen';
			ctx.strokeStyle = 'palegreen';
			ctx.lineWidth = 4;
			ctx.beginPath();
			ctx.arc(origin.x, origin.y, radius, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
		},
		selectedBy: null
	},
	{
		label: 'orange_triangle',
		draw: (ctx, origin, scale) => {
			const size = 50 * scale;
			const h = size * (Math.sqrt(3) / 2);
			ctx.fillStyle = 'gold';
			ctx.strokeStyle = 'khaki';
			ctx.lineWidth = 4;
			ctx.save();
			ctx.translate(origin.x, origin.y);
			ctx.beginPath();
			ctx.moveTo(0, -h / 2);
			ctx.lineTo(-size / 2, h / 2);
			ctx.lineTo(size / 2, h / 2);
			ctx.lineTo(0, -h / 2);
			ctx.fill();
			ctx.stroke();
			ctx.resetTransform();
			ctx.closePath();
			ctx.save();
		},
		selectedBy: null
	},
	{
		label: 'red_pentagone',
		draw: (ctx, origin, scale) => {
			const size = 25 * scale;
			const angle = (2 * Math.PI) / 5;
			ctx.fillStyle = 'lightpink';
			ctx.strokeStyle = 'mistyrose';
			ctx.lineWidth = 4;
			ctx.save();
			ctx.beginPath();
			ctx.translate(origin.x, origin.y);
			ctx.rotate(-Math.PI / 2);
			ctx.moveTo(size, 0);
			for (let i = 1; i <= 5; i++) {
				ctx.lineTo(size * Math.cos(i * angle), size * Math.sin(i * angle));
			}
			ctx.rotate(Math.PI / 2);
			ctx.resetTransform();
			ctx.fill();
			ctx.stroke();
			ctx.closePath();
			ctx.save();
		},
		selectedBy: null
	},
];
