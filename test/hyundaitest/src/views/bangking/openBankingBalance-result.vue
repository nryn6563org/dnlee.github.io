<template>
<div>
    <!-- 이체정보확인 -->
    <section id="openBankingbalance">
        <!-- 타이틀 -->
        <div class="centerTitle">
            <h2 class="resultPass">
                <strong>총 {{ $priceToCommas(props.balanceInfo.resultInfo.totalGetPrice) }}원</strong>을<br>
                가져왔습니다.
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
                <strong :class="{'fontPointBlue' : props.balanceInfo.resultInfo.totalFeePrice === 0 }">
                    {{ props.balanceInfo.resultInfo.totalFeePrice === 0 ? '무료' : $priceToCommas(props.balanceInfo.resultInfo.totalFeePrice) + '원' }}
                </strong>
            </li>
        </ul>
        <ul class="bgBlue roundBox">
            <li>
                <span class="fontBlue">출금계좌</span>
                <p>{{  props.balanceInfo.accList.length }}건</p>
            </li>
            <template v-for="(accInfo, index) in  props.balanceInfo.accList" :key="index">
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
        <div class="circleStBtnArea" data-name="btns">
            <!-- 버튼 : 예약이체 일때 거래내역조회 , 잔액조회 미노출-->
            <!-- 입금계좌가 내계좌일경우만 노출 || 사용자 명까지만 일치로 퍼블리싱 -->
            <button class="icoWon">
                <span>입금계좌 잔액조회</span></button>
            <!-- 거래내역 페이지 완료 시 연결 -->
            <button class="icoHistory right">
                <span>거래내역조회</span></button>
        </div>
    </section>
    <!-- 하단 취소 & 확인버튼 -->
    <div class="buttonArea">
        <button typw="button" class="h50 pointBlue"
            @click="emit('runEmits', false)">
            확인
        </button>
    </div>
</div>
</template>
<script setup>
import { reactive, inject } from 'vue'
const $priceToCommas = inject('$priceToCommas')
const $hmsecToDash = inject('$hmsecToDash')
const $codeToBank = inject('$codeToBank')
const props = defineProps(['balanceInfo'])
const emit = defineEmits(['runEmits'])

</script>

<style lang="postcss" scoped>
#openBankingbalance {
    min-height: calc(100% - 126px);
    padding-bottom: 96px;
    box-sizing: border-box;
    & .roundBox + .roundBox {
        margin-top: 20px;
    }
    & .circleStBtnArea {
        padding: 18px 20px 0;
    }
}
</style>
