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
                    <strong>{{ props.options.resultInfo.regDate }}</strong>
                </li>
                <li>
                    <span>청구사유</span>
                    <strong>{{ regReason.filter(el => el.listValue === props.options.resultInfo.reasonCode)[0].listName }}</strong>
                </li>
                <li>
                    <span>청구구분</span>
                    <strong>{{ props.options.transPrice === props.options.resultInfo.resultInfo ? '전액' : '부분' }}반환</strong>
                </li>
                <li>
                    <span>청구금액</span>
                    <strong>{{ $priceToCommas(props.options.resultInfo.regPrice) }}</strong>
                </li>
            </ol>
            <h3>반환청구</h3>
            <ol class="roundBox dist8">
                <li>
                    <span>입금계좌</span>
                    <strong>
                        {{ $codeToBank(props.options.resultInfo.returnBankCode).korName }}
                        {{ $hmsecToDash(props.options.resultInfo.returnBankAccNumber) }}
                    </strong>
                </li>
                <li>
                    <span>처리일</span>
                    <strong>{{ props.options.resultInfo.processDate }}</strong>
                </li>
                <li>
                    <span>처리상태</span>
                    <strong :class="[ props.options.resultInfo.resultCode === '02' ? 'fontRed' : 'fontPointBlue' ]">{{ resultType.filter(el => el.listValue === props.options.resultInfo.resultCode)[0].listName }}</strong>
                </li>
            </ol>
        </div>
        <div class="buttonArea">
            <button type="button" class="pointBlue h50"
                @click="returnVal(false)"
                >확인
            </button>
        </div>
    </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
const $priceToCommas = inject('$priceToCommas')
const props = defineProps(['options'])
const emit = defineEmits(['runEmits'])

const regReason = [
    { listName: '계좌입력오류', listValue: '01' },
    { listName: '금액입력오류', listValue: '02' },
    { listName: '이중입금', listValue: '03' },
    { listName: '고객 반환의사 표시로 재청구', listValue: '04' }
]

const resultType = [
    { listName: '반환완료', listValue: '00' },
    { listName: '반환진행중', listValue: '01' },
    { listName: '반환출금거절', listValue: '02' }
]

const returnVal = (val) => {
    if(typeof val === 'undefined') val = false
    $modalEnd('modalRegReturnFund')
    emit('runEmits', val)
}

// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('modalRegReturnFund')
})
</script>

<style lang="postcss" scoped>
h3:nth-of-type(1) { margin-top: 20px; }
.contentsArea { padding-left: 0 !important; padding-right: 0 !important; padding-bottom: 96px !important; }
.roundBox + h3 { margin-top: 24px; }
</style>