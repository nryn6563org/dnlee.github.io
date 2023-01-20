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
        <ol class="roundBox bgBlue">
            <li>
                <span>출금</span>
                <strong>
                    {{ $codeToBank(props.transInfo.bankCode).korName }}
                    {{ props.transInfo.bankCode === '263' ?
                        $hmsecToDash(props.transInfo.bankAccNumber) : props.transInfo.bankAccNumber }}
                </strong>
            </li>
            <li>
                <span>입금</span>
                <strong>
                    {{ $codeToBank(props.transInfo.sendAccInfo[0].bankCode).korName }}
                    {{ props.transInfo.sendAccInfo[0].bankCode === '263' ?
                        $hmsecToDash(props.transInfo.sendAccInfo[0].bankAccNumber) : props.transInfo.sendAccInfo[0].bankAccNumber }}
                </strong>
            </li>
            <li>
                <span>수수료</span>
                <!-- 예약이체 여부에 따른 체크 -->
                <template v-if="!resultInfo.isResereve">
                    <strong class="fontPointBlue"
                        v-if="resultInfo.feePrice === 0 ">무료</strong>
                    <strong v-else style="font-weight: 400;">{{ resultInfo.feePrice }}원</strong>
                </template>
                <!-- 예약이체가 아닐 시 -->
                <!-- 당행 > 당행 | 당행 > 타행으로만 체크 -->
                <template v-else>
                    <strong class="fontPointBlue"
                        v-if="props.transInfo.bankCode === props.transInfo.sendAccInfo[0].bankCode ">무료</strong>
                    <strong v-else style="font-weight: 400;">-</strong>
                </template>
            </li>
        </ol>
        <!-- 이체정보 & 결과내역 영역-->
        <ol class="simpleBox dist18">
            <!-- 소액대출계좌 : 소액대출인경우만 노출 -->
            <template v-if="props.transInfo.isLoanAcc && useLoanCheck() > 0">
                <li>
                    <span>소액대출금</span>
                    <strong>{{ $priceToCommas(resultInfo.useLoan) }}원</strong>
                </li>
                <hr>
            </template>
            <template v-if="!props.transInfo.sendAccInfo[0].isPhoneNumber">
                <!-- 받는분 표시정보 -->
                <li>
                    <span>받는 분에게 표시</span>
                    <!-- 요소 확인 필요 : button OR input -->
                    <strong>
                        <a href="javascript:;" class="regName afterIcon"
                            @click="runComp(regName, 'reciver')">
                            {{ resultInfo.reciverText }}
                        </a>
                    </strong>
                </li>
            </template>
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
            <hr>
            <!-- 예약이체 여부 check : 현대차 출금계좌일 경우만 노출-->
            <li v-if="props.transInfo.bankCode === '263' && !props.transInfo.sendAccInfo[0].isPhoneNumber"
                data-name="resTransfer" :class="[ resultInfo.isReserve ? 'on' : '']">
                <span>예약이체</span>
                <label for="res">
                    <input type="checkbox" id="res" v-model="resultInfo.isReserve">
                    <div class="switch"></div>
                </label>
            </li>
            <template v-if="resultInfo.isReserve">
                <li>
                    <!-- 예약이체 checked 일때 노출 -->
                    <!-- 날짜 -->
                    <div class="cal wrapArea">
                        <label for="fromDate">
                            <input id="fromDate" type="text" class="h50" readonly
                                :value="$dateToCommas(resultInfo.reserveDate)"
                                @focus="runComp(regDate)">
                            <button type="button" @click="runComp(datePicker)"></button>
                        </label>
                    </div>
                </li>
                <li>
                    <span>예약시간</span>
                    <p>
                        <label for="reserveAm">
                            <input type="radio" id="reserveAm"
                                name="reserveTime" value="am" checked
                                @change="checkReserveTime($event)">
                            <div class="check">
                                <span>오전(9:30)</span>
                            </div>
                        </label>
                        <label for="reservePm">
                            <input type="radio" id="reservePm"
                                name="reserveTime" value="pm"
                                @change="checkReserveTime($event)">
                            <div class="check">
                                <span>오후(15:50)</span>
                            </div>
                        </label>
                    </p>
                    <ol class="wrapArea roundBox innerList">
                        <li>
                            <ol class="black">
                                <li>
                                    예약이체는 영업일에만 처리가능합니다.<br>
                                    (비영업일 선택 시 처리 불가합니다.)<br>
                                    <a href="javascript:;" class="inArrow noLine"
                                        @click="runComp(modalResTransferNote)">
                                        예약이체안내
                                    </a>
                                </li>
                            </ol>
                        </li>
                    </ol>
                    <!-- 예약이체 안내 팝업 -->
                </li>
            </template>
            <hr v-if="props.transInfo.bankCode === '263' && !props.transInfo.sendAccInfo[0].isPhoneNumber">
            <!-- 연금계좌인출확인 : 연금계좌저축 출금계좌일 경우만 노출 -->
            <!-- 임시로 계좌 종류에 대한 코드값을 연금을 03으로 지정 -->
            <!-- 소득세, 지방소득세에 대한 정책 없음 - 임시로 소득세 총합과 지방소득세 총합, 모든 소득세의 합으로 구성함 -->
            <template v-if="props.transInfo.bankAccTypeCode === '03'">
                <li>
                    <span>연금계좌인출확인</span>
                    <div class="basicTable wrapArea">
                        <table class="tdRight">
                            <colgroup>
                                <col width="169px">
                                <col width="*">
                            </colgroup>
                            <tr>
                                <th>소득(가산)세</th>
                                <td>{{ resultInfo.pensionInfo.otherTax + resultInfo.pensionInfo.pensionTax + resultInfo.pensionInfo.terminationTax }}원</td>
                            </tr>
                            <tr>
                                <th>지방소득세</th>
                                <td>{{ resultInfo.pensionInfo.otherLocalTax + resultInfo.pensionInfo.pensionLocalTax + resultInfo.pensionInfo.terminationLocalTax }}원</td>
                            </tr>
                            <tr class="totalArea">
                                <th>세금 합계</th>
                                <td>{{
                                        resultInfo.pensionInfo.otherTax + resultInfo.pensionInfo.pensionTax + resultInfo.pensionInfo.terminationTax +
                                        resultInfo.pensionInfo.otherLocalTax + resultInfo.pensionInfo.pensionLocalTax + resultInfo.pensionInfo.terminationLocalTax
                                    }}원</td>
                            </tr>
                        </table>
                    </div>
                    <label for="confirm">
                        <input type="checkbox" id="confirm"
                            :checked="resultInfo.pensionCheck"
                            @change="doPensionCheck($event)">
                        <div>연금계좌인출 금액을 확인하였습니다.</div>
                    </label>
                </li>
                <hr>
            </template>
            <template v-if="props.transInfo.sendAccInfo[0].isPhoneNumber">
                <!-- 알림발송 : 연락처로 보내기 일때만 노출-->
                <li>
                    <p>알림발송</p>
                    <form>
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
                    </form>
                </li>
                <hr>
            </template>
            <!-- 이체정보관련 버튼 -->
            <li class="right circleStBtnArea">
                <button class="icoPlus right"
                    @click="moveToMuliTrans()"><span>이체 추가하기</span>
                </button>
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
import { useRouter } from 'vue-router'
import modalResTransferNote from '@/components/banking/modalResTransferNote.vue' // 예약이체 안내 팝업 (예약 옵션 내 예약이체 안내 버튼)
import modalPensionAcctWd from '@/components/banking/modalPensionAcctWd.vue' // 연금계좌인출확인
import modalVoicePhishing from '@/components/banking/modalVoicePhishing.vue' // 보이스피싱 관련 팝업 (500만원 이상 일 경우)
import modalCheckPension from '@/components/banking/modalCheckPension.vue' // 연금계좌인출 금액 확인(체크박스 체크 안됐을 때) 팝업
import modalDelayTransfer from '@/components/banking/modalDelayTransfer.vue' // 지연이체(지연이체 대상)
import modalRejectTransfer from '@/components/banking/modalRejectTransfer.vue' // FDS차단으로 인한 거래 불가 안내
import modalSameTransfer from '@/components/banking/modalSameTransfer.vue' // 중복이체여부확인 (중복계좌일 경우)
import datePicker from '@/components/global/datePicker.vue' // 데이트 피커
import regDate from '@/components/global/regDate.vue' // 날짜 직접 입력
import regName from '@/components/banking/regName.vue' // 실명입력
const $axios = inject('$axios')
const $router = useRouter()
const $priceToCommas = inject('$priceToCommas')
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
const $dateToCommas = inject('$dateToCommas')
const props = defineProps(['transInfo'])
const emit = defineEmits(['runEmits'])
const feeCheckAPI = '/json/banking/feeCheck.json' // 잔액 조회 API
const transResultAPI = '/json/banking/transResult.json' // 이체 결과 조회 API - affective 200일 시 result로 이동
const pensionTransCheckAPI = '/json/banking/pensionTransCheck.json' // 계좌 종류가 연금일 시 이체 정보 조회

// 이체 결과 데이터
const resultInfo = reactive({
    useLoan: '', // 대출금
    balance: '', // 잔금
    isReserve: false, // 예약이체 여부
    reserveDate: new Date(), // 예약일
    reserveTime: 'am', // 예약시간 am | pm
    reciverText: '', //  받는 분통장 표시
    senderText: '', // 내 통장 표시
    feePrice: 0, // 수수료
    messengerType: 'sms', // 메세지 발송타입 - 모바일 이체시만 사용 sms | kakao
    resultCode: '', // 00 정상, 01 지연이체계좌, 02 중복이체, 03 FDS체크 차단
    pensionCheck: false, // 연금계좌일 시 연금계좌 확인 여부
    phisingCheck: false, // 보이스 피싱 체크 확인여부
    pensionInfo: {
        resultCode: '',
        trnsferPrice: 0, // 이체금액
        texFreeWithdrawal: 0, // 비과세 출금액
        texWithdrawal: 0, // 과세 출금액
        closeReason: '', // 해지사유
        otherTax: 0, // 기타소득세
        otherLocalTax: 0, // 기타소득의 지방소득세
        pensionTax: 0, // 연금소득세
        pensionLocalTax: 0, // 연금소득의 지방소득세
        terminationTax: 0, // 해지가산세
        terminationLocalTax: 0, // 해지가산세의 지방소득세
        feePrice: 0, // 이체수수료
        totalAccWithdrawal: 0, // 계좌 총 출금액 (실제이체금액으로 추측)
        totalTax: 0 // 과세종합
    }
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
    if(comps === datePicker) {
        const today = new Date()
        const maxDate = new Date(today.setMonth(today.getMonth() + 6))
        componentsInfo.compOption = {
            dateInfo: resultInfo.reserveDate,
            minDate: new Date(),
            maxDate: maxDate
        }
    } else if(comps === regDate) {
        componentsInfo.compOption = { checkedDate: resultInfo.reserveDate }
    } else if(comps === regName) {
        componentsInfo.compOption = { type: directInput }
    } else if(comps === modalPensionAcctWd) {
        componentsInfo.compOption = { pensionInfo: resultInfo.pensionInfo }
    }
}

// 컴포넌트 종료 emit
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(comps === datePicker) {
        resultInfo.reserveDate = returnVals
        closeComponent()
    } else if(comps === regName || comps === regDate) {
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
    } else if(comps === modalVoicePhishing) {
        if(returnVals === true) {
            resultEmit()
        } else {
            cacelTransfer()
        }
    } else if(comps === modalDelayTransfer) {
        // 지연이체 설정 페이지 이동
    } else if(comps === modalDelayTransfer) {
        cacelTransfer()
    } else {
        closeComponent()
    }
}

// 대출금 사용여부 체크 및 대출금 리턴
// 금액 입력 파트에서 송부가능 금액 여부 체크 완
// 송금금액보다 출금가능 금액이 크면 남은금액을 반환한다.
const useLoanCheck = () => {
    let retunPrice = 0
    if(props.transInfo.possibleAmount < props.transInfo.sendAccInfo[0].sendPrice) {
        retunPrice = props.transInfo.sendAccInfo[0].sendPrice - props.transInfo.possibleAmount
        resultInfo.useLoan = retunPrice
    }
}
// 시간대 선택
const checkReserveTime = (ev) => {
    if(ev.target.checked) {
        resultInfo.reserveTime = ev.target.value
    }
}
// 문자발송타입 선택
const checkMessengerType = (ev) => {
    if(ev.target.checked) {
        resultInfo.messengerType = ev.target.value
    }
}
// 연금계좌 확인
const doPensionCheck = (ev) => {
    resultInfo.pensionCheck = ev.target.checked
    if(ev.target.checked) {
        runComp(modalPensionAcctWd)
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
    } else if(props.transInfo.bankAccTypeCode === '03' && !resultInfo.pensionCheck) {
        // 연금계좌일 시 연금계좌 출금액 미확인 시
        runComp(modalCheckPension)
    } else {
        $axios.get(transResultAPI, {})
            .then(function(res) {
                // resultCode 퍼블 결과 관련
                // affective 200(정상) - 결과 이동
                // affective 202 (| 01(중복이체) | 02(지연이체 계좌) | 03(FDS 차단 안내)
                if(res.data.affective === 200) {
                    resultInfo.resultCode = '00'
                    resultInfo.balance = res.data.result.balance
                    resultEmit()
                } else if(res.data.affective === 202) {
                    if(res.data.result.resultCode === '01') {
                        runComp(modalSameTransfer)
                        resultInfo.resultCode = '01'
                        resultInfo.balance = res.data.result.balance
                    } else if (res.data.result.resultCode === '02') {
                        runComp(modalDelayTransfer)
                        resultInfo.resultCode = '02'
                        resultInfo.balance = res.data.result.balance
                    } else if (res.data.result.resultCode === '03') {
                        runComp(modalRejectTransfer)
                    }
                } else {
                    // 기타 에러상태
                }
            })
            .catch(function(err) {
                console.log(err)
            })
    }
}
// 성공 프로세스에서 emit처리
const resultEmit = () => {
    emit('runEmits', resultInfo)
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
                // 대출계좌일 시 대출금 계산
                useLoanCheck()
                // 연금일 시 연금 정보 불러오기
                getPensionInfo()
            } else {
                // 에러상황
            }
        })
        .catch(function(err) {
            console.log(err)
        })
    const getPensionInfo = () => {
        if(props.transInfo.bankAccTypeCode === '03') {
            $axios.get(pensionTransCheckAPI, {})
                .then(function(res) {
                    if(res.data.affective === 200) {
                        console.log(res.data)
                        resultInfo.pensionInfo = res.data.pensionInfo
                    }
                })
                .catch(function(err) {
                    console.log(err)
                })
        }
    }
}

const moveToMuliTrans = () => {
    $router.push({ name: 'accountMultiTransferMain' })
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
    padding: 18px 20px 18px;
    & label + label { margin-left: 12px; }
    & .roundBox {
        margin: 18px 0 0; padding: 12px 20px 18px;
        & a { margin-top: 12px; color: var(--black); }
    }
    & .circleStBtnArea {
        margin-left: 0; margin-right: 0; padding: 0;
    }
    & .basicTable {
        margin: 8px 0 18px;
    }
}
#acctTrConfirm { padding-bottom: 76px; }

</style>