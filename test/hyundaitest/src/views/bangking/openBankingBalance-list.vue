<template>
<div>
    <section id="openBankingbalance">
        <div class="titleInStep">
            <h2>
                잔액을 한번에<br>
                <strong>현대차증권</strong>으로 모아보세요!
            </h2>
            <div class="balnaceInfo">
                <span>잔여한도 {{ $priceToCommas(pageInfo.limitPrice) }}원</span>
                <button type="button"
                    @click="runComp(modalTransLimitInqu)">이체한도 조회
                </button>
            </div>
        </div>
        <h3>입금계좌 선택</h3>
        <button type="button" class="select h50"
            :disabled="pageInfo.accCount === 1"
            @click="runComp(selectMyAccListInTypes)">
            {{ $codeToBank(pageInfo.bankCode).korName }}
            {{ $hmsecToDash(pageInfo.bankAccNumber) }}
            {{ pageInfo.userName }}
        </button>
        <div class="controlArea gray">
            <dl>
                <dt>선택계좌 <strong>{{ pageInfo.accList.filter(arr => arr.isChecked === true).length }}건</strong></dt>
                <dd>금액합계 <strong>{{ pageInfo.totalPrice }}원</strong></dd>
            </dl>
        </div>
        <ul class="accList select" :class="{ 'noList' : pageInfo.accList.length === 0 }">
            <li v-if="pageInfo.accList.length === 0">
                <p>등록된 오픈뱅킹 계좌가 없습니다</p>
                <div></div>
            </li>
            <li v-for="(accInfo,index) in pageInfo.accList" :key="index">
                <label :for="'accList' + index">
                    <input type="checkbox" :id="'accList' + index"
                        v-model="accInfo.isChecked"
                        @change="checkTo($event, accInfo)">
                    <div></div>
                </label>
                <a href="javascript:;" @click="accInfo.isChecked = !accInfo.isChecked">
                    <img :src="'/images/logos/' + accInfo.bankCode + '.png'"
                        :alt="$codeToBank(accInfo.bankCode).korName + ' 로고'" />
                    <h1>{{ $codeToBank(accInfo.bankCode).korName }} {{ accInfo.bankAccNumber }}</h1>
                    <p>{{ accInfo.bankAccName }}</p>
                    <p class="gray">잔액 {{ $priceToCommas(accInfo.retainedAmount) }} 원</p>
                </a>
                <div v-if="accInfo.isChecked">
                    <label class="price hasReset" :for="'regPrice' + index">
                        <p v-if="accInfo.sendPrice !== 0 && accInfo.sendPrice !== ''">
                            {{ accInfo.sendPrice === 0 || accInfo.sendPrice === '' ? ' ' : $priceToKr(accInfo.sendPrice) + '원' }}
                        </p>
                        <input type="text" :id="'regPrice' + index" readonly
                            @click="runComp(regPrice, accInfo)"
                            :class="{ 'errBox' : accInfo.errMsg !== '' }"
                            :value="accInfo.sendPrice !== '' ? $priceToCommas(accInfo.sendPrice) + ( accInfo.sendPrice === '' ? '원' : '') : ''">
                        <button type="button" class="resetInput" v-if="accInfo.sendPrice !== ''"
                            @click.prevent="accInfo.sendPrice = ''"></button>
                        <p v-if="accInfo.errMsg !== ''">{{ accInfo.errMsg }}</p>
                    </label>
                </div>
            </li>
        </ul>
        <div class="emptydiv" :class="{ 'on' : componentsInfo.compName === regPrice }"></div>
    </section>
    <div class="buttonArea">
        <button type="button" class="pointBlue h50"
            :disabled="pageInfo.accList.filter(arr => arr.errMsg !== '').length !== 0 &&
                pageInfo.accList.filter(arr => arr.isChecked === true).length === 0"
            @click="emit('runEmits', pageInfo)">
            다음
        </button>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</div>
</template>

<script setup>
import { inject, reactive, markRaw } from 'vue'
import modalTransLimitInqu from '@/components/banking/modalTransLimitInqu.vue' // 상단 info 버튼 -> 해당계좌 이체한도 조회
import selectMyAccListInTypes from '@/components/banking/selectMyAccListInTypes.vue'
import regPrice from '@/components/banking/regPriceInput.vue'
const $axios = inject('$axios')
const $codeToBank = inject('$codeToBank')
const $priceToCommas = inject('$priceToCommas')
const $hmsecToDash = inject('$hmsecToDash')
const $priceToKr = inject('$priceToKr')
const myOpenBankingAccListAPI = '/json/banking/myOpenBankingAccList.json'
const myAccListAPI = '/json/banking/myAccList.json'
const openTransLimitCheckAPI = '/json/banking/openTransLimitCheck.json'
const props = defineProps(['balanceInfo'])
const emit = defineEmits(['runEmits'])

const pageInfo = reactive({
    accCount: 0,
    userName: '',
    bankCode: '',
    bankAccNumber: '',
    limitPrice: 0,
    totalPrice: 0, // 합계 표기용 데이터
    accList: new Array(0)
})

// 컴포넌트 실행 분기
const componentsInfo = reactive({
    compName: null,
    compOption: null
})
// 컴포넌트 초기화
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
    componentsInfo.compName = markRaw(comps)
    if(comps === modalTransLimitInqu) {
        componentsInfo.compOption = {
            // 오픈뱅킹 확인용으로 임의 변수 실행
            bankCode: '003',
            bankAccNumber: props.bankAccNumber,
            isDesignated: false,
            bankAccTypeCode: '00'
        }
    } else if(comps === selectMyAccListInTypes) {
        componentsInfo.compOption = {
            bankingType: 'hmsec',
            bankCode: pageInfo.bankCode,
            bankAccNumber: pageInfo.bankAccNumber
        }
    } else if(comps === regPrice) {
        componentsInfo.compOption = {
            bankCode: directInput.bankCode,
            bankAccNumber: directInput.bankAccNumber,
            sendPrice: directInput.sendPrice,
            maxPrice: directInput.retainedAmount
        }
    }
}
// 컴포넌트 종료 emit
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        if(comps === selectMyAccListInTypes) {
            pageInfo.bankCode = returnVals.bankCode
            pageInfo.bankAccNumber = returnVals.bankAccNumber
            closeComponent()
        } else if(comps === regPrice) {
            const bankCode = componentsInfo.compOption.bankCode
            const bankAccNumber = componentsInfo.compOption.bankAccNumber
            if(returnVals !== true) {
                const checkArr = pageInfo.accList.filter(arr => arr.bankCode === bankCode && arr.bankAccNumber === bankAccNumber)[0]
                checkArr.sendPrice = returnVals.returnNumber
                priceCheck(checkArr)
            }
            closeComponent()
        }
    } else {
        closeComponent()
    }
}

// 잔액체크
const priceCheck = (el) => {
    let otherPrice = 0
    pageInfo.accList.forEach(arr => {
        if(arr !== el) {
            otherPrice += arr.sendPrice
        }
    })
    pageInfo.totalPrice = Number(otherPrice) + Number(el.sendPrice)
    // 보유금액 초과
    if(el.retainedAmount < el.sendPrice) {
        el.errMsg = '이체가능 금액을 초과하였습니다.'
    } else if(Number(otherPrice) + Number(el.sendPrice) > pageInfo.limitPrice) {
        el.errMsg = '1일 이체가능 금액을 초과하였습니다.'
    } else {
        el.errMsg = ''
    }
}

// 체크박스 체크
const checkTo = (ev, el) => {
    const target = typeof ev === 'string' ? document.getElementById(ev) : ev.target
    el.isChecked = target.checked
    if(!target.checked) {
        pageInfo.totalPrice -= el.sendPrice
        el.sendPrice = ''
    }
}

const getMyOpenBankingAccList = () => {
    $axios.get(myOpenBankingAccListAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                res.data.accList.forEach(el => {
                    if(el.regOpenBanking === true) {
                        const reCheckData = el
                        const addData = { isChecked: false, sendPrice: '', errMsg: '' }
                        Object.assign(reCheckData, addData)
                        pageInfo.accList.push(reCheckData)
                    }
                })
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}

const preRun = () => {
    pageInfo.userName = props.balanceInfo.userName
    $axios.get(openTransLimitCheckAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                pageInfo.limitPrice = res.data.limitPrice
            }
            $axios.get(myAccListAPI, {})
                .then(function(res) {
                    if(res.data.affective === 200) {
                        pageInfo.accCount = res.data.accList.length
                        const defaultData = res.data.accList[0]
                        pageInfo.bankCode = defaultData.bankCode
                        pageInfo.bankAccNumber = defaultData.bankAccNumber
                    }
                    getMyOpenBankingAccList()
                })
                .catch(function(err) {
                    console.log(err)
                })
        })
        .catch(function(err) {
            console.log(err)
        })
}

preRun()
</script>

<style lang="postcss" scoped>
#openBankingbalance {
    padding-bottom: 86px;
    & > button {
        width: calc(100% - 40px);
        margin: 0 20px 18px;
    }
}
.titleInStep { padding-bottom: 32px; }
.controlArea {
    align-items: center;
    & > dl {
        display: flex;
        margin: 0; padding: 0;
        line-height: 27px;
        justify-content: space-between;
        & dt {
            font-size: 1.143rem;
        }
        & dd {
            margin: 0;
            color: var(--fontLightgray);
            & strong {
                padding-left: 8px;
                color: var(--black); font-size: 1.429rem;
            }
        }
    }
}
.accList > li {
    padding-bottom: 18px !important;
    & > a {
        padding-bottom: 0 !important;
    }
    & > div {
        & > label { padding-left: 52px; box-sizing: border-box; }
        margin-bottom: 0;
    }
}
</style>