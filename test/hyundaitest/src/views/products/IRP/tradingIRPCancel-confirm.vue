<!-- IRP매매 취소 확인 -->
<template>
<div>
    <section>
        <div class="titleInStep">
            <h1>주문취소 신청을<br>하시겠습니까?</h1>
        </div>
        <ul class="roundBox">
            <li>
                <span>신청일</span>
                <p>2022.08.30</p>
            </li>
            <li>
                <!-- 매매유형 : 매도, 매수 , 교체매매 -->
                <span>매매유형</span>
                <p class="fontBlue">매도</p>
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
                            <span>매수비율</span>
                            <p>50%</p>
                        </li>
                        <li>
                            <span>매수금액</span>
                            <p>500,000원</p>
                        </li>
                        <li>
                            <span>결제금액</span>
                            <p>0원</p>
                        </li>
                    </ol>
                </transition>
            </li>
            <li :class="{ 'on' : pageInfo.buyIRPList[1].isVisible }"
                @click="pageInfo.buyIRPList[1].isVisible = !pageInfo.buyIRPList[1].isVisible">
                <a href="javascript:;">
                    <h1>현금자산</h1>
                </a>
                <transition name="slideVertical">
                    <ol class="squareBox" v-if="pageInfo.buyIRPList[1].isVisible">
                        <li>
                            <span>매수비율</span>
                            <p>50%</p>
                        </li>
                        <li>
                            <span>매수금액</span>
                            <p>500,000원</p>
                        </li>
                        <li>
                            <span>결제금액</span>
                            <p>0원</p>
                        </li>
                    </ol>
                </transition>
            </li>
        </ul>
        <!-- <div class="buttonArea"
            data-buttonLength="1">
            <button type="button" class="pointBlue h50"
                @click="returnVal(false)"
                >이전</button>
            <button type="button" class="pointBlue h50"
                @click="returnVal(false)"
                >주문취소 신청</button>
        </div> -->
    </section>
    <div class="bottomBtnArea align01">
        <button typw="button" class="h50 white"
            @click="$router.push({ name: 'tradingIRPHistory' })">이전</button>
        <button typw="button" class="h50 pointBlue"
            @click="$router.push({ name: 'cancelIRPResult' })">주문취소 신청</button>
    </div>
</div>
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
const $priceToCommas = inject('$priceToCommas')
const $dateToCommas = inject('$dateToCommas')
const emit = defineEmits(['runEmits'])

const pageInfo = reactive({
    sellIRPList: [
        {
            isVisible: true,
            itemName: '', // 상품명
            sellAmount: '', // 매도금액
            payDate: new Date() // 결제일
        },
        {
            isVisible: false,
            itemName: '', // 상품명
            sellAmount: '', // 매도금액
            payDate: new Date() // 결제일
        }
    ],
    buyIRPList: [
        {
            isVisible: true,
            itemName: '', // 상품명
            buyRatop: '', // 매수비율
            buyAmount: '', // 매수금액
            payAmount: new Date(), // 결제일
            isCash: false // 현금자산자산여부
        },
        {
            isVisible: false,
            itemName: '', // 상품명
            buyRatop: '', // 매수비율
            buyAmount: '', // 매수금액
            payAmount: new Date(), // 결제일
            isCash: false // 현금자산자산여부
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
    .bottomBtnArea {
        margin-top: 40px;
    }
</style>