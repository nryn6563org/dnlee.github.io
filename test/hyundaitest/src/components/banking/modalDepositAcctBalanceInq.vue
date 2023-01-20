<template>
    <div id="modalArea" class="fullPopup">
        <!-- 컨텐츠 영역 -->
        <div class="contentsArea">
            <template v-if="pageInfo.step === 'info'">
                <article data-state="start">
                    <p>계좌 정보</p>
                    <ul class="transInfoConfirm bgGray">
                        <li>
                            <span>금융사명</span>
                            <p>
                                {{ $codeToBank(pageInfo.bankCode).korName }}
                                {{ pageInfo.bankAccName }}
                            </p>
                        </li>
                        <li>
                            <span>계좌번호</span>
                            <p>
                                {{
                                    pageInfo.bankCode === '263' ?
                                    $hmsecToDash(pageInfo.bankAccNumber) : pageInfo.bankAccNumber
                                }}
                            </p>
                        </li>
                        <li>
                            <span>예금주명</span>
                            <p>{{ pageInfo.ownerName }}</p>
                        </li>
                    </ul>
                    <p>계좌 비밀번호</p>
                    <label for="balbanceAccPw">
                        <input type="password" class="h50" placeholder="계좌 비밀번호 입력" readonly
                            @focus="runPassword()">
                    </label>
                </article>
            </template>
            <template v-else>
                <article data-state="end">
                    <p>조회결과</p>
                    <ul class="transInfoConfirm bgBlue">
                        <li>
                            <span>잔액</span>
                            <p>{{ $priceToCommas(pageInfo.possibleAmount) }}원</p>
                        </li>
                        <li>
                            <span>출금가능금액</span>
                            <p>{{ $priceToCommas(pageInfo.totalTransferAmount) }}원</p>
                        </li>
                    </ul>
                </article>
            </template>
            <ul class="listType01 gray">
                <li>본인 계좌로 이체 거래에 대한 입금계좌 잔액확인만 가능합니다.<br>(타인 입금계좌 잔액 확인 불가)</li>
                <li>입금계좌 잔액 조회는 입금거래 직후에만 가능하며, 비밀번호 1회 오류, 입금은행의 잔액조회 거부 등의 사유로 조회가 불가능할 수 있습니다.</li>
                <li>입금계좌 잔액은 조회한 시점의 잔액입니다.</li>
                <li>입금된 시점의 잔액과 다를 수 있으므로 유의 하십시오.</li>
            </ul>
        </div>
        <div v-if="pageInfo.step === 'result'"
            class="buttonArea" data-buttonLength="1">
            <button type="button" class="pointBlue h50"
                @click="returnVal(true)"
                >확인</button>
        </div>
        <component :is="componentsInfo.compName"
            :options="componentsInfo.compOptions"
            @runEmits="closeComp" />
    </div>
</template>

<script setup>
import { inject, reactive, onMounted, markRaw, watch } from 'vue'
import regAccPassword from '@/components/banking/regAccPassword.vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
const $priceToCommas = inject('$priceToCommas')
const $axios = inject('$axios')
const props = defineProps(['options'])
const emit = defineEmits(['runEmits'])
const myAccInfoAPI = '/json/banking/myAccInfo.json'

const returnVal = () => {
    emit('runEmits', false)
    $modalEnd('modalArea')
}


// 계좌명 관련 API 재 조회 여부 개발시 체크 후 협의 필요
const pageInfo = reactive({
    step: 'info', // info(pw입력) / result(결과)
    bankCode: props.options.bankCode,
    bankAccNumber: props.options.bankAccNumber,
    ownerName: props.options.ownerName,
    bankAccName: props.options.bankAccName,
    possibleAmount: 0,
    totalTransferAmount: 0
})

const componentsInfo = reactive({
    compName: null,
    compOptions: null
})
// 컴포넌트 초기화
// 컴포넌트 애니메이션을 위해 nowRun === true가 아니면 600의 셋타임을 갖는다
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

const runPassword = () => {
    componentsInfo.compName = markRaw(regAccPassword)
    componentsInfo.compOptions = {
        bankCode: pageInfo.bankCode,
        bankAccNumber: pageInfo.bankAccNumber,
        notSave: true
    }
}
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(comps === regAccPassword) {
        if(typeof (returnVals) !== 'boolean') {
            // 잔액 조회 기능 필요
            if(returnVals.isPassed === true) pageInfo.step = 'result'
        }
    }
    closeComponent()
}

watch(() => pageInfo.step, () => {
    if(pageInfo.step === 'result') {
        $axios.get(myAccInfoAPI, {})
            .then(function(res) {
                if(res.data.affective === 200) {
                    pageInfo.possibleAmount = res.data.accInfo.possibleAmount
                    if(res.data.accInfo.isLoanAcc) {
                        pageInfo.totalTransferAmount = res.data.accInfo.possibleAmount + res.data.accInfo.loanLimit
                    } else {
                        pageInfo.totalTransferAmount = res.data.accInfo.possibleAmount
                    }
                } else {
                    // api 오류 상황
                }
            })
            .catch(function(err) {
                console.log(err)
            })
    }
})

// 최초 모달 싱행시 on함수 실행
onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
    div.fullPopup {
        & > .contentsArea {
            height: 100%; min-height: 100%;
            & > article {
                padding: 20px 0 0;
                /* pw 입력전 */
                &[data-state="start"] {
                    & .transInfoConfirm {
                        margin-bottom: 24px;
                    }
                    & label {
                        width: 100%;
                        & input { width: 100%; }
                    }
                }
                & > p {
                    margin: 0 0 7.5px;
                    font-weight: 400; color: var(--fontLightgray);
                }
                /* 이체정보 리스트 */
                & .transInfoConfirm { margin: 0;}
            }
            /* 하단 입금계좌조회 안내 */
            & > ul { margin-top: 24px;}
        }
        & > #regAccPassword {
            overflow: hidden; position: absolute;
            max-height: 100vh; padding: 0;
        }
    }
</style>