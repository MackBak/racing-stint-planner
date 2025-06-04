/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                racing: {
                    primary: '#1a365d',
                    secondary: '#2d3748',
                    accent: '#3182ce',
                    warning: '#e53e3e',
                    success: '#38a169'
                }
            }
        },
    },
    plugins: [],
}