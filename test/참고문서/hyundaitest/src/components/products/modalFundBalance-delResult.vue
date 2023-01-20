<template>
    <!-- 펀드 삭제 완료 -->
    <div id="modalArea" class="fullPopup">
        <div class="header">
            <h1>펀드 삭제</h1>
            <button class="modalClose" @click="returnVal(false)"></button>
        </div>
        <div class="contentsArea">
            <div class="titleInStep">
                <h1>
                    삭제(폐쇄)<br>
                    완료되었습니다.
                </h1>
            </div>
            <ul class="productList">
                <!-- 반복리스트 단위 -->
                <li>
                    <a href="javascript:;">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                        <!-- fontPointBlue(삭제성공) / fontRed(삭제 실패) -->
                        <p class="fontRed">오류메시지 출력</p>
                    </a>
                </li>
                <!-- // 반복리스트 단위 -->
                <li>
                    <a href="javascript:;">
                        <h1>NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]</h1>
                        <!-- fontPointBlue(삭제성공) / fontRed(삭제 실패) -->
                        <p class="fontPointBlue">삭제(폐쇄) 완료</p>
                    </a>
                </li>
            </ul>
        </div>
        <div class="buttonArea"
            data-buttonLength="1">
            <button type="button" class="h50 pointBlue"
            @click="returnVal(true)"
                >확인</button>
        </div>
    </div>
</template>
<script setup>
import { inject, onMounted } from 'vue'
const $modalStart = inject('$modalStart')
const $modalEnd = inject('$modalEnd')

const emit = defineEmits(['runEmits'])
const returnVal = (vals) => {
    $modalEnd('modalArea')
    emit('runEmits', vals)
}

onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
.contentsArea {
    padding-left: 0 !important; padding-right: 0 !important;
}
.productList {
    & > li:first-child {
        border-top: 1px solid rgba(229, 229, 229, 1);
    }
    & > li:last-child {
        border-bottom: 1px solid rgba(229, 229, 229, 1);
    }
}
</style>