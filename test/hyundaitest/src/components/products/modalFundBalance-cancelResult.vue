<template>
    <!-- 펀드 거래취소 완료 -->
    <div id="modalArea" class="fullPopup">
        <div class="header">
            <h1>펀드 취소</h1>
            <button class="modalClose" @click="returnVal(false)"></button>
        </div>
        <div class="contentsArea">
            <div class="titleInStep">
                <h1>
                    거래 취소가<br>
                    완료되었습니다.
                </h1>
            </div>
            <ul class="productList">
                <!-- 목록단위 -->
                <li>
                    <a href="javascript:;">
                        <h1>
                            NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]
                            <span class="bullet red">신규매수</span>
                        </h1>
                    </a>
                    <div>
                        <!-- fontRed(오류시) / fontPointBlue(성공시) -->
                        <span class="fontRed">오류메시지 출력 </span>
                    </div>
                </li>
                <!-- // 목록단위 -->
                <li>
                    <a href="javascript:;">
                        <h1>
                            NH-Amundi코리아2배인버스레버리지증권투자신탁[주식-파생재간접형]
                            <span class="bullet red">신규매수</span>
                        </h1>
                    </a>
                    <div>
                        <span class="fontPointBlue">오류메시지 출력 </span>
                    </div>
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
    emit('runEmits', vals)
    $modalEnd('modalArea')
}

onMounted(() => {
    $modalStart('modalArea')
})
</script>
<style lang="postcss" scoped>
div.fullPopup > div.contentsArea {
    padding: 0 ;
}
.productList {
    margin-top: 12px;
    border-top: 1px solid rgba(229, 229, 229, 1); border-bottom: 1px solid rgba(229, 229, 229, 1);
}
</style>