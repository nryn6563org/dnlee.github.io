<template>
    <!-- 펀드 삭제 확인 -->
    <div id="modalArea" class="fullPopup">
        <div class="header">
            <h1>펀드 삭제</h1>
            <button class="modalClose" @click="returnVal(false)"></button>
        </div>
        <div class="contentsArea">
            <div class="titleInStep">
                <h1>
                    삭제(폐쇄)<br>
                    하시겠습니까?
                    <p class="fontPointBlue">
                        삭제(폐쇄) 신청 후 취소가 불가하오니,<br>
                        확인 후 진행해 주세요.
                    </p>
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
                                <span>삭제신청일</span>
                                <p>2022.08.16</p>
                            </li>
                            <li>
                                <span>평가금액</span>
                                <p>0원</p>
                            </li>
                            <li>
                                <span>과세구분</span>
                                <p>일반과세</p>
                            </li>
                            <li>
                                <span>자동이체</span>
                                <p>미등록</p>
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
                                <span>삭제신청일</span>
                                <p>2022.08.16</p>
                            </li>
                            <li>
                                <span>평가금액</span>
                                <p>0원</p>
                            </li>
                            <li>
                                <span>과세구분</span>
                                <p>일반과세</p>
                            </li>
                            <li>
                                <span>자동이체</span>
                                <p>미등록</p>
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
                                <span>삭제신청일</span>
                                <p>2022.08.16</p>
                            </li>
                            <li>
                                <span>평가금액</span>
                                <p>0원</p>
                            </li>
                            <li>
                                <span>과세구분</span>
                                <p>일반과세</p>
                            </li>
                            <li>
                                <span>자동이체</span>
                                <p>미등록</p>
                            </li>
                        </ol>
                    </Transition>
                </li>
            </ul>
        </div>
        <div class="buttonArea"
            data-buttonLength="2">
            <button type="button" class="h50 pointBlue"
            @click="returnVal(true)"
                >확인</button>
        </div>
    </div>
</template>
<script setup>
import { inject, reactive, onMounted } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')

const emit = defineEmits(['runEmits'])

const pageInfo = reactive({
    fundList: [
        { isVisible: false },
        { isVisible: false },
        { isVisible: false }
    ]
})

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
    padding-left: 0 !important; padding-right: 0 !important; padding-bottom: 86px !important;
}
.titleInStep {
    & p {
        margin: 12px 0 0; padding: 0;
        font-size: 1rem; line-height: 1.5; font-weight: 400;
    }
}
.productList {
    border-top: 1px solid rgba(229, 229, 229, 1); border-bottom: 1px solid rgba(229, 229, 229, 1);
}
</style>