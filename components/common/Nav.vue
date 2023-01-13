<template>
    <div v-if="isOpen" class="navContainer" :style="{ height: deviceHeight + 'px' }">
        <ul class="navBox">
            <li><CommonAnchor class="navItem" text="D-day 계산기" to="/d-day" /></li>
            <li><CommonAnchor class="navItem" text="날짜 계산기" to="/date" /></li>
            <li><CommonAnchor class="navItem" text="롤 타임라인" to="/lol" /></li>
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
    const clickNav = (e) => {
        console.log(e);
    };

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
        @apply absolute top-[48px] left-0  h-[500px] w-full z-[2];
    }

    .navBox {
        @apply bg-custom-blue h-full w-[280px] pt-[20px] px-[20px] flex flex-col gap-[12px] border-t border-grey-600 border-r;
    }

    .navBox li {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 26px;
        font-family: 'Pretendard';

        @apply border-b p-[5px] text-white;
    }

    .navItem {
        @apply w-full h-full block;
    }
</style>
