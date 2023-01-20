<template>
<div>
    <section id="openBankingInquiry">
        <div class="selectBankingMyAcc"
             :class="{ 'hasOne' : pageInfo.accCount === 1 }">
            <button type="button">
                <img :src="'/images/logos/' + pageInfo.bankCode + '.png'"
                    :alt="$codeToBank(pageInfo.bankCode).korName + ' 로고'" />
            </button>
            <!-- 팝업 -->
            <button @click="runComp(selectMyAccListInTypes)">
                <p>{{ $codeToBank(pageInfo.bankCode).korName }}</p>
                <!-- 계좌 금액정보 -->
                <h2>{{ pageInfo.bankAccNumber }}</h2>
            </button>
        </div>
        <div class="controlArea gray">
            <button type="button" class="white select h50"
                @click="runComp(transSortChoice)">
                {{
                    pageInfo.sortBy.division === '' ? '전체' :
                    pageInfo.sortBy.division === 'deposit' ? '입금' : '출금'
                }}&middot;{{
                    $dateToCommas(pageInfo.sortBy.fromDate) }}~{{ $dateToCommas(pageInfo.sortBy.toDate)
                }}&middot;{{
                    pageInfo.sortBy.orderBy === 'desc' ? '최신순' : '과거순'
                }}
            </button>
        </div>
        <template v-if="pageInfo.visibleList.length === 0">
            <ul class="noList">
                <li v-if="pageInfo.visibleList.length === 0">
                    <p>이체 이력이 없습니다.</p>
                    <div></div>
                </li>
            </ul>
        </template>
        <template v-else>
            <template v-for="(transList, index) in pageInfo.visibleList" :key="index">
                <h5>{{ transList.transferDate }}</h5>
                <ul class="productList">
                    <li v-for="(transInfo, index) in transList.transferInfo" :key="index">
                        <ol class="simpleBox">
                            <li>
                                <h1>{{ transInfo.senderText }}</h1>
                                <h1 :class="transInfo.transType === 'deposit' ? 'fontRed' : 'fontPointBlue'">
                                    {{ transInfo.transType === 'deposit' ? '입금' : '출금' }} {{ $priceToCommas(transInfo.transPrice) }}원
                                </h1>
                            </li>
                            <li>
                                <span>{{ transInfo.timeStemp }}</span>
                                <span>잔액 {{ $priceToCommas(transInfo.retainedAmount) }}원</span>
                            </li>
                        </ol>
                    </li>
                </ul>
            </template>
        </template>
    </section>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</div>
</template>
<script setup>
import { reactive, inject, markRaw, watch } from 'vue'
import { useRoute } from 'vue-router'
import selectMyAccListInTypes from '@/components/banking/selectMyAccListInTypes.vue'
import transSortChoice from '@/components/banking/transSortChoice.vue'
const $route = useRoute()
const $axios = inject('$axios')
const $dateToCommas = inject('$dateToCommas')
const $priceToCommas = inject('$priceToCommas')
const openBankingTransListAPI = '/json/banking/openBankingTransList.json'
const $codeToBank = inject('$codeToBank')
const params = $route.params

const pageInfo = reactive({
    accCount: 0,
    bankCode: params.bankCode,
    bankAccNumber: params.bankAccNumber,
    transferList: new Array(0),
    visibleList: new Array(0),
    sortBy: {
        fromDate: new Date(),
        toDate: new Date(),
        division: '',
        orderBy: 'desc'
    }
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
    if(comps === selectMyAccListInTypes) {
        componentsInfo.compOption = {
            bankCode: pageInfo.bankCode,
            bankAccNumber: pageInfo.bankAccNumber,
            bankingType: 'openBanking'
        }
    } else if(comps === transSortChoice) {
        componentsInfo.compOption = {
            fromDate: pageInfo.sortBy.fromDate,
            toDate: pageInfo.sortBy.toDate,
            fixDate: 'toDate',
            division: pageInfo.sortBy.division,
            orderBy: pageInfo.sortBy.orderBy
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
        } else if(comps === transSortChoice) {
            pageInfo.sortBy.fromDate = returnVals.fromDate
            pageInfo.sortBy.toDate = returnVals.toDate
            pageInfo.sortBy.division = returnVals.division
            pageInfo.sortBy.orderBy = returnVals.orderBy
        }
    }
    closeComponent()
}

// 계좌번호 변경감지
watch(() => pageInfo, (next, prev) => {
    console.log(next.bankAccNumber, next.bankCode)
    // getTransList()
})

// 거래내역 조회
// 현재 계좌 변경 여부에 따라 실행
const getTransList = () => {
    $axios.get(openBankingTransListAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                pageInfo.transferList = res.data.transList
                pageInfo.visibleList = res.data.transList
            }
        })
        .catch(function(err) {
            // API 에러시
            console.log(err)
        })
}

getTransList()

</script>

<style lang="postcss" scoped>
.simpleBox { margin-bottom: 4px; }
</style>