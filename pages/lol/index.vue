<template>
    <div class="main" :class="{ pc: isPc, mobile: !isPc, hidden: isHidden }">
        <CommonHeader :title="'롤 타임라인'" />
        <div class="content">
            <div class="initContainer">
                <span class="countDown">시간 입력</span>
                <CommonTimeInput @set-value="setTimeValue" />
                <button v-if="!isStarted" class="startBtn" @click="startTimeline">Start!</button>
                <button v-else class="startBtn" @click="stopTimeline">Stop</button>
            </div>

            <div class="mapContainer">
                <img class="map" src="../../assets/img/minimap.png" />
                <span class="currentTime">{{ formatedTime(currentTime) }}</span>
                <div class="noticeContainer">
                    <div class="notice">
                        <span>{{ notice }}</span>
                    </div>
                </div>
                <audio :src="audioSrc" :autoplay="autoplay" ref="audioElement" @play="playAudio" @ended="endedAudio"></audio>
            </div>

            <div class="importantZone">
                <span class="countDown">카운트다운</span>
                <div v-for="(line, index) in timelineList" :key="index" class="line" :class="{ done: line.time <= currentTime }" :data-time="line.time">
                    <span class="title" :class="{ warn: line.level === 2, danger: line.level === 3 }"
                        >{{ formatedTime(line.time) }} <span>- {{ line.title }}</span>
                    </span>
                    <span v-if="line.time - currentTime < 10" class="timelineCount">{{ Math.floor(line.time - currentTime) }}</span>
                    <span class="progress" :style="{ width: `${(1 - (line.time - currentTime) / 30) * 100}%` }"></span>
                </div>
            </div>

            <div class="timeLineContainer">
                <div class="description">
                    <p>설명</p>
                    <div class="line">
                        <span class="title"
                            >리그 오브 레전드 타임라인 입니다. <br />
                            시간별 예상 이벤트를 알려줍니다.
                        </span>
                    </div>
                </div>
                <div class="timeLine">
                    <p>타임 라인</p>
                    <div v-for="(line, index) in list" :key="index" class="line" :class="{ done: settedTimelineKeys[line.time] || line.time < currentTime }" :data-time="line.time">
                        <span class="title"
                            >{{ formatedTime(line.time) }} <span> {{ line.title }}</span></span
                        >
                    </div>
                </div>
            </div>
        </div>
        <CommonFooter />
    </div>
</template>
<script setup>
    import { isMobile } from '../../store/useragent';
    import { timeline, warningLevel } from '../../store/static/lol_timeline';

    const AFTER_30 = '30s_after';

    const isPc = ref();
    const isHidden = ref(true);
    const timelineList = ref([]);
    const settedTimelineKeys = ref({});
    const list = ref([]);
    const currentTime = ref(0);
    const notice = ref();
    const time = ref(0);
    const audioSrc = ref('../_nuxt/assets/audio/timeline.mp3');
    const audioTrack = ref([]);
    const audioElement = ref();
    const isStarted = ref(false);
    const autoplay = ref(false);
    const minionCount = ref(0);
    let minionTimeout = null;
    let minionInterval = null;

    let currentTimeInterval = null;

    const setMinion = () => {
        if (minionTimeout || minionInterval) {
            clearTimeout(minionTimeout);
            minionTimeout = null;
            clearInterval(minionInterval);
            minionInterval = null;
        }

        let firstTimer = 65;
        let elseTimer = 30;

        if (currentTime.value >= 65) {
            minionCount.value++;
        } else {
            firstTimer = firstTimer - currentTime.value;
        }

        if (currentTime.value >= 95) {
            currentTime = 0;
            minionCount.value = Number(minionCount.value) + Number(((currentTime.value - 65) / 30).toFixed(0));
            elseTimer = elseTimer - ((currentTime.value - 65) % 30);
        }

        if (firstTimer > 0) {
            minionTimeout = setTimeout(() => {
                minionCount.value++;
                canonTimer();
            }, firstTimer * 1000);
        } else if (elseTimer !== 30) {
            minionTimeout = setTimeout(() => {
                minionCount.value++;

                if (minionCount.value % 3 == 0) {
                    notice.value = '대포라인 생성';
                    audioTrack.value.push('canon.mp3');
                }

                canonTimer();
            }, elseTimer * 1000);
        } else {
            canonTimer();
        }
    };

    const canonTimer = () => {
        minionInterval = setInterval(() => {
            minionCount.value++;
            if (minionCount.value % 3 == 0) {
                notice.value = '대포라인 생성';
                audioTrack.value.push('canon.mp3');
            }

            if (currentTime.value > 900) {
                clearInterval(minionInterval);
                minionInterval = null;
            }
        }, 30 * 1000);
    };

    const startTimeline = () => {
        clearInterval(currentTimeInterval);
        currentTimeInterval = null;
        timelineList.value = [];

        if (time.value) {
            currentTime.value = Number(time.value);
        }

        if (currentTimeInterval === null) {
            currentTimeInterval = setInterval(() => {
                currentTime.value = currentTime.value + 0.25;
            }, 250);
        }

        notice.value = '타임라인 시작';
        isStarted.value = true;
        autoplay.value = true;
        playAudio();
        setMinion();

        setTimeout(() => {
            notice.value = '';
        }, 3000);
    };

    const stopTimeline = () => {
        clearTimeout(minionTimeout);
        minionTimeout = null;
        clearInterval(minionInterval);
        minionInterval = null;
        clearInterval(currentTimeInterval);
        currentTimeInterval = null;
        currentTime.value = 0;
        isStarted.value = false;
    };

    const formatedTime = (time) => {
        const target = Math.floor(time);
        const second = target % 60;
        const minute = (target - second) / 60;
        return `${minute === 0 ? `00` : minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;
    };

    const setTimeValue = (inputTime) => {
        time.value = inputTime;
    };

    const playAudio = () => {
        if (isStarted.value) {
            audioElement.value?.play();
        }
    };

    const endedAudio = () => {
        setTrack();
    };

    const setTrack = () => {
        if (!audioElement.value?.ended) {
            return;
        }

        let next = audioTrack.value.shift();

        if (next === AFTER_30) {
            next = '30s_after.mp3';
        }

        if (next) {
            audioSrc.value = `../_nuxt/assets/audio/${next}`;
            audioElement.value?.load();
        }
    };

    onMounted(() => {
        isPc.value = !isMobile();
        isHidden.value = false;

        Object.keys(timeline).forEach((key) => {
            list.value.push(timeline[key]);
        });

        list.value.sort((a, b) => {
            return a.time > b.time;
        });
    });

    watchEffect(() => {
        const afterLineTime = currentTime.value + 30;

        if (timeline[afterLineTime]) {
            timelineList.value.push(timeline[afterLineTime]);
            settedTimelineKeys.value[afterLineTime] = true;
            audioTrack.value.push(AFTER_30);
            audioTrack.value.push(timeline[afterLineTime].audio);
        }

        if (timeline[currentTime.value]) {
            notice.value = timeline[currentTime.value]?.title;
            audioTrack.value.push(timeline[currentTime.value].audio);
            setTimeout(() => {
                notice.value = '';
            }, 3000);
        }

        setTrack();
    });

    useHead({
        title: 'lol 타임라인',
        meta: [
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: 'LOL 롤 시간대별 알림을 경험해보세요.'
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    });
</script>
<style scoped>
    body,
    .main,
    .content {
        @apply bg-gray-800;
    }

    .content {
        @apply p-[8px];
    }

    .mapContainer {
        max-width: 480px;
        @apply my-[20px] relative mx-[auto];
    }

    .map {
        @apply mx-[auto] border rounded-[12px] overflow-hidden;
    }

    .importantZone {
        max-width: 480px;
        min-height: 75px;
        @apply text-black mx-[auto] bg-white border rounded-[12px] p-[8px] relative mt-[50px];
    }

    .timeLine {
        max-width: 300px;
        @apply text-black text-[12px] flex flex-col flex-grow p-[5px];
    }

    .timeLine .line,
    .description .line {
        @apply text-gray-500 text-[12px];
    }

    .timeLineContainer p {
        @apply text-white;
    }

    .done {
        animation: fadeOut 1s !important;
        display: none;
    }

    .line {
        @apply bg-white border rounded-[12px] p-[8px] font-pre text-[18px] font-[700] m-[5px] relative overflow-hidden;
    }

    .line span {
        white-space: nowrap;
        @apply text-center inline-block;
    }

    @keyframes fadeInUp {
        0% {
            opacity: 0;
            transform: translate3d(0, 100%, 0);
        }
        to {
            opacity: 1;
            transform: translateZ(0);
        }
    }

    @keyframes fadeOut {
        to {
            opacity: 0;
            position: absolute !important;
            display: none;
            bottom: 0;
            transform: translate3d(0, -100%, 0);
        }
        0% {
            opacity: 1;
            transform: translateZ(1);
        }
    }

    .line {
        animation: fadeInUp 1s;
    }

    .progress {
        height: 60px;
        position: absolute;
        top: 0;
        left: 0;
        @apply bg-gray-400 opacity-30;
    }

    .title {
        @apply z-[2] relative;
    }

    .noticeContainer {
        @apply absolute bottom-[10px] w-full flex items-center;
    }

    .notice {
        background-color: rgba(40, 40, 40, 0.7);
        @apply p-[8px] border-gray-500 rounded-[12px] text-center mx-[auto] w-[60%];
    }

    .notice span {
        @apply text-white opacity-100 font-pre font-[800] text-[16px];
    }

    .description {
        max-width: 300px;
        @apply text-black text-[12px] flex flex-col flex-grow p-[5px];
    }

    .timeLineContainer {
        max-width: 480px;
        @apply flex flex-row mt-[30px] gap-[8px] mx-[auto];
    }

    .countDown {
        @apply text-white absolute top-[-30px];
    }

    .currentTime {
        background-color: rgba(40, 40, 40, 0.3);
        @apply absolute top-[10px] left-[20px] text-red-500 text-[32px] font-pre font-[900] p-[12px] rounded-[12px];
    }

    .startBtn {
        @apply text-[16px] p-[12px] mx-[auto] bg-white rounded-[8px] block w-[120px];
    }

    .initContainer {
        max-width: 480px;
        @apply flex flex-row my-[30px] mx-[auto] gap-[8px] relative;
    }

    .warn span {
        @apply text-yellow-600;
    }

    .danger span {
        @apply text-red-500;
    }

    .timelineCount {
        @apply inline-block absolute right-0 text-[14px] text-gray-600;
    }
</style>
