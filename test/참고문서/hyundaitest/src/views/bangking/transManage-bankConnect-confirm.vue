<template>
<div>
    <!-- 이체정보확인 -->
    <section id="acctTrConfirm">
        <!-- 타이틀 -->
        <div class="centerTitle">
            <h2>
                <strong>{{ $codeToBank(props.transInfo.reciveAccInfo.bankCode).korName }}</strong>에서<br>
                <strong>{{ $priceToCommas(props.transInfo.reciveAccInfo.sendPrice) }}원</strong>을 입금합니다.
            </h2>
        </div>
         <!-- 이체정보내용 공통 스타일 .infoConfirm-->
        <ol class="roundBox bgBlue">
            <li>
                <span>출금</span>
                <strong>
                    {{ $codeToBank(props.transInfo.reciveAccInfo.bankCode).korName }}
                    {{ props.transInfo.reciveAccInfo.bankCode === '263' ?
                        $hmsecToDash(props.transInfo.reciveAccInfo.bankAccNumber) : props.transInfo.reciveAccInfo.bankAccNumber }}
                </strong>
            </li>
            <li>
                <span>입금</span>
                <strong>
                    {{ $codeToBank(props.transInfo.bankCode).korName }}
                    {{ props.transInfo.bankCode === '263' ?
                        $hmsecToDash(props.transInfo.bankAccNumber) : props.transInfo.bankAccNumber }}
                </strong>
            </li>
            <li>
                <span>이체금액</span>
                <strong>
                    {{ $priceToCommas(props.transInfo.reciveAccInfo.sendPrice) }}원
                </strong>
            </li>
        </ol>
    </section>
    <div class="buttonArea">
        <button typw="button" class="h50 pointBlue"
            @click="doTransfer()">
            이체하기
        </button>
    </div>
</div>
</template>

<script setup>
import { inject, reactive } from 'vue'
const $codeToBank = inject('$codeToBank')
const $priceToCommas = inject('$priceToCommas')
const $hmsecToDash = inject('$hmsecToDash')
const $axios = inject('$axios')
const props = defineProps(['transInfo'])
const emit = defineEmits(['runEmits'])
const transResultAPI = '/json/banking/transResult.json' // 이체 결과 조회 API - affective 200일 시 result로 이동

// 비정상 접속시 메인으로 이동
if(props.transInfo.bankCode === '' || props.transInfo.bankAccNumber === '') {
    emit('runEmits', false)
}

const resultInfo = reactive({
    resultCode: '', // 실패 시나리오를 위한 변수
    transDate: ''
})

const doTransfer = () => {
    // 실패시나리오 없음 - 기획 확인 필요
    $axios.get(transResultAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                resultInfo.resultCode = res.data.result.resultCode
                resultInfo.transDate = res.data.result.transDate
                emit('runEmits', resultInfo)
            } else {
                // 이체 실패 시나리오
            }
        })
        .catch(function(err) {
            // API에러
            console.log(err)
        })
}
</script>