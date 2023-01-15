<template>
    <div v-if="isOpen" class="navContainer">
        <ul class="navBox">
            <li><CommonAnchor class="navItem" text="롤 타임라인" to="/lol" /></li>
            <li><CommonAnchor class="navItem" text="D-day 계산기" to="/d-day" /></li>
            <li><CommonAnchor class="navItem" text="날짜 계산기" to="/date" /></li>
        </ul>
    </div>
</template>
<script setup>
    const props = defineProps({
        open: {
            type: Boolean,
            default: false
        }
    });
    const deviceHeight = ref();
    const isOpen = ref(false);

    watchEffect(() => {
        if (props.open) {
            isOpen.value = true;
        } else {
            isOpen.value = false;
        }
    });

    onMounted(() => {
        deviceHeight.value = window.innerHeight;
    });
</script>
<style scoped>
    .navContainer {
        background-color: rgba(0, 0, 0, 0.2);
        height: calc(100% - 48px);
        @apply absolute top-[48px] left-0  w-full z-[10] overflow-hidden;
    }

    .navBox {
        @apply bg-white h-full w-[280px] pt-[20px] px-[20px] flex flex-col gap-[12px] border-t border-grey-600 border-r;
    }

    .navBox li {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 26px;
        font-family: 'Pretendard';

        @apply border-b p-[5px] text-black;
    }

    .navItem {
        @apply w-full h-full block;
    }
</style>
