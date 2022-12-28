<template>
    <div class="header">
        <h1>{{ title }}</h1>
    </div>
</template>
<script setup>
    const props = defineProps({
        title: {
            type: String,
            default: '계산기'
        }
    });
</script>
<style scoped>
    .header {
        @apply flex flex-row items-center py-[4px] pr-[8px] pl-[20px] gap-[8px] bg-grey-700 h-[48px] absolute w-[100%] z-[1];
    }

    .header h1 {
        font-style: normal;
        font-weight: 700;
        font-size: 18px;
        line-height: 26px;
        font-family: 'Pretendard';
        color: #ffffff;
    }
</style>
