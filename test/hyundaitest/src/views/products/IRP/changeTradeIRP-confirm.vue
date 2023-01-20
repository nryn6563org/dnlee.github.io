<template>
<div>
    <section>
        <!-- 교체매매 완료 -->
        <div class="titleInStep">
            <h1>교체매매신청을<br>하시겠습니까?</h1>
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
        </ul>
        <hr>
        <h3 class="fontBlue">매도 주문내역</h3>
        <!-- 매도주문 목록 -->
        <ul class="productList dropDown">
            <!-- 반복리스트 -->
            <li :class="{ 'on' : pageInfo.sellIRPList[0].isVisible }"
                @click="pageInfo.sellIRPList[0].isVisible = !pageInfo.sellIRPList[0].isVisible">
                <a href="javascript:;">
                    <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                </a>
                <transition name="slideVertical">
                    <ol class="squareBox" v-if="pageInfo.sellIRPList[0].isVisible">
                        <li>
                            <span>매도금액</span>
                            <p>500,000원</p>
                        </li>
                        <li>
                            <span>결제(예정)일</span>
                            <p>2022.08.16</p>
                        </li>
                    </ol>
                </transition>
            </li>
            <li :class="{ 'on' : pageInfo.sellIRPList[1].isVisible }"
                @click="pageInfo.sellIRPList[1].isVisible = !pageInfo.sellIRPList[1].isVisible">
                <a href="javascript:;">
                    <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                </a>
                <transition name="slideVertical">
                    <ol class="squareBox" v-if="pageInfo.sellIRPList[1].isVisible">
                        <li>
                            <span>매도금액</span>
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
        <hr>
        <h3 class="fontRed">매수 주문내역</h3>
        <!-- 매수주문 목록 -->
        <ul class="productList dropDown">
            <!-- 반복리스트 -->
            <li :class="{ 'on' : pageInfo.buyIRPList[0].isVisible }"
                @click="pageInfo.buyIRPList[0].isVisible = !pageInfo.buyIRPList[0].isVisible">
                <a href="javascript:;">
                    <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                </a>
                <transition name="slideVertical">
                    <ol class="squareBox" v-if="pageInfo.buyIRPList[0].isVisible">
                        <li>
                            <span>매수금액</span>
                            <p>500,000원</p>
                        </li>
                    </ol>
                </transition>
            </li>
            <li :class="{ 'on' : pageInfo.buyIRPList[1].isVisible }"
                @click="pageInfo.buyIRPList[1].isVisible = !pageInfo.buyIRPList[1].isVisible">
                <a href="javascript:;">
                    <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                </a>
                <transition name="slideVertical">
                    <ol class="squareBox" v-if="pageInfo.buyIRPList[1].isVisible">
                        <li>
                            <span>매수금액</span>
                            <p>500,000원</p>
                        </li>
                    </ol>
                </transition>
            </li>
        </ul>
    </section>
    <div class="bottomBtnArea align01">
        <!-- 1:2 비율 .align01-->
        <button typw="button" class="h50 white">이전</button>
        <!-- 신규상품 중 숙려제도 대상여 확인 절차 필요 -->
        <button typw="button" class="h50 pointBlue"
            @click="$router.push({ name: 'changeTradeIRPResult'})">교체매매 신청</button>
    </div>
</div>
<component :is="componentsInfo.compName"
    :options="componentsInfo.compOption"
    @runEmits="closeComp" />
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import modalDeepThinkingGuide from '@/components/products/modalDeepThinkingGuide.vue' // 숙려제도 안내
const $router = useRouter()
const $priceToCommas = inject('$priceToCommas')
const $dateToCommas = inject('$dateToCommas')
const emit = defineEmits(['runEmits'])
const props = defineProps(['transInfo'])

const pageInfo = reactive({
    // 매도목록
    sellIRPList: [
        {
            isVisible: true,
            itemName: '', // 상품명
            sellAmount: '', // 매도금액
            dueDate: new Date() // 지금예정일
        },
        {
            isVisible: false,
            itemName: '', // 상품명
            sellAmount: '', // 매도금액
            dueDate: new Date() // 지금예정일
        }
    ],
    // 매수목록 - 신규상품 중 숙려제도 대상여부 확인 필
    buyIRPList: [
        {
            isVisible: true,
            itemName: '', // 상품명
            buyAmount: '', // 매수금액
            isDeepThinking: false // 숙려제도 대상여부
        },
        {
            isVisible: false,
            itemName: '', // 상품명
            buyAmount: '', // 매수금액
            isDeepThinking: true // 숙려제도 대상여부
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
    const comps = componentsInfo.compName
    if(returnVals !== false) {
        closeComponent()
    } else {
        closeComponent()
    }
}
</script>
<style lang="postcss" scoped>
    section {
        padding-bottom: 40px;
        & > h3 { margin: 18px 0;}
        & > hr {
            margin: 20px 0 0;
            height: 10px;
            border: none;
            background:rgba(239, 239, 239, 1);
        }
        & .productList.dropDown + hr { margin: 0;}
    }
    .productList.dropDown {
        & > li{
            border-top: 1px solid rgba(229, 229, 229, 1);
        }
        & .squareBox { padding-bottom: 16px;}
        &:last-of-type {
            border-bottom: 1px solid rgba(229, 229, 229, 1);
        }
    }
</style>