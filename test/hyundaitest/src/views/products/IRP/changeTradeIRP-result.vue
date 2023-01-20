<template>
    <div>
        <section>
        <!-- 교체매매신청 결과 -->
        <div class="titleInStep">
            <h1>교체매매신청이<br>완료되었습니다</h1>
        </div>
        <hr>
        <h3 class="fontBlue">매도 주문내역</h3>
        <!-- 매도주문 목록 -->
        <ul class="productList dropDown">
            <!-- 반복 리스트 : 오류메세지 li.err -->
            <li :class="{ 'on' : pageInfo.sellIRPList[0].isVisible }"
                @click="pageInfo.sellIRPList[0].isVisible = !pageInfo.sellIRPList[0].isVisible">
                <a href="javascript:;">
                    <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                </a>
                <transition name="slideVertical">
                    <ol class="squareBox" v-if="pageInfo.sellIRPList[0].isVisible">
                        <li>
                            <span>매도금액/좌수</span>
                            <p>500,000원</p>
                        </li>
                        <li>
                            <span>지급예정일</span>
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
                            <span>매도금액/좌수</span>
                            <p>500,000원</p>
                        </li>
                        <li>
                            <span>지급예정일</span>
                            <p>2022.08.16</p>
                        </li>
                    </ol>
                </transition>
            </li>
            <li class="err">
                    <a href="javascript:;">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                        <p>오류메시지 출력</p>
                    </a>
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
                            <p>20%</p>
                        </li>
                        <li>
                            <span>매수예상금액</span>
                            <p>1,000,000원</p>
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
                            <span>매수비율</span>
                            <p>20%</p>
                        </li>
                        <li>
                            <span>매수예상금액</span>
                            <p>1,000,000원</p>
                        </li>
                    </ol>
                </transition>
            </li>
        </ul>
    </section>
    <div class="bottomBtnArea">
        <button typw="button" class="h50 white"
            @click="$router.push({ name: 'tradingIRPHistory'})">IRP 거래내역/취소</button>
        <button typw="button" class="h50 pointBlue"
            @click="$router.push({ name: 'tradingIRPSell'})">확인</button>
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
const props = defineProps(['transInfo'])

const pageInfo = reactive({
    selectTabMenu: 'changeTrade',
    sellIRPList: [
        {
            isVisible: true,
            itemName: '', // 상품명
            sellAmount: '', // 매도금액
            dueDate: new Date(), // 지금예정일
            iscomplete: true // 처리여부 - 매수신청 , 오류
        },
        {
            isVisible: false,
            itemName: '', // 상품명
            sellAmount: '', // 매도금액
            dueDate: new Date(), // 지금예정일
            iscomplete: true // 처리여부 - 매수신청 , 오류
        }
    ],
    buyIRPList: [
        {
            isVisible: true,
            itemName: '', // 상품명
            buyRatio: '', // 매수비율
            buyAmount: '', // 매수예상금액
            iscomplete: true // 처리여부 - 매수신청 , 오류
        },
        {
            isVisible: false,
            itemName: '', // 상품명
            buyRatio: '', // 매수비율
            buyAmount: '', // 매수예상금액
            iscomplete: true // 처리여부 - 매수신청 , 오류
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
            margin: 0;
            height: 10px;
            border: none;
            background:rgba(239, 239, 239, 1);
        }
        & .productList.dropDown + hr { margin: 0;}
    }
    .productList.dropDown {
        & > li{
            border-top: 1px solid rgba(229, 229, 229, 1);
            /* 오류메세지 */
            &.err {
                & > a {
                    &::after {display: none;}
                    & > p { color: var(--red);}
                }
            }
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