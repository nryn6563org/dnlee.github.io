<template>
    <!--IRP 거래내역/취소 상세보기-->
<div id="tradingHistoryView" class="fullPopup">
    <div class="header">
        <h1>거래내역/취소 상세보기</h1>
        <button class="modalClose" @click="returnVal(false)"></button>
    </div>
    <div class="contentsArea">
        <div class="roundBlock bgBlue">
            <!-- 상태값 : 접수 / 진행중 / 결제완료 -->
            <h2>결제완료</h2>
            <p>※ 취소는 주문접수 당일에만 처리 가능합니다.</p>
        </div>
        <hr>
        <!-- 거래타입별 목록 노출 : 매도(매도목록), 매수(매수목록), 교체매매 (매수,매도 모든목록) -->
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
                            <span>신청일</span>
                            <p>2022.09.02</p>
                        </li>
                        <li>
                            <span>매도금액</span>
                            <p>10,000원</p>
                        </li>
                        <li>
                            <span>결제(예정)일</span>
                            <p>2022.09.05</p>
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
                            <span>신청일</span>
                            <p>2022.09.02</p>
                        </li>
                        <li>
                            <span>매도금액</span>
                            <p>10,000원</p>
                        </li>
                        <li>
                            <span>결제(예정)일</span>
                            <p>2022.09.05</p>
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
                            <span>신청일</span>
                            <p>2022.09.02</p>
                        </li>
                        <li>
                            <span>매수금액</span>
                            <p>500,000원</p>
                        </li>
                        <!-- 결제금액 : 처리상태가 결제완료 일 때 -->
                        <li>
                            <span>결제금액</span>
                            <p>500,000원</p>
                        </li>
                        <li>
                            <span>결제(예정)일</span>
                            <p>2022.09.05</p>
                        </li>
                        <li>
                            <span>매수비율</span>
                            <p>50%</p>
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
                            <span>신청일</span>
                            <p>2022.09.02</p>
                        </li>
                        <li>
                            <span>매수금액</span>
                            <p>500,000원</p>
                        </li>
                        <!-- 결제금액 : 처리상태가 결제완료 일 때 -->
                        <li>
                            <span>결제금액</span>
                            <p>500,000원</p>
                        </li>
                        <li>
                            <span>결제(예정)일</span>
                            <p>2022.09.05</p>
                        </li>
                        <li>
                            <span>매수비율</span>
                            <p>50%</p>
                        </li>
                    </ol>
                </transition>
            </li>
        </ul>
    </div>
    <div class="buttonArea"
        data-buttonLength="1">
        <button type="button" class="pointBlue h50"
            @click="returnVal(false)"
            >확인</button>
            <!-- 처리상태 접수 일때 -->
        <!-- <button type="button" class="pointBlue h50"
            @click="returnVal(false)"
            >매매취소</button> -->
    </div>
</div>
</template>
<script setup>
import { reactive, inject, onMounted, markRaw } from 'vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
const $priceToCommas = inject('$priceToCommas')
const $dateToCommas = inject('$dateToCommas')
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const emit = defineEmits(['runEmits'])
const pageInfo = reactive({
    sellIRPList: [
        {
            isVisible: true,
            itemName: '', // 상품명
            sellAmount: '', // 매도금액
            applyDate: new Date(), // 신청일
            payDate: new Date() // 결제일
        },
        {
            isVisible: false,
            itemName: '', // 상품명
            sellAmount: '', // 매도금액
            applyDate: new Date(), // 신청일
            payDate: new Date() // 결제일
        }
    ],
    buyIRPList: [
        {
            isVisible: true,
            itemNage: '', // 상품명
            buyAmount: '', // 매수금액
            payAmount: '', // 결제금액
            buyRatio: '', // 매수비율
            applyDate: new Date(), // 신청일
            payDate: new Date() // 결제예정일
        },
        {
            isVisible: false,
            itemNage: '', // 상품명
            buyAmount: '', // 매수금액
            payAmount: '', // 결제금액
            buyRatio: '', // 매수비율
            applyDate: new Date(), // 신청일
            payDate: new Date() // 결제예정일
        }
    ]
})
const returnVal = (vals) => {
    $modalEnd('tradingHistoryView')
    emit('runEmits', vals)
}
onMounted(() => {
    $modalStart('tradingHistoryView')
})
</script>
<style lang="postcss" scoped>
    div.fullPopup > div.contentsArea {
        padding-left: 0; padding-right: 0;
        & .roundBlock {
            text-align: center;
            & h2 {
                margin: 0 0 3px;
                font-size: 1.428rem; font-weight: 500;
            }
            & p {
                margin: 0 0 6px;
                color: rgba(140, 140, 140, 1);
            }
        }
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