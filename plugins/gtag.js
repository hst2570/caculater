import vueGtag from 'vue-gtag';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(
        vueGtag,
        {
            config: {
                id: 'G-KXYZ7D031H'
            },
            appName: '계산기 - 어버버'
        },
        nuxtApp.$router
    );
});
