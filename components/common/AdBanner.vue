<template>
    <ins
        class="adsbygoogle"
        style="display: block"
        data-ad-client="ca-pub-7317249562412325"
        data-ad-slot="6016633494"
        data-ad-format="auto"
        data-full-width-responsive="true"
    ></ins>
</template>
<script setup>
    const url = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7317249562412325';

    useHead({
        script: [{ async: true, crossorigin: 'anonymous', src: url }]
    });

    onMounted(() => {
        try {
            window.onload = function () {
                (adsbygoogle = window.adsbygoogle || []).push({});
            };
        } catch (e) {
            console.log(e);
        }
    });
</script>
<style scoped>
    .adsbygoogle {
        width: 100%;
        @apply mt-[50px];
    }
</style>
