<template>
<div>
    <!-- 이체홈 -->
    <section id="accTransfer">
        <!-- 계좌정보-->
        <!--pw 입력여부 .off(미입력) / 계좌개수 체크 .hasOne(1개일때)-->
        <div class="selectBankingMyAcc"
            :class="{ 'hasOne' : transInfo.accCount === 1, 'off': !transInfo.isPassed }">
            <button
                @click="runComp(regAccPassword)">
                <img v-if="transInfo.isPassed" :src="'/images/logos/' + transInfo.bankCode + '.png'"
                    :alt="$codeToBank(transInfo.bankCode).korName + ' 로고'" />
                <span v-if="componentsInfo.compName === null && !transInfo.isPassed"
                    :class="componentsInfo.compName === null && !transInfo.isPassed ? 'on' : ''">
                    자물쇠를 선택하여 비밀번호를 입력해 주세요.
                </span>
            </button>
            <!-- 팝업 -->
            <button @click="runComp(selectMyAccList)">
            <!-- <button @click="runModal(modalTransferBan)"> -->
                <!-- 계좌번호 -->
                <p>
                    {{ $codeToBank(transInfo.bankCode).korName }}
                    {{ transInfo.bankCode === '263' ? $hmsecToDash(transInfo.bankAccNumber) : transInfo.bankAccNumber }}
                </p>
                <!-- 계좌 금액정보 -->
                <h2>{{ $priceToCommas(transInfo.retainedAmount) }}원</h2>
            </button>
        </div>
        <template v-if="transInfo.isPassed">
            <h5>은행제휴계좌통장 → 현대차계좌통장 입금됩니다.</h5>
            <h4 class="gray">은행제휴계좌</h4>
            <div class="selectBankingMyAcc smallList"
                :class="{ 'hasOne' : transInfo.accCount === 1, 'off': !transInfo.isPassed }">
                <button type="button"
                    @click="runComp(regAccPassword, 'recive')">
                    <img v-if="transInfo.reciveAccInfo.isPassed" :src="'/images/logos/' + transInfo.bankCode + '.png'"
                        :alt="$codeToBank(transInfo.bankCode).korName + ' 로고'" />
                    <span v-if="componentsInfo.compName === null && !transInfo.reciveAccInfo.isPassed"
                        :class="componentsInfo.compName === null && !transInfo.reciveAccInfo.isPassed ? 'on' : ''">
                        자물쇠를 선택하여 비밀번호를 입력해 주세요.
                    </span>
                </button>
                <!-- 팝업 -->
                <button type="button">
                    <!-- 계좌번호 -->
                    <h4>
                        {{ $codeToBank(transInfo.reciveAccInfo.bankCode).korName }}
                    </h4>
                    <!-- 계좌 금액정보 -->
                    <p>
                        {{ transInfo.reciveAccInfo.bankCode === '263' ?
                            $hmsecToDash(transInfo.reciveAccInfo.bankAccNumber) : transInfo.reciveAccInfo.bankAccNumber }}
                    </p>
                    <p v-if="transInfo.reciveAccInfo.isPassed">
                        출금가능금액
                        {{ $priceToCommas(transInfo.reciveAccInfo.possibleAmount) }}원
                    </p>
                </button>
            </div>
            <template v-if="transInfo.reciveAccInfo.isPassed">
                <ol class="simpleBox">
                    <li>
                        <span>이체금액</span>
                        <span class="fontPointBlue"
                            v-if="transInfo.reciveAccInfo.sendPrice !== ''">
                            {{ $priceToKr(transInfo.reciveAccInfo.sendPrice) }}원
                        </span>
                    </li>
                </ol>
                <label class="price hasReset" for="sendPrice">
                    <input type="text" id="sendPrice" inputmode="none" class="h50" readonly
                        placeholder="금액 입력"
                        :class="{ 'errBox': transInfo.reciveAccInfo.isFailMesage !== '',
                            'on': transInfo.reciveAccInfo.isFailMesage !== '' && transInfo.reciveAccInfo.sendPrice !== '' }"
                        :value="$priceToCommas(transInfo.reciveAccInfo.sendPrice) + (transInfo.reciveAccInfo.sendPrice !== '' ? '원' : '')"
                        @focus="runComp(regPriceInput, accList)" />
                    <button type="button" class="resetInput"
                        v-if="transInfo.reciveAccInfo.sendPrice !== ''"
                        @click.prevent="resetSendPrice()"></button>
                    <p v-if="transInfo.reciveAccInfo.isFailMesage !== ''">
                        {{ transInfo.reciveAccInfo.isFailMesage }}
                    </p>
                </label>
                <ul class="listType01">
                    <li>
                        제휴은행에서 개설된 증권계좌 전용 메뉴입니다.<br>
                        (국민, 씨디은행에서 개설된 계좌는 이용 불가)
                    </li>
                    <li>제휴은행 → 현대차증권 계좌로 이체 입금</li>
                </ul>
            </template>
        </template>
    </section>
    <div class="buttonArea"
        v-if="transInfo.isPassed">
        <button class="pointBlue h50"
            :disabled="transInfo.reciveAccInfo.sendPrice === 0 || transInfo.reciveAccInfo.sendPrice === ''"
            @click="doConmfirm()">다음</button>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</div>
</template>

<script setup>
import { inject, reactive, markRaw } from 'vue'
import regAccPassword from '@/components/banking/regAccPassword.vue' // 비밀번호 입력
import selectMyAccList from '@/components/banking/selectMyAccList.vue' // 내 계좌선택
import regPriceInput from '@/components/banking/regPriceInput.vue' // 입금금액 입력
const $axios = inject('$axios')
const $codeToBank = inject('$codeToBank')
const $priceToCommas = inject('$priceToCommas')
const $priceToKr = inject('$priceToKr')
const $hmsecToDash = inject('$hmsecToDash')
const $resetInput = inject('$resetInput')
const myAccListAPI = '/json/banking/myAccList.json' // 내 계좌 목록
const checkConnectAccAPI = '/json/banking/checkConnectAcc.json' // 연계계좌 조회
const emit = defineEmits(['runEmits'])
const transInfo = reactive({
    accCount: 1,
    bankCode: '263', // 내계좌 기관코드 최초 정보 로드 시 현대차 증권 코드로 호출
    bankAccNumber: '', // 내계좌번호
    retainedAmount: '', // 출금가능금액(잔고) - 소액대출통장의 경우에 따라 변경여지 있음
    isPassed: false, // 비밀번호 입력확인 여부
    reciveAccInfo: {
        ownerName: '', // 계좌주명
        bankCode: '', // 송부은행코드
        bankAccNumber: '', // 송금계좌번호
        possibleAmount: '', // 출금가능 금액
        sendPrice: '', // 송부금액
        isPassed: false,
        isChecked: false,
        isFailMesage: ''
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

// 컴포넌트 실행 전체
const runComp = (comps, directInput) => {
    // markRaw뒤에 컴포넌트 명 입력
    // 현재 실행중인 컴포넌트 중복 방지
    if(componentsInfo.compName !== null || componentsInfo.compOption !== null) {
        closeComponent(true)
    }
    if(comps === regAccPassword) {
        // 계좌 비밀번호 입력 prop으로 인해 별도 실행처리
        if(directInput === 'recive') {
            if(!transInfo.reciveAccInfo.isPassed) {
                componentsInfo.compName = markRaw(comps)
                componentsInfo.compOption = {
                    bankCode: transInfo.reciveAccInfo.bankCode,
                    bankAccNumber: transInfo.reciveAccInfo.bankAccNumber
                }
            }
        } else {
            if(!transInfo.isPassed) {
                componentsInfo.compName = markRaw(comps)
                componentsInfo.compOption = {
                    bankCode: transInfo.bankCode,
                    bankAccNumber: transInfo.bankAccNumber
                }
            }
        }
    } else if(comps === selectMyAccList) {
        componentsInfo.compName = markRaw(comps)
        componentsInfo.compOption = {
            bankCode: transInfo.bankCode,
            bankAccNumber: transInfo.bankAccNumber
        }
    } else if(comps === regPriceInput) {
        // 전액 산정 - 이체 한도를 기준
        // 이체한도보다 대출한도 + 출금가능금액이 작을 시 이를 기준한다.
        const maxPrice = transInfo.reciveAccInfo.possibleAmount
        // 전송데이터 세팅
        componentsInfo.compName = markRaw(comps)
        componentsInfo.compOption = {
            bankCode: transInfo.reciveAccInfo.bankCode,
            bankAccNumber: transInfo.reciveAccInfo.bankAccNumber,
            sendPrice: transInfo.reciveAccInfo.sendPrice,
            maxPrice: maxPrice
        }
        // 화면 포커스 이벤트
    } else {
        componentsInfo.compName = markRaw(comps)
    }
}
// 컴포넌트 종료 emit
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(comps === regAccPassword) {
        // 계좌 비밀번호 입력 결과 리턴
        if(returnVals) {
            if(returnVals.bankCode === transInfo.bankCode && returnVals.bankAccNumber === transInfo.bankAccNumber) {
                transInfo.isPassed = returnVals.isPassed // 비밀번호 입력 성공 여부
                // 패스워드 자동 저장체크
                if(returnVals.isPasswordSave) {
                    console.log('저장함수 호출')
                }
            } else if(returnVals.bankCode === transInfo.reciveAccInfo.bankCode &&
                returnVals.bankAccNumber === transInfo.reciveAccInfo.bankAccNumber) {
                transInfo.reciveAccInfo.isPassed = returnVals.isPassed // 비밀번호 입력 성공 여부
                // 패스워드 자동 저장체크
                if(returnVals.isPasswordSave) {
                    console.log('저장함수 호출')
                }
            }
            closeComponent()
        } else {
            closeComponent()
        }
    } else if(comps === selectMyAccList) {
        // 내 계좌번호 선택 리턴
        if(returnVals) {
            // 최초 실행시 내 계좌 개수 및 최초 선택 계좌 데이터 세팅
            // 실제 조회 완료 데이터는 현대차증권 데이터만 호출되므로 filter는 필요 없어짐
            transInfo.bankCode = '263'
            transInfo.bankAccNumber = returnVals.bankAccNumber
            transInfo.retainedAmount = returnVals.retainedAmount
            transInfo.isPassed = returnVals.isPassed
            // transInfo.isDesignated: hmsecAcc[0].isDesignated, // 추후 예외처리 기능 들어갈 확률 높음
            if(!transInfo.isPassed) {
                // 비밀번호 입력이 필요할 시
                runComp(regAccPassword)
            } else {
                getConnectAccInfo()
                closeComponent()
            }
        } else {
            closeComponent()
        }
    } else if(comps === regPriceInput) {
        if(typeof (returnVals) !== 'boolean') {
            console.log(returnVals.returnNumber)
            transInfo.reciveAccInfo.sendPrice = returnVals.returnNumber
            const isFailMesage = [
                '',
                '출금가능금액을 초과 하셨어요.', // 한도초과
                '이체 금액을 입력해 주세요.' // 금액 미입력
            ]
            let returnCode = 0
            // 오류 처리 - 출금가능 금액 검사 > 1일 이체한도 초과 > 금액 미입력
            if (transInfo.reciveAccInfo.sendPrice > transInfo.reciveAccInfo.possibleAmount) {
                returnCode = 1
            } else if (transInfo.reciveAccInfo.sendPrice === '' || transInfo.reciveAccInfo.sendPrice === 0) {
                returnCode = 2
            }
            transInfo.reciveAccInfo.isChecked = (returnCode === 0)
            transInfo.reciveAccInfo.isFailMesage = isFailMesage[returnCode]
            if(returnCode === 0) {
                transInfo.reciveAccInfo.isChecked = true
            } else if (returnCode !== 0) {
                // 동일금액 입력하기 시 전체 체크 변경
                transInfo.reciveAccInfo.isChecked = false
            }
        } else {
            closeComponent()
        }
    } else {
        closeComponent()
    }
}

const getConnectAccInfo = () => {
    $axios.get(checkConnectAccAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                const accInfo = res.data.accInfo
                transInfo.reciveAccInfo.ownerName = accInfo.ownerName
                transInfo.reciveAccInfo.bankCode = accInfo.bankCode
                transInfo.reciveAccInfo.bankAccNumber = accInfo.bankAccNumber
                transInfo.reciveAccInfo.possibleAmount = accInfo.possibleAmount
                transInfo.reciveAccInfo.isPassed = accInfo.isPassed
            } else {
                // 에러상황
                // 연계계좌 없을 시 시나리오 없음
            }
        })
        .catch(function(err) {
            // API에러
            console.log(err)
        })
}

// 최초 실행 시 기본 계좌 조회 및 페이지정보 확보
const preRun = () => {
    $axios.get(myAccListAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                // 최초 실행시 내 계좌 개수 및 최초 선택 계좌 데이터 세팅
                // 실제 조회 완료 데이터는 현대차증권 데이터만 호출되므로 filter는 필요 없어짐
                const hmsecAcc = res.data.accList.filter(el => el.bankCode === '263')
                transInfo.accCount = hmsecAcc.length
                transInfo.bankCode = '263'
                transInfo.bankAccNumber = hmsecAcc[0].bankAccNumber
                transInfo.retainedAmount = hmsecAcc[0].retainedAmount
                transInfo.isPassed = hmsecAcc[0].isPassed
                // transInfo.isDesignated: hmsecAcc[0].isDesignated, // 추후 예외처리 기능 들어갈 확률 높음
                if(transInfo.accCount === 1 && !transInfo.isPassed) {
                    // 내 계좌가 1개이고 비밀번호 입력이 필요할 시
                    runComp(regAccPassword)
                } else {
                    getConnectAccInfo()
                }
            } else {
                console.log('에러상황')
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}
preRun()

// 정보입력 완료
const doConmfirm = () => {
    emit('runEmits', transInfo)
}
// 리셋용 함수
const resetSendPrice = () => {
    transInfo.reciveAccInfo.sendPrice = ''
}

</script>

<style lang="postcss" scoped>
.simpleBox {
    padding: 18px 0 0; margin: 18px 20px 6px;
    border-top: 1px solid var(--listBorder)
}
label.price {
    width: calc(100% - 40px);
    margin: 0 20px;
}
#accTransfer {
    & h5 {
        margin: 0 0 18px; padding: 12px 0 12px 34px;
        background: rgba(248,248,248,1) url('@/assets/images/global/icon_notice.png') no-repeat 12px center / 14px;
        color: var(--tableTopLine); font-size: 0.857rem; font-weight: 400;
    }
}
.listType01 { padding: 18px 20px; }
</style>