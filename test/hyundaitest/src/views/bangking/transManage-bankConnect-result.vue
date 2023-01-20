<template>
<div>
    <section id="acctTrResult">
        <!-- 타이틀 -->
        <div class="centerTitle">
            <h2 class="resultPass">
                <strong>{{ $codeToBank(props.transInfo.reciveAccInfo.bankCode).korName }}</strong>에서<br>
                <strong>{{ $priceToCommas(props.transInfo.reciveAccInfo.sendPrice) }}원</strong>을 입금했습니다.
            </h2>
        </div>
        <!-- 이체정보내용-->
        <ol class="roundBox">
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
            <li>
                <span>거래일자</span>
                <strong>{{ props.transInfo.resultInfo.transDate }}원</strong>
            </li>
        </ol>
        <!-- 이체계좌추가 -->
        <div class="circleStBtnArea right">
            <button class="icoCheck right">
                <span>입금내역확인</span>
            </button>
        </div>
    </section>
    <div class="bottomBtnArea">
        <button typw="button" class="h50 pointBlue"
            @click="endTrans()">
            확인
        </button>
    </div>
</div>
</template>

<script setup>
import { inject } from 'vue'
const $codeToBank = inject('$codeToBank')
const $priceToCommas = inject('$priceToCommas')
const $hmsecToDash = inject('$hmsecToDash')
const props = defineProps(['transInfo'])
const emit = defineEmits(['runEmits'])

// 비정상 접속시 메인으로 이동
if(props.transInfo.bankCode === '' || props.transInfo.bankAccNumber === '') {
    emit('runEmits', false)
}

// 종료 프로세스
const endTrans = () => {
    emit('runEmits', false)
}
</script>
<style lang="postcss" scoped>
.circleStBtnArea { padding: 18px 20px; }
</style>