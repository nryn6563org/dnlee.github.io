<template>
    <div>
        <!-- 펀드매수정보확인 -->
        <section id="newFundBuy">
            <div class="titleInStep">
                <h1>
                    매수정보를<br>
                    확인해주세요.
                </h1>
                <span>
                    <strong>4</strong>/4
                </span>
            </div>
            <!--펀드매수정보 목록-->
            <ul class="productList dropDown">
                <!-- 반복 리스트 단위 -->
                <li :class="[ !pageInfo.pageList[0].isComplete ? 'notOpen' :
                    pageInfo.pageList[0].isVisible ? 'on' : '']">
                    <a href="javascript:;" @click="pageInfo.pageList[0].isVisible = !pageInfo.pageList[0].isVisible">
                        <h1>
                            NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]
                            <!-- ligthBlut(적합)/ red(부적합) -->
                            <span class="bullet lightBlue">적합</span>
                        </h1>
                        <!-- 오류일 시 class="fontRed", 오류메세지 출력 -->
                        <p :class="[ pageInfo.pageList[0].isComplete ? 'fontPointBlue' : 'fontRed' ]">
                            매수 신청
                        </p>
                    </a>
                    <!-- 상세 내역은 매수신청 미완료 시 노출되지 않는다.  -->
                    <transition name="slideVertical">
                        <ol class="squareBox"
                            v-if="pageInfo.pageList[0].isVisible">
                            <li>
                                <span>계좌번호</span>
                                <p>12345678-30</p>
                            </li>
                            <li>
                                <span>매수신청금액</span>
                                <p>1,000,000원</p>
                            </li>
                            <li>
                                <span>신청일</span>
                                <p>2022.08.16</p>
                            </li>
                            <li>
                                <span>결제(예정)일</span>
                                <p>2022.08.22</p>
                            </li>
                            <li>
                                <span>펀드위험등급</span>
                                <p>위험중립형</p>
                            </li>
                            <li>
                                <span>과세구분</span>
                                <p>일반과세</p>
                            </li>
                            <li>
                                <span>숙려제도</span>
                                <p>철회대상</p>
                            </li>
                        </ol>
                    </transition>
                </li>
                <!-- 반복 리스트 단위 -->
                <li :class="[ !pageInfo.pageList[1].isComplete ? 'notOpen' :
                    pageInfo.pageList[1].isVisible ? 'on' : '']">
                    <a href="javascript:;" @click="pageInfo.pageList[1].isVisible = !pageInfo.pageList[1].isVisible">
                        <h1>
                            NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]
                            <!-- ligthBlut(적합)/ red(부적합) -->
                            <span class="bullet lightBlue">적합</span>
                        </h1>
                        <!-- 오류일 시 class="fontRed", 오류메세지 출력 -->
                        <p :class="[ pageInfo.pageList[1].isComplete ? 'fontPointBlue' : 'fontRed' ]">
                            매수 실패 메세지 출력
                        </p>
                    </a>
                </li>
                <li :class="[ !pageInfo.pageList[2].isComplete ? 'notOpen' :
                    pageInfo.pageList[2].isVisible ? 'on' : '']">
                    <a href="javascript:;" @click="pageInfo.pageList[2].isVisible = !pageInfo.pageList[2].isVisible">
                        <h1>
                            NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]
                            <!-- ligthBlut(적합)/ red(부적합) -->
                            <span class="bullet lightBlue">적합</span>
                        </h1>
                        <!-- 오류일 시 class="fontRed", 오류메세지 출력 -->
                        <p :class="[ pageInfo.pageList[2].isComplete ? 'fontPointBlue' : 'fontRed' ]">
                            매수 신청
                        </p>
                    </a>
                    <!-- 상세 내역은 매수신청 미완료 시 노출되지 않는다.  -->
                    <transition name="slideVertical">
                        <ol class="squareBox"
                            v-if="pageInfo.pageList[2].isVisible">
                            <li>
                                <span>계좌번호</span>
                                <p>12345678-30</p>
                            </li>
                            <li>
                                <span>매수신청금액</span>
                                <p>1,000,000원</p>
                            </li>
                            <li>
                                <span>신청일</span>
                                <p>2022.08.16</p>
                            </li>
                            <li>
                                <span>결제(예정)일</span>
                                <p>2022.08.22</p>
                            </li>
                            <li>
                                <span>펀드위험등급</span>
                                <p>위험중립형</p>
                            </li>
                            <li>
                                <span>과세구분</span>
                                <p>일반과세</p>
                            </li>
                            <li>
                                <span>숙려제도</span>
                                <p>철회대상</p>
                            </li>
                        </ol>
                    </transition>
                </li>
            </ul>
        </section>
        <div class="buttonArea div3_7">
             <button typw="button" class="h50 white">이전</button>
             <button typw="button" class="h50 pointBlue" @click="$router.push({ name: 'newFundBuyResult' })">매수신청</button>
        </div>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</template>
<script setup>
import { reactive, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import modalDeepThinkingGuide from '@/components/products/modalDeepThinkingGuide.vue' // 숙려제도 안내
const props = defineProps(['baseInfo'])
const $router = useRouter()

// 화면 보기용 데이타
const pageInfo = reactive({
    pageList: [
        { isVisible: false, isComplete: true },
        { isVisible: false, isComplete: false },
        { isVisible: false, isComplete: true }
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

// 컴포넌트 실행 전체
const runComp = (comps, directInput) => {
    componentsInfo.compName = markRaw(comps)
}
// 컴포넌트 종료
const closeComp = (returnVals) => {
    closeComponent()
}
</script>
<style lang="postcss" scoped>
#newFundBuy {
    padding-bottom: 86px;
    & .productList {
        border-top: 1px solid rgba(229, 229, 229, 1); border-bottom: 1px solid rgba(229, 229, 229, 1);
    }
}
</style>