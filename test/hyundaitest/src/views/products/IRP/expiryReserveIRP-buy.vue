<template>
    <div>
    <!-- IRP 만기예약매수 -->
    <section>
        <ul class="simpleBox">
            <li>
                <strong>{{pageInfo.itemList.itemName}}</strong>
            </li>
            <li>
                <span>매수일</span>
                <p>{{pageInfo.itemList.buyDate}}</p>
            </li>
            <li>
                <span>만기일</span>
                <p>{{pageInfo.itemList.maturityDate}}</p>
            </li>
            <li>
                <span>현재 적용금리</span>
                <p>{{pageInfo.itemList.interestRate}}%</p>
            </li>
            <li v-if="pageInfo.itemList.itemType == '01'">
                <span>현재 예약매수방법</span>
                <p>동일상품</p>
            </li>
        </ul>
        <hr>
        <article>
            <h4 class="gray">변경 예약매수 방법</h4>
            <!-- 예약매수방법 선택 -->
            <div class="tab" data-name="buyType">
                <label for="sameItem">
                    <input type="radio" id="sameItem" name="buyWay" disabled
                        value="sameItem"
                        v-model="pageInfo.buyWay">
                    <div>동일상품</div>
                </label>
                <label for="direct">
                    <input type="radio" id="direct" name="buyWay"
                        value="direct"
                        v-model="pageInfo.buyWay">
                    <div>직접 선택</div>
                </label>
                <label for="ratio">
                    <input type="radio" id="ratio" name="buyWay"
                        value="ratio"
                        v-model="pageInfo.buyWay">
                    <div>투자비율대로</div>
                </label>
            </div>
            <!-- 예약매수방법 - 직접선택 -->
            <template v-if="pageInfo.buyWay === 'direct'">
                <h4 class="gray">매수상품 선택</h4>
                <div class="tab">
                    <label for="newItem">
                        <input type="radio" id="newItem" name="selectItem" checked
                            value="newItem"
                            v-model="pageInfo.selectItem">
                        <div>신규상품 매수</div>
                    </label>
                    <label for="addItem">
                        <input type="radio" id="addItem" name="selectItem"
                            value="addItem"
                            v-model="pageInfo.selectItem">
                        <div>추가 매수</div>
                    </label>
                </div>
                <!-- 신규상품매수 -->
                <div class="newItem" v-if="pageInfo.selectItem === 'newItem'">
                    <p>
                        신규상품 가입 후<br>
                        IRP 만기예약매수가 진행됩니다.
                    </p>
                    <button type="button">+ 관심상품 매수</button>
                    <button type="button">+ 신규상품 검색</button>
                </div>
                <!-- 추가매수 -->
                <div v-if="pageInfo.selectItem === 'addItem'">
                    <ul class="productList block delete">
                        <li>
                            <div class="bullets">
                                <span class="bullet red">위험자산</span>
                            </div>
                            <button type="button" class="del" title="삭제"></button>
                            <a href="javascrpt:;">
                                <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]Class</h1>
                            </a>
                            <div>
                                <label class="price">
                                    <input type="text" class="h50" placeholder="매수비율 입력"
                                        inputmode="none" readonly
                                        @focus="runComp(regPrice)">
                                </label>
                            </div>
                        </li>
                    </ul>
                    <button type="button">+ 상품 추가</button>
                </div>
            </template>
            <!-- 예약매수방법 투자비율대로 -->
            <template  v-if="pageInfo.buyWay === 'ratio'">
                <div>투자비율대로</div>
            </template>
            <div v-if="pageInfo.buyWay === 'direct' || pageInfo.buyWay === 'ratio'">
                <p class="guideTxt size12">매수 등록된 상품이 향후 판매가 중지될 경우, 해당 상품에 등록된 비율의 매수는 현금성 자산으로 자동 매수됩니다.</p>
                <p class="guideTxt size12">매수 상품이 위험자산인 경우 해당 상품 매수로 위험자산 투자한도가 초과되는 경우, 해당 상품에 등록된 비율의 매수는 현금성 자산으로 자동 매수됩니다.</p>
            </div>
            <ol class="roundBox bgBlue"
                v-if="pageInfo.selectItem === 'addItem' || pageInfo.buyWay === 'ratio'">
                <li>
                    <p>매수비율 합계</p>
                    <h1>0%</h1>
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
        </article>
    </section>
    <div class="buttonArea div3_7">
        <button type="button" class="h50 white"
            v-if="tradeType !== 'tradingIRPBuy'">이전</button>
        <button type="button" class="h50 pointBlue">만기예약매수</button>
    </div>
</div>
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const $axios = inject('$axios')
const $router = useRouter()
const $route = useRoute()
const expiryIRPListAPI = '/json/products/expiryIRPList.json'
// 상품목록 구분자
const itemCode = $route.params.itemCode
const pageInfo = reactive({
    buyWay: 'direct', // 동일상품 sameItem 직접 선택 direct 투자비율대로 ratio
    selectItem: 'newItem', // 직접선택 > 신규상품매수 newItem , 추가매수 addItem
    itemList: {
        itemCode: '', // 상품코드
        itemType: '', // 상품유형 예금 01, 실적배당형 02, RP 03, ELS 04
        itemName: '', // 상품명
        buyDate: '', // 매수일
        marketValue: 0, // 평가금액
        maturityDate: '', // 만기(예정)일
        interestRate: '' // 적용금리
    }
})
const preRun = () => {
    $axios.get(expiryIRPListAPI, {})
        .then(function(res) {
            if(res.data.affective === 200) {
                // 선택된 예약가능 상품 itemCode로 필터링
                const selectData = res.data.irpList.filter(arr => arr.itemCode === itemCode)[0]
                pageInfo.itemList.itemCode = selectData.itemCode
                pageInfo.itemList.itemType = selectData.itemType
                pageInfo.itemList.itemName = selectData.itemName
                pageInfo.itemList.buyDate = selectData.buyDate
                pageInfo.itemList.marketValue = selectData.marketValue
                pageInfo.itemList.maturityDate = selectData.maturityDate
                pageInfo.itemList.interestRate = selectData.interestRate
            }
        })
        .catch(function(err) {
            console.log(err)
        })
}
preRun()
</script>
<style lang="postcss" scoped>
article {
    padding:20px 0 76px;
    & .tab {
        margin: 0 20px;
        &[data-name="buyType"] { margin-bottom: 24px;}
    }
    & .roundBox {
        &.bgBlue {
            margin-top: 24px; margin-bottom: 34px;
        }
        & li ~ li { margin-top: 12px; }
        & .smallFont > * { font-size: 0.857rem; }
    }
    /* 직접선택 > 신규매수 */
    & .newItem {
        padding: 60px 20px 80px;
        text-align: center;
        & p:not(.guideTxt) {
            margin: 0 0 16px;
            color: rgba(140, 140, 140, 1);
        }
        & button {
            padding: 0 16px;
            & ~ button { margin-left: 12px;}
        }
    }
    /* 직접선택 > 추가매수 */
    & .productList.block.delete { margin: 18px 0;}
    & .productList.block.delete + button {
        width: calc(100% - 40px);
        margin: 0 20px 18px;
    }
}

/* 상품기본정보 */
.simpleBox {
    padding: 20px;
    & h1 { word-break: keep-all;}
}
.guideTxt {
    margin: 0 20px;
    & ~ p { margin-top: 8px;}
    /* &:last-child { margin-bottom: 34px;} */
}

</style>