<template>
    <!-- 중도해지안내 -->
    <div id="modalArea" role="dialog">
        <div class="bottomSheet">
            <!-- 제목열 -->
            <h1>
                중도해지 안내
                <button type="button" class="modalClose"
                    @click="returnVal(false)">
                </button>
            </h1>
            <!-- 컨텐츠 영역 -->
            <div class="contentsArea">
                <div class="roundBlock">
                    유진저축은행정기예금_1년(IRP)
                </div>
                <p>
                    위 상품은 만기도래전 중도매도 시 중도매도 이율이 적용됩니다.<br>
                    계속 진행하시겠습니까?
                </p>
            </div>
            <div class="buttonArea"
                data-buttonLength="1">
                <button type="button" class="white h50"
                    @click="returnVal(false)"
                    >아니요</button>
                <button type="button" class="pointBlue h50"
                    @click="returnVal()"
                    >예</button>
            </div>
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
p {
    margin: 16px 0 0;
    font-size: 1.142rem;
}
.roundBlock {
    margin: 0; padding: 20px 0;
    background:rgba(246, 246, 246, 1) ;
    font-size: 1.142rem; font-weight: 500;
    text-align: center;
}
.buttonArea {
    & button {  flex-grow: 1; flex-basis: 24%; padding: 0;}
    & button:last-child { flex-grow: 1; flex-basis: 57%;}
}
</style>