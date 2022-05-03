module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1440px',
        },
        fontFamily: {
            roboto: ['Roboto', 'sans-serif'],
            playfair: ['Playfair Display', 'sans-serif'],
            leckerli: ['Leckerli One', 'cursive'],
        },
    },
    plugins: [require('@tailwindcss/aspect-ratio')],
}
