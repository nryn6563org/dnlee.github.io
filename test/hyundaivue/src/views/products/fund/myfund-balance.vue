<template>
    <!-- 펀드잔고 평가 -->
<div>
    <section id="myFund">
        <div class="selectMyAcc">
            <button type="button" class="select"
                @click="runComp(selectMyAccListInTypes)">
                <!-- <span>전체계좌</span> -->
                {{ pageInfo.bankCode === '' && pageInfo.bankAccNumber === '' ? '전체계좌' :
                    $codeToBank(pageInfo.bankCode).korName  + ' ' + $hmsecToDash(pageInfo.bankAccNumber) }}
                <!-- <span>1002-731-939993 김현대</span> -->
            </button>
            <button type="button" class="pw"
                @click="runComp(regAccPassword)"></button>
        </div>
        <div class="tabStyle04 h38 shadow">
            <ul data-tabList="2">
                <li :class="{ 'on' : $route.name === 'myfundBalanceReport' }"
                    @click="$router.push({ name: 'myfundBalanceReport' })">
                    <a href="javascript:;">잔고현황</a>
                </li>
                <li :class="{ 'on' : $route.name === 'myfundBalanceHistory' }"
                    @click="$router.push({ name: 'myfundBalanceHistory' })">
                    <a href="javascript:;">거래내역/취소</a>
                </li>
            </ul>
        </div>
        <router-view :pageInfo="{ bankCode: pageInfo.bankCode, bankAccNumber: pageInfo.bankAccNumber }" />
        <!-- 잔고현황 -->
        <!-- 거래내역/취소 -->
    </section>
</div>
<component :is="componentsInfo.compName"
    :options="componentsInfo.compOption"
    @runEmits="closeComp" />
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import selectMyAccListInTypes from '@/components/banking/selectMyAccListInTypes.vue' // 계좌선택
import regAccPassword from '@/components/banking/regAccPassword.vue' // 비밀번호 입력
const $route = useRoute()
const $router = useRouter()
const props = defineProps(['baseInfo'])
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')

const pageInfo = reactive({
    selectTabMenu: 'balance', // balance , history
    bankCode: '',
    bankAccNumber: ''
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
// 컴포넌트 실행
const runComp = (comps, directInput) => {
    componentsInfo.compName = markRaw(comps)
    if(comps === selectMyAccListInTypes) {
        componentsInfo.compOption = {
            useAll: true,
            bankingType: 'hmsec',
            bankCode: pageInfo.bankCode,
            bankAccNumber: pageInfo.bankAccNumber
        }
    } else if(comps === regAccPassword) {
        componentsInfo.compOption = {
            bankCode: '263',
            bankAccNumber: '111'
        }
    }
}
// 컴포넌트 종료
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        // closeComponent()
        if(comps === selectMyAccListInTypes) {
            pageInfo.bankCode = returnVals.bankCode
            pageInfo.bankAccNumber = returnVals.bankAccNumber
            closeComponent()
        } else if (comps === regAccPassword) {
            closeComponent()
        }
    } else {
        closeComponent()
    }
}
</script>
<style lang="postcss" scoped>
section {
    height: calc(100% - 50px);
    min-height: calc(100% - 50px);
}
</style>
