<template>
<div>
    <!-- 다계좌이체 정보확인 -->
    <section id="multiTrConfirm">
        <div class="centerTitle">
            <h2>
                총 <strong>{{ $priceToCommas(resultInfo.totalTransPrice) }}원</strong><br>
                <strong>{{ transInfo.sendAccInfo.length }}건</strong>을 이체합니다.
            </h2>
        </div>
        <!-- 이체정보내용-->
        <ul class="bgBlue roundBox">
            <li>
                <span>출금</span>
                <p>
                    {{ $codeToBank(props.transInfo.bankCode).korName  }}
                    {{ props.transInfo.bankCode === '263' ? $hmsecToDash(props.transInfo.bankAccNumber) : props.transInfo.bankAccNumber }}
                </p>
            </li>
            <li>
                <span>수수료</span>
                <p v-if="resultInfo.totalFeePrice === 0" class="fontPointBlue">무료</p>
                <p v-else>{{ $priceToCommas(resultInfo.totalFeePrice) }}원</p>
            </li>
        </ul>
        <!-- 연금계좌인출확인 : 연금계좌저축 출금계좌일 경우만 노출 -->
        <!-- 임시로 계좌 종류에 대한 코드값을 연금을 03으로 지정 -->
        <!-- 소득세, 지방소득세에 대한 정책 없음 - 임시로 소득세 총합과 지방소득세 총합, 모든 소득세의 합으로 구성함 -->
        <div v-if="props.transInfo.bankAccTypeCode === '03'">
            <h4 class="gray">연금계좌인출확인</h4>
            <div class="basicTable">
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
            <div class="listSort">
                <label for="confirm">
                    <input type="checkbox" id="confirm"
                        :checked="resultInfo.pensionCheck"
                        @change="doPensionCheck($event)">
                    <div>연금계좌인출 금액을 확인하였습니다.</div>
                </label>
            </div>
        </div>
        <hr>
        <!--이체정보 목록-->
        <ul class="accList dropDown">
            <li v-for="(accInfo, index) in transInfo.sendAccInfo" :key="index">
                <a href="javascript:;"
                    :clas="{ 'on': slideLists.viewIndex[index].isOpen}"
                    @click="slideLists.viewIndex[index].isOpen = !slideLists.viewIndex[index].isOpen">
                    <img :src="'/images/logos/' + accInfo.bankCode + '.png'"
                        :alt="$codeToBank(accInfo.bankCode).korName + ' 로고'" />
                    <h2>
                        {{ accInfo.ownerName }}
                        <span class="fontPointBlue">{{ $priceToCommas(accInfo.sendPrice) }}원</span>
                    </h2>
                    <p>
                        {{ $codeToBank(accInfo.bankCode).korName }}
                        {{ accInfo.bankCode === '263' ? $hmsecToDash(accInfo.bankAccNumber) : accInfo.bankAccNumber }}
                    </p>
                </a>
                <transition name="slideVertical">
                    <ol class="squareBox dist8" v-if="slideLists.viewIndex[index].isOpen">
                        <li>
                            <span>수수료</span>
                            <!-- 무료-->
                            <p v-if="accInfo.feePrice === 0" class="fontPointBlue">무료</p>
                            <p v-else>{{ $priceToCommas(accInfo.feePrice) }}원</p>
                        </li>
                        <!-- 소액대출시에만 노출 -->
                        <li>
                            <span>받는 분에게 표시</span>
                            <a href="javascript:;" class="regName afterIcon"
                                @click="runComp(regName, index+'/reciver')">{{ accInfo.reciverText }}</a>
                        </li>
                        <li>
                            <span>내 통장에 표시</span>
                            <a href="javascript:;" class="regName afterIcon"
                                @click="runComp(regName, index+'/sender')">{{ accInfo.senderText }}</a>
                        </li>
                    </ol>
                </transition>
            </li>
        </ul>
        <!-- 이체계좌추가 -->
        <div class="circleStBtnArea right">
            <button class="icoPlus right"
                @click="goEnter()"><span>이체 추가하기</span></button>
        </div>
    </section>
    <!-- 버튼 -->
    <div class="buttonArea div3_7">
        <button class="white h50 w100"
            @click="emit('runEmits', false)">취소</button>
        <button class="pointBlue h50"
            @click="doTransfer()">이체하기</button>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</div>
</template>

<script setup>
import { inject, reactive, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import regName from '@/components/banking/regName.vue' // 실명입력
import modalPensionAcctWd from '@/components/banking/modalPensionAcctWd.vue' // 연금계좌인출확인
import modalVoicePhishing from '@/components/banking/modalVoicePhishing.vue' // 보이스피싱 관련 팝업 (500만원 이상 일 경우)
import modalCheckPension from '@/components/banking/modalCheckPension.vue' // 연금계좌인출 금액 확인(체크박스 체크 안됐을 때) 팝업
import modalDelayTransfer from '@/components/banking/modalDelayTransfer.vue' // 지연이체(지연이체 대상)
import modalRejectTransfer from '@/components/banking/modalRejectTransfer.vue' // FDS차단으로 인한 거래 불가 안내
import modalSameTransfer from '@/components/banking/modalSameTransfer.vue' // 중복이체여부확인 (중복계좌일 경우)
const $axios = inject('$axios')
const $codeToBank = inject('$codeToBank')
const $priceToCommas = inject('$priceToCommas')
const $hmsecToDash = inject('$hmsecToDash')
const $router = useRouter()
const emit = defineEmits(['runEmits'])
const props = defineProps(['transInfo'])
const feeCheckAPI = '/json/banking/feeCheck.json' // 잔액 조회 API
const transResultAPI = '/json/banking/transResult.json' // 이체 결과 API
const pensionTransCheckAPI = '/json/banking/pensionTransCheck.json' // 계좌 종류가 연금일 시 이체 정보 조회
const transInfo = reactive({
    sendAccInfo: new Array(0)
})

const resultInfo = reactive({
    totalTransPrice: 0, // 화면 확인용 전체 이체 금액
    totalFeePrice: 0,
    useLoan: '', // 대출금
    balance: '', // 잔금
    transResultCode: '', // 00 정상, 01 지연이체계좌, 02 중복이체, 03 FDS체크 차단
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

// 슬라이드 실행용
const slideLists = reactive({
    viewIndex: new Array(0)
})
for(const i in props.transInfo.sendAccInfo) {
    const insertData = { isOpen: false }
    slideLists.viewIndex.push(insertData)
}
// 슬라이드 실행
const changeView = (ev, index) => {
    let target = ev.target
    if(ev.target.tagName !== 'Li') target = ev.target.closest('li')
    if(target.classList.contains('on')) {
        target.classList.remove('on')
        slideLists.viewIndex[index].isOpen = false
    } else {
        target.classList.add('on')
        slideLists.viewIndex[index].isOpen = true
    }
}

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
    if(comps === regName) {
        componentsInfo.compName = markRaw(comps)
        const checkType = directInput.split('/')
        componentsInfo.compOption = { type: checkType[1], index: checkType[0] }
    } else if(comps === modalPensionAcctWd) {
        componentsInfo.compName = markRaw(comps)
        componentsInfo.compOption = { pensionInfo: resultInfo.pensionInfo }
    } else {
        componentsInfo.compName = markRaw(comps)
    }
}

// 컴포넌트 종료 emit
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(comps === regName) {
        if(returnVals !== false) {
            const targetIndex = componentsInfo.compOption.index
            if(returnVals.type === 'reciver') {
                transInfo.sendAccInfo[targetIndex].reciverText = returnVals.returnName
            } else if (returnVals.type === 'sender') {
                transInfo.sendAccInfo[targetIndex].senderText = returnVals.returnName
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

// 이체 추가 라우터 이동
const goEnter = () => {
    $router.push({ name: 'accountMultiTransferMain' })
}

// 연금계좌 확인
const doPensionCheck = (ev) => {
    resultInfo.pensionCheck = ev.target.checked
    if(ev.target.checked) {
        runComp(modalPensionAcctWd)
    }
}

// 이체 실행
const doTransfer = () => {
    if(props.transInfo.sendAccInfo.filter(arr => arr.sendPrice >= 5000000).length >= 1 && !resultInfo.phisingCheck) {
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
                    resultInfo.resultCode = ''
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
    emit('runEmits', {
        resultInfo: resultInfo,
        sendAccInfo: transInfo.sendAccInfo
    })
}

// 취소
const cacelTransfer = () => {
    emit('runEmits', false)
}

// 최초실행
const preRun = () => {
    // 총합계금액 산출 및 송금계좌 목록 내 받을 분, 내통장 표시 텍스트 초기화
    transInfo.sendAccInfo = props.transInfo.sendAccInfo
    for(const i in transInfo.sendAccInfo) {
        resultInfo.totalTransPrice += transInfo.sendAccInfo[i].sendPrice
        if(transInfo.sendAccInfo[i].senderText === '') transInfo.sendAccInfo[i].senderText = transInfo.sendAccInfo[i].ownerName
        if(transInfo.sendAccInfo[i].reciverText === '') transInfo.sendAccInfo[i].reciverText = props.transInfo.userName
    }
    // 수수료 체크
    $axios.get(feeCheckAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                for(const i in res.data.feeLists) {
                    const insertList = transInfo.sendAccInfo.filter(arr => arr.bankCode === res.data.feeLists[i].bankCode &&
                        arr.bankAccNumber === res.data.feeLists[i].bankAccNumber)
                    if(insertList.length !== 0) {
                        insertList[0].feePrice = res.data.feeLists[i].feePrice
                        resultInfo.totalFeePrice += res.data.feeLists[i].feePrice
                    }
                }
                getPensionInfo()
            } else {
                // 에러상황
            }
        })
        .catch(function(err) {
            console.log(err)
        })
    // 연금계좌 인출 정보 구성
    const getPensionInfo = () => {
        if(props.transInfo.bankAccTypeCode === '03') {
            $axios.get(pensionTransCheckAPI, {})
                .then(function(res) {
                    if(res.data.affective === 200) {
                        resultInfo.pensionInfo = res.data.pensionInfo
                    }
                })
                .catch(function(err) {
                    console.log(err)
                })
        }
    }
}
// 최초 입력정보 없을 시 이체 초기페이지로 이동
if(props.transInfo.bankCode === '' && props.transInfo.bankAccNumber === '') {
    emit('runEmits', false)
} else {
    preRun()
}

</script>

<style lang="postcss" scoped>
#multiTrConfirm { margin-bottom: 94px; }
.roundBox { margin-bottom: 18px; }
.basicTable { padding: 0 20px; }
.listSort { border-bottom: none;}
.accList { border-bottom: 1px solid rgba(229, 229, 229, 1); }
.circleStBtnArea { margin: 18px 0; padding: 0 20px; }
</style>