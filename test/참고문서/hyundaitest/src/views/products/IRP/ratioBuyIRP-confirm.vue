<template>
    <div>
        <!-- IRP 투자비율 매수 -->
        <section>
            <div class="titleInStep">
                <h1>매수정보를<br>확인해주세요.</h1>
            </div>
            <ul class="roundBox">
                <li>
                    <span>신청일</span>
                    <p>2022.08.30</p>
                </li>
                <li>
                    <span>주문예정일(T)</span>
                    <p>2022.08.31</p>
                </li>
                <li>
                    <span>총 매수금액</span>
                    <p>1,000,000원</p>
                </li>
            </ul>
            <hr>
            <!--추가매수 목록-->
            <ul class="productList dropDown">
                <li :class="{ 'on' : pageInfo.pageList[0].isVisible }"
                    @click="pageInfo.pageList[0].isVisible = !pageInfo.pageList[0].isVisible">
                    <a href="javascript:;">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                    </a>
                    <transition name="slideVertical">
                        <ol class="squareBox" v-if="pageInfo.pageList[0].isVisible">
                            <li>
                                <span>매수금액</span>
                                <p>500,000원</p>
                            </li>
                            <li>
                                <span>결제(예정)일</span>
                                <p>2022.08.16</p>
                            </li>
                        </ol>
                    </transition>
                </li>
                <li :class="{ 'on' : pageInfo.pageList[1].isVisible }"
                    @click="pageInfo.pageList[1].isVisible = !pageInfo.pageList[1].isVisible">
                    <a href="javascript:;">
                        <h1>
                            NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]
                            <span class="bullet red">위험자산</span>
                        </h1>
                    </a>
                    <transition name="slideVertical">
                        <ol class="squareBox" v-if="pageInfo.pageList[1].isVisible">
                            <li>
                                <span>매수금액</span>
                                <p>500,000원</p>
                            </li>
                            <li>
                                <span>결제(예정)일</span>
                                <p>2022.08.16</p>
                            </li>
                        </ol>
                    </transition>
                </li>
            </ul>
        </section>
        <div class="bottomBtnArea align01">
             <button typw="button" class="h50 white"
                @click="$router.push({ name: 'tradingIRPBuy' })">이전</button>
             <button typw="button" class="h50 pointBlue"
                @click="$router.push({ name: 'ratioBuyIRPResult' })">매수신청</button>
        </div>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
const $priceToCommas = inject('$priceToCommas')
const $dateToCommas = inject('$dateToCommas')
const emit = defineEmits(['runEmits'])
const props = defineProps(['transInfo'])

const pageInfo = reactive({
    pageList: [
        {
            isVisible: true,
            itemName: '', // 상품명
            buyAmount: '', // 매수금액
            payDate: '', // 결제일
            isRiskAsset: false // 위험자산여부
        },
        {
            isVisible: false,
            itemName: '', // 상품명
            buyAmount: '', // 매수금액
            payDate: '', // 결제일
            isRiskAsset: true // 위험자산여부
        }
    ]
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
}
// 컴포넌트 종료
const closeComp = (returnVals) => {
    closeComponent()
}
</script>
<style lang="postcss" scoped>
section {
    padding: 0 0 24px;;
    & > hr {
        margin: 20px 0 0;
        height: 10px;
        border: none;
        background:rgba(239, 239, 239, 1);
    }
}
.productList.dropDown {
    & > li{
        border-bottom: 1px solid rgba(229, 229, 229, 1);
        & + li {
            border-top: none;
        }
    }
    & .squareBox { padding-bottom: 16px;}
}
</style>