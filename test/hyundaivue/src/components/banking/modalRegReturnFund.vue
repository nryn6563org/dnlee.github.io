<template>
    <div id="modalRegReturnFund" class="fullPopup">
        <div class="header">
            <h1>청구정보</h1>
            <button class="modalClose" @click="returnVal()"></button>
        </div>
        <!-- 컨텐츠 영역 -->
        <div class="contentsArea">
            <h3>거래정보</h3>
            <ol class="roundBox dist8">
                <li>
                    <span>거래일</span>
                    <strong>{{ props.options.timeStemp.substr(0,10) }}</strong>
                </li>
                <li>
                    <span>원거래 고유번호</span>
                    <strong>{{ props.options.transCode }}</strong>
                </li>
                <li>
                    <span>반환기관</span>
                    <strong>{{ $codeToBank(props.options.transBankCode).korName }}</strong>
                </li>
                <li>
                    <span>입금계좌번호</span>
                    <strong>
                        {{ props.options.transBankCode === '263' ?
                            $hmsecToDash(props.options.transBankAccNumber) : props.options.transBankAccNumber
                        }}
                    </strong>
                </li>
                <li>
                    <span>받는분</span>
                    <strong>{{ props.options.transOwnerName }}</strong>
                </li>
                <li>
                    <span>원거래금액</span>
                    <strong>{{ $priceToCommas(props.options.transPrice) }}원</strong>
                </li>
            </ol>
            <h3>반환청구</h3>
            <ol class="roundBox dist8">
                <li>
                    <span>청구일</span>
                    <strong>{{ $dateToCommas(new Date()) }}</strong>
                </li>
                <li>
                    <button class="select" :class="{ 'dimmed' : regInfo.reasonCode === '' }"
                        @click="runComp(reSelect, 'reasonCode')">
                        {{ regInfo.reasonCode === '' ? '청구사유선택' :
                            regReason.filter(el => el.listValue === regInfo.reasonCode)[0].listName }}
                    </button>
                </li>
                <li>
                    <button class="select" :class="{ 'dimmed' : regInfo.returnPriceType === '' }"
                        @click="runComp(reSelect, 'returnPriceType')">
                        {{ regInfo.returnPriceType === '' ? '청구구분' :
                            returnPriceType.filter(el => el.listValue === regInfo.returnPriceType)[0].listName }}
                    </button>
                </li>
                <li v-if="regInfo.returnPriceType === '' || regInfo.returnPriceType === 'all' ">
                    <span>청구금액</span>
                    <strong>{{ $priceToCommas(regInfo.regPrice) }}원</strong>
                </li>
                <li v-else>
                    <label class="price" for="regPrice"
                        :class="{ 'hasReset' : regInfo.regPrice !== 0 && regInfo.regPrice !== '' }">
                        <p v-if="regInfo.regPrice !== 0 && regInfo.regPrice !== ''">
                            {{ regInfo.regPrice === 0 || regInfo.regPrice === '' ? '' : $priceToKr(regInfo.regPrice) + '원'  }}
                        </p>
                        <input type="text" inputmode="none" id="regPrice" readonly
                            placeholder="금액을 입력하세요."
                            @click="runComp(regPrice)"
                            :value="$priceToCommas(regInfo.regPrice) + ( regInfo.regPrice === 0 || regInfo.regPrice === '' ? '' : '원')">
                        <button type="button" class="resetInput"
                            v-if="regInfo.regPrice !== 0 && regInfo.regPrice !== ''"
                            @click="regInfo.regPrice = ''"></button>
                        <p v-if="regInfo.errorMesaage !== ''">
                            {{ regInfo.errorMesaage }}
                        </p>
                    </label>
                </li>
            </ol>
            <h3>입금계좌</h3>
            <ol class="simpleBox">
                <li>
                    <button class="select h50"
                        @click="runComp(selectMyAccListInTypes)">
                        {{ $codeToBank(regInfo.returnBankCode).korName }}
                        {{ $hmsecToDash(regInfo.returnBankAccNumber) }}
                    </button>
                </li>
                <li>
                    <span>현대차증권 계좌로만 입금이 가능합니다.</span>
                </li>
            </ol>
        </div>
        <div class="buttonArea">
            <button type="button" class="pointBlue h50"
                @click="returnVal(regInfo)"
                >반환 신청하기
            </button>
        </div>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</template>

<script setup>
import { inject, reactive, onMounted, markRaw, watch } from 'vue'
import selectMyAccListInTypes from './selectMyAccListInTypes.vue'
import reSelect from '@/components/global/reSelect.vue'
import regPrice from './regPriceInput.vue'
const $priceToKr = inject('$priceToKr')
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
const $priceToCommas = inject('$priceToCommas')
const $dateToCommas = inject('$dateToCommas')
const $axios = inject('$axios')
const props = defineProps(['options'])
const emit = defineEmits(['runEmits'])
const myAccListAPI = '/json/banking/myAccList.json'

const regInfo = reactive({
    returnBankCode: '',
    returnBankAccNumber: '',
    regDate: new Date(),
    transCode: '',
    reasonCode: '',
    returnPriceType: '', // 화면표시용 - 잔액구분
    regPrice: '',
    errorMesaage: ''
})

const regReason = [
    { listName: '계좌입력오류', listValue: '01' },
    { listName: '금액입력오류', listValue: '02' },
    { listName: '이중입금', listValue: '03' },
    { listName: '고객 반환의사 표시로 재청구', listValue: '04' }
]

const returnPriceType = [
    { listName: '전액반환', listValue: 'all' },
    { listName: '부분반환', listValue: 'custom' }
]

// 컴포넌트 실행 분기
const componentsInfo = reactive({
    compName: null,
    compOption: null
})
// 컴포넌트 초기화
const closeComponent = (nowRun) => {
    if(!nowRun) {
        setTimeout(() => {
            componentsInfo.compName = null
            componentsInfo.compOption = null
        }, 600)
    } else {
        componentsInfo.compName = null
        componentsInfo.compOption = null
    }
}

// 컴포넌트 실행 전체
const runComp = (comps, directInput) => {
    componentsInfo.compName = markRaw(comps)
    if(comps === selectMyAccListInTypes) {
        componentsInfo.compOption = {
            bankingType: 'hmsec',
            bankCode: regInfo.returnBankCode,
            bankAccNumber: regInfo.returnBankAccNumber
        }
    } else if(comps === reSelect) {
        componentsInfo.compOption = {
            title: directInput === 'reasonCode' ? '청구사유' : '청구구분',
            selected: directInput === 'reasonCode' ? regInfo.reasonCode : regInfo.returnPriceType,
            listData: directInput === 'reasonCode' ? regReason : returnPriceType,
            returned: directInput
        }
    } else if(comps === regPrice) {
        componentsInfo.compOption = {
            bankCode: regInfo.returnBankCode,
            bankAccNumber: regInfo.returnBankAccNumber,
            sendPrice: regInfo.regPrice,
            maxPrice: props.options.transPrice
        }
    }
}
// 컴포넌트 종료 emit
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        if(comps === selectMyAccListInTypes) {
            regInfo.returnBankCode = returnVals.bankCode
            regInfo.returnBankAccNumber = returnVals.bankAccNumber
            closeComponent()
        } else if(comps === reSelect) {
            if(componentsInfo.compOption.returned === 'reasonCode') {
                regInfo.reasonCode = returnVals.listValue
            } else {
                regInfo.returnPriceType = returnVals.listValue
            }
            closeComponent()
        } else if(comps === regPrice) {
            if(returnVals !== true) {
                regInfo.regPrice = returnVals.returnNumber
                closeComponent()
            }
        }
    } else {
        closeComponent()
    }
}

// 청구금액 구분에 변경에 따른 청구액 변경
watch(() => regInfo.returnPriceType, () => {
    if(regInfo.returnPriceType === 'all') {
        regInfo.regPrice = props.options.transPrice
    } else {
        regInfo.regPrice = ''
    }
})

// 금액 직접 입력 시 오류사항 - 원청구금액 초과, 미입력
watch(() => regInfo.regPrice, () => {
    if(regInfo.regPrice > props.options.transPrice) {
        regInfo.errorMesaage = '원거래금액을 초과하였습니다.'
    } else {
        regInfo.errorMesaage = ''
    }
})

const returnVal = (val) => {
    $modalEnd('modalRegReturnFund')
    emit('runEmits', val)
}

const preRun = () => {
    regInfo.regPrice = props.options.transPrice
    regInfo.transCode = props.options.transCode
    $axios.get(myAccListAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                regInfo.returnBankCode = res.data.accList[0].bankCode
                regInfo.returnBankAccNumber = res.data.accList[0].bankAccNumber
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}

preRun()

// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('modalRegReturnFund')
})
</script>
<style lang="postcss" scoped>
h3:nth-of-type(1) { margin-top: 20px; }
.contentsArea { padding-left: 0 !important; padding-right: 0 !important; padding-bottom: 96px !important; }
.roundBox {
    & + h3 { margin-top: 24px; }
    & button:not(.resetInput), & label, & input { width: 100%; }
}
.simpleBox {
    margin: 0 20px;
    & button { width: 100%; }
}
</style>