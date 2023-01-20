<template>
    <!-- 펀드 거래취소 확인 -->
    <div id="modalFundDelConfirm" class="fullPopup">
        <div class="header">
            <h1>펀드 취소</h1>
            <button class="modalClose" @click="returnVal(false)"></button>
        </div>
        <div class="contentsArea">
            <div class="titleInStep">
                <h1>
                    거래취소를<br>
                    하시겠습니까?
                </h1>
            </div>
            <ul class="productList dropDown">
                <!-- 반복리스트 단위 -->
                <li :class="{ 'on' : pageInfo.pageList[0].isVisible }">
                    <a href="javascript:;"
                        @click="pageInfo.pageList[0].isVisible = !pageInfo.pageList[0].isVisible">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                    </a>
                    <transition name="slideVertical">
                        <ol class="squareBox"
                            v-if="pageInfo.pageList[0].isVisible">
                            <li>
                                <span>계좌번호</span>
                                <p>12345678-30</p>
                            </li>
                            <li>
                                <span>거래구분</span>
                                <p>신규매수</p>
                            </li>
                            <li>
                                <span>신청금액</span>
                                <p>1,000,000원</p>
                            </li>
                            <li>
                                <span>거래신청일</span>
                                <p>2022.08.16</p>
                            </li>
                            <li>
                                <span>결제(예정)일</span>
                                <p>2022.08.22</p>
                            </li>
                            <li>
                                <span>숙려제도</span>
                                <p>철회대상</p>
                            </li>
                        </ol>
                    </transition>
                </li>
                <!-- // 반복리스트 단위 -->
                <li :class="{ 'on' : pageInfo.pageList[1].isVisible }">
                    <a href="javascript:;"
                        @click="pageInfo.pageList[1].isVisible = !pageInfo.pageList[1].isVisible">
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
                                <span>거래구분</span>
                                <p>신규매수</p>
                            </li>
                            <li>
                                <span>신청금액</span>
                                <p>1,000,000원</p>
                            </li>
                            <li>
                                <span>거래신청일</span>
                                <p>2022.08.16</p>
                            </li>
                            <li>
                                <span>결제(예정)일</span>
                                <p>2022.08.22</p>
                            </li>
                            <li>
                                <span>숙려제도</span>
                                <p>철회대상</p>
                            </li>
                        </ol>
                    </transition>
                </li>
            </ul>
        </div>
        <div class="buttonArea div3_7">
            <button type="button" class="h50 white"
            @click="returnVal(true)"
                >이전</button>
            <button type="button" class="h50 pointBlue"
            @click="returnVal()"
                >확인</button>
        </div>
    </div>
</template>
<script setup>
import { reactive, inject, onMounted } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')
const emit = defineEmits(['runEmits'])

// 컴포넌트 실행 분기
const pageInfo = reactive({
    pageList: [
        { isVisible: false },
        { isVisible: false }
    ]
})
const returnVal = (vals) => {
    $modalEnd('modalFundDelConfirm')
    emit('runEmits', vals)
}
onMounted(() => {
    $modalStart('modalFundDelConfirm')
})
</script>
<style lang="postcss" scoped>
div.fullPopup > div.contentsArea {
    padding-left: 0 !important; padding-right: 0 !important;
}
.productList {
    margin-top: 12px;
    border-top: 1px solid rgba(229, 229, 229, 1); border-bottom: 1px solid rgba(229, 229, 229, 1);
}
</style>