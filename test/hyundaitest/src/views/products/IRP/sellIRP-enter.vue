<template>
    <div>
        <!-- IRP 매도 -->
        <section>
            <div class="titleInStep">
                <h1>
                    매도정보를<br>
                    입력해주세요.
                </h1>
            </div>
            <!-- 계좌정보 -->
            <div class="selectMyAcc">
                <button class="h50 white select" type="button"
                    @click="runComp(selectMyAccListInTypes)">
                    <!-- <span>현대차증권 354-81-541521 </span> -->
                    {{ $hmsecToDash('123465790') }}
                    {{ $codeToBank('263').korName }}
                </button>
            </div>
            <hr>
            <!-- IRP 매도 리스트 -->
            <ul class="productList delete">
                <li>
                    <button type="button" class="del" title="삭제"></button>
                    <a href="javascript:;">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]Class</h1>
                        <p>매도가능금액<span>1,000,000원 (500좌)</span></p>
                    </a>
                    <div>
                        <label class="price">
                            <input type="text" class="h50" placeholder="매도 주문"
                                inputmode="none" readonly
                                @click="runComp(bottomMidTermcancel)">
                        </label>
                    </div>
                </li>
                <li>
                    <button type="button" class="del" title="삭제"></button>
                    <a href="javascript:;">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]Class</h1>
                        <p>매도가능금액<span>1,000,000원 (500좌)</span></p>
                    </a>
                    <div>
                        <label class="price">
                            <input type="text" class="h50" placeholder="매도 주문"
                                inputmode="none" readonly
                                @click="runComp(bottomMidTermcancel)">
                        </label>
                    </div>
                </li>
            </ul>
            <!-- 매도금액합계 -->
            <ul class="roundBox bgBlue" data-name="total">
                <li>
                    <strong>매도금액 합계</strong>
                    <strong>1,000,000원</strong>
                </li>
                <!-- 교체매매일 경우 노출 -->
                <li class="smallTxt" v-if="tradeType == 'changeTrade'">
                    <span>위험자산 매수 가능(초과액)</span>
                    <p>1,000,000원(0원)</p>
                </li>
            </ul>
            </section>
            <div class="bottomBtnArea align01">
                <button typw="button" class="h50 white"
                    @click="$router.push({ name: 'tradingIRPSell' })">이전</button>
                <button typw="button" class="h50 pointBlue" v-if="tradeType === 'sell'"
                    @click="$router.push({ name: 'sellIRPConfirm'})">다음</button>
                <button typw="button" class="h50 pointBlue" v-if="tradeType == 'changeTrade'"
                    @click="$router.push({ name: 'changeTradeIRPBuy', params: { buyType: 'changeTrade'}})">다음</button>
            </div>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import selectMyAccListInTypes from '@/components/banking/selectMyAccListInTypes.vue'
import regPrice from '@/components/banking/regPrice.vue'
import popupSellSetting from '@/components/products/popupTradingIRP-sellSetting.vue' // 팝업 IRP 매도설정
import bottomMidTermcancel from '@/components/products/bottomMidTermcancel.vue' // 바텀시트 중도해지 안내
const $router = useRouter()
const $route = useRoute()
const $codeToBank = inject('$codeToBank')
const $hmsecToDash = inject('$hmsecToDash')

// 교체매매 구분자
// sell - 일반매도, changeTrade - 교채매매
const tradeType = $route.params.type

console.log(tradeType)

// 컴포넌트 실행 분기
const componentsInfo = reactive({
    compName: null,
    compOption: null,
    emits: null
})
// 컴포넌트 초기화
const closeComponent = () => {
    componentsInfo.compName = null
    componentsInfo.compOption = null
    componentsInfo.emits = null
    closeComponent()
}
// 컴포넌트 실행
const runComp = (comps, directInput) => {
    componentsInfo.compName = markRaw(comps)
    if(comps === selectMyAccListInTypes) {
        componentsInfo.compOption = {
            bankingType: 'hmsec',
            bankCode: '263',
            bankAccNumber: '111'
        }
    } else if (comps === regPrice) {
        componentsInfo.compOption = {
        }
    }
}
// 컴포넌트 종료
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(comps === selectMyAccListInTypes) {
        closeComponent()
    } else if (comps === regPrice) {
        closeComponent()
    } else if (comps === bottomMidTermcancel) {
        if(returnVals !== false) {
            runComp(popupSellSetting)
        } else {
            closeComponent()
        }
    } else {
        closeComponent()
    }
}
</script>
<style lang="postcss" scoped>
    section {
        & > hr {
            margin: 0;
            height: 10px;
            border: none;
            background: rgba(239, 239, 239, 1);
        }
        & input[type="checkbox"] + div { font-size: 1rem;}
        & input[type="text"]::placeholder {text-align: left;}
        & > .roundBox { margin: 18px 20px 40px;}
    }
    .selectMyAcc { padding-top: 0;}
    .productList.delete {
        & > li {
            border-bottom: 1px solid rgba(229, 229, 229, 1); border-top: none;
            & a {
                padding-right: 0;
                & > h1 { padding-right: 30px;}
                & > p {
                    margin: 26px 0 12px;
                    color: rgba(140, 140, 140, 1);
                    & span {
                        float: right;
                        color: var(--black);
                    }
                }
            }
        }
    }
    .roundBox {
        & ~ li { margin-top: 12px;}
        & .smallTxt {
            font-size: 0.857rem; color: rgba(140, 140, 140, 1);
        }
    }
</style>