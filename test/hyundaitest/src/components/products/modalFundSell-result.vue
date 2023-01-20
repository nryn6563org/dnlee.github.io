<template>
    <!-- 펀드 추가매수 완료 -->
    <div id="modalArea" class="fullPopup">
        <div class="header">
            <h1>펀드 매도</h1>
            <button class="modalClose" @click="returnVal(false)"></button>
        </div>
        <div class="contentsArea">
            <div class="titleInStep">
                <h1>
                    매도신청이<br>
                    완료되었습니다.
                </h1>
            </div>
            <ul class="productList dropDown">
                <!-- 반복 리스트 단위 -->
                <!-- 오류시 notOpen 클래스 호출 -->
                <li :class="{ 'on' : pageInfo.fundList[0].isVisible }">
                    <a href="javascript:;" @click="pageInfo.fundList[0].isVisible = !pageInfo.fundList[0].isVisible">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                        <!-- fontRed(오류메세지) / fontPointBlue(일반) -->
                        <p class="fontPointBlue">매도 신청</p>
                    </a>
                    <!-- 오류시 미노출 -->
                    <transition name="slideVertical">
                        <ol v-if="pageInfo.fundList[0].isVisible"
                            class="squareBox">
                            <li>
                                <span>매도금액</span>
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
                        </ol>
                    </Transition>
                    <!-- // 오류시 미노출 -->
                </li>
                <!-- // 반복 리스트 단위 -->
                <li class="notOpen">
                    <a href="javascript:;" @click="pageInfo.fundList[1].isVisible = !pageInfo.fundList[1].isVisible">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                        <!-- fontRed(오류메세지) / fontPointBlue(일반) -->
                        <p class="fontRed">오류메세지 출력</p>
                    </a>
                </li>
                <li :class="{ 'on' : pageInfo.fundList[2].isVisible }">
                    <a href="javascript:;" @click="pageInfo.fundList[2].isVisible = !pageInfo.fundList[2].isVisible">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                        <p class="fontPointBlue">매도 신청</p>
                    </a>
                    <transition name="slideVertical">
                        <ol v-if="pageInfo.fundList[2].isVisible"
                            class="squareBox">
                            <li>
                                <span>매도금액</span>
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
                        </ol>
                    </Transition>
                </li>
            </ul>
        </div>
        <div class="buttonArea">
            <button type="button" class="h50 pointBlue"
            @click="returnVal(true)"
                >확인</button>
        </div>
    </div>
</template>
<script setup>
import { reactive, inject, onMounted } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')

const pageInfo = reactive({
    fundList: [
        { isVisible: false },
        { isVisible: false },
        { isVisible: false }
    ]
})

const emit = defineEmits(['runEmits'])
const returnVal = (vals) => {
    emit('runEmits', vals)
    $modalEnd('modalArea')
}

onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
.contentsArea { padding-left: 0 !important; padding-right: 0 !important; padding-bottom: 96px !important; }
.productList { border-top: 1px solid rgba(229, 229, 229, 1); border-bottom: 1px solid rgba(229, 229, 229, 1); }
.ad { margin-top: 24px; }
button.h50 { padding: 0; }
</style>