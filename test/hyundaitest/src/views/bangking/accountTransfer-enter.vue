<template>
<div>
    <!-- 이체금액 입력 -->
    <section id="acctTrEnter">
        <!-- 입금계좌 정보-->
        <div class="titleInStep">
            <h1>
                <strong>{{ transInfo.sendAccInfo[0].ownerName }}님</strong>께<br>
                얼마나 보낼까요?
            </h1>
            <div>
                <span>잔여한도 {{ $priceToCommas(transInfo.remainingLimit) }}원</span>
                <button type="button"
                    @click="runComp(modalTransLimitInqu)">이체한도 조회
                </button>
            </div>
        </div>
        <!-- 금액입력 -->
        <div class="priceInput">
            <!-- 한도초과 :.overLimit  -->
            <label for="sendPrice"
                :class="transInfo.possibleAmount + transInfo.loanLimit < transInfo.sendAccInfo[0].sendPrice ? 'overLimit' : ''">
                <!-- 금액입력값 입력시 노출-->
                <!-- 에러 .fontRed -->
                <span :class="transInfo.possibleAmount + transInfo.loanLimit < transInfo.sendAccInfo[0].sendPrice ? 'fontRed' : 'fontPointBlue'">
                    {{ transInfo.possibleAmount + transInfo.loanLimit < transInfo.sendAccInfo[0].sendPrice ?
                        '이체 한도 초과' :
                        transInfo.sendAccInfo[0].sendPrice !== 0 && transInfo.sendAccInfo[0].sendPrice !== ''  ? $priceToKr(transInfo.sendAccInfo[0].sendPrice) + '원' : ''
                    }}
                </span>
                <input type="text" placeholder="금액입력"
                    id="sendPrice"
                    name="sendPrice"
                    inputmode="none"
                    readonly
                    :value="$priceToCommas(transInfo.sendAccInfo[0].sendPrice) + [transInfo.sendAccInfo[0].sendPrice !== '' ? '원' : '']">
                <hr>
                <!-- 기본 .fontGray / 에러 .fontRed / 안내.fontPointBlue-->
                <template v-if="!transInfo.isLoanAcc">
                    <p class="fontGray">출금가능금액 {{ $priceToCommas(transInfo.possibleAmount) }}원</p>
                </template>
                <template v-else-if="transInfo.isLoanAcc">
                    <p class="loanInfo">출금가능금액 : {{ $priceToCommas(transInfo.possibleAmount + transInfo.loanLimit) }}원(소액대출 {{ $priceToCommas(transInfo.loanLimit) }}원 포함)</p>
                </template>
            </label>
        </div>
    </section>
    <!-- 이체금액 입력 -->
    <regPrice :priceData="transInfo.sendAccInfo[0].sendPrice"
        :maxPrice="transInfo.loanLimit + transInfo.possibleAmount"
        :limitPrice="transInfo.remainingLimit"
        @runEmits="returnPrice" />
    <!-- 모달 컴포넌트 -->
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</div>
</template>

<script setup>
import { reactive, inject, onMounted, markRaw } from 'vue'
import regPrice from '@/components/banking/regPrice.vue'
import modalTransLimitInqu from '@/components/banking/modalTransLimitInqu.vue' // 상단 info 버튼 -> 해당계좌 이체한도 조회
const $axios = inject('$axios')
const $priceToCommas = inject('$priceToCommas')
const $priceToKr = inject('$priceToKr')
const props = defineProps(['transInfo'])
const emit = defineEmits(['runEmits'])
const myAccInfoAPI = '/json/banking/myAccInfo.json'

const transInfo = reactive({
    bankCode: '',
    bankAccNumber: '', // 촐금계좌번호
    isLoanAcc: false, // 소액대출 계좌여부
    loanLimit: 0,
    possibleAmount: '', // 출금가능금액
    remainingLimit: '', // 잔여한도
    sendAccInfo: [
        {
            ownerName: '',
            bankAccNumber: '',
            bankAccName: '',
            sendPrice: ''
        }
    ]
})

// 키패드 데이터 변경 emit 처리
const returnPrice = (priceData) => {
    if(typeof (priceData) !== 'boolean') {
        transInfo.sendAccInfo[0].sendPrice = priceData
    } else if(priceData === true) {
        emit('runEmits', {
            isLoanAcc: transInfo.isLoanAcc,
            possibleAmount: transInfo.possibleAmount,
            sendPrice: transInfo.sendAccInfo[0].sendPrice
        })
    }
}

// 컴포넌트 세팅
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
const runComp = (comps) => {
    componentsInfo.compName = markRaw(comps)
    if(comps === modalTransLimitInqu) {
        componentsInfo.compOption = {
            bankCode: props.transInfo.bankCode,
            bankAccNumber: props.transInfo.bankAccNumber,
            isDesignated: props.transInfo.isDesignated,
            bankAccTypeCode: props.transInfo.bankAccTypeCode
        }
    }
}
// 컴포넌트 실행 emit
const closeComp = (returnVals) => {
    closeComponent()
}

// 이체한도 조회 및 최초 페이지 세팅
const preRun = () => {
    transInfo.bankCode = props.transInfo.bankCode
    transInfo.bankAccNumber = props.transInfo.bankAccNumber
    transInfo.sendAccInfo = props.transInfo.sendAccInfo
    // 오픈뱅킹 시 이체한도 조회 분기 시 transInfo.bankCode === '263'으로 구분 실행
    $axios.get(myAccInfoAPI, { accNumber: transInfo.bankAccNumber })
        .then(function(res) {
            if(res.data.affective === 200) {
                transInfo.isLoanAcc = res.data.accInfo.isLoanAcc
                transInfo.loanLimit = res.data.accInfo.loanLimit
                transInfo.possibleAmount = res.data.accInfo.possibleAmount
                transInfo.remainingLimit = res.data.accInfo.remainingLimit
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}


// 최초 입력정보 없을 시 이체 초기페이지로 이동
if(props.transInfo.bankCode === '' && props.transInfo.bankAccNumber === '') {
    emit('runEmits', false)
} else {
    preRun()
    onMounted(() => {
        setTimeout(function() {
            document.getElementById('sendPrice').classList.add('on')
        }, 700)
    })
}
</script>

<style lang="postcss" scoped>
.titleInStep {
    padding-bottom: 0;
    & h1 {
        font-weight: 400;
    }
    & div {
        display: flex;
        align-items: center;
        margin-top: 4px;
        font-size: 1rem;
        & button {
            width: 20px; height: 20px;
            padding: 0; margin: 2px 0 0 5px;
            border: none;
            background: url('@/assets/images/global/icon_info_gray.png') no-repeat center / 13px auto;
            font-size: 0;
        }
    }
}
div.priceInput {
    padding: 0 20px;
    text-align: right;
    & label {
        display: block; position: relative;
        padding: 36px 0 0;
        & span {
            /* display: block; */ position: absolute;
            right: 0; top: 14px;
            margin-bottom: 9px;
            line-height: 1;
            &.fontRed {
                padding: 0 0 0 18px;
                background: url('@/assets/images/global/icon_err_line.png') no-repeat left center / 14px auto;
            }
        }
        & input[type="text"] {
            width: 100%;
            padding: 0 0 4px;
            border: none; border-bottom: 1px solid rgba(215, 215, 215, 1); border-radius: 0;
            font-size: 2.285rem;text-align: right;
            &::placeholder {
                text-align: right; font-size: 2.285rem; color: var(--tableCenterLine);
            }
            &:read-only {
                background-color: rgba(255,255,255,1);
            }
            &:focus {
                & + hr {
                    width: 100%;
                    background: var(--pointBlue);
                    transition: width .5s ease-in-out;
                }
            }
            &.on {
                & + hr {
                    width: 100%;
                    background: var(--pointBlue);
                    transition: width .5s ease-in-out;
                }
            }
        }
        & hr {
            position: relative;
            top:-5px; height: 1px; width: 0%;
            margin: 4px 0 0;
            border: none;
            background: var(--pointBlue);
            transition: width .5s ease-in-out;
        }
        & p {
            margin: 7px 0 0;
            line-height: 1;
            &.loanInfo {
                color: var(--pointBlue); font-size: 0.857rem; letter-spacing: -0.03rem;
            }
        }
        &.overLimit {
            & input[type="text"]{
                transition: border .5s ease-in-out;
            }
            & p, & span {
                color:var(--red) !important;
            }
            & hr {
                background-color: var(--red) !important;
            }
        }
    }
}
</style>