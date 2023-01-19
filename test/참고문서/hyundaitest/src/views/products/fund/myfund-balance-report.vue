<template>
    <article :class="{ 'notBottom' : props.pageInfo.bankCode === '' && props.pageInfo.bankAccNumber === '' }">
        <ol class="squareBox">
            <li>
                <span>총수익률</span>
                <p class="fontRed">100.25%</p>
            </li>
            <li>
                <span>총평가금액</span>
                <p>10,000,000원</p>
            </li>
            <li>
                <span>예수금</span>
                <p>1,000,000원</p>
            </li>
        </ol>
        <div class="listSort">
            <!-- 전체 계좌 시 비노출 -->
            <label for="allAcct"
                v-if="props.pageInfo.bankCode !== '' && props.pageInfo.bankAccNumber !== ''">
                <input type="checkbox" id="allAcct">
                <div>전체선택</div>
            </label>
            <label for="checkZero" class="checkZero">
                <input type="checkbox" id="checkZero">
                <div>0원 잔고 포함</div>
            </label>
        </div>
        <!-- 개별계좌 선택 시 .on / checkBox노출 -->
        <ul class="productList" :class="{ 'select' : props.pageInfo.bankCode !== '' && props.pageInfo.bankAccNumber !== '' }">
            <!-- 반복 리스트 || 잔고 있는 펀드 -->
            <li>
                <label>
                    <input type="checkbox">
                    <div></div>
                </label>
                <button type="button" class="del"></button>
                <a href="javascript:;">
                    <h1>
                        NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]
                    </h1>
                </a>
                <ol class="simpleBox">
                    <li v-if="pageInfo.fundList[0].balance > 0">
                        <span>수익률</span>
                        <p class="fontRed">100.25%</p>
                    </li>
                    <li>
                        <span>납입금액</span>
                        <p class="fontLightGray">10,000,000원</p>
                    </li>
                    <li>
                        <span>평가금액</span>
                        <p class="fontLightGray">1,000,000원</p>
                    </li>
                </ol>
                <div class="innerBtnBox">
                    <!--
                        추가 매수 진행 시 수려제도 안내의 필요 유무에 따라 다음의 컴포넌트를 실행한다
                        숙려제도 팰요시 : modalDeepThinkingGuide 숙려제도 안내
                        숙려제도 미필요시 : modalFundAddBuyEnter 추가매수 금액입력
                    -->
                    <button type="button" class="fontRed"
                        @click="runComp(modalDeepThinkingGuide)">추가매수</button>
                    <button type="button" class="fontBlue"
                        v-if="pageInfo.fundList[0].balance > 0"
                        @click="runComp(modalFundSellEnter)">매도</button>
                    <button type="button" class="fontBlue"
                        v-else
                        @click="runComp(modalFundDelConfirm)">삭제</button>
                    <button type="button"
                        @click="runComp(modalFundBalanceView)">잔고상세</button>
                </div>
            </li>
            <!-- 반복 리스트 || 잔고 없는 펀드 -->
            <li>
                <label>
                    <input type="checkbox">
                    <div></div>
                </label>
                <a href="javascript:;">
                    <h1>
                        NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]
                    </h1>
                </a>
                <ol class="simpleBox">
                    <li v-if="pageInfo.fundList[1].balance > 0">
                        <span>수익률</span>
                        <p class="fontRed">100.25%</p>
                    </li>
                    <li>
                        <span>납입금액</span>
                        <p class="fontLightGray">10,000,000원</p>
                    </li>
                    <li>
                        <span>평가금액</span>
                        <p class="fontLightGray">1,000,000원</p>
                    </li>
                </ol>
                <div class="innerBtnBox">
                    <button type="button" class="fontRed"
                        @click="runComp(modalFundAddBuyEnter)">추가매수</button>
                    <button v-if="pageInfo.fundList[1].balance > 0"
                        type="button" class="fontBlue"
                        @click="runComp(modalFundSellEnter)">매도</button>
                    <button v-else type="button"
                        @click="runComp(modalFundDelConfirm)">삭제</button>
                    <button type="button"
                        @click="runComp(modalFundBalanceView)">잔고상세</button>
                </div>
            </li>
        </ul>
    </article>
    <div class="buttonArea" v-if="props.pageInfo.bankCode !== '' && props.pageInfo.bankAccNumber !== ''">
        <button type="button" class="red h50"
            @click="runComp(modalFundAddBuyEnter)">추가매수</button>
        <button type="button" class="blue h50"
            @click="runComp(modalFundSellEnter)">매도</button>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</template>

<script setup>
import { reactive, markRaw } from 'vue'
import modalDeepThinkingGuide from '@/components/products/modalDeepThinkingGuide.vue' // 숙려제도 팝업
import modalFundAddBuyEnter from '@/components/products/modalFundAddBuy-enter.vue' // 펀드 추가매수 금액입력
import modalFundAddBuyAgree from '@/components/products/modalFundAddBuy-agree.vue' // 펀드 추가매수 시 투자설명서 확인(동의)
import bottomReceiptMenual from '@/components/products/bottomReceiptMenual.vue' // 펀드 추가매수 시 투자설명서 확인(동의)
import modalFundAddBuyConfirm from '@/components/products/modalFundAddBuy-confirm.vue' // 펀드 추가매수 정보확인
import modalFundAddBuyResult from '@/components/products/modalFundAddBuy-result.vue' // 펀드 추가매수 결과

import modalFundDelConfirm from '@/components/products/modalFundBalance-delConfirm.vue' // 펀드 삭제 확인
import modalFundDelResult from '@/components/products/modalFundBalance-delResult.vue' // 펀드 삭제 완료

import modalFundSellEnter from '@/components/products/modalFundSell-enter.vue' // 펀드 매도정보 입력
import modalFundSellConfirm from '@/components/products/modalFundSell-confirm.vue' // 펀드 매도정보 확인
import modalFundSellResult from '@/components/products/modalFundSell-result.vue' // 펀드 매도 완료

import modalFundBalanceView from '@/components/products/modalFundBalance-view.vue' // 잔고상세보기


const props = defineProps(['pageInfo'])

const pageInfo = reactive({
    fundList: [
        { balance: 1000000 },
        { balance: 0 }

    ]
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
}
// 컴포넌트 종료
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        if(comps === modalDeepThinkingGuide) {
            // 추가매수 step1
            closeComponent(true)
            runComp(modalFundAddBuyEnter)
        } else if(comps === modalFundAddBuyEnter) {
            // 추가매수 step2
            closeComponent(true)
            runComp(modalFundAddBuyAgree)
        } else if(comps === modalFundAddBuyAgree) {
            // 추가매수 step3
            closeComponent(true)
            if(returnVals === 'back') {
                runComp(modalFundAddBuyEnter)
            } else {
                runComp(bottomReceiptMenual)
            }
        } else if(comps === bottomReceiptMenual) {
            // 추가매수 step4
            closeComponent(true)
            runComp(modalFundAddBuyConfirm)
        } else if(comps === modalFundAddBuyConfirm) {
            // 추가매수 step5
            closeComponent(true)
            if(returnVals === 'back') {
                runComp(modalFundAddBuyAgree)
            } else {
                runComp(modalFundAddBuyResult)
            }
        } else if(comps === modalFundSellEnter) {
            // 매도 step1
            closeComponent(true)
            runComp(modalFundSellConfirm)
        } else if(comps === modalFundSellConfirm) {
            // 매도 step2
            closeComponent(true)
            if(returnVals === 'back') {
                runComp(modalFundSellEnter)
            } else {
                runComp(modalFundSellResult)
            }
        } else if(comps === modalFundDelConfirm) {
            // 삭제 step1
            closeComponent(true)
            runComp(modalFundDelResult)
        } else if(comps === modalFundBalanceView) {
            // 잔고상세 step1
            closeComponent(true)
            if(returnVals === 'sell') {
                runComp(modalFundSellEnter)
            } else if(returnVals === 'addBuy') {
                runComp(modalFundDelResult)
            }
        } else {
            closeComponent()
        }
    } else {
        closeComponent()
    }
}
</script>
<style lang="postcss" scoped>
article {
    min-height: calc(100% - 194px);
    padding-bottom: 86px !important;
    &.notBottom { padding-bottom: 0 !important; }
}
.productList { margin-bottom: 6px }
.checkZero { margin-left: auto; }
.innerBtnBox {
    & button {
        flex: 1 1 33%;
        padding: 0;
    }
    & button + button {
        margin-left: 10px;
    }
}
.simpleBox {
    margin-top: 12px;
}
</style>