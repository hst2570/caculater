<template>
    <div :class="{ pc: isPc, mobile: !isPc, hidden: isHidden }">
        <CommonHeader :title="'날짜 계산기'" />
        <div class="main">
            <div class="content">
                <div class="dateContainer">
                    <div class="date defaultDate">
                        <label for="start">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="calendarIcon">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                            </svg>
                            시작일</label>
                        <CommonDateInput name="start" :value="startDate" :placeholder="'ex) 2022-01-01'"
                            @set-value="setStartDateValue" />
                    </div>
                    <div class="date">
                        <label for="end">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="calendarIcon">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>

                            종료일</label>
                        <CommonDateInput name="end" :value="endDate" :placeholder="'ex) 2022-12-31'"
                            @set-value="setEndDateValue" />
                    </div>
                </div>
                <div class="result">
                    <div v-if="regex.test(startDate) && regex.test(endDate)">
                        <span v-if="caculatedDate === 0"><span class="caculatedDate">시작일과 종료일이 </span> 같습니다. </span>
                        <span v-else-if="caculatedDate > 0">
                            <span class="d-day">{{ startDate }}</span> 부터 <br />
                            <span class="d-day">{{ endDate }}</span> 까지, <br />
                            <span class="caculatedDate">{{ Math.abs(caculatedDate) }}일</span> 남았습니다.
                        </span>
                        <span v-else>
                            <span class="d-day">{{ endDate }}</span> 부터 <br />
                            <span class="d-day">{{ startDate }}</span> 까지, <br />
                            <span class="caculatedDate">{{ Math.abs(caculatedDate) }}일</span> 지났습니다.
                        </span>
                    </div>
                    <div v-else>
                        <span class="placeholder">시작일과 종료일을 입력해주세요.</span>
                    </div>
                    <CommonShare :title="'날짜 계산기'" :text="'날짜를 계산해보세요'" class="shareBtn" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { isMobile } from '../../store/useragent';

const route = useRoute();
const startDate = ref(route.query?.start);
const endDate = ref(route.query?.end);
const caculatedDate = ref();
const isPc = ref();
const isHidden = ref(true);

const regex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;

const setStartDateValue = (date) => {
    startDate.value = date;
};

const setEndDateValue = (date) => {
    endDate.value = date;
};

const caculateDate = () => {
    if (startDate.value && endDate.value) {
        const start = new Date(startDate.value);
        const end = new Date(endDate.value);

        caculatedDate.value = (end - start) / 60 / 60 / 24 / 1000;

        if (end - start === 0) {
            caculatedDate.value = 0;
        }
    }
};

if (startDate.value && endDate.value) {
    caculateDate();
}

watch(
    () => startDate.value,
    (newDate) => {
        if (regex.test(newDate)) {
            caculateDate(newDate);
        } else {
            caculatedDate.value = '';
        }
    }
);

watch(
    () => endDate.value,
    (newDate) => {
        if (regex.test(newDate)) {
            caculateDate(newDate);
        } else {
            caculatedDate.value = '';
        }
    }
);

onMounted(() => {
    isPc.value = !isMobile();
    isHidden.value = false;
});

useHead({
    title: '날짜 계산기',
    meta: [
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        },
        {
            hid: 'description',
            name: 'description',
            content: '날짜 계산을 해보세요.'
        }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
});
</script>
<style scoped>
.content {
    background: #343a3f;
    height: 100vh;
    position: absolute;
    width: 100%;
    top: 0;
}

.dateContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.dateContainer label {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 26px;
    color: #ffffff;
}

.date {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.btnCaculate {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    padding: 15px 40px 13px;
    height: 56px;
    width: 160px;
    top: 317px;

    background: #ebeff5;
    border-radius: 12px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 28px;

    text-align: center;
    letter-spacing: -0.5px;

    color: #21272a;
    flex: none;
    order: 0;
    flex-grow: 1;
    margin: 45px auto;
}

.result {
    box-sizing: border-box;
    margin: 80px 35px;
    height: 360px;
    align-items: center;
    padding: 25px;
    gap: 12px;
    background: #ffffff;
    border: 1px solid #e1e6ec;
    border-radius: 12px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    color: #21272a;
    position: relative;
}

.caculatedDate {
    font-weight: 900;
    @apply text-custom-green;
}

.d-day {
    font-weight: 900;
}

.placeholder {
    @apply text-grey-500;
}
</style>
