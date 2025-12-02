/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}"
	],
	theme: {
		extend: {
			keyframes: {
				"fade-in": {
					"0%": { opacity: 0, transform: "scale(0.5)" },
					"100%": { opacity: 1, transform: "scale(1)" },
				},
				"fade-pulse": {
					"0%, 100%": { opacity: 0, transform: "scale(0.8)" },
					"50%": { opacity: 1, transform: "scale(1)" },
				},
			},
			animation: {
				"fade-in": "fade-in 0.4s ease-out forwards",
				"fade-in-pulse": "fade-in 0.4s ease-out forwards, pulse 2s ease-in-out 0.4s infinite",
				"fade-pulse": "fade-pulse 1.5s ease-in-out infinite",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
}
