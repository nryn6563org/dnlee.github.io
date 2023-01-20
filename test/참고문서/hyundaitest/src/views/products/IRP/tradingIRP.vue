<template>
<div>
    <!-- IRP 상품매매 -->
    <section>
        <!-- 계좌선택 -->
        <div class="selectMyAcc">
            <button type="button" class="select"
                @click="runComp(selectMyAccListInTypes)">
                {{ $codeToBank(pageInfo.bankCode).korName  + ' ' + $hmsecToDash(pageInfo.bankAccNumber) }}
            </button>
            <!-- 비밀번호 저장, 비밀번호 유효검토 완료 후 class에 'passed' 추가 -->
            <button type="button" :class="[pageInfo.isPassed ? 'passed' : '']"
                @click="runComp(regAccPassword)"></button>
        </div>
        <template v-if="pageInfo.isPassed">
            <div class="tabStyle04 h38 shadow">
                <!-- 매수buy, 매도sell,교체매매 changeTrade, 거래내역 history -->
                <ul data-tabList="4">
                    <li class="widthS" :class="{ 'on' : $route.name === 'tradingIRPBuy' }"
                        @click="$router.push({ name: 'tradingIRPBuy' }), selectTabMenu('buy')">
                        <a href="javascript:;">매수</a>
                    </li>
                    <li class="widthS" :class="{ 'on' : $route.name === 'tradingIRPSell' && pageInfo.selectTabMenu === 'sell' }"
                        @click="$router.push({ name: 'tradingIRPSell' }), selectTabMenu('sell')">
                        <a href="javascript:;">매도</a>
                    </li>
                    <li :class="{ 'on' : $route.name === 'tradingIRPSell' && pageInfo.selectTabMenu === 'changeTrade'}"
                        @click="$router.push({ name: 'tradingIRPSell' }), selectTabMenu('changeTrade')">
                        <a href="javascript:;">교체매매</a>
                    </li>
                    <li class="widthM" :class="{ 'on' : $route.name === 'tradingIRPHistory' }"
                        @click="$router.push({ name: 'tradingIRPHistory' }), selectTabMenu('tradingIRPHistory')">
                        <a href="javascript:;">거래내역/취소</a>
                    </li>
                </ul>
            </div>
            <router-view
                :pageInfo="pageInfo" />
        </template>
    </section>
</div>
<component :is="componentsInfo.compName"
    :options="componentsInfo.compOption"
    @runEmits="closeComp"/>
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import selectMyAccListInTypes from '@/components/banking/selectMyAccListInTypes.vue' // 계좌선택
import regAccPassword from '@/components/banking/regAccPassword.vue' // 비밀번호 입력
import popupTradingIRPGuide from '@/components/products/popupTradingIRPGuide.vue' // 팝업 IRP 상품매매 이용안내
const $router = useRouter()
const $route = useRoute()
const $axios = inject('$axios')
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')
const props = defineProps(['baseInfo'])
const myAccListAPI = '/json/banking/myAccList.json'

// 탭메뉴별 컴포넌트 실행
const pageInfo = reactive({
    bankCode: '',
    bankAccNumber: '',
    isPassed: false, // 비밀번호 입력확인 여부
    selectTabMenu: 'buy' // 탭메뉴 선택 - 매수buy, 매도sell,교체매매 changeTrade, 거래내역 history
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
// 컴포넌트 실행
const runComp = (comps, directInput) => {
    componentsInfo.compName = markRaw(comps)
    if(comps === selectMyAccListInTypes) {
        componentsInfo.compOption = {
            useAll: false,
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
            pageInfo.isPassed = returnVals.isPassed
            if(!pageInfo.isPassed) {
                runComp(regAccPassword)
            } else {
                closeComponent()
            }
        } else if (comps === regAccPassword) {
            // closeComponent()
            if(returnVals) {
                pageInfo.isPassed = returnVals.isPassed // 비밀번호 입력 성공 여부
                // 패스워드 자동 저장체크
                if(returnVals.isPasswordSave) {
                    console.log('저장함수 호출')
                } else {
                    closeComponent()
                }
            } else {
                closeComponent()
                pageInfo.isPassed = false
            }
        }
    } else {
        closeComponent()
    }
}
// 탭메뉴 선택
const selectTabMenu = (menu, comps) => {
    // pageInfo.pageCompName = markRaw(comps)
    pageInfo.selectTabMenu = menu
}
// runComp(popupTradingIRPGuide)
const preRun = () => {
    $axios.get(myAccListAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                const firstAcc = res.data.accList[0]
                pageInfo.bankCode = firstAcc.bankCode
                pageInfo.bankAccNumber = firstAcc.bankAccNumber
                pageInfo.isPassed = firstAcc.isPassed
            } else {
                // 호출 오류 시
            }
        })
        .catch(function(err) {
            // API 오류 시
            console.log(err)
        })
}
// 최초 내 계좌 확인 실행
preRun()
</script>
<style lang="postcss" scoped>
section {
    height: calc(100% - 126px);
}
/* 계좌선택 */
.selectMyAcc { padding-top: 12px;}
/* 탭메뉴 */
.tabStyle04 ul[data-tabList="4"] {
    display: flex;
    & li {
        flex: 1; min-width: 66px;
        &.widthS {
            flex-grow: 0;
            flex-basis: 18%;
        }
        &.widthM {
            flex-grow: 0;
            flex-basis: 37%;
        }
    }
}
</style>