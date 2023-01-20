<template>
<div>
    <!-- 이체정보확인 -->
    <section id="openBankingbalance">
        <!-- 타이틀 -->
        <div class="centerTitle">
            <h2>
                <strong>총 {{ $priceToCommas(resultInfo.totalGetPrice) }}원</strong>을<br>
                가져오시겠습니까?
            </h2>
        </div>
        <!-- 이체정보내용 공통 스타일 .infoConfirm-->
        <ul class="bgBlue roundBox">
            <li>
                <span class="fontRed">입금계좌</span>
                <strong>
                    {{ $codeToBank(props.balanceInfo.bankCode).korName }}
                    {{ $hmsecToDash(props.balanceInfo.bankAccNumber) }}
                </strong>
            </li>
            <li>
                <span>수수료</span>
                <strong :class="{'fontPointBlue' : resultInfo.totalFeePrice === 0 }">
                    {{ resultInfo.totalFeePrice === 0 ? '무료' : $priceToCommas(resultInfo.totalFeePrice) + '원' }}
                </strong>
            </li>
        </ul>
        <ul class="bgBlue roundBox">
            <li>
                <span class="fontBlue">출금계좌</span>
                <strong>{{ resultInfo.accList.length }}건</strong>
            </li>
            <template v-for="(accInfo, index) in resultInfo.accList" :key="index">
                <hr>
                <li>
                    <span>계좌번호</span>
                    <strong>
                        {{ $codeToBank(accInfo.bankCode).korName }}
                        {{ accInfo.bankCode === '263' ? $hmsecToDash(accInfo.bankAccNumber) : accInfo.bankAccNumber }}
                    </strong>
                </li>
                <li>
                    <span>출금금액</span>
                    <strong>{{ $priceToCommas(accInfo.sendPrice) }}원</strong>
                </li>
                <li>
                    <span>수수료</span>
                    <strong :class="{'fontPointBlue' : accInfo.feePrice === 0 }">
                        {{ accInfo.feePrice === 0 ? '무료' : $priceToCommas(accInfo.feePrice) + '원' }}
                    </strong>
                </li>
            </template>
        </ul>
    </section>
    <!-- 하단 취소 & 확인버튼 -->
    <div class="buttonArea">
        <button typw="button" class="h50 pointBlue"
            @click="doTransfer()">
            잔액가져오기
        </button>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</div>
</template>
<script setup>
import { reactive, inject, markRaw } from 'vue'
import modalOpenBankingErr from '@/components/banking/modalOpenBankingErr.vue'
const $axios = inject('$axios')
const $priceToCommas = inject('$priceToCommas')
const $hmsecToDash = inject('$hmsecToDash')
const $codeToBank = inject('$codeToBank')
const props = defineProps(['balanceInfo'])
const emit = defineEmits(['runEmits'])
const feeCheckAPI = '/json/banking/feecheck.json'
const openBankingResultAPI = '/json/banking/openBankingResult.json'

const resultInfo = reactive({ // 이체결과정보
    totalGetPrice: 0,
    totalFeePrice: 0,
    resultCode: '',
    balance: '', // 잔금
    accList: new Array(0) // 수수료 데이터 추가용
})

// 컴포넌트 실행 분기
const componentsInfo = reactive({
    compName: null,
    compOption: null
})
// 컴포넌트 초기화
// 컴포넌트 애니메이션을 위해 nowRun === true가 아니면 600의 셋타임을 갖는다
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
// 일반 모달 종료
const runComp = (comps) => {
    // markRaw뒤에 컴포넌트 명 입력
    // 현재 실행중인 컴포넌트 중복 방지
    // 에러페이지 하나만 호출
    componentsInfo.compName = markRaw(comps)
    componentsInfo.compOption = { resultCode: resultInfo.resultCode }
}

// 컴포넌트 종료 emit
const closeComp = (returnVals) => {
    closeComponent()
}

const doTransfer = () => {
    // 결과 가져오기
    $axios.get(openBankingResultAPI, {})
        .then(function(res) {
            // resultCode 퍼블 결과 관련
            // affective 200(정상) - 결과 이동
            // affective 202 (| 오픈뱅킹 코드 관련 - A0000 -> 추가 코드는 common.js 에 케이스 표기)
            if(res.data.affective === 200) {
                resultInfo.resultCode = 'A0000'
                resultInfo.balance = res.data.result.balance
                emit('runEmits', resultInfo)
            } else if(res.data.affective === 202) {
                resultInfo.resultCode = res.data.result.resultCode
                resultInfo.resultMoreMsg = res.data.result.resultMoreMessage // 오류시 API상 노출되는 추가메세지 (메세지 필요 시에만 노출) A0009, A0021
                runComp(modalOpenBankingErr)
            } else {
                // 기타 에러상태
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}


const preRun = () => {
    let totalGetPrice = 0
    let totalFeePrice = 0
    props.balanceInfo.accList.forEach((el) => {
        const reMakeObj = el
        const addData = { feePrice: 0 }
        Object.assign(reMakeObj, addData)
        // console.log(reMakeObj)
        resultInfo.accList.push(reMakeObj)
        totalGetPrice += el.sendPrice
    })
    resultInfo.totalGetPrice = totalGetPrice
    $axios.get(feeCheckAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                res.data.feeLists.forEach(el => {
                    const matchCase = resultInfo.accList.filter(arr =>
                        arr.bankCode === el.bankCode && arr.bankNumber === el.bankNumber)
                    if(matchCase.length !== 0) {
                        matchCase.feePrice = el.feePrice
                        totalFeePrice += el.feePrice
                    }
                })
                resultInfo.totalFeePrice = totalFeePrice
                console.log(resultInfo)
            }
        })
        .catch(function(err) {
            // API에러
            console.log(err)
        })
}
preRun()
</script>

<style lang="postcss" scoped>
#openBankingbalance {
    min-height: calc(100% - 126px);
    padding-bottom: 96px;
    box-sizing: border-box;
    & .roundBox + .roundBox {
        margin-top: 20px;
    }
}
</style>
