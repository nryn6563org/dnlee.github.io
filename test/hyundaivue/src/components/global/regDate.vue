<template>
    <div id="regDate" role="dialog">
        <div class="bottomSheet numberPad">
            <h1>
                조회일자 입력
                <button type="button" class="modalClose"
                    @click="runEmit(false)"></button>
            </h1>
            <label>
                <input type="text" class="on" maxlength="8"
                    placeholder="YYYYMMDD" readonly inputmode="none"
                    :value="padData.numberData" />
            </label>
            <ul>
                <li v-for="(numberKey, index) in numberArr" :key="index">
                    <template v-if="typeof (numberKey) === 'number'">
                        <button type="button"
                            @click="addNumber(numberKey)"
                            :title="numberKey"
                            >
                            {{ numberKey }}
                        </button>
                    </template>
                    <template v-else-if="numberKey === 'del'">
                        <button type="button"
                            class="deleteCnt"
                            @click="delteNumber()"
                            title="번호한자리 삭제"
                            >
                        </button>
                    </template>
                </li>
            </ul>
            <div class="buttonArea">
                <button class="pointBlue h50"
                    :disabled="!padData.isPassed"
                    @click="runEmit(padData.numberData)">입력완료</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, reactive, onMounted, watch } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $dateSet = inject('$dateSet')
const props = defineProps(['options'])
const emit = defineEmits(['runEmit'])

const padData = reactive({
    numberData: '',
    isPassed: false
})

const numberArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del']

const addNumber = (number) => {
    if(padData.numberData === '') {
        padData.numberData = number
    } else {
        padData.numberData = padData.numberData * 10 + number
    }
}

// 삭제버튼
const delteNumber = () => {
    if(padData.numberData < 10) {
        padData.numberData = ''
    } else {
        padData.numberData = Math.floor(Number(padData.numberData / 10))
    }
}

// emit 정리
const runEmit = (val) => {
    if(val !== false) {
        emit('runEmits', $dateSet(val))
    } else {
        emit('runEmits', false)
    }
    $modalEnd('regDate')
}

// 유효성 검토
watch(() => padData.numberData, () => {
    const checked = padData.numberData.toString()
    if(checked.length === 8) {
        padData.isPassed = true
    } else {
        padData.isPassed = false
    }
})

// 최초 입력 날짜 호출
const changeDateToNumber = () => {
    const yearData = props.options.checkedDate.getFullYear().toString()
    let monthData = (props.options.checkedDate.getMonth() + 1).toString()
    if(monthData < 10) {
        monthData = '0' + monthData
    }
    const dateData = props.options.checkedDate.getDate().toString()
    const toNumberDate = Number(yearData + monthData + dateData)
    padData.numberData = toNumberDate
}
changeDateToNumber()

onMounted(() => {
    $modalStart('regDate')
})
</script>

<style lang="postcss" scoped>
    div.bottomSheet {
        position: absolute;
        box-shadow: 0px -2px 16px rgba(0, 0, 0, 0.12);
        z-index: 900;
        & > div:not(.buttonArea) {
            position: relative;
            display: block; float: left;
            width: calc(100% - 20px);
            padding: 10px 0 12px;
            text-decoration: none;
            & img {
                position: absolute;
                top: 16px; width: 36px;
            }
            & h1, & p {
                margin: 0; padding: 0 0 0 52px;
            }
            & h1 {
                margin-bottom: 2px;
                font-size: 1.143rem; color: var(--black); font-weight: 500;
            }
            & p {
                font-size: 1rem; color: var(--fontLightgray)
            }
        }
        & > ul {
            margin-bottom: 10px;
        }
        & > label {
            width: 100%;
            margin-bottom: 15px;
            & > input { width: 100%; margin-bottom: 5px; }
            & > p {
                width: calc(100vw - 40px);
                display: block;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding: 0; margin: 0;
                text-align: right; line-height: 1.5; font-size: 1rem;
            }
        }
    }
</style>