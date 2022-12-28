<template>
    <div class="textField">
        <input @input="checkMaxLength" :inputmode="inputmode" v-model="year" :type="type" maxlength="4" placeholder="2022" />.
        <input @input="checkMaxLength" ref="monthText" :inputmode="inputmode" v-model="month" :type="type" maxlength="2" placeholder="01" />.
        <input @input="checkMaxLength" ref="dayText" :inputmode="inputmode" v-model="day" :type="type" maxlength="2" placeholder="01" />
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
    const formated = ref(props.value);

    const formatedDate = (date) => {
        if (date.length > 4) {
            return `${date.slice(0, 4)}. ${date.slice(4, date.length)}`;
        }

        if (date.length > 6) {
            return `${date.slice(0, 4)}. ${date.slice(4, 6)}. ${date.slice(6, date.length)}`;
        }

        return date;
    };

    const checkMaxLength = (e) => {
        const value = e.target.value;
        const maxLength = e.target.maxLength;

        if (value.length === maxLength) {
            if (!month.value) {
                monthText.value.focus();
            } else if (!day.value) {
                dayText.value.focus();
            }

            if (year.value && month.value && day.value) {
                emit('setValue', `${year.value}-${month.value}-${day.value}`);
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
        @apply flex flex-row items-center gap-[8px] relative;
        @apply font-pre font-normal not-italic text-[18px] leading-[6px] tracking-[-0.5px] text-black;
        @apply bg-white rounded-[6px] box-border border-grey-200 border p-[14px] h-[48px];
    }

    .textField input[type='text'] {
        caret-color: black;
        @apply font-pre font-normal not-italic text-[18px] leading-[6px] tracking-[-0.5px] text-black w-[100%];
    }

    .textField input[type='text']::placeholder {
        @apply text-grey-500;
    }

    .textField input[type='text']:focus {
        @apply outline-none;
    }

    .textField:focus-within {
        @apply border-grey-800;
    }

    .textField span {
        @apply absolute w-[100%];
    }
</style>
