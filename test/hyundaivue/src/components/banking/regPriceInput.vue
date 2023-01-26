<template>
    <div id="priceReg" role="dialog">
        <div class="bottomSheet numberPad">
            <label class="price hasReset" for="regPrice">
                <input type="text" class="h50"
                    id="regPrice"
                    :class="[ padData.errMsg !== '' ? 'errBox' : 'on' ]"
                    placeholder="금액을 입력하세요" readonly
                    :value="$priceToCommas(padData.numberData) + (padData.numberData !== '' && padData.numberData !== 0 ? '원' : '')" />
                <button type="button" class="resetInput"
                    v-if="padData.numberData !== '' && padData.numberData !== 0 && padData.errMsg === ''"
                    @click="padData.numberData = ''"></button>
                <p class="fontRed" v-if="padData.errMsg !== ''">{{ padData.errMsg }}</p>
            </label>
            <div class="innerBtnBox">
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
                    :disabled="padData.errMsg !== ''"
                    @click="runEmit(padData.numberData)">입력완료</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, reactive, onMounted, watch } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $priceToCommas = inject('$priceToCommas')
const props = defineProps(['options'])
const emit = defineEmits(['runEmits'])

const firsetNumber = props.options !== null && typeof props.options.sendPrice !== 'undefined' ? props.options.sendPrice : ''
const padData = reactive({
    numberData: firsetNumber,
    errMsg: ''
})
// 키패드배열 및 버튼 배열
const numberArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, '00', 0, 'del']
const buttonArr = [10000, 50000, 100000, 1000000, 'all']
const maxPrice = props.options.maxPrice ? props.options.maxPrice : 0
// emit 정리
const runEmit = (val) => {
    $modalEnd('priceReg')
    if(typeof val !== 'undefined' && typeof (props.priceData) !== 'boolean') {
        const returnData = {
            bankCode: props.options.bankCode,
            bankAccNumber: props.options.bankAccNumber,
            returnNumber: padData.numberData
        }
        emit('runEmits', returnData)
    } else {
        emit('runEmits', false)
    }
}

watch(() => padData.numberData, () => {
    if(padData.numberData > maxPrice) {
        padData.errMsg = '입력 가능 금액을 초과하였습니다.'
    } else {
        padData.errMsg = ''
    }
})

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
}
// 00버튼
const addDubbleZero = () => {
    if(padData.numberData === '') {
        padData.numberData = 100
    } else {
        padData.numberData = Number(padData.numberData) * 100
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

onMounted(() => {
    $modalStart('priceReg', runEmit)
})

</script>

<style lang="postcss" scoped>
    div.bottomSheet {
        position: absolute;
        box-shadow: 0px -2px 16px rgba(0, 0, 0, 0.12);
        z-index: 900;
        & > div {
            & button { padding: 0; }
        }
        & > ul {
            margin-bottom: 10px;
        }
        & > label {
            height: 60px;
            & > input { width: 100%; margin-bottom: 5px; padding-right: 40px; }
            & .resetInput { margin-top: -44px; }
        }
        & .innerBtnBox {
            margin: 18px 0;
            & button ~ button { margin-left: 6.5px; }
        }
    }
</style>