<template>
    <div id="priceReg" role="dialog">
        <div class="bottomSheet numberPad">
            <h1>
                이체금액
                <button type="button" class="modalClose"
                    @click="runEmit(false)"></button>
            </h1>
            <div>
                <img :src="'/images/logos/' + props.options.bankCode + '.png'"
                    :alt="$codeToBank(props.options.bankCode).korName + ' 로고'" />
                <h1>{{ props.options.ownerName }}</h1>
                <p>
                    {{ $codeToBank(props.options.bankCode).korName }}
                    {{ props.options.bankCode === '263' ? $hmsecToDash(props.options.bankAccNumber) :
                        props.options.bankAccNumber  }}
                </p>
            </div>
            <label>
                <input type="text" class="on"
                    placeholder="금액을 입력하세요"
                    readonly
                    :value="$priceToCommas(padData.numberData)" />
                <p v-if="padData.numberData !== 0 && padData.numberData !== ''" class="fontPointBlue">
                    {{ $priceToKr(padData.numberData) }}
                </p>
                <p v-else class="fontGray">
                    금액 미입력
                </p>
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
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
const $priceToCommas = inject('$priceToCommas')
const $priceToKr = inject('$priceToKr')
const props = defineProps(['options'])
const emit = defineEmits(['runEmits'])

const padData = reactive({
    numberData: ''
})
// 키패드배열 및 버튼 배열
const numberArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, '00', 0, 'del']

// emit 정리
const runEmit = (val) => {
    $modalEnd('priceReg')
    if(typeof (props.priceData) !== 'boolean' && padData.numberData !== '' && padData.numberData !== 0) {
        emit('runEmits', padData.numberData)
    } else {
        emit('runEmits', false)
    }
}

const addNumber = (number) => {
    if(padData.numberData === '') {
        padData.numberData = number
    } else {
        padData.numberData = padData.numberData * 10 + number
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
    $modalStart('priceReg')
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