<template>
    <div id="dateScrollPicker" role="dialog">
        <div class="bottomSheet">
            <h1>
                기간설정
                <button type="button" class="modalClose"
                    @click="runEmit(false)"></button>
            </h1>
            <div>
                <h4>
                    시작일
                    <button type="button" @click="goToday('fromDate')">
                        오늘
                    </button>
                </h4>
                <div class="picker-group">
                    <VueScrollPicker :options="years" v-model="returnDate.fromDate.year" />
                    <VueScrollPicker :options="months" v-model="returnDate.fromDate.month" />
                    <VueScrollPicker :options="fromDays" v-model="returnDate.fromDate.day" />
                </div>
                <hr>
                <h4>
                    종료일
                    <button type="button" @click="goToday('toDate')">
                        오늘
                    </button>
                </h4>
                <div class="picker-group">
                    <VueScrollPicker :options="years" v-model="returnDate.toDate.year" />
                    <VueScrollPicker :options="months" v-model="returnDate.toDate.month" />
                    <VueScrollPicker :options="toDays" v-model="returnDate.toDate.day" />
                </div>
                <hr>
                <div>
                    <button type="button" class="h36" @click="addDay(0)">당일</button>
                    <button type="button" class="h36" @click="addDay(7)">1주일</button>
                    <button type="button" class="h36" @click="addMonth(1)">1개월</button>
                    <button type="button" class="h36" @click="addMonth(3)">3개월</button>
                    <button type="button" class="h36" @click="addMonth(6)">6개월</button>
                    <button type="button" class="h36" @click="addMonth(12)">1년</button>
                </div>
            </div>
            <div class="buttonArea">
                <button type="button" class="pointBlue h50"
                    @click="runEmit(returnDate)">
                    확인
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, inject, reactive, onMounted } from 'vue'
import { VueScrollPicker } from 'vue-scroll-picker'
import 'vue-scroll-picker/lib/style.css'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const props = defineProps(['options'])
const emit = defineEmits(['runEmits'])

const returnDate = reactive({
    fromDate: {
        year: 0,
        month: 0,
        day: 0
    },
    toDate: {
        year: 0,
        month: 0,
        day: 0
    },
    fixDate: ''
})

// 피커 기본값 세팅
// 년도는 앞 5년 후 5년을 기준한다.
const years = computed(() => {
    const currYear = new Date().getFullYear() + 5
    const lastYear = new Date().getFullYear() - 5
    return Array.from({ length: currYear - lastYear + 1 }, (_, index) => lastYear + index).reverse()
})
const months = computed(() => {
    return Array.from({ length: 12 }, (_, index) => index + 1 < 10 ? '0' + (index + 1) : index + 1)
})
const fromDays = computed(() => {
    const lastDay = new Date(returnDate.fromDate.year, returnDate.fromDate.month, 0).getDate()
    return Array.from({ length: lastDay }, (_, index) => index + 1 < 10 ? '0' + (index + 1) : index + 1)
})
const toDays = computed(() => {
    const lastDay = new Date(returnDate.toDate.year, returnDate.toDate.month, 0).getDate()
    return Array.from({ length: lastDay }, (_, index) => index + 1 < 10 ? '0' + (index + 1) : index + 1)
})

// 오늘 버튼 클릭 시
const goToday = (target) => {
    const goYear = new Date().getFullYear()
    const goMonth = new Date().getMonth() + 1
    const goday = new Date().getDate()

    if(target === 'fromDate') {
        returnDate.fromDate.year = goYear
        returnDate.fromDate.month = goMonth
        returnDate.fromDate.day = goday
    } else {
        returnDate.toDate.year = goYear
        returnDate.toDate.month = goMonth
        returnDate.toDate.day = goday
    }
}
// 날짜 계산 - 일단위
const addDay = (count) => {
    let resultDate = new Date(returnDate.toDate.year, Number(returnDate.toDate.month), Number(returnDate.toDate.day))
    if(returnDate.fixDate === 'fromDate') {
        resultDate = new Date(returnDate.fromDate.year, Number(returnDate.fromDate.month), Number(returnDate.fromDate.day))
    }
    resultDate = new Date(resultDate.setDate(resultDate.getDate() + count))
    console.log(resultDate)
    if(returnDate.fixDate === 'fromDate') {
        returnDate.toDate.year = resultDate.getFullYear()
        returnDate.toDate.month = resultDate.getMonth()
        returnDate.toDate.day = resultDate.getDate()
    } else {
        returnDate.fromDate.year = resultDate.getFullYear()
        returnDate.fromDate.month = resultDate.getMonth()
        returnDate.fromDate.day = resultDate.getDate()
    }
}
// 날짜 계산 - 개월단위
const addMonth = (count) => {
    let resultDate = new Date(returnDate.toDate.year, Number(returnDate.toDate.month), Number(returnDate.toDate.day))
    if(returnDate.fixDate === 'fromDate') {
        resultDate = new Date(returnDate.fromDate.year, Number(returnDate.fromDate.month), Number(returnDate.fromDate.day))
    }
    resultDate = new Date(resultDate.setMonth(resultDate.getMonth() + count))
    if(returnDate.fixDate === 'fromDate') {
        returnDate.toDate.year = resultDate.getFullYear()
        returnDate.toDate.month = resultDate.getMonth()
        returnDate.toDate.day = resultDate.getDate()
    } else {
        returnDate.fromDate.year = resultDate.getFullYear()
        returnDate.fromDate.month = resultDate.getMonth()
        returnDate.fromDate.day = resultDate.getDate()
    }
}

// prop값이 없을 시 모두 new Date()를 기준으로 선택된다.
const setDefault = () => {
    let fromDate = new Date()
    let toDate = new Date()
    let fixDate = 'fromDate'
    if(props.options !== null) {
        if(typeof (props.options.fromDate) !== 'undefined') {
            fromDate = props.options.fromDate
        } else if (typeof (props.options.toDate) !== 'undefined') {
            toDate = props.options.toDate
        } else if (typeof (props.options.fixDate) !== 'undefined') {
            fixDate = props.options.fixDate
        }
    }

    returnDate.fixDate = fixDate

    returnDate.fromDate.year = fromDate.getFullYear()
    returnDate.fromDate.month = fromDate.getMonth() + 1
    returnDate.fromDate.day = fromDate.getDate()

    returnDate.toDate.year = toDate.getFullYear()
    returnDate.toDate.month = toDate.getMonth() + 1
    returnDate.toDate.day = toDate.getDate()
}

setDefault()

const runEmit = (vals) => {
    $modalEnd('monthScrollPicker')
    if(vals !== false) {
        emit('runEmits', {
            fromDate: new Date(returnDate.fromDate.year, Number(returnDate.fromDate.month), Number(returnDate.fromDate.day)),
            toDate: new Date(returnDate.toDate.year, Number(returnDate.toDate.month), Number(returnDate.toDate.day))
        })
    } else {
        emit('runEmits', false)
    }
}

onMounted(() => {
    $modalStart('dateScrollPicker')
})
</script>
<style lang="postcss" scoped>
#dateScrollPicker {
    & div.bottomSheet > div {
        & > h4 {
            position: relative; overflow: auto;
            margin: 0; padding: 0 0 24px 16px; text-align: center;
            box-sizing: border-box;
            font-size: 1.143rem; font-weight: 500;
            & > button {
                position: absolute;
                top: 0; right: 0; height: 26px;
                padding: 0 8px; border-radius: 6px; border: 1px solid var(--black);
                font-size: 0.857rem; line-height: 1;
            }
        }
        & > hr {
            height: 0;
            border: none; border-top: 1px solid var(--listBorder);
            margin: 20px 0 24px;
        }
        & > div:not(.picker-group) {
            display: flex;
            flex-wrap: wrap;
            & button {
                flex: 1 1 calc((100%/3) - 5.5px);
            }
            & button + button {
                margin-left: 8px;
            }
            & button:nth-child(3n + 1) {
                margin-left: 0;
            }
            & button:nth-child(n + 4) {
                margin-top: 8px;
            }
        }
    }
}
</style>

<style lang="postcss">
#dateScrollPicker {
    .picker-group {
        display: flex; overflow: hidden;
        height: 100px;
        padding: 0 10px;
        font-size: 1.286rem;
        & > div:nth-child(1) {
            & .vue-scroll-picker-item {
                text-align: left;
                padding-left: 6px;
                &.vue-scroll-picker-item-selected {
                    padding-left: 0;
                }
            }
        }
        & > div:nth-child(1) + div { margin-left: 16px; }
        & > div:nth-child(3) {
            & .vue-scroll-picker-item {
                text-align: right;
                padding-right: 2px;
                &.vue-scroll-picker-item-selected {
                    padding-right: 0;
                }
            }
        }
        & .vue-scroll-picker-layer-top, & .vue-scroll-picker-layer-bottom {
            display: none;
        }
        & .vue-scroll-picker-layer {
            height: 100px; overflow: hidden;
        }
        & .vue-scroll-picker-item  {
            color: rgba(20,20,20,.4);
        }
        & .vue-scroll-picker-item.vue-scroll-picker-item-selected {
            font-size: 1.571rem;
            color: var(--pointBlue);
        }
        & .vue-scroll-picker-item + .vue-scroll-picker-item {
            margin-top: 12px;
        }
    }
}
</style>