export default defineNuxtConfig({
    typescript: {
        strict: true,
        typeCheck: true
    },
    app: {
        pageTransition: { name: 'page', mode: 'out-in' }
    },
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {}
        }
    },
    modules: [
        [
            '@pinia/nuxt',
            {
                autoImports: ['defineStore']
            }
        ]
    ],
    ssr: false,
    nitro: {
        prerender: {
            routes: ['/d-day', '/date']
        }
    }
});
