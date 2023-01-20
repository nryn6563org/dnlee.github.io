<template>
<!-- IRP 매도설정 -->
<div id= "sellIRPSet" class="fullPopup">
    <div class="header">
        <h1>IRP 매도설정</h1>
        <button class="modalClose" @click="returnVal(false)"></button>
    </div>
    <div id="contents" class="contentsArea">
        <div>
            <ul class="roundBox">
                <li>
                    <span>평가금액</span>
                    <p>{{ $priceToCommas(pageInfo.evalPrice) }}원</p>
                </li>
                <li>
                    <span>매도가능수량/금액</span>
                    <p>{{ $priceToCommas(pageInfo.ableSale) }}원</p>
                </li>
                <hr>
                <li>
                    <span>ETF매매한도 설정액(위험자산)</span>
                    <p>{{ $priceToCommas(pageInfo.maxAmount) }}원</p>
                </li>
                <li>
                    <span>ETF매매한도를 줄일까요?</span>
                    <p>{{ $priceToCommas(pageInfo.limitAmmonut) }}원</p>
                </li>
            </ul>
            <ol class="simpleBox">
                <li class="right">
                    <a href="javascript:;" class="blue noLine inArrow">ETF매매한도 설정</a>
                </li>
            </ol>
        </div>
        <form action="">
            <h4>매도방식</h4>
            <div class="tab">
                <label for="allSell">
                    <input type="radio" id="allSell" name="sellType"
                        :value="true"
                        v-model="pageInfo.isAllPrice">
                    <div>전액 매도</div>
                </label>
                <label for="someSell">
                    <input type="radio" id="someSell" name="sellType"
                        :value="false"
                        v-model="pageInfo.isAllPrice">
                    <div>일부 매도</div>
                </label>
            </div>
            <template v-if="!pageInfo.isAllPrice">
                <h4>일부매도 기준</h4>
                <div class="tab">
                    <label for="sellRatio">
                        <input type="radio" id="sellRatio" name="sellStandard" value="percent"
                            v-model="pageInfo.regUnit">
                        <div>비율</div>
                    </label>
                    <label for="sellMoney">
                        <input type="radio" id="sellMoney" name="sellStandard" value="price"
                            v-model="pageInfo.regUnit">
                        <div>금액</div>
                    </label>
                </div>
            </template>
            <!-- 원리금상품 (비율/금액) -->
            <h4>
                {{ pageInfo.regUnit === 'price' ? '매도금액' : '매도비율' }}
            </h4>
            <div>
                <!-- 일부매도기준 : 금액 -->
                <label v-if="pageInfo.regUnit === 'price'" class="price"
                    :class="{ 'hasReset' : !pageInfo.isAllPrice }">
                    <input type="text" class="h50" placeholder="금액 입력"
                        inputmode="none" readonly
                        @focus="runComp(regPriceInput)"
                        :value="$priceToCommas(pageInfo.regPrice) + (pageInfo.regPrice !== '' && pageInfo.regPrice !== 0 ? '원' : '')">
                    <button type="button" class="resetInput"
                        v-if="pageInfo.regPrice !== '' && pageInfo.regPrice !== 0 && !pageInfo.isAllPrice"
                        @click.prevent="pageInfo.regPrice = ''"></button>
                </label>
                <!-- 일부매도 기준 : 비율 -->
                <label v-else class="price hasReset">
                        <input type="text" class="h50" placeholder="금액 입력(%)"
                        inputmode="none" readonly
                        @focus="runComp(regPercentInput)"
                        :value="pageInfo.otherReg + (pageInfo.otherReg !== '' && pageInfo.otherReg !== 0 ? '%' : '')">
                    <button type="button" class="resetInput"
                        v-if="pageInfo.otherReg !== '' && pageInfo.otherReg !== 0"
                        @click.prevent="pageInfo.otherReg = ''"></button>
                </label>
            </div>
            <ol class="simpleBox" v-if="pageInfo.regUnit === 'percent'">
                <li>
                    <span>매도예정금액</span>
                    <p>{{ $priceToCommas(pageInfo.regPrice ) }}원</p>
                </li>
            </ol>
        </form>
    </div>
    <div class="buttonArea">
        <button type="button" class="pointBlue h50"
            :disabled="pageInfo.regPrice === '' || pageInfo.regPrice === 0"
            @click="returnVal(pageInfo.regPrice)">확인</button>
    </div>
</div>
<component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</template>
<script setup>
import { reactive, inject, onMounted, markRaw, watch } from 'vue'
import regPriceInput from '@/components/banking/regPriceInput.vue'
import regPercentInput from '@/components/banking/regPercentInput.vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $priceToCommas = inject('$priceToCommas')
const $axios = inject('$axios')
const emit = defineEmits(['runEmits'])
const props = defineProps(['options'])
const accIRPInfoAPI = '/json/banking/accIRPInfo.json'

// 페이지 정보
const pageInfo = reactive({
    bankAccNumber: props.options.bankAccNumber,
    evalPrice: '', // 평가금액
    ableSale: '', // 매도가능수량/금액
    maxAmount: '', // 매매한도 설정액
    limitAmmonut: '', // 매매한도 설정 최소금액
    isAllPrice: false, // 매도방식 전액 매도 여부
    priceType: false, //
    regPrice: '', // 매도금액
    regUnit: 'price', // price(금액), percent(퍼센트)
    otherReg: '' //  퍼센트 입력시 화면용 변수
})
watch(() => pageInfo.isAllPrice, () => {
    if (pageInfo.isAllPrice) {
        pageInfo.regPrice = JSON.parse(JSON.stringify(pageInfo.ableSale))
        pageInfo.priceType = 'price'
        pageInfo.otherReg = ''
    } else {
        pageInfo.regPrice = ''
        pageInfo.otherReg = ''
    }
})

watch(() => pageInfo.regUnit, () => {
    pageInfo.regPrice = ''
    pageInfo.otherReg = ''
})

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
// 컴포넌트 실행
const runComp = (comps, directInput) => {
    if (comps === regPriceInput) {
        if(!pageInfo.isAllPrice) {
            componentsInfo.compName = markRaw(comps)
            componentsInfo.compOption = {
                sendPrice: pageInfo.regPrice,
                maxPrice: pageInfo.maxAmount
            }
        }
    } else if(comps === regPercentInput) {
        componentsInfo.compName = markRaw(comps)
        componentsInfo.compOption = {
            percent: pageInfo.otherReg
        }
    }
}
// 컴포넌트 종료
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        if (comps === regPriceInput) {
            pageInfo.regPrice = returnVals.returnNumber
            closeComponent()
        } else if(comps === regPercentInput) {
            pageInfo.otherReg = returnVals.returnNumber
            pageInfo.regPrice = Math.floor(pageInfo.ableSale * pageInfo.otherReg / 100)
            closeComponent()
        }
    } else {
        closeComponent()
    }
}
const returnVal = (vals) => {
    $modalEnd('sellIRPSet')
    emit('runEmits', vals)
}

// 최초 계좌 정보 불러오기
const preRun = () => {
    $axios.get(accIRPInfoAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                pageInfo.evalPrice = res.data.accInfo.evalPrice
                pageInfo.ableSale = res.data.accInfo.ableSale
                pageInfo.maxAmount = res.data.accInfo.maxAmount
                pageInfo.limitAmmonut = res.data.accInfo.limitAmmonut
            } else {
                // 조회에러
            }
        })
        .catch(function(err) {
            // api 에러
            console.log(err)
        })
}
preRun()

onMounted(() => {
    $modalStart('sellIRPSet')
})
</script>
<style lang="postcss" scoped>
div.fullPopup > div.contentsArea {
    padding: 0;
    & > div {
        overflow: hidden;
        margin-bottom: 28px;
    }
    & > form {
        & > div {margin: 0 20px 28px;}
    }
}
h4 { color:rgba(140, 140, 140, 1);}
.simpleBox { margin-top: 8px; padding: 0 20px; }
label + .simple
.roundBox { margin-top: 20px; }
</style>