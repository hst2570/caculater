<template>
    <div class="textField" :class="{ onError: isOnError }">
        <input @input="checkMaxLength" :inputmode="inputmode" v-model="year" :type="type" maxlength="4" placeholder="2023" />
        <div>-</div>
        <input @input="checkMaxLength" ref="monthText" :inputmode="inputmode" v-model="month" :type="type" maxlength="2" placeholder="01" />
        <div>-</div>
        <input @input="checkMaxLength" ref="dayText" :inputmode="inputmode" v-model="day" :type="type" maxlength="2" placeholder="01" />
        <div v-if="isOnError" class="errorMsg">날짜 형식이 잘못되었습니다.</div>
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

    const inputedDate = props.value.split('-');
    const year = ref(inputedDate?.[0]);
    const month = ref(inputedDate?.[1]);
    const day = ref(inputedDate?.[2]);
    const monthText = ref();
    const dayText = ref();
    const isOnError = ref(false);

    const formatedDate = (date) => {
        if (date.length > 4) {
            return `${date.slice(0, 4)}. ${date.slice(4, date.length)}`;
        }

        if (date.length > 6) {
            return `${date.slice(0, 4)}. ${date.slice(4, 6)}. ${date.slice(6, date.length)}`;
        }

        return date;
    };

    const isValidatedDate = (date) => {
        try {
            const isDate = Date.parse(date);
            return !isNaN(isDate);
        } catch (e) {
            return false;
        }
    };

    const checkMaxLength = (e) => {
        const value = e.target.value;
        const maxLength = e.target.maxLength;
        isOnError.value = false;

        if (value.length === maxLength) {
            if (!month.value) {
                monthText.value.focus();
            } else if (!day.value) {
                if (month.value > 12) {
                    isOnError.value = true;
                    return;
                }
                dayText.value.focus();
            }

            if (year.value && month.value && day.value) {
                const date = `${year.value}-${month.value}-${day.value}`;
                if (isValidatedDate(date)) {
                    isOnError.value = false;
                    emit('setValue', date);
                } else {
                    isOnError.value = true;
                }
            } else {
                emit('setValue', '');
            }
        } else {
            emit('setValue', '');
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
