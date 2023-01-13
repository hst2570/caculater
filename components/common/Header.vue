<template>
    <div class="header">
        <div class="nav" @click.stop.prevent="toggleNav">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </div>
        <CommonNav :open="openNav" />
        <h1>어버버 {{ title }}</h1>
    </div>
</template>
<script setup>
    const props = defineProps({
        title: {
            type: String,
            default: '계산기'
        }
    });
    const openNav = ref(false);
    const toggleNav = (e) => {
        const target = e?.target?.classList?.contains('navBox');

        if (openNav.value && target) {
            return;
        }

        openNav.value = !openNav.value;
    };
</script>
<style scoped>
    .header {
        @apply flex flex-row items-center py-[4px] pr-[8px] pl-[10px] gap-[8px] h-[48px]  w-[100%] z-[1] top-0;
    }

    .header h1 {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 26px;
        font-family: 'Pretendard';
    }
</style>
