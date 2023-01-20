<template>
<div>
    <!-- IRP상품매매 > 매수 -->
    <article :class="{'section' : tradeType !== 'tradingIRPBuy' }" id="addBuyIRP">
        <!-- 매수 페이지 내 하위로 동작 시 -->
        <template v-if="tradeType === 'tradingIRPBuy'">
            <ul class="squareBox">
                <li>
                    <strong>현금성 자산</strong>
                </li>
                <li>
                    <span>현재잔고</span>
                    <p>1,000,000원</p>
                </li>
                <li>
                    <span>주문가능금액</span>
                    <p>1,000,000원</p>
                </li>
            </ul>
            <h4 class="gray">주문금액</h4>
            <label class="price">
                <input type="text" class="h50" placeholder="금액 입력"
                    inputmode="none" readonly
                    :value="$priceToCommas(pageInfo.orderPrice) + (pageInfo.orderPrice !== '' && pageInfo.orderPrice !== 0 ? '원' : '' )"
                    @click="runComp(popupSellSetting)">
                <!-- <p>주문가능한 금액을 초과하였습니다.</p> -->
            </label>
        </template>
        <!-- 교체매매 진행시 매도 후 실행 -->
        <template v-else>
            <div class="titleInStep">
                <h1>
                    매수상품을<br>
                    선택해주세요
                </h1>
            </div>
        </template>
        <h4 class="gray">매수상품 선택</h4>
        <div class="tab">
            <label for="newItem">
                <input type="radio" id="newItem" name="checkItem"
                    value="newItem"
                    v-model="pageInfo.productType">
                <div>신규상품 매수</div>
            </label>
            <label for="addItem">
                <input type="radio" id="addItem" name="checkItem"
                    value="addItem"
                    v-model="pageInfo.productType">
                <div>추가 매수</div>
            </label>
            <label for="ratio">
                <input type="radio" id="ratio" name="checkItem"
                    value="ratio"
                    v-model="pageInfo.productType">
                <div>투자비율</div>
            </label>
        </div>
        <!-- 매수 > 신규상품매수 -->
        <div class="newItem"
            v-if="pageInfo.productType === 'newItem'">
            <p>신규 가입 후 IRP 매수가 진행됩니다.</p>
            <button type="button"
                @click="runComp(popupNewIRP, 'saveProduct')">
                + 관심상품 매수
            </button>
            <button type="button"
                @click="runComp(popupNewIRP, 'newProduct')">
                + 신규상품 검색
            </button>
        </div>
        <!-- 매수 > 추가매수 상품 목록x-->
        <div class="addItem"
            v-if="pageInfo.productType === 'addItem' && pageInfo.addItemList.length == 0">
            <p>나의 가입상품에서 매수할 상품을<br>추가해주세요.</p>
            <button type="button">+ 상품 추가</button>
        </div>
        <!-- 매수 > 추가매수 상품 목록o-->
        <div class="addItemList"
            v-if="pageInfo.productType === 'addItem' && pageInfo.addItemList.length !== 0">
            <ul class="productList block delete">
                <li>
                    <button type="button" class="del" title="삭제"></button>
                    <a href="javascript:;">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]Class</h1>
                    </a>
                    <div>
                        <label class="price">
                            <input type="text" class="h50" placeholder="매수비율 입력"
                                inputmode="none" readonly
                                :value="$priceToCommas(pageInfo.orderPrice)"
                                @focus="runComp(regPriceInput)">
                            <button type="button" class="resetInput"
                                v-if="pageInfo.orderPrice !== ''"
                                @click.prevent="pageInfo.orderPrice = ''"></button>
                        </label>
                        <ol class="simpleBox">
                            <li>
                                <span>매수예정금액</span>
                                <p>0원</p>
                            </li>
                        </ol>
                    </div>
                </li>
                <li>
                    <button type="button" class="del" title="삭제"></button>
                    <div class="bullets">
                        <span class="bullet red">위험자산</span>
                    </div>
                    <a href="javascript:;">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]Class</h1>
                    </a>
                    <div>
                        <label class="price">
                            <input type="text" class="h50" placeholder="매수비율 입력"
                                inputmode="none" readonly
                                @focus="runComp(regPriceInput)">
                        </label>
                        <ol class="simpleBox">
                            <li>
                                <span>매수예정금액</span>
                                <p>0원</p>
                            </li>
                        </ol>
                    </div>
                </li>
                <!-- <li>
                    <button type="button" class="del" title="삭제"></button>
                    <h2>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]Class</h2>
                    <label>
                        <input type="text" class="h50" placeholder="매수비율 입력" inputmode="none">
                        <button type="button" data-v-89129de2="">x</button>
                    </label>
                    <p>매수예정금액 <strong>0원</strong></p>
                </li>
                <li>
                    <button type="button" class="del" title="삭제"></button>
                    <p class="bullet red">위험자산</p>
                    <h2>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]Class</h2>
                    <label>
                        <input type="text" class="h50" placeholder="매수비율 입력" inputmode="none">
                        <button type="button" data-v-89129de2="">x</button>
                    </label>
                    <p>매수예정금액 <strong>0원</strong></p>
                </li> -->
            </ul>
            <button type="button"
                @click="runComp(popupMyListIRP)">+ 상품 추가</button>
            <!-- 매수 할 상품이 없을 경우 미노출 -->
            <ol class="roundBox bgBlue">
                <li>
                    <p>매수비율 합계</p>
                    <h1>100%</h1>
                </li>
                <li class="smallFont">
                    <span>위험자산 매수 가능(초과액)</span>
                    <span>1,000,000원(500,000원)</span>
                </li>
                <hr>
                <li class="smallFont">
                    <p class="fontRed">※ 매수비율의 합계가 100%가 되어야 합니다.</p>
                </li>
            </ol>
        </div>
        <!-- 매수 > 투자비율 목록 x & 투자비율 등록여부 -->
        <div class="ratioItem"
            v-if="pageInfo.productType === 'ratio' && pageInfo.ratioItemList.length == 0">
            <!-- 투자비율 미등록 -->
            <template v-if="!pageInfo.hasRatio">
                <p>등록된 투자비율이 없습니다.<br>투자비율 등록 후 진행 가능합니다.</p>
                <button type="button">투자비율 등록하기</button>
            </template>
            <!-- 투자비율 등록 -->
            <template v-if="pageInfo.hasRatio">
                <p>매수할 상품이 없습니다.<br>매수할 상품을 추가해주세요.</p>
                <button type="button">+ 투자비율 상품 다시 불러오기</button>
            </template>
        </div>
        <!-- 매수 > 투자비율 목록 o -->
        <div class="ratioItemList"
            v-if="pageInfo.productType === 'ratio' &&pageInfo.ratioItemList.length !== 0">
            <ul class="productList block delete">
                <li>
                    <button type="button" class="del" title="삭제"></button>
                    <a href="javascrpt:;">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]Class</h1>
                    </a>
                    <div>
                        <label class="price">
                            <input type="text" class="h50" placeholder="매수비율 입력"
                                inputmode="none" readonly
                                @focus="runComp(regPriceInput)">
                        </label>
                    </div>
                    <ol class="simpleBox">
                        <li>
                            <span>매수예정금액</span>
                            <p>0원</p>
                        </li>
                    </ol>
                </li>
                <li>
                    <button type="button" class="del" title="삭제"></button>
                    <div class="bullets">
                        <span class="bullet red"
                        @click="runComp(modalRiskAssetInfo)">위험자산</span>
                    </div>
                    <a href="javascript:;">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]Class</h1>
                    </a>
                    <div>
                        <label class="price">
                            <input type="text" class="h50" placeholder="매수비율 입력"
                                inputmode="none" readonly
                                @focus="runComp(regPriceInput)">
                        </label>
                        <ol class="simpleBox">
                            <li>
                                <span>매수예정금액</span>
                                <p>0원</p>
                            </li>
                        </ol>
                    </div>
                </li>
            </ul>
            <!-- 매수 할 상품이 없을 경우 미노출 -->
            <ol class="roundBox bgBlue">
                <li>
                    <p>매수비율 합계</p>
                    <h1>100%</h1>
                </li>
                <li class="smallFont">
                    <span>위험자산 매수 가능(초과액)</span>
                    <span>1,000,000원(500,000원)</span>
                </li>
                <hr>
                <li class="smallFont">
                    <p class="fontRed">※ 매수비율의 합계가 100%가 되어야 합니다.</p>
                </li>
            </ol>
        </div>
    </article>
    <div class="buttonArea div3_7">
        <button type="button" class="h50 white"
            v-if="tradeType !== 'tradingIRPBuy'">이전</button>
        <button type="button" class="h50 pointBlue">다음</button>
    </div>
</div>
<component :is="componentsInfo.compName"
    :options="componentsInfo.compOption"
    @runEmits="closeComp" />
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import { useRoute } from 'vue-router'
import regPriceInput from '@/components/banking/regPriceInput.vue'
import popupSellSetting from '@/components/products/popupTradingIRP-sellSetting.vue' // 팝업 IRP 매도설정
import modalRiskAssetInfo from '@/components/products/modalTradingIRPRiskAsset.vue' // 모달 위험자산 투자비율 info
import popupMyListIRP from '@/components/products/popupMyListIRP.vue' // 팝업 나의 가입상품
import modalBuyRatioSum from '@/components/products/modalIRPBuyRatioSum.vue' // 모달 매수비율합계 100% 미만
import modalInvestGuide from '@/components/products/modalInvestGuide.vue' // 투자성향확인
import modalNewFundBuyNote from '@/components/products/modalNewFundBuyNote.vue' // 펀드투자 유의사항 팝업
import modalDeepThinkingGuide from '@/components/products/modalDeepThinkingGuide.vue' // 숙려제도 안내
import modalCheckInvestInfo from '@/components/products/modalCheckInvestInfo.vue' // 투자권유 희망 및 투자자정보 제공여부 확인
import modalIncongruityConfirm from '@/components/products/modalIncongruityConfirm.vue' // 부적합[부적정]상품 거래 확인서
// 신규 상품 가입 프로세스
import popupNewIRP from '@/components/products/popupNewIRP.vue'
const $route = useRoute()
const $priceToCommas = inject('$priceToCommas')
const props = defineProps(['pageInfo'])

// 거래타입
// tradingIRPBuy (일반매수), changeTrade (교채매매시 매수)
// 현재 route.name으로 구분한다.
const tradeType = $route.name

const pageInfo = reactive({
    orderPrice: '', // 주문금액
    productType: 'newItem', // 매수상품 선택 - newItem, addItem , ratio
    hasRatio: true, // 비율 등록여부 등록 true , 미등록 false
    addItemList: [ // 추가매수 상품목록
        {
            itemName: '', // 매수 상품명
            isRiskAsset: '', // 위험자산 여부
            buyAmount: '' // 매수예정금액
        }
    ],
    ratioItemList: [
        {
            itemName: '', // 매수 상품명
            isRiskAsset: '', // 위험자산 여부
            buyAmount: '' // 매수예정금액
        }
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
    if (comps === regPriceInput) {
        // 화면 포커스 이벤트
        componentsInfo.compOption = { sendPrice: '' }
    } else if(comps === popupSellSetting) {
        componentsInfo.compOption = {
            bankAccNumber: props.pageInfo.bankAccNumber
        }
    } else if(comps === popupNewIRP) {
        componentsInfo.compOption = {
            bankAccNumber: props.pageInfo.bankAccNumber,
            runPage: directInput
        }
    }
}
/*
modalInvestGuide // 투자성향확인
modalNewFundBuyNote // 펀드투자 유의사항 팝업
modalDeepThinkingGuide // 숙려제도 안내
modalCheckInvestInfo // 투자권유 희망 및 투자자정보 제공여부 확인
modalIncongruityConfirm // 부적합[부적정]상품 거래 확인서
*/
// runComp(modalIncongruityConfirm)

// 컴포넌트 종료
const closeComp = (returnVals) => {
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        if (comps === regPriceInput) {
            closeComponent()
        } else if(comps === popupSellSetting) {
            console.log(returnVals)
            pageInfo.orderPrice = returnVals
            closeComponent()
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
    padding-bottom: 80px;
    & > .squareBox { margin-bottom: 18px; }
    & > .price {
        width: calc(100% - 40px);
        margin-bottom: 28px; padding: 0 20px;
    }
    & .newItem, & .addItem, & .ratioItem {
        padding: 60px 0 ;
        text-align: center;
        & p {
            margin: 0 0 16px;
            color: rgba(140, 140, 140, 1);
        }
        & button ~ button { margin-left: 12px;}
    }
    & .roundBox {
        &.bgBlue { margin-bottom: 40px;}
        & li ~ li { margin-top: 12px; }
        & .smallFont > * { font-size: 0.857rem; }
    }
}
.tab {
    margin: 0 20px;
}
.productList {
    margin: 12px 0 12px;
    & .simpleBox { margin-top: 24px; }
    & + button { width: calc(100% - 40px); margin: 0 20px 12px; }
}

</style>