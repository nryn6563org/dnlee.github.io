<template>
    <div>
        <!-- IRP 신규상품가입 -->
        <section>
            <div class="titleInStep">
                <h1>가입정보를<br>확인해주세요.</h1>
                <span>
                    <strong>4</strong>/4
                </span>
            </div>
            <!--신규상품가입 목록-->
            <ul class="productList dropDown">
                <li :class="{ 'on' : pageInfo.pageList[0].isVisible }"
                    @click="pageInfo.pageList[0].isVisible = !pageInfo.pageList[0].isVisible">
                    <a href="javascript:;">
                        <h1>
                            NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]
                            <span class="bullet red">위험자산</span>
                        </h1>
                    </a>
                    <transition name="slideVertical">
                        <ol class="squareBox"
                        v-if="pageInfo.pageList[0].isVisible">
                            <li>
                                <span>계좌번호</span>
                                <p>12345678-30</p>
                            </li>
                            <li>
                                <span>가입일</span>
                                <p>2022.08.16</p>
                            </li>
                            <li>
                                <span>펀드위험등급</span>
                                <p>위험중립형</p>
                            </li>
                            <li>
                                <span>숙려제도</span>
                                <p>철회대상</p>
                            </li>
                        </ol>
                    </transition>
                </li>
                <li :class="{ 'on' : pageInfo.pageList[1].isVisible }"
                    @click="pageInfo.pageList[1].isVisible = !pageInfo.pageList[1].isVisible">
                    <a href="javascript:;">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                    </a>
                    <transition name="slideVertical">
                        <ol class="squareBox"
                        v-if="pageInfo.pageList[1].isVisible">
                            <li>
                                <span>계좌번호</span>
                                <p>12345678-30</p>
                            </li>
                            <li>
                                <span>가입일</span>
                                <p>2022.08.16</p>
                            </li>
                            <li>
                                <span>펀드위험등급</span>
                                <p>위험중립형</p>
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
        <div class="buttonArea" data-buttonLength="1">
             <button typw="button" class="h50 white">이전</button>
             <button typw="button" class="h50 pointBlue" @click="runComp(modalDeepThinkingGuide)">매수신청</button>
        </div>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="closeComp" />
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import modalDeepThinkingGuide from '@/components/products/modalDeepThinkingGuide.vue' // 숙려제도 안내
const $dateToCommas = inject('$dateToCommas')
const emit = defineEmits(['runEmits'])
const props = defineProps(['transInfo'])

const pageInfo = reactive({
    pageList: [
        {
            isVisible: true,
            itemName: '', // 상품명
            riskGrade: '', // 위험등급
            myAcctNum: '', // 계좌번호
            applyDate: new Date(), // 가입일
            isDeepThinking: '' // 숙려제도 대상여부
        },
        {
            isVisible: false,
            itemName: '', // 상품명
            riskGrade: '', // 위험등급
            myAcctNum: '', // 계좌번호
            applyDate: new Date(), // 가입일
            isDeepThinking: '' // 숙려제도 대상여부
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
section { padding-bottom: 80px;}
.productList.dropDown {
    padding-bottom: 24px;
    border-top: 1px solid rgba(229, 229, 229, 1);
    & > li{
        border-bottom: 1px solid rgba(229, 229, 229, 1);
        & + li {
            border-top: none;
        }
    }
    & .squareBox { padding-bottom: 16px;}
}
</style>