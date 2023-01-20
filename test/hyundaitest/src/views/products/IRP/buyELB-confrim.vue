<template>
<div>
    <!-- IRP ELB 매수 확인 -->
    <section>
        <div class="titleInStep">
            <h1>
                매수신청 정보를<br>
                확인해주세요.
            </h1>
        </div>
        <ul class="productList dropDown">
            <!-- 반복리스트 -->
            <li :class="{ 'on' : pageInfo.isVisible }"
                @click="pageInfo.isVisible = !pageInfo.isVisible">
                <a href="javascript:;">
                    <h1>{{props.pageInfo.itemList.itemName}}</h1>
                </a>
                <transition name="slideVertical">
                    <ol class="squareBox" v-if="pageInfo.isVisible">
                        <li>
                            <span>계좌번호</span>
                            <p>{{$hmsecToDash(props.pageInfo.bankAccNumber)}}</p>
                        </li>
                        <li>
                            <span>신청일</span>
                            <p>{{props.pageInfo.itemList.buyDate}}</p>
                        </li>
                        <li>
                            <span>매수신청금액</span>
                            <p>{{$priceToCommas(props.pageInfo.itemList.reserveAmount)}}원</p>
                        </li>
                        <li>
                            <span>만기일</span>
                            <p>{{props.pageInfo.itemList.maturityDate}}</p>
                        </li>
                    </ol>
                </transition>
            </li>
        </ul>
    </section>
    <!-- div3_7로 수정해야함 -->
    <div class="bottomBtnArea">
        <button typw="button" class="h50 white"
            @click="$router.push({ name: 'buyELBEnter' })">이전</button>
            <!-- 숙려제도 -->
            <button typw="button" class="h50 pointBlue"
            @click="runComp(modalDeepThinkingGuide)">매수신청</button>
    </div>
</div>
<component :is="componentsInfo.compName"
    :options="componentsInfo.compOption"
    @runEmits="closeComp"/>
</template>
<script setup>
import { inject, reactive, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import modalDeepThinkingGuide from '@/components/products/modalDeepThinkingGuide.vue' // 숙려제도 팝엉
const $router = useRouter()
const $hmsecToDash = inject('$hmsecToDash')
const $dateToCommas = inject('$dateToCommas')
const $priceToCommas = inject('$priceToCommas')
const props = defineProps(['pageInfo'])
const pageInfo = reactive({
    isVisible: true // 목록 여닫힘 여부
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
    if (comps === modalDeepThinkingGuide) {
        closeComponent()
        $router.push({ name: 'buyELBResult' })
    }
}
</script>
<style lang="postcss" scoped>
.productList {
    border-top: 1px solid rgba(215, 215, 215, 1); border-bottom: 1px solid rgba(215, 215, 215, 1);
}
</style>