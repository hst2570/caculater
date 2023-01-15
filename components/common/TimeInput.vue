<template>
    <div class="textField" :class="{ onError: isOnError }">
        <input @input="checkMaxLength" :inputmode="inputmode" v-model="minute" :type="type" maxlength="2" placeholder="00" />
        <div>:</div>
        <input @input="checkMaxLength" ref="secondText" :inputmode="inputmode" v-model="second" :type="type" maxlength="2" placeholder="00" />
        <div v-if="isOnError" class="errorMsg">시간 형식이 잘못되었습니다.</div>
    </div>
</template>
<script setup>
    const props = defineProps({
        placeholder: {
            type: String,
            default: ''
        },
        inputmode: {
            type: String,
            default: 'numeric'
        },
        value: {
            type: String || Number,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        }
    });

    const emit = defineEmits(['setValue']);

    const minute = ref();
    const second = ref();
    const secondText = ref();
    const dayText = ref();
    const isOnError = ref(false);

    const checkMaxLength = (e) => {
        const value = e.target.value;
        const maxLength = e.target.maxLength;
        let time = 0;
        isOnError.value = false;

        if (value.length === maxLength) {
            if (!second.value) {
                secondText.value.focus();
            }

            if (second.value > 60) {
                isOnError.value = true;
                return;
            }

            if (minute.value && second.value) {
                time = Number(minute.value) * 60 + Number(second.value);
                if (time > 0) {
                    isOnError.value = false;
                    emit('setValue', time);
                }
            } else if (second.value) {
                emit('setValue', second.value);
            } else {
                emit('setValue', 0);
            }
        } else {
            emit('setValue', 0);
        }
    };
</script>
<style scoped>
    .textField {
        @apply flex flex-row items-center gap-[18px] relative font-pre 
        font-normal not-italic text-[16px] leading-[6px] tracking-[-0.5px] 
        text-black bg-white rounded-[6px] box-border border-grey-200 border
        p-[14px] h-[48px];
    }

    .textField input[type='text'] {
        caret-color: black;
        @apply font-pre font-normal not-italic text-[16px] leading-[6px] tracking-[-0.5px] text-black w-[100%];
    }

    .textField input[type='text']::placeholder {
        @apply text-grey-500;
    }

    .textField input[type='text']:focus {
        @apply outline-none;
    }

    .textField:focus-within {
        @apply border-black;
    }

    .onError,
    .textField.onError:focus-within {
        @apply border-red-500 border-[2px];
    }

    .textField span {
        @apply absolute w-[100%];
    }

    .errorMsg {
        @apply absolute bottom-[-17px] right-0 w-[auto] text-red-200 text-[12px];
    }
</style>
