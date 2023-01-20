<template>
    <!-- 펀드 추가매수 정보확인 -->
    <div id="modalArea" class="fullPopup">
        <div class="header">
            <h1>펀드 매도</h1>
            <button class="modalClose" @click="returnVal(false)"></button>
        </div>
        <div class="contentsArea">
            <div class="titleInStep">
                <h1>
                    매도신청을<br>
                    하시겠습니까?
                </h1>
            </div>
            <ul class="productList dropDown">
                <!-- 반복 리스트 단위 -->
                <li :class="{ 'on' : pageInfo.fundList[0].isVisible }">
                    <a href="javascript:;" @click="pageInfo.fundList[0].isVisible = !pageInfo.fundList[0].isVisible">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                    </a>
                    <transition name="slideVertical">
                        <ol v-if="pageInfo.fundList[0].isVisible"
                            class="squareBox">
                            <li>
                                <span>계좌번호</span>
                                <p>12345678-30</p>
                            </li>
                            <li>
                                <span>기준가적용일</span>
                                <p>2022.08.26</p>
                            </li>
                            <li>
                                <span>지금예정일</span>
                                <p>2022.08.22</p>
                            </li>
                            <li>
                                <span>매도금액</span>
                                <p>1,000,000원</p>
                            </li>
                            <li>
                                <span>환매수수료</span>
                                <p>0원</p>
                            </li>
                            <li>
                                <span>자동이체 해지여부</span>
                                <p>신청</p>
                            </li>
                            <li>
                                <span>예상소득세액</span>
                                <p>1,000원</p>
                            </li>
                            <li>
                                <span>예상추징세액</span>
                                <p>1,000원</p>
                            </li>
                        </ol>
                    </Transition>
                </li>
                <!-- // 반복 리스트 단위 -->
                <li :class="{ 'on' : pageInfo.fundList[1].isVisible }">
                    <a href="javascript:;" @click="pageInfo.fundList[1].isVisible = !pageInfo.fundList[1].isVisible">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                    </a>
                    <transition name="slideVertical">
                        <ol v-if="pageInfo.fundList[1].isVisible"
                            class="squareBox">
                            <li>
                                <span>계좌번호</span>
                                <p>12345678-30</p>
                            </li>
                            <li>
                                <span>기준가적용일</span>
                                <p>2022.08.26</p>
                            </li>
                            <li>
                                <span>지금예정일</span>
                                <p>2022.08.22</p>
                            </li>
                            <li>
                                <span>매도금액</span>
                                <p>1,000,000원</p>
                            </li>
                            <li>
                                <span>환매수수료</span>
                                <p>0원</p>
                            </li>
                            <li>
                                <span>자동이체 해지여부</span>
                                <p>신청</p>
                            </li>
                            <li>
                                <span>예상소득세액</span>
                                <p>1,000원</p>
                            </li>
                            <li>
                                <span>예상추징세액</span>
                                <p>1,000원</p>
                            </li>
                        </ol>
                    </Transition>
                </li>
                <li :class="{ 'on' : pageInfo.fundList[2].isVisible }">
                    <a href="javascript:;" @click="pageInfo.fundList[2].isVisible = !pageInfo.fundList[2].isVisible">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                    </a>
                    <transition name="slideVertical">
                        <ol v-if="pageInfo.fundList[2].isVisible"
                            class="squareBox">
                            <li>
                                <span>계좌번호</span>
                                <p>12345678-30</p>
                            </li>
                            <li>
                                <span>기준가적용일</span>
                                <p>2022.08.26</p>
                            </li>
                            <li>
                                <span>지금예정일</span>
                                <p>2022.08.22</p>
                            </li>
                            <li>
                                <span>매도금액</span>
                                <p>1,000,000원</p>
                            </li>
                            <li>
                                <span>환매수수료</span>
                                <p>0원</p>
                            </li>
                            <li>
                                <span>자동이체 해지여부</span>
                                <p>신청</p>
                            </li>
                            <li>
                                <span>예상소득세액</span>
                                <p>1,000원</p>
                            </li>
                            <li>
                                <span>예상추징세액</span>
                                <p>1,000원</p>
                            </li>
                        </ol>
                    </Transition>
                </li>
            </ul>
            <span>환매수수료 및 예상세액은 신청일 기준가로 가계산 된 내역으로 실제 내역과 차이가 있을 수 있습니다.</span>
        </div>
        <div class="buttonArea div3_7"
            data-buttonLength="2">
            <button type="button" class="h50 white"
                @click="returnVal('back')">
                이전</button>
            <button type="button" class="h50 pointBlue"
                @click="returnVal(true)">
                확인</button>
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
.contentsArea {
    padding-left: 0 !important; padding-right: 0 !important; padding-bottom: 96px !important;
    & > span {
        display: block; position: relative;
        margin: 0; padding: 12px 20px 4px 36px;
        font-size: 0.857rem; word-break: break-all;
        &::before {
            position: absolute;
            left: 20px;
            content: '※';
        }
    }
}
.productList {
    border-top: 1px solid rgba(229, 229, 229, 1); border-bottom: 1px solid rgba(229, 229, 229, 1);
}
button.h50 { padding: 0; }
</style>