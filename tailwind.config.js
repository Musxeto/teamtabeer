/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                tealPrimary: '#336b6a',
                tealSecondary: '#477a79',
            },
        },
    },
    plugins: [],
}