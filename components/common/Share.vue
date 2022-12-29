<template>
    <button class="share" @click="share">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="shareIcon">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
            />
        </svg>

        공유하기
    </button>
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

    .shareIcon {
        @apply inline-block h-[12px] w-[12px];
    }
</style>
