<template>
    <!-- 펀드 잔고 상세보기 -->
    <div id="modalArea" class="fullPopup">
        <div class="header">
            <h1>펀드 잔고 상세보기</h1>
            <button class="modalClose" @click="returnVal(false)"></button>
        </div>
        <div class="contentsArea">
            <h4>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]Class</h4>
            <div class="basicTable">
                <table class="tdRight">
                    <colgroup>
                        <col width="100px">
                        <col width="*">
                    </colgroup>
                    <tr>
                        <th>계좌번호</th>
                        <td>12345678-12 김현대</td>
                    </tr>
                    <tr>
                        <th>납입금액</th>
                        <td>
                            10,000,000<br>(9,874,210좌)
                        </td>
                    </tr>
                    <tr>
                        <th>평가금액</th>
                        <td>10,000,000</td>
                    </tr>
                    <tr>
                        <th>수익률</th>
                        <td class="fontRed">120.25%</td>
                    </tr>
                    <tr>
                        <th>대출잔액</th>
                        <td>1,000,000원</td>
                    </tr>
                    <tr>
                        <th>과세구분</th>
                        <td>일반과세</td>
                    </tr>
                    <tr>
                        <th>가입일</th>
                        <td>2022.08.23</td>
                    </tr>
                    <tr>
                        <th>만기일</th>
                        <td>2025.08.11</td>
                    </tr>
                    <tr>
                        <th>자동이체</th>
                        <td>미등록</td>
                    </tr>
                </table>
            </div>
            <div class="right circleStBtnArea" data-name="btns">
                <button class="icoPlus right"><span>자동이체 등록</span></button>
            </div>
        </div>
        <div class="buttonArea"
            data-buttonLength="2">
            <button type="button" class="h50 fontRed"
            @click="returnVal('addBuy')"
                >추가매수</button>
            <button type="button" class="h50 fontBlue"
            @click="returnVal('sell')"
                >매도</button>
        </div>
    </div>
</template>
<script setup>
import { inject, onMounted } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')

const emit = defineEmits(['runEmits'])
const returnVal = (vals) => {
    const returnValue = vals || false
    emit('runEmits', returnValue)
    $modalEnd('modalArea')
}

onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
.contentsArea {
    padding-bottom: 20px !important;
    & > h4 { margin: 20px 0 12px; padding: 0; word-break: break-all; }
}
.circleStBtnArea {
    margin: 16px 0 4px; padding: 0;
}
</style>