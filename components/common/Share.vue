<template>
    <button class="share" @click="share">공유하기</button>
</template>
<script setup>
    const props = defineProps({
        title: {
            type: String,
            default: '계산기'
        },
        text: {
            type: String,
            default: '계산해보세요'
        }
    });

    const share = () => {
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: props.title,
                text: props.text,
                url: document.location.href
            });
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                alert('URL이 복사되었습니다.');
            });
        }
    };
</script>
<style scoped>
    .share {
        border-width: 1px;
        border-radius: 8px;
        padding: 5px;
        font-size: 12px;
    }
</style>
