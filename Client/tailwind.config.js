/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: 'jit',
	corePlugins: {
		preflight: false,
	},
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
		"./public/index.html",
	],
	theme: {
		extend: {
			backgroundOpacity: {
			'10': '0.1',
			'20': '0.2',
			'95': '0.95',
		   }},
		colors: {
            red: "#ff0000",
            yellow: "#ffc93c",
			beige: '#EBCBAE',
            beigeLight: '#ffcab0',
            black: {
                500: '#111111',
                600: '#555'
            },
            grey: {
                200: '#f2f2f2',
                300: '#9ba6a5',
                400: '#757a79',
                500: '#5f6769'
            },
            darkGreen: '#023020',
			blue: {
                200: "#00bbf0",
                300: '#53a8b6',
				500: '#3490dc',
				600: '#2779bd',
                700: '#000080'
			},
		},
	},
	plugins: [
        require('@tailwindcss/forms')
    ],
};
