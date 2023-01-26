<template>
    <div>
        <!-- IRP 추가매수 결과 -->
        <section>
            <div class="titleInStep">
                <h1>매수신청이<br>완료되었습니다.</h1>
            </div>
            <!--추가매수 목록-->
            <ul class="productList dropDown">
                <!-- 반복 리스트 : 오류메세지 li.err -->
                <li :class="{ 'on' : pageInfo.pageList[0].isVisible }"
                    @click="pageInfo.pageList[0].isVisible = !pageInfo.pageList[0].isVisible">
                    <a href="javascript:;">
                        <h1>
                            NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]
                            <span class="bullet red">위험자산</span>
                        </h1>
                        <p class="fontPointBlue">매수신청</p>
                    </a>
                    <transition name="slideVertical">
                        <ol class="squareBox" v-if="pageInfo.pageList[0].isVisible">
                            <li>
                                <span>매수비율</span>
                                <p>20%</p>
                            </li>
                            <li>
                                <span>매수예상금액</span>
                                <p>1,000,000원</p>
                            </li>
                            <li>
                                <span>신청일</span>
                                <p>2022.08.12</p>
                            </li>
                            <li>
                                <span>주문예정일</span>
                                <p>2022.08.13</p>
                            </li>
                            <li>
                                <span>결제(예정)일</span>
                                <p>2022.08.17</p>
                            </li>
                        </ol>
                    </transition>
                </li>
                <li :class="{ 'on' : pageInfo.pageList[1].isVisible }"
                    @click="pageInfo.pageList[1].isVisible = !pageInfo.pageList[1].isVisible">
                    <a href="javascript:;">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                        <p class="fontPointBlue">매수신청</p>
                    </a>
                    <transition name="slideVertical">
                        <ol  class="squareBox" v-if="pageInfo.pageList[1].isVisible">
                            <li>
                                <span>매수비율</span>
                                <p>20%</p>
                            </li>
                            <li>
                                <span>매수예상금액</span>
                                <p>1,000,000원</p>
                            </li>
                            <li>
                                <span>신청일</span>
                                <p>2022.08.12</p>
                            </li>
                            <li>
                                <span>주문예정일</span>
                                <p>2022.08.13</p>
                            </li>
                            <li>
                                <span>결제(예정)일</span>
                                <p>2022.08.17</p>
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
        </section>
        <div class="bottomBtnArea">
             <button typw="button" class="h50 white"
                @click="$router.push({ name: 'tradingIRPHistory' })">IRP 거래내역/취소</button>
             <button typw="button" class="h50 pointBlue">확인</button>
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
            itemNage: '', // 상품명
            buyRatio: '', // 매수비율
            buyAmount: '', // 매수예상금액
            applyDate: new Date(), // 신청일
            orderDate: new Date(), // 주문예정일
            payDate: new Date(), // 결제예정일
            iscomplete: true, // 처리여부 - 매수신청 , 오류
            riskAsset: false // 위험자산여부
        },
        {
            isVisible: false,
            itemNage: '', // 상품명
            buyRatio: '', // 매수비율
            buyAmount: '', // 매수예상금액
            applyDate: new Date(), // 신청일
            orderDate: new Date(), // 주문예정일
            payDate: new Date(), // 결제예정일
            iscomplete: true, // 처리여부 - 매수신청 , 오류
            riskAsset: false // 위험자산여부
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
section { padding-bottom: 24px;}
.productList.dropDown {
    border-top: 1px solid rgba(229, 229, 229, 1);
    & > li {
        border-bottom: 1px solid rgba(229, 229, 229, 1);
        & + li {
            border-top: none;
        }
        /* 오류메세지 */
        &.err {
            & > a {
                &::after {display: none;}
                & > p { color: var(--red);}
            }
        }
        & .squareBox { padding-bottom: 16px;}
    }
}
</style>