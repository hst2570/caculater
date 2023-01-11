<template>
    <div :class="{ pc: isPc, mobile: !isPc, hidden: isHidden }">
        <CommonHeader :title="'D-Day 계산기'" />
        <div class="main">
            <div class="content">
                <div class="dateContainer">
                    <div class="date">
                        <label for="d-day">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="calendarIcon">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                            </svg>
                            D-Day
                        </label>
                        <CommonDateInput name="d-day" :value="dDay" :placeholder="'ex) 2023-01-01'"
                            @set-value="setDateValue" />
                    </div>
                </div>
                <div class="result">
                    <div v-if="regex.test(dDay)">
                        <span v-if="caculatedDate === 0"> 오늘은 <span class="caculatedDate">D-Day</span> 입니다. </span>
                        <span v-else-if="caculatedDate > 0">
                            오늘부터 <span class="d-day">{{ dDay }}</span> 까지, <br />
                            <span class="caculatedDate">{{ absDate }}일</span> 남았습니다.
                        </span>
                        <span v-else>
                            <span class="d-day">{{ dDay }}</span> 부터 오늘까지, <br />
                            <span class="caculatedDate">{{ absDate }}일</span> 지났습니다.
                        </span>
                    </div>
                    <div v-else>
                        <span class="placeholder">D-Day 날짜를 입력해주세요.</span>
                    </div>
                    <CommonShare :title="'D-Day 계산기'" :text="'D-Day 계산해보세요'" class="shareBtn" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { isMobile } from '../../store/useragent';

    const regex = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
    const date = new Date();
    const today = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);

    const route = useRoute();
    const router = useRouter();
    const dDay = ref(route.query?.date);
    const caculatedDate = ref();
    const isPc = ref();
    const isHidden = ref(true);
    const description = ref('D-day 계산을 해보세요.');
    const absDate = ref();

    const setDateValue = (date) => {
        dDay.value = date;
    };

    const caculateDate = (date) => {
        const targetDate = new Date(date);
        setDateValue(date);
        caculatedDate.value = (targetDate - today) / 60 / 60 / 24 / 1000;
        caculatedDate.value = Math.floor(caculatedDate.value);
        absDate.value = Math.abs(caculatedDate.value);

        if (targetDate - today === 0) {
            caculatedDate.value = 0;
        }

        router.replace({
            query: {
                date: dDay.value
            }
        });
    };

    const share = () => {
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: 'D-Day 계산기',
                text: 'D-Day 계산해보세요',
                url: document.location.href
            });
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                alert('URL이 복사되었습니다.');
            });
        }
    };

    if (dDay.value) {
        caculateDate(dDay.value);
    }

    if (route.query?.date) {
        const date = route.query?.date;

        if (caculatedDate.value > 0) {
            description.value = `${date}부터 ${absDate.value}일 남았습니다.`;
        } else if (caculatedDate.value < 0) {
            description.value = `${date}부터 ${absDate.value}일 지났습니다.`;
        } else if (caculatedDate.value === 0) {
            description.value = `D-Day입니다.`;
        }
    }

    watch(
        () => dDay.value,
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
        title: 'D-day 계산기',
        meta: [
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: description
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    });
</script>
<style scoped>
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
    height: 320px;
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
    position: relative;
    @apply text-grey-700;
}

.caculatedDate {
    font-weight: 900;
    @apply text-custom-blue text-[20px];
}

.d-day {
    font-weight: 900;
}

.placeholder {
    @apply text-grey-500;
}
</style>
