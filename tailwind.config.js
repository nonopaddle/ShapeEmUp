/** @type {import('tailwindcss').Config} */
export default {
	content: ['./client/**/*.{html,js}'],
	theme: {
		colors: {
			darkpurple: '#22162B',
			purple: '#451F55',
			lightpurple: '#724E91',
			darkred: '#801a2e',
			red: '#a7253f',
			pink: '#E54F6D',
			yellow: '#F8C630',
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
		},
	},
	plugins: [],
};
