<template>
    <div id="percentReg" role="dialog">
        <div class="bottomSheet numberPad">
            <label class="price hasReset" for="regPrice">
                <input type="text" class="on h50"
                    id="regPrice"
                    placeholder="금액(%)을 입력하세요" readonly
                    :value="$priceToCommas(padData.numberData) + (padData.numberData !== '' && padData.numberData !== 0 ? '%' : '')" />
                <button type="button" class="resetInput"
                    v-if="padData.numberData !== '' && padData.numberData !== 0"
                    @click="padData.numberData = ''"></button>
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
                    @click="runEmit(padData.numberData)">입력완료</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, reactive, onMounted } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $priceToCommas = inject('$priceToCommas')
const props = defineProps(['options'])
const emit = defineEmits(['runEmits'])

const firsetNumber = props.options !== null && typeof props.options.percent !== 'undefined' ? props.options.percent : ''
const padData = reactive({
    numberData: firsetNumber
})
// 키패드배열 및 버튼 배열
const numberArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del']
const maxPercent = props.options !== null && typeof props.options.maxPercent !== 'undefined' ? props.options.maxPercent : 100
// emit 정리
const runEmit = (val) => {
    $modalEnd('percentReg')
    if(typeof val !== 'undefined' && typeof (props.priceData) !== 'boolean') {
        const returnData = {
            returnNumber: padData.numberData
        }
        emit('runEmits', returnData)
    } else {
        emit('runEmits', false)
    }
}

const addNumber = (number) => {
    if(padData.numberData === '') {
        padData.numberData = number
    } else {
        padData.numberData = padData.numberData * 10 + number
        if(padData.numberData > maxPercent) padData.numberData = maxPercent
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
    $modalStart('percentReg', runEmit)
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
            margin-bottom: 18px;
            & > input { width: 100%; margin-bottom: 5px; padding-right: 40px; }
            & .resetInput { margin-top: -44px; }
        }
        & .innerBtnBox {
            margin: 18px 0;
            & button ~ button { margin-left: 6.5px; }
        }
    }
</style>