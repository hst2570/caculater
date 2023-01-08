/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./assets/css/**/*.css', './components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './nuxt.config.{js,ts}', './app.vue'],
    theme: {
        extend: {
            colors: {
                grey: {
                    50: '#f8f9fc',
                    100: '#f3f6fb',
                    200: '#e1e6ec',
                    300: '#d6dbe1',
                    400: '#b9c1c9',
                    500: '#808892',
                    600: '#565c63',
                    700: '#343a3f',
                    800: '#21272a',
                    900: '#121619'
                },
                'custom-blue': '#2E517D',
                'custom-green': '#00BF6F'
            },
            fontFamily: {
                pre: 'Pretendard'
            }
        }
    },
    plugins: []
};
