/** @type {import('tailwindcss').Config} */
export default {
	content: ['./client/**/*.{html,js}'],
	theme: {
		colors: {
			richblack: '#001219',
			midnightgreen: '#005f73',
			darkdyan: '#a99396',
			tiffanyblue: '#94d2bd',
			vanilla: '#e9d8a6',
			gamboge: '#ee9b00',
			alloworange: '#ca6702',
			rust: '#bb3e03',
			rufous: 'ae2012',
			aubrun: '9b2226',
		},
		extend: {
			height: {
				76: '19rem',
			},
			transitionTimingFunction: {
				bouce: 'cubic-bezier(.39,1.79,.53,.62)',
				in: 'cubic-bezier(0,0,.5,1)',
			},
			keyframes: {
				wiggle: {
					'0%, 100%': { transform: 'rotate(-3deg)' },
					'50%': { transform: 'rotate(3deg)' },
				},
			},
			animation: {
				wiggle: 'wiggle 1s ease-in-out',
			},
			fontFamily: {
				kanit: ['Kanit', 'sans-serif'],
			},
		},
	},
	plugins: [],
};
