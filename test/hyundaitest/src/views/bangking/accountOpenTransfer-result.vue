<template>
<div v-if="props.transInfo.bankCode !== '' || props.transInfo.bankAccNumber !== ''">
    <!-- 이체결과 확인 -->
    <section id="acctTrResult">
        <!-- 타이틀 -->
        <div class="centerTitle">
            <h2 class="resultPass">
                <strong>{{ props.transInfo.sendAccInfo[0].ownerName }}</strong>에게<br>
                <strong>{{ $priceToCommas(props.transInfo.sendAccInfo[0].sendPrice) }}원</strong>을 보냈습니다.
            </h2>
        </div>
        <!-- 이체정보내용-->
        <ol class="roundBox dist8">
            <li>
                <span>출금</span>
                <strong>
                    {{ $codeToBank(props.transInfo.bankCode).korName }}
                    {{ props.transInfo.bankCode === '263' ? $hmsecToDash(props.transInfo.bankAccNumber) : props.transInfo.bankAccNumber }}
                </strong>
            </li>
            <li>
                <span>입금</span>
                <strong>
                    <template v-if="!props.transInfo.sendAccInfo[0].isPhoneNumber">
                        {{ $codeToBank(props.transInfo.sendAccInfo[0].bankCode).korName }}
                        {{
                            props.transInfo.sendAccInfo[0].bankCode === '263' ?
                            $hmsecToDash(props.transInfo.sendAccInfo[0].bankAccNumber) : props.transInfo.sendAccInfo[0].bankAccNumber
                        }}
                    </template>
                    <template v-else>
                        {{ props.transInfo.sendAccInfo[0].ownerName }}
                        {{ props.transInfo.sendAccInfo[0].bankAccNumber }}
                    </template>
                </strong>
            </li>
            <li>
                <span>수수료</span>
                <strong>
                    {{
                        props.transInfo.sendAccInfo[0].feePrice === 0 ?
                        '무료' : $priceToCommas(props.transInfo.sendAccInfo[0].feePrice) + '원'
                    }}
                </strong>
            </li>
            <li>
                <span>잔액</span>
                <strong>{{ $priceToCommas(props.transInfo.resultInfo.balance) }}원</strong>
            </li>
        </ol>
        <!-- 이체정보 & 결과내역 영역-->
        <ol class="simpleBox dist18">
            <!-- 받는분 표시정보 -->
            <li data-name="toReceiver">
                <span>받는 분에게 표시</span>
                <strong>{{ props.transInfo.sendAccInfo[0].reciverText }}</strong>
            </li>
            <!-- 내통장 표시정보 -->
            <li data-name="toMyAccunt">
                <span>내 통장에 표시</span>
                <strong>{{ props.transInfo.sendAccInfo[0].senderText }}</strong>
            </li>
            <!-- 연락처 이체안내 -->
            <li v-if="props.transInfo.sendAccInfo[0].isPhoneNumber">
                <span>연락처 이체 안내</span>
                <ol class="roundBox innerList">
                    <li>
                        <ol class="black">
                            <li>
                                <sapn class="fontPointBlue">{{ props.transInfo.sendAccInfo[0].ownerName }}</sapn>님이 2022.08.25 오후 5시까지 입금신청을 하지 않으면 보낸 돈이 다시 내 계좌로 자동 환불 처리 됩니다.</li>
                            <li>이체거래 제한 시간: 23시 ~ 02시</li>
                        </ol>
                    </li>
                </ol>
                <!-- sms전송 선택 -->
                <div class="checkTrInfo wrapArea">
                    <a href="javascript:;" data-way="sms"
                        @click="sendMassage('sms')">SMS로 전송</a>
                    <hr>
                    <a href="javascript:;" data-way="kakao"
                        @click="sendMassage('kakao')">카카오톡 전송</a>
                </div>
            </li>
            <hr>
            <!-- 이체정보관련 버튼 -->
            <li class="circleStBtnArea right">
                <!-- 거래내역 페이지 완료 시 연결 -->
                <button class="icoHistory right">
                    <span>거래내역조회</span>
                </button>
            </li>
        </ol>
    </section>
    <!-- 확인버튼 & 배너광고-->
    <div class="bottomBtnArea">
        <!-- 예약이체건 : 지연이체 알림팝업  / 일반이체 : 이체화면으로 이동 -->
        <button type="button"
            class="h50 pointBlue"
            @click="endTrans()">확인</button>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOptions"
        @runEmits="closeComp" />
</div>
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import modalSendSms from '@/components/banking/modalSendSms.vue' // 연락처 이체시 문자보내기
import modalDelayTransferNote from '@/components/banking/modalDelayTransferNote.vue' // 지연 이체 안내
const $priceToCommas = inject('$priceToCommas')
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
const props = defineProps(['transInfo'])
const emit = defineEmits(['runEmits'])

// 컴포넌트 실행 분기
const componentsInfo = reactive({
    compName: null,
    compOptions: null
})
// 컴포넌트 초기화
const closeComponent = (nowRun) => {
    if(!nowRun) {
        setTimeout(() => {
            componentsInfo.compName = null
            componentsInfo.compOptions = null
        }, 600)
    } else {
        componentsInfo.compName = null
        componentsInfo.compOptions = null
    }
}
// 컴포넌트 시작
const runComp = (comps) => {
    if(comps === modalSendSms) {
        componentsInfo.compName = markRaw(comps)
        componentsInfo.compOptions = {
            userName: props.transInfo.userName,
            userCelphone: props.transInfo.userCelphone,
            reciverName: props.transInfo.sendAccInfo[0].ownerName,
            sendPrice: props.transInfo.sendAccInfo[0].sendPrice
        }
    } else {
        componentsInfo.compName = markRaw(comps)
    }
}
// 컴포넌트 종료
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(comps === modalDelayTransferNote) {
        emit('runEmits', false)
    } else {
        closeComponent()
    }
}

// 연락처로 보낼 시 메세지 송부
const sendMassage = (sendType) => {
    if(sendType === 'kakao') {
        // 카카오톡 실행 분기
    } else {
        // SMS 실행분기
        runComp(modalSendSms)
    }
}


// 이체 종료 [확인]버튼 클릭시
const endTrans = () => {
    if(props.transInfo.isDelayTrans) {
        // 지연계좌 이체일 시 안내
        runComp(modalDelayTransferNote)
    } else {
        emit('runEmits', false)
    }
}

// 최초 입력정보 없을 시 이체 초기페이지로 이동
if(props.transInfo.bankCode === '' || props.transInfo.bankAccNumber === '') {
    emit('runEmits', false)
}

</script>
<style lang="postcss" scoped>
#acctTrResult {
    min-height: calc(100% - 126px);
    /* 이체정보관련 버튼  */
    & .circleStBtnArea {
        & span {
            min-width:76px;
        }
    }
}
.simpleBox {
    padding: 18px 20px 18px;
}
.bottomBtnArea > button { min-width: 100%; }
/* 연락처 - sms전송 방법 선택 */
.checkTrInfo { margin-top: 24px; }
</style>