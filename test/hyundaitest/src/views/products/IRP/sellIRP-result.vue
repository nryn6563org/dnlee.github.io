<template>
    <div>
        <!-- IRP 매도 결과 -->
        <section>
            <div class="titleInStep">
                <h1>매도신청이<br>완료되었습니다.</h1>
            </div>
            <!--매도 목록-->
            <ul class="productList dropDown">
                <!-- 반복 리스트 : 에러메세지 li.err -->
                <li :class="{ 'on' : pageInfo.pageList[0].isVisible }"
                    @click="pageInfo.pageList[0].isVisible = !pageInfo.pageList[0].isVisible">
                    <a href="javascript:;">
                        <h1>
                            NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]
                        </h1>
                        <!-- 매도신청 - fontPointBlue / 오류메세지출력 - fontRed -->
                        <p class="fontPointBlue">매도신청</p>
                    </a>
                    <transition name="slideVertical">
                        <ol class="squareBox" v-if="pageInfo.pageList[0].isVisible">
                            <li>
                                <span>매도예상금액</span>
                                <p>1,000,000원</p>
                            </li>
                            <li>
                                <span>신청일</span>
                                <p>2022.08.12</p>
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
                        <p class="fontPointBlue">매도신청</p>
                    </a>
                    <transition name="slideVertical">
                        <ol class="squareBox" v-if="pageInfo.pageList[1].isVisible">
                            <li>
                                <span>매도예상금액</span>
                                <p>1,000,000원</p>
                            </li>
                            <li>
                                <span>신청일</span>
                                <p>2022.08.12</p>
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
                        <p class="fontRed">오류메시지 출력</p>
                    </a>
                </li>
            </ul>
        </section>
        <div class="bottomBtnArea">
             <button typw="button" class="h50 white"
                @click="$router.push({ name: 'tradingIRPHistory' })">IRP 거래내역/취소</button>
             <button typw="button" class="h50 pointBlue"
                @click="$router.push({ name: 'tradingIRPHistory' })">확인</button>
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
            sellAmount: '', // 매도예상금액
            applyDate: new Date(), // 신청일
            payDate: new Date(), // 결제예정일
            iscomplete: true // 처리여부 - 매수신청 , 오류
        },
        {
            isVisible: false,
            itemNage: '', // 상품명
            sellAmount: '', // 매도예상금액
            applyDate: new Date(), // 신청일
            payDate: new Date(), // 결제예정일
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
section { padding-bottom: 24px;}
.productList.dropDown {
    border-top: 1px solid rgba(229, 229, 229, 1);
    & > li {
        border-bottom: 1px solid rgba(229, 229, 229, 1);
        & + li {
            border-top: none;
        }
        &.err a::after {display: none;}
        & .squareBox { padding-bottom: 16px;}
    }
}
</style>