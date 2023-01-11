<script setup>
    useHead({
        title: '날짜 계산기',
        meta: [
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: '날짜 계산을 해보세요.'
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
        script: [{ async: true, crossorigin: 'anonymous', src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7317249562412325' }]
    });
</script>

<template>
    <NuxtLayout>
        <!-- <NuxtLoadingIndicator /> -->
        <NuxtPage />
    </NuxtLayout>
</template>
<style>
    .page-enter-active,
    .page-leave-active {
        transition: all 0.4s;
    }
    .page-enter-from,
    .page-leave-to {
        opacity: 0;
        filter: blur(1rem);
    }
</style>
