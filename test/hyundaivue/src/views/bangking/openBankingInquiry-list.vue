<template>
    <section id="openBankingInquiry">
        <div class="balnaceArea" :class="{ 'on' : pageInfo.balanceVisible }">
            <label for="balanceVisible">
                <span>잔액</span>
                <input type="checkbox" id="balanceVisible"
                    :checked="pageInfo.balanceVisible"
                    @change="pageInfo.balanceVisible = !pageInfo.balanceVisible">
                <div class="switch"></div>
            </label>
            <h1>
                {{ pageInfo.totalBalance === 0 || !pageInfo.balanceVisible ? '-' : $priceToCommas(pageInfo.totalBalance) + '원' }}
            </h1>
        </div>
        <div class="controlArea gray">
            <button type="button" class="white select"
                @click="runComp(reSelect)">{{ pageInfo.sortBy.optionText }}</button>
            <button type="button" class="white"
                @click="moveTo('openBankingJoinAgreeService')">+ 계좌추가</button>
                <button type="button" class="white"
                @click="moveTo('openBankingBalanceList')">잔액모으기</button>
        </div>
        <ul class="accList"
            :class="{ 'noList' : pageInfo.accList.length === 0 }">
            <li v-if="pageInfo.accList.length === 0">
                <p>등록된 이체 건이 없습니다.</p>
                <div></div>
            </li>
            <template v-else>
                <li v-for="(accInfo, index) in pageInfo.visibleList" :key="index">
                    <a href="javascript:;">
                        <img :src="'/images/logos/' + accInfo.bankCode + '.png'"
                            :alt="$codeToBank(accInfo.bankCode).korName + ' 로고'" />
                        <h1>{{ $codeToBank(accInfo.bankCode).korName }} {{ accInfo.bankAccNumber }}</h1>
                        <p>{{ accInfo.bankAccName }}</p>
                        <p>잔액 {{ $priceToCommas(accInfo.retainedAmount) }}원</p>
                    </a>
                    <div class="innerBtnBox">
                        <button type="button" class="borderBlue"
                            @click="moveTo('openBankingInquiryView', accInfo)">거래내역</button>
                        <button type="button" class="borderBlue"
                            v-if="accInfo.agreeWithdrawal"
                            @click="moveTo('accountTransferMain')">이체하기</button>
                    </div>
                </li>
            </template>
        </ul>
    </section>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</template>

<script setup>
import { inject, reactive, markRaw, watch } from 'vue'
import { useRouter } from 'vue-router'
import reSelect from '@/components/global/reSelect.vue'
const $codeToBank = inject('$codeToBank')
const $axios = inject('$axios')
const $priceToCommas = inject('$priceToCommas')
const $router = useRouter()
const myOpenBankingAccListAPI = '/json/banking/myOpenBankingAccList.json'
const props = defineProps(['baseInfo'])

const pageInfo = reactive({
    balanceVisible: true,
    totalBalance: 0,
    sortBy: {
        optionCode: '',
        optionText: '전체'
    },
    visibleList: new Array(0),
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
    if(comps === reSelect) {
        componentsInfo.compOption = {
            title: '계좌 조회',
            selected: pageInfo.sortBy.optionCode,
            listData: [
                { listName: '전체', listValue: '' },
                { listName: '은행', listValue: 'bank' },
                { listName: '증권', listValue: 'securities' },
                { listName: '기타', listValue: 'etc' }
            ]
        }
    }
}
// 컴포넌트 종료 emit
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(comps === reSelect) {
        pageInfo.sortBy.optionCode = returnVals.listValue
        pageInfo.sortBy.optionText = returnVals.listName
    }
    closeComponent()
}

// 검색조건 변경에 따른 계좌 목록 재 소팅
watch(() => pageInfo.sortBy.optionCode, (next, prev) => {
    if(next !== prev) {
        if(pageInfo.sortBy.optionCode === '') {
            pageInfo.visibleList = pageInfo.accList
        } else if(pageInfo.sortBy.optionCode === 'bank') {
            pageInfo.visibleList = pageInfo.accList.filter(arr => Number(arr.bankCode) < 199)
        } else if(pageInfo.sortBy.optionCode === 'securities') {
            pageInfo.visibleList = pageInfo.accList.filter(arr => Number(arr.bankCode) < 500 && Number(arr.bankCode) > 200)
        } else {
            pageInfo.visibleList = pageInfo.accList.filter(arr => Number(arr.bankCode) > 501)
        }
        checkTotalBalance()
    }
})

// 잔액 합계
const checkTotalBalance = () => {
    pageInfo.visibleList.forEach((el) => {
        pageInfo.totalBalance += el.retainedAmount
    })
}

// 페이지 이동
const moveTo = (componentName, obj) => {
    let params = null
    if(typeof (obj) !== 'undefined') {
        params = {
            bankCode: obj.bankCode,
            bankAccNumber: obj.bankAccNumber
        }
    }
    $router.push({ name: componentName, params: params })
}

const preRun = () => {
    $axios.get(myOpenBankingAccListAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                pageInfo.accList = res.data.accList
                pageInfo.visibleList = res.data.accList
                checkTotalBalance()
            } else {
                // 기타 에러시
            }
        })
        .catch(function(err) {
            // API에러시
            console.log(err)
        })
}

preRun()
</script>

<style lang="postcss" scoped>
/* 뱅킹조회 화면 전용 UI */
.controlArea {
    display: flex; justify-content: space-between;
    & button {
        padding: 0 12px;
    }
    & button + button {
        margin-left: 8px;
    }
    & button:nth-child(1) {
        flex-grow: 1;
        text-align: left;
        padding: 0 12px;
    }
}
</style>