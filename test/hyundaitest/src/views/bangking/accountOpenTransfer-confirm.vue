<template>
<div v-if="props.transInfo.bankCode !== '' || props.transInfo.bankAccNumber !== ''">
    <!-- 이체정보확인 -->
    <section id="acctTrConfirm">
        <!-- 타이틀 -->
        <div class="centerTitle">
            <h2>
                <strong>
                    {{ props.transInfo.sendAccInfo[0].ownerName }}</strong>에게<br>
                <strong>{{ $priceToCommas(props.transInfo.sendAccInfo[0].sendPrice) }}원</strong>을 보냅니다.
            </h2>
        </div>
        <!-- 이체정보내용 공통 스타일 .infoConfirm-->
        <ol class="bgBlue roundBox">
            <li>
                <span>출금</span>
                <p>
                    {{ $codeToBank(props.transInfo.bankCode).korName }}
                    {{ props.transInfo.bankCode === '263' ?
                        $hmsecToDash(props.transInfo.bankAccNumber) : props.transInfo.bankAccNumber }}
                </p>
            </li>
            <li>
                <span>입금</span>
                <p>
                    {{ $codeToBank(props.transInfo.sendAccInfo[0].bankCode).korName }}
                    {{ props.transInfo.sendAccInfo[0].bankCode === '263' ?
                        $hmsecToDash(props.transInfo.sendAccInfo[0].bankAccNumber) : props.transInfo.sendAccInfo[0].bankAccNumber }}
                </p>
            </li>
            <li>
                <span>수수료</span>
                <!-- 예약이체 여부에 따른 체크 -->
                <template v-if="!resultInfo.isResereve">
                    <p class="fontPointBlue"
                        v-if="resultInfo.feePrice === 0 ">무료</p>
                    <p v-else>{{ resultInfo.feePrice }}원</p>
                </template>
                <!-- 예약이체가 아닐 시 -->
                <!-- 당행 > 당행 | 당행 > 타행으로만 체크 -->
                <template v-else>
                    <p class="fontPointBlue"
                        v-if="props.transInfo.bankCode === props.transInfo.sendAccInfo[0].bankCode ">무료</p>
                    <p v-else>-</p>
                </template>
            </li>
        </ol>
        <!-- 이체정보 & 결과내역 영역-->
        <ol class="simpleBox dist18">
            <!-- 받는분 표시정보 -->
            <li v-if="!props.transInfo.sendAccInfo[0].isPhoneNumber">
                <span>받는 분에게 표시</span>
                <!-- 요소 확인 필요 : button OR input -->
                <strong>
                    <a href="javascript:;" class="regName afterIcon"
                        @click="runComp(regName, 'reciver')">
                        {{ resultInfo.reciverText }}
                    </a>
                </strong>
            </li>
            <!-- 내통장 표시정보 -->
            <li>
                <span>내 통장에 표시</span>
                <!-- 요소 확인 필요 -->
                <strong>
                    <a href="javascript:;" class="regName afterIcon"
                        @click="runComp(regName, 'sender')">
                        {{ resultInfo.senderText }}
                    </a>
                </strong>
            </li>
            <!-- 알림발송 : 연락처로 보내기 일때만 노출-->
            <li v-if="props.transInfo.sendAccInfo[0].isPhoneNumber">
                <span>알림발송</span>
                <div>
                    <label for="sms">
                        <input type="radio" id="sms"
                            name="messengerType" checked
                            @change="checkMessengerType($event)">
                        <div class="check">
                            <span>문자 발송</span>
                        </div>
                    </label>
                    <label for="kakao">
                        <input type="radio" id="kakao"
                            name="messengerType"
                            @change="checkMessengerType($event)">
                        <div class="check">
                            <span>카카오톡 발송</span>
                        </div>
                    </label>
                </div>
            </li>
        </ol>
    </section>
    <!-- 하단 취소 & 확인버튼 -->
    <div class="buttonArea div3_7">
        <button type="button" class="white h50 w100"
            @click="cacelTransfer()">
            취소
        </button>
        <button typw="button" class="h50 pointBlue"
            @click="doTransfer()">
            보내기
        </button>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</div>
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import modalVoicePhishing from '@/components/banking/modalVoicePhishing.vue' // 보이스피싱 관련 팝업 (500만원 이상 일 경우)
import regName from '@/components/banking/regName.vue' // 실명입력
import modalOpenBankingErr from '@/components/banking/modalOpenBankingErr.vue' // 오픈뱅킹 이체 확인시 에러 발생
const $axios = inject('$axios')
const $priceToCommas = inject('$priceToCommas')
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
const props = defineProps(['transInfo'])
const emit = defineEmits(['runEmits'])
const feeCheckAPI = '/json/banking/feeCheck.json' // 잔액 조회 API
const openBankingResultAPI = '/json/banking/openBankingResult.json' // 이체 결과 조회 API - affective 200일 시 result로 이동

// 이체 결과 데이터
const resultInfo = reactive({
    balance: '', // 잔금
    reciverText: '', //  받는 분통장 표시
    senderText: '', // 내 통장 표시
    feePrice: 0, // 수수료
    messengerType: 'sms', // 메세지 발송타입 - 모바일 이체시만 사용 sms | kakao
    resultCode: '', // 00 정상, 01 지연이체계좌, 02 중복이체, 03 FDS체크 차단
    resultMoreMsg: '', // 추가 메세지가 있을 시 안내 팝업 노출용
    phisingCheck: false // 보이스 피싱 체크 확인여부
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
const runComp = (comps, directInput) => {
    // markRaw뒤에 컴포넌트 명 입력
    // 현재 실행중인 컴포넌트 중복 방지
    componentsInfo.compName = markRaw(comps)
    if(comps === regName) {
        componentsInfo.compOption = { type: directInput }
    } else if(comps === modalOpenBankingErr) {
        componentsInfo.compOption = { resultCode: resultInfo.resultCode }
    }
}

// 컴포넌트 종료 emit
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(comps === regName) {
        if(returnVals !== false) {
            if(returnVals.type === 'reciver') {
                resultInfo.reciverText = returnVals.returnName
            } else if (returnVals.type === 'sender') {
                resultInfo.senderText = returnVals.returnName
            }
            closeComponent()
        } else {
            closeComponent()
        }
    } else if(comps === modalVoicePhishing) {
        if(returnVals === false) {
            resultInfo.phisingCheck = true
            doTransfer()
        } else {
            cacelTransfer()
        }
    } else {
        closeComponent()
    }
}

// 문자발송타입 선택
const checkMessengerType = (ev) => {
    if(ev.target.checked) {
        resultInfo.messengerType = ev.target.value
    }
}

// 취소
const cacelTransfer = () => {
    emit('runEmits', false)
}
// 이체 실행
const doTransfer = () => {
    // console.log(props.transInfo.sendAccInfop[0].sendPrice)
    if(props.transInfo.sendAccInfo[0].sendPrice >= 5000000 && !resultInfo.phisingCheck) {
        // 500만원 이상 보이스피싱 팝업 노출
        runComp(modalVoicePhishing)
    } else {
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
}


// 최초실행
const preRun = () => {
    resultInfo.reciverText = props.transInfo.userName
    resultInfo.senderText = props.transInfo.sendAccInfo[0].ownerName
    // 수수료 체크
    $axios.get(feeCheckAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                resultInfo.feePrice = res.data.feeLists[0].feePrice
            } else {
                // 에러상황
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}

// 최초 입력정보 없을 시 이체 초기페이지로 이동
if(props.transInfo.bankCode === '' || props.transInfo.bankAccNumber === '') {
    emit('runEmits', false)
} else {
    preRun()
}
</script>
<style lang="postcss" scoped>
.simpleBox {
    margin-top: 20px; padding: 0 20px;
    & div > label + label { margin-left: 13px; }
}
</style>