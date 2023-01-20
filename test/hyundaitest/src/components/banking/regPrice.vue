<template>
    <div id="priceReg" class="bottomSheet numberPad">
        <div>
            <button v-for="(numberButton, index) in buttonArr" :key="index"
                class="h32"
                @click="addNumber(numberButton)">
                {{ typeof (numberButton) === 'number' ? numberButton/10000 + '만원' : '전액'}}
            </button>
        </div>
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
                <template v-else-if="numberKey === '00'">
                    <button type="button"
                        @click="addDubbleZero()"
                        title="00"
                        >
                        00
                    </button>
                </template>
            </li>
        </ul>
        <div class="buttonArea">
            <button class="pointBlue h50"
                :disabled="padData.cantTransfer"
                @click="sendPriceData">입력완료</button>
        </div>
    </div>
</template>

<script setup>
import { inject, reactive, onMounted, watch } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const props = defineProps(['priceData', 'maxPrice', 'limitPrice', 'options'])
const emit = defineEmits(['runEmits'])
let firstNumber = ''
const firstSet = () => {
    if(typeof props.options !== 'undefined') {
        if(props.options !== null && typeof props.options.sendPrice !== 'undefined') {
            firstNumber = props.options.sendPrice
        }
    }
}
firstSet()
const firstCanCheck = typeof props.options === 'undefined'
const padData = reactive({
    numberData: firstNumber,
    cantTransfer: firstCanCheck
})
// 키패드배열 및 버튼 배열
const buttonArr = [10000, 50000, 100000, 1000000, 'all']
const numberArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, '00', 0, 'del']
// watch용 총금액
let maxPrice = props.maxPrice ? props.maxPrice : 0
let limitPrice = props.limitPrice ? props.limitPrice : 0
watch(() => props.maxPrice, (next, prev) => {
    if (prev !== next) {
        maxPrice = props.maxPrice
    }
})
watch(() => props.limitPrice, (next, prev) => {
    if (prev !== next) {
        limitPrice = props.limitPrice
    }
})

// emit 정리
const runEmit = () => {
    if(typeof (props.priceData) !== 'undefined' && typeof (props.maxPrice) !== 'undefined' && typeof (props.limitPrice) !== 'undefined') {
        emit('runEmits', padData.numberData)
    } else {
        emit('runEmits', {
            returnNumber: padData.numberData,
            targets: props.options
        })
    }
}

const addNumber = (number) => {
    if (number === 'all') {
        if(typeof (props.options) === 'undefined') {
            padData.numberData = maxPrice
        } else {
            padData.numberData = props.options.maxPrice
        }
    } else {
        if(padData.numberData === '') {
            padData.numberData = number
        } else if(number >= 10000) {
            padData.numberData = padData.numberData + number
        } else {
            padData.numberData = padData.numberData * 10 + number
        }
    }
    canTrasferCheck()
    runEmit()
}
// 00버튼
const addDubbleZero = () => {
    if(padData.numberData === '') {
        padData.numberData = 100
    } else {
        padData.numberData = Number(padData.numberData) * 100
    }
    canTrasferCheck()
    runEmit()
}
// 삭제버튼
const delteNumber = () => {
    if(padData.numberData < 10) {
        padData.numberData = ''
    } else {
        padData.numberData = Math.floor(Number(padData.numberData / 10))
    }
    canTrasferCheck()
    runEmit()
}


// 다음스텝
const sendPriceData = () => {
    $modalEnd('priceReg')
    emit('runEmits', true)
}

// 출금가능 여부 체크
const canTrasferCheck = () => {
    if(typeof (props.options) === 'undefined') {
        padData.cantTransfer = true
        if(padData.numberData !== 0 && padData.numberData !== '' && padData.numberData !== null &&
            padData.numberData <= maxPrice && padData.numberData <= limitPrice) {
            padData.cantTransfer = false
        }
    } else {
        padData.cantTransfer = false
    }
}

onMounted(() => {
    $modalStart('priceReg')
})

</script>

<style lang="postcss" scoped>
    div.bottomSheet {
        position: absolute;
        box-shadow: 0px -2px 16px rgba(0, 0, 0, 0.12);
        z-index: 900;
        & > div:not(.buttonArea) {
            display: flex;
            margin-bottom: 30px;
            justify-content: space-between;
            & > button {
                flex-grow: 1;
                padding: 0;
                & + button {
                    margin-left: 7px;
                }
            }
        }
        & > ul {
            margin-bottom: 20px;
        }
    }
</style>