<template>
    <div>
        <!-- 이체일 저축기간 등록완료-->
        <section id="autoFundBuy">
            <div class="titleInStep">
                <h1>
                    이체일/저축기간이<br>
                    등록되었습니다.
                </h1>
            </div>
            <ul class="productList dropDown">
                <!-- 반복리스트 단위 -->
                <li :class="{ 'on' : pageInfo.pageList[0].isVisible}">
                    <a href="javascript:;" @click="pageInfo.pageList[0].isVisible = !pageInfo.pageList[0].isVisible">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                    </a>
                    <transition name="slideVertical">
                        <div v-if="pageInfo.pageList[0].isVisible">
                            <ol class="squareBox">
                                <li>
                                    <span>출금계좌</span>
                                    <p>12345678-11  현대차증권</p>
                                </li>
                                <li>
                                    <span>입금계좌</span>
                                    <p>12345678-11  우리은행</p>
                                </li>
                                <li>
                                    <span>이체금액</span>
                                    <p>100,000</p>
                                </li>
                                <li>
                                    <span>이체일</span>
                                    <p>2022.08.02</p>
                                </li>
                                <li>
                                    <span>저축기간</span>
                                    <p>2022.08~2023.08</p>
                                </li>
                            </ol>
                        </div>
                    </transition>
                </li>
                <!-- //반복리스트 단위 -->
                <li :class="{ 'on' : pageInfo.pageList[1].isVisible}">
                    <a href="javascript:;" @click="pageInfo.pageList[1].isVisible = !pageInfo.pageList[1].isVisible">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                    </a>
                    <transition name="slideVertical">
                        <div v-if="pageInfo.pageList[1].isVisible">
                            <ol class="squareBox">
                                <li>
                                    <span>출금계좌</span>
                                    <p>12345678-11  현대차증권</p>
                                </li>
                                <li>
                                    <span>입금계좌</span>
                                    <p>12345678-11  우리은행</p>
                                </li>
                                <li>
                                    <span>이체금액</span>
                                    <p>100,000</p>
                                </li>
                                <li>
                                    <span>이체일</span>
                                    <p>2022.08.02</p>
                                </li>
                                <li>
                                    <span>저축기간</span>
                                    <p>2022.08~2023.08</p>
                                </li>
                            </ol>
                        </div>
                    </transition>
                </li>
            </ul>
        </section>
        <div class="buttonArea">
             <button typw="button" class="h50 white" @click="$router.push({ name: 'myfundBalance' })">펀드 거래조회</button>
             <button typw="button" class="h50 pointBlue">확인</button>
        </div>
    </div>
    <component :is="componentsInfo.compName"
        :options="componentsInfo.compOption"
        @runEmits="componentsInfo.emits" />
</template>
<script setup>
import { reactive, markRaw } from 'vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
const pageInfo = reactive({
    pageList: [
        { isVisible: false },
        { isVisible: false }
    ]
})
// 컴포넌트 실행 분기
const componentsInfo = reactive({
    compName: null,
    compOption: null,
    emits: null
})
// 컴포넌트 초기화
const closeComponent = () => {
    componentsInfo.compName = null
    componentsInfo.compOption = null
    componentsInfo.emits = null
}

const runModal = (comps) => {
    componentsInfo.compName = markRaw(comps)
    componentsInfo.emits = consoleValue
}
const consoleValue = (returnVals) => {
    console.log(returnVals)
    closeComponent()
}
</script>
<style lang="postcss" scoped>
#autoFundBuy { padding-bottom: 76px; }
.productList {
    margin-bottom: 20px;
    border-top: 1px solid rgba(229, 229, 229, 1);
    border-bottom: 1px solid rgba(229, 229, 229, 1);
    & div {
        padding: 0 !important; margin: 0 !important;
    }
}
</style>